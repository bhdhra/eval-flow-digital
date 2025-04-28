
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ClipboardList, 
  FileText, 
  Home, 
  LogOut, 
  Settings, 
  UserCheck, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Submissions', path: '/submissions' },
    { icon: ClipboardList, label: 'Evaluations', path: '/evaluations' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: UserCheck, label: 'Evaluators', path: '/evaluators' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={cn(
      'fixed inset-y-0 left-0 bg-background border-r border-border transition-all duration-300 z-20',
      isOpen ? 'w-64' : 'w-16'
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
          {isOpen ? (
            <>
              <div className="w-8 h-8 bg-eval-purple rounded-md flex items-center justify-center">
                <span className="text-white font-bold">DE</span>
              </div>
              <span className="ml-3 font-bold text-eval-purple">EvalFlow</span>
            </>
          ) : (
            <div className="w-8 h-8 bg-eval-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold">DE</span>
            </div>
          )}
        </div>
        {isOpen && (
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <nav className="py-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-3 px-4 text-gray-700 hover:bg-secondary rounded-md transition-colors mx-2",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isOpen ? "mr-3" : "mx-auto")} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 w-full px-2">
        <button
          className={cn(
            "flex items-center py-3 px-4 text-gray-700 hover:bg-secondary rounded-md transition-colors w-full",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className={cn("h-5 w-5", isOpen ? "mr-3" : "mx-auto")} />
          {isOpen && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
