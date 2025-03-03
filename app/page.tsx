import path from 'path'
import Tar from 'tar-js'
import projectJSON from '@/app/project.json'
import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <div className='text-center'>
      <h1 className='my-8 text-4xl min-[550px]:text-5xl font-semibold text-black dark:text-white'>DutImg</h1>
      <p>엔트리 작품에서 이미지를 공유하는 또다른 방법</p>
      <hr className='mx-5 my-10 border-gray-200 dark:border-gray-800' />
      <h2 className='my-6 text-4xl font-medium'>업로드하기</h2>
      <form className='inline-block mx-auto' action={async (formData: FormData) => {
        'use server'

        const tar = new Tar
        const encoder = new TextEncoder
        const file = formData.get('file')
        if (typeof file == 'string' || file == null || file.name == 'project.json') return
        tar.append(String.fromCharCode(...encoder.encode(path.join('temp', file.name))), new Uint8Array(await file.arrayBuffer()))

        const body = new FormData
        body.set('projects', new Blob([ tar.append('temp/project.json', JSON.stringify(projectJSON)) ], { type: 'application/x-entryapp' }))
        await fetch('https://playentry.org/rest/project/upload', {
          method: 'POST',
          body,
        })
        redirect(new URL(file.name, 'https://playentry.org//uploads/').toString())
      }}>
        <input type='file' name='file' multiple className='file:px-2 file:py-1 file:cursor-pointer file:bg-blue-500 file:text-white file:rounded-full' />
        <button type='submit' className='px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-full'>업로드</button>
        <p className='font-bold text-red-500 my-4'>주의: 엔트리 기술적 한계로 인해 업로드한 이미지는 영구히 삭제·수정할 수 없습니다.</p>
      </form>
      <small className='block pl-4'>
        <ul className='inline-block list-disc text-left m-auto'>
          <li>지원되는 파일 형식: jpg, png, bmp, svg, mp3</li>
          <li>
            만약 지원되는 파일 형식 이외의 파일을 업로드하려면, <a href='https://aqu3180.co.kr/image-encoder/encoder.html' target='_blank' className='text-blue-500'>인코더를 이용해</a> png로 변환해야 합니다.<br />
            변환한 png 이미지는 <a href='https://aqu3180.co.kr/image-encoder/decoder.html' target='_blank' className='text-blue-500'>디코더를 이용해</a> 변환해서 원본 파일을 얻을 수 있습니다.
          </li>
        </ul>
      </small>
    </div>
  )
}
