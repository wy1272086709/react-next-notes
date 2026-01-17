import NoteEditor from '@/components/NoteEditor'
import {getNote} from '@/lib/prisma';
import {getTranslations} from 'next-intl/server';

export default async function EditPage({ params }) {
  const noteId = params.id;
  const note = await getNote(noteId)
  const t = await getTranslations('note');

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // await sleep(5000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          {t('notFound')}
        </span>
      </div>
    )
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}
