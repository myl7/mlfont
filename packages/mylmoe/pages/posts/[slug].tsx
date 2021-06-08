import {GetStaticPaths, GetStaticProps} from 'next'
import path from 'path'
import fs from 'fs'
import {PostInfo} from '../../remark/post'
import {CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import Head from '../../components/head'
import PostDate from '../../components/post/postDate'
import IntLinkReset from '../../components/links/intLinkReset'
import Comment from '../../components/comment'
import getPosts from '../../utils/getPosts'

const Post = (props: {post: PostInfo}) => {
  const {meta, html} = props.post
  const {title, pubDate, updDate, excerpt, tags, path} = meta

  const fixStyles = (elem: HTMLDivElement) => elem

  return (
    <>
      <Head title={title} description={excerpt} path={path} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={
        <div>
          <PostDate updDate={updDate} pubDate={pubDate}>
            {excerpt}
          </PostDate>
          {tags.split(' ').map(tag => (
            <Chip label={
              <IntLinkReset href={`/tags/${tag}/`}>
                {tag}
              </IntLinkReset>
            } key={tag} clickable style={{marginRight: '0.5em'}} />
          ))}
        </div>
      } />
      <Divider />
      <CardContent>
        <div ref={fixStyles} dangerouslySetInnerHTML={{__html: html}} style={{marginBottom: '1em'}} />
        <Comment />
      </CardContent>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postDir = path.join(process.cwd(), 'config', 'posts')
  const names = await fs.promises.readdir(postDir)
  const paths = names.map(name => ({params: {slug: name}}))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params!['slug'] as string
  const post = getPosts().filter(post => post.meta.slug == slug)[0]!
  return {
    props: {
      post
    }
  }
}

export default Post