import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarImport from '@/components/SidebarImport';

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <div style={{ 
            display: 'flex',
            alignItems: 'center',
            paddingRight: '10px',
            marginTop: '10px',
            marginBottom: '10px',
         }}>
          <section className="sidebar-header">
            <Link href="/" className="sidebar-logo-link" aria-label="React Notes Home">
              <img
                className="logo"
                src="/logo.svg"
                width="22px"
                height="20px"
                alt=""
                role="presentation"
              />
              <strong>React Notes</strong>
            </Link>
          </section>
          <SidebarImport />
        </div>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
