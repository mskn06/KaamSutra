import React, { useState, createRef, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

import CategoryCard from "../components/CategoryCard";
import LoadingDialog from "../components/LoadingDialog";
import FormDialog from "../components/FormDialog";

const Works = () => {
    const [categories, setCategories] = useState(null);
    const [categoryDialogOpen, setcategoryDialogOpen] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const categoryRef = createRef();

    const categoryDialogFields = [
        <TextField
            autoFocus
            margin="dense"
            id="category"
            name="category"
            label="Category Name"
            type="text"
            inputRef={categoryRef}
            fullWidth
        />
    ];

    const CategoryDialog = (
        <FormDialog
            open={categoryDialogOpen}
            fields={categoryDialogFields}
            handleClose={() => setcategoryDialogOpen(false)}
            title="Add Category"
            text="To create a new Category, please enter an unique category name. This will let you organise your work better."
            primaryAction={() => {
                setShowLoader(true);

                const category = categoryRef.current.value;

                if (category == null || category === "") return;

                fetch("/api/category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title: category })
                })
                    .then(data => data.json())
                    .then(jsonData => {
                        setCategories([...categories, jsonData.category]);
                        setcategoryDialogOpen(false);
                        setShowLoader(false);
                    })
                    .catch(err => console.log(err));
            }}
        />
    );

    useEffect(() => {
        setShowLoader(true);
        fetch("/api/category", {
            method: "GET"
        })
            .then(data => data.json())
            .then(jsonData => {
                setCategories(jsonData.category);
                setShowLoader(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <React.Fragment>
            <LoadingDialog open={showLoader} />
            {CategoryDialog}
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
                    onClick={() => setcategoryDialogOpen(true)}
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
                {categories && categories.length === 0 && (
                    <Typography paragraph color="primary">
                        There are no works yet.
                    </Typography>
                )}
                <Grid container spacing={3}>
                    {categories &&
                        categories.map((category, i) => (
                            <Grid item xs={12} sm={6} md={4}>
                                <div
                                    className="animated fadeInUp"
                                    style={{ animationDelay: 60 * i + "ms" }}
                                >
                                    <CategoryCard category={category} />
                                </div>
                            </Grid>
                        ))}
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default Works;
