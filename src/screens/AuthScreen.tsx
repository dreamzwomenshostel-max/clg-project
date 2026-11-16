import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Mail, Lock, Phone, User, GraduationCap, Building2, MapPin, Calendar, ArrowRight, ArrowLeft, Brain } from 'lucide-react';

type Mode = 'login' | 'register';

export default function AuthScreen() {
  const { screen, login, register } = useApp();
  const [mode, setMode] = useState<Mode>(screen === 'register' ? 'register' : 'login');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    college: '', degree: '', department: '', year: '', city: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'login') {
      if (!form.email) e.email = 'Email is required';
      if (!form.password) e.password = 'Password is required';
    } else {
      if (!form.fullName) e.fullName = 'Required';
      if (!form.email) e.email = 'Required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
      if (!form.phone) e.phone = 'Required';
      if (!form.password) e.password = 'Required';
      else if (form.password.length < 6) e.password = 'Min 6 characters';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
      if (!form.college) e.college = 'Required';
      if (!form.degree) e.degree = 'Required';
      if (!form.department) e.department = 'Required';
      if (!form.year) e.year = 'Required';
      if (!form.city) e.city = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') login(form.email || 'yaswanth@careeros.ai');
      else register({
        fullName: form.fullName, email: form.email, phone: form.phone,
        college: form.college, degree: form.degree, department: form.department,
        year: form.year, city: form.city,
      });
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left brand panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-between p-10 rounded-3xl glass-strong relative overflow-hidden min-h-[600px]"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full gradient-hero opacity-30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full gradient-accent opacity-20 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display">CareerOS AI</span>
            </div>
            <h1 className="text-4xl font-bold font-display leading-tight mb-4">
              Your personal <span className="text-gradient">AI Mentor</span> for a dream career.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Personalized roadmaps, AI mentorship, mock interviews, and smart job tracking — all in one place.
            </p>
          </div>
          <div className="relative z-10 space-y-3 mt-10">
            {[
              { icon: Sparkles, text: 'AI-generated study roadmaps' },
              { icon: Brain, text: '24/7 AI mentor for instant doubt solving' },
              { icon: GraduationCap, text: 'Track progress from beginner to job-ready' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right form panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-6 md:p-10 shadow-xl"
        >
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display">CareerOS AI</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold font-display mb-1">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {mode === 'login' ? 'Sign in to continue your journey.' : 'Start your career journey today.'}
              </p>

              <form onSubmit={submit} className="space-y-4">
                {mode === 'register' && (
                  <Field icon={<User className="w-4 h-4" />} label="Full Name" error={errors.fullName}>
                    <Input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Yaswanth Kumar" className="h-11 bg-transparent" />
                  </Field>
                )}

                <Field icon={<Mail className="w-4 h-4" />} label="Email" error={errors.email}>
                  <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className="h-11 bg-transparent" />
                </Field>

                {mode === 'register' && (
                  <Field icon={<Phone className="w-4 h-4" />} label="Phone Number" error={errors.phone}>
                    <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" className="h-11 bg-transparent" />
                  </Field>
                )}

                <Field icon={<Lock className="w-4 h-4" />} label="Password" error={errors.password}>
                  <Input type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="••••••••" className="h-11 bg-transparent" />
                </Field>

                {mode === 'register' && (
                  <>
                    <Field icon={<Lock className="w-4 h-4" />} label="Confirm Password" error={errors.confirmPassword}>
                      <Input type="password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} placeholder="••••••••" className="h-11 bg-transparent" />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field icon={<Building2 className="w-4 h-4" />} label="College Name" error={errors.college}>
                        <Input value={form.college} onChange={(e) => set('college', e.target.value)} placeholder="IIT Madras" className="h-11 bg-transparent" />
                      </Field>
                      <Field icon={<GraduationCap className="w-4 h-4" />} label="Degree" error={errors.degree}>
                        <Input value={form.degree} onChange={(e) => set('degree', e.target.value)} placeholder="B.Tech" className="h-11 bg-transparent" />
                      </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field icon={<GraduationCap className="w-4 h-4" />} label="Department" error={errors.department}>
                        <Input value={form.department} onChange={(e) => set('department', e.target.value)} placeholder="CSE" className="h-11 bg-transparent" />
                      </Field>
                      <Field icon={<Calendar className="w-4 h-4" />} label="Year" error={errors.year}>
                        <Input value={form.year} onChange={(e) => set('year', e.target.value)} placeholder="3rd Year" className="h-11 bg-transparent" />
                      </Field>
                    </div>

                    <Field icon={<MapPin className="w-4 h-4" />} label="City" error={errors.city}>
                      <Input value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Chennai" className="h-11 bg-transparent" />
                    </Field>
                  </>
                )}

                <Button type="submit" disabled={loading} className="w-full h-11 gradient-primary text-white border-0 hover:opacity-90 text-base font-medium rounded-xl glow-primary">
                  {loading ? (
                    <motion.span className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <motion.span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </motion.span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {mode === 'login' ? (
                  <>Don&apos;t have an account?{' '}
                    <button onClick={() => { setMode('register'); setErrors({}); }} className="text-primary font-medium hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <button onClick={() => { setMode('login'); setErrors({}); }} className="text-primary font-medium hover:underline flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Back to login
                    </button>
                  </span>
                )}
              </div>

              {mode === 'login' && (
                <button onClick={() => login('yaswanth@careeros.ai')} className="mt-4 w-full text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors">
                  Or try the demo account →
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon, label, error, children }: { icon: React.ReactNode; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
        <span className="text-primary/70">{icon}</span>
        {label}
      </Label>
      <div className="relative">
        {children}
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
