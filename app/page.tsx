import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { WhyBiomedical } from "@/components/sections/WhyBiomedical";
import { Journey } from "@/components/sections/Journey";
import { WhoShouldAttend } from "@/components/sections/WhoShouldAttend";
import { LearningOutcomes } from "@/components/sections/LearningOutcomes";
import { Schedule } from "@/components/sections/Schedule";
import { Laboratories } from "@/components/sections/Laboratories";
import { Highlights } from "@/components/sections/Highlights";
import { CareerExplorer } from "@/components/sections/CareerExplorer";
import { DayInLife } from "@/components/sections/DayInLife";
import { Statistics } from "@/components/sections/Statistics";
import { Gallery } from "@/components/sections/Gallery";
import { Registration } from "@/components/sections/Registration";
import { WhatsAppCTA } from "@/components/sections/WhatsAppCTA";
import { Downloads } from "@/components/sections/Downloads";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <WhyBiomedical />
      <Journey />
      <WhoShouldAttend />
      <LearningOutcomes />
      <Schedule />
      <Laboratories />
      <Highlights />
      <Statistics />
      <CareerExplorer />
      <DayInLife />
      <Gallery />
      <Registration />
      <WhatsAppCTA />
      <Downloads />
      <FAQ />
      <Contact />
    </>
  );
}
