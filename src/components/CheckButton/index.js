import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import brandStyles from 'theme/brand';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 0,

    '& .MuiFormControlLabel-root': {
      color: theme.palette.brandDark,
    },
    '& .MuiTypography-body1': {
      color: theme.palette.brandDark,
    }
  },
  icon: {
    width: 25,
    height: 25,
    border: "solid #0F84A9 1px",
    boxShadow: "4px 4px 8px 2px rgba(15,132,169,0.3)",
    backgroundColor: "#fff",
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#fff",

    "&:before": {
      display: "block",
      height: 25,
      width: 25,
      backgroundColor: "#0F84A9",
      // backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "&:after": {
      content: '""',
      position: "absolute",
      display: "block",
      left: 18,
      top: 15,
      width: 5,
      height: 10,
      border: "solid white",
      borderWidth: "0 3px 3px 0",
      transform: "rotate(45deg)"
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
}));

// Inspired by blueprintjs
function StyledCheckBox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      //   className={classes.root}
      disableRipple
      color="default"
      name={props.name}
      onChange={props.onChange}
      checked={props.checked}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CheckButton(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      value={props.value}
      disabled={props.disabled === true ? true : false}
      control={<StyledCheckBox required={props.required} name={props.name} checked={props.checked} onChange={props.onChange} />}
      label={props.label}
      className={clsx(classes.root, props.className)}
    />

  );
}
