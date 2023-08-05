import React from 'react'
import SendBtn from './SendBtn'
import logo from '/Users/lynajiang/Documents/GitHub/OHPT/my-app/src/components/logo192.png'
// import logoMobile from '../logoMobiile.svg'
import {AppBar, Toolbar, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import App from '../App'
// import {Nav, NavBar, NavDropdown} from 'react-bootstrap'

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: {
            flexDirection: "column"
        }
    },
    logo: {
        width: "15%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    logoMobile:{
        width: "100%", 
        display: "none", 
        ['@media (max-width:780px)']: { 
            display: "inline-block"
            }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        justifyContent: "flex-end",
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})
function NavBar() {
    const classes = styles()
    return (
        <Toolbar color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
        <img src={logo} className={classes.logo}/> 
        {/* <img src={logoMobile} className={classes.logoMobile}/>  */}
        <Grid xs="4"></Grid>
        <Typography variant="h6" sx={{marginRight:"auto"}} className={classes.menuItem}>
            About
        </Typography>
        <Typography variant="h6" className={classes.menuItem }>
            FAQ
        </Typography>
        <Typography variant="h6" className={classes.menuItem}>
            Team
        </Typography>
        <Typography variant="h6" className={classes.menuItem}>
            Contact Us 
        </Typography>
        <SendBtn sx={{marginLeft:'auto'}} txt="Chat"/>
        </Toolbar>
        


    )
}

export default NavBar
