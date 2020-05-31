import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// ui
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import MoreIcon from '@material-ui/icons/MoreVert'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'

import './index.css'

export default function Page(props) {
    console.log('props', props)
    const { title = '', menu = [], noSide = false } = props
    // const { asd } = this.state
    // console.log('page this.state', this.state)
    let [ open, setOpen ] = React.useState(window.innerWidth >= 800)
    let headerVisible = true
    if (window.location.search.includes('embed=true')) {
        open = false
        headerVisible = false
    }
    if (noSide) {
        open = false
    }
    const [ drawerType, setDrawerType ] = React.useState(window.innerWidth >= 800 ? 'inner' : 'mask')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    console.log('windowWidth', windowWidth)

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    // let setState = state => {
    //     setState(state)
    // }

    function hideDrawer() {
        console.log('隐藏内容')
        setOpen(false)
        // setState({
        //     open: false
        // })
    }

    useEffect(() => {
        // this.state = {
        //     'asd': 'asd2'
        // }
        console.log('useEffect')
        let onResize
        window.addEventListener('resize', onResize = () => {
            console.log('resize')
            setWindowWidth(window.innerWidth)
            setDrawerType(window.innerWidth > 800 ? 'inner' : 'mask')
        })
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    function Side() {
        return (
            <div className="ui-page-side-content">
                <div className="side-header">
                    {/* {windowWidth} */}
                    <img className="logo" src="https://edu.yunser.com/static/img/math.svg" />
                </div>
                <List className="list" component="nav">
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="首页" />
                    </ListItem>
                    {/* <ListItem button component={Link} to="/graph">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="图形" />
                    </ListItem> */}
                    <ListItem button component="a" href="https://project.yunser.com/products/8a9e24f00df511ea901ee7e49215c09c" target="_blank">
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="关于" />
                    </ListItem>
                </List>
            </div>
        )
    }

    function toggleDrawer() {
        setOpen(!open)
        // setState({
        //     open: !open
        // })
    }

    function MyMenuItem(item, index) {
        function click() {
            item.click && item.click()
            setAnchorEl(null)
        }
        return (
            <MenuItem onClick={click} key={index}>{item.label}</MenuItem>
        )
    }

    return (
        <div className="app">
            <div className="ui-page">
                {headerVisible &&
                    <header className="ui-page-header">
                        <AppBar position="static">
                            <Toolbar>
                                <div className="ui-toolbar">
                                    <div className="ui-toolbar-left">
                                        <IconButton className={props.menuButton} color="inherit" onClick={toggleDrawer}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="title" color="inherit">{ title }</Typography>
                                    </div>
                                    <div className="ui-toolbar-right">
                                        {/* <IconButton color="inherit" aria-label="menu">
                                            <MenuIcon />
                                        </IconButton> */}
                                        {/* <IconButton color="inherit" aria-label="menu">
                                            <MoreIcon onClick={handleClick} />
                                        </IconButton> */}
                                        {/* <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            {menu.map(MyMenuItem)}
                                        </Menu> */}
                                    </div>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </header>
                }
                <div className="ui-page-body">
                    <div className="ui-page-side" style={{left: (drawerType === 'inner' && open) ? 0 : -256}}>
                        <Side />
                    </div>
                    {drawerType === 'mask' &&
                        <Drawer
                            anchor="left"
                            open={open}
                            classes={{
                                width: 320,
                            }}
                            onClose={hideDrawer}
                            className="page-drawer2"
                            >
                            <Side />
                        </Drawer>
                    }

                    <div className="ui-page-content" style={{paddingLeft: (drawerType === 'inner' && open) ? 256 : 0}}>
                        {props.children}
                    </div>
                </div>
                {/* <div
                    anchor="left"
                    variant="permanent"
                    open={true}
                    className="page-drawer"
                    >
                    <List component="nav">
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="首页" />
                        </ListItem>
                        <ListItem button component={Link} to="/calculator">
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="计算器" />
                        </ListItem>
                        <ListItem button component={Link} to="/about">
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="关于" />
                        </ListItem>
                    </List>
                </div> */}

            </div>
        </div>
    )
}
