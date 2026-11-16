import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CAREERS, CAREER_ICONS } from '@/data/mockData';
import * as Icons from 'lucide-react';
import { ArrowRight, ArrowLeft, Check, Sparkles, Brain, Rocket, Target, Clock, TrendingUp } from 'lucide-react';

const DEADLINES = ['3 Months', '6 Months', '1 Year', '2 Years', 'No Deadline'];
const LEVELS = [
  { label: 'Beginner', desc: 'New to this field', icon: 'Sprout' },
  { label: 'Intermediate', desc: 'Some experience', icon: 'TrendingUp' },
  { label: 'Advanced', desc: 'Confident practitioner', icon: 'Zap' },
];

const LOADING_MESSAGES = [
  'Analyzing your goal...',
  'Generating roadmap...',
  'Preparing study materials...',
  'Building weekly schedule...',
  'Creating assignments...',
  'Finding best learning resources...',
  'Preparing interview roadmap...',
  'Finalizing your personalized plan...',
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [career, setCareer] = useState('');
  const [deadline, setDeadline] = useState('');
  const [level, setLevel] = useState('');
  const [hours, setHours] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setLoadMsg((m) => (m + 1) % LOADING_MESSAGES.length), 700);
    return () => clearInterval(t);
  }, [loading]);

  const finish = () => {
    setLoading(true);
    setLoadMsg(0);
    setTimeout(() => {
      completeOnboarding({ dreamCareer: career || 'Full Stack Developer', deadline: deadline || '6 Months', skillLevel: level || 'Intermediate', studyHours: hours });
    }, 6000);
  };

  if (loading) return <LoadingScreen message={LOADING_MESSAGES[loadMsg]} />;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        {/* Progress dots */}
        {step > 0 && step < 5 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-primary' : 'w-4 bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5 }} className="text-center">
              <motion.div
                className="relative w-40 h-40 mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full gradient-hero opacity-20 blur-2xl animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full gradient-hero opacity-30 blur-xl animate-pulse-ring" style={{ animationDelay: '1s' }} />
                <div className="relative w-40 h-40 rounded-[2rem] gradient-hero flex items-center justify-center shadow-2xl glow-primary animate-float">
                  <Brain className="w-20 h-20 text-white" />
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-bold font-display mb-3">
                Welcome to <span className="text-gradient">CareerOS AI</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
                Your personal AI Mentor that will guide you until you get your dream career.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Button onClick={next} size="lg" className="h-12 px-8 gradient-primary text-white border-0 rounded-xl text-base glow-primary group">
                  Get Started
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 1 && (
            <StepShell key="career" title="What is your Dream Career?" subtitle="Pick the path you’re aiming for — we’ll tailor everything to it.">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CAREERS.map((c, i) => {
                  const Icon = (Icons as any)[CAREER_ICONS[c] || 'Compass'] || Icons.Compass;
                  const sel = career === c;
                  return (
                    <motion.button
                      key={c}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCareer(c)}
                      className={`relative p-4 rounded-2xl border text-left transition-all ${sel ? 'border-primary bg-primary/10 gradient-primary text-white shadow-lg glow-primary' : 'border-border glass hover:border-primary/40'}`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${sel ? 'text-white' : 'text-primary'}`} />
                      <span className={`text-sm font-medium ${sel ? 'text-white' : ''}`}>{c}</span>
                      {sel && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <NavRow onBack={back} onNext={next} disabled={!career} />
            </StepShell>
          )}

          {step === 2 && (
            <StepShell key="deadline" title="When do you want to achieve this goal?" subtitle="Your deadline shapes the intensity of your roadmap.">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DEADLINES.map((d, i) => {
                  const sel = deadline === d;
                  return (
                    <motion.button
                      key={d}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setDeadline(d)}
                      className={`p-5 rounded-2xl border text-center transition-all ${sel ? 'border-primary bg-primary/10 shadow-lg' : 'border-border glass hover:border-primary/40'}`}
                    >
                      <Clock className={`w-6 h-6 mx-auto mb-2 ${sel ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-semibold ${sel ? 'text-primary' : ''}`}>{d}</span>
                    </motion.button>
                  );
                })}
              </div>
              <NavRow onBack={back} onNext={next} disabled={!deadline} />
            </StepShell>
          )}

          {step === 3 && (
            <StepShell key="level" title="What is your current skill level?" subtitle="Be honest — we’ll calibrate your starting point.">
              <div className="grid md:grid-cols-3 gap-4">
                {LEVELS.map((l, i) => {
                  const Icon = (Icons as any)[l.icon];
                  const sel = level === l.label;
                  return (
                    <motion.button
                      key={l.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLevel(l.label)}
                      className={`p-6 rounded-2xl border text-center transition-all ${sel ? 'border-primary bg-primary/10 shadow-lg glow-primary' : 'border-border glass hover:border-primary/40'}`}
                    >
                      <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center ${sel ? 'gradient-primary' : 'bg-primary/10'}`}>
                        <Icon className={`w-7 h-7 ${sel ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <span className={`text-base font-semibold ${sel ? 'text-primary' : ''}`}>{l.label}</span>
                      <p className="text-xs text-muted-foreground mt-1">{l.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
              <NavRow onBack={back} onNext={next} disabled={!level} />
            </StepShell>
          )}

          {step === 4 && (
            <StepShell key="hours" title="How many hours can you study daily?" subtitle="We’ll build your schedule around your availability.">
              <div className="glass-strong rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <motion.div key={hours} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl font-bold font-display text-gradient inline-block">
                    {hours}
                  </motion.div>
                  <span className="text-xl text-muted-foreground ml-2">hours/day</span>
                </div>
                <Slider value={[hours]} onValueChange={(v) => setHours(v[0])} min={1} max={10} step={1} className="mx-auto max-w-md" />
                <div className="flex justify-between text-xs text-muted-foreground mt-3 max-w-md mx-auto">
                  <span>1 hr</span><span>5 hrs</span><span>10 hrs</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-6 max-w-md mx-auto">
                  {[2, 4, 6, 8, 10].map((h) => (
                    <button key={h} onClick={() => setHours(h)} className={`py-2 rounded-lg text-sm font-medium transition-all ${hours === h ? 'gradient-primary text-white' : 'bg-muted/50 hover:bg-muted'}`}>
                      {h}h
                    </button>
                  ))}
                </div>
              </div>
              <NavRow onBack={back} onNext={finish} nextLabel="Generate My Plan" />
            </StepShell>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-2">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

function NavRow({ onBack, onNext, disabled, nextLabel = 'Continue' }: { onBack: () => void; onNext: () => void; disabled?: boolean; nextLabel?: string }) {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button onClick={onBack} variant="ghost" className="text-muted-foreground">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>
      <Button onClick={onNext} disabled={disabled} className="gradient-primary text-white border-0 hover:opacity-90 rounded-xl px-6">
        {nextLabel}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32 mb-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            style={{ borderTopColor: '#2563EB' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-2xl glow-primary">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold font-display mb-2">
        Building your <span className="text-gradient">personalized plan</span>
      </motion.h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-muted-foreground text-lg"
        >
          {message}
        </motion.p>
      </AnimatePresence>
      <div className="flex gap-1.5 mt-8">
        {LOADING_MESSAGES.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
