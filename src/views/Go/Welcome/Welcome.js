import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { Typography, Checkbox, Button } from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import BlueBox from "components/BlueBox";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useTranslation, Trans } from 'react-i18next';
// import NumberFormat from 'react-number-format';
// import tabletBg from '../assets/splash_tablet.svg';
// import mobileBg from '../assets//splash_testd.svg';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Montserrat',
    margin: 0
  },
  content: {
    position: 'fixed',
    top: 65,
    width: '100%',
    height: 'calc(100% - 97px)',
    backgroundSize: 'cover',
    overflowY: 'scroll',
    overflowX: 'hidden',
    [theme.breakpoints.up(415)]: {
      top: 80,
      height: 'calc(100% - 128px)',
    }
  },
  contentBody: {
    height: '100%',
    // border:'solid 1px',
  },
  container: {
    width: 'calc(100% - 40px)',
    margin: '0 auto',
    overflow: 'auto',
    [theme.breakpoints.up(415)]: {
      margin: '0px auto 20px',
      width: 560
    }
  },
  titleText: {
    color: '#043B5D',
    fontFamily: 'Montserrat',
    textAlign: 'center'
  },
  box: {
    display: 'flex',
    // width: 'calc(100% - 40px)',
    // margin: '0 20px 20px',
    padding: '10px 15px',
    [theme.breakpoints.up(415)]: {
      // margin: '0px auto 20px',
      width: 560
    }
  },
  boxText: {
    fontSize: 14,
    textAlign: 'left',
    padding: '0 18px 0 20px',
    lineHeight: '19px',
    '& span': {
      fontWeight: 600
    }
  },
  conditionLabel: {
    // width: 'calc(100% - 40px)',
    // margin: '0 20px 30px',
    padding: '2px 2px',
    textAlign: 'center',
    color: '#043B5D',
    [theme.breakpoints.up(415)]: {
      // margin: '0px auto 20px',
      width: 560
    }
  },
  loginContainer: {
    marginTop: '40vh'
  },
  description: {
    padding: 15,
    fontSize: 14,
    textAlign: 'center'
  },
  item: {
    width: 350,
    marginBottom: 20
  },
  WelcomeButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#0F84A9',
    fontSize: 20,
    fontWeight: 500,
    marginTop: 30,
    marginBottom: 80,

    "& span": {
      justifyContent: 'space-around'
    },
    [theme.breakpoints.up(440)]: {
      marginTop: 50,
      width: 180,
    }
  },
  WelcomeTitle: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
    margin: '15px auto 20px',
    lineHeight: '24px',
    [theme.breakpoints.up(415)]: {
      fontSize: 16,
      lineHeight: '24px',
      margin: '25px auto',
    }
  },
  acceptContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& h5': {
      color: '#043B5D',
      fontSize: 11
    }
  },
  icon: {
    width: 20,
    height: 20,
    border: "solid #043B5D 1px",
    boxShadow: "4px 4px 8px 2px rgba(15,132,169,0.3)",
    backgroundColor: "#fff",
    "input:hover ~ &": {
      backgroundColor: "#fff"
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
      height: 20,
      width: 20,
      // backgroundColor: "#fff",
      // backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "&:after": {
      top: 9,
      left: 16,
      width: 5,
      height: 13,
      border: "solid #043B5D",
      borderWidth: "0 3px 3px 0",
      content: '""',
      position: "absolute",
      display: "block",
      transform: "rotate(45deg)"
    },
    "input:hover ~ &": {
      backgroundColor: "#fff"
    },
  },
  termLabel: {
    fontSize: 12,
    color: '#043B5D'
  },
  error: {
    margin: 10,
    textAlign: 'center'
  },
  alertContainer: {
    backgroundColor: 'rgb(221 239 255)'
  }
}));

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

const Welcome = (props) => {
  const { locationInfo, nextStep, backTab } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();

  const [checked, setChecked] = useState(false);
  const [displayError, setDisplayError] = useState(null);

  const { t } = useTranslation();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!checked) {
      setDisplayError('Please accept terms and conditions by checking box above.');
      return;
    } else {
      nextStep(checked);
    }
  };

  const onChangeChecked = (e) => {
    console.log(e.target);
    setChecked(!checked);
  }

  const handleBack = () => {
    backTab();
  }

  return (
    <div className={classes.content}>
      <div className={classes.contentBody}>
        <div className={classes.container}>
          <Typography variant="h4" style={{ textAlign: 'center' }} className={classes.WelcomeTitle}>
            {t('welcomeHeading1')}<br />
            {locationInfo.location_name}<br />
            {t('welcomeHeading2')}
          </Typography>
          <BlueBox class={classes.box}>
            <img src='/images/svg/Group 3.svg' alt="" />
            <Typography variant="h4" className={classes.boxText} >
              {t('welcomeList1')}
            </Typography>
          </BlueBox>

          <BlueBox class={classes.box}>
            <img src='/images/svg/lock_icon.svg' alt="lock" style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Typography variant="h4" className={classes.boxText} >

              <Trans
                i18nKey="welcomeList2"
                default="Your answers will not be shared with <span>{{name}}</span> or others without your permission."
                values={{ name: locationInfo.client_name }}
                components={{ span: <span /> }}
              >
              </Trans>

            </Typography>
          </BlueBox>

          {/* <BlueBox class={classes.box}>
            <img src='/images/svg/Group 2.svg' alt="" />
            <Typography variant="h4" className={classes.boxText} >
              By using this tool, you agree to
            its terms and that <span>{'<Client Name>'}</span> will not be liable for any harm relating to your use.
          </Typography>
          </BlueBox> */}

          <Typography variant="h5" className={classes.conditionLabel}>
            {/* By using this tool, you agree to its terms and that {locationInfo.client_name} will not be liable for any harm relating to your use. */}

            <Trans
              i18nKey="welcomeTerm1"
              default="By using this tool, you agree to its terms and that {{name}} will not be liable for any harm relating to your use."
              values={{ name: locationInfo.client_name }}
            >

            </Trans>


          </Typography>

          <Typography variant="h5" className={classes.conditionLabel}>
            {t('welcomeTerm2')}
          </Typography>

          <div className={classes.acceptContainer}>
            <FormControlLabel
              value={checked}
              control={<StyledCheckBox required={true} onChange={onChangeChecked} checked={checked} />}
              label={<Typography className={classes.termLabel}>{t('welcomeTermLabel')}</Typography>}
              labelPlacement="end"
              classes={{ root: classes.termLabel }}
            />
            {/* <Checkbox onChange={onChangeChecked} checked={checked} />
            <Typography variant="h5">Accept Terms and Conditions</Typography> */}
          </div>

          <div className={classes.error}>
            {displayError ? <Alert severity="error" className={classes.alertContainer}>{displayError}</Alert> : null}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className={clsx(brandClasses.backButton, brandClasses.loginButton)}
              onClick={handleBack}
            >
              <KeyboardBackspaceIcon />
              {'Back'}
            </Button>
            <Button
              className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
              onClick={handleSubmit}
            >
              {t('welcomeNextBtn')}
              <ArrowRightAltIcon style={{ color: "#fff" }} />
            </Button>
          </div>

          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}

Welcome.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default Welcome;