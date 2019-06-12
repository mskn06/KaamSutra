import React, { useState, createRef } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

import CategoryCard from "../components/CategoryCard";
import LoadingDialog from "../components/LoadingDialog";
import FormDialog from "../components/FormDialog";

const Works = () => {
    const [categories, setCategories] = useState([0, 1, 2, 3, 4]);
    const [categoryDialogOpen, setcategoryDialogOpen] = useState(false);

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
                setCategories([...categories, categories.slice(-1)[0] + 1]);
                setcategoryDialogOpen(false);
            }}
        />
    );

    const AddItemDialog = (
        <FormDialog
            open={categoryDialogOpen}
            fields={categoryDialogFields}
            handleClose={() => setcategoryDialogOpen(false)}
            title="Add Category"
            text="To create a new Category, please enter an unique category name. This will let you organise your work better."
            primaryAction={id => {
                setCategories([...categories, categories.slice(-1)[0] + 1]);
                setcategoryDialogOpen(false);
            }}
        />
    );

    return (
        <React.Fragment>
            {/* <LoadingDialog open={true} /> */}
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
                <Grid container spacing={3}>
                    {categories.map(i => (
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
        </React.Fragment>
    );
};

export default Works;
