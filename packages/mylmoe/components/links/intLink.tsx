import {Link, LinkProps} from '@material-ui/core'
import {default as NextLink, LinkProps as NextLinkProps} from 'next/link'
import React, {forwardRef} from 'react'

const RefLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <Link ref={ref} {...props} />
})

const IntLink: React.FC<NextLinkProps&{linkProps?: LinkProps}> = props => {
  const {children, linkProps, passHref, ...others} = props

  return (
    <NextLink {...others} passHref>
      <RefLink {...linkProps}>
        {children}
      </RefLink>
    </NextLink>
  )
}

export default IntLink
