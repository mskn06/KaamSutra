import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import logo from "./yarn-ball.svg";

const theme = createMuiTheme({
    palette: {
        primary: { main: cyan["A700"], contrastText: "#fff" }, // Purple and green play nicely together.
        secondary: { main: teal["A700"] } // This is just green.A700 as hex.
    }
});

function App() {
    let typeVariants = ["h2", "h5"];

    const [categoryAvailable, setCategoryAvailable] = useState(2); // 2: Unchecked, 1: Available, 0: Unavailable

    const checkAvailibility = () => {
        const possibleValues = [0, 1];
        const rand =
            possibleValues[Math.floor(Math.random() * possibleValues.length)];
        setCategoryAvailable(rand);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" id="App">
                <img src={logo} id="logo" alt="" />
                <Typography
                    variant={typeVariants[0]}
                    gutterBottom
                    align="center"
                >
                    KaamSutra
                </Typography>
                <Typography
                    variant={typeVariants[1]}
                    color="textSecondary"
                    align="center"
                    gutterBottom
                >
                    Where all your work is tied in a thread of hope and
                    diligence.
                </Typography>
                <TextField
                    id="category-name"
                    error={categoryAvailable === 0}
                    label={
                        categoryAvailable === 2
                            ? "Add New Category"
                            : categoryAvailable === 1
                            ? "This Name is Available!"
                            : "This Name is Unavailable"
                    }
                    margin="normal"
                    align="center"
                    className="category-name"
                />
                <div className="actions">
                    <Button
                        color="secondary"
                        variant="outlined"
                        style={{ marginRight: 8 }}
                        onClick={checkAvailibility}
                    >
                        Check Name
                        <Icon style={{ marginLeft: 8 }}>check_circle</Icon>
                    </Button>
                    <Button color="primary" variant="contained">
                        Add Category
                        <Icon style={{ marginLeft: 8 }}>send</Icon>
                    </Button>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default App;
