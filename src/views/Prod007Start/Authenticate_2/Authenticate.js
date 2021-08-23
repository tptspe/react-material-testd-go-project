import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Checkbox,
  // FormControlLabel,
  Box, 
  Link
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import NumberFormat from 'react-number-format';
// import tabletBg from '../assets/splash_tablet.svg';
// import mobileBg from '../assets/splash_testd.svg';
import { useTranslation, Trans } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  content: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover'
    // [theme.breakpoints.up(415)]: {
    //   top:64,
    // }
  },
  contentBody: {
    height: '100%'
    // border:'solid 1px',
  },
  box: {
    padding: 0
  },
  loginContainer: {
    marginTop: '14vh'
  },
  description: {
    paddingBottom: 8,
    fontSize: 14,
    textAlign: 'center'
  },
  item: {
    width: 350,
    marginBottom: 20
  },
  itemNoBottom: {
    width: 350,
    marginBottom: 0
  },
  authenticateButton: {
    height: '45px',
    width: '150px',
    borderRadius: '10px',
    backgroundColor: '#0F84A9 !important',
    color: '#fff !important',
    fontSize: '20px',
    fontWeight: 500,
    marginTop: '10px',
    // textTransform: 'uppercase !important',
    textTransform: 'uppercase',
    [theme.breakpoints.up(420)]: {
      marginTop: '50px'
    }
  },
  authenticateButtonDisabled: {
    backgroundColor: '#D8D8D8 !important',
  },
  langCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
    fontSize: 16,
    '& h4': {
      color: '#9B9B9B',
      fontSize: 16,
      cursor: 'pointer'
    }
  },
  active: {
    color: '#0F84A9 !important'
  },
  inputTextField: {
    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-input': {
        padding: '15px !important',
        fontWeight: 500,
        color:'#043B5D !important',
        '&:focus': {
          fontSize: 14
        }
      },
      '& fieldset': {},
      '&:hover fieldset': {},
      '&.Mui-focused fieldset': {},
      '&:focus': {
        fontSize: 14
      }
    },
    '& .MuiInputLabel-shrink': {}
  },
  labelRoot: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    color: '#043B5D',
    fontSize: '12px'
  },
  heading: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    color: '#043B5D',
    fontSize: '18px',
    textAlign:'center',
    lineHeight: '24px',
    marginBottom: '10px'
  }
}));

const AcceptCheckbox = withStyles({
  root: {
    color: '#0F84A9',
    '&$checked': {
      color: '#043B5D',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Authenticate = props => {
  const { submitLoading, isEmailRequired, nextStep, setDisplayError } = props;

  const { t, i18n } = useTranslation();

  const classes = useStyles();
  const brandClasses = brandStyles();

  const [formState, setFormState] = useState({ email: '', phone: '', agree: false });
  const [disableButton, setDisableButton] = useState(true);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const imageUrl = windowWidth > 376 ? tabletBg : mobileBg;
  const [langCode, setLangCode] = useState(i18n.language);

  useEffect(() => {
    // const handleWindowResize = () => {
    //   setWindowWidth(window.innerWidth);
    // };
    // window.addEventListener('resize', handleWindowResize);
    // return () => {
    //   window.removeEventListener('resize', handleWindowResize);
    // };
    if (formState.phone !== '' && formState.agree === true && (isEmailRequired ? formState.email !== '' : true)) {
      setDisableButton(false);
    }else{
      setDisableButton(true);
    }
  }, [formState, isEmailRequired]);

  const handleChange = e => {
    e.persist();
    console.log(e.target.name, e.target.value)
    e.target.name !== 'agree' ?
      setFormState(formState => ({
        ...formState,
        [e.target.name]: e.target.value
      }))
      :
      setFormState(formState => ({
        ...formState,
        [e.target.name]: e.target.checked
      }));
  };

  const handleLangCode = code => {
    i18n.changeLanguage(code);
    setLangCode(code);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let body = {
      email: formState.email.trim(),
      phone: formState.phone.replace(/ +/g, '')
    };
    if (body.phone.length !== 10) {
      setDisplayError('Please enter valid phone number.');
      return;
    }
    nextStep(body);
  };

  return (
    <div
      className={classes.content}
    // style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={classes.contentBody}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Box className={clsx(classes.box)}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
              className={classes.loginContainer}
            >
              <Typography variant="h5" className={classes.heading}>
                <Trans
                  i18nKey="auth_heading"
                  default="how should we <br /> contact you?"
                  components={{ br: <br /> }}
                ></Trans>
              </Typography>
              <Typography variant="h5" className={classes.description}>
                <Trans
                  i18nKey="auth_sub_heading"
                  default="Please provide some contact <br /> information below"
                  components={{ br: <br /> }}
                ></Trans>
              </Typography>
              <Grid item className={classes.itemNoBottom}>
                <TextField
                  type="email"
                  label={t('loginEmailLabel')}
                  placeholder={t('loginEnterEmail')}
                  name="email"
                  className={clsx(
                    brandClasses.shrinkTextField,
                    classes.inputTextField
                  )}
                  onChange={handleChange}
                  value={formState.email || ''}
                  required={isEmailRequired}
                  fullWidth
                  InputProps={{ classes: { root: classes.inputLabel } }}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>

              
              <br />

              <Grid item className={classes.item}>
                <NumberFormat
                  customInput={TextField}
                  format="### ### ####"
                  mask=" "
                  type="tel"
                  label={t('loginPhoneLabel')}
                  placeholder={t('loginEnterPhone')}
                  name="phone"
                  className={clsx(
                    brandClasses.shrinkTextField,
                    classes.inputTextField
                  )}
                  onChange={handleChange}
                  value={formState.phone || ''}
                  required
                  fullWidth
                  InputProps={{ classes: { root: classes.inputLabel } }}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Typography variant="h5" className={classes.description}>

                {t("loginp1")}
                <br />
                {t("loginp2")}
                <br />
                {t("loginp3")}

              </Typography>

              {/* <FormControlLabel
                control={<AcceptCheckbox checked={formState.agree} onChange={handleChange} name="agree" required />}
                classes={{ label: classes.labelRoot }}
                label="Accept Terms and Conditions"
              /> */}

              <Box>
                <AcceptCheckbox checked={formState.agree} onChange={handleChange} name="agree" required />
                <span className={classes.labelRoot}>Accept <Link href="https://testd.com/Terms.html" className={classes.labelRoot} target="_blank">Terms and Conditions</Link></span>
              </Box>
              

              <Button
                className={clsx(
                  classes.authenticateButton,
                  brandClasses.loginButton
                )}
                classes={{ disabled: classes.authenticateButtonDisabled }}
                disabled={disableButton}
                type="submit"
              >
                {t('loginSubmitBtn')}{' '}
                {submitLoading && <CircularProgress size={20} className={brandClasses.progressSpinnerWhite} />}
              </Button>

              <div className={classes.langCodeContainer}>
                <Typography
                  variant="h4"
                  onClick={() => handleLangCode("en")}
                  className={langCode === 'en' ? classes.active : ''}>
                  English
                </Typography>
                <Typography variant="h4" className={classes.active}>
                  &nbsp;|&nbsp;
                </Typography>
                <Typography
                  variant="h4"
                  onClick={() => handleLangCode('es')}
                  className={langCode === 'es' ? classes.active : ''}>
                  Español
                </Typography>
              </div>
            </Grid>
          </Box>
        </form>
      </div>
    </div>
  );
};

Authenticate.propTypes = {
  nextStep: PropTypes.func.isRequired
};

export default Authenticate;
