import React from "react";
import { icons } from '@/constants/client/icon';
import { Badge } from "@/components/ui/badge";
import { BadgeColorMap } from "@/constants/client/color";

interface Props { 
  data?: any
}

const ProjectsSection: React.FC<Props> = ({ data }) => { 
  return (
    <section>
        <div className="flex items-center gap-2 mb-4">
            <icons.Code className="h-5 w-5 text-blue-600"/>
            <h2 className="text-lg font-semibold text-gray-800">项目经验</h2>
        </div>
        <div className="space-y-6">
            {data.map((project: any, i: number) => {
                const colorVariant = BadgeColorMap[project.color as keyof typeof BadgeColorMap]?.project || BadgeColorMap.blue.project;
                return (
                    <div key={i}
                         className={`bg-linear-to-r ${colorVariant.bg} to-transparent p-5 rounded-lg border ${colorVariant.border}`}>
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-base font-medium text-gray-900 flex items-center">
                                <span>{project.title}</span>
                                {project.url && (
                                    <a href={project.url} target="_blank"
                                       className="ml-2 text-xs text-blue-600 hover:underline">
                                        {new URL(project.url).hostname}
                                    </a>
                                )}
                            </h3>
                        </div>

                        <p className="text-gray-700 text-sm mb-3 whitespace-pre-line">{project.description}</p>

                        {project.techStack?.length > 0 && (
                            <div className="mb-3">
                                <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">技术栈</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech: any, j: number) => (
                                        <Badge key={j} variant="secondary">{tech}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.challenges?.length > 0 && (
                            <div>
                                <h4 className="flex items-center text-xs font-medium text-gray-500 uppercase mb-1">
                                    <icons.Zap className="h-3 w-3 mr-1 text-amber-500"/>
                                    <span>技术难点</span>
                                </h4>
                                <ul className="text-xs text-gray-700 space-y-1">
                                    {project.challenges.map((challenge: any, j: number) => (
                                        <li key={j}>• {challenge}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    </section>  
  )
}

export default ProjectsSection;