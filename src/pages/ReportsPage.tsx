import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Progress } from '@/components/ui/progress';
import { SKILL_RADAR, WEEKLY_PROGRESS, ROADMAP } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, CartesianGrid } from 'recharts';
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';

export default function ReportsPage() {
  const monthlyData = [
    { month: 'Apr', hours: 42, lessons: 8 },
    { month: 'May', hours: 68, lessons: 15 },
    { month: 'Jun', hours: 85, lessons: 22 },
    { month: 'Jul', hours: 102, lessons: 31 },
    { month: 'Aug', hours: 64, lessons: 18 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader icon={<BarChart3 className="w-6 h-6" />} title="Progress Reports" subtitle="Deep insights into your learning journey." />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Hours', value: '361h', sub: '+18% this month', icon: Clock, color: 'text-blue-500 bg-blue-500/10' },
          { label: 'Lessons Done', value: '94', sub: 'of 142 total', icon: Target, color: 'text-cyan-500 bg-cyan-500/10' },
          { label: 'Avg Score', value: '87%', sub: 'across 23 quizzes', icon: TrendingUp, color: 'text-green-500 bg-green-500/10' },
          { label: 'Problems Solved', value: '47', sub: '+12 this week', icon: BarChart3, color: 'text-purple-500 bg-purple-500/10' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-5">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><s.icon className="w-5 h-5" /></div>
              <p className="text-2xl font-bold font-display">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xs text-green-500 mt-1">{s.sub}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-6">
            <h3 className="font-semibold font-display mb-4">Monthly Study Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--popover))', fontSize: 13 }} />
                <Line type="monotone" dataKey="hours" stroke="url(#lineGrad)" strokeWidth={3} dot={{ r: 4, fill: '#2563EB' }} />
                <Line type="monotone" dataKey="lessons" stroke="#7C3AED" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="p-6">
            <h3 className="font-semibold font-display mb-4">Skill Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={SKILL_RADAR}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--popover))', fontSize: 13 }} />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-6">
          <h3 className="font-semibold font-display mb-4">Phase Completion</h3>
          <div className="space-y-4">
            {ROADMAP.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-muted-foreground">{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-2.5" />
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
