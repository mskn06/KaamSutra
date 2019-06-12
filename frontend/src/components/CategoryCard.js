import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import FormDialog from "../components/FormDialog";
import LoadingDialog from "../components/LoadingDialog";
import WorkItem from "./WorkItem";

const useStyles = makeStyles(theme => ({
    card: {
        // maxWidth: 345
    },
    cardHeader: {
        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${
            theme.palette.secondary.dark
        })`
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    }
}));

function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [works, setWorks] = React.useState(null);
    const [workDialogOpen, setWorkDialogOpen] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const workRef = createRef();
    const workDescRef = createRef();

    const workDialogFields = [
        <TextField
            autoFocus
            margin="dense"
            id="work"
            name="work"
            label="Work Name"
            type="text"
            inputRef={workRef}
            fullWidth
        />,
        <TextField
            margin="dense"
            id="work_desc"
            name="work_desc"
            label="Work Description"
            type="text"
            inputRef={workDescRef}
            fullWidth
        />
    ];

    const workDialog = (
        <FormDialog
            open={workDialogOpen}
            fields={workDialogFields}
            handleClose={() => setWorkDialogOpen(false)}
            title="Add Work"
            text="To create a new Work, please enter an unique Work name. This will let you organise your Work better."
            primaryAction={() => {
                setShowLoader(true);

                const work = workRef.current.value;
                const workDesc = workDescRef.current.value;

                if (work == null || work === "") return;
                if (workDesc == null || workDesc === "") return;

                fetch(`/api/work/${props.category._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: work,
                        description: workDesc
                    })
                })
                    .then(data => data.json())
                    .then(jsonData => {
                        setWorks([jsonData.work, ...works]);
                        setWorkDialogOpen(false);
                        setShowLoader(false);
                    })
                    .catch(err => console.log(err));
            }}
        />
    );

    useEffect(() => {
        fetch(`/api/work/${props.category._id}`, {
            method: "GET"
        })
            .then(data => data.json())
            .then(jsonData => {
                setWorks(jsonData.works);
            })
            .catch(err => console.log(err));
    }, [props.category._id]);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
        <React.Fragment>
            <LoadingDialog open={showLoader} />
            {workDialog}
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton aria-label="Settings">
                            <Icon>more_vert</Icon>
                        </IconButton>
                    }
                    title={props.category.title}
                    titleTypographyProps={{ variant: "h6" }}
                    subheader={new Date(
                        props.category.createdAt
                    ).toLocaleString()}
                    className={classes.cardHeader}
                />
                {/* <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {""}
                    </Typography>
                </CardContent> */}
                <CardActions disableSpacing>
                    <Button
                        color="secondary"
                        onClick={() => setWorkDialogOpen(true)}
                        disabled={!works}
                    >
                        <Icon style={{ marginRight: 8 }}>add</Icon>
                        ADD WORK
                    </Button>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <Icon>expand_more</Icon>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="button" color="textSecondary">
                            Completed Tasks
                        </Typography>
                        {!works && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    marginTop: 16
                                }}
                            >
                                <CircularProgress
                                    style={{ marginRight: 16 }}
                                    size={30}
                                />
                                Please wait...
                            </div>
                        )}
                        {works && (
                            <List>
                                {works.map((item, i) => {
                                    let Item = (
                                        <React.Fragment>
                                            <Divider
                                                variant="inset"
                                                component="li"
                                            />
                                            <div
                                                className="animated fadeInRight faster"
                                                style={{
                                                    animationDelay:
                                                        90 * i + "ms"
                                                }}
                                            >
                                                <WorkItem
                                                    value={item.title}
                                                    date={item.createdAt}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            </div>
                                        </React.Fragment>
                                    );

                                    if (i === 0)
                                        Item = (
                                            <div
                                                className="animated fadeInRight faster"
                                                style={{
                                                    animationDelay:
                                                        90 * i + "ms"
                                                }}
                                            >
                                                <WorkItem
                                                    value={item.title}
                                                    date={item.createdAt}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            </div>
                                        );

                                    return Item;
                                })}
                            </List>
                        )}
                        {works && works.length === 0 && (
                            <Typography variant="body2" color="primary">
                                Sorry, no work yet.
                            </Typography>
                        )}
                    </CardContent>
                </Collapse>
            </Card>
        </React.Fragment>
    );
}

export default RecipeReviewCard;
