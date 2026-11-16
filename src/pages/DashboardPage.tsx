import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { WEEKLY_PROGRESS, ROADMAP, RECENT_ACTIVITY, ACHIEVEMENTS, MOTIVATION_QUOTES, ASSIGNMENTS } from '@/data/mockData';
import {
  Flame, Clock, Target, TrendingUp, BookOpen, Code2, Bot, FileUser, Briefcase,
  CheckCircle, Upload, Award, Rocket, ArrowRight, Calendar, Zap, Star, Trophy, Mic, Footprints, Sword,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const ACTIVITY_ICONS: Record<string, any> = { CheckCircle, Upload, Award, Code: Code2, Rocket };
const ACHIEVE_ICONS: Record<string, any> = { Footprints, Flame, Trophy, Sword, Rocket, Mic, Target, Star };

export default function DashboardPage() {
  const { user, onboarding, setPage } = useApp();
  const firstName = user?.fullName?.split(' ')[0] || 'Yaswanth';
  const quote = MOTIVATION_QUOTES[new Date().getDay() % MOTIVATION_QUOTES.length];
  const [readiness, setReadiness] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setReadiness(68), 300);
    return () => clearTimeout(t);
  }, []);

  const quickActions = [
    { label: 'Continue Learning', icon: BookOpen, page: 'learning' as const, color: 'from-blue-500 to-blue-600' },
    { label: 'Take Quiz', icon: Zap, page: 'quizzes' as const, color: 'from-purple-500 to-purple-600' },
    { label: 'Practice Coding', icon: Code2, page: 'coding' as const, color: 'from-cyan-500 to-cyan-600' },
    { label: 'Ask AI Mentor', icon: Bot, page: 'mentor' as const, color: 'from-blue-500 to-purple-600' },
    { label: 'View Resume', icon: FileUser, page: 'resume' as const, color: 'from-green-500 to-green-600' },
    { label: 'Job Tracker', icon: Briefcase, page: 'tracker' as const, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Hello, {firstName} 👋</h1>
            <p className="text-muted-foreground mt-1">Let’s make today count. Here’s your career snapshot.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">{12}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </div>
      </motion.div>

      {/* Top row: Dream career + Progress ring */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="md:col-span-2">
          <GlassCard className="p-6 h-full relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full gradient-hero opacity-10 blur-2xl" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dream Career</span>
              <Target className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-1">{onboarding?.dreamCareer || 'Full Stack Developer'}</h2>
            <p className="text-muted-foreground text-sm mb-5">Target: {onboarding?.deadline || '6 Months'} · {onboarding?.skillLevel || 'Intermediate'} level</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall roadmap progress</span>
                <span className="font-semibold">42%</span>
              </div>
              <Progress value={42} className="h-2.5" />
            </div>
            <Button onClick={() => setPage('roadmap')} variant="ghost" className="mt-4 p-0 h-auto text-primary hover:bg-transparent hover:underline">
              View full roadmap <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-6 h-full flex flex-col items-center justify-center text-center" hover={false}>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Job Readiness</span>
            <div className="relative w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ value: readiness }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} fill="url(#readinessGrad)" background={{ fill: 'hsl(var(--muted))' }} />
                  <defs>
                    <linearGradient id="readinessGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold font-display">{readiness}%</motion.span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">You’re on track!</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Today's mission + stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Today's Mission", value: 'Functions & Modules', sub: 'Phase 1 · Lesson 3', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Study Hours', value: '5h / 5h', sub: 'Daily goal reached', icon: Clock, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { label: 'Current Streak', value: '12 days', sub: 'Personal best!', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Weekly Progress', value: '34 hrs', sub: '+12% vs last week', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <GlassCard className="p-5 h-full">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold font-display mt-0.5">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Weekly chart + Learning path */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold font-display">Weekly Progress</h3>
                <p className="text-sm text-muted-foreground">Study hours this week</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">+12%</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={WEEKLY_PROGRESS}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--popover))', fontSize: 13 }} />
                <Bar dataKey="hours" fill="url(#barGrad)" radius={[8, 8, 4, 4]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display">Learning Path</h3>
              <Button variant="ghost" size="sm" onClick={() => setPage('learning')} className="text-primary">View all</Button>
            </div>
            <div className="space-y-3">
              {ROADMAP.slice(0, 3).map((phase, i) => (
                <motion.div key={phase.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate">{phase.title.replace('Phase \d+ — ', '')}</span>
                    <span className="text-muted-foreground text-xs">{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-1.5" />
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Upcoming assignment + Recent activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display">Upcoming Assignments</h3>
              <Button variant="ghost" size="sm" onClick={() => setPage('assignments')} className="text-primary">View all</Button>
            </div>
            <div className="space-y-3">
              {ASSIGNMENTS.filter((a) => a.status === 'pending').slice(0, 3).map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.phase} · Due {a.deadline}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium shrink-0">Pending</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GlassCard className="p-6 h-full">
            <h3 className="font-semibold font-display mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {RECENT_ACTIVITY.slice(0, 5).map((a, i) => {
                const Icon = ACTIVITY_ICONS[a.icon] || CheckCircle;
                return (
                  <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm flex-1">{a.text}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Achievements + Motivation */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display">Achievements</h3>
              <Button variant="ghost" size="sm" onClick={() => setPage('achievements')} className="text-primary">View all</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ACHIEVEMENTS.slice(0, 4).map((a, i) => {
                const Icon = ACHIEVE_ICONS[a.icon] || Trophy;
                return (
                  <motion.div key={a.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 + i * 0.05 }} className={`p-4 rounded-xl text-center ${a.earned ? 'glass' : 'bg-muted/30 opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${a.earned ? 'gradient-primary' : 'bg-muted'}`}>
                      <Icon className={`w-6 h-6 ${a.earned ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <p className="text-xs font-medium">{a.title}</p>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <GlassCard className="p-6 h-full flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full gradient-hero opacity-10 blur-2xl" />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center mb-3">
                <Star className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm leading-relaxed font-medium italic">“{quote}”</p>
              <p className="text-xs text-muted-foreground mt-3">Daily Motivation</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <GlassCard className="p-6">
          <h3 className="font-semibold font-display mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.04 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPage(a.page)}
                className="p-4 rounded-xl glass hover:shadow-lg transition-all text-center"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center mx-auto mb-2`}>
                  <a.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium">{a.label}</span>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
