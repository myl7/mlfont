import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import marked from 'marked'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import vim from 'highlight.js/lib/languages/vim'
import json from 'highlight.js/lib/languages/json'
import posts from '../posts.json'
import md2html from '../utils/md2html'

export default () => {
  const {slug} = useParams()

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(posts.find((p, _i) => p.slug === slug).url).then((resp) => {
      resp.text().then((content) => {
        content = content.substring(content.indexOf('---') + 4)
        setBody(md2html(marked)(content))

        hljs.registerLanguage('bash', bash)
        hljs.registerLanguage('python', python)
        hljs.registerLanguage('vim', vim)
        hljs.registerLanguage('json', json)

        document.querySelectorAll('div#root pre > code').forEach(elem => {
          hljs.highlightBlock(elem)
        })
      })
    })
  }, [setBody])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
