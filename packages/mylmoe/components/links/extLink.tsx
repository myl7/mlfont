import {forwardRef} from 'react'
import {Link, LinkProps} from '@material-ui/core'
import ExtLinkSign from './extLinkSign'

const ExtLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {children, ...others} = props

  return (
    <Link target="_blank" rel="noopener" ref={ref} {...others}>
      {children}
      <span className="ext-link">
        <ExtLinkSign />
      </span>
    </Link>
  )
})

export default ExtLink
