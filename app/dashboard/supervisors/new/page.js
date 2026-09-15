import { requirePageAuth } from '@/lib/auth-guard';
import NewSupervisorClient from './NewSupervisorClient';

export const metadata = {
  title: 'Add Supervisor - StockFlow WMS',
  description: 'Register a new delivery supervisor',
};

export default async function NewSupervisorPage() {
  await requirePageAuth();

  return <NewSupervisorClient />;
}
