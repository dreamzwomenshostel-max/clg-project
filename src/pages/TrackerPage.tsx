import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { JOBS, type JobApp } from '@/data/mockData';
import { Briefcase, Heart, Send, Calendar, XCircle, CheckCircle, Plus, Building2 } from 'lucide-react';

const COLUMNS: { key: JobApp['status']; label: string; icon: any; color: string }[] = [
  { key: 'wishlist', label: 'Wishlist', icon: Heart, color: 'text-pink-500' },
  { key: 'applied', label: 'Applied', icon: Send, color: 'text-blue-500' },
  { key: 'interview', label: 'Interview', icon: Calendar, color: 'text-orange-500' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-500' },
  { key: 'selected', label: 'Selected', icon: CheckCircle, color: 'text-green-500' },
];

export default function TrackerPage() {
  const [view, setView] = useState<'board' | 'timeline'>('board');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <PageHeader icon={<Briefcase className="w-6 h-6" />} title="Job Tracker" subtitle="Track every application from wishlist to offer." />
        <div className="flex gap-2">
          <div className="flex rounded-xl bg-muted/50 p-1">
            <button onClick={() => setView('board')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'board' ? 'glass-strong shadow' : 'text-muted-foreground'}`}>Board</button>
            <button onClick={() => setView('timeline')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'timeline' ? 'glass-strong shadow' : 'text-muted-foreground'}`}>Timeline</button>
          </div>
          <Button className="gradient-primary text-white border-0 rounded-xl"><Plus className="w-4 h-4 mr-1" /> Add</Button>
        </div>
      </div>

      {view === 'board' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {COLUMNS.map((col, ci) => {
            const jobs = JOBS.filter((j) => j.status === col.key);
            return (
              <motion.div key={col.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.05 }}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <col.icon className={`w-4 h-4 ${col.color}`} />
                  <span className="text-sm font-semibold">{col.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{jobs.length}</span>
                </div>
                <div className="space-y-2">
                  {jobs.map((j, i) => (
                    <motion.div key={j.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: ci * 0.05 + i * 0.03 }} whileHover={{ y: -2 }}>
                      <GlassCard className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">{j.logo}</div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{j.company}</p>
                            <p className="text-xs text-muted-foreground truncate">{j.role}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{j.date}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                  {jobs.length === 0 && <div className="text-center text-xs text-muted-foreground py-6 border-2 border-dashed border-border rounded-xl">No jobs</div>}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {JOBS.slice().reverse().map((j, i) => (
              <motion.div key={j.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="relative pl-16">
                <div className="absolute left-0 w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <GlassCard className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{j.company} — {j.role}</p>
                      <p className="text-xs text-muted-foreground">{j.date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">{j.status}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
