import NoteEditor from '@/components/NoteEditor'
import {getTranslations} from 'next-intl/server';

export default async function EditPage() {
  const t = await getTranslations('common');
  return <NoteEditor noteId={null} initialTitle={t('untitled')} initialBody="" />
}
