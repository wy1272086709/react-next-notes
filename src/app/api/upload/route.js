import { stat, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mime from 'mime';
import dayjs from 'dayjs';
import { addNote } from '@/lib/strapi';

export function GET() {
    return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dayjs().format('YYYY-MM-DD')}`
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);
    try {
        await stat(uploadDir);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error("Error checking/uploading directory:", err);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }

    try {
        const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
        const filename = file.name.replace(/\.[^/.]+$/g, '');
        const uniqueFilename = `${filename}-${uniqueSuffix}`;
        await writeFile(join(uploadDir, uniqueFilename), buffer);
        const res = await addNote(JSON.stringify({
            title: filename,
            content: buffer.toString('utf-8')
        }));
        // 这里似乎没有生效，首页的文件列表没有刷新
        revalidatePath('/', 'layout');
        return NextResponse.json({
            fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
            uid: res,
        });
    } catch(e) {
        console.error("Error uploading file:", e);
        return NextResponse.json(
            { error: "something went wrong" }, 
            { status: 500 }
        );
    }
}
