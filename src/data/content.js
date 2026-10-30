// Single source of truth. Everything here comes from the original repo content — nothing invented.
export const PROFILE = {
  name: 'Deepthi Kumar',
  role: 'Full-Stack Software Engineer',
  location: 'Bengaluru, India',
  college: 'K S School of Engineering and Management',
  degree: 'B.E. Computer Science & Engineering',
  grad: '2027',
  cgpa: '8.95',
  stack: 'React · Django · FastAPI',
  interest: 'SWE Intern / Full-Stack',
  availability: 'Available immediately',
  email: 'deepthikumar267@gmail.com',
  phone: '+91 7760479859',
  phoneHref: 'tel:+917760479859',
  linkedin: 'https://linkedin.com/in/deepthi261',
  github: 'https://github.com/Deepsbyte',
  resume: '/Deepthi_Kumar_Resume_Final.pdf',
};

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'bag', label: 'Desk Bag' },
  { id: 'contact', label: 'Post Letter' },
];

export const MILESTONES = [
  {
    id: 'academics', period: '2023 – Expected 2027', title: 'Academic Foundations',
    role: 'B.E. in Computer Science & Engineering', place: 'Bengaluru, India', star: 'denim',
    note: 'where it started',
    quote: 'A steadfast foundation of algorithms, system design, and continuous learning.',
    bullets: [
      'K S School of Engineering and Management — B.E. CSE, current CGPA 8.95 / 10.',
      'RV PU College, Bengaluru (2023) — Pre-University, Science (PCMB), 89.66% (538/600).',
      "St. Paul's English School, Bengaluru (2021) — ICSE Board, 91.17%.",
      'Coursework: Data Structures & Algorithms, DBMS, Object-Oriented Programming (Java), Computer Networks, Operating Systems.',
    ],
    tags: ['CGPA 8.95', 'Java OOP', 'DSA', 'DBMS & SQL', 'Computer Networks', 'Operating Systems'],
  },
  {
    id: 'ieee', period: 'August 2024 – Present', title: 'IEEE Student Branch, KSSEM',
    role: 'Publicity Team Member & Student Member', place: 'Bengaluru, India', star: 'butter',
    note: 'community & outreach',
    quote: 'Fostering student developer culture through events, workshops and hackathons.',
    bullets: [
      'Drove digital outreach and publicity for flagship technical events, workshops, and hackathons.',
      'Worked with speakers, mentors, and faculty to host hands-on skill-building sessions.',
      'Collaborated with cross-disciplinary teams to boost student participation.',
      'Took part in technical seminars, coding challenges, and networking meetups.',
    ],
    tags: ['Technical outreach', 'Event organising', 'Digital media', 'Community'],
  },
  {
    id: 'hackathons', period: '2024 – 2025', title: 'HIRE-4-THON & IndiaAI Summit',
    role: 'Ideathon Participant & Workshop Graduate', place: 'Bengaluru, India', star: 'pink',
    note: 'building under pressure',
    quote: 'Team-based prototypes, tight timelines, and a wider view of cloud.',
    bullets: [
      'Collaborated in HIRE-4-THON and the IndiaAI Pre-Summit Ideathon on team-based software and AI ideas.',
      'Iterated on product workflows, problem-statement mapping, and feasibility demos.',
      'Completed the BMS Cloud Computing Workshop covering cloud fundamentals and scalable hosting.',
    ],
    tags: ['HIRE-4-THON', 'IndiaAI Ideathon', 'BMS Cloud Workshop', 'Team collaboration'],
  },
  {
    id: 'oasis', period: 'March 2025 – April 2025', title: 'Oasis Infobyte',
    role: 'Web Development & Designing Intern', place: 'Remote / Virtual', star: 'navy',
    note: 'first dev internship',
    quote: 'Frontend fundamentals turned into quick, responsive delivery under review.',
    bullets: [
      'Built 4 front-end web apps: Calculator, To-Do List, Login Authentication System, and Tribute Page (HTML5, CSS3, ES6+ JavaScript).',
      'Applied responsive layouts for mobile, tablet, and desktop.',
      'Debugged cross-browser issues across Chrome, Firefox, and Safari.',
      'Optimised asset rendering and DOM structure for smoother page loads.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Cross-browser debugging'],
  },
];

