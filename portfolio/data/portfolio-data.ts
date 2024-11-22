export const personalInfo = {
  name: "Ananth C Jayan",
  role: "Backend Engineer",
  summary: "More than 4 years of experience in the development field, specializing in automation and custom project development.",
  longSummary: `Over the years, I have worked passionately on crafting systems that simplify workflows, 
    automate repetitive tasks, and leverage AI to bring intelligence and efficiency to industries. 
    From detailed backend systems to powerful automations, my work reflects a constant drive toward innovation.`,
  contact: {
    email: "ananthcjayan@gmail.com",
    phone: ["6364742671", "9400475408"],
    location: "Alappuzha, India"
  }
}

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ananthuuu",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ananthcjayan/",
    icon: "Linkedin",
  },
  {
    name: "Email",
    href: "mailto:ananthcjayan@gmail.com",
    icon: "Mail",
  },
]

export const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  backend: [
    "Django",
    "Python",
    "Node.js",
    "SQL",
    "MongoDB",
  ],
  automation: [
    "Selenium",
    "BeautifulSoup",
    "Scrapy",
    "Excel Automation",
  ],
  ai: [
    "LangChain",
    "OpenAI API",
    "TensorFlow",
    "Machine Learning",
  ],
}

export const projects = [
  {
    title: "Excel Automation Suite",
    description: "Comprehensive Excel automation system using Python",
    longDescription: `Excel continues to be one of the most widely used tools for businesses, and one of my areas of expertise involves automating Excel workflows using Python. These automations allow teams to shift their focus from repetitive tasks to more strategic initiatives.`,
    icon: "automation" as const,
    tags: ["Python", "Excel", "Automation", "Data Processing", "MySQL", "SQL Server"],
    category: "Automation",
    slug: "excel-automation",
  },
  {
    title: "Web Scraping Framework",
    description: "Enterprise-scale web scraping system for data extraction",
    longDescription: `Developed comprehensive web scraping systems that gather data autonomously and efficiently from some of the largest websites. The framework handles everything from e-commerce platforms to social media data extraction.`,
    icon: "database" as const,
    tags: ["Python", "Selenium", "BeautifulSoup", "Scrapy", "Puppeteer"],
    category: "Automation",
    slug: "web-scraping",
  },
  {
    title: "Social Media Automation",
    description: "AI-powered social media management system",
    longDescription: `Implemented comprehensive social media automation systems handling content generation to posting schedules, integrating with multiple platforms and using AI for content optimization.`,
    icon: "workflow" as const,
    tags: ["Python", "AI", "LLM", "Social Media", "API Integration"],
    category: "AI",
    slug: "social-media-automation",
  },
  {
    title: "Enterprise ERP System",
    description: "Custom ERP implementation for manufacturing businesses",
    longDescription: `Developed and implemented comprehensive ERP systems that streamlined operations for manufacturing and distribution businesses, focusing on process automation and real-time analytics.`,
    icon: "erp" as const,
    tags: ["Python", "Django", "SQL", "ERP", "Business Logic"],
    category: "Business",
    slug: "erp-system",
  },
  {
    title: "Trading Bot System",
    description: "Automated trading system for NIFTY and BankNIFTY options",
    longDescription: `Created a sophisticated trading bot that integrates with the Fyers API for executing the Iron Condor Strategy in NIFTY and BankNIFTY markets, featuring comprehensive backtesting and risk management.`,
    icon: "chart" as const,
    tags: ["Python", "AWS", "Trading", "API", "Risk Management"],
    category: "Finance",
    slug: "trading-bot",
  },
  {
    title: "WhatsApp & Telegram Automation",
    description: "Comprehensive messaging automation system",
    longDescription: `Built sophisticated automation systems for managing WhatsApp and Telegram conversations at scale, 
    handling customer interactions, marketing promotions, and personalized engagement strategies.`,
    icon: "message" as const,
    tags: ["Python", "WhatsApp API", "Telegram API", "Automation"],
    category: "Automation",
    slug: "messaging-automation",
  },
  {
    title: "QR Code Platform",
    description: "Dynamic QR code generation and analytics platform",
    longDescription: `Developed a comprehensive QR code generation and management platform that helps businesses 
    bridge the gap between offline and online interactions. The platform provides detailed analytics and customization options.`,
    icon: "qr" as const,
    tags: ["Python", "Django", "Analytics", "QR Code"],
    category: "Business",
    slug: "qr-platform",
  },
  {
    title: "Resume Optimization Tool",
    description: "AI-powered resume enhancement system",
    longDescription: `Created an AI-driven tool that helps job seekers optimize their resumes for Applicant Tracking 
    Systems (ATS). The system analyzes job descriptions and suggests relevant modifications to improve success rates.`,
    icon: "ai" as const,
    tags: ["Python", "AI", "NLP", "Machine Learning"],
    category: "AI",
    slug: "resume-optimization",
  },
  {
    title: "Voice & Video Automation",
    description: "AI-based content creation system",
    longDescription: `Developed advanced systems for automating voice cloning and video content creation, 
    targeting platforms like YouTube and Instagram Reels. This solution saves hours of manual content creation work.`,
    icon: "video" as const,
    tags: ["Python", "AI", "Neural Networks", "Content Creation"],
    category: "AI",
    slug: "content-automation",
  },
  {
    title: "Nifty Options Trading",
    description: "Advanced options trading automation",
    longDescription: `Developed a sophisticated system for automating straddles and strangles strategies in 
    Nifty and BankNifty markets. The system provides real-time monitoring and risk management capabilities.`,
    icon: "bar" as const,
    tags: ["Python", "Trading", "Risk Management", "Analytics"],
    category: "Finance",
    slug: "nifty-trading",
  }
] as const

export const projectCategories = [
  "All",
  "Automation",
  "AI",
  "Business",
  "Finance",
  "Development"
]

export const certifications = [
  {
    title: "Data Analysis with Python",
    issuer: "IBM",
    date: "2023",
  },
  {
    title: "Databases and SQL",
    issuer: "IBM",
    date: "2023",
  },
  {
    title: "Data Science and AI",
    issuer: "IBM",
    date: "2023",
  },
  {
    title: "Open Source Tools for Data Science",
    issuer: "IBM",
    date: "2023",
  },
] 