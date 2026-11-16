import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { ASSIGNMENTS, type Assignment } from '@/data/mockData';
import { ClipboardList, Upload, CheckCircle, Clock, Award, Sparkles, FileUp } from 'lucide-react';

const STATUS = {
  pending: { label: 'Pending', color: 'text-orange-500 bg-orange-500/10', icon: Clock },
  submitted: { label: 'Submitted', color: 'text-blue-500 bg-blue-500/10', icon: Upload },
  graded: { label: 'Graded', color: 'text-green-500 bg-green-500/10', icon: CheckCircle },
};

export default function AssignmentsPage() {
  const [items, setItems] = useState(ASSIGNMENTS);
  const [uploading, setUploading] = useState<string | null>(null);

  const upload = (id: string) => {
    setUploading(id);
    setTimeout(() => {
      setItems((arr) => arr.map((a) => (a.id === id ? { ...a, status: 'submitted' } : a)));
      setUploading(null);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={<ClipboardList className="w-6 h-6" />} title="Assignments" subtitle="Weekly challenges to test and sharpen your skills." />

      <div className="grid lg:grid-cols-2 gap-4">
        {items.map((a, i) => (
          <AssignmentCard key={a.id} a={a} index={i} uploading={uploading === a.id} onUpload={() => upload(a.id)} />
        ))}
      </div>
    </div>
  );
}

function AssignmentCard({ a, index, uploading, onUpload }: { a: Assignment; index: number; uploading: boolean; onUpload: () => void }) {
  const st = STATUS[a.status];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <GlassCard className="p-6 h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-xs text-muted-foreground">{a.phase}</span>
            <h3 className="font-semibold font-display">{a.title}</h3>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${st.color}`}>
            <st.icon className="w-3 h-3" /> {st.label}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4" /> Due {a.deadline}
        </div>

        {a.status === 'graded' && a.feedback && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold">AI Feedback</span>
              <span className="ml-auto text-lg font-bold text-green-500">{a.score}/100</span>
            </div>
            <p className="text-sm text-muted-foreground">{a.feedback}</p>
          </motion.div>
        )}

        {a.status === 'pending' && (
          <Button onClick={onUpload} disabled={uploading} className="w-full gradient-primary text-white border-0 rounded-xl">
            {uploading ? (
              <motion.span className="flex items-center gap-2">
                <motion.span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                Uploading...
              </motion.span>
            ) : (
              <span className="flex items-center gap-2"><FileUp className="w-4 h-4" /> Upload Submission</span>
            )}
          </Button>
        )}
        {a.status === 'submitted' && (
          <div className="w-full py-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> Submitted — awaiting AI review
          </div>
        )}
        {a.status === 'graded' && (
          <div className="w-full py-2.5 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium text-center flex items-center justify-center gap-2">
            <Award className="w-4 h-4" /> Graded · {a.score}/100
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
