'use client'

import React from 'react'
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation'
import { importNote } from '@/actions'

export default function SidebarImport() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('common');

  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];
    console.log("选择的文件：", file.name);

    // 使用 FormData 包装文件
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await importNote(formData);
      if (data.error) {
        console.error("导入失败:", data.error);
        alert(data.error);
        return;
      }
      router.push(`/${locale}/note/${data.uid}`);

    } catch (error) {
      console.error("导入出错:", error);
      alert("导入失败，请重试");
    }

    // 重置 file input
    e.target.value = '';
  };


  return (
    <div style={{ textAlign: "center", padding: '36px 16px 16px', color: 'var(--primary-blue)' }}>
      <label htmlFor="file" style={{ cursor: 'pointer' }}>{t('import')}</label>
      <input type="file" id="file" name="file" style={{ position : "absolute", clip: "rect(0 0 0 0)" }} onChange={ onChange } accept=".md" />
    </div>
  )
}