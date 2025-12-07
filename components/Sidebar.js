import React, { Suspense } from 'react'
import Link from 'next/link'
import SiderbarNoteList from './SidebarNoteList'
import EditButton from './EditButton'
import NoteListSkeleton from './NoteListSkeleton'
import SidebarSearchField from './SidebarSearchField'
import SidebarImport from './SidebarImport'

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
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
        <section className="sidebar-menu" role="menubar">
          {/* SideSearchField */}
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SiderbarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  )
}
