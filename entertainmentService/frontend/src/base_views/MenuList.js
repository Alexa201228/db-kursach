import React, {Fragment} from "react";
import {Button, CssBaseline, Divider, Drawer, Hidden, List, Toolbar} from "@mui/material";
import {Link, withRouter} from "react-router-dom";
import {ListItem, MuiThemeProvider} from "material-ui";
import {makeStyles} from "@mui/styles";

const drawerWidth = 240;

const MENU_ITEMS = {
    "Films": "/film/detail/",
    "Series": "/series/detail/",
    "Games": "/game/detail/",
    "Services": "/service/detail/",
    "Subscriptions": "/subscription/detail/"
}

const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
   },
   drawer: {
     [theme.breakpoints.up('sm')]: {
       width: drawerWidth,
       flexShrink: 0,
     },
   },
   appBar: {
     marginTop: theme.spacing(8)
   },
   menuButton: {
     marginRight: theme.spacing(2),
     [theme.breakpoints.up('sm')]: {
       display: 'none',
     },
   },
   // necessary for content to be below app bar
   toolbar: {
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
   },
   drawerPaper: {
     width: drawerWidth,
     marginTop: theme.spacing(8),
   },
   content: {
     flexGrow: 1,
       marginTop: theme.spacing(12),
       marginLeft: theme.spacing(10)
   },
 }));

export function MenuList() {

        const classes = useStyles();
    const drawer = (
        <div>
            <Divider/>
            <List>
                {Object.keys(MENU_ITEMS).map((key, val) => (
                    <ListItem key={val}
                    style={{
                        padding: "0px"
                    }}><Button style={{
                        width: "100%",
                        height: "100%"
                    }} component={Link} to={`${MENU_ITEMS[key]}`}>{key}</Button></ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <MuiThemeProvider>
<div className={classes.root}>
        <CssBaseline />
       <nav className={classes.drawer} aria-label="mailbox folders">

         <Hidden xsDown implementation="css">
           <Drawer
             classes={{
               paper: classes.drawerPaper,
             }}
             variant="permanent"
             open
           >
             {drawer}
           </Drawer>
         </Hidden>
       </nav>
       <main className={classes.content}>
         <div className={classes.toolbar} />
          </main>
     </div>
        </MuiThemeProvider>
    )
}


export default withRouter(MenuList);