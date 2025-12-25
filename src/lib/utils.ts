import { clsx, type ClassValue } from "clsx";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getSizeClass = (size: string) => {
  switch (size) {
    case "sm":
      return "w-16 h-16 text-xs";
    case "md":
      return "w-24 h-24 text-sm";
    case "lg":
      return "w-32 h-32 text-base";
    case "xl":
      return "w-40 h-40 text-lg";
    default:
      return "w-24 h-24 text-sm";
  }
};

export const getResumeData = () => { 
  const filePath = join(process.cwd(), '/docs/resume-data.md');
  const fileContents = readFileSync(filePath, 'utf-8');

}