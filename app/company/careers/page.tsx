import { Metadata } from 'next';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Briefcase, MapPin, Heart, Zap, Users, Star, Coffee, Laptop, Plane, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Eventini',
  description: 'Join the Eventini team and help us build the future of event marketplace technology.',
};

const benefits = [
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision coverage' },
  { icon: DollarSign, title: 'Competitive Pay', description: 'Salary, equity, and performance bonuses' },
  { icon: Laptop, title: 'Remote-First', description: 'Work from anywhere with flexible hours' },
  { icon: Plane, title: 'Unlimited PTO', description: 'Take the time you need to recharge' },
  { icon: Coffee, title: 'Learning Budget', description: '$1,500/year for courses, books, and conferences' },
  { icon: Users, title: 'Team Events', description: 'Annual retreats and quarterly team meetups' },
];

const openRoles = [
  {
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Build and scale our marketplace platform using React, Node.js, and Firebase.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Design intuitive experiences for hosts and providers across web and mobile.',
  },
  {
    title: 'Provider Success Manager',
    department: 'Operations',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Help providers succeed on our platform through onboarding and ongoing support.',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Drive growth through content, SEO, paid acquisition, and brand partnerships.',
  },
];

const values = [
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'We ship quickly, learn from feedback, and iterate constantly.',
  },
  {
    icon: Heart,
    title: 'Provider-First',
    description: 'Every decision starts with how it helps our providers succeed.',
  },
  {
    icon: Users,
    title: 'Collaborate',
    description: 'Great ideas come from everywhere. We listen and work together.',
  },
  {
    icon: Star,
    title: 'Raise the Bar',
    description: 'We hold ourselves to high standards and celebrate excellence.',
  },
];

export default function CareersPage() {
  return (
    <StaticPageLayout
      title="Careers at Eventini"
      subtitle="Join us in building the future of event marketplaces"
      breadcrumbs={[
        { label: 'Company', href: '/company/about' },
        { label: 'Careers' },
      ]}
      maxWidth="wide"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#44646c] to-[#2d4249] rounded-2xl p-8 md:p-12 text-white mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Build something that matters
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mb-6">
          At Eventini, we&apos;re creating the tools that help entrepreneurs and small businesses thrive.
          Join a team that&apos;s passionate about making every event memorable.
        </p>
        <a
          href="#open-roles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          View Open Roles
        </a>
      </div>

      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Value</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#44646c]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#44646c]/5 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-white rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Open Roles */}
      <div id="open-roles" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Roles</h2>
        <div className="space-y-4">
          {openRoles.map((role) => (
            <div key={role.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#44646c] transition-all cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{role.title}</h3>
                  <p className="text-gray-600 mb-3">{role.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Briefcase className="w-4 h-4" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {role.location}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {role.type}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-medium shrink-0">
                  Available Q3 2026
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Not Finding Your Role */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Don&apos;t see your role?</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          We&apos;re always looking for talented people. Send us your resume and let us know how you can contribute.
        </p>
        <a
          href="mailto:careers@eventini.io?subject=General Application"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#44646c] text-white rounded-full font-semibold hover:bg-[#3a565d] transition-colors"
        >
          Send Your Resume
        </a>
      </div>

      {/* Interview Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Interview Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Application Review</h3>
            <p className="text-sm text-gray-600">We review every application within 1 week</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Intro Call</h3>
            <p className="text-sm text-gray-600">30-min chat with our recruiting team</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Skills Assessment</h3>
            <p className="text-sm text-gray-600">Role-specific exercise or portfolio review</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Team Interviews</h3>
            <p className="text-sm text-gray-600">Meet the team and leadership</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to Join Us?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          We&apos;re building something special. Come help us make events better for everyone.
        </p>
        <a
          href="mailto:careers@eventini.io"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </StaticPageLayout>
  );
}
