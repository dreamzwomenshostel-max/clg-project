import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, type AppPage } from '@/context/AppContext';
import DashboardPage from '@/pages/DashboardPage';
import LearningPage from '@/pages/LearningPage';
import RoadmapPage from '@/pages/RoadmapPage';
import MaterialsPage from '@/pages/MaterialsPage';
import AssignmentsPage from '@/pages/AssignmentsPage';
import QuizzesPage from '@/pages/QuizzesPage';
import CodingPage from '@/pages/CodingPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ResumePage from '@/pages/ResumePage';
import InterviewPage from '@/pages/InterviewPage';
import MentorPage from '@/pages/MentorPage';
import TrackerPage from '@/pages/TrackerPage';
import ReportsPage from '@/pages/ReportsPage';
import AchievementsPage from '@/pages/AchievementsPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  Brain, LayoutDashboard, BookOpen, Map, FileText, ClipboardList, HelpCircle,
  Code2, FolderGit2, FileUser, Mic, Bot, Briefcase, BarChart3, Award,
  User, Settings, LogOut, Sun, Moon, Menu, X, Bell, Search, Sparkles,
} from 'lucide-react';

const NAV: { page: AppPage; label: string; icon: any }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'learning', label: 'Learning Path', icon: BookOpen },
  { page: 'roadmap', label: 'Roadmap', icon: Map },
  { page: 'materials', label: 'Study Materials', icon: FileText },
  { page: 'assignments', label: 'Assignments', icon: ClipboardList },
  { page: 'quizzes', label: 'Quizzes', icon: HelpCircle },
  { page: 'coding', label: 'Coding Practice', icon: Code2 },
  { page: 'projects', label: 'Projects', icon: FolderGit2 },
  { page: 'resume', label: 'Resume Builder', icon: FileUser },
  { page: 'interview', label: 'Mock Interview', icon: Mic },
  { page: 'mentor', label: 'AI Mentor', icon: Bot },
  { page: 'tracker', label: 'Job Tracker', icon: Briefcase },
  { page: 'reports', label: 'Progress Reports', icon: BarChart3 },
  { page: 'achievements', label: 'Achievements', icon: Award },
  { page: 'profile', label: 'Profile', icon: User },
  { page: 'settings', label: 'Settings', icon: Settings },
];

const BOTTOM_NAV: AppPage[] = ['dashboard', 'learning', 'mentor', 'tracker', 'profile'];

export default function AppShell() {
  const { page, setPage, user, logout } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border glass-strong h-screen sticky top-0">
        <SidebarContent page={page} setPage={setPage} user={user} logout={logout} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 w-64 h-full glass-strong border-r border-border lg:hidden"
            >
              <SidebarContent page={page} setPage={(p) => { setPage(p); setMobileOpen(false); }} user={user} logout={logout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenu={() => setMobileOpen(true)} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden">
          <PageRenderer page={page} />
        </main>
      </div>

      {/* Bottom nav mobile */}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

function SidebarContent({ page, setPage, user, logout }: { page: AppPage; setPage: (p: AppPage) => void; user: any; logout: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-border">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold font-display">CareerOS AI</span>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active = page === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}
            >
              {active && (
                <motion.div layoutId="sidebar-active" className="absolute inset-0 rounded-xl bg-primary/10" transition={{ type: 'spring', damping: 24, stiffness: 280 }} />
              )}
              <item.icon className="w-[18px] h-[18px] relative z-10 shrink-0" />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-xl mb-2">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {user?.fullName?.charAt(0) || 'Y'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.fullName || 'Yaswanth Kumar'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || 'yaswanth@careeros.ai'}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </button>
      </div>
    </>
  );
}

function TopBar({ onMenu, theme, toggleTheme }: { onMenu: () => void; theme: string; toggleTheme: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border glass-strong flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 text-muted-foreground text-sm w-64">
          <Search className="w-4 h-4" />
          <input placeholder="Search..." className="bg-transparent outline-none flex-1 text-sm" />
          <kbd className="text-xs px-1.5 py-0.5 rounded bg-muted border border-border">⌘K</kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><Sun className="w-5 h-5" /></motion.span>
            ) : (
              <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Moon className="w-5 h-5" /></motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
        </Button>
        <Button className="hidden sm:flex gradient-primary text-white border-0 rounded-xl" size="sm">
          <Sparkles className="w-4 h-4 mr-1" /> Upgrade
        </Button>
      </div>
    </header>
  );
}

function BottomNav({ page, setPage }: { page: AppPage; setPage: (p: AppPage) => void }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-16 glass-strong border-t border-border flex items-center justify-around px-2">
      {BOTTOM_NAV.map((p) => {
        const item = NAV.find((n) => n.page === p)!;
        const active = page === p;
        return (
          <button key={p} onClick={() => setPage(p)} className="relative flex flex-col items-center gap-0.5 px-3 py-1.5">
            {active && <motion.div layoutId="bottom-active" className="absolute -top-px w-10 h-0.5 rounded-full gradient-primary" />}
            <item.icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-[10px] ${active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}

function PageRenderer({ page }: { page: AppPage }) {
  switch (page) {
    case 'dashboard': return <DashboardPage />;
    case 'learning': return <LearningPage />;
    case 'roadmap': return <RoadmapPage />;
    case 'materials': return <MaterialsPage />;
    case 'assignments': return <AssignmentsPage />;
    case 'quizzes': return <QuizzesPage />;
    case 'coding': return <CodingPage />;
    case 'projects': return <ProjectsPage />;
    case 'resume': return <ResumePage />;
    case 'interview': return <InterviewPage />;
    case 'mentor': return <MentorPage />;
    case 'tracker': return <TrackerPage />;
    case 'reports': return <ReportsPage />;
    case 'achievements': return <AchievementsPage />;
    case 'profile': return <ProfilePage />;
    case 'settings': return <SettingsPage />;
    default: return <DashboardPage />;
  }
}
