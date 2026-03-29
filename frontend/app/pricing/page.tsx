import Link from 'next/link'
import { Check, Zap, Building, Rocket, Sparkles, ArrowRight, Shield, Clock, Users } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 'Free',
    period: '',
    description: 'Perfect for trying out DataForge AI with small projects.',
    features: [
      '100 documents per month',
      '10 MB max file size',
      'Basic entity extraction',
      'JSON export',
      'Community support',
      '7-day data retention',
    ],
    cta: 'Get Started',
    href: '/sign-up',
    highlighted: false,
  },
  {
    name: 'Pro',
    icon: Rocket,
    price: '$79',
    period: '/month',
    description: 'For teams building production data pipelines.',
    features: [
      '10,000 documents per month',
      '100 MB max file size',
      'Advanced entity extraction',
      'Custom entity types',
      'JSONL, Parquet, CSV export',
      'Full API access',
      'Priority email support',
      'Webhook notifications',
      '90-day data retention',
    ],
    cta: 'Start Free Trial',
    href: '/sign-up?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    icon: Building,
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced security and scale needs.',
    features: [
      'Unlimited documents',
      'Unlimited file size',
      'Custom ML model training',
      'On-premise deployment',
      'SSO / SAML / SCIM',
      'Dedicated success manager',
      '99.99% SLA guarantee',
      'Custom integrations',
      'Advanced audit logs',
      'HIPAA / SOC 2 compliance',
    ],
    cta: 'Contact Sales',
    href: 'mailto:sales@dataforgeai.com',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'What file formats do you support?',
    answer: 'We support PDF, DOCX, DOC, TXT, MD, CSV, JSON, and HTML files. You can also process web URLs directly by pasting them into our ingestion pipeline.',
  },
  {
    question: 'How accurate is the data extraction?',
    answer: 'Our ML models achieve 92-97% accuracy on standard extraction tasks. Custom models trained on your domain data can achieve even higher accuracy for specialized use cases.',
  },
  {
    question: 'Can I train custom models on my data?',
    answer: 'Yes! Enterprise plans include the ability to fine-tune models on your specific domain data. Pro users can request custom model training for an additional fee.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II compliant and offer on-premise deployment for Enterprise customers.',
  },
  {
    question: 'What export formats are available?',
    answer: 'We support JSONL (ideal for LLM fine-tuning), Parquet (for big data pipelines), CSV, and JSON. Enterprise users can request custom export formats.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your data will be available for export for 30 days after cancellation.',
  },
]

const trustedBy = [
  'Research Labs',
  'Fortune 500',
  'AI Startups',
  'Healthcare',
  'Legal Tech',
  'FinTech',
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Start Free, <span className="text-gradient">Scale Infinitely</span>
            </h1>
            <p className="text-xl text-zinc-400">
              Choose the perfect plan for your data ingestion needs. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-3 mb-20">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-indigo-500/50 bg-indigo-500/5 scale-105 shadow-2xl shadow-indigo-500/20'
                    : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    plan.highlighted ? 'bg-indigo-500/20' : 'bg-zinc-800'
                  }`}>
                    <plan.icon className={`h-6 w-6 ${plan.highlighted ? 'text-indigo-400' : 'text-zinc-400'}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                </div>

                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-400 text-lg">{plan.period}</span>
                </div>

                <p className="text-zinc-400 mb-8">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        plan.highlighted ? 'bg-indigo-500/20' : 'bg-emerald-500/20'
                      }`}>
                        <Check className={`h-3 w-3 ${plan.highlighted ? 'text-indigo-400' : 'text-emerald-400'}`} />
                      </div>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`group flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium transition-all ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25'
                      : 'border border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-800'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="text-center mb-20">
            <p className="text-sm text-zinc-500 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center gap-8">
              {trustedBy.map((company) => (
                <span key={company} className="text-zinc-400 font-medium">{company}</span>
              ))}
            </div>
          </div>

          {/* Features Comparison */}
          <div className="grid gap-6 sm:grid-cols-3 mb-20">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">
                <Shield className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Enterprise Security</h3>
              <p className="text-sm text-zinc-400">SOC 2, HIPAA compliant with end-to-end encryption</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
                <Clock className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">99.99% Uptime</h3>
              <p className="text-sm text-zinc-400">Enterprise-grade reliability with SLA guarantees</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10">
                <Users className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-sm text-zinc-400">Dedicated support team for Enterprise customers</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-center text-3xl font-bold mb-12">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-700"
                >
                  <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                Ready to Transform Your Data Pipeline?
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
                Start with our free tier today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600 shadow-xl transition-all hover:bg-zinc-100"
                >
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="mailto:sales@dataforgeai.com"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
