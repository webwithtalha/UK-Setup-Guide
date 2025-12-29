import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  FileText,
  Shield,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with real data from database
const mockTasks = [
  {
    id: '1',
    title: 'Collect BRP Card',
    category: 'immigration',
    priority: 'critical',
    status: 'not_started',
    description: 'Collect your Biometric Residence Permit from the Post Office',
  },
  {
    id: '2',
    title: 'Open UK Bank Account',
    category: 'banking',
    priority: 'high',
    status: 'in_progress',
    description: 'Open a basic bank account with Monzo, Starling, or a high street bank',
  },
  {
    id: '3',
    title: 'Register with GP',
    category: 'healthcare',
    priority: 'high',
    status: 'not_started',
    description: 'Register with a local GP surgery for NHS healthcare access',
  },
  {
    id: '4',
    title: 'Apply for National Insurance Number',
    category: 'employment',
    priority: 'medium',
    status: 'blocked',
    blockedReason: 'Requires bank account',
    description: 'Apply for your NI number to work legally in the UK',
  },
];

const completedCount = 2;
const totalCount = 8;
const progressPercent = (completedCount / totalCount) * 100;

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'critical':
      return 'bg-destructive text-destructive-foreground';
    case 'high':
      return 'bg-warning text-warning-foreground';
    case 'medium':
      return 'bg-primary/20 text-primary';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    case 'in_progress':
      return <Clock className="w-5 h-5 text-warning" />;
    case 'blocked':
      return <AlertTriangle className="w-5 h-5 text-destructive" />;
    default:
      return <Circle className="w-5 h-5 text-muted-foreground" />;
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back! 👋</h1>
          <p className="text-muted-foreground">
            Here&apos;s your settlement progress and upcoming tasks.
          </p>
        </div>
        <Button asChild>
          <Link href="/onboarding">
            <Sparkles className="w-4 h-4 mr-2" />
            Update Profile
          </Link>
        </Button>
      </div>

      {/* Progress overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Progress</CardTitle>
          <CardDescription>
            {completedCount} of {totalCount} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            You&apos;re making great progress! Keep going to complete your settlement journey.
          </p>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <Link href="/scam-shield">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Check for Scams</h3>
                <p className="text-sm text-muted-foreground">Analyze suspicious messages</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <Link href="/templates">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Use Templates</h3>
                <p className="text-sm text-muted-foreground">Ready-to-send messages</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer group sm:col-span-2 lg:col-span-1">
          <Link href="/resources">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Find Resources</h3>
                <p className="text-sm text-muted-foreground">Local services & support</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* This week's tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>This Week&apos;s Tasks</CardTitle>
              <CardDescription>Priority tasks to focus on</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tasks">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              {getStatusIcon(task.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium">{task.title}</h4>
                  <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                {task.status === 'blocked' && task.blockedReason && (
                  <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Blocked: {task.blockedReason}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm">
                View
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tips section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Pro Tip</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Many high street banks like Monzo and Starling allow you to open accounts 
                with just your passport and BRP. No proof of address needed! This makes 
                it easier to get started when you first arrive.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

