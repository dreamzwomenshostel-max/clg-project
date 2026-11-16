import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ROADMAP, type RoadmapPhase } from '@/data/mockData';
import { BookOpen, PlayCircle, FileText, ClipboardList, HelpCircle, CheckCircle, Circle, ChevronDown, Lock, Video } from 'lucide-react';

const TYPE_ICON = { video: PlayCircle, notes: FileText, assignment: ClipboardList, quiz: HelpCircle };
const TYPE_COLOR = {
  video: 'text-blue-500 bg-blue-500/10',
  notes: 'text-purple-500 bg-purple-500/10',
  assignment: 'text-orange-500 bg-orange-500/10',
  quiz: 'text-cyan-500 bg-cyan-500/10',
};

export default function LearningPage() {
  const [open, setOpen] = useState<string | null>(ROADMAP[0].id);
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(ROADMAP.flatMap((p) => p.lessons.map((l) => [l.id, l.done])))
  );

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={<BookOpen className="w-6 h-6" />} title="Learning Path" subtitle="Your step-by-step journey to job readiness." />

      <div className="space-y-4">
        {ROADMAP.map((phase, i) => (
          <PhaseCard key={phase.id} phase={phase} index={i} open={open === phase.id} onToggle={() => setOpen(open === phase.id ? null : phase.id)} done={done} toggle={toggle} />
        ))}
      </div>
    </div>
  );
}

function PhaseCard({ phase, index, open, onToggle, done, toggle }: { phase: RoadmapPhase; index: number; open: boolean; onToggle: () => void; done: Record<string, boolean>; toggle: (id: string) => void }) {
  const completed = phase.lessons.filter((l) => done[l.id]).length;
  const locked = index > 1;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <GlassCard className="overflow-hidden">
        <button onClick={onToggle} className="w-full p-5 flex items-center gap-4 text-left" disabled={locked}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${locked ? 'bg-muted' : 'gradient-primary'}`}>
            {locked ? <Lock className="w-5 h-5 text-muted-foreground" /> : <span className="text-white font-bold font-display">{index + 1}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold font-display truncate">{phase.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground truncate">{phase.subtitle} · {phase.duration}</p>
            <div className="flex items-center gap-3 mt-2">
              <Progress value={phase.progress} className="h-1.5 flex-1 max-w-xs" />
              <span className="text-xs text-muted-foreground shrink-0">{completed}/{phase.lessons.length}</span>
            </div>
          </div>
          {!locked && (
            <motion.div animate={{ rotate: open ? 180 : 0 }} className="shrink-0">
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          )}
        </button>

        <AnimatePresence>
          {open && !locked && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-5 pb-5 space-y-2 border-t border-border">
                {phase.lessons.map((lesson) => {
                  const Icon = TYPE_ICON[lesson.type];
                  const isDone = done[lesson.id];
                  return (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
                      <button onClick={() => toggle(lesson.id)} className="shrink-0">
                        {isDone ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary" />}
                      </button>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${TYPE_COLOR[lesson.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isDone ? 'line-through text-muted-foreground' : ''}`}>{lesson.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{lesson.type} · {lesson.duration}</p>
                      </div>
                      {!isDone && (
                        <Button size="sm" variant="ghost" className="shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Start
                        </Button>
                      )}
                    </div>
                  );
                })}
                <div className="flex justify-end pt-2">
                  <Button size="sm" className="gradient-primary text-white border-0 rounded-xl">
                    <CheckCircle className="w-4 h-4 mr-1" /> Mark Phase Complete
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}
