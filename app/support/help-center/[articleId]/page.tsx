import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, Users, Briefcase, CreditCard, FileText, Plug, Award, Clock, Calendar, DollarSign, MessageSquare, Star, Smartphone, MapPin, UtensilsCrossed, Music, Building2, Sparkles, ChefHat, Timer, ListChecks } from 'lucide-react';

type ArticleId =
  | 'getting-started-host'
  | 'booking-first-provider'
  | 'minimum-guarantees'
  | 'changes-cancellations-refunds-host'
  | 'multiple-providers-one-event'
  | 'plan-with-moonboards'
  | 'provider-onboarding'
  | 'provider-fees-payouts'
  | 'managing-provider-availability'
  | 'accept-decline-request-provider'
  | 'host-payments-fees'
  | 'open-tab-payment-host'
  | 'community-policies'
  | 'integrations-toast-pos'
  | 'high-volume-host';

interface ArticleContent {
  title: string;
  category: string;
  audience: string;
  readTime: string;
  content: React.ReactNode;
}

const articleContent: Record<ArticleId, ArticleContent> = {
  'getting-started-host': {
    title: 'Getting started as a new host on Eventini',
    category: 'Hosts',
    audience: 'Host',
    readTime: '6 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Eventini</h2>
          <p className="text-gray-600 mb-4">
            Eventini makes it easy to plan your event and find the perfect providers. Whether you&apos;re hosting a birthday party, corporate gathering, wedding, or community festival, we connect you with local food trucks, caterers, entertainers, venues, and more &mdash; all in one place.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Creating Your Account</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Download the Eventini app</p>
                  <p className="text-sm text-gray-600">Available on iOS and Android from the App Store or Google Play.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Sign up with your email or phone</p>
                  <p className="text-sm text-gray-600">We&apos;ll send you a verification code to confirm your account.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Complete your profile</p>
                  <p className="text-sm text-gray-600">Add your name, location, and profile photo to help providers recognize you.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Planning Your First Event</h2>
          <p className="text-gray-600 mb-4">
            Eventini guides you through a simple step-by-step flow to plan your event and find the right providers:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Step 1: Tell us about yourself</h3>
                  <p className="text-sm text-gray-600">Select your host type: Casual Host, Nonprofit Employee, Corporate Employee, Property Manager, or Festival Organizer. This helps us personalize your experience.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Step 2: Event details</h3>
                  <p className="text-sm text-gray-600">Enter your event name, type (birthday, wedding, corporate, etc.), location, and whether it&apos;s indoor, outdoor, or both.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Step 3: Guest count</h3>
                  <p className="text-sm text-gray-600">Select how many guests you&apos;re expecting. You can update this anytime as RSVPs come in.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Step 4: Event date</h3>
                  <p className="text-sm text-gray-600">Pick your event date from the calendar. Multi-day events are supported too!</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Step 5: Event time</h3>
                  <p className="text-sm text-gray-600">Set your start and end times so providers know when to arrive and how long to plan for.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <ListChecks className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Step 6: Select services</h3>
                  <p className="text-sm text-gray-600">Choose what you need: Food &amp; Beverage, Entertainment, Venue, and/or Vendors &amp; Services. Answer a few tailored questions to help us match you with the right providers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
          <p className="text-gray-600 mb-4">
            After you complete the planning flow, Eventini shows you a curated list of recommended providers based on your event details. You can:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Browse featured providers and recommendations by category</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">View provider profiles, photos, menus, and reviews</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Select multiple providers for a complete event package</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Configure food ordering preferences (for food providers)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Review everything and send requests to all providers at once</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Start planning early! Many popular providers book up weeks in advance, especially during peak seasons like summer and the holidays. The sooner you plan, the more options you&apos;ll have.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'booking-first-provider': {
    title: 'Booking your first food truck or caterer',
    category: 'Hosts',
    audience: 'Host',
    readTime: '5 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">From Planning to Booking</h2>
          <p className="text-gray-600 mb-4">
            After you&apos;ve entered your event details, Eventini shows you providers that match your needs. Here&apos;s how to go from recommendations to a confirmed booking.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browsing Recommendations</h2>
          <p className="text-gray-600 mb-4">
            The recommendations screen shows providers tailored to your event:
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Featured carousel</p>
                  <p className="text-sm text-gray-600">Top-rated providers highlighted at the top of the screen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ListChecks className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Category tabs</p>
                  <p className="text-sm text-gray-600">Switch between Food Trucks, Caterers, Bartenders, Entertainment, Venues, and more</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Provider cards</p>
                  <p className="text-sm text-gray-600">See photos, ratings, pricing, and quick details at a glance</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Selecting Providers</h2>
          <p className="text-gray-600 mb-4">
            Tap on any provider to view their full profile, then add them to your event:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>View photos</strong> &mdash; See their work, food presentation, and setup</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Check the menu</strong> &mdash; Browse their offerings and pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Read reviews</strong> &mdash; See what other hosts have said</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Add to event</strong> &mdash; Tap the button to include them in your request</span>
            </li>
          </ul>
          <p className="text-gray-600">
            You can select multiple providers from different categories to build your complete event lineup.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Configuring Food Orders</h2>
          <p className="text-gray-600 mb-4">
            For food providers, you&apos;ll choose how ordering works at your event:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <UtensilsCrossed className="w-5 h-5 text-[#44646c]" />
                <h3 className="font-semibold text-gray-900">À la carte</h3>
              </div>
              <p className="text-sm text-gray-600">Guests order and pay individually from the menu. You set a minimum guarantee, and sales are tracked in real-time during the event.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-[#44646c]" />
                <h3 className="font-semibold text-gray-900">Catering package</h3>
              </div>
              <p className="text-sm text-gray-600">Pre-select menu items for all guests. Choose a catering package and customize what&apos;s served. Price is typically per-person.</p>
            </div>
          </div>
          <p className="text-gray-600">
            You can also add beverages, note any food allergies, and include special requests for the provider.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reviewing &amp; Sending Requests</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Review your event summary</p>
                  <p className="text-sm text-gray-600">See all your event details: date, time, location, guest count, and selected providers.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Check the estimated cost</p>
                  <p className="text-sm text-gray-600">See the subtotal for each provider and your total estimated spend.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Add a message (optional)</p>
                  <p className="text-sm text-gray-600">Include any special notes or questions for your providers.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Submit your request</p>
                  <p className="text-sm text-gray-600">Send requests to all selected providers at once. They&apos;ll respond with availability and any questions.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">After You Submit</h2>
          <p className="text-gray-600 mb-4">
            Once you send your request, providers will review your event details and respond:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Providers confirm their availability for your date</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">You can message providers directly with questions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Accept confirmed providers to finalize your booking</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Track your event in the &quot;My Events&quot; section</span>
            </li>
          </ul>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Once a provider confirms and you accept, their calendar is blocked for your event. Please be sure before confirming, as cancellation policies may apply.
            </p>
          </div>
        </div>
      </>
    ),
  },
  'minimum-guarantees': {
    title: 'Understanding minimum guarantees',
    category: 'Hosts',
    audience: 'Host',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is a Minimum Guarantee?</h2>
          <p className="text-gray-600 mb-4">
            A minimum guarantee is the lowest amount a provider will accept for an event booking. It ensures that providers can cover their costs and time for showing up, regardless of how much guests actually spend.
          </p>
          <div className="bg-[#44646c]/5 rounded-xl p-6 mb-4">
            <p className="text-gray-700">
              <strong>Example:</strong> A food truck with a $500 minimum means you agree to pay at least $500, even if guests only order $300 worth of food. If guests order $600, you pay $600.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Minimums Exist</h2>
          <p className="text-gray-600 mb-4">
            Providers set minimum guarantees because:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Travel costs</strong> &mdash; Driving to your venue takes time and fuel</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Prep work</strong> &mdash; Food needs to be prepared, equipment loaded</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Opportunity cost</strong> &mdash; They&apos;re blocking that date for you</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Staffing</strong> &mdash; Labor costs exist regardless of sales</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How Eventini Shows Minimums</h2>
          <p className="text-gray-600 mb-4">
            On every provider profile and in your cost breakdown, you&apos;ll clearly see:
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">The minimum guarantee amount for your guest count</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Dynamic pricing based on your specific event size and location</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">How the minimum applies (e.g., food only vs. full service)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Working with Minimums</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Match your guest count</h3>
              <p className="text-sm text-gray-600">Choose providers whose minimums align with your expected attendance. Eventini shows you estimated per-person costs to help.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Encourage guests to eat</h3>
              <p className="text-sm text-gray-600">Let guests know food is available and when service starts. A simple announcement can boost participation.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Consider catering packages</h3>
              <p className="text-sm text-gray-600">If you want predictable pricing, choose a catering package with per-person pricing instead of open tab ordering.</p>
            </div>
          </div>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Using the &quot;open tab&quot; (à la carte) payment model? Eventini tracks sales in real-time during your event so you always know where you stand against the minimum.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'changes-cancellations-refunds-host': {
    title: 'Changes, cancellations, and refunds for hosts',
    category: 'Hosts',
    audience: 'Host',
    readTime: '5 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Making Changes to Your Event</h2>
          <p className="text-gray-600 mb-4">
            Life happens, and sometimes event details need to change. Here&apos;s how to handle modifications:
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Changes You Can Make</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Guest count</strong> &mdash; Update up to 48 hours before (may affect pricing)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Event time</strong> &mdash; Request a time change through the app</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Location</strong> &mdash; Notify provider of address changes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Special requests</strong> &mdash; Add dietary needs or setup preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Add more providers</strong> &mdash; Add additional services to an existing event</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-600">
            To make changes, go to your event in the Eventini app and tap &quot;Edit Event Details.&quot; Your providers will be notified and must confirm significant changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <p className="text-gray-600 mb-4">
            Cancellation policies vary by provider. When you book, you&apos;ll see their specific policy. Here&apos;s what&apos;s typical:
          </p>
          <div className="space-y-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">More than 7 days before</h3>
              <p className="text-sm text-gray-600">Full refund in most cases</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">3-7 days before</h3>
              <p className="text-sm text-gray-600">Partial refund (typically 50%)</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Less than 3 days before</h3>
              <p className="text-sm text-gray-600">No refund (provider has already prepped)</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Cancel</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <span className="text-gray-600">Open the Eventini app and go to &quot;My Events&quot;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <span className="text-gray-600">Select the event or provider you want to cancel</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <span className="text-gray-600">Tap &quot;Cancel Booking&quot; and review the refund amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <span className="text-gray-600">Confirm the cancellation</span>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Refund Timeline</h2>
          <p className="text-gray-600 mb-4">
            Refunds are processed within 5-7 business days and will appear on your original payment method. You&apos;ll receive an email confirmation when the refund is initiated.
          </p>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Weather cancellations:</strong> If severe weather makes your event unsafe, contact support. We work with providers to find fair solutions, which may include rescheduling or modified refunds.
            </p>
          </div>
        </div>
      </>
    ),
  },
  'multiple-providers-one-event': {
    title: 'Managing multiple providers for one event',
    category: 'Hosts',
    audience: 'Host',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">One Event, Multiple Providers</h2>
          <p className="text-gray-600 mb-4">
            Planning a bigger event? Eventini makes it easy to select multiple providers for the same event &mdash; like a food truck, bartender, DJ, and florist all in one place.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Plan your event once</p>
                  <p className="text-sm text-gray-600">Enter your event details &mdash; name, date, time, location, and guest count.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Select all the services you need</p>
                  <p className="text-sm text-gray-600">Choose Food &amp; Beverage, Entertainment, Venue, and/or Vendors &amp; Services.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Browse recommendations by category</p>
                  <p className="text-sm text-gray-600">Use the category tabs to view providers for each service type you selected.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Add multiple providers to your cart</p>
                  <p className="text-sm text-gray-600">Select your favorites from each category &mdash; they&apos;ll all be part of the same event.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">5</span>
                <div>
                  <p className="font-medium text-gray-900">Review and submit</p>
                  <p className="text-sm text-gray-600">See your total estimated cost and send requests to all providers at once.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Managing Your Providers</h2>
          <p className="text-gray-600 mb-4">
            Once booked, you can manage all your providers from one place:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Message each provider</strong> &mdash; Keep conversations organized by vendor</span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>View the schedule</strong> &mdash; See arrival times and setup needs for each</span>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Track costs</strong> &mdash; See your total spend across all providers</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Coordinating</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Share venue info</h3>
              <p className="text-sm text-gray-600">Make sure all providers have parking info, load-in instructions, and contact details.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Stagger arrivals</h3>
              <p className="text-sm text-gray-600">Schedule setup times so providers aren&apos;t all arriving at once.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Clarify power needs</h3>
              <p className="text-sm text-gray-600">Know what outlets and power capacity each provider requires.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Designate spaces</h3>
              <p className="text-sm text-gray-600">Plan where each provider will set up before they arrive.</p>
            </div>
          </div>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Create a simple timeline for your event day and share it with all providers. This helps everyone know when things are happening and reduces coordination stress.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'plan-with-moonboards': {
    title: 'Plan your event with MoonBoards',
    category: 'Hosts',
    audience: 'Host',
    readTime: '3 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What are MoonBoards?</h2>
          <p className="text-gray-600 mb-4">
            MoonBoards are Eventini&apos;s visual planning feature that lets you collect inspiration for your event. Think of it like a Pinterest board, but connected to real providers who can make your vision happen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Creating Your MoonBoard</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Start a new MoonBoard</p>
                  <p className="text-sm text-gray-600">Tap the MoonBoard icon in the Eventini app and create a new board.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Add inspiration</p>
                  <p className="text-sm text-gray-600">Save photos from provider profiles, or upload your own inspiration images.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Organize by category</p>
                  <p className="text-sm text-gray-600">Group your inspiration by food, decor, entertainment, etc.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Get recommendations</p>
                  <p className="text-sm text-gray-600">Eventini suggests providers that match your aesthetic.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Share with Providers</h2>
          <p className="text-gray-600 mb-4">
            When you book a provider, you can share your MoonBoard with them. This helps them understand your vision and deliver exactly what you&apos;re imagining.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Providers can see your style preferences</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Reduces back-and-forth communication</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Ensures everyone is aligned on the vision</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Start your MoonBoard early! Collecting inspiration over time helps you refine your vision and makes it easier to communicate what you want to providers.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'provider-onboarding': {
    title: 'Getting approved as a provider',
    category: 'Providers',
    audience: 'Provider',
    readTime: '5 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Join the Eventini Network</h2>
          <p className="text-gray-600 mb-4">
            Becoming an Eventini provider connects you with hosts looking for exactly what you offer. Our approval process ensures quality for everyone.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Application Steps</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Download the Provider App</p>
                  <p className="text-sm text-gray-600">Get the Eventini Provider app from the App Store or Google Play.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Create Your Account</p>
                  <p className="text-sm text-gray-600">Sign up with your email and verify your phone number.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Submit Business Details</p>
                  <p className="text-sm text-gray-600">Provide your business name, type, service area, and pricing.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Upload Documentation</p>
                  <p className="text-sm text-gray-600">Submit required licenses, permits, and insurance documents.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">5</span>
                <div>
                  <p className="font-medium text-gray-900">Complete Your Profile</p>
                  <p className="text-sm text-gray-600">Add photos, menu/services, and a compelling description.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
          <p className="text-gray-600 mb-4">
            Depending on your provider type, you may need to submit:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Food Providers</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>&bull; Health department permit</li>
                <li>&bull; Food handler certifications</li>
                <li>&bull; Business license</li>
                <li>&bull; Liability insurance</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Entertainment</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>&bull; Business license</li>
                <li>&bull; Liability insurance</li>
                <li>&bull; Performance samples</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Venues</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>&bull; Property ownership/lease</li>
                <li>&bull; Occupancy permits</li>
                <li>&bull; Insurance certificate</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Other Vendors</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>&bull; Business license</li>
                <li>&bull; Liability insurance</li>
                <li>&bull; Portfolio/examples</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Review Timeline</h2>
          <p className="text-gray-600 mb-4">
            Most applications are reviewed within 2-3 business days. You&apos;ll receive an email notification when your application is approved or if we need additional information.
          </p>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Tip for Faster Approval</p>
              <p className="text-sm text-gray-600">
                Make sure all documents are clear, current, and complete. Blurry photos or expired permits are the most common causes of delays.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'provider-fees-payouts': {
    title: 'Provider fees and payouts',
    category: 'Providers',
    audience: 'Provider',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How Eventini Fees Work</h2>
          <p className="text-gray-600 mb-4">
            Eventini charges a small fee on each booking to support the platform, payment processing, and customer support.
          </p>
          <div className="bg-[#44646c]/5 rounded-xl p-6 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#44646c] mb-2">10%</p>
              <p className="text-gray-600">Provider service fee on each booking</p>
            </div>
          </div>
          <p className="text-gray-600">
            The fee is automatically deducted from your payout. If a host pays $1,000, you receive $900.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Payment processing</strong> &mdash; All credit card fees are covered</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Platform access</strong> &mdash; Listing, messaging, calendar tools</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Customer support</strong> &mdash; Help for you and your hosts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Marketing</strong> &mdash; We bring hosts to the platform</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payout Schedule</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">When You Get Paid</h3>
            <p className="text-gray-600 mb-4">
              Payouts are initiated within 24-48 hours after your event is completed and the host confirms service.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Bank transfers: 2-3 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Instant payouts (if enabled): Same day</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Setting Up Payouts</h2>
          <p className="text-gray-600 mb-4">
            To receive payouts, you&apos;ll need to connect your bank account in the Provider app:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Go to Settings &gt; Payout Settings</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Enter your bank account details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Verify with micro-deposits (if required)</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Track Your Earnings</p>
              <p className="text-sm text-gray-600">
                View your earnings history, pending payouts, and detailed breakdowns in the Earnings section of your provider dashboard.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'managing-provider-availability': {
    title: 'Managing your availability and calendar',
    category: 'Providers',
    audience: 'Provider',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Eventini Calendar</h2>
          <p className="text-gray-600 mb-4">
            The in-app calendar is your command center for managing availability. Keep it updated so hosts can only request dates you&apos;re actually free.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Calendar Features</h2>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Block dates</h3>
                  <p className="text-sm text-gray-600">Mark days you&apos;re unavailable due to other commitments, vacations, or personal time.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Add external bookings</h3>
                  <p className="text-sm text-gray-600">Got a booking from outside Eventini? Add it to keep your calendar accurate.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quick book</h3>
                  <p className="text-sm text-gray-600">Instantly create a booking when a host contacts you directly.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#44646c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Discovery calls</h3>
                  <p className="text-sm text-gray-600">Schedule manual discovery calls with hosts before confirming a booking.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Update regularly</strong> &mdash; Check your calendar weekly and block any new conflicts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Set lead time</strong> &mdash; Require minimum notice (e.g., 48 hours) for new requests</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Plan for setup</strong> &mdash; Block buffer time before and after events if needed</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Respond quickly</strong> &mdash; Hosts appreciate fast responses to requests</span>
            </li>
          </ul>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> An accurate calendar protects you from double-bookings. If you accept a request for a date you&apos;ve also accepted elsewhere, you may face penalties or removal from the platform.
            </p>
          </div>
        </div>
      </>
    ),
  },
  'accept-decline-request-provider': {
    title: 'What happens when you accept or decline a request',
    category: 'Providers',
    audience: 'Provider',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Responding to Host Requests</h2>
          <p className="text-gray-600 mb-4">
            When a host sends you a request, you&apos;ll receive a notification with all the event details. You can then choose to accept or decline.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What You&apos;ll See in a Request</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Event date and time</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Event location and type (indoor/outdoor)</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Guest count</span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Event type and host details</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Requested services and estimated payout</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Any message from the host</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">When You Accept</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">Your calendar is immediately blocked for that date</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">The host is notified of your acceptance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">You can message the host directly to coordinate details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">The booking appears in your &quot;Upcoming Events&quot; section</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">When You Decline</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">The host is notified and can choose other providers</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">Your response rate may be affected (high decline rates can lower your visibility)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span className="text-gray-600">The date remains available on your calendar</span>
            </li>
          </ul>
          <p className="text-gray-600">
            You can optionally provide a reason for declining, which helps hosts understand and can improve their future requests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Response Time Matters</h2>
          <p className="text-gray-600 mb-4">
            We recommend responding to requests within 24 hours. Fast response times:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Improve your ranking in search results</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Build trust with hosts</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Increase your chances of being booked</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Enable push notifications in your provider app so you never miss a request. You can also set up email alerts for new bookings.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'host-payments-fees': {
    title: 'How payments and fees work for hosts',
    category: 'Payments',
    audience: 'Host',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Eventini Host Fee</h2>
          <p className="text-gray-600 mb-4">
            Eventini charges a small host service fee to support the platform, secure payments, customer support, and our provider vetting process.
          </p>
          <div className="bg-[#44646c]/5 rounded-xl p-6 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#44646c] mb-2">5-10%</p>
              <p className="text-gray-600">Host service fee based on booking type</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">When You Pay</h2>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Catering packages</h3>
              <p className="text-sm text-gray-600">A deposit is collected when you confirm your booking. The remaining balance is charged after the event.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Open tab / À la carte</h3>
              <p className="text-sm text-gray-600">Your payment method is authorized for the minimum guarantee. The actual amount is charged after the event based on real sales.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Venues &amp; hourly services</h3>
              <p className="text-sm text-gray-600">Charged according to the provider&apos;s terms &mdash; typically a deposit upfront and balance after.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Secure payments</strong> &mdash; Your card details are encrypted and protected</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Dispute resolution</strong> &mdash; We help mediate if issues arise</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Customer support</strong> &mdash; Real humans available to help</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Platform features</strong> &mdash; Messaging, tracking, receipts, and more</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Accepted Payment Methods</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Credit cards (Visa, Mastercard, Amex, Discover)</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Debit cards</span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Apple Pay and Google Pay</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Receipts &amp; Records</p>
              <p className="text-sm text-gray-600">
                You&apos;ll receive email receipts for all charges. You can also download invoices from the &quot;My Events&quot; section for expense reporting or tax purposes.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'open-tab-payment-host': {
    title: 'How to pay your open tab after the event',
    category: 'Payments',
    audience: 'Host',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is an Open Tab?</h2>
          <p className="text-gray-600 mb-4">
            With open tab (à la carte) ordering, guests order and pay for their own food at the event. As the host, you&apos;ve set a minimum guarantee &mdash; a floor amount you&apos;ll pay regardless of actual sales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">During the Event</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Timer className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Real-time tracking</strong> &mdash; Watch sales accumulate in the app</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Progress toward minimum</strong> &mdash; See how close you are to meeting your guarantee</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Guest activity</strong> &mdash; General overview of ordering patterns</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">After the Event</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Final tally</p>
                  <p className="text-sm text-gray-600">The provider closes out and submits the final sales total.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Review your bill</p>
                  <p className="text-sm text-gray-600">You&apos;ll receive a notification with the final amount due.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Automatic charge</p>
                  <p className="text-sm text-gray-600">The greater of actual sales or your minimum guarantee is charged to your card.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Your Bill</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Sales exceeded minimum</h3>
              <p className="text-sm text-gray-600">You pay the actual sales total. Great news &mdash; your guests loved the food!</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Sales below minimum</h3>
              <p className="text-sm text-gray-600">You pay your minimum guarantee. The provider is covered for their time.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Disputing Charges</h2>
          <p className="text-gray-600 mb-4">
            If you believe there&apos;s an error in your final bill:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Contact us within 48 hours of receiving your bill</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Provide details about the discrepancy</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">We&apos;ll investigate with the provider and resolve fairly</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Let your guests know food is available and encourage them to order early. Events with higher participation usually exceed the minimum guarantee.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'community-policies': {
    title: 'Eventini community policies',
    category: 'Policies',
    audience: 'All',
    readTime: '5 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Commitment to Safety</h2>
          <p className="text-gray-600 mb-4">
            Eventini is built on trust. Our community policies ensure that hosts find reliable providers, and providers work with respectful hosts. Here&apos;s what we expect from everyone.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">For All Users</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Respect &amp; Honesty</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Treat everyone with respect and professionalism</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Communicate honestly and promptly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Honor your commitments and bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Provide accurate information in your profile</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">For Hosts</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Provide accurate event details and guest counts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Ensure your venue is accessible and suitable for providers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Pay providers promptly and in full</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Leave fair and honest reviews</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">For Providers</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Keep your calendar and availability accurate</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Respond to requests within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Deliver the services you promised</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Maintain required licenses and insurance</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Zero Tolerance</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
            <p className="text-gray-700 mb-3">The following will result in immediate account suspension:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>&bull; Harassment, discrimination, or abusive behavior</li>
              <li>&bull; Fraud or misrepresentation</li>
              <li>&bull; Attempting to circumvent Eventini payments</li>
              <li>&bull; Repeated no-shows or last-minute cancellations</li>
              <li>&bull; Operating without required licenses or insurance</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reporting Issues</h2>
          <p className="text-gray-600 mb-4">
            If you experience a policy violation or safety concern:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Report through the app (tap the &quot;...&quot; menu on any profile or booking)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Email support@eventini.io with details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">All reports are reviewed within 24 hours</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Building Trust Together</p>
              <p className="text-sm text-gray-600">
                Reviews and ratings help maintain community standards. After every event, both hosts and providers can leave honest feedback that helps others make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'integrations-toast-pos': {
    title: 'Connecting Eventini with Toast POS',
    category: 'Integrations',
    audience: 'Provider',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Streamline Your Events with Toast</h2>
          <p className="text-gray-600 mb-4">
            If you use Toast POS for your food truck or catering business, you can connect it to Eventini to streamline event service and automatically sync sales data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits of Integration</h2>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Automatic sales sync</h3>
              <p className="text-sm text-gray-600">Event sales from Toast are automatically reported to Eventini &mdash; no manual entry needed.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Real-time tracking</h3>
              <p className="text-sm text-gray-600">Hosts can see live sales progress against their minimum guarantee.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Faster payouts</h3>
              <p className="text-sm text-gray-600">With automatic reporting, event closeout is faster and payouts are initiated sooner.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Connect</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Open Provider Settings</p>
                  <p className="text-sm text-gray-600">In the Eventini Provider app, go to Settings &gt; Integrations.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Select Toast POS</p>
                  <p className="text-sm text-gray-600">Tap &quot;Connect&quot; next to Toast POS.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Log in to Toast</p>
                  <p className="text-sm text-gray-600">Enter your Toast credentials to authorize the connection.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Configure event tracking</p>
                  <p className="text-sm text-gray-600">Choose how Eventini bookings appear in your Toast system.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Using Toast at Events</h2>
          <p className="text-gray-600 mb-4">
            Once connected, when you start an Eventini event:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">An event will be created in Toast automatically</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Sales ring up as normal on your Toast device</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Totals sync to Eventini in real-time</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Event closeout happens automatically</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Need Help?</p>
              <p className="text-sm text-gray-600">
                Having trouble connecting? Contact support@eventini.io and we&apos;ll help you get set up.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'high-volume-host': {
    title: 'High-volume hosts',
    category: 'Superhost',
    audience: 'Host',
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is a High-Volume Host?</h2>
          <p className="text-gray-600 mb-4">
            High-volume hosts are organizations and individuals who frequently book providers through Eventini. Whether you&apos;re a corporate event planner, property manager, or festival organizer, your track record unlocks special benefits.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Qualify</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Booking frequency</strong> &mdash; Host multiple events per month or quarter</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Reliable track record</strong> &mdash; Low cancellation rate and prompt payments</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Positive reviews</strong> &mdash; Providers rate their experience working with you</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Data-backed results</strong> &mdash; Events consistently meet or exceed minimums</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Reduced minimums</h3>
              <p className="text-sm text-gray-600">Some providers offer lower minimum guarantees to high-volume hosts with proven track records.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Priority support</h3>
              <p className="text-sm text-gray-600">Get faster response times and a dedicated account manager for complex events.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Preferred status</h3>
              <p className="text-sm text-gray-600">Providers see your high-volume badge and may prioritize your requests.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Volume discounts</h3>
              <p className="text-sm text-gray-600">Potential fee reductions for hosts who book frequently.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            High-volume status is automatically granted based on your activity. To get started:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Book your first few events through Eventini</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Maintain accurate RSVPs and event details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Pay promptly and communicate professionally</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Leave reviews to help the community</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Enterprise Accounts</p>
              <p className="text-sm text-gray-600">
                For organizations with significant event volume, contact us about enterprise pricing and features at enterprise@eventini.io.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
};

const validArticleIds = Object.keys(articleContent) as ArticleId[];

export function generateStaticParams() {
  return validArticleIds.map((articleId) => ({
    articleId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleId: string }>;
}): Promise<Metadata> {
  const { articleId } = await params;
  const article = articleContent[articleId as ArticleId];

  if (!article) {
    return {
      title: 'Article Not Found | Eventini Help Center',
    };
  }

  return {
    title: `${article.title} | Eventini Help Center`,
    description: `${article.category} - ${article.readTime}`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  if (!validArticleIds.includes(articleId as ArticleId)) {
    notFound();
  }

  const article = articleContent[articleId as ArticleId];

  return (
    <StaticPageLayout
      title={article.title}
      breadcrumbs={[
        { label: 'Support', href: '/support/help-center' },
        { label: 'Help Center', href: '/support/help-center' },
        { label: article.title },
      ]}
      maxWidth="medium"
    >
      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-200">
        <span className="px-3 py-1 bg-[#44646c]/10 text-[#44646c] text-sm font-medium rounded-full">
          {article.category}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
          {article.audience}
        </span>
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          {article.readTime}
        </span>
      </div>

      {/* Article Content */}
      <article className="prose prose-gray max-w-none">
        {article.content}
      </article>

      {/* Back Link */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/support/help-center"
          className="inline-flex items-center gap-2 text-[#44646c] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Center
        </Link>
      </div>
    </StaticPageLayout>
  );
}
