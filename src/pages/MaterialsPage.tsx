import { motion } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { STUDY_MATERIALS } from '@/data/mockData';
import { FileText, PlayCircle, Download, FileText as FileTextIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function MaterialsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={<FileTextIcon className="w-6 h-6" />} title="Study Materials" subtitle="Notes, PDFs, and videos curated for your roadmap." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STUDY_MATERIALS.map((m, i) => {
          const Icon = (Icons as any)[m.icon] || FileText;
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
              <GlassCard className="p-5 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${m.type === 'Video' ? 'bg-cyan-500/10' : 'bg-purple-500/10'}`}>
                  <Icon className={`w-6 h-6 ${m.type === 'Video' ? 'text-cyan-500' : 'text-purple-500'}`} />
                </div>
                <h3 className="font-medium font-display mb-1">{m.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{m.type} · {m.size}</p>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl">Open</Button>
                  <Button size="sm" variant="ghost" className="rounded-xl"><Download className="w-4 h-4" /></Button>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
