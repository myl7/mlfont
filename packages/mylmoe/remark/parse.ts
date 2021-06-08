import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkFootnotes from 'remark-footnotes'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMath from 'remark-math'
import remark2rehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
// @ts-ignore
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import yaml from 'js-yaml'
import {PostInfo, PostFM, PostMeta} from './post'
import dayjs from 'dayjs'

const parse = (name: string, content: string, pathPrefix: string = '/posts/'): PostInfo => {
  let fmVal = ''
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => node => {
      // @ts-ignore
      fmVal = node.children[0].value
      return node
    })
    .use(remarkFootnotes, {inlineNotes: true})
    .use(remarkToc)
    .use(remarkMath)
    .use(remark2rehype)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeHighlight, {plainText: ['log']})
    .use(rehypeStringify)
    .processSync(content).toString()
  const fm = yaml.load(fmVal) as PostFM
  const meta: PostMeta = {
    slug: name,
    title: fm.title,
    pubDate: dayjs(fm.pubDate).format('YYYY-MM-DD'),
    updDate: dayjs(fm.updDate ? fm.updDate : fm.pubDate).format('YYYY-MM-DD'),
    excerpt: fm.excerpt ? fm.excerpt : '',
    tags: fm.tags ? fm.tags : '',
    wip: Boolean(fm.wip),
    path: pathPrefix + name + '/'
  }
  return {
    meta,
    html
  }
}

export default parse
