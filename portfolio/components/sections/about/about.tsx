"use client"

import { motion } from "framer-motion"
import { Code2, Database, Layout, Cpu } from "lucide-react"
import { skills, certifications } from "@/data/portfolio-data"
import { container, section, sectionHeading, sectionSubHeading } from "@/lib/utils"

const SkillCategory = ({
  title,
  icon: Icon,
  skills,
}: {
  title: string
  icon: React.ElementType
  skills: string[]
}) => (
  <div className="rounded-lg border bg-card p-6 space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2 text-muted-foreground">
      {skills.map((skill) => (
        <li key={skill} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          {skill}
        </li>
      ))}
    </ul>
  </div>
)

export function AboutSection() {
  return (
    <section className={section}>
      <div className={container}>
        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-16"
        >
          <h1 className={sectionHeading}>About Me</h1>
          <p className={sectionSubHeading}>
            I specialize in creating innovative solutions through automation, AI integration, 
            and full-stack development. My focus is on building systems that enhance efficiency 
            and drive business value.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCategory title="Frontend" icon={Layout} skills={skills.frontend} />
            <SkillCategory title="Backend" icon={Database} skills={skills.backend} />
            <SkillCategory title="Automation" icon={Code2} skills={skills.automation} />
            <SkillCategory title="AI & ML" icon={Cpu} skills={skills.ai} />
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
              >
                <h3 className="font-semibold mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground">
            Interested in working together? Check out my projects or get in touch!
          </p>
        </motion.div>
      </div>
    </section>
  )
} 