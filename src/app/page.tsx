import Link from "next/link";
import {
  Sparkles,
  FileText,
  Palette,
  Cpu,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI-Powered CV Parsing",
    description: "Upload your CV and let AI extract your information automatically",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from 4 stunning templates designed for professionals",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Zap,
    title: "Instant Publishing",
    description: "Go live in seconds with one-click portfolio publishing",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Shield,
    title: "Multi-Provider LLM",
    description: "Connect OpenAI, Anthropic, Google AI, or Groq",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

const stats = [
  { value: "4", label: "Templates", description: "Professional designs" },
  { value: "AI", label: "Powered", description: "Smart CV parsing" },
  { value: "4+", label: "Providers", description: "LLM integrations" },
  { value: "Free", label: "Forever", description: "No hidden costs" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-subtle bg-noise">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all shadow-elegant"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 pb-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Portfolio Builder</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Build your professional{" "}
            <span className="bg-gradient-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent">
              portfolio
            </span>{" "}
            in minutes
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Upload your CV, let AI parse your information, choose a beautiful template,
            and publish at your own URL. It's that simple.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-all shadow-elevated"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-8 py-4 text-lg font-semibold border-2 rounded-2xl hover:bg-muted/50 transition-all"
            >
              <FileText className="w-5 h-5" />
              Sign In
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
            {["No credit card required", "Free forever", "Your own URL"].map(
              (item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to shine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you create a stunning portfolio effortlessly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-3xl border bg-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div
          className="rounded-3xl border bg-card p-10 md:p-16 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-lg mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-violet-600 p-12 md:p-20 text-center animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8">
              <Globe className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Ready to go global?</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Start building your portfolio today
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Join thousands of professionals who trust our platform to showcase their work.
              Create your portfolio in minutes, not hours.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-white text-primary rounded-2xl hover:bg-white/90 transition-all shadow-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-10 max-w-7xl mx-auto border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Portfolio Builder</span>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
