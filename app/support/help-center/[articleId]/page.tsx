import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, Users, Briefcase, CreditCard, FileText, Plug, Award, Clock, Calendar, DollarSign, MessageSquare, Star, Smartphone } from 'lucide-react';

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
    readTime: '5 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Eventini</h2>
          <p className="text-gray-600 mb-4">
            Eventini makes it easy to find and book amazing providers for your events. Whether you&apos;re planning a birthday party, corporate gathering, wedding, or community event, we connect you with local food trucks, caterers, entertainers, and more.
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Posting Your First Event</h2>
          <p className="text-gray-600 mb-4">
            Once your account is set up, you can post an event to receive offers from providers:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Tap the <strong>&quot;Post Event&quot;</strong> button on your home screen</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Enter your event details: date, time, location, and guest count</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Select what type of provider you need (food truck, caterer, DJ, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Add any special requirements or preferences</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Submit and start receiving offers from interested providers</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browsing Providers Directly</h2>
          <p className="text-gray-600 mb-4">
            You can also browse providers directly through the marketplace:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Use the search and filter options to find providers by category, location, or cuisine type</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">View provider profiles, photos, menus, and reviews</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Send a booking request directly to providers you like</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Post your event early! Many popular providers book up weeks in advance, especially during peak seasons like summer and the holidays.
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
    readTime: '4 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Finding the Right Provider</h2>
          <p className="text-gray-600 mb-4">
            Eventini offers two ways to connect with food trucks and caterers: posting an event to receive offers, or browsing and requesting directly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Post an Event</h3>
              <p className="text-sm text-gray-600">Best when you want multiple options. Providers come to you with their offers.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Request Directly</h3>
              <p className="text-sm text-gray-600">Best when you know exactly who you want. Send a request to a specific provider.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reviewing Offers</h2>
          <p className="text-gray-600 mb-4">
            When providers respond to your event, you&apos;ll see their offers in the app. Each offer includes:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Pricing details</strong> – Per-person cost, minimum spend, or flat rate</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Menu or service details</strong> – What they&apos;ll provide for your event</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Provider profile</strong> – Photos, reviews, and ratings from past events</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Availability confirmation</strong> – They&apos;re already available for your date</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Confirming Your Booking</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Select your preferred offer</p>
                  <p className="text-sm text-gray-600">Tap on the offer to see full details and message the provider with any questions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Accept the offer</p>
                  <p className="text-sm text-gray-600">Confirm that the details are correct and agree to the terms.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Add payment method</p>
                  <p className="text-sm text-gray-600">Enter your card details. You won&apos;t be charged until the event is complete.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">You&apos;re booked!</p>
                  <p className="text-sm text-gray-600">You&apos;ll receive a confirmation and can message your provider anytime.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Once you accept an offer, the provider&apos;s calendar is blocked for your event. Please be sure before confirming, as cancellation policies may apply.
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
              <span className="text-gray-600"><strong>Travel costs</strong> – Driving to your venue takes time and fuel</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Prep work</strong> – Food needs to be prepared, equipment loaded</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Opportunity cost</strong> – They&apos;re blocking that date for you</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Staffing</strong> – Labor costs exist regardless of sales</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How Eventini Shows Minimums</h2>
          <p className="text-gray-600 mb-4">
            On every provider profile and in every offer, you&apos;ll clearly see:
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">The minimum guarantee amount</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600">Recommended guest count to meet the minimum</span>
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
              <p className="text-sm text-gray-600">Choose providers whose minimums align with your expected attendance.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Encourage guests to eat</h3>
              <p className="text-sm text-gray-600">Let guests know food is available and when service starts.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Ask about flexibility</h3>
              <p className="text-sm text-gray-600">Some providers may adjust minimums for weekday events or off-peak times.</p>
            </div>
          </div>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Using the &quot;open tab&quot; payment model? Eventini tracks sales in real-time during your event so you always know where you stand against the minimum.
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
                <span className="text-gray-600"><strong>Guest count</strong> – Update up to 48 hours before (may affect pricing)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Event time</strong> – Request a time change through the app</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Location</strong> – Notify provider of address changes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Special requests</strong> – Add dietary needs or setup preferences</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-600">
            To make changes, go to your booking in the Eventini app and tap &quot;Edit Event Details.&quot; Your provider will be notified and must confirm significant changes.
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
                <span className="text-gray-600">Open the Eventini app and go to your bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <span className="text-gray-600">Select the booking you want to cancel</span>
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
            Planning a bigger event? Eventini makes it easy to book multiple providers for the same event – like a food truck, bartender, and DJ all in one place.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Post your event once</p>
                  <p className="text-sm text-gray-600">Enter your event details – date, time, location, and guest count.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Select multiple categories</p>
                  <p className="text-sm text-gray-600">Choose all the provider types you need: food, drinks, entertainment, rentals, etc.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Receive offers by category</p>
                  <p className="text-sm text-gray-600">Providers from each category will respond with their offers.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Book your favorites</p>
                  <p className="text-sm text-gray-600">Accept offers from different providers – they&apos;ll all be linked to your event.</p>
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
              <span className="text-gray-600"><strong>Message each provider</strong> – Keep conversations organized by vendor</span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>View the schedule</strong> – See arrival times and setup needs for each</span>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Track costs</strong> – See your total spend across all providers</span>
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
                  <p className="text-sm text-gray-600">Provide your business name, type, and service area.</p>
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
                  <p className="text-sm text-gray-600">Add photos, menu/services, pricing, and description.</p>
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
                <li>• Health department permit</li>
                <li>• Food handler certifications</li>
                <li>• Business license</li>
                <li>• Liability insurance</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Entertainment</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Business license</li>
                <li>• Liability insurance</li>
                <li>• Performance samples</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Venues</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Property ownership/lease</li>
                <li>• Occupancy permits</li>
                <li>• Insurance certificate</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Other Vendors</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Business license</li>
                <li>• Liability insurance</li>
                <li>• Portfolio/examples</li>
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
              <span className="text-gray-600"><strong>Payment processing</strong> – All credit card fees are covered</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Platform access</strong> – Listing, messaging, calendar tools</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Customer support</strong> – Help for you and your hosts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Marketing</strong> – We bring hosts to the platform</span>
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
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Event completed</span>
                <span className="font-medium text-gray-900">Day 0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Payout initiated</span>
                <span className="font-medium text-gray-900">Day 1-2</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Funds in your account</span>
                <span className="font-medium text-gray-900">Day 3-5</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Setting Up Payouts</h2>
          <p className="text-gray-600 mb-4">
            To receive payouts, connect your bank account in the Provider app:
          </p>
          <ol className="space-y-2 text-gray-600">
            <li>1. Go to Settings → Payout Settings</li>
            <li>2. Enter your bank account details</li>
            <li>3. Verify with micro-deposits (two small amounts)</li>
            <li>4. You&apos;re ready to receive payouts!</li>
          </ol>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Tax reminder:</strong> Eventini will send you a 1099 form at year-end if your earnings exceed $600. Keep records of your expenses for tax purposes.
            </p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Calendar in the Eventini App</h2>
          <p className="text-gray-600 mb-4">
            The in-app calendar is your central hub for managing availability. Keep it updated to receive relevant booking requests and avoid double-bookings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Calendar Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <Calendar className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Block Dates</h3>
              <p className="text-sm text-gray-600">Mark days you&apos;re unavailable for personal time, other bookings, or maintenance.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <Clock className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Set Hours</h3>
              <p className="text-sm text-gray-600">Define your available hours for each day of the week.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <Smartphone className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Book</h3>
              <p className="text-sm text-gray-600">Add bookings you receive outside of Eventini to keep everything synced.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <MessageSquare className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Discovery Calls</h3>
              <p className="text-sm text-gray-600">Schedule manual discovery calls for complex events that need discussion.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Blocking Dates</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <span className="text-gray-600">Open the Calendar tab in the Provider app</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <span className="text-gray-600">Tap on the date you want to block</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <span className="text-gray-600">Select &quot;Block Date&quot; or &quot;Block Time Range&quot;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <span className="text-gray-600">Add an optional note (e.g., &quot;Personal&quot; or &quot;Other event&quot;)</span>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Adding External Bookings</h2>
          <p className="text-gray-600 mb-4">
            If you book an event through another channel (phone, website, etc.), add it to your Eventini calendar using Quick Book:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Tap the + button on your calendar</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Select &quot;Quick Book&quot;</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Enter the event details (date, time, location)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">The date is now blocked and visible on your calendar</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                Update your calendar weekly, especially during busy seasons. Hosts appreciate accurate availability – it builds trust and leads to more bookings.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'accept-decline-request-provider': {
    title: 'What happens when you accept or decline a request',
    category: 'Providers',
    audience: 'Provider',
    readTime: '3 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Responding to Booking Requests</h2>
          <p className="text-gray-600 mb-4">
            When a host sends you a booking request, you have the option to accept, decline, or send a counter-offer. Here&apos;s what happens with each choice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">When You Accept</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">The date is immediately blocked on your calendar</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">The host receives a confirmation notification</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">You can message the host directly about event details</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">Payment is authorized (you&apos;ll be paid after the event)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">When You Decline</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">The host is notified and can book another provider</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">You can optionally provide a reason (helps improve matching)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">Your calendar remains unchanged</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">No penalty for declining (but response rate matters)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Response Rate Matters</h2>
          <p className="text-gray-600 mb-4">
            Your response rate affects your visibility in search results. Aim to respond within 24 hours, even if you need to decline.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">90%+</p>
              <p className="text-sm text-gray-600">Excellent</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">70-89%</p>
              <p className="text-sm text-gray-600">Good</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">&lt;70%</p>
              <p className="text-sm text-gray-600">Needs work</p>
            </div>
          </div>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Accepting a request is a commitment. Canceling after accepting can result in penalties and affects your provider rating.
            </p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Host Fees</h2>
          <p className="text-gray-600 mb-4">
            Eventini charges a small host fee to support the platform, secure payments, and customer support.
          </p>
          <div className="bg-[#44646c]/5 rounded-xl p-6 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#44646c] mb-2">5%</p>
              <p className="text-gray-600">Host service fee on each booking</p>
            </div>
          </div>
          <p className="text-gray-600">
            The fee is added to your total at checkout. If the provider charges $1,000, your total will be $1,050.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Your Fee Covers</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Secure payments</strong> – Protected transactions with fraud monitoring</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Customer support</strong> – Help when you need it</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Platform features</strong> – Event posting, messaging, reviews</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Provider vetting</strong> – All providers are verified</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">When You&apos;re Charged</h2>
          <p className="text-gray-600 mb-4">
            Payment timing depends on the booking type:
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Fixed-Price Bookings</h3>
              <p className="text-sm text-gray-600">Your card is authorized at booking and charged after the event is completed.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Open Tab Bookings</h3>
              <p className="text-sm text-gray-600">You&apos;re charged the final amount (at least the minimum guarantee) after the event.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Package Bookings</h3>
              <p className="text-sm text-gray-600">Charged at booking confirmation for the full package amount.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Methods</h2>
          <p className="text-gray-600 mb-4">
            We accept all major credit and debit cards:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Visa, Mastercard, American Express, Discover</li>
            <li>• Apple Pay and Google Pay (in-app)</li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">
                You can view your payment history and receipts anytime in the Eventini app under Account → Payment History.
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
    readTime: '3 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is an Open Tab?</h2>
          <p className="text-gray-600 mb-4">
            An open tab booking means guests order and eat as they like during your event. You pay for what&apos;s actually consumed, with a minimum guarantee to protect the provider.
          </p>
          <div className="bg-[#44646c]/5 rounded-xl p-6 mb-4">
            <p className="text-gray-700">
              <strong>Example:</strong> With a $500 minimum, if guests order $650 worth of food, you pay $650. If they only order $400, you pay the $500 minimum.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">During Your Event</h2>
          <p className="text-gray-600 mb-4">
            The provider tracks orders in real-time using their POS system (like Square or Toast) connected to Eventini. You can check your running total anytime in the app.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Open the Eventini app during your event</span>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">View your current tab amount vs. minimum</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Track progress in real-time</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">After Your Event</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-900">Provider closes the tab</p>
                  <p className="text-sm text-gray-600">When service ends, the provider submits the final total.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">You receive a summary</p>
                  <p className="text-sm text-gray-600">Review the itemized breakdown in the app.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Confirm and pay</p>
                  <p className="text-sm text-gray-600">Approve the amount and your card is charged automatically.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Adding a Tip</h2>
          <p className="text-gray-600 mb-4">
            After reviewing your final tab, you&apos;ll have the option to add a tip for the provider and their staff. Tips go directly to them and are greatly appreciated!
          </p>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Questions about your tab?</strong> If anything looks incorrect, contact the provider through the app before confirming. We&apos;re here to help resolve any discrepancies.
            </p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Community Standards</h2>
          <p className="text-gray-600 mb-4">
            Eventini is built on trust. These policies ensure a safe, respectful, and reliable experience for everyone in our community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">For Everyone</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Be respectful</strong> – Treat others as you want to be treated</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Communicate honestly</strong> – Provide accurate information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Honor commitments</strong> – Follow through on bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Stay safe</strong> – Follow all applicable laws and safety guidelines</span>
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
              <span className="text-gray-600">Ensure the venue is suitable for the booked services</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Pay promptly after services are rendered</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Leave honest, fair reviews</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">For Providers</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Maintain accurate listings and availability</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Deliver services as described and agreed</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Maintain all required licenses and insurance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Respond to inquiries promptly</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Prohibited Conduct</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <ul className="space-y-2 text-gray-700">
              <li>• Discrimination based on protected characteristics</li>
              <li>• Harassment or threatening behavior</li>
              <li>• Fraudulent bookings or payments</li>
              <li>• Circumventing the platform to avoid fees</li>
              <li>• Providing illegal services</li>
              <li>• Fake reviews or review manipulation</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reporting Issues</h2>
          <p className="text-gray-600 mb-4">
            If you experience a policy violation, please report it through the app or contact support@eventini.io. We take all reports seriously and will investigate promptly.
          </p>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Building Trust Together</p>
              <p className="text-sm text-gray-600">
                Our community thrives when everyone follows these guidelines. Thank you for helping make Eventini a great place for hosts and providers alike.
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Toast POS Integration</h2>
          <p className="text-gray-600 mb-4">
            If you use Toast for your point-of-sale system, you can connect it to Eventini for seamless open-tab tracking during events.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits of Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Sync</h3>
              <p className="text-sm text-gray-600">Orders entered in Toast automatically update the host&apos;s tab in Eventini.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Accurate Totals</h3>
              <p className="text-sm text-gray-600">No manual entry means fewer errors and disputes.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Faster Closeout</h3>
              <p className="text-sm text-gray-600">End-of-event settlement happens automatically.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Reports</h3>
              <p className="text-sm text-gray-600">View itemized breakdowns for every event.</p>
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
                  <p className="font-medium text-gray-900">Go to Settings in the Provider app</p>
                  <p className="text-sm text-gray-600">Navigate to Settings → Integrations → Toast POS</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-900">Sign in to Toast</p>
                  <p className="text-sm text-gray-600">Use your Toast admin credentials to authorize the connection.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-900">Select your restaurant/location</p>
                  <p className="text-sm text-gray-600">Choose which Toast location to connect.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#44646c] text-white text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-900">Test the connection</p>
                  <p className="text-sm text-gray-600">Create a test order to verify everything works.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">During Events</h2>
          <p className="text-gray-600 mb-4">
            Once connected, here&apos;s how it works at events:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Open the event in Eventini before service starts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Ring up orders in Toast as normal</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Totals sync to Eventini automatically</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600">Close the tab in Eventini when service ends</span>
            </li>
          </ul>
        </section>

        <div className="bg-[#44646c]/5 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Other POS Systems</p>
              <p className="text-sm text-gray-600">
                We also support Square. More integrations coming soon! Contact support if you use a different POS and want to see it supported.
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
    readTime: '3 min read',
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is a High-Volume Host?</h2>
          <p className="text-gray-600 mb-4">
            High-volume hosts are event planners, corporate accounts, or individuals who book frequently through Eventini. If you consistently deliver great events, you may qualify for preferred status.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits of High-Volume Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <Award className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Reduced Minimums</h3>
              <p className="text-sm text-gray-600">Some providers may lower their minimum guarantees for verified high-volume hosts.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <Star className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Priority Support</h3>
              <p className="text-sm text-gray-600">Get faster responses from our support team when you need help.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <Users className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Preferred Matching</h3>
              <p className="text-sm text-gray-600">Providers see your booking history and may prioritize your requests.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <DollarSign className="w-6 h-6 text-[#44646c] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Terms</h3>
              <p className="text-sm text-gray-600">Access to volume discounts and custom payment arrangements.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Qualify</h2>
          <p className="text-gray-600 mb-4">
            High-volume status is based on your booking history:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Booking frequency</strong> – Regular bookings over 6+ months</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Total spend</strong> – Minimum cumulative booking value</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Reliability</strong> – Low cancellation rate</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Payment history</strong> – No payment issues</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Corporate Accounts</h2>
          <p className="text-gray-600 mb-4">
            If you&apos;re booking for a company or organization, contact us about setting up a corporate account with:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Centralized billing and invoicing</li>
            <li>• Multiple authorized users</li>
            <li>• Custom approval workflows</li>
            <li>• Dedicated account manager</li>
          </ul>
        </section>

        <div className="bg-[#44646c] rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-2">Interested in High-Volume Status?</h3>
          <p className="text-white/80 text-sm mb-4">
            Contact our team to discuss your booking needs and see if you qualify.
          </p>
          <a
            href="mailto:enterprise@eventini.io"
            className="inline-block px-4 py-2 bg-white text-[#44646c] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Contact Enterprise Team
          </a>
        </div>
      </>
    ),
  },
};

const validArticleIds = Object.keys(articleContent) as ArticleId[];

export async function generateStaticParams() {
  return validArticleIds.map((articleId) => ({
    articleId,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ articleId: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = articleContent[resolvedParams.articleId as ArticleId];

  if (!article) {
    return {
      title: 'Article Not Found | Eventini Help Center',
    };
  }

  return {
    title: `${article.title} | Eventini Help Center`,
    description: `Learn about ${article.title.toLowerCase()} in the Eventini Help Center.`,
  };
}

export default async function HelpCenterArticlePage({ params }: { params: Promise<{ articleId: string }> }) {
  const resolvedParams = await params;
  const articleId = resolvedParams.articleId as ArticleId;
  const article = articleContent[articleId];

  if (!article) {
    notFound();
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hosts': return Users;
      case 'Providers': return Briefcase;
      case 'Payments': return CreditCard;
      case 'Policies': return FileText;
      case 'Integrations': return Plug;
      case 'Superhost': return Award;
      default: return FileText;
    }
  };

  const CategoryIcon = getCategoryIcon(article.category);

  return (
    <StaticPageLayout
      title={article.title}
      subtitle=""
      breadcrumbs={[
        { label: 'Support', href: '/support/help-center' },
        { label: 'Help Center', href: '/support/help-center' },
        { label: article.title },
      ]}
      maxWidth="medium"
    >
      <Link href="/support/help-center" className="inline-flex items-center gap-2 text-[#44646c] font-medium mb-8 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Help Center
      </Link>

      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#44646c]/10 flex items-center justify-center">
            <CategoryIcon className="w-4 h-4 text-[#44646c]" />
          </div>
          <span className="text-sm font-medium text-[#44646c]">{article.category}</span>
        </div>
        <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          {article.audience}
        </span>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {article.readTime}
        </span>
      </div>

      {/* Article Content */}
      <div className="prose prose-gray max-w-none">
        {article.content}
      </div>

      {/* Related Help */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Still have questions?</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/support/help-center"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Browse all articles
          </Link>
          <a
            href="mailto:support@eventini.io"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#44646c] text-white rounded-lg hover:bg-[#3a575e] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </StaticPageLayout>
  );
}
