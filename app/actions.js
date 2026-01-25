'use server'

import { redirect } from 'next/navigation'
import { updateNote, delNote} from '@/lib/prisma';
import { addNote } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from "zod";
import { put } from '@vercel/blob';
import {headers} from 'next/headers';

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容')
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

function getLocale() {
  try {
    const headersList = headers();
    const referer = headersList.get('referer') || '';
    // 从 referer URL 中提取 locale（例如：http://localhost:3000/zh/note/edit/123 -> zh）
    const url = new URL(referer || 'http://localhost/zh');
    const pathname = url.pathname;
    const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
    return match ? match[1] : 'zh';
  } catch {
    return 'zh';
  }
}

export async function saveNote(prevState, formData) {

  // 获取 noteId
  const noteId = formData.get('noteId')
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  // 校验数据
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    }
  }

  // 模拟请求时间
  // await sleep(2000)

  const locale = getLocale();

  // 更新数据库
  if (noteId) {
    await updateNote(noteId, JSON.stringify(data))
    revalidatePath('/', 'layout')
    redirect(`/${locale}/note/${noteId}`)
  } else {
    const res = await addNote(JSON.stringify(data))
    revalidatePath('/', 'layout')
    redirect(`/${locale}/note/${res}`)
  }
  
  // return { message: `Add Success!` }
}

export async function deleteNote(prevState, formData) {
  const noteId = formData.get('noteId')
  const locale = getLocale();
  delNote(noteId)
  revalidatePath('/', 'layout')
  redirect(`/${locale}`)
}

export async function importNote(formData) {
  'use server';
  const file = formData.get('file')

  // 空值判断
  if (!file) {
    return { error: "File is required." };
  }

  try {
    console.log('上传的文件信息：', file);

    // 移除文件扩展名获取标题
    const filename = file.name.replace(/\.[^/.]+$/, "")

    const blob = await put(file.name, file, {
      access: 'public', // 文件可公开访问
      contentType: file.type, // 保持原有的文件类型
      metadata: {
        originalName: file.name,
      },
      addRandomSuffix: true, // 为文件名添加随机后缀
    });

    const bytes = await file.arrayBuffer();
    console.log('blob:', blob);
    console.log('filename:', filename);

    // 调用接口，写入数据库
    const res = await addNote(JSON.stringify({
      title: filename,
      content: Buffer.from(bytes).toString('utf-8')
    }));

    // 清除缓存
    revalidatePath('/', 'layout');
    return { fileUrl: blob.pathname, uid: res }
  } catch (e) {
    console.error(e)
    return { error: "Something went wrong." }
  }
}