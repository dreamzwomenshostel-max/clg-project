import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { ACHIEVEMENTS } from '@/data/mockData';
import { Award, Lock } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function AchievementsPage() {
  const earned = ACHIEVEMENTS.filter((a) => a.earned);
  const locked = ACHIEVEMENTS.filter((a) => !a.earned);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={<Award className="w-6 h-6" />} title="Achievements" subtitle={`${earned.length} of ${ACHIEVEMENTS.length} unlocked. Keep going!`} />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = (Icons as any)[a.icon] || Award;
          return (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }}>
              <GlassCard className={`p-6 text-center h-full ${!a.earned ? 'opacity-60' : ''}`}>
                <div className={`relative w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${a.earned ? 'gradient-primary glow-primary' : 'bg-muted'}`}>
                  <Icon className={`w-8 h-8 ${a.earned ? 'text-white' : 'text-muted-foreground'}`} />
                  {!a.earned && <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background flex items-center justify-center border border-border"><Lock className="w-3 h-3 text-muted-foreground" /></div>}
                </div>
                <h3 className="font-semibold font-display text-sm">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{a.earned ? `Earned ${a.date}` : 'Locked'}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
