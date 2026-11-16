import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QUIZ, LEADERBOARD } from '@/data/mockData';
import { HelpCircle, Timer, Trophy, CheckCircle, XCircle, RotateCcw, TrendingUp, Award } from 'lucide-react';

export default function QuizzesPage() {
  const [active, setActive] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || done) return;
    const t = setInterval(() => setTime((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [active, done]);

  const start = () => { setActive(true); setQIdx(0); setSelected(null); setAnswers([]); setTime(0); setDone(false); };
  const submit = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (qIdx + 1 < QUIZ.length) setQIdx(qIdx + 1);
    else setDone(true);
  };

  const score = answers.filter((a, i) => a === QUIZ[i].answer).length;
  const pct = Math.round((score / QUIZ.length) * 100);

  if (!active && !done) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={<HelpCircle className="w-6 h-6" />} title="Quizzes" subtitle="Test your knowledge and climb the leaderboard." />
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <GlassCard className="p-8 text-center h-full flex flex-col justify-center">
              <div className="w-20 h-20 rounded-3xl gradient-primary mx-auto flex items-center justify-center mb-5 glow-primary">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Python Basics Quiz</h2>
              <p className="text-muted-foreground mb-6">{QUIZ.length} questions · ~10 minutes</p>
              <Button onClick={start} size="lg" className="gradient-primary text-white border-0 rounded-xl glow-primary mx-auto">
                Start Quiz
              </Button>
            </GlassCard>
          </motion.div>
          <Leaderboard />
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={<HelpCircle className="w-6 h-6" />} title="Quiz Results" subtitle="Here’s how you did." />
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2">
            <GlassCard className="p-8 text-center h-full flex flex-col justify-center">
              <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring' }} className="w-24 h-24 rounded-full gradient-primary mx-auto flex items-center justify-center mb-5 glow-primary">
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold font-display text-gradient mb-1">{pct}%</h2>
              <p className="text-muted-foreground mb-6">{score} / {QUIZ.length} correct</p>
              <div className="space-y-2 text-left max-w-md mx-auto mb-6">
                {QUIZ.map((q, i) => (
                  <div key={q.id} className="flex items-center gap-2 text-sm">
                    {answers[i] === q.answer ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> : <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                    <span className="truncate">{q.question}</span>
                  </div>
                ))}
              </div>
              <Button onClick={start} variant="outline" className="rounded-xl mx-auto"><RotateCcw className="w-4 h-4 mr-1" /> Retry Quiz</Button>
            </GlassCard>
          </motion.div>
          <Leaderboard />
        </div>
      </div>
    );
  }

  const q = QUIZ[qIdx];
  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon={<HelpCircle className="w-6 h-6" />} title="Quiz in Progress" subtitle="Choose the best answer." />
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Question {qIdx + 1} of {QUIZ.length}</span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-500 font-medium text-sm">
          <Timer className="w-4 h-4" /> {mm}:{ss}
        </div>
      </div>
      <Progress value={(qIdx / QUIZ.length) * 100} className="h-1.5 mb-6" />

      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-lg font-semibold font-display mb-6">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const sel = selected === i;
                return (
                  <motion.button key={i} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => setSelected(i)} className={`w-full p-4 rounded-xl border text-left transition-all ${sel ? 'border-primary bg-primary/10 shadow-md' : 'border-border hover:border-primary/40'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold ${sel ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm font-medium">{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <Button onClick={submit} disabled={selected === null} className="w-full mt-6 gradient-primary text-white border-0 rounded-xl">
              {qIdx + 1 < QUIZ.length ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Leaderboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <GlassCard className="p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold font-display">Leaderboard</h3>
        </div>
        <div className="space-y-2">
          {LEADERBOARD.map((u) => (
            <div key={u.rank} className={`flex items-center gap-3 p-2.5 rounded-xl ${u.rank === 3 ? 'bg-primary/10' : ''}`}>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${u.rank <= 3 ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'}`}>{u.rank}</span>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">{u.avatar}</div>
              <span className="text-sm font-medium flex-1 truncate">{u.name}</span>
              <span className="text-xs text-muted-foreground">{u.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
