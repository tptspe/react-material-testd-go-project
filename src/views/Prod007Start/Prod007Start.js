import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import { useTranslation, Trans } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { getVendorCategories } from 'helpers';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#0F84A9',
    boxShadow: 'none',
    height: 80,
    alignItems: 'center',
    [theme.breakpoints.up(415)]: {
      height: 80
    }
  },
  toolbar: {
    justifyContent: 'center'
  },
  content: {
    // position: 'fixed',
    // top: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    [theme.breakpoints.up(440)]: {
      margin: '0 auto',
      width: '320px',
    }
  },
  contentBody: {
    height: '100%',
    paddingTop: '2vh'
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center'
  },
  titleTop: {
    color: '#043B5D',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 600,
  },
  logonButton: {
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
  breakMobile: {
    display: 'inline',
    [theme.breakpoints.up(414)]: {
      display: 'none'
    }
  },
  breakTablet: {
    display: 'inline',
    [theme.breakpoints.down(415)]: {
      display: 'none'
    }
  },
  container: {
    width: '320px',
    margin: '0 auto'
  },
  tile: {
    width: '140px',
    height: '140px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '16px 5px',
    color: '#0F84A9',
    border: '0.561386px solid #0F84A9',
    boxShadow: '2.80693px 2.80693px 5.61386px 1.40347px rgb(15 132 169 / 29%)',
    cursor: 'pointer',
    '& img': {
      width: '70px'
    }
  },
  label: {
    color: '#0F84A9',
    fontSize: '12px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    lineHeight: '15px',
    paddingTop: '8px'
  },
  label1: {
    color: '#0F84A9',
    fontSize: '18px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    lineHeight: '22px',
    paddingTop: '8px'
  },
  itemActive: {
    backgroundColor: '#0F84A9',
    '& p': {
      color: 'white'
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
  menuItem: {
    color: '#788081'
  },
  selected: {
    fontWeight: 500,
    color: '#043B5D !important'
  }
}));

const ThreeLocations = ['Beach Drive Thru', 'Royal', 'Coral'];
const FourLocations = ['Cove', 'Beach Drive Thru', 'Royal', 'Coral'];

