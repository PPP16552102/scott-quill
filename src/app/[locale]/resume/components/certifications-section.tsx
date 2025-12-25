import React from "react";
import { icons } from '@/constants/client/icon';

interface Props { 
  data?: any
}

export const CertificationsSection: React.FC<Props> = ({ data }) => { 
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <icons.Award className="h-5 w-5 text-blue-600"/>
        <h2 className="text-lg font-semibold text-gray-800">证书与认证</h2>
      </div>
      <div className="space-y-3">
        {data && data.map((cert: any, i: number) => (
          <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <h3 className="text-sm font-medium text-gray-800">{cert.title}</h3>
            <p className="text-xs text-gray-600">{cert.year}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CertificationsSection;