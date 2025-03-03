import Form from '@/components/form'

export default function Home() {
  return (
    <div className='text-center'>
      <h1 className='my-8 text-4xl min-[550px]:text-5xl font-semibold text-black dark:text-white'>DutImg</h1>
      <p>엔트리 작품에서 이미지를 공유하는 또다른 방법</p>
      <hr className='mx-5 my-10 border-gray-200 dark:border-gray-800' />
      <h2 className='my-6 text-4xl font-medium'>업로드하기</h2>
      <Form />
    </div>
  )
}
