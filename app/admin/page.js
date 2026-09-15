import React from 'react';
import { getAdminAnalytics } from '@/lib/telemetry';
import AdminAnalyticsClient from './AdminAnalyticsClient';

export const metadata = {
  title: 'Walkthrough Telemetry & Executive Analytics - StockFlow Admin',
  description: 'Visitor funnel, walkthrough completion rates, visitor questions, and WhatsApp leads.',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const analytics = await getAdminAnalytics();

  return (
    <div className="min-h-screen bg-background text-text-primary pt-8 md:pt-24 pb-12">
      <AdminAnalyticsClient initialData={analytics} />
    </div>
  );
}
