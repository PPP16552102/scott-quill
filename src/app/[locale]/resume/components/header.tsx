import Image from "next/image";
import React from "react";

interface Props { 
  data?: any
}

const Header: React.FC<Props> = (props) => { 
  return (
    <header className="relative mb-8 pb-6 border-b border-gray-100">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mt-10 -mr-10 opacity-70" />
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-linear-to-br from-blue-100 to-blue-50">
            <Image src={''} width={64} height={64} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">name</h1>
          <p className="text-blue-600 mt-1 font-medium">title</p>
          <div className="flex items-center gap-2 mt-2"></div>
        </div>
      </div>
    </header>
  )
}

export default Header;