import Link from 'next/link'
import Button from '@/components/button'

export default function NotFound() {
  return (
    <div className='flex justify-center items-center'>
      <h1 className='text-5xl font-bold'>요청하신 페이지를 찾을 수 없습니다.</h1>
      <Button />
      <Link href='/'>홈페이지로</Link>
    </div>
  )
}
