import React from 'react';
// import { authOptions } from "pages/api/auth/[...nextauth]"
import { auth } from '@/auth';
export default async function NotificationPage() {
  const result = await auth();
  console.log(result);
  return <div>NotificationPage</div>;
}
