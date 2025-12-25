import fs from 'fs';
import path from "path";
import matter from 'gray-matter';

export function getResumeData() { 
  const filePath = path.join(process.cwd(), '/docs/resume-data.md');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContents);
  return data as any;
}