import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Centralized auth guard for server actions and API routes.
 * Returns the session if authenticated, falls back to demo admin if not.
 * @returns {Promise<import('next-auth').Session>}
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      user: {
        id: 'demo-guest-user',
        name: 'Demo Admin',
        email: 'demo@stockflow.app',
        username: 'demo_admin',
        role: 'ADMIN',
      },
    };
  }
  return session;
}

/**
 * Auth guard that returns the user role.
 * @returns {Promise<{ session: import('next-auth').Session, role: string }>}
 */
export async function requireAuthWithRole() {
  const session = await requireAuth();
  return { session, role: session.user?.role || 'ADMIN' };
}

/**
 * Auth guard for Dashboard server page components.
 * Allows valid NextAuth sessions OR visitors who clicked "Enter Live Demo Dashboard".
 * Redirects to /login only if neither exists.
 */
export async function requirePageAuth() {
  const session = await getServerSession(authOptions);
  if (session) return session;

  const cookieStore = cookies();
  const isDemo = cookieStore.get('stockflow_demo_access')?.value === 'true';
  if (isDemo) {
    return {
      user: {
        id: 'demo-guest-user',
        name: 'Demo Admin',
        email: 'demo@stockflow.app',
        username: 'demo_admin',
        role: 'ADMIN',
      },
    };
  }

  redirect('/login');
}
