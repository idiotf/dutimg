import Tar from 'tar-js'

const uploadStatusError: { [k: number]: string; default: string } = {
  409: '이미 존재하는 업로드 이름입니다.',
  413: '용량이 너무 큽니다. 50MiB 미만으로 줄여주세요.',
  429: '업로드 횟수가 너무 많습니다.',
  default: '업로드를 실패했습니다.',
}

async function checkUploadStatus(name: string, size?: number) {
  const query = new URLSearchParams()
  query.set('path', name)
  if (size !== undefined) query.set('length', String(size))

  const { status } = await fetch('/api/upload-status?' + query, {
    method: 'HEAD',
  })
  if (status != 200) {
    throw uploadStatusError[status] || uploadStatusError.default
  }
}

function encodeFilepath(filepath: string) {
  const encoder = new TextEncoder()
  return String.fromCharCode(...encoder.encode(filepath))
}

export async function uploadFile(file: File) {
  if (file.size >= 50 * 1024 * 1024) throw uploadStatusError[413]
  await checkUploadStatus(file.name)

  const tar = new Tar()
  tar.append(
    encodeFilepath('temp/' + file.name),
    new Uint8Array(await file.arrayBuffer())
  )

  const tarData = tar.append('temp/project.json', '0')
  const projectBlob = new Blob([tarData as Uint8Array<ArrayBuffer>])

  const body = new FormData()
  body.set('projects', projectBlob)

  await fetch('https://entry-cdn.pstatic.net/rest/project/upload', {
    method: 'POST',
    body,
    mode: 'no-cors',
  })

  await checkUploadStatus(file.name, file.size)
  return 'https://playentry.org/%2Fuploads/' + encodeURIComponent(file.name)
}
