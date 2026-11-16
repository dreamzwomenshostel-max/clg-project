export const CAREERS = [
  'Software Engineer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'AI Engineer',
  'UI UX Designer',
  'Cyber Security',
  'Cloud Engineer',
  'DevOps Engineer',
  'Business Analyst',
  'Digital Marketing',
  'Indian Navy Officer',
  'Government Jobs',
  'IAS',
  'MBA',
  'Higher Studies',
  'Other',
];

export const CAREER_ICONS: Record<string, string> = {
  'Software Engineer': 'Code2',
  'Full Stack Developer': 'Layers',
  'Data Analyst': 'BarChart3',
  'Data Scientist': 'BrainCircuit',
  'AI Engineer': 'Bot',
  'UI UX Designer': 'Palette',
  'Cyber Security': 'ShieldCheck',
  'Cloud Engineer': 'Cloud',
  'DevOps Engineer': 'GitBranch',
  'Business Analyst': 'Briefcase',
  'Digital Marketing': 'Megaphone',
  'Indian Navy Officer': 'Anchor',
  'Government Jobs': 'Landmark',
  'IAS': 'Scale',
  'MBA': 'GraduationCap',
  'Higher Studies': 'BookOpen',
  'Other': 'Compass',
};

export interface RoadmapPhase {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  duration: string;
  lessons: { id: string; title: string; type: 'video' | 'notes' | 'assignment' | 'quiz'; duration: string; done: boolean }[];
}

export const ROADMAP: RoadmapPhase[] = [
  {
    id: 'p1',
    title: 'Phase 1 — Programming Basics',
    subtitle: 'Foundations of Python & problem solving',
    progress: 78,
    duration: '4 weeks',
    lessons: [
      { id: 'l1', title: 'Variables & Data Types', type: 'video', duration: '18 min', done: true },
      { id: 'l2', title: 'Control Flow & Loops', type: 'video', duration: '24 min', done: true },
      { id: 'l3', title: 'Functions & Modules', type: 'video', duration: '21 min', done: true },
      { id: 'l4', title: 'PDF Notes: Python Basics', type: 'notes', duration: '12 pages', done: true },
      { id: 'l5', title: 'Assignment: Build a Calculator', type: 'assignment', duration: '45 min', done: false },
      { id: 'l6', title: 'Mini Quiz: Basics', type: 'quiz', duration: '10 min', done: false },
    ],
  },
  {
    id: 'p2',
    title: 'Phase 2 — Data Structures & Algorithms',
    subtitle: 'Arrays, linked lists, trees, and complexity',
    progress: 42,
    duration: '6 weeks',
    lessons: [
      { id: 'l7', title: 'Arrays & Strings', type: 'video', duration: '28 min', done: true },
      { id: 'l8', title: 'Linked Lists', type: 'video', duration: '32 min', done: false },
      { id: 'l9', title: 'Stacks & Queues', type: 'video', duration: '26 min', done: false },
      { id: 'l10', title: 'Trees & Graphs', type: 'video', duration: '35 min', done: false },
      { id: 'l11', title: 'Assignment: DSA Sheet', type: 'assignment', duration: '90 min', done: false },
    ],
  },
  {
    id: 'p3',
    title: 'Phase 3 — Web Development',
    subtitle: 'HTML, CSS, JavaScript & React',
    progress: 15,
    duration: '8 weeks',
    lessons: [
      { id: 'l12', title: 'HTML & Modern CSS', type: 'video', duration: '30 min', done: false },
      { id: 'l13', title: 'JavaScript Essentials', type: 'video', duration: '40 min', done: false },
      { id: 'l14', title: 'React Fundamentals', type: 'video', duration: '38 min', done: false },
      { id: 'l15', title: 'Notes: React Patterns', type: 'notes', duration: '18 pages', done: false },
    ],
  },
  {
    id: 'p4',
    title: 'Phase 4 — Backend & Databases',
    subtitle: 'Node.js, APIs, SQL & deployment',
    progress: 0,
    duration: '6 weeks',
    lessons: [
      { id: 'l16', title: 'Node.js & Express', type: 'video', duration: '36 min', done: false },
      { id: 'l17', title: 'REST & GraphQL APIs', type: 'video', duration: '29 min', done: false },
      { id: 'l18', title: 'SQL & NoSQL Databases', type: 'video', duration: '33 min', done: false },
    ],
  },
  {
    id: 'p5',
    title: 'Phase 5 — Interview Prep & Projects',
    subtitle: 'System design, mock interviews, portfolio',
    progress: 0,
    duration: '4 weeks',
    lessons: [
      { id: 'l19', title: 'System Design Basics', type: 'video', duration: '42 min', done: false },
      { id: 'l20', title: 'Capstone Project', type: 'assignment', duration: '2 weeks', done: false },
      { id: 'l21', title: 'Final Mock Interview', type: 'quiz', duration: '60 min', done: false },
    ],
  },
];

export interface Assignment {
  id: string;
  title: string;
  phase: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
}

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Build a CLI Calculator',
    phase: 'Phase 1',
    deadline: 'Aug 8, 2026',
    status: 'graded',
    score: 92,
    feedback: 'Excellent structure and clean error handling. Consider adding unit tests for edge cases.',
  },
  {
    id: 'a2',
    title: 'DSA Problem Set — Arrays',
    phase: 'Phase 2',
    deadline: 'Aug 12, 2026',
    status: 'submitted',
  },
  {
    id: 'a3',
    title: 'Implement a Linked List',
    phase: 'Phase 2',
    deadline: 'Aug 18, 2026',
    status: 'pending',
  },
  {
    id: 'a4',
    title: 'React Todo App',
    phase: 'Phase 3',
    deadline: 'Aug 25, 2026',
    status: 'pending',
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const QUIZ: QuizQuestion[] = [
  { id: 'q1', question: 'Which data structure uses LIFO order?', options: ['Queue', 'Stack', 'Array', 'Tree'], answer: 1 },
  { id: 'q2', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'], answer: 2 },
  { id: 'q3', question: 'Which keyword creates a function in Python?', options: ['function', 'def', 'fn', 'func'], answer: 1 },
  { id: 'q4', question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperText Transmission Process', 'Host Transfer Text Protocol'], answer: 0 },
  { id: 'q5', question: 'Which is NOT a JavaScript framework?', options: ['React', 'Vue', 'Django', 'Angular'], answer: 2 },
];

export const LEADERBOARD = [
  { rank: 1, name: 'Aarav Sharma', score: 9840, avatar: 'AS' },
  { rank: 2, name: 'Diya Patel', score: 9610, avatar: 'DP' },
  { rank: 3, name: 'Yaswanth Kumar', score: 9420, avatar: 'YK' },
  { rank: 4, name: 'Sneha Reddy', score: 9180, avatar: 'SR' },
  { rank: 5, name: 'Rohan Gupta', score: 8950, avatar: 'RG' },
];

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  solved: boolean;
}

export const CODING_PROBLEMS: CodingProblem[] = [
  { id: 'c1', title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', solved: true },
  { id: 'c2', title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stacks', solved: true },
  { id: 'c3', title: 'Reverse Linked List', difficulty: 'Medium', topic: 'Linked Lists', solved: false },
  { id: 'c4', title: 'Binary Tree Inorder', difficulty: 'Medium', topic: 'Trees', solved: false },
  { id: 'c5', title: 'Longest Substring', difficulty: 'Hard', topic: 'Strings', solved: false },
  { id: 'c6', title: 'Merge Intervals', difficulty: 'Hard', topic: 'Arrays', solved: false },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  progress: number;
  status: 'in-progress' | 'completed' | 'planned';
}

export const PROJECTS: Project[] = [
  {
    id: 'pr1',
    title: 'Personal Portfolio Website',
    description: 'A responsive portfolio built with React and Tailwind showcasing your projects and resume.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    progress: 100,
    status: 'completed',
  },
  {
    id: 'pr2',
    title: 'Task Management App',
    description: 'Full-stack CRUD app with authentication, drag-and-drop, and real-time updates.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    progress: 65,
    status: 'in-progress',
  },
  {
    id: 'pr3',
    title: 'AI Chat Assistant',
    description: 'An AI-powered chatbot that answers career questions using a language model API.',
    tech: ['Python', 'FastAPI', 'OpenAI'],
    progress: 20,
    status: 'in-progress',
  },
  {
    id: 'pr4',
    title: 'Weather Dashboard',
    description: 'Real-time weather visualization with charts and location search.',
    tech: ['React', 'Recharts', 'Weather API'],
    progress: 0,
    status: 'planned',
  },
];

export interface JobApp {
  id: string;
  company: string;
  role: string;
  status: 'wishlist' | 'applied' | 'interview' | 'rejected' | 'selected';
  date: string;
  logo: string;
}

export const JOBS: JobApp[] = [
  { id: 'j1', company: 'Google', role: 'SDE Intern', status: 'interview', date: 'Aug 10', logo: 'G' },
  { id: 'j2', company: 'Microsoft', role: 'Software Engineer', status: 'applied', date: 'Aug 5', logo: 'M' },
  { id: 'j3', company: 'Amazon', role: 'Frontend Developer', status: 'wishlist', date: '—', logo: 'A' },
  { id: 'j4', company: 'Zoho', role: 'Full Stack Developer', status: 'selected', date: 'Jul 28', logo: 'Z' },
  { id: 'j5', company: 'Swiggy', role: 'Backend Intern', status: 'rejected', date: 'Jul 20', logo: 'S' },
  { id: 'j6', company: 'Flipkart', role: 'SDE-1', status: 'applied', date: 'Aug 2', logo: 'F' },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  earned: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ac1', title: 'First Steps', description: 'Completed your first lesson', icon: 'Footprints', date: 'Jul 12', earned: true },
  { id: 'ac2', title: '7-Day Streak', description: 'Studied 7 days in a row', icon: 'Flame', date: 'Jul 19', earned: true },
  { id: 'ac3', title: 'Quiz Master', description: 'Scored 90%+ on 5 quizzes', icon: 'Trophy', date: 'Jul 22', earned: true },
  { id: 'ac4', title: 'Code Warrior', description: 'Solved 20 coding problems', icon: 'Sword', date: 'Jul 30', earned: true },
  { id: 'ac5', title: 'Project Pioneer', description: 'Completed your first project', icon: 'Rocket', date: 'Aug 1', earned: true },
  { id: 'ac6', title: 'Interview Ready', description: 'Pass a mock interview', icon: 'Mic', date: '—', earned: false },
  { id: 'ac7', title: 'Job Hunter', description: 'Apply to 10 companies', icon: 'Target', date: '—', earned: false },
  { id: 'ac8', title: 'Career Launch', description: 'Get your dream job offer', icon: 'Star', date: '—', earned: false },
];

export const WEEKLY_PROGRESS = [
  { day: 'Mon', hours: 4 },
  { day: 'Tue', hours: 5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 6 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 7 },
  { day: 'Sun', hours: 4 },
];

export const SKILL_RADAR = [
  { skill: 'Python', value: 85 },
  { skill: 'DSA', value: 70 },
  { skill: 'React', value: 55 },
  { skill: 'SQL', value: 60 },
  { skill: 'System Design', value: 35 },
  { skill: 'Communication', value: 75 },
];

export const MOTIVATION_QUOTES = [
  'The expert in anything was once a beginner. — Helen Hayes',
  'Your career is your business. It’s time for you to manage it as a CEO. — Dorit Sher',
  'Success is the sum of small efforts repeated day in and day out. — Robert Collier',
  'The only way to do great work is to love what you do. — Steve Jobs',
  'Don’t watch the clock; do what it does. Keep going. — Sam Levenson',
];

export const RECENT_ACTIVITY = [
  { id: 'r1', text: 'Completed lesson: Functions & Modules', time: '2h ago', icon: 'CheckCircle' },
  { id: 'r2', text: 'Submitted assignment: DSA Problem Set', time: '5h ago', icon: 'Upload' },
  { id: 'r3', text: 'Scored 92% on Python Basics Quiz', time: '1d ago', icon: 'Award' },
  { id: 'r4', text: 'Solved coding problem: Valid Parentheses', time: '1d ago', icon: 'Code' },
  { id: 'r5', text: 'Started project: Task Management App', time: '2d ago', icon: 'Rocket' },
];

export const STUDY_MATERIALS = [
  { id: 'm1', title: 'Python Complete Notes', type: 'PDF', size: '2.4 MB', icon: 'FileText' },
  { id: 'm2', title: 'DSA Cheat Sheet', type: 'PDF', size: '1.1 MB', icon: 'FileText' },
  { id: 'm3', title: 'React Crash Course', type: 'Video', size: '48 min', icon: 'PlayCircle' },
  { id: 'm4', title: 'SQL Quick Reference', type: 'PDF', size: '880 KB', icon: 'FileText' },
  { id: 'm5', title: 'System Design Primer', type: 'PDF', size: '3.2 MB', icon: 'FileText' },
  { id: 'm6', title: 'JavaScript in 100 Seconds', type: 'Video', size: '2 min', icon: 'PlayCircle' },
];

export const MENTOR_SUGGESTIONS = [
  'How should I prepare for interviews?',
  'Explain Python Loops',
  'Create my resume',
  'Teach SQL',
  'Suggest projects',
];

export const MOCK_MENTOR_REPLIES: Record<string, string> = {
  interview: 'Great question! For technical interviews, focus on three pillars:\n\n1. **DSA Practice** — Solve 2-3 problems daily on arrays, strings, and trees. Start with Easy, then Medium.\n2. **System Design** — Learn to design scalable systems. Practice explaining trade-offs out loud.\n3. **Behavioral** — Prepare STAR stories (Situation, Task, Action, Result) for past projects.\n\nI recommend scheduling a mock interview in the Mock Interview tab once you’ve solved 50+ problems. Want me to create a 4-week interview prep schedule?',
  python: 'Python loops let you repeat code. Here’s the gist:\n\n```python\n# for loop\nfor i in range(5):\n    print(i)  # 0,1,2,3,4\n\n# while loop\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n```\n\nUse `for` when you know the count, `while` when a condition controls it. Avoid infinite loops — always update your condition!\n\nWant a mini quiz to test this?',
  resume: 'I can help you build a resume! Head to the **Resume Builder** tab — I’ve pre-filled your profile, education, and projects. Just click “Generate Resume” and you’ll get a polished, ATS-friendly preview you can download as PDF.\n\nTip: Quantify your impact (e.g., "Improved load time by 40%") rather than just listing tasks.',
  sql: "SQL lets you talk to databases. The core commands:\n\n```sql\nSELECT name, age FROM users WHERE age > 18 ORDER BY age DESC;\nINSERT INTO users (name, age) VALUES ('Ana', 24);\nUPDATE users SET age = 25 WHERE name = 'Ana';\nDELETE FROM users WHERE name = 'Ana';\n```\n\n**Joins** combine tables: `INNER JOIN` keeps matching rows, `LEFT JOIN` keeps all left rows. Want me to add SQL lessons to your roadmap?",
  projects: 'Based on your Full Stack Developer goal, here are 3 projects that impress recruiters:\n\n1. **Real-time Chat App** — WebSockets + React + Node. Shows you understand real-time systems.\n2. **E-commerce API** — Auth, payments, cart, inventory. Demonstrates backend depth.\n3. **AI-Powered Dashboard** — Fetch data from an API, visualize with charts. Shows full-stack + modern tooling.\n\nWant me to add one of these to your Projects tab with a step-by-step build guide?',
};

export const INTERVIEW_QUESTIONS = {
  technical: [
    'Explain the difference between SQL and NoSQL databases.',
    'What happens when you type a URL into the browser?',
    'How would you design a URL shortener like bit.ly?',
  ],
  hr: [
    'Tell me about yourself.',
    'Why do you want to join our company?',
    'Where do you see yourself in 5 years?',
  ],
  behavioral: [
    'Describe a time you faced a difficult challenge.',
    'Tell me about a conflict you had with a teammate.',
    'Give an example of when you showed leadership.',
  ],
};
