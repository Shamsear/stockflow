import { requirePageAuth } from '@/lib/auth-guard';
import NewStoreClient from './NewStoreClient';

export const metadata = {
  title: 'Add Store - StockFlow WMS',
  description: 'Register a new retail outlet in the inventory system',
};

export default async function NewStorePage() {
  await requirePageAuth();

  return <NewStoreClient />;
}
