import {useState} from 'react'
import {
  AppBar, Avatar, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography
} from '@material-ui/core'
import {Home as HomeIcon, Menu as MenuIcon} from '@material-ui/icons'
import nav from '../../config/nav'
import NavListButton from './navListButton'
import ThemeToggle from './themeSwitch'
import Search from './search'
import Follow from './follow'
import site from '../../config/site'
import IntLink from '../links/intLink'
import {useRouter} from 'next/router'

const MobileHeader = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(open => !open)

  const router = useRouter()

  const handleGo = (href: string) => () => router.push(href)

  return (
    <AppBar position="fixed" color="default" component="header">
      <Toolbar style={{paddingLeft: '1em'}} component="nav">
        <IconButton onClick={handleClick} style={{marginLeft: '-0.5em'}}>
          <MenuIcon color="primary" />
        </IconButton>
        <IntLink href="/">
          <Typography variant="h6">
            mylmoe
          </Typography>
        </IntLink>
        <div style={{flexGrow: 1}} />
        <ThemeToggle />
        <Typography variant="subtitle1">
          Dark
        </Typography>
        <Follow style={{marginLeft: '0.5em'}} />
        <IntLink href="/pages/about">
          <Avatar alt={`Avatar of ${site.name}`} src={site.avatar} />
        </IntLink>
      </Toolbar>
      <Collapse in={open}>
        <List>
          <ListItem button onClick={handleGo('/')}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
          <ListItem>
            <Search />
          </ListItem>
          {nav.map(({list, name}) => (
            <NavListButton name={name} list={list} key={name} />
          ))}
        </List>
      </Collapse>
    </AppBar>
  )
}

export default MobileHeader
