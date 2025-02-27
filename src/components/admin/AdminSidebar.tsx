
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Gamepad2, 
  Database, 
  BarChart, 
  Users, 
  School, 
  BookOpen,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Game Management',
    href: '/admin/games',
    icon: <Gamepad2 className="h-5 w-5" />,
    children: [
      { title: 'All Games', href: '/admin/games' },
      { title: 'Upload Game', href: '/admin/games/upload' },
      { title: 'Categories', href: '/admin/games/categories' },
    ],
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: <BarChart className="h-5 w-5" />,
    children: [
      { title: 'Usage Reports', href: '/admin/analytics/usage' },
      { title: 'Performance Metrics', href: '/admin/analytics/performance' },
      { title: 'Engagement Data', href: '/admin/analytics/engagement' },
    ],
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Schools',
    href: '/admin/schools',
    icon: <School className="h-5 w-5" />,
  },
  {
    title: 'Curriculum',
    href: '/admin/curriculum',
    icon: <BookOpen className="h-5 w-5" />,
    children: [
      { title: 'Grades', href: '/admin/curriculum/grades' },
      { title: 'Subjects', href: '/admin/curriculum/subjects' },
      { title: 'Learning Standards', href: '/admin/curriculum/standards' },
    ],
  },
  {
    title: 'Database',
    href: '/admin/database',
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:transition-none lg:transform-none",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-brand-purple" />
            <span className="text-xl font-bold">
              Edu<span className="text-brand-purple">Play</span>
              <span className="text-xs font-normal bg-brand-purple text-white px-1.5 py-0.5 rounded ml-1">
                Admin
              </span>
            </span>
          </Link>
        </div>

        <div className="p-2 overflow-y-auto h-[calc(100vh-64px)]">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <Collapsible
                    open={openGroups.includes(item.title) || item.children.some(child => isActive(child.href))}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-between", {
                          "bg-slate-100": item.children.some(child => isActive(child.href)),
                        })}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </div>
                        {openGroups.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-9 pr-2 py-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "block px-2 py-1.5 text-sm rounded-md",
                            isActive(child.href)
                              ? "bg-brand-purple/10 text-brand-purple font-medium"
                              : "text-slate-700 hover:bg-slate-100"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md w-full",
                      isActive(item.href)
                        ? "bg-brand-purple/10 text-brand-purple font-medium"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
