import { getUser } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 验证必填字段
    if (!username || !password) {
      return NextResponse.json(
        { error: "用户名和密码不能为空" },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: "密码长度至少为6位" },
        { status: 400 }
      );
    }

    // 检查用户是否已存在
    const existingUser = await getUser(username, password);

    // 如果返回值不是 0，说明用户已存在
    if (existingUser !== 0) {
      return NextResponse.json(
        { error: "用户名已存在" },
        { status: 409 }
      );
    }

    // 创建新用户（通过 addUser）
    const { addUser } = await import("@/lib/prisma");
    const newUser = await addUser(username, password);

    return NextResponse.json(
      {
        message: "注册成功",
        user: {
          id: newUser.id,
          username: newUser.username,
          name: newUser.name
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("注册错误:", error);
    return NextResponse.json(
      { error: "注册失败，请稍后重试" },
      { status: 500 }
    );
  }
}
