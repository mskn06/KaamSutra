import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import logo from "../yarn-ball.svg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: {
        ...theme.mixins.toolbar,
        display: "flex",
        alignItems: "center"
    },
    brand: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%"
    },
    logo: {
        height: "1.5rem",
        marginLeft: "16px",
        marginRight: "16px"
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function ResponsiveDrawer(props) {
    const { container, title, desc, children, drawerMenu } = props;
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <Typography variant="h6" className={classes.brand}>
                    <img src={logo} alt="" className={classes.logo} />
                    KaamSutra
                </Typography>
            </div>
            <Divider />
            {drawerMenu}
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={props.drawerToggler}
                        className={classes.menuButton}
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="Mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={props.drawerState}
                        onClose={props.drawerToggler}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
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
                <Typography paragraph>{desc}</Typography>
                {children}
            </main>
        </div>
    );
}

export default ResponsiveDrawer;
