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
    description: "Comprehensive Excel automation system using Python for streamlining data-driven workflows",
    longDescription: `Excel continues to be one of the most widely used tools for businesses, and one of my areas of expertise involves automating Excel workflows using Python. These automations allow teams to shift their focus from repetitive tasks to more strategic initiatives.

    Key Features:
    • Data Processing Automations: Developed Python scripts that parse large Excel datasets, perform data cleansing, analyze trends, and generate detailed reports with the click of a button.
    • Financial Modeling Automation: Automated financial forecasting models, pivot table generation, and complex chart creation to eliminate hours of manual data crunching.
    • Excel-to-Database Synchronizations: Built systems for importing/exporting Excel data directly into databases, such as MySQL and SQL Server, to keep business records up to date in near real time.`,
    image: "/projects/excel-automation.jpg",
    tags: ["Python", "Excel", "Automation", "Data Processing", "MySQL", "SQL Server"],
    category: "Automation",
    slug: "excel-automation",
  },
  {
    title: "Web Scraping Framework",
    description: "Enterprise-scale web scraping system for data extraction from e-commerce and social media platforms",
    longDescription: `Developed comprehensive web scraping systems that gather data autonomously and efficiently from some of the largest websites. The framework handles everything from e-commerce platforms to social media data extraction.

    Key Features:
    • Selenium-Based Scrapers: Created tools to crawl and extract product listings, prices, reviews, and availability across various e-commerce platforms.
    • BeautifulSoup Web Crawlers: Developed focused crawlers for niche data extraction, including competitors' pricing and SEO metadata.
    • Scalable Architecture: Built using Python with Scrapy and Puppeteer, handling large datasets while adhering to anti-bot measures.`,
    image: "/projects/web-scraping.jpg",
    tags: ["Python", "Selenium", "BeautifulSoup", "Scrapy", "Puppeteer"],
    category: "Automation",
    slug: "web-scraping",
  },
  {
    title: "Social Media Automation Platform",
    description: "AI-powered social media management system with automated content generation and scheduling",
    longDescription: `Implemented comprehensive social media automation systems handling content generation to posting schedules, integrating with multiple platforms and using AI for content optimization.

    Key Features:
    • AI Content Generation: Leveraged LLMs for creating optimized content based on trends and keywords.
    • Multi-Platform Integration: Automated posting across Facebook, Twitter, Instagram, and LinkedIn.
    • Engagement Automation: Built tools for automated response management and engagement tracking.`,
    image: "/projects/social-media.jpg",
    tags: ["Python", "AI", "LLM", "Social Media", "API Integration"],
    category: "AI",
    slug: "social-media-automation",
  },
  {
    title: "Enterprise ERP System",
    description: "Custom ERP implementation for manufacturing and distribution businesses",
    longDescription: `Developed and implemented comprehensive ERP systems that streamlined operations for manufacturing and distribution businesses, focusing on process automation and real-time analytics.

    Key Features:
    • Custom Modules: Built specialized modules for door manufacturing, textile production, and construction industries.
    • Workflow Automation: Automated purchase management, job scheduling, and order tracking.
    • Real-Time Analytics: Implemented interactive dashboards and detailed reporting systems.`,
    image: "/projects/erp-system.jpg",
    tags: ["Python", "Django", "SQL", "ERP", "Business Logic"],
    category: "Business",
    slug: "erp-system",
  },
  {
    title: "Trading Bot System",
    description: "Automated trading system for NIFTY and BankNIFTY options",
    longDescription: `Created a sophisticated trading bot that integrates with the Fyers API for executing the Iron Condor Strategy in NIFTY and BankNIFTY markets, featuring comprehensive backtesting and risk management.

    Key Features:
    • Advanced Backtesting: Analysis system using 5 years of historical data.
    • Automated Execution: AWS EC2-based cron jobs for trade execution.
    • Risk Management: Implemented stop-loss and profit capture mechanisms.`,
    image: "/projects/trading-bot.jpg",
    tags: ["Python", "AWS", "Trading", "API", "Risk Management"],
    category: "Finance",
    slug: "trading-bot",
  },
  {
    title: "WhatsApp & Telegram Automation",
    description: "Comprehensive messaging automation system for business communication",
    longDescription: `Built sophisticated automation systems for managing WhatsApp and Telegram conversations at scale, 
    handling customer interactions, marketing promotions, and personalized engagement strategies.

    Key Features:
    • Automated Response System: Created bots that handle customer messages automatically using pre-defined logic
    • Business Alert System: Implemented notification systems for supply chain and sales teams
    • Marketing Campaign Manager: Developed bulk messaging system with smart throttling and personalization`,
    image: "/projects/messaging-automation.jpg",
    tags: ["Python", "WhatsApp API", "Telegram API", "Automation"],
    category: "Automation",
    slug: "messaging-automation",
  },
  {
    title: "QR Code Management Platform",
    description: "Dynamic QR code generation and analytics platform for businesses",
    longDescription: `Developed a comprehensive QR code generation and management platform that helps businesses 
    bridge the gap between offline and online interactions. The platform provides detailed analytics and customization options.

    Key Features:
    • Custom QR Generation: Dynamic and static QR codes for various business use cases
    • Analytics Dashboard: Real-time tracking of scans, locations, and interaction times
    • Brand Integration: Customizable QR codes matching brand guidelines`,
    image: "/projects/qr-platform.jpg",
    tags: ["Python", "Django", "Analytics", "QR Code"],
    category: "Business",
    slug: "qr-platform",
  },
  {
    title: "Resume Optimization Tool",
    description: "AI-powered resume enhancement system with ATS optimization",
    longDescription: `Created an AI-driven tool that helps job seekers optimize their resumes for Applicant Tracking 
    Systems (ATS). The system analyzes job descriptions and suggests relevant modifications to improve success rates.

    Key Features:
    • Keyword Analysis: Extracts and matches keywords from job descriptions
    • ATS Optimization: Ensures resumes pass through ATS filters
    • Layout Enhancement: Improves resume structure and readability`,
    image: "/projects/resume-tool.jpg",
    tags: ["Python", "AI", "NLP", "Machine Learning"],
    category: "AI",
    slug: "resume-optimization",
  },
  {
    title: "Voice & Video Content Automation",
    description: "AI-based content creation system for multimedia platforms",
    longDescription: `Developed advanced systems for automating voice cloning and video content creation, 
    targeting platforms like YouTube and Instagram Reels. This solution saves hours of manual content creation work.

    Key Features:
    • Voice Cloning: Neural network-based voice replication
    • Automated Video Creation: Dynamic text and narration generation
    • Reels Automation: Intelligent video splicing and effects application`,
    image: "/projects/content-automation.jpg",
    tags: ["Python", "AI", "Neural Networks", "Content Creation"],
    category: "AI",
    slug: "content-automation",
  },
  {
    title: "Nifty Options Trading System",
    description: "Advanced options trading automation for Indian markets",
    longDescription: `Developed a sophisticated system for automating straddles and strangles strategies in 
    Nifty and BankNifty markets. The system provides real-time monitoring and risk management capabilities.

    Key Features:
    • Low-Latency Execution: Fast and efficient order placement
    • Risk Management: Automated strategy adjustments based on market conditions
    • Performance Analytics: Detailed tracking of strategy performance`,
    image: "/projects/nifty-trading.jpg",
    tags: ["Python", "Trading", "Risk Management", "Analytics"],
    category: "Finance",
    slug: "nifty-trading",
  }
]

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