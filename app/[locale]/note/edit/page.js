import NoteEditor from '@/components/NoteEditor'
import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default async function EditPage() {
  const t = await getTranslations('common');
  return (
    <>
      <Header />
      <div className="main">
        <Sidebar />
        <section className="col note-viewer">
          <NoteEditor noteId={null} initialTitle={t('untitled')} initialBody="" />
        </section>
      </div>
    </>
  )
}
