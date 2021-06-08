import {useRef, useState} from 'react'
import {CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core'
import BinInput from '../../components/binInput'
import {printBin} from '../../utils/bin'
import Head from '../../components/head'

const Brotli = () => {
  const encTextRef = useRef<HTMLInputElement>(null)
  const encFileRef = useRef<HTMLInputElement>(null)
  const decTextRef = useRef<HTMLInputElement>(null)
  const decFileRef = useRef<HTMLInputElement>(null)

  const [encStatus, setEncStatus] = useState<'none'|'waiting'|'failed'|'ok'>('none')

  const enc = (arr: Uint8Array|null) => {
    if (arr == null) {
      decTextRef.current!.value = ''
    } else {
      setEncStatus('waiting')
      setTimeout(() => {
        decTextRef.current!.value = printBin(arr)
        setEncStatus('ok')
      }, 2000)
    }
  }
  const dec = (arr: Uint8Array|null) => {
    if (arr == null) {
      encTextRef.current!.value = ''
    } else {
      const res = arr
      encTextRef.current!.value = printBin(res)
    }
  }

  const title = 'Brotli online encode/decode tool'
  const description = 'Decode locally with WASM via npm package brotli-dec-wasm, ' +
    'and encode remotely with Azure Functions App.'

  return (
    <>
      <Head title={title} description={description} path={'/utils/brotli/'} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={description} />
      <Divider />
      <CardContent>
        <Typography variant="body1">
          Input and output support hex string and Python-style string
          e.g. <code>a\xff</code> or <code>b'a\xff'</code>.
          Currently the tool is broken.
          Fixing has been started and will finish soon.
        </Typography>
        <Grid container spacing={2} justify={'center'} style={{marginTop: '0.5em'}}>
          <Grid item sm={6} xs={12}>
            <BinInput textHelp="Bytes to encode" fileHelp="File to encode" procHelp="Encode" procBin={enc}
                      textRef={encTextRef} fileRef={encFileRef} status={encStatus} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <BinInput textHelp="Bytes to decode" fileHelp="File to decode" procHelp="Decode" procBin={dec}
                      textRef={decTextRef} fileRef={decFileRef} />
          </Grid>
        </Grid>
      </CardContent>
    </>
  )
}

export default Brotli
