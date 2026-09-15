import { Suspense } from 'react';
import { requirePageAuth } from '@/lib/auth-guard';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const session = await requirePageAuth();

  // Safely extract environment metadata without leaking keys to client side
  const databaseUrl = process.env.DATABASE_URL || '';
  let databaseHost = 'Not Configured';
  if (databaseUrl) {
    try {
      const parts = databaseUrl.split('@');
      if (parts.length > 1) {
        databaseHost = parts[1].split('/')[0].split('?')[0];
      }
    } catch (e) {
      databaseHost = 'Cloud Connection';
    }
  }

  const config = {
    imageKitStatus: !!process.env.IMAGEKIT_PRIVATE_KEY && !!process.env.IMAGEKIT_URL_ENDPOINT ? 'Configured' : 'Missing',
    imageKitEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'Not Set',
    vapidStatus: !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && !!process.env.VAPID_PRIVATE_KEY ? 'Configured' : 'Missing',
    vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'Not Set',
    databaseHost,
    adminUsername: process.env.ADMIN_USERNAME || 'admin'
  };

  const user = session?.user || { name: 'Demo Admin', username: 'demo_admin', role: 'ADMIN' };

  return (
    <Suspense fallback={<div className="w-full min-h-[40vh] flex items-center justify-center"><div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-[pulse_1.4s_ease-in-out_infinite]" /><span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-[pulse_1.4s_ease-in-out_0.2s_infinite]" /><span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-[pulse_1.4s_ease-in-out_0.4s_infinite]" /></div></div>}>
      <SettingsClient config={config} user={user} />
    </Suspense>
  );
}
