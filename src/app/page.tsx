import { readFileSync, existsSync } from 'fs'
import path from 'path'

interface PageConfig {
  id: string
  title: string
  sections: string[]
  [key: string]: any
}

interface ContentData {
  [key: string]: any
}

function getContent(): ContentData {
  const contentPath = path.join(process.cwd(), 'content', 'es.json')
  if (existsSync(contentPath)) {
    return JSON.parse(readFileSync(contentPath, 'utf-8'))
  }
  return {}
}

function getPages() {
  const pagesDir = path.join(process.cwd(), 'pages')
  try {
    const pageFiles = require('fs').readdirSync(pagesDir)
    const pages: Record<string, PageConfig> = {}
    for (const file of pageFiles) {
      if (file.endsWith('.json')) {
        const data = JSON.parse(readFileSync(path.join(pagesDir, file), 'utf-8'))
        pages[file.replace('.json', '')] = data
      }
    }
    return pages
  } catch {
    return { home: { id: 'home', title: 'Home', sections: ['hero'] } }
  }
}

export default function HomePage() {
  const content = getContent()
  const pages = getPages()
  const homePage = pages['home'] || pages['index'] || { id: 'home', title: 'Home' }
  
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-12">
        {homePage.title || content?.title || 'Welcome'}
      </h1>
      
      {homePage.sections?.map((section: string) => {
        const sectionContent = content?.[section]
        if (!sectionContent) return null
        
        if (typeof sectionContent === 'string') {
          return <p key={section} className="text-lg px-4 py-2">{sectionContent}</p>
        }
        
        if (Array.isArray(sectionContent)) {
          return (
            <section key={section} className="px-4 py-8 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionContent.map((item: any, i: number) => (
                  <div key={i} className="p-6 rounded-lg" style={{backgroundColor: 'var(--color-surface, #f8f9fa)'}}>
                    {item.title && <h3 className="text-xl font-semibold mb-2">{item.title}</h3>}
                    {item.description && <p>{item.description}</p>}
                    {item.price && <p className="text-lg font-bold mt-2">{item.price}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        }
        
        return null
      })}
    </main>
  )
}
