import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">UK Setup Guide</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 10,000+ newcomers to the UK
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Your Complete Guide to
              <span className="block text-primary mt-2">Settling in the UK</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              From visa to bank account, from housing to healthcare — get a personalized 
              roadmap, scam protection, and expert guidance tailored to your situation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 h-14" asChild>
                <Link href="/register">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14" asChild>
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span>Scam protection included</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-success" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 border-y border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">10k+</div>
              <div className="text-muted-foreground mt-1">Users helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground mt-1">Task templates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">5k+</div>
              <div className="text-muted-foreground mt-1">Scams detected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">4.9</div>
              <div className="text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Settle In
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for international arrivals to the UK
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: Roadmap */}
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Personalized Roadmap</h3>
                <p className="text-muted-foreground">
                  Get a step-by-step plan tailored to your visa type, location, and needs. 
                  Never miss an important task or deadline.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Region-specific guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Priority ordering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2: Scam Shield */}
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <Shield className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold">Scam Shield</h3>
                <p className="text-muted-foreground">
                  Paste any suspicious message, listing, or job offer to instantly detect 
                  red flags and protect yourself.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Rental scam detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Job fraud alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Safe next steps
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3: Templates */}
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                  <FileText className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Ready-to-Use Templates</h3>
                <p className="text-muted-foreground">
                  Professional email templates for landlords, banks, employers, and more — 
                  auto-filled with your details.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Landlord communications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Bank appointment requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Complaint letters
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4: Document Vault */}
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Document Vault</h3>
                <p className="text-muted-foreground">
                  Securely store and share important documents with time-limited links. 
                  Perfect for viewings and appointments.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5: Resources */}
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-chart-5/20 flex items-center justify-center group-hover:bg-chart-5/30 transition-colors">
                  <Users className="w-6 h-6 text-chart-5" />
                </div>
                <h3 className="text-xl font-semibold">Local Resources</h3>
                <p className="text-muted-foreground">
                  Curated directory of GPs, legal aid, community groups, and emergency 
                  contacts — verified and specific to your area.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6: Reminders */}
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center group-hover:bg-warning/30 transition-colors">
                  <Clock className="w-6 h-6 text-warning-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Smart Reminders</h3>
                <p className="text-muted-foreground">
                  Never miss a visa renewal, tenancy deadline, or important appointment. 
                  We&apos;ll remind you ahead of time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your personalized UK settlement roadmap
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Tell Us About You</h3>
              <p className="text-muted-foreground">
                Complete a quick onboarding quiz about your visa type, location, and what 
                you need help with.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Get Your Roadmap</h3>
              <p className="text-muted-foreground">
                Receive a personalized checklist with tasks ordered by priority and 
                dependencies — no guesswork needed.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Track & Complete</h3>
              <p className="text-muted-foreground">
                Follow step-by-step guides, use templates, and check off tasks as you 
                settle into UK life with confidence.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/register">
                Start Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Newcomers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  &quot;The scam shield saved me from a fake rental listing. I was about to 
                  pay a deposit before checking — so grateful I found this tool!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    AS
                  </div>
                  <div>
                    <div className="font-medium">Aisha S.</div>
                    <div className="text-sm text-muted-foreground">Student visa, London</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  &quot;Finally understood the order of things! Bank account before NI number, 
                  BRP collection first. The roadmap made it so clear.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center font-semibold text-accent-foreground">
                    MK
                  </div>
                  <div>
                    <div className="font-medium">Marcus K.</div>
                    <div className="text-sm text-muted-foreground">Skilled worker, Manchester</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  &quot;The email templates are brilliant. Used them for my landlord 
                  reference request and bank appointment — saved hours of writing.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center font-semibold text-success">
                    PL
                  </div>
                  <div>
                    <div className="font-medium">Priya L.</div>
                    <div className="text-sm text-muted-foreground">Graduate visa, Edinburgh</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Settle In With Confidence?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of newcomers who&apos;ve used UK Setup Guide to navigate 
            their settlement journey. Start free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14" asChild>
              <Link href="/register">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">UK Setup Guide</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your complete companion for settling into UK life.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} UK Setup Guide. All rights reserved.</p>
            <p>Made with ❤️ for newcomers to the UK</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
