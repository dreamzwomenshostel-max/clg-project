import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Progress } from '@/components/ui/progress';
import { ROADMAP } from '@/data/mockData';
import { Map, CheckCircle, Lock, Circle, Star } from 'lucide-react';

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon={<Map className="w-6 h-6" />} title="Your Career Roadmap" subtitle="A visual timeline from where you are to your dream job." />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {ROADMAP.map((phase, i) => {
            const state = phase.progress === 100 ? 'done' : phase.progress > 0 ? 'active' : i <= 1 ? 'active' : 'locked';
            return (
              <motion.div key={phase.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative pl-16">
                <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${state === 'done' ? 'bg-green-500' : state === 'active' ? 'gradient-primary glow-primary' : 'bg-muted'}`}>
                  {state === 'done' ? <CheckCircle className="w-6 h-6 text-white" /> : state === 'locked' ? <Lock className="w-5 h-5 text-muted-foreground" /> : <span className="text-white font-bold font-display">{i + 1}</span>}
                </div>
                <GlassCard className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold font-display">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium shrink-0">{phase.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={phase.progress} className="h-2 flex-1" />
                    <span className="text-xs font-semibold w-10 text-right">{phase.progress}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {phase.lessons.slice(0, 4).map((l) => (
                      <span key={l.id} className="text-xs px-2 py-1 rounded-lg bg-muted/50 text-muted-foreground flex items-center gap-1">
                        {l.done ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Circle className="w-3 h-3" />}
                        {l.title.length > 22 ? l.title.slice(0, 22) + '…' : l.title}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}

          {/* Final goal */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ROADMAP.length * 0.08 }} className="relative pl-16">
            <div className="absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center gradient-hero glow-accent">
              <Star className="w-6 h-6 text-white" />
            </div>
            <GlassCard className="p-5 border-primary/30">
              <h3 className="font-semibold font-display text-gradient">Dream Career Achieved</h3>
              <p className="text-sm text-muted-foreground">You’ve made it. Time to celebrate and pay it forward.</p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
