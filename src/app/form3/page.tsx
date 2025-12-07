'use client';
import React from 'react';
import {
    zodResolver,
} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function FormWithReactHookFormAndZod() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm();
    const onSubmit = async (data) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        reset();
    }

    return (
        <form className='flex flex-col gap-y-2 p-4' onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('email', {
                    required: '请输入邮箱'
                })}
                type='email'
                placeholder='邮箱'
                className='px-4 py-2 rounded shadow-sm ring-1 ring-inset ring-gray-300'
            />
            {
                errors.email && (
                    <p className="text-red-500">{`${errors.password.message}`}</p>
                )
            }
            <input
                {...register("password", {
                    required: "请填写密码",
                    minLength: {
                        value: 5,
                        message: "密码最少设置 5 个字符",
                    },
                })}
                type="password"
                placeholder="密码"
                className="px-4 py-2 rounded shadow-sm ring-1 ring-inset ring-gray-300"
            />
            {errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
            )}

            <input
                {...register("confirmPassword", {
                    required: "请填写确认密码",
                    validate: (value) =>
                        value === getValues("password") || "密码必须一致",
                })}
                type="password"
                placeholder="确认密码"
                className="px-4 py-2 rounded shadow-sm ring-1 ring-inset ring-gray-300"
            />
            {errors.confirmPassword && (
                <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 disabled:bg-gray-500 py-2 rounded text-white"
            >
                注册
            </button>
        </form>
    )
}