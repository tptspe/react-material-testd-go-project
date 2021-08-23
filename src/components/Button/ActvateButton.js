import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Link } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
        border: '1px solid #3ECCCD',
        borderRadius: '8px',
        boxShadow: '4px 5px 8px 2px rgba(15,132,169,0.15)',
    },
   
    content: {
        textAlign: 'center',
        padding: 0
    },
    colorGray: {
        color: '#9B9B9B !important'
    },
    buttonRed: {
        color: '#DD2525 !important',
        borderColor: '#DD2525 !important',
    },
    actionButtonRow: {
        display: 'flex',
        justifyContent: 'space-around'
    }

}));

const ActiveButton = withStyles((theme) => ({
    root: {
        color: '#25DD83',
        borderColor: '#25DD83',
        borderRadius: 10,
        textTransform: 'Capitalize',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: '18px',
        // backgroundColor: purple[500],
        '&:hover': {
            // backgroundColor: purple[700],
        },
    },
}))(Button);


export default function ActivateButton(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.item);

    console.log('props----11', props)
   
    const ActionButton = (data) => {
        if (data.row.activated) {
            return (
                <ActiveButton variant="outlined" color="" >
                   Activate
                </ActiveButton>
            );
        } else {
            return (
                <ActiveButton variant="outlined" className={classes.buttonRed}>
                    Deactivate
                </ActiveButton>
            );
        }
    }
    return (    
        <ActionButton row={value} /> 
    );
}