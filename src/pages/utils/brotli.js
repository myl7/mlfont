import React, {useRef} from 'react'
import Layout from '../../components/layout'
import {CardContent, CardHeader, Divider, Grid} from '@material-ui/core'
import TextOrFileBinInput from '../../components/textOrFileBinInput'
import {printBin} from '../../utils/binary'

const BrotliPage = () => {
  const encTextRef = useRef()
  const encFileRef = useRef()
  const decTextRef = useRef()
  const decFileRef = useRef()

  const enc = arr => decTextRef.current.value = arr === null ? '' : printBin(arr) // TODO
  const dec = arr => encTextRef.current.value = arr === null ? '' : printBin(arr) // TODO

  return (
    <Layout>
      <CardHeader title={'Brotli online encode/decode tool'} titleTypographyProps={{component: 'h1'}} subheader={
        'Decode locally with WASM by npm package brotli-dec-wasm, and encode remotely with Azure Functions App'
      } />
      <Divider />
      <CardContent>
        <Grid container spacing={2} justify={'center'}>
          <Grid item sm={6} xs={12}>
            <TextOrFileBinInput textHelp="Text to encode" fileHelp="File to encode" procHelp="Encode" procBin={enc}
                                textRef={encTextRef} fileRef={encFileRef} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextOrFileBinInput textHelp="Text to decode" fileHelp="File to decode" procHelp="Decode" procBin={dec}
                                textRef={decTextRef} fileRef={decFileRef} />
          </Grid>
        </Grid>
      </CardContent>
    </Layout>
  )
}

export default BrotliPage
