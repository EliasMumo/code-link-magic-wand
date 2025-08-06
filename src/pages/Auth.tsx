
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
    phone: '',
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

  useEffect(() => {
    if (user) {
      navigate('/');
    }
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
      alert('Please accept the Terms and Conditions to continue.');
      return;
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (passwordStrength.score < 3) {
      alert('Please use a stronger password. Your password should be at least "Good" strength.');
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(signUpData.email, signUpData.password, {
      first_name: signUpData.firstName,
      last_name: signUpData.lastName,
      phone: signUpData.phone,
      role: signUpData.role,
      terms_accepted: true,
      terms_accepted_at: new Date().toISOString()
    });
    
    if (error) {
      alert(`Signup failed: ${error.message}`);
    } else {
      alert('Account created successfully! Please check your email for a confirmation link before signing in.');
      // Reset form on success
      setSignUpData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
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

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Home className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                We'll send you a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Home className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to DwellMerge
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Find your perfect rental home or list your property
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-blue-600 hover:text-blue-500 underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a new account to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">I am a</Label>
                    <Select value={signUpData.role} onValueChange={(value) => setSignUpData({ ...signUpData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant">Tenant (Looking for rentals)</SelectItem>
                        <SelectItem value="landlord">Landlord (Renting out property)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
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
                      required
                    />
                    
                    {/* Password strength indicator */}
                    {signUpData.password && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Password Strength</span>
                              <span className={`text-sm font-medium ${
                                passwordStrength.score === 1 ? 'text-red-600' :
                                passwordStrength.score === 2 ? 'text-orange-500' :
                                passwordStrength.score === 3 ? 'text-yellow-600' :
                                passwordStrength.score === 4 ? 'text-green-600' : 'text-gray-400'
                              }`}>
                                {passwordStrength.feedback}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((level) => (
                                <div
                                  key={level}
                                  className={`h-2 flex-1 rounded ${
                                    level <= passwordStrength.score
                                      ? level === 1 ? 'bg-red-500' :
                                        level === 2 ? 'bg-orange-500' :
                                        level === 3 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {passwordStrength.score >= 3 ? (
                            <Shield className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        
                        {/* Password requirements checklist */}
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className={`flex items-center gap-1 ${
                            passwordStrength.requirements.length ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.requirements.length ? 
                              <Check className="h-3 w-3" /> : 
                              <X className="h-3 w-3" />
                            }
                            <span>8+ characters</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.requirements.uppercase ? 
                              <Check className="h-3 w-3" /> : 
                              <X className="h-3 w-3" />
                            }
                            <span>Uppercase</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.requirements.lowercase ? 
                              <Check className="h-3 w-3" /> : 
                              <X className="h-3 w-3" />
                            }
                            <span>Lowercase</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            passwordStrength.requirements.number ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.requirements.number ? 
                              <Check className="h-3 w-3" /> : 
                              <X className="h-3 w-3" />
                            }
                            <span>Number</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            passwordStrength.requirements.special ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.requirements.special ? 
                              <Check className="h-3 w-3" /> : 
                              <X className="h-3 w-3" />
                            }
                            <span>Special char</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
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
                      required
                    />
                    {/* Password match indicator */}
                    {passwordsMatch !== null && signUpData.confirmPassword && (
                      <div className={`flex items-center gap-2 mt-2 text-sm ${
                        passwordsMatch ? 'text-green-600' : 'text-red-600'
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
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold">Terms and Conditions</Label>
                      <TermsAndConditions />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the Terms and Conditions above
                      </Label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading || !acceptedTerms || passwordStrength.score < 3}>
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
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
