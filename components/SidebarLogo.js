'use client'

import Link from 'next/link'
import {useLocale} from 'next-intl';
import SidebarImport from './SidebarImport'; // Adjust the path as needed

export default function SidebarLogo() {
  const locale = useLocale();

  return (
    <div style={{display: 'flex'}}>
      <Link href={`/${locale}`} className="link--unstyled">
        <section className="sidebar-header">
          <img
            className="logo"
            src="/logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
      </Link>
      <SidebarImport />
    </div>
  );
}