const Prod007Start = props => {
  const { history } = props;

  // styles
  const classes = useStyles();
  const brandClasses = brandStyles();

  // hooks
  const [step, setStep] = useState('from');
  const [from, setFrom] = useState(null);
  const [guest, setGuest] = useState(null);
  const [formState, setFormState] = useState({});
  const [locationsList, setLocationsList] = useState(ThreeLocations);

  const { t, i18n } = useTranslation();
  const [langCode, setLangCode] = useState(i18n.language);

  const handleLangCode = code => {
    i18n.changeLanguage(code);
    setLangCode(code);
  };

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitFrom = event => {
    event.preventDefault();
    if (from === 'Atlantis Day Pass or Restaurant' || from === 'Ocean Club Resident') {
      history.push(`/go/beach?from=${from}`);
    } else if (from === 'VENDOR') {
      setStep('vendor');
    } else {
      setStep('guest');
    }
  };

  const handleSubmitGuest = event => {
    event.preventDefault();
    switch (guest) {
      case 'The Cove':
        setLocationsList(FourLocations);
        break;
      case 'The Reef':
        setLocationsList(FourLocations);
        break;
      case 'The Royal':
        setLocationsList(ThreeLocations);
        break;
      case 'Harborside':
        setLocationsList(ThreeLocations);
        break;

      default:
        setLocationsList(ThreeLocations);
        break;
    }
    setStep('locations');
  };

  const handleSubmitVendor = event => {
    event.preventDefault();
    history.push(`/go/vendors?from=${from}&vendor=${formState.otherValue ? formState.otherValue : formState.vendor}`);
  };

  const handleSubmitLocation = event => {
    event.preventDefault();
    switch (formState.location) {
      case 'Cove':
        history.push(`/go/cove?from=${from}&guest=${guest}`);
        break;
      case 'Beach Drive Thru':
        history.push(`/go/beach?from=${from}&guest=${guest}`);
        break;
      case 'Royal':
        history.push(`/go/royal?from=${from}&guest=${guest}`);
        break;
      case 'Coral':
        history.push(`/go/coral?from=${from}&guest=${guest}`);
        break;

      default:
        history.push(`/go/coral?from=${from}&guest=${guest}`);
        break;
    };
  };

  const handleBack = () => {
    setFrom(null);
    setGuest(null);
    setFormState({});
    setStep('from');
  };

  return (
    <Grid container>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <img
            src="/go/images/svg/Testd_ID_logo.svg"
            alt="Testd_logo"
            style={{ height: 45, marginTop: 25 }}
          />
        </Toolbar>
      </AppBar>

      {step === 'from' && (
        <div className={classes.content} >
          <div className={classes.contentBody}>
            <Typography className={classes.title}>
              <Trans
                i18nKey="schedule_heading"
                default="Please choose the one that <br /> best describes you:"
                components={{ br: <br /> }}
              />
            </Typography>
            <br />
            <form
              onSubmit={handleSubmitFrom}
            >
              <Grid container className={classes.container}>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={from === 'Atlantis Hotel GUEST' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setFrom('Atlantis Hotel GUEST')}>
                    <img src={from === 'Atlantis Hotel GUEST' ? "/go/images/svg/new patient White.svg" : "/go/images/svg/new patient.svg"} alt="" />
                    <Typography className={classes.label}>
                      <Trans
                        i18nKey="schedule_atlantis_hotel"
                        default="Atlantis Hotel <br /> GUEST"
                        components={{ br: <br /> }}
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={from === 'Atlantis Day Pass or Restaurant' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setFrom('Atlantis Day Pass or Restaurant')}>
                    <img src={from === 'Atlantis Day Pass or Restaurant' ? "/go/images/svg/Entertaiment White.svg" : "/go/images/svg/Entertaiment.svg"} alt="" />
                    <Typography className={classes.label}>
                      <Trans
                        i18nKey="schedule_atlantis_day"
                        default="Atlantis DAY PASS <br /> or Restaurant"
                        components={{ br: <br /> }}
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={from === 'Ocean Club Resident' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setFrom('Ocean Club Resident')}>
                    <img src={from === 'Ocean Club Resident' ? "/go/images/svg/City White.svg" : "/go/images/svg/City.svg"} alt="" />
                    <Typography className={classes.label}>
                      <Trans
                        i18nKey="schedule_atlantis_ocean"
                        default="Ocean Club <br /> RESIDENT"
                        components={{ br: <br /> }}
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={from === 'VENDOR' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setFrom('VENDOR')}>
                    <img src={from === 'VENDOR' ? "/go/images/svg/Vendor active.svg" : "/go/images/svg/Vendor_1.svg"} alt="" />
                    <Typography className={classes.label}>
                      <Trans
                        i18nKey="schedule_atlantis_vendor"
                        default="VENDOR"
                        components={{ br: <br /> }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <div style={{ textAlign: 'center', marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                {/* <Button
                  className={clsx(brandClasses.backButton, brandClasses.loginButton)}
                  onClick={handleBack}
                >
                  {t('question1_back')}
                </Button> */}
                <Button
                  className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
                  // onClick={handleSubmit}
                  type="submit"
                  classes={{ disabled: brandClasses.disabledButton }}
                  disabled={!from ? true : false}
                >
                  {t('question1_next')}
                </Button>
              </div>
            </form>
          </div>
          <div className={classes.langCodeContainer}
            style={{ textAlign: 'center', position: 'absolute', bottom: '40px', left: 0, right: 0 }}>
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
        </div>
      )}

      {step === 'guest' && (
        <div className={classes.content} >
          <div className={classes.contentBody}>
            <Typography className={classes.titleTop}>
              {t('guest_heading')}
            </Typography>
            <Typography className={classes.title}>
              <Trans
                i18nKey="guest_heading_1"
                default="Which Tower are you <br /> staying in? "
                components={{ br: <br /> }}
              />
            </Typography>
            <br />
            <form
              onSubmit={handleSubmitGuest}
            >
              <Grid container className={classes.container}>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={guest === 'The Cove' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setGuest('The Cove')}>
                    <img src={guest === 'The Cove' ? "/go/images/svg/Island active.svg" : "/go/images/svg/Island.svg"} alt="" />
                    <Typography className={classes.label}>
                      {t('guest_cove')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={guest === 'The Reef' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setGuest('The Reef')}>
                    <img src={guest === 'The Reef' ? "/go/images/svg/Fish active.svg" : "/go/images/svg/Fish.svg"} alt="" />
                    <Typography className={classes.label}>{t('guest_reef')}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={guest === 'The Royal' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setGuest('The Royal')}>
                    <img src={guest === 'The Royal' ? "/go/images/svg/Crown Active white.svg" : "/go/images/svg/Crown inactive.svg"} alt="" />
                    <Typography className={classes.label}>{t('guest_royal')}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{ margin: '8px auto' }}>
                  <Box className={guest === 'Harborside' ? clsx(classes.tile, classes.itemActive) : classes.tile}
                    onClick={() => setGuest('Harborside')}>
                    <img src={guest === 'Harborside' ? "/go/images/svg/Harbor white.svg" : "/go/images/svg/Harbor.svg"} alt="" />
                    <Typography className={classes.label}>{t('guest_harborside')}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <div style={{ textAlign: 'center', marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                <Button
                  className={clsx(brandClasses.backButton, brandClasses.loginButton)}
                  onClick={handleBack}
                >
                  {t('question1_back')}
                </Button>
                <Button
                  className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
                  // onClick={handleSubmit}
                  type="submit"
                  classes={{ disabled: brandClasses.disabledButton }}
                  disabled={!guest ? true : false}
                >
                  {t('question1_next')}
                </Button>
              </div>
            </form>
          </div>
          <div className={classes.langCodeContainer}
            style={{ textAlign: 'center', position: 'absolute', bottom: '40px', left: 0, right: 0 }}>
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
        </div>
      )}

      {step === 'vendor' && (
        <div className={classes.content} >
          <div className={classes.contentBody}>

            <Typography className={classes.title}>
              <Trans
                i18nKey="vendor_heading"
                default="Select Vendor Category "
                components={{ br: <br /> }}
              />
            </Typography>
            <br />
            <form
              onSubmit={handleSubmitVendor}
            >
              <Grid container className={classes.container}>
                <Grid item xs={12} style={{ margin: '16px auto', textAlign: 'center' }}>
                  <img src="/go/images/svg/Vendor_1.svg" alt="" />
                </Grid>
                <Grid item xs={12} >
                  <FormControl
                    variant="outlined"
                    className={brandClasses.shrinkTextField}
                    style={{ marginBottom: 16 }}
                  >
                    <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('vendor_same_label')}</InputLabel>
                    <Select
                      onChange={handleChange}
                      label="Vendor"
                      name="vendor"
                      displayEmpty
                      value={formState.vendor || ''}
                      IconComponent={KeyboardArrowDownIcon}
                      classes={{ select: clsx(classes.selected, classes.selectItem) }}
                    >
                      <MenuItem value=''>
                        <Typography className={brandClasses.selectPlaceholder}>{t('vendor_select_text')}</Typography>
                      </MenuItem>
                      {getVendorCategories.map((item, index) => (
                        <MenuItem value={item} key={index}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {formState.vendor === 'Other' &&
                    <TextField
                      type="text"
                      label=""
                      placeholder={t('vendor_type_name')}
                      name="otherValue"
                      className={clsx(brandClasses.shrinkTextField, classes.inputTextField)}
                      onChange={handleChange}
                      value={formState.otherValue}
                      fullWidth
                      required
                      InputProps={{ classes: { root: classes.inputLabel } }}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  }
                </Grid>
              </Grid>
              <div style={{ textAlign: 'center', position: 'absolute', bottom: '50px', left: 0, right: 0 }}>
                <Button
                  className={clsx(brandClasses.backButton, brandClasses.loginButton)}
                  onClick={handleBack}
                >
                  {t('question1_back')}
                </Button>
                <Button
                  className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
                  // onClick={handleSubmit}
                  type="submit"
                  classes={{ disabled: brandClasses.disabledButton }}
                  disabled={!formState.vendor ? true : false}
                >
                  {t('question1_next')}
                </Button>
              </div>
            </form>
          </div>
          <div className={classes.langCodeContainer}
            style={{ textAlign: 'center', position: 'absolute', bottom: '40px', left: 0, right: 0 }}>
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
        </div>
      )}

      {step === 'locations' && (
        <div className={classes.content} >
          <div className={classes.contentBody}>

            <Typography className={classes.title}>
              <Trans
                i18nKey="restaurant_heading"
                default="Please choose the location you would like to test at:"
                components={{ br: <br /> }}
              />
            </Typography>
            <br />
            <form
              onSubmit={handleSubmitLocation}
            >
              <Grid container className={classes.container}>
                <Grid item xs={12} style={{ margin: '16px auto', textAlign: 'center' }}>
                  {/* <img src="/go/images/svg/Entertaiment.svg" alt="" /> */}
                  <img src="/go/images/svg/new patient.svg" alt="" />
                </Grid>
                <Grid item xs={12} >
                  <FormControl
                    variant="outlined"
                    className={brandClasses.shrinkTextField}
                    style={{ marginBottom: 16 }}
                  >
                    <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('vendor_location_label')}</InputLabel>
                    <Select
                      onChange={handleChange}
                      label="Restaurant"
                      name="location"
                      displayEmpty
                      value={formState.location || ''}
                      IconComponent={KeyboardArrowDownIcon}
                      classes={{ select: clsx(classes.selected, classes.selectItem) }}
                    >
                      <MenuItem value=''>
                        <Typography className={brandClasses.selectPlaceholder}>{t('restaurant_select_text')}</Typography>
                      </MenuItem>
                      {locationsList.map((item, index) => (
                        <MenuItem value={item} key={index}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ textAlign: 'center', position: 'absolute', bottom: '50px', left: 0, right: 0 }}>
                <Button
                  className={clsx(brandClasses.backButton, brandClasses.loginButton)}
                  onClick={handleBack}
                >
                  {t('question1_back')}
                </Button>
                <Button
                  className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
                  // onClick={handleSubmit}
                  type="submit"
                  classes={{ disabled: brandClasses.disabledButton }}
                  disabled={!formState.location ? true : false}
                >
                  {t('question1_next')}
                </Button>
              </div>
            </form>
          </div>
          <div className={classes.langCodeContainer}
            style={{ textAlign: 'center', position: 'absolute', bottom: '40px', left: 0, right: 0 }}>
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
        </div>
      )}

    </Grid>
  );
};

Prod007Start.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Prod007Start);
