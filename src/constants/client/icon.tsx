import dynamic from 'next/dynamic';

export const icons = {
    Mail: dynamic(() => import('lucide-react').then(mod => mod.Mail)),
    Globe: dynamic(() => import('lucide-react').then(mod => mod.Globe)),
    FileText: dynamic(() => import('lucide-react').then(mod => mod.FileText)),
    GraduationCap: dynamic(() => import('lucide-react').then(mod => mod.GraduationCap)),
    Code: dynamic(() => import('lucide-react').then(mod => mod.Code)),
    User: dynamic(() => import('lucide-react').then(mod => mod.User)),
    Zap: dynamic(() => import('lucide-react').then(mod => mod.Zap)),
    MapPin: dynamic(() => import('lucide-react').then(mod => mod.MapPin)),
    Phone: dynamic(() => import('lucide-react').then(mod => mod.Phone)),
    Languages: dynamic(() => import('lucide-react').then(mod => mod.Languages)),
    Calendar: dynamic(() => import('lucide-react').then(mod => mod.Calendar)),
    Github: dynamic(() => import('lucide-react').then(mod => mod.Github)),
    Briefcase: dynamic(() => import('lucide-react').then(mod => mod.Briefcase)),
    Award: dynamic(() => import('lucide-react').then(mod => mod.Award)),
}