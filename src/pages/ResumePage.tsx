import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, PageHeader } from '@/components/shared/Shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { FileUser, Plus, Trash2, Download, Eye, Sparkles, Briefcase, GraduationCap, Award, FolderGit2 } from 'lucide-react';

export default function ResumePage() {
  const { user } = useApp();
  const [preview, setPreview] = useState(false);
  const [skills, setSkills] = useState(['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git']);
  const [newSkill, setNewSkill] = useState('');
  const [projects, setProjects] = useState([
    { title: 'Personal Portfolio', desc: 'Responsive site built with React & Tailwind' },
    { title: 'Task Manager App', desc: 'Full-stack CRUD app with auth' },
  ]);

  const addSkill = () => { if (newSkill.trim()) { setSkills((s) => [...s, newSkill.trim()]); setNewSkill(''); } };
  const removeSkill = (i: number) => setSkills((s) => s.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader icon={<FileUser className="w-6 h-6" />} title="Resume Builder" subtitle="Create an ATS-friendly resume in minutes." />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4"><User2 /> <h3 className="font-semibold font-display">Profile Information</h3></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <FormField label="Full Name" value={user?.fullName || ''} />
              <FormField label="Email" value={user?.email || ''} />
              <FormField label="Phone" value={user?.phone || ''} />
              <FormField label="City" value={user?.city || ''} />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4"><GraduationCap className="w-5 h-5 text-primary" /> <h3 className="font-semibold font-display">Education</h3></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <FormField label="College" value={user?.college || ''} />
              <FormField label="Degree" value={user?.degree || ''} />
              <FormField label="Department" value={user?.department || ''} />
              <FormField label="Year" value={user?.year || ''} />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-primary" /> <h3 className="font-semibold font-display">Skills</h3></div>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((s, i) => (
                <motion.span key={i} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {s}
                  <button onClick={() => removeSkill(i)}><Trash2 className="w-3 h-3 hover:text-destructive" /></button>
                </motion.span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Add a skill..." className="bg-transparent" />
              <Button onClick={addSkill} size="icon" className="gradient-primary text-white border-0 rounded-xl shrink-0"><Plus className="w-4 h-4" /></Button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4"><FolderGit2 className="w-5 h-5 text-primary" /> <h3 className="font-semibold font-display">Projects</h3></div>
            <div className="space-y-3">
              {projects.map((p, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/40">
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3 rounded-xl"><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
          </GlassCard>

          <div className="flex gap-3">
            <Button onClick={() => setPreview(true)} className="flex-1 gradient-primary text-white border-0 rounded-xl"><Eye className="w-4 h-4 mr-1" /> Preview</Button>
            <Button variant="outline" className="rounded-xl"><Download className="w-4 h-4 mr-1" /> Download</Button>
          </div>
        </div>

        {/* Live preview */}
        <div className="hidden lg:block sticky top-24 h-fit">
          <ResumePreview user={user} skills={skills} projects={projects} />
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setPreview(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl p-2" onClick={(e) => e.stopPropagation()}>
              <ResumePreview user={user} skills={skills} projects={projects} />
              <div className="p-4 flex gap-2">
                <Button className="flex-1 gradient-primary text-white border-0 rounded-xl"><Download className="w-4 h-4 mr-1" /> Download PDF</Button>
                <Button variant="outline" onClick={() => setPreview(false)} className="rounded-xl">Close</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function User2() { return <Briefcase className="w-5 h-5 text-primary" />; }

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground mb-1">{label}</Label>
      <Input defaultValue={value} className="bg-transparent h-10" />
    </div>
  );
}

function ResumePreview({ user, skills, projects }: { user: any; skills: string[]; projects: { title: string; desc: string }[] }) {
  return (
    <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl" style={{ minHeight: '500px' }}>
      <div className="border-b-2 border-blue-600 pb-4 mb-4">
        <h1 className="text-2xl font-bold">{user?.fullName || 'Yaswanth Kumar'}</h1>
        <p className="text-sm text-gray-600 mt-1">{user?.email || 'yaswanth@careeros.ai'} · {user?.phone || '+91 98765 43210'} · {user?.city || 'Chennai'}</p>
      </div>
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-2">Education</h2>
        <p className="text-sm"><strong>{user?.college || 'IIT Madras'}</strong> — {user?.degree || 'B.Tech'} {user?.department || 'CSE'}, {user?.year || '3rd Year'}</p>
      </section>
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s, i) => <span key={i} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">{s}</span>)}
        </div>
      </section>
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-2">Projects</h2>
        <div className="space-y-2">
          {projects.map((p, i) => (
            <div key={i}>
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-2">Certifications</h2>
        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
          <li>Python for Everybody — Coursera</li>
          <li>React Developer — Meta</li>
        </ul>
      </section>
    </div>
  );
}
