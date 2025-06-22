
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  property_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  message: string;
  inquiry_type: string;
  status: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error: any) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (propertyId: string, receiverId: string, content: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            property_id: propertyId,
            sender_id: user.id,
            receiver_id: receiverId,
            content: content,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Message sent successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return null;
    }
  };

  const sendInquiry = async (propertyId: string, receiverId: string, subject: string, message: string, inquiryType: string = 'general') => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([
          {
            property_id: propertyId,
            sender_id: user.id,
            receiver_id: receiverId,
            subject: subject,
            message: message,
            inquiry_type: inquiryType,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Increment inquiry count for the property
      await supabase.rpc('increment_inquiry_count', {
        property_uuid: propertyId
      });

      setInquiries(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Inquiry sent successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error sending inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to send inquiry",
        variant: "destructive",
      });
      return null;
    }
  };

  const markAsRead = async (messageId: string, type: 'message' | 'inquiry' = 'message') => {
    try {
      const table = type === 'message' ? 'messages' : 'inquiries';
      const { error } = await supabase
        .from(table)
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;

      if (type === 'message') {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        ));
      } else {
        setInquiries(prev => prev.map(inq => 
          inq.id === messageId ? { ...inq, is_read: true } : inq
        ));
      }
    } catch (error: any) {
      console.error('Error marking as read:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchInquiries();
  }, [user]);

  return {
    messages,
    inquiries,
    loading,
    sendMessage,
    sendInquiry,
    markAsRead,
    refetchMessages: fetchMessages,
    refetchInquiries: fetchInquiries,
  };
};
