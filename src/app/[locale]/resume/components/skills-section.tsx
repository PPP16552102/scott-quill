import React from "react";
import { icons } from '@/constants/client/icon';
import { Badge } from "@/components/ui/badge";
import { BadgeColorMap } from "@/constants/client/color";

interface Props { 
  data?: any
}

export const SkillsSection: React.FC<Props> = ({ data }) => { 
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <icons.Code className="h-5 w-5 text-blue-600"/>
        <h2 className="text-lg font-semibold text-gray-800">技能专长</h2>
      </div>
      <div className="space-y-3">
        {data.categories.map((category: any) => (
          <div key={category.name}>
            <h3 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
                {category.items.map((item: any, i: number) => (
                    <Badge key={i}
                            className={BadgeColorMap[category.color as keyof typeof BadgeColorMap]?.badge || BadgeColorMap.blue.badge}>
                        {item}
                    </Badge>
                ))}
            </div>
          </div>
        ))}
        <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">团队管理经验</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                    {data.teamExperience}
                </p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection;