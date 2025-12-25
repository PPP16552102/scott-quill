import { Card } from "@/components/ui/card";
import Header from "./components/header";
import { getResumeData } from "@/lib/resume-parser";
import ProfileSection from "./components/profile-section";
import SkillsSection from "./components/skills-section";
import EducationSection from "./components/education-section";

const Resume = () => {
  const data = getResumeData();

  console.log('data -> ', data);
  

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-12 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-60">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-linear-to-r from-blue-200/30 to-blue-300/30 blur-3xl"/>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-l from-purple-200/30 to-pink-200/30 blur-3xl"/>
        <div className="absolute bottom-[-15%] left-[20%] w-[60%] h-[60%] rounded-full bg-linear-to-t from-pink-200/30 to-blue-200/30 blur-3xl"/>
      </div>
      <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-md border border-gray-200 bg-white/90 backdrop-blur-sm relative z-10">
        <Header data={data.personalInfo} />
        <div className="md:col-span-1 space-y-8">
          <ProfileSection data={data.profile} />
          <SkillsSection data={data.skills} />
          <EducationSection data={data.education} />
        </div>
      </Card>
    </div>
  )
}

export default Resume;