import { createContext, useContext, useState, type ReactNode } from 'react';

export type AppScreen =
  | 'login'
  | 'register'
  | 'onboarding'
  | 'app';

export type AppPage =
  | 'dashboard'
  | 'learning'
  | 'roadmap'
  | 'materials'
  | 'assignments'
  | 'quizzes'
  | 'coding'
  | 'projects'
  | 'resume'
  | 'interview'
  | 'mentor'
  | 'tracker'
  | 'reports'
  | 'achievements'
  | 'profile'
  | 'settings';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  department: string;
  year: string;
  city: string;
}

interface OnboardingData {
  dreamCareer: string;
  deadline: string;
  skillLevel: string;
  studyHours: number;
}

interface AppState {
  screen: AppScreen;
  page: AppPage;
  user: UserProfile | null;
  onboarding: OnboardingData | null;
  login: (email: string) => void;
  register: (data: UserProfile) => void;
  completeOnboarding: (data: OnboardingData) => void;
  logout: () => void;
  setPage: (p: AppPage) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const demoUser: UserProfile = {
  fullName: 'Yaswanth Kumar',
  email: 'yaswanth@careeros.ai',
  phone: '+91 98765 43210',
  college: 'IIT Madras',
  degree: 'B.Tech',
  department: 'Computer Science',
  year: '3rd Year',
  city: 'Chennai',
};

const demoOnboarding: OnboardingData = {
  dreamCareer: 'Full Stack Developer',
  deadline: '6 Months',
  skillLevel: 'Intermediate',
  studyHours: 5,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [page, setPage] = useState<AppPage>('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);

  const login = (email: string) => {
    setUser({ ...demoUser, email });
    setOnboarding(demoOnboarding);
    setScreen('app');
    setPage('dashboard');
  };

  const register = (data: UserProfile) => {
    setUser(data);
    setScreen('onboarding');
  };

  const completeOnboarding = (data: OnboardingData) => {
    setOnboarding(data);
    setScreen('app');
    setPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setOnboarding(null);
    setScreen('login');
  };

  return (
    <AppContext.Provider
      value={{ screen, page, user, onboarding, login, register, completeOnboarding, logout, setPage }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
