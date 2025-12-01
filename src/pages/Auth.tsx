
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Check, X, Shield, AlertTriangle } from 'lucide-react';
import { TermsAndConditions } from '@/components/TermsAndConditions';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'tenant'
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });
  
  const { signIn, signUp, user, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const applyPostOAuthUpdates = async () => {
      if (!user) return;
      const url = new URL(window.location.href);
      const oauthRole = url.searchParams.get('oauth_role');
      const termsAccepted = url.searchParams.get('terms_accepted');
      const termsAcceptedAt = url.searchParams.get('terms_accepted_at');

      const updateData: any = {};
      if (oauthRole === 'tenant' || oauthRole === 'landlord') {
        updateData.role = oauthRole;
      }
      if (termsAccepted === '1' || termsAccepted === 'true') {
        updateData.terms_accepted = true;
        if (termsAcceptedAt) updateData.terms_accepted_at = termsAcceptedAt;
      }

      if (Object.keys(updateData).length > 0) {
        try {
          await supabase.from('profiles').update(updateData).eq('id', user.id);
        } catch (e) {
          console.error('Failed to apply post-OAuth updates:', e);
        } finally {
          url.searchParams.delete('oauth_role');
          url.searchParams.delete('terms_accepted');
          url.searchParams.delete('terms_accepted_at');
          window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
        }
      }
      navigate('/');
    };
    applyPostOAuthUpdates();
  }, [user, navigate]);

  // Password strength validation function
  const validatePasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    let score = 0;
    let feedback = '';

    if (metRequirements <= 2) {
      score = 1;
      feedback = 'Weak';
    } else if (metRequirements <= 3) {
      score = 2;
      feedback = 'Fair';
    } else if (metRequirements <= 4) {
      score = 3;
      feedback = 'Good';
    } else {
      score = 4;
      feedback = 'Strong';
    }

    return { score, feedback, requirements };
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (!error) {
      navigate('/');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the Terms and Conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordStrength.score < 3) {
      toast({
        title: "Weak Password",
        description: "Please use a stronger password. Your password should be at least 'Good' strength.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(signUpData.email, signUpData.password, {
      first_name: signUpData.firstName,
      last_name: signUpData.lastName,
      role: signUpData.role,
      terms_accepted: true,
      terms_accepted_at: new Date().toISOString()
    });
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email for a confirmation link before signing in.",
        variant: "default"
      });
      // Reset form on success
      setSignUpData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'tenant'
      });
      setAcceptedTerms(false);
      setPasswordStrength({
        score: 0,
        feedback: '',
        requirements: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false
        }
      });
      setPasswordsMatch(null);
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await resetPassword(forgotPasswordEmail);
    
    if (!error) {
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast({
          title: "Google Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleGoogleSignUp = async (role: 'tenant' | 'landlord') => {
    if (!acceptedTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the Terms and Conditions to continue.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const acceptedAt = new Date().toISOString();
      const redirectUrl = `${window.location.origin}/auth?oauth_role=${role}&terms_accepted=1&terms_accepted_at=${encodeURIComponent(acceptedAt)}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) {
        toast({
          title: 'Google Sign Up Failed',
          description: error.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    }
    setIsLoading(false);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        {/* Decorative gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div className="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full p-5 animate-scale-in border-2 border-accent/30" style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-gold)' }}>
                <Home className="h-10 w-10 text-background" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-foreground tracking-tight">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <Card className="border-accent/20 shadow-elegant backdrop-blur-sm bg-card/98">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="text-2xl font-semibold">Forgot Password</CardTitle>
              <CardDescription className="text-muted-foreground">
                We'll send you a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-sm font-medium text-foreground">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 transition-all hover:border-accent hover:text-accent"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 font-semibold transition-all hover:scale-[1.02] text-primary-foreground" 
                    style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-gold)' }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      {/* Decorative gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
      <div className="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full p-5 animate-scale-in border-2 border-accent/30" style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-gold)' }}>
              <Home className="h-10 w-10 text-background" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground tracking-tight">
            Welcome to DwellMerge
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
            Find your perfect rental home or list your property
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 backdrop-blur-sm p-1.5 h-14 rounded-xl border border-border/30">
            <TabsTrigger value="signin" className="data-[state=active]:bg-card data-[state=active]:shadow-elegant data-[state=active]:text-accent transition-all rounded-lg font-semibold">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-card data-[state=active]:shadow-elegant data-[state=active]:text-accent transition-all rounded-lg font-semibold">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="mt-6">
            <Card className="border-accent/20 shadow-elegant backdrop-blur-sm bg-card/98">
              <CardHeader className="space-y-2 border-b border-border/30 pb-6">
                <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm font-medium text-foreground">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 font-semibold transition-all hover:scale-[1.02] text-primary-foreground" 
                    style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-gold)' }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-3 text-muted-foreground font-semibold">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 transition-all hover:scale-[1.02] hover:border-accent hover:bg-accent/5 font-medium"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                    
                    <div className="text-xs text-accent bg-accent/10 p-3 rounded-lg border border-accent/20">
                      <strong className="text-foreground">Note for Landlords:</strong> <span className="text-muted-foreground">Google sign-in creates a basic tenant account. 
                      Please use the sign-up form to properly set your role as a landlord.</span>
                    </div>
                  </div>
                  
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-accent hover:text-accent/80 underline underline-offset-4 transition-colors font-medium"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-6">
            <Card className="border-accent/20 shadow-elegant backdrop-blur-sm bg-card/98">
              <CardHeader className="space-y-2 border-b border-border/30 pb-6">
                <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create a new account to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-sm font-medium text-foreground">First Name</Label>
                      <Input
                        id="first-name"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                        className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-sm font-medium text-foreground">Last Name</Label>
                      <Input
                        id="last-name"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                        className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium text-foreground">I am a</Label>
                    <Select value={signUpData.role} onValueChange={(value) => setSignUpData({ ...signUpData, role: value })}>
                      <SelectTrigger className="h-12 focus:border-accent focus:ring-accent/20 bg-background/50">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant">Tenant (Looking for rentals)</SelectItem>
                        <SelectItem value="landlord">Landlord (Renting out property)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpData.password}
                      onChange={(e) => {
                        const newPassword = e.target.value;
                        setSignUpData({ ...signUpData, password: newPassword });
                        
                        // Validate password strength
                        const strength = validatePasswordStrength(newPassword);
                        setPasswordStrength(strength);
                        
                        // Check password match if confirm password exists
                        if (signUpData.confirmPassword) {
                          setPasswordsMatch(newPassword === signUpData.confirmPassword);
                        } else {
                          setPasswordsMatch(null);
                        }
                      }}
                      className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                      required
                    />
                    
                    {/* Password strength indicator */}
                    {signUpData.password && (
                      <div className="mt-3 space-y-3 p-4 rounded-lg bg-secondary/30 border border-border/30">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-muted-foreground">Password Strength</span>
                              <span className={`text-xs font-bold ${
                                passwordStrength.score === 1 ? 'text-destructive' :
                                passwordStrength.score === 2 ? 'text-orange-500' :
                                passwordStrength.score === 3 ? 'text-yellow-600 dark:text-yellow-500' :
                                passwordStrength.score === 4 ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'
                              }`}>
                                {passwordStrength.feedback}
                              </span>
                            </div>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4].map((level) => (
                                <div
                                  key={level}
                                  className={`h-2 flex-1 rounded-full transition-all ${
                                    level <= passwordStrength.score
                                      ? level === 1 ? 'bg-destructive shadow-sm' :
                                        level === 2 ? 'bg-orange-500 shadow-sm' :
                                        level === 3 ? 'bg-yellow-500 shadow-sm' :
                                        'bg-green-500 shadow-sm'
                                      : 'bg-border'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {passwordStrength.score >= 3 ? (
                            <Shield className="h-5 w-5 text-green-600 dark:text-green-500" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        
                        {/* Password requirements checklist */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`flex items-center gap-1.5 transition-colors ${
                            passwordStrength.requirements.length ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'
                          }`}>
                            {passwordStrength.requirements.length ? 
                              <Check className="h-3.5 w-3.5" /> : 
                              <X className="h-3.5 w-3.5" />
                            }
                            <span className="font-medium">8+ characters</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${
                            passwordStrength.requirements.uppercase ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'
                          }`}>
                            {passwordStrength.requirements.uppercase ? 
                              <Check className="h-3.5 w-3.5" /> : 
                              <X className="h-3.5 w-3.5" />
                            }
                            <span className="font-medium">Uppercase</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${
                            passwordStrength.requirements.lowercase ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'
                          }`}>
                            {passwordStrength.requirements.lowercase ? 
                              <Check className="h-3.5 w-3.5" /> : 
                              <X className="h-3.5 w-3.5" />
                            }
                            <span className="font-medium">Lowercase</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${
                            passwordStrength.requirements.number ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'
                          }`}>
                            {passwordStrength.requirements.number ? 
                              <Check className="h-3.5 w-3.5" /> : 
                              <X className="h-3.5 w-3.5" />
                            }
                            <span className="font-medium">Number</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${
                            passwordStrength.requirements.special ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'
                          }`}>
                            {passwordStrength.requirements.special ? 
                              <Check className="h-3.5 w-3.5" /> : 
                              <X className="h-3.5 w-3.5" />
                            }
                            <span className="font-medium">Special char</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => {
                        const newConfirmPassword = e.target.value;
                        setSignUpData({ ...signUpData, confirmPassword: newConfirmPassword });
                        
                        // Check password match
                        if (newConfirmPassword && signUpData.password) {
                          setPasswordsMatch(signUpData.password === newConfirmPassword);
                        } else {
                          setPasswordsMatch(null);
                        }
                      }}
                      className="h-12 transition-all focus:border-accent focus:ring-accent/20 bg-background/50"
                      required
                    />
                    {/* Password match indicator */}
                    {passwordsMatch !== null && signUpData.confirmPassword && (
                      <div className={`flex items-center gap-2 mt-2 text-sm font-medium transition-colors ${
                        passwordsMatch ? 'text-green-600 dark:text-green-500' : 'text-destructive'
                      }`}>
                        {passwordsMatch ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Passwords match</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4" />
                            <span>Passwords do not match</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                   <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/30 border border-border/30 transition-all hover:bg-secondary/50">
                     <Checkbox
                       id="terms"
                       checked={acceptedTerms}
                       onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                       className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                     />
                     <Label
                       htmlFor="terms"
                       className="text-sm font-medium leading-relaxed cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                     >
                       I agree to the{' '}
                       <a 
                         href="/terms" 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="text-accent hover:text-accent/80 underline underline-offset-4 font-semibold transition-colors"
                       >
                         Terms and Conditions
                       </a>
                     </Label>
                   </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02] text-primary-foreground" 
                    style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-gold)' }}
                    disabled={isLoading || !acceptedTerms || passwordStrength.score < 3}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-3 text-muted-foreground font-semibold">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 transition-all hover:scale-[1.02] hover:border-accent hover:bg-accent/5 font-medium"
                      onClick={() => handleGoogleSignUp('tenant')}
                      disabled={isLoading || !acceptedTerms}
                    >
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Sign up with Google (Tenant)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 transition-all hover:scale-[1.02] hover:border-accent hover:bg-accent/5 font-medium"
                      onClick={() => handleGoogleSignUp('landlord')}
                      disabled={isLoading || !acceptedTerms}
                    >
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Sign up with Google as Landlord
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
