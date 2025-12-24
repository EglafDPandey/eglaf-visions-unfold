import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Mail, Phone, Calendar, Briefcase, Linkedin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  cover_letter: string | null;
  status: string;
  created_at: string;
}

export default function AdminJobApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch job applications',
        variant: 'destructive',
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    const { error } = await supabase.from('job_applications').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete application',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Application deleted successfully',
      });
      fetchApplications();
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('job_applications')
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
      fetchApplications();
      setSelectedApplication(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-400';
      case 'shortlisted':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      case 'hired':
        return 'bg-emerald-500/20 text-emerald-400';
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
        <h2 className="font-display text-2xl font-bold text-foreground">Job Applications</h2>
        <p className="text-muted-foreground">Review and manage job applications</p>
      </div>

      {applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 rounded-xl text-center"
        >
          <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">No applications yet</h3>
          <p className="text-muted-foreground">Job applications will appear here when submitted</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-foreground">{application.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {application.position}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {application.email}
                    </span>
                    {application.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {application.phone}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(application)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(application.id)}
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

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedApplication?.name}</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="font-medium">{selectedApplication.position}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedApplication.email}`} className="font-medium text-primary hover:underline">
                    {selectedApplication.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedApplication.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applied On</p>
                  <p className="font-medium">{new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              {selectedApplication.linkedin_url && (
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a 
                    href={selectedApplication.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Linkedin className="w-4 h-4" />
                    View Profile
                  </a>
                </div>
              )}
              {selectedApplication.cv_url && (
                <div>
                  <p className="text-sm text-muted-foreground">Resume</p>
                  <p className="flex items-center gap-1 text-foreground">
                    <FileText className="w-4 h-4" />
                    {selectedApplication.cv_url}
                  </p>
                </div>
              )}
              {selectedApplication.cover_letter && (
                <div>
                  <p className="text-sm text-muted-foreground">Cover Letter</p>
                  <p className="mt-1 whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4 flex-wrap">
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedApplication.id, 'reviewed')}>
                  Mark Reviewed
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedApplication.id, 'shortlisted')}>
                  Shortlist
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedApplication.id, 'rejected')}>
                  Reject
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedApplication.id, 'hired')}>
                  Hired
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
