import React from "react";
import { icons } from '@/constants/client/icon';

interface Props { 
  data?: any
}

export const ProfileSection: React.FC<Props> = ({ data }) => { 
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <icons.User className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">个人简介</h2>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{data.content}</p>
        <p className="text-gray-700 italic mt-3 text-sm pl-3 border-l-2 border-blue-300">
            &#34;{data.quote}&#34;
        </p>
      </div>
    </section>
  )
}

export default ProfileSection;