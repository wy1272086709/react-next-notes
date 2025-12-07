'use client'
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

export default function SidebarImport() {
  const router = useRouter();
  const onChange = async (e) => {
    const fileInput = e.target;
    if (!fileInput.files || !fileInput.files.length) {
      console.warn('No file selected');
      return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();
      // 更新缓存
      revalidatePath('/', 'layout');
      router.push(`/note/${data.uid}`)

    } catch (error) {
      console.error("something went wrong");
    }
    // 重置 file input
    e.target.type = "text";
    // e.target.type = "file";
  };
  return (
    <div style={{ textAlign: "center" }}>
        <label for="file" style={{ cursor: 'pointer' }}>Import .md File</label>
        <input type="file" id="file" onChange={onChange} name="file" multiple style={{ position : "absolute", clip: "rect(0 0 0 0)" }} />
    </div>
  )
}

