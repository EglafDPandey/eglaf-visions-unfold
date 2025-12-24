import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contacts',
        variant: 'destructive',
      });
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    const { error } = await supabase.from('contacts').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete contact',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Contact deleted successfully',
      });
      fetchContacts();
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Status updated successfully',
      });
      fetchContacts();
      setSelectedContact(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400';
      case 'read':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'replied':
        return 'bg-green-500/20 text-green-400';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Contact Messages</h2>
        <p className="text-muted-foreground">Manage contact form submissions</p>
      </div>

      {contacts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 rounded-xl text-center"
        >
          <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">No messages yet</h3>
          <p className="text-muted-foreground">Contact messages will appear here when submitted</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-foreground">{contact.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{contact.message}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedContact(contact)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedContact?.name}</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedContact.email}`} className="font-medium text-primary hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedContact.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Received</p>
                  <p className="font-medium">{new Date(selectedContact.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="mt-1 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedContact.id, 'read')}>
                  Mark Read
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedContact.id, 'replied')}>
                  Mark Replied
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedContact.id, 'closed')}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
