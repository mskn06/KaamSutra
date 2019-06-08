import React from "react";
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

function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [works, setWorks] = React.useState(
        [1, 2, 3].map(i => {
            return {
                work: "This is sample work " + i,
                updatedAt: new Date()
            };
        })
    );

    React.useEffect(() => {
        setWorks([
            ...works,
            {
                work:
                    "This is an extra descriptive work. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vestibulum enim a ante eleifend, lobortis ultrices orci aliquet.",
                updatedAt: new Date()
            }
        ]);
    }, []);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                action={
                    <IconButton aria-label="Settings">
                        <Icon>more_vert</Icon>
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                titleTypographyProps={{ variant: "h6" }}
                subheader="September 14, 2016"
                className={classes.cardHeader}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="secondary">
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
                    <List>
                        {works.map((item, i) => {
                            let Item = (
                                <React.Fragment>
                                    <Divider variant="inset" component="li" />
                                    <WorkItem
                                        value={item.work}
                                        date={item.updatedAt}
                                    />
                                </React.Fragment>
                            );

                            if (i === 0)
                                Item = (
                                    <WorkItem
                                        value={item.work}
                                        date={item.updatedAt}
                                    />
                                );

                            return Item;
                        })}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RecipeReviewCard;
