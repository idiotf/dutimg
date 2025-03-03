'use server'

import path from 'path'
import Tar from 'tar-js'
import projectJSON from '@/app/project.json'

export default async function uploadFiles(formData: FormData) {
  const tar = new Tar
  await Promise.all(formData.getAll('files').map(async (file, i) => {
    if (typeof file == 'string') return
    const filename = formData.get(`filename-${i}`)
    if (typeof filename != 'string' || filename == 'project.json') return
    tar.append(path.join('temp', filename), new Uint8Array(await file.arrayBuffer()))
  }))

  const body = new FormData
  body.set('projects', new Blob([ tar.append('temp/project.json', JSON.stringify(projectJSON)) ], { type: 'application/x-entryapp' }))
  await fetch('https://playentry.org/rest/project/upload', {
    method: 'POST',
    body,
  })
}
