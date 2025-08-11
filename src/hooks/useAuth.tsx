
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';


interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  console.log('AuthProvider rendering - user:', user, 'loading:', loading);
  

  useEffect(() => {
    const processOAuthRole = (uid: string) => {
      setTimeout(async () => {
        try {
          const stored = localStorage.getItem('oauthRole');
          console.log('Processing OAuth role - stored role:', stored, 'for user:', uid);
          if (stored === 'tenant' || stored === 'landlord') {
            localStorage.removeItem('oauthRole');
            const { data, error } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', uid)
              .single();
            console.log('Current profile role:', data?.role, 'error:', error);
            if (!error && data && data.role !== stored) {
              console.log('Updating role from', data.role, 'to', stored);
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ role: stored })
                .eq('id', uid);
              console.log('Role update result:', updateError ? 'error' : 'success', updateError);
            }
          }
        } catch (e) {
          console.error('OAuth role processing error:', e);
        }
      }, 0);
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, 'session:', !!session, 'user:', !!session?.user);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (session?.user) {
          console.log('Processing OAuth role for user:', session.user.id);
          processOAuthRole(session.user.id);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        processOAuthRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
    }

    return { error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData,
      }
    });

    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Check your email for the confirmation link!');
    }

    return { error };
  };

  const signOut = async () => {
    try {
      // First clear local state
      setUser(null);
      setSession(null);
      
      // Then attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut({
        scope: 'local' // This ensures we clear local session even if server call fails
      });
      
      // If server logout fails but it's a session_not_found error, we still consider it successful
      // since the session is already invalid on the server
      if (error && !error.message.includes('session_not_found') && !error.message.includes('Session not found')) {
        console.error('Sign out error:', error);
        // Don't throw here, just log - the user state is already cleared
      } else {
        console.log('Successfully signed out');
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      // Even if something goes wrong, ensure local state is cleared
      setUser(null);
      setSession(null);
    }
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/auth`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      console.error('Password reset error:', error);
    } else {
      console.log('Password reset email sent!');
    }

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Disclaimer modal removed - no more annoying popups on login */}
    </AuthContext.Provider>
  );
};
