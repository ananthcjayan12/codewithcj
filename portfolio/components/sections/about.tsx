"use client"

import { motion } from "framer-motion"
import { Code2, Database, Layout, Cpu } from "lucide-react"
import { skills, certifications } from "@/data/portfolio-data"

const SkillCategory = ({
  title,
  icon: Icon,
  skills,
}: {
  title: string
  icon: React.ElementType
  skills: string[]
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <h3 className="font-semibold">{title}</h3>
    </div>
    <ul className="list-disc list-inside text-muted-foreground">
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </div>
)

export function AboutSection() {
  return (
    <div className="space-y-12">
      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-muted-foreground max-w-2xl">
          I specialize in creating innovative solutions through automation, AI integration, 
          and full-stack development. My focus is on building systems that enhance efficiency 
          and drive business value.
        </p>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCategory title="Frontend" icon={Layout} skills={skills.frontend} />
          <SkillCategory title="Backend" icon={Database} skills={skills.backend} />
          <SkillCategory title="Automation" icon={Code2} skills={skills.automation} />
          <SkillCategory title="AI & ML" icon={Cpu} skills={skills.ai} />
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
            >
              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">
                {cert.issuer} • {cert.date}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center space-y-4"
      >
        <p className="text-lg text-muted-foreground">
          Interested in working together? Check out my projects or get in touch!
        </p>
      </motion.section>
    </div>
  )
} 