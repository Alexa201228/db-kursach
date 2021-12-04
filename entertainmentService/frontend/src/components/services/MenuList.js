import React, {Fragment} from "react";
import {AppBar, Box, CssBaseline, Divider, Drawer, Hidden, IconButton, List, Toolbar, Typography} from "@mui/material";
import {Link, withRouter} from "react-router-dom";
import {ListItem, MuiThemeProvider} from "material-ui";
import {Header} from "../../base_views/Header";
import {makeStyles} from "@mui/styles";

const drawerWidth = 240;

const MENU_ITEMS = {
    "Films": "/film/detail/",
    "Series": "/series/detail/",
    "Games": "/game/detail/",
    "Services": "/service/detail/",
    "Subscriptions": "/subscription/detail/",
    "Companies": "/company/detail/"
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
     [theme.breakpoints.up('sm')]: {
       width: `calc(100% - ${drawerWidth}px)`,
       marginLeft: drawerWidth,
     },
     [theme.breakpoints.down('xs')]:{
      marginTop: theme.spacing(17)
     },
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
     [theme.breakpoints.down('xs')]:{
      marginTop: theme.spacing(17)
     },
   },
   content: {
     flexGrow: 1,
       marginTop: theme.spacing(12),
     [theme.breakpoints.down('xs')]:{
      padding: 0,
     },
   },
 }));

export function MenuList(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
        const classes = useStyles();
    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {Object.keys(MENU_ITEMS).map((key, val) => (
                    <ListItem key={val}><Link to={`${MENU_ITEMS[key]}`}>{key}</Link></ListItem>
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