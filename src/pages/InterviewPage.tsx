import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { INTERVIEW_QUESTIONS } from '@/data/mockData';
import { Mic, Code2, User, MessageSquare, Send, Sparkles, RotateCcw, CheckCircle } from 'lucide-react';

const TYPES = [
  { key: 'technical', label: 'Technical', icon: Code2, color: 'from-blue-500 to-blue-600', desc: 'Coding & system design' },
  { key: 'hr', label: 'HR', icon: User, color: 'from-purple-500 to-purple-600', desc: 'Background & fit' },
  { key: 'behavioral', label: 'Behavioral', icon: MessageSquare, color: 'from-cyan-500 to-cyan-600', desc: 'Past experiences' },
];

export default function InterviewPage() {
  const [type, setType] = useState<string | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const start = (t: string) => { setType(t); setQIdx(0); setAnswers([]); setAnswer(''); setDone(false); };
  const submit = () => {
    const next = [...answers, answer];
    setAnswers(next);
    setAnswer('');
    if (qIdx + 1 < INTERVIEW_QUESTIONS[type as keyof typeof INTERVIEW_QUESTIONS].length) setQIdx(qIdx + 1);
    else setDone(true);
  };

  if (!type) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={<Mic className="w-6 h-6" />} title="Mock Interview" subtitle="Practice with AI and get instant feedback." />
        <div className="grid md:grid-cols-3 gap-4">
          {TYPES.map((t, i) => (
            <motion.button key={t.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }} onClick={() => start(t.key)} className="p-6 rounded-2xl glass text-center transition-all hover:shadow-lg">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-3`}>
                <t.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold font-display">{t.label} Interview</h3>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-3xl mx-auto">
        <PageHeader icon={<Sparkles className="w-6 h-6" />} title="Interview Evaluation" subtitle="AI-powered analysis of your responses." />
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Communication', score: 78, icon: MessageSquare },
            { label: 'Confidence', score: 65, icon: Mic },
            { label: 'Technical Knowledge', score: 82, icon: Code2 },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold font-display text-gradient">{s.score}%</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <GlassCard className="p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <h3 className="font-semibold font-display">AI Suggestions</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Structure answers using the STAR method for clarity.</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Add concrete metrics to quantify your impact.</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Practice speaking slower to project confidence.</li>
          </ul>
        </GlassCard>
        <div className="flex gap-3">
          <Button onClick={() => setType(null)} variant="outline" className="rounded-xl"><RotateCcw className="w-4 h-4 mr-1" /> New Interview</Button>
          <Button className="gradient-primary text-white border-0 rounded-xl">Save Results</Button>
        </div>
      </div>
    );
  }

  const questions = INTERVIEW_QUESTIONS[type as keyof typeof INTERVIEW_QUESTIONS];
  const q = questions[qIdx];

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon={<Mic className="w-6 h-6" />} title={`${TYPES.find((t) => t.key === type)!.label} Interview`} subtitle={`Question ${qIdx + 1} of ${questions.length}`} />
      <Progress value={(qIdx / questions.length) * 100} className="h-1.5 mb-6" />
      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
          <GlassCard className="p-6 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5 text-white" /></div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">AI Interviewer</p>
                <p className="text-lg font-medium">{q}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6" hover={false}>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here..." className="w-full h-40 p-4 bg-muted/40 rounded-xl outline-none text-sm resize-none scrollbar-thin" />
            <Button onClick={submit} disabled={!answer.trim()} className="w-full mt-4 gradient-primary text-white border-0 rounded-xl">
              <Send className="w-4 h-4 mr-1" /> {qIdx + 1 < questions.length ? 'Next Question' : 'Finish & Evaluate'}
            </Button>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
