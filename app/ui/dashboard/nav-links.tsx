'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { InboxIcon, CheckCircleIcon } from '@heroicons/react/20/solid';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Accreditations',
    href: '/dashboard/accreditations',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: PaperAirplaneIcon,
  },
  { name: 'Contacts', href: '/dashboard/contacts', icon: UserGroupIcon },
  { name: 'Notifications', href: '/dashboard/notifications', icon: InboxIcon },
  { name: 'Validation', href: '/dashboard/validation', icon: CheckCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
