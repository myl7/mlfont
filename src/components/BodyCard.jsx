import React from 'react'
import {Card, CardContent, CardHeader, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    margin: '1em'
  }
})

export default props => {
  const {title, subheader, children} = props

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={subheader} />
      <CardContent component={'main'}>
        {children}
      </CardContent>
    </Card>
  )
}