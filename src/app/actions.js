// 这里需要显式声明为'use server'
'use server'

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@lib/strapi";
import { revalidatePath } from "next/cache";
import { z } from 'zod'; 

const scheme = z.object({
    title: z.string().min(1, '请填写标题'),
    content: z.string().min(1, '请填写内容').max(200, 'Content must be less than 200 characters'),
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
export async function saveNote(prevState, formData) {
    const noteId = formData.get('noteId')
    console.log('title', formData, formData.get('title'))
    const data = {
        title: formData.get('title') || '',
        content: formData.get('body') || '',
        updateTime: new Date()
    }
    const validated = scheme.safeParse(data);
    if (!validated.success) {
        return {
            errors: validated.error.issues,
        }
    }
    await sleep(2000);
    if (noteId) {
        const slugId = await updateNote(noteId, JSON.stringify(data))
        revalidatePath('/', 'layout');
        redirect(`/note/${slugId}`)
    } else {
        const res = await addNote(JSON.stringify(data))
        revalidatePath('/', 'layout');
        redirect(`/note/${res}`);
    }
}

export async function deleteNote(prevState, formData) {
    const noteId = formData.get('noteId')
    console.log('delete note', noteId)
    await delNote(noteId);
    // 清空缓存，跳转到首页
    revalidatePath('/', 'layout');
    // redirect('/')
}