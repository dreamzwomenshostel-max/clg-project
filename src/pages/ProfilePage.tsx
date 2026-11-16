import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { User, Target, Award, BookOpen, Code2, Briefcase, Edit, GraduationCap, MapPin, Mail, Phone, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user, onboarding } = useApp();
  const initials = (user?.fullName || 'Yaswanth Kumar').split(' ').map((n) => n[0]).join('');

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={<User className="w-6 h-6" />} title="Profile" subtitle="Your career identity at a glance." />

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
          <GlassCard className="p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full gradient-hero opacity-20 blur-xl" />
              <Avatar className="w-24 h-24 mx-auto gradient-primary border-4 border-background">
                <AvatarFallback className="gradient-primary text-white text-2xl font-bold font-display">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-xl font-bold font-display">{user?.fullName || 'Yaswanth Kumar'}</h2>
            <p className="text-sm text-muted-foreground">{user?.email || 'yaswanth@careeros.ai'}</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" /> {user?.city || 'Chennai'}
            </div>
            <Button variant="outline" className="w-full mt-5 rounded-xl"><Edit className="w-4 h-4 mr-1" /> Edit Profile</Button>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <h3 className="font-semibold font-display mb-4">Career Goal</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center"><Target className="w-6 h-6 text-white" /></div>
              <div>
                <p className="font-medium text-lg">{onboarding?.dreamCareer || 'Full Stack Developer'}</p>
                <p className="text-sm text-muted-foreground">Target: {onboarding?.deadline || '6 Months'} · {onboarding?.skillLevel || 'Intermediate'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1.5"><span className="text-muted-foreground">Job Readiness</span><span className="font-semibold">68%</span></div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5"><span className="text-muted-foreground">Roadmap Progress</span><span className="font-semibold">42%</span></div>
                <Progress value={42} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5"><span className="text-muted-foreground">Skills Mastered</span><span className="font-semibold">55%</span></div>
                <Progress value={55} className="h-2" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-6 h-full">
            <h3 className="font-semibold font-display mb-4">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <InfoRow icon={Mail} label="Email" value={user?.email || 'yaswanth@careeros.ai'} />
              <InfoRow icon={Phone} label="Phone" value={user?.phone || '+91 98765 43210'} />
              <InfoRow icon={GraduationCap} label="College" value={user?.college || 'IIT Madras'} />
              <InfoRow icon={BookOpen} label="Degree" value={user?.degree || 'B.Tech'} />
              <InfoRow icon={BookOpen} label="Department" value={user?.department || 'CSE'} />
              <InfoRow icon={Calendar} label="Year" value={user?.year || '3rd Year'} />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="p-6 h-full">
            <h3 className="font-semibold font-display mb-4">Learning Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Hours', value: '361h', icon: BookOpen, color: 'text-blue-500 bg-blue-500/10' },
                { label: 'Lessons Done', value: '94', icon: BookOpen, color: 'text-cyan-500 bg-cyan-500/10' },
                { label: 'Problems Solved', value: '47', icon: Code2, color: 'text-purple-500 bg-purple-500/10' },
                { label: 'Projects Built', value: '3', icon: Briefcase, color: 'text-orange-500 bg-orange-500/10' },
                { label: 'Quizzes Taken', value: '23', icon: Award, color: 'text-green-500 bg-green-500/10' },
                { label: 'Day Streak', value: '12', icon: Award, color: 'text-pink-500 bg-pink-500/10' },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-muted/40">
                  <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}><s.icon className="w-4 h-4" /></div>
                  <p className="text-lg font-bold font-display">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard className="p-6 mt-4">
          <h3 className="font-semibold font-display mb-4">Certificates</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Python for Everybody — Coursera', 'React Developer — Meta', 'SQL Fundamentals — HackerRank'].map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0"><Award className="w-5 h-5 text-white" /></div>
                <p className="text-sm font-medium">{c}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/40">
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
