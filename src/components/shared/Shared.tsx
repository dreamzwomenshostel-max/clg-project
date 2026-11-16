import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 dark:bg-blue-600/15 blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-500/15 dark:bg-purple-600/10 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
    </div>
  );
}

export function PageHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 mb-8"
    >
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl gradient-primary text-white shadow-lg glow-primary shrink-0">
          {icon}
        </div>
      )}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{title}</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return <div className={`relative overflow-hidden rounded-2xl bg-muted/50 animate-shimmer ${className}`} />;
}

export function GlassCard({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`glass rounded-2xl shadow-sm ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
