import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CODING_PROBLEMS } from '@/data/mockData';
import { Code2, CheckCircle, Circle, Play, Terminal } from 'lucide-react';

const DIFF_COLOR = { Easy: 'text-green-500 bg-green-500/10', Medium: 'text-orange-500 bg-orange-500/10', Hard: 'text-red-500 bg-red-500/10' };

export default function CodingPage() {
  const [selected, setSelected] = useState(CODING_PROBLEMS[0].id);
  const [code, setCode] = useState('def two_sum(nums, target):\n    # Write your solution here\n    pass');
  const problem = CODING_PROBLEMS.find((p) => p.id === selected)!;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader icon={<Code2 className="w-6 h-6" />} title="Coding Practice" subtitle="Sharpen your problem-solving with curated challenges." />

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Problem list */}
        <div className="space-y-2">
          {CODING_PROBLEMS.map((p, i) => (
            <motion.button key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} onClick={() => setSelected(p.id)} className={`w-full p-4 rounded-xl text-left transition-all ${selected === p.id ? 'glass-strong border-primary/40 shadow-md' : 'glass hover:bg-muted/40'}`}>
              <div className="flex items-center gap-2 mb-1">
                {p.solved ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-muted-foreground/40" />}
                <span className="text-sm font-medium flex-1">{p.title}</span>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLOR[p.difficulty]}`}>{p.difficulty}</span>
                <span className="text-xs text-muted-foreground">{p.topic}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold font-display text-lg">{problem.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLOR[problem.difficulty]}`}>{problem.difficulty}</span>
                  <Badge variant="secondary" className="text-xs">{problem.topic}</Badge>
                </div>
              </div>
              {problem.solved && <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">Solved</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input has exactly one solution.
            </p>
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-muted/60">Example 1</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-muted/60">Constraints</span>
            </div>
          </GlassCard>

          <GlassCard className="overflow-hidden" hover={false}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Terminal className="w-4 h-4" /> main.py
              </div>
              <span className="text-xs text-muted-foreground">Python</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-transparent font-mono text-sm outline-none resize-none scrollbar-thin"
              spellCheck={false}
            />
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Auto-saved</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">Run</Button>
                <Button size="sm" className="gradient-primary text-white border-0 rounded-xl"><Play className="w-4 h-4 mr-1" /> Submit</Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
