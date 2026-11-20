import { HeroSection } from "@/components/sections/landing/HeroSection";
import { TechStackSection } from "@/components/sections/landing/TechStackSection";
import { ProjectsSection } from "@/components/sections/landing/ProjectsSection";
import { AchievementsOrganizationsBackdrop } from "@/components/sections/landing/AchievementsOrganizationsBackdrop";
import { AchievementsSection } from "@/components/sections/landing/AchievementsSection";
import { OrganizationsSection } from "@/components/sections/landing/OrganizationsSection";
import { AboutPrinciplesCurtain } from "@/components/sections/landing/AboutPrinciplesCurtain";
import { AboutMeSection } from "@/components/sections/landing/AboutMeSection";
import { PrinciplesSection } from "@/components/sections/landing/PrinciplesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <AchievementsOrganizationsBackdrop>
        <AchievementsSection />
        <OrganizationsSection />
      </AchievementsOrganizationsBackdrop>
      <AboutPrinciplesCurtain
        aboutMe={<AboutMeSection />}
        principles={<PrinciplesSection />}
      />
    </>
  );
}
