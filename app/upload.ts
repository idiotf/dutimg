'use server'

import path from 'path'
import Tar from 'tar-js'
import projectJSON from '@/app/project.json'
import { redirect } from 'next/navigation'

export default async function uploadFile(formData: FormData) {
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
}
