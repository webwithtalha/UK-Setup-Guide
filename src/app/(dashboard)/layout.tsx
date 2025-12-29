import Link from 'next/link';
import { 
  MapPin, 
  Shield, 
  FileText, 
  FolderOpen, 
  BookOpen,
  Settings,
  Menu,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserMenu } from '@/components/shared/user-menu';
import { auth } from '@/lib/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: MapPin },
  { name: 'Scam Shield', href: '/scam-shield', icon: Shield },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Document Vault', href: '/vault', icon: FolderOpen },
  { name: 'Resources', href: '/resources', icon: BookOpen },
];

function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={className}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">UK Setup Guide</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex-col" />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 lg:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          {/* Spacer for desktop */}
          <div className="hidden lg:block" />

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User menu with logout */}
            <UserMenu user={session?.user} />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
