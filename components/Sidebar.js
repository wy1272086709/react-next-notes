import React, { Suspense } from 'react'
import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarLogo from '@/components/SidebarLogo';
import SidebarImport from '@/components/SidebarImport';

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <SidebarLogo />
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
