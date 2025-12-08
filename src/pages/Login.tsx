import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await auth.signIn(email, password);
      toast.toast({ title: "Signed in", description: `Welcome ${email}` });
      navigate(from, { replace: true });
    } catch (err) {
      toast.toast({ title: "Sign in failed", description: String(err) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large animated orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-rotate" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float delay-2s" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-float delay-3s" />

        {/* Animated lines/rays */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(234 89% 54%)" />
              <stop offset="100%" stopColor="hsl(258 90% 66%)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#grad1)" strokeWidth="2" opacity="0.1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#grad1)" strokeWidth="2" opacity="0.1" />
          <circle cx="50%" cy="50%" r="300" fill="none" stroke="url(#grad1)" strokeWidth="1" opacity="0.05" />
        </svg>

        {/* Grid pattern */}
        <div className="fixed inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(90deg, hsl(234 89% 54% / 0.3) 1px, transparent 1px), linear-gradient(0deg, hsl(234 89% 54% / 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Decorative top elements */}
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-400/50 animate-bounce-slight delay-0" />
          <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-bounce-slight delay-200ms" />
          <div className="w-2 h-2 rounded-full bg-purple-400/50 animate-bounce-slight delay-400ms" />
        </div>

        {/* Logo Section with advanced animation */}
        <div className="flex flex-col items-center gap-6 animate-slide-up">
          <div className="relative group">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 animate-rotate-slow" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-50" />
            
            {/* Icon container */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl border border-blue-400/30 animate-glow-pulse">
              <GraduationCap className="w-10 h-10 text-white drop-shadow-lg" />
            </div>

            {/* Sparkle decorations */}
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-cyan-300 animate-bounce-slight delay-300ms" />
            <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-purple-300 animate-bounce-slight delay-600ms" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="font-display font-black text-4xl bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              College<span className="text-blue-400">Predictor</span>
            </h1>
            <p className="text-sm text-cyan-300/80 font-medium tracking-wide">Your Gateway to Success</p>
          </div>
        </div>

        {/* Form Card with premium styling */}
        <Card className="border border-blue-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl animate-slide-up delay-200ms">
          <CardHeader className="space-y-3 pb-6 border-b border-blue-500/10">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
              <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
            </div>
            <CardDescription className="text-cyan-300/70 text-sm">
              Sign in to unlock your college prediction dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5 pt-6">
              {/* Email Input */}
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-sm font-semibold text-cyan-300">Email address</Label>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-5 h-5 text-blue-400 group-focus-within:text-cyan-300 transition-colors" />
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={submitting}
                      className="pl-10 h-12 bg-slate-800/50 border border-blue-500/20 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-800/80 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-sm font-semibold text-cyan-300">Password</Label>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-5 h-5 text-blue-400 group-focus-within:text-cyan-300 transition-colors" />
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={submitting}
                      className="pl-10 h-12 bg-slate-800/50 border border-blue-500/20 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-800/80 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all relative overflow-hidden group"
                disabled={submitting}
              >
                <span className="relative flex items-center justify-center gap-2">
                  {submitting ? "Signing in..." : "Sign in"}
                  {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </span>
              </Button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-500/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-900 px-3 text-xs uppercase font-semibold text-slate-400">
                    New here?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Button
                asChild
                className="w-full h-12 border-2 border-cyan-400/30 bg-transparent hover:bg-cyan-400/10 text-cyan-300 font-bold transition-all group"
                disabled={submitting}
              >
                <Link to="/signup" className="flex items-center justify-center gap-2">
                  Create account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bottom decorative info */}
        <div className="text-center space-y-3 animate-slide-up delay-400ms">
          <p className="text-xs text-slate-400">
            🎓 Demo mode - Use any email/password
          </p>
          <div className="flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-blue-400/50" />
            <p className="text-xs text-slate-500">Your predictions are just a sign-in away</p>
            <div className="w-1 h-1 rounded-full bg-purple-400/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
