import { PrismaClient } from '@prisma/client'
import { auth } from "auth"

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getAllNotes() {
  const session = await auth()
  if (session == null) return [];
  // 查找登录用户的笔记
  const notes = await prisma.note.findMany({
    where: {
      authorId: session?.user?.userId
    }
  })
  // 构造返回数据
  const res = {};
  notes.forEach(({title, content, id, updatedAt}) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })
  return res
}

export async function addNote(data) {
  const session = await auth()
  console.log('解析后的Data为：', JSON.parse(data));
  console.log('当前 session:', JSON.stringify(session, null, 2));
  console.log('userId:', session?.user?.userId);
  const result = await prisma.note.create({
    data: {
      title: JSON.parse(data).title,
      content: JSON.parse(data).content,
      author: { connect: { id: session?.user?.userId } },
    }
  });
  return result.id
}

export async function updateNote(uuid, data) {
  const parsedData = JSON.parse(data);
  await prisma.note.update({
    where: {
      id: uuid
    },
    data: {
      title: parsedData.title,
      content: parsedData.content
    }
  })
}

export async function getNote(uuid) {
  const session = await auth()
  if (session == null) return null;

  const note = await prisma.note.findFirst({
    where: {
      id: uuid
    }
  })

  if (!note) return null;

  const {title, content, updateTime, id} = note;

  return {
    title,
    content,
    updateTime,
    id
  }
}

export async function delNote(uuid) {
  await prisma.note.delete({
    where: {
      id: uuid
    }
  })
}

export async function addUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: []
      }
    }
  })

  return {
    name: username,
    username,
    id: user.id,
    userId: user.id
  }
}

export async function getUser(username, password) {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      notes: true
    }
  })
  if (!user) return 0;
  console.log('[AUTH] getUser 数据库查询结果:', JSON.stringify(user));
  if (user.password !== password) return 1
  return {
    name: username,
    username,
    id: user.id,
    userId: user.id
  } 
}

export default prisma