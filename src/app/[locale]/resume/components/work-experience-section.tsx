import { Badge } from "@/components/ui/badge";
import { icons } from "@/constants/client/icon";
import React from "react";

interface Props { 
  data?: any
}

const WorkExperienceSection: React.FC<Props> = ({ data }) => (
    <section>
        <div className="flex items-center gap-2 mb-4">
            <icons.Briefcase className="h-5 w-5 text-blue-600"/>
            <h2 className="text-lg font-semibold text-gray-800">工作经历</h2>
        </div>
        <div className="space-y-6">
            {data && data.map((exp: any, i: number) => (
                <div key={i} className="relative pl-6 pb-6 border-l-2 border-blue-100">
                    <div
                        className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {exp.duration}
            </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm pl-1 space-y-1">
                        {exp.points.map((point: any, j: number) => (
                            <li key={j}>{point}</li>
                        ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech: any, j: number) => (
                            <Badge key={j} className="bg-gray-100 text-gray-700 text-xs">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
)

export default WorkExperienceSection;