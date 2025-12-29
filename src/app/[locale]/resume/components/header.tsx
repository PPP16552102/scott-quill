import RubikCube from "@/components/advance/rubik-cube";
import { Badge } from "@/components/ui/badge";
import { icons } from "@/constants/client/icon";
import Image from "next/image";
import React from "react";

interface Props { 
  data?: any
}

const Header: React.FC<Props> = ({ data }) => {
  const BadgeColorMap = {
    blue: {
        badge: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
        headerBadge: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
        project: {bg: 'from-blue-50', border: 'border-blue-100'}
    },
    green: {
        badge: "bg-green-50 text-green-700 hover:bg-green-100 border-green-200",
        headerBadge: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
        project: {bg: 'from-green-50', border: 'border-green-100'}
    },
    purple: {
        badge: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
        headerBadge: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
        project: {bg: 'from-purple-50', border: 'border-purple-100'}
    },
    yellow: {
        badge: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
        headerBadge: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
        project: {bg: 'from-yellow-50', border: 'border-yellow-100'}
    },
    red: {
        badge: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
        headerBadge: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
        project: {bg: 'from-red-50', border: 'border-red-100'}
    },
    orange: {
        badge: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
        headerBadge: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
        project: {bg: 'from-orange-50', border: 'border-orange-100'}
    },
    amber: {
        badge: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
        headerBadge: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
        project: {bg: 'from-amber-50', border: 'border-amber-100'}
    },
  }
  
  function getColor(index: number) {
    const colors = ['blue', 'green', 'purple']
    return colors[index % colors.length]
}

  return (
    <header className="relative mb-8 pb-6 border-b border-gray-100">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mt-10 -mr-10 opacity-70" />
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-linear-to-br from-blue-100 to-blue-50">
            <Image src={data?.avatar} width={64} height={64} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{ data?.name }</h1>
          <p className="text-blue-600 mt-1 font-medium">{ data?.title }</p>
          <div className="flex items-center gap-2 mt-2">
            {data?.badges?.map((badge: any, index: number) => (
              <Badge key={index} className={ BadgeColorMap?.[getColor(index) as keyof typeof BadgeColorMap]?.headerBadge ?? BadgeColorMap.blue.headerBadge }>
                { badge }
              </Badge>
            )) }
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {data?.contacts?.map((contact: any, index: number) => { 
          const Icon = icons?.[contact?.type as keyof typeof icons]
          return (
            <div key={index} className="flex items-center gap-2 text-gray-600">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50">
                    {Icon && <Icon className="h-4 w-4 text-blue-600"/>}
                </div>
                {contact.link ? (
                    <a href={contact.link} target="_blank"
                       className="text-gray-800 hover:text-blue-600 transition-colors">
                        {contact.value}
                    </a>
                ) : (
                    <span>{contact.value}</span>
                )}
            </div>
          )
        }) }
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100">
        <DetailItem icon="Calendar" label="出生年月" value={data.personalDetails.birth}/>
        <DetailItem icon="Languages" label="语言能力" value={data.personalDetails.languages}/>
        <DetailItem label="求职意向" value={data.personalDetails.jobTarget}/>
        <DetailItem label="期望薪资" value={data.personalDetails.salary}/>
      </div>
      <RubikCube/>
    </header>
  )
}

const DetailItem = ({icon, label, value}: { icon?: keyof typeof icons; label: string; value: string }) => { 
  const Icon = icon ? icons[icon] : null
  return (
    <div>
        <h3 className="text-xs text-gray-500 uppercase mb-1">{label}</h3>
        <div className="flex items-center gap-1.5">
            {Icon && <Icon className="h-3.5 w-3.5 text-gray-400"/>}
            <span className="text-sm text-gray-700">{value}</span>
        </div>
    </div>
  )
}

export default Header;