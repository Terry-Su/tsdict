import React from 'react'
import ListItem from "@material-ui/core/ListItem"

const NewListItem = ( props: any ) => <ListItem button { ...props }>{props.children}</ListItem>
export default NewListItem