import Head from 'next/head'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { NewsletterSection } from '../../components/sections-extra'
import { resolveContent, resolveImage } from '../../components/content'
import { loadJSON } from '../../lib/loader'

export default function BlogPost({ content, post, slug, images }: any) {
  const navigation = content?.navigation
  const footer = content?.footer
  const newsletter = resolveContent(content, 'resourcesPage.newsletter')
  const siteName = content?.siteName || 'Nexa Paraguay'

  if (!post) return <div><Header navigation={navigation} /><main style={{padding:'3rem',textAlign:'center'}}><h1>Post no encontrado</h1></main><Footer footer={footer} /></div>

  return (
    <>
      <Head>
        <title>{post.title} — {siteName}</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
      </Head>
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1B2A4A' }}>
        <Header navigation={navigation} />
        <main>
          <article style={{ maxWidth: '750px', margin: '0 auto', padding: '3rem 1rem' }}>
            {post.date && <span style={{ fontSize:'0.85rem',color:'#C9A96E',fontWeight:600 }}>{post.date}</span>}
            <h1 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:700,lineHeight:1.2,margin:'0.75rem 0 0.5rem' }}>{post.title}</h1>
            {post.author && <p style={{ color:'#999',fontSize:'0.9rem',marginBottom:'1.5rem' }}>Por {post.author}</p>}
            {post.excerpt && <p style={{ color:'#555',fontSize:'1.05rem',lineHeight:1.7,marginBottom:'2rem',fontStyle:'italic' }}>{post.excerpt}</p>}
            <div style={{ color:'#444',lineHeight:1.8,fontSize:'0.95rem' }}>
              {post.body ? post.body.split('\n').map((p: string, i: number) => <p key={i} style={{marginBottom:'1rem'}}>{p}</p>) : <p>Contenido completo próximamente.</p>}
            </div>
            {post.tags && <div style={{ marginTop:'2rem',display:'flex',gap:'0.5rem',flexWrap:'wrap' }}>
              {post.tags.map((t: string, i: number) => <span key={i} style={{ padding:'0.25rem 0.75rem',background:'#F5F5F0',borderRadius:'50px',fontSize:'0.8rem',color:'#666' }}>{t}</span>)}
            </div>}
            <div style={{ marginTop:'2rem',textAlign:'center' }}>
              <a href="/blog" style={{ color:'#C9A96E',fontWeight:700,textDecoration:'none' }}>← Volver al blog</a>
            </div>
          </article>
          {newsletter?.title && <NewsletterSection pageContent={newsletter} />}
        </main>
        <Footer footer={footer} />
      </div>
    </>
  )
}

export function getServerSideProps({ params }: any) {
  const slug = params?.slug || ''
  const content = loadJSON(process.cwd() + '/content', 'es.json') || {}
  const posts = content?.blog?.posts || []
  const post = posts.find((p: any) => p.slug === slug)
  const manifest = loadJSON(process.cwd(), 'images.json')
  const images = manifest?.images || {}
  if (!post) return { notFound: true }
  return { props: { content, post, slug, images } }
}
