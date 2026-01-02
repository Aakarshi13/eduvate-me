import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, Lock, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const SignUp: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.toast({
        title: "Passwords don't match",
        description: "Please check your password entry",
      });
      return;
    }

    setSubmitting(true);
    try {
      await auth.signUp(email, password);
      toast.toast({ title: "Account created", description: `Welcome ${email}` });
      navigate("/", { replace: true });
    } catch (err) {
      toast.toast({ title: "Sign up failed", description: String(err) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large animated orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-float-rotate" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float delay-2s" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl animate-float delay-3s" />

        {/* Animated lines/rays */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(166 76% 42%)" />
              <stop offset="100%" stopColor="hsl(158 64% 52%)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#grad2)" strokeWidth="2" opacity="0.1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#grad2)" strokeWidth="2" opacity="0.1" />
          <circle cx="50%" cy="50%" r="300" fill="none" stroke="url(#grad2)" strokeWidth="1" opacity="0.05" />
        </svg>

        {/* Grid pattern */}
        <div className="fixed inset-0 opacity-10 grid-pattern-dark" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Decorative top elements */}
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400/50 animate-bounce-slight delay-0" />
          <div className="w-2 h-2 rounded-full bg-teal-400/50 animate-bounce-slight delay-200ms" />
          <div className="w-2 h-2 rounded-full bg-emerald-400/50 animate-bounce-slight delay-400ms" />
        </div>

        {/* Logo Section with advanced animation */}
        <div className="flex flex-col items-center gap-6 animate-slide-up">
          <div className="relative group">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 animate-rotate-slow" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-lg opacity-50" />
            
            {/* Icon container */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-2xl border border-green-400/30 animate-glow-pulse">
              <GraduationCap className="w-10 h-10 text-white drop-shadow-lg" />
            </div>

            {/* Sparkle decorations */}
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-teal-300 animate-bounce-slight delay-300ms" />
            <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-green-300 animate-bounce-slight delay-600ms" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="font-display font-black text-4xl bg-gradient-to-r from-green-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              College<span className="text-green-400">Predictor</span>
            </h1>
            <p className="text-sm text-teal-300/80 font-medium tracking-wide">Join Our Success Community</p>
          </div>
        </div>

        {/* Form Card with premium styling */}
        <Card className="border border-green-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl animate-slide-up delay-200ms">
          <CardHeader className="space-y-3 pb-6 border-b border-green-500/10">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-teal-400 rounded-full" />
              <CardTitle className="text-2xl text-white">Create account</CardTitle>
            </div>
            <CardDescription className="text-teal-300/70 text-sm">
              Join thousands of students finding their perfect college
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5 pt-6">
              {/* Email Input */}
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-sm font-semibold text-teal-300">Email address</Label>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-5 h-5 text-green-400 group-focus-within:text-teal-300 transition-colors" />
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={submitting}
                      className="pl-10 h-12 bg-slate-800/50 border border-green-500/20 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-slate-800/80 transition-all"
                    />
                  </div>
                </div>
              </div>
              {/* Password Input */}
              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-sm font-semibold text-teal-300">Password</Label>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-5 h-5 text-green-400 group-focus-within:text-teal-300 transition-colors" />
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={submitting}
                      className="pl-10 h-12 bg-slate-800/50 border border-green-500/20 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-slate-800/80 transition-all"
                    />
                  </div>
                </div>
              </div>
              {/* Confirm Password Input */}
              <div className="space-y-2 group">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-teal-300">Confirm password</Label>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative flex items-center">
                    <CheckCircle className="absolute left-3 w-5 h-5 text-green-400 group-focus-within:text-teal-300 transition-colors" />
                    <Input
                      id="confirmPassword"
                      placeholder="••••••••"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={submitting}
                      className="pl-10 h-12 bg-slate-800/50 border border-green-500/20 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-slate-800/80 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-500/50 transition-all relative overflow-hidden group"
                disabled={submitting}
              >
                <span className="relative flex items-center justify-center gap-2">
                  {submitting ? "Creating account..." : "Create account"}
                  {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </span>
              </Button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-green-500/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-900 px-3 text-xs uppercase font-semibold text-slate-400">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Sign In Link */}
              <Button
                asChild
                className="w-full h-12 border-2 border-teal-400/30 bg-transparent hover:bg-teal-400/10 text-teal-300 font-bold transition-all group"
                disabled={submitting}
              >
                <Link to="/login" className="flex items-center justify-center gap-2">
                  Sign in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bottom decorative info */}
        <div className="text-center space-y-3 animate-slide-up delay-400ms">
          <p className="text-xs text-slate-400">
            🌟 Demo mode - Use any email/password
          </p>
          <div className="flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-green-400/50" />
            <p className="text-xs text-slate-500">Your college journey starts here</p>
            <div className="w-1 h-1 rounded-full bg-teal-400/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
