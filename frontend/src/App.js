import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";

import ResponsiveDrawerLayout from "./layout/ResponsiveDrawer";
import WorksPage from "./pages/Works";
import DashboardPage from "./pages/Dashboard";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: { main: cyan[500] },
        secondary: { main: teal["A400"] } // This is just green.A700 as hex.
    }
});

const App = () => {
    const navItems = [
        {
            text: "Dashboard",
            icon: "dashboard",
            desc:
                "Dashboard contains all the parameters you develope during your work. This is a great place to overview your progress.",
            pageComponent: <DashboardPage />
        },
        {
            text: "Works",
            icon: "assignment",
            desc:
                "Works section contains details about all the work you have added. This is the perfect place to be organised.",
            pageComponent: <WorksPage />
        }
    ];

    const [selectedItemId, setSelectedItemId] = useState(1);

    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

    const navItemListener = index => () => {
        setSelectedItemId(index);
        toggleMobileDrawer(false);
    };

    const toggleMobileDrawer = state =>
        state
            ? setMobileDrawerOpen(!mobileDrawerOpen)
            : setMobileDrawerOpen(state);

    const DrawerMenu = (
        <List>
            {navItems.map((item, index) => (
                <ListItem
                    button
                    key={item.text + index}
                    onClick={navItemListener(index)}
                    selected={index === selectedItemId}
                >
                    <ListItemIcon>
                        <Icon>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ResponsiveDrawerLayout
                title={navItems[selectedItemId].text}
                desc={navItems[selectedItemId].desc}
                drawerMenu={DrawerMenu}
                drawerToggler={toggleMobileDrawer}
                drawerState={mobileDrawerOpen}
            >
                {navItems[selectedItemId].pageComponent}
            </ResponsiveDrawerLayout>
        </ThemeProvider>
    );
};

export default App;
