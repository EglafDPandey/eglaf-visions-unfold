const CLOUD_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;

declare global {
  interface Window {
    __eglafCloudFetchProxyInstalled?: boolean;
  }
}

const getProxyUrl = (input: RequestInfo | URL) => {
  if (!CLOUD_URL || typeof window === 'undefined') return null;

  const cloudOrigin = new URL(CLOUD_URL).origin;
  const requestUrl = new URL(
    input instanceof Request ? input.url : input.toString(),
    window.location.origin,
  );

  if (requestUrl.origin !== cloudOrigin) return null;

  const routes = [
    { source: '/auth/v1/', proxy: '/cloud-auth/' },
    { source: '/rest/v1/', proxy: '/cloud-rest/' },
    { source: '/storage/v1/', proxy: '/cloud-storage/' },
    { source: '/functions/v1/', proxy: '/cloud-functions/' },
  ];

  const route = routes.find(({ source }) => requestUrl.pathname.startsWith(source));
  if (!route) return null;

  return `${route.proxy}${requestUrl.pathname.slice(route.source.length)}${requestUrl.search}`;
};

if (typeof window !== 'undefined' && !window.__eglafCloudFetchProxyInstalled) {
  const nativeFetch = window.fetch.bind(window);
  window.__eglafCloudFetchProxyInstalled = true;

  window.fetch = async (input, init) => {
    const proxyUrl = getProxyUrl(input);
    if (!proxyUrl) return nativeFetch(input, init);

    const proxyInput = input instanceof Request ? new Request(proxyUrl, input.clone()) : proxyUrl;

    const response = await nativeFetch(proxyInput, init);
    const contentType = response.headers.get('content-type') ?? '';

    if (response.status === 404 && contentType.includes('text/html')) {
      const directInput = input instanceof Request ? input.clone() : input;
      return nativeFetch(directInput, init);
    }

    return response;
  };
}

export {};