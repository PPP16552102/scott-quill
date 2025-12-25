import React from "react";
import { icons } from '@/constants/client/icon';

interface Props { 
  data?: any
}

export const EducationSection: React.FC<Props> = ({ data }) => { 
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <icons.GraduationCap className="h-5 w-5 text-blue-600"/>
        <h2 className="text-lg font-semibold text-gray-800">教育背景</h2>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="flex justify-between items-baseline">
          <h3 className="text-base font-medium text-gray-900">{data.degree}</h3>
          <span className="text-sm text-gray-600">{data.duration}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{data.university}</p>
        <p className="text-gray-700 text-sm whitespace-pre-line">{data.courses}</p>
      </div>
    </section>
  )
}

export default EducationSection;