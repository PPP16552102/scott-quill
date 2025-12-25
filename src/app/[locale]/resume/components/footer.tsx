import React from "react";

interface Props { 
  data?: any
}

const Footer: React.FC<Props> = ({ data }) => {
  return (
    <footer className="mt-10 text-center text-gray-500 text-xs border-t border-gray-100 pt-4">
      <p>更新日期: {data.updateDate}</p>
      <p>{data.copyright}</p>
    </footer>
  )
}

export default Footer;