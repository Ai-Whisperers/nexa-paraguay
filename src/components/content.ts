import React from 'react'

export function resolveContent(content: any, key: string): any {
  if (!content || !key) return null
  let sc = content[key]
  if (!sc && key.includes('.')) sc = key.split('.').reduce((o: any, k: string) => o?.[k], content)
  return sc
}
