import NoteEditor from '@/components/NoteEditor'
import {getNote} from '@/lib/prisma';
import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default async function EditPage({ params }) {
  const noteId = params.id;
  const note = await getNote(noteId)
  const t = await getTranslations('note');

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // await sleep(5000);

  if (note === null) {
    return (
      <>
        <Header />
        <div className="main">
          <Sidebar />
          <section className="col note-viewer">
            <div className="note--empty-state">
              <span className="note-text--empty-state">
                {t('notFound')}
              </span>
            </div>
          </section>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="main">
        <Sidebar />
        <section className="col note-viewer">
          <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
        </section>
      </div>
    </>
  )
}
