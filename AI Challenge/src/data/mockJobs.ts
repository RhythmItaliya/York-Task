/**
 * Job type + mock listing data, trimmed down from `demo ui`'s
 * `src/components/mockJobs.ts` (same shape/fields, same sample companies),
 * dropping fields only used by the full interactive card (h1bSponsor button
 * state, etc. are kept, but the animated match-score ring was simplified).
 */

export interface Job {
  id: string
  company: string
  companyInitial: string
  companyColor: string
  title: string
  industry: string
  stage: string
  postedAgo: string
  tags: string[]
  location: string
  workMode: string
  type: string
  level: string
  salary?: string
  experience: string
  applicants: string
  matchScore: number
  matchLabel: 'GOOD MATCH' | 'FAIR MATCH' | 'STRONG MATCH'
  h1bSponsor?: boolean
}

export const mockJobs: Job[] = [
  {
    id: '1',
    company: 'Xpert Development',
    companyInitial: 'X',
    companyColor: '#16a34a',
    title: 'Junior Software Engineer',
    industry: 'Computer Software',
    stage: 'Early Stage',
    postedAgo: '1 day ago',
    tags: ['Be an early applicant'],
    location: 'United States',
    workMode: 'Remote',
    type: 'Full-time',
    level: 'Entry Level',
    experience: '0+ years exp',
    applicants: 'Less than 25 applicants',
    matchScore: 82,
    matchLabel: 'GOOD MATCH',
  },
  {
    id: '2',
    company: 'Known',
    companyInitial: 'K',
    companyColor: '#0f172a',
    title: 'Software Engineer',
    industry: 'Advertising · Professional Services',
    stage: 'Growth Stage',
    postedAgo: '2 days ago',
    tags: ['Python Required', 'Be an early applicant'],
    location: 'United States',
    workMode: 'Remote',
    type: 'Full-time',
    level: 'Entry, Mid Level',
    salary: '$100K/yr - $130K/yr',
    experience: '1+ years exp',
    applicants: 'Less than 25 applicants',
    matchScore: 59,
    matchLabel: 'FAIR MATCH',
    h1bSponsor: true,
  },
  {
    id: '3',
    company: 'SHEGLAM',
    companyInitial: 'S',
    companyColor: '#fbcfe8',
    title: 'Data Analysis Intern',
    industry: 'Beauty · E-Commerce',
    stage: 'Growth Stage',
    postedAgo: '2 days ago',
    tags: ['Be an early applicant'],
    location: 'United States',
    workMode: 'Remote',
    type: 'Internship',
    level: 'Intern',
    salary: '$20/hr - $25/hr',
    experience: '0+ years exp',
    applicants: 'Less than 25 applicants',
    matchScore: 66,
    matchLabel: 'FAIR MATCH',
  },
  {
    id: '4',
    company: 'Tessera Labs',
    companyInitial: 'T',
    companyColor: '#1e293b',
    title: 'Software Engineering Intern, Frontend',
    industry: 'AI · Developer Tools',
    stage: 'Early Stage',
    postedAgo: '2 days ago',
    tags: ['React', 'TypeScript', 'Be an early applicant'],
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Internship',
    level: 'Intern',
    salary: '$40/hr - $55/hr',
    experience: '0+ years exp',
    applicants: 'Less than 50 applicants',
    matchScore: 88,
    matchLabel: 'STRONG MATCH',
    h1bSponsor: true,
  },
  {
    id: '5',
    company: 'Vercel',
    companyInitial: '▲',
    companyColor: '#000000',
    title: 'Frontend Engineer, New Grad',
    industry: 'Developer Tools · Infrastructure',
    stage: 'Late Stage',
    postedAgo: '3 days ago',
    tags: ['Next.js', 'React', 'H1B Sponsor'],
    location: 'Remote, US',
    workMode: 'Remote',
    type: 'Full-time',
    level: 'Entry Level',
    salary: '$140K/yr - $180K/yr',
    experience: '0-2 years exp',
    applicants: '100+ applicants',
    matchScore: 76,
    matchLabel: 'GOOD MATCH',
    h1bSponsor: true,
  },
]
