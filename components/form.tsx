'use client'

import uploadFiles from '@/app/upload'
import { useState } from 'react'

export default function Form() {
  const [ files, setFiles ] = useState<File[]>([])

  return (
    <form className='inline-block mx-auto px-4' action={uploadFiles}>
      <input type='file' name='files' multiple onChange={({ currentTarget }) => currentTarget.files && setFiles([...currentTarget.files])} className='file:px-2 file:py-1 file:cursor-pointer file:bg-blue-500 file:text-white file:rounded-full' />
      <button type='submit' className='px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-full'>업로드</button>
      <p className='font-bold text-red-500 my-4'>주의: 엔트리 기술적 한계로 인해 업로드한 이미지는 영구히 삭제·수정할 수 없습니다.</p>
      <ul>{files.map((file, i) => 
        <li key={`${i}-${file.name}-${file.lastModified}`} className='p-2 bg-stone-400 dark:bg-stone-500 border-4 rounded-xl border-stone-500 dark:border-stone-700 text-left'>
          <div className='inline-block align-top w-50 overflow-hidden whitespace-nowrap overflow-ellipsis'>{file.name}</div>
          <span> | </span>
          <label htmlFor={`filename-${i}`}>업로드할 이름: </label>
          <input type='text' id={`filename-${i}`} name={`filename-${i}`} defaultValue={file.name} required placeholder='파일 이름을 입력하세요' className='px-1 bg-stone-300 dark:bg-stone-400 text-black rounded-sm' />
        </li>
      )}</ul>
    </form>
  )
}