// repo / demo are null until real links exist — buttons only render when set.
export const PROJECTS = [
  {
    id: 'taskflow', n: '01', title: 'TaskFlow', subtitle: 'Full-Stack Task Management Platform', badge: 'Django DRF + React', art: 'kanban', tape: 'blush',
    shot: { src: '/projects/taskflow.webp', w: 1918, h: 867, alt: 'TaskFlow Kanban board with To Do, In Progress, Code Review and Done columns, a task summary strip and sidebar navigation.' },
    summary: 'A multi-user Kanban task platform with three RBAC permission levels (Admin, Manager, Member), JWT authentication, 15+ REST APIs with audit logging, drag-and-drop boards, and Chart.js analytics.',
    solves: 'Lets teams share one board while each role only sees and changes what it should.',
    stack: ['React.js', 'Tailwind CSS', 'Axios', 'Chart.js', 'DnD Kit', 'Django', 'Django REST Framework', 'JWT Auth', 'PostgreSQL', 'Render'],
    features: [
      'RBAC permission engine — Admin, Manager, Member — with JWT session security',
      '15+ Django REST endpoints with audit logging, on a normalised PostgreSQL-ready schema',
      'Drag-and-drop Kanban workflow built with DnD Kit',
      'Chart.js dashboards for velocity and completion',
    ],
    role: 'Built independently — database schema design through frontend state management.',
    repo: 'https://github.com/Deepsbyte/TaskFlow', demo: 'https://taskflow-frontwnd.onrender.com/',
  },
  {
    id: 'careeriq', n: '02', title: 'CareerIQ', subtitle: 'Career Intelligence & ATS Platform', badge: 'FastAPI + TypeScript', art: 'ats', tape: 'butter',
    shot: { src: '/projects/careeriq-resume-lab.webp', w: 1500, h: 864, alt: 'CareerIQ Resume Lab showing an ATS score ring, strengths and gaps, detected skills, ATS keywords and recommendations for an uploaded resume.' },
    summary: 'A full-stack career platform that analyses resumes, calculates ATS compliance scores, matches jobs automatically, and simulates recruiter screening — FastAPI on the back, React + TypeScript on the front.',
    solves: 'Shows candidates how a resume reads to an applicant-tracking system, and how well it fits a role.',
    stack: ['Python (FastAPI)', 'React.js', 'TypeScript', 'PostgreSQL / SQLite', 'JWT Auth', 'Axios', 'Render'],
    features: [
      'ATS scoring engine across keywords, structure, and role alignment',
      'Role-based gateways for candidates, recruiters, and admins',
      'Async FastAPI pipeline for resume parsing and matching',
      'Recruiter-simulation dashboard with database persistence',
    ],
    repo: 'https://github.com/Deepsbyte/resume_matcher', demo: 'https://resume-matcher-1-b5rz.onrender.com/',
  },
  {
    id: 'oasis-suite', n: '03', title: 'Web Dev & Designing Suite', subtitle: 'Four Front-End Applications', badge: 'Front-end', art: 'suite', tape: 'blush',
    summary: 'Four front-end applications built during the Oasis Infobyte internship: a Calculator, To-Do List, Login Authentication System, and Tribute Page — responsive and tested across browsers.',
    solves: 'Core front-end fundamentals — DOM logic, forms, state in plain JavaScript, and responsive layout.',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive UI/UX'],
    features: [
      'Calculator, To-Do List, Login Authentication System, Tribute Page',
      'Responsive across mobile, tablet, and desktop',
      'Debugged for Chrome, Firefox, and Safari',
      'Optimised asset rendering and DOM structure',
    ],
    repo: null, demo: null,
  },
  {
    id: 'cloud-lab', n: '04', title: 'Cloud & AI Ideathons', subtitle: 'HIRE-4-THON · IndiaAI Pre-Summit', badge: 'Hackathons & Cloud', art: 'cloud', tape: 'butter',
    summary: 'Team prototypes from HIRE-4-THON and the IndiaAI Pre-Summit Ideathon, informed by what I learned in the BMS Cloud Computing Workshop.',
    solves: 'Turning a problem statement into a feasible, demo-able workflow under a deadline.',
    stack: ['Cloud Computing', 'AI Solutions', 'System Design', 'RESTful Architecture', 'Prototyping'],
    features: [
      'Team-based solutions to real software and AI problem statements',
      'Hands-on cloud infrastructure and deployment training (BMS workshop)',
      'Relational schema modelling for data persistence',
    ],
    repo: null, demo: null,
  },
];

