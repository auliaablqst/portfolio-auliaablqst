import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { CreativeSection } from "@/components/sections/CreativeSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { SkillsSection } from "@/components/sections/SkillsSection"

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CreativeSection />
      <ContactSection />
    </div>
  )
}
