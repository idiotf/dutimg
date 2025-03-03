import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ subsets: [] })

export const metadata: Metadata = {
  title: 'DutImg',
  description: '엔트리 이미지 업로드 사이트',
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`${notoSansKR.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