// Skill chips grouped; `use` lists substrings looked up in each project's stack to show "used in".
export const SKILLS = [
  { id: 'lang', title: 'Languages', note: 'what I write in', tone: 'denim', items: [
    { n: 'Java (OOP)', use: [] }, { n: 'Python', use: ['Python'] }, { n: 'JavaScript (ES6+)', use: ['JavaScript'] },
    { n: 'TypeScript', use: ['TypeScript'] }, { n: 'SQL', use: ['PostgreSQL'] }, { n: 'HTML5', use: ['HTML5'] }, { n: 'CSS3', use: ['CSS3'] } ] },
  { id: 'front', title: 'Frontend & UI', note: 'where things get kind', tone: 'butter', items: [
    { n: 'React.js', use: ['React'] }, { n: 'Tailwind CSS', use: ['Tailwind'] }, { n: 'DnD Kit', use: ['DnD'] },
    { n: 'Chart.js', use: ['Chart.js'] }, { n: 'Axios', use: ['Axios'] }, { n: 'Responsive UI/UX', use: ['Responsive'] } ] },
  { id: 'back', title: 'Backend & APIs', note: 'the engine room', tone: 'navy', items: [
    { n: 'Django', use: ['Django'] }, { n: 'Django REST Framework', use: ['Django REST'] }, { n: 'FastAPI', use: ['FastAPI'] },
    { n: 'REST API design', use: ['REST'] }, { n: 'JWT auth', use: ['JWT'] }, { n: 'RBAC permissions', use: ['RBAC'] } ] },
  { id: 'data', title: 'Data & Cloud', note: 'where it lives', tone: 'pink', items: [
    { n: 'PostgreSQL', use: ['PostgreSQL'] }, { n: 'MySQL', use: [] }, { n: 'SQLite', use: ['SQLite'] },
    { n: 'Render', use: ['Render'] }, { n: 'Cloud fundamentals', use: ['Cloud'] } ] },
  { id: 'cs', title: 'CS Foundations', note: 'the bedrock', tone: 'gingham', items: [
    { n: 'Data Structures & Algorithms', use: [] }, { n: 'DBMS', use: [] }, { n: 'Operating Systems', use: [] },
    { n: 'Computer Networks', use: [] }, { n: 'System design', use: ['System Design'] } ] },
];

export const BAG_ITEMS = [
  { id: 'gloss', name: 'Pink lip gloss', note: 'a little pop of pink', src: '/bag-assets/pink-gloss.webp' },
  { id: 'mini', name: 'Small blue bag', note: 'mini bag, big plans', src: null }, // ← drop the supplied asset at /public/bag-assets/small-blue-bag.webp and set src
  { id: 'capy', name: 'Capybara crochet charm', note: 'tiny friend, big comfort', src: '/bag-assets/capybara-cutout.webp' },
  { id: 'bowblue', name: 'Blue polka-dot bow clip', note: 'a bow for every mood', src: '/bag-assets/bow-blue.webp' },
  { id: 'bowwhite', name: 'White bow clip', note: 'tiny bow, big dreams', src: '/bag-assets/bow-white.webp' },
  { id: 'ysl', name: 'YSL Loveshine lipstick', note: 'a little shine for big days', src: '/bag-assets/ysl-lipstick.webp' },
  { id: 'scrunchie', name: 'Blue gingham scrunchie', note: 'soft days and messy hair', src: '/bag-assets/gingham-scrunchie.webp' },
];
