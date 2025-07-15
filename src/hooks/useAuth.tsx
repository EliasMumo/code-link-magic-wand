
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

import { useTermsAcceptance } from '@/hooks/useTermsAcceptance';
import { useDisclaimerAcceptance } from '@/hooks/useDisclaimerAcceptance';
import { TermsAcceptanceModal } from '@/components/TermsAcceptanceModal';
import { DisclaimerModal } from '@/components/DisclaimerModal';

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
  
  // Terms acceptance handling
  const { 
    needsAcceptance, 
    currentTermsVersion, 
    loading: termsLoading, 
    acceptTerms 
  } = useTermsAcceptance(user?.id);

  // Disclaimer handling
  const { 
    needsDisclaimer, 
    loading: disclaimerLoading, 
    acceptDisclaimer 
  } = useDisclaimerAcceptance(user?.id);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
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
      {/* Show disclaimer first, then terms */}
      {user && needsDisclaimer && !loading && !disclaimerLoading && (
        <DisclaimerModal
          open={true}
          onAccept={acceptDisclaimer}
        />
      )}
      {user && !needsDisclaimer && needsAcceptance && !loading && !termsLoading && (
        <TermsAcceptanceModal
          open={true}
          onAccept={acceptTerms}
          version={currentTermsVersion?.version}
        />
      )}
    </AuthContext.Provider>
  );
};
