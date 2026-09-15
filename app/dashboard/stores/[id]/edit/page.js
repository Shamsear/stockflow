import { requirePageAuth } from '@/lib/auth-guard';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditStoreClient from './EditStoreClient';

export const metadata = {
  title: 'Edit Store - StockFlow WMS',
  description: 'Modify store details and settings',
};

export default async function EditStorePage({ params }) {
  await requirePageAuth();

  const { id } = await params;
  const store = await prisma.store.findUnique({ where: { id } });
  if (!store) notFound();

  return <EditStoreClient store={store} />;
}
