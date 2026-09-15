import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardShell from '@/components/DashboardShell';
import UnsavedChangesGuard from '@/components/UnsavedChangesGuard';

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const isDemo = cookieStore.get('stockflow_demo_access')?.value === 'true';

  if (!session && !isDemo) {
    redirect('/login');
  }

  const demoUser = {
    id: "demo-guest-user",
    name: "Demo Admin",
    username: "demo_admin",
    email: "demo@stockflow.app",
    role: "ADMIN",
  };

  const user = session?.user || demoUser;

  return (
    <DashboardShell user={user}>
      {children}
      <UnsavedChangesGuard />
    </DashboardShell>
  );
}
