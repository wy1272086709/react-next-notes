import SidebarNoteListFilter from '@/components/SidebarNoteListFilter';
import { getAllNotes } from '@/lib/prisma';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';
import {getTranslations} from 'next-intl/server';

export default async function NoteList() {
  const t = await getTranslations('note');

  // await sleep(2000)
  const notes = await getAllNotes()

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">
      {t('emptyState')}
    </div>
  }

  return (
    <SidebarNoteListFilter notes = {
      Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })
    } />
  )
}