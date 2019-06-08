import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const WorkItem = props => {
    return (
        <ListItem alignItems="flex-start" className="WorkItem">
            <ListItemAvatar>
                <Icon color="primary">done_all</Icon>
            </ListItemAvatar>
            <ListItemText
                primary={props.value}
                secondary={new Date(props.date).toDateString()}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <Icon>delete</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default WorkItem;
