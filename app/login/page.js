import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Live Demo Portal - StockFlow Warehouse Management System',
  description: 'Access the StockFlow interactive live demo dashboard for Qatar and UAE warehouses.',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
