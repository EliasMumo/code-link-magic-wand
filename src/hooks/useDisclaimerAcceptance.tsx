import { useState, useEffect } from 'react';

export const useDisclaimerAcceptance = (userId: string | undefined) => {
  const [needsDisclaimer, setNeedsDisclaimer] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkDisclaimerAcceptance();
  }, [userId]);

  const checkDisclaimerAcceptance = () => {
    try {
      // Check if user has accepted disclaimer in this session
      const sessionKey = `disclaimer_accepted_${userId}`;
      const hasAcceptedThisSession = sessionStorage.getItem(sessionKey);
      
      if (!hasAcceptedThisSession) {
        setNeedsDisclaimer(true);
      }
    } catch (error) {
      console.error('Error checking disclaimer acceptance:', error);
      // If there's an error, show disclaimer for safety
      setNeedsDisclaimer(true);
    } finally {
      setLoading(false);
    }
  };

  const acceptDisclaimer = () => {
    if (!userId) return;

    try {
      // Store acceptance in session storage (will reset on new session/login)
      const sessionKey = `disclaimer_accepted_${userId}`;
      sessionStorage.setItem(sessionKey, 'true');
      setNeedsDisclaimer(false);
    } catch (error) {
      console.error('Error accepting disclaimer:', error);
    }
  };

  return {
    needsDisclaimer,
    loading,
    acceptDisclaimer,
    checkDisclaimerAcceptance
  };
};