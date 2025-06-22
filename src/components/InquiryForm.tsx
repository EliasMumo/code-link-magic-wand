
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMessages } from '@/hooks/useMessages';

interface InquiryFormProps {
  propertyId: string;
  landlordId: string;
  propertyTitle: string;
  onClose: () => void;
}

const InquiryForm = ({ propertyId, landlordId, propertyTitle, onClose }: InquiryFormProps) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('general');
  const [submitting, setSubmitting] = useState(false);
  const { sendInquiry } = useMessages();

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'viewing', label: 'Schedule Viewing' },
    { value: 'application', label: 'Application Process' },
    { value: 'lease_terms', label: 'Lease Terms' },
    { value: 'amenities', label: 'Amenities & Features' },
    { value: 'neighborhood', label: 'Neighborhood Info' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSubmitting(true);
    const success = await sendInquiry(propertyId, landlordId, subject, message, inquiryType);
    setSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Landlord</DialogTitle>
          <p className="text-sm text-gray-600">Property: {propertyTitle}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select value={inquiryType} onValueChange={setInquiryType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={submitting || !subject.trim() || !message.trim()}>
              {submitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryForm;
