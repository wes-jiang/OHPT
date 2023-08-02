import React from 'react'
import { Button } from '@material-ui/core'
import {withStyles} from '@material-ui/core'

const StyledButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 0,
        background: "#FFFFF",
        color: "#fffff",
        transform: "none",
        boxShadow: "2px 2px 0 0 #c7d8ed",
        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor: "#4f25f7"
        },
    },
    label: {
        textTransform: 'capitalize',
    },
    
})(Button);
function SendBtn(props) {
    return (
        <StyledButton variant="contained" color="secondary">{props.txt}</StyledButton>
    )
}

export default SendBtn
