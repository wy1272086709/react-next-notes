import { put } from '@vercel/blob';
import { addNote } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        console.log('API 路由文件名:', file.name);
        const title = file.name.replace(/\.[^/.]+$/, ""); // 移除扩展名获取标题 
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
        console.log('title:', title);

        // 调用接口，写入数据库
        const res = await addNote(JSON.stringify({
            title: title,
            content: Buffer.from(bytes).toString('utf-8')
        }));

        // 清除缓存
        revalidatePath('/', 'layout');
        return Response.json(
            { fileUrl: blob.pathname, uid: res }
        );
    } catch (e) {
        console.error(e)
        return Response.json({ error: "Something went wrong." });
    }
}