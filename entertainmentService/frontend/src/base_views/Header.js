import React, {Fragment} from "react";

import {logout} from "../actions/auth";
import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import {
	CssBaseline,
	Typography,
	Button,
	Box, AppBar
} from "@mui/material";
import {Link, NavLink} from "react-router-dom";
import {MuiThemeProvider, Toolbar} from "material-ui";
import {makeStyles} from "@mui/styles";
import {Container} from "reactstrap";

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	  },
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 0, 1, 0),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	headerContainer: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	buttonContainer: {
		width: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent:'flex-end'
	},
	toolbar: theme.mixins.toolbar,
 }));


export function Header(props){

    const {isAuthenticated} = useSelector(state => state.auth);

    const classes = useStyles();

    const authenticated = (
        <Fragment>
            <Box>
			<Button
				href=""
				color="primary"
				variant="outlined"
				component={Link}
				className={classes.link}
				to={`/`}
				onClick={props.logout}
				>
				Logout
			</Button>
            </Box>
        </Fragment>
    )
    const anonymus = (
        <Fragment>
				<Box>
			<Button
				href=""
				color="primary"
				variant="outlined"
				component={Link}
				className={classes.link}
				to={`/register`}
				>
				Register
			</Button>
            </Box>
				<Box>
			<Button
				href=""
				color="primary"
				variant="outlined"
				component={Link}
				className={classes.link}
				to={`/login`}
				>
				Login
			</Button>
            </Box>
        </Fragment>
    )

    return(
        <Fragment>
			<MuiThemeProvider>
			<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					elevation={0}
					className={classes.appBar}
				>
				<Toolbar className={classes.toolbar}>
					<Container className={classes.headerContainer}>
						<Container>
								<Typography
								variant="h6"
								color="inherit"
								noWrap
								>
								<Link
									element={<NavLink/>}
									to="/"
									underline="none"
									color="textPrimary"
								>
								MainPage
								</Link>
								</Typography>
							</Container>

					</Container>
					<Container className={classes.buttonContainer}>
							{isAuthenticated ? authenticated : anonymus }
					</Container>
				</Toolbar>
				</AppBar>
			</MuiThemeProvider>
		</Fragment>
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, {logout})(Header);
