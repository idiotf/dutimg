'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { uploadFile } from './upload'

export default function Home() {
  const [image, setImage] = useState<File>()

  const [uploading, startUpload] = useTransition()
  const [error, setError] = useState<string>()

  const imageSrc = useMemo(() => {
    if (!image) return undefined
    return URL.createObjectURL(image)
  }, [image])

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  function changeImage({ currentTarget: { files } }: React.ChangeEvent<HTMLInputElement>) {
    if (!files) return

    setImage(files[0])
    setError(undefined)
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    setError(undefined)
    event.preventDefault()

    const formData = new FormData(event.target)
    const file = formData.get('file')
    if (!(file instanceof File)) return

    startUpload(async () => {
      try {
        location.assign(await uploadFile(file))
      } catch (e) {
        setError(String(e))
      }
    })
  }

  return (
    <div className='text-center'>
      <h1 className='my-8 text-4xl min-[550px]:text-5xl font-semibold text-black dark:text-white'>
        DutImg
      </h1>
      <p>엔트리 작품에서 이미지를 공유하는 또다른 방법</p>
      <hr className='mx-5 my-10 border-gray-200 dark:border-gray-800' />

      <h2 className='my-6 text-4xl font-medium'>업로드하기</h2>
      <form className='inline-block mx-auto' onSubmit={handleSubmit}>
        <input
          type='file'
          name='file'
          onChange={changeImage}
          className='file:px-2 file:py-1 file:cursor-pointer file:bg-blue-500 file:text-white file:rounded-full'
        />
        <button 
          type='submit'
          className='px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-full'
        >
          업로드
        </button>
        {uploading && <p>업로드 중...</p>}
        {error && <p className='text-red-500'>{error}</p>}

        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} className='mx-auto max-w-full max-h-50 mt-4' alt='' />
        )}
      </form>
      <small className='block pl-4 my-4'>
        <ul className='inline-block list-disc text-left m-auto'>
          <li>지원되는 파일 형식: jpg, png, bmp, svg, mp3</li>
          <li>
            만약 지원되는 파일 형식 이외의 파일을 업로드하려면,
            확장자를 jpg, png, bmp, mp3 중 하나로 변경해주세요.
          </li>
        </ul>
      </small>
    </div>
  )
}
