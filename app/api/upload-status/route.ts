import path from 'path'
import { type NextRequest, NextResponse } from 'next/server'

function isValidUploadPath(inputPath: string) {
  const resolved = path.resolve('/uploads/', inputPath)
  return resolved.startsWith('/uploads/')
}

async function checkNotExists(path: string) {
  if (!isValidUploadPath(path)) return 400

  const { status } = await fetch(`https://playentry.org/uploads/${path}`, {
    method: 'HEAD',
    cache: 'no-cache',
  })

  if (status !== 404) {
    if (status !== 200) return status
    return 409
  }

  return 200
}

async function checkUploaded(path: string, length: string) {
  if (!isValidUploadPath(path)) return 400

  const { status, headers } = await fetch(
    `https://playentry.org/uploads/${path}`,
    { method: 'GET', cache: 'no-cache' },
  )

  if (status === 200) {
    if (length) {
      const actualLength = headers.get('content-length')
      if (actualLength === null) return 404
      if (actualLength !== length) return 409
    }
  } else {
    return status
  }

  return 200
}

export async function HEAD(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')
  if (path === null) {
    return new NextResponse(null, { status: 400 })
  }

  const length = req.nextUrl.searchParams.get('length')
  if (length === null) {
    return new NextResponse(null, { status: await checkNotExists(path) })
  } else {
    return new NextResponse(null, { status: await checkUploaded(path, length) })
  }
}
