import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string().
        min(1, { message: '请填写Email' }).
        email({ message: '请填写正确的邮箱'})
        ,
    password: z.string().min(1, { message: '请填写密码' }).
    min(5, "密码最少设置 5 个字符"),
    confirmPassword: z.string().min(1, { message: '请填写确认密码' })
    .refine((data) => data?.password === data?.confirmPassword, {
        message: "密码必须一致",
        path: ["confirmPassword"],
      })
})