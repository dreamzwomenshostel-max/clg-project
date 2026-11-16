import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PROJECTS } from '@/data/mockData';
import { FolderGit2, Plus, Rocket, CheckCircle, Clock, Circle } from 'lucide-react';

const STATUS = {
  completed: { label: 'Completed', color: 'text-green-500 bg-green-500/10', icon: CheckCircle },
  'in-progress': { label: 'In Progress', color: 'text-blue-500 bg-blue-500/10', icon: Clock },
  planned: { label: 'Planned', color: 'text-muted-foreground bg-muted', icon: Circle },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <PageHeader icon={<FolderGit2 className="w-6 h-6" />} title="Projects" subtitle="Build a portfolio that gets you hired." />
        <Button className="gradient-primary text-white border-0 rounded-xl"><Plus className="w-4 h-4 mr-1" /> New Project</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => {
          const st = STATUS[p.status];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${st.color}`}>
                    <st.icon className="w-3 h-3" /> {st.label}
                  </span>
                </div>
                <h3 className="font-semibold font-display mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>)}
                </div>
                {p.status !== 'planned' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{p.progress}%</span>
                    </div>
                    <Progress value={p.progress} className="h-1.5" />
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full mt-4 rounded-xl">View Details</Button>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
