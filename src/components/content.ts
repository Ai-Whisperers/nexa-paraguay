import React from 'react'

export function resolveContent(content: any, key: string): any {
  if (!content || !key) return null
  let sc = content[key]
  if (!sc && key.includes('.')) sc = key.split('.').reduce((o: any, k: string) => o?.[k], content)
  return sc
}

export function resolveImage(images: any, ref: string): string {
  if (!ref || !images) return ''
  if (ref.startsWith('@img:') || ref.startsWith('@src:')) {
    const key = ref.startsWith('@img:') ? ref.replace('@img:', '') : ref.replace('@src:', '')
    const parts = key.split('.')
    let obj = images
    for (const p of parts) {
      if (obj?.[p]) obj = obj[p]
      else return ''
    }
    return obj?.src || obj?.fallbackSrc || ''
  }
  return ref
}
