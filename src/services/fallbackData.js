export const FALLBACK_RECOMMENDATIONS = [
  {
    id: 1,
    role: "Data Scientist",
    match: 100,
    salary: "₹18-25 LPA",
    company: "Amazon",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Science"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist%20Amazon%20Mumbai"
  },
  {
    id: 5,
    role: "Backend Developer",
    match: 100,
    salary: "₹14-22 LPA",
    company: "Infosys",
    skills: ["Java", "Spring", "SQL", "REST API", "microservices"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Backend%20Developer%20Infosys%20Bengaluru"
  },
  {
    id: 2,
    role: "Frontend Developer",
    match: 80,
    salary: "₹12-18 LPA",
    company: "Microsoft",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer%20Microsoft%20India"
  },
  {
    id: 6,
    role: "DevOps Engineer",
    match: 80,
    salary: "₹14-22 LPA",
    company: "Infosys",
    skills: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer%20Infosys%20India"
  }
];

export const FALLBACK_JOBS = [
  {
    id: 1,
    role: "Data Scientist",
    company: "Amazon",
    location: "Mumbai, India",
    salary: "₹18-25 LPA",
    match: 100,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Science"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist%20Amazon%20Mumbai",
    recommended: true,
    saved: false,
    applied: false
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "Pune, India",
    salary: "₹8-12 LPA",
    match: 95,
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer%20Pune%20India",
    recommended: true,
    saved: false,
    applied: false
  },
  {
    id: 3,
    role: "React Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "₹6-10 LPA",
    match: 88,
    skills: ["React", "Redux", "Tailwind"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=React%20Developer%20Remote",
    recommended: false,
    saved: false,
    applied: false
  },
  {
    id: 4,
    role: "Full Stack Developer",
    company: "InnovateLab",
    location: "Hyderabad, India",
    salary: "₹10-15 LPA",
    match: 82,
    skills: ["Node", "React", "MongoDB"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer%20Hyderabad",
    recommended: true,
    saved: false,
    applied: false
  },
  {
    id: 5,
    role: "Backend Developer",
    company: "Infosys",
    location: "Bengaluru, India",
    salary: "₹9-14 LPA",
    match: 80,
    skills: ["Java", "Spring", "REST API"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Backend%20Developer%20Infosys%20Bengaluru",
    recommended: true,
    saved: false,
    applied: false
  }
];

export const FALLBACK_REPORTS = [
  {
    id: "r1",
    title: "Career Analysis Report",
    date: "2024-01-15",
    size: "2.4 MB",
    sections: ["Profile Summary", "Skill Assessment", "Career Recommendations", "Market Analysis", "Action Plan"]
  },
  {
    id: "r2",
    title: "Skill Gap Analysis",
    date: "2024-01-10",
    size: "1.8 MB",
    sections: ["Current Skills", "Required Skills", "Learning Path", "Certification Recommendations", "Timeline"]
  }
];