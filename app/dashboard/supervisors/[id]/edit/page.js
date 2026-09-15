import { requirePageAuth } from '@/lib/auth-guard';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditSupervisorClient from './EditSupervisorClient';

export const metadata = {
  title: 'Edit Supervisor - StockFlow WMS',
  description: 'Modify supervisor details',
};

export default async function EditSupervisorPage({ params }) {
  await requirePageAuth();

  const { id } = await params;
  const supervisor = await prisma.supervisor.findUnique({ where: { id } });
  if (!supervisor) notFound();

  return <EditSupervisorClient supervisor={supervisor} />;
}
