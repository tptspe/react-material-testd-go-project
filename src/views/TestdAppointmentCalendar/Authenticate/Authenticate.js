import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import NumberFormat from 'react-number-format';
import tabletBg from '../assets/splash_tablet.svg';
import mobileBg from '../assets//splash_testd.svg';
import { useTranslation } from 'react-i18next';
import { clientServer } from 'actions/api';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Montserrat',
    margin: 0
  },
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
  titleText: {
    color: '#043B5D',
    fontFamily: 'Montserrat',
    textAlign: 'center'
  },
  box: {
    padding: 0
  },
  loginContainer: {
    marginTop: '35vh'
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
    height: 45,
    width: 250,
    borderRadius: 10,
    backgroundColor: '#0F84A9',
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
    [theme.breakpoints.up(420)]: {
      marginTop: 50
    }
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
  }
}));

const Authenticate = props => {
  const { submitLoading, handleAuthenticateSubmit, setDisplayError } = props;

  const { t, i18n } = useTranslation();


  const classes = useStyles();
  const brandClasses = brandStyles();

  const [formState, setFormState] = useState({ email: '', phone: '' });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth > 376 ? tabletBg : mobileBg;
  const [langCode, setLangCode] = useState('en');


  // useEffect(() => {

  //   i18n.changeLanguage('es');

  // }, [i18n]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
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
    handleAuthenticateSubmit(body);
  };

  return (
    <div
      className={classes.content}
      style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className={classes.contentBody}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Box className={clsx(classes.box)}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
              className={classes.loginContainer}>
              <Typography variant="h5" className={classes.description}>
                {t('loginHeading')}
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
                  required={clientServer !== 'prod002'}
                  fullWidth
                  InputProps={{ classes: { root: classes.inputLabel } }}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>

              {/* <Typography>or</Typography> */}
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
              <Button
                className={clsx(
                  classes.authenticateButton,
                  brandClasses.loginButton
                )}
                classes={{ disabled: classes.authenticateButtonDisabled }}
                disabled={submitLoading}
                type="submit">
                {t('loginSubmitBtn')}{' '}
                {submitLoading ? (
                  <CircularProgress
                    size={20}
                    className={brandClasses.progressSpinnerWhite}
                  />
                ) : (
                    ''
                  )}
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
  handleAuthenticateSubmit: PropTypes.func.isRequired
};

export default Authenticate;
