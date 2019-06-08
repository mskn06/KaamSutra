import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

import CategoryCard from "../components/CategoryCard";

const Works = () => {
    return (
        <div id="Works" style={{ marginTop: 32 }}>
            <Fab
                color="primary"
                aria-label="Add Category"
                style={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 999
                }}
            >
                <Icon>add</Icon>
            </Fab>
            <Typography
                variant="button"
                color="textSecondary"
                display="block"
                style={{ marginTop: 16, marginBottom: 16 }}
            >
                Categories
            </Typography>
            <Grid container spacing={3}>
                {[0, 1, 2, 3, 4].map(i => (
                    <Grid item xs={12} sm={6} md={4}>
                        <div
                            className="animated fadeInUp"
                            style={{ animationDelay: 60 * i + "ms" }}
                        >
                            <CategoryCard />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Works;
