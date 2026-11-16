import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { MENTOR_SUGGESTIONS, MOCK_MENTOR_REPLIES } from '@/data/mockData';
import { Bot, Send, Sparkles, User } from 'lucide-react';

interface Msg { role: 'user' | 'ai'; text: string }

function getReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('interview')) return MOCK_MENTOR_REPLIES.interview;
  if (lower.includes('python') && lower.includes('loop')) return MOCK_MENTOR_REPLIES.python;
  if (lower.includes('resume')) return MOCK_MENTOR_REPLIES.resume;
  if (lower.includes('sql')) return MOCK_MENTOR_REPLIES.sql;
  if (lower.includes('project')) return MOCK_MENTOR_REPLIES.projects;
  return "I'm your AI mentor! I can help with interview prep, concepts like Python loops and SQL, resume building, and project suggestions. Try one of the suggested questions below, or ask me anything about your career journey.";
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: "Hi Yaswanth! I'm your AI Mentor. I'm here 24/7 to help you with concepts, interview prep, resume tips, and project ideas. What would you like to learn today?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', text: getReply(text) }]);
      setTyping(false);
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-7rem)] lg:h-[calc(100vh-5rem)] flex flex-col">
      <PageHeader icon={<Bot className="w-6 h-6" />} title="AI Mentor" subtitle="Your always-on career guide. Ask anything." />

      <GlassCard className="flex-1 flex flex-col overflow-hidden" hover={false}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 space-y-4">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'gradient-primary' : 'bg-muted'}`}>
                {m.role === 'ai' ? <Sparkles className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${m.role === 'ai' ? 'glass' : 'gradient-primary text-white'}`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="glass px-4 py-3 rounded-2xl flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="w-2 h-2 rounded-full bg-primary" animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 md:px-6 pb-3 flex flex-wrap gap-2">
            {MENTOR_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full glass hover:bg-primary/10 hover:text-primary transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 md:p-6 pt-3 border-t border-border">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI mentor anything..."
              className="flex-1 px-4 py-3 rounded-xl bg-muted/50 outline-none text-sm focus:ring-2 ring-primary/40 transition-all"
            />
            <Button type="submit" size="icon" className="gradient-primary text-white border-0 rounded-xl h-12 w-12 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}
