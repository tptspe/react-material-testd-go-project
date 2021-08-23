import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from "moment";
import brandStyles from 'theme/brand';
import clsx from 'clsx';
import { Button, Grid, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getStates, getEthnicities, getGenders, getRace } from 'helpers';
import { apiUrl } from 'actions/api';
import NumberFormat from 'react-number-format';
import ZipCodeInput from 'components/ZipCodeInput';

const fetchHeaderToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3IiOiJTY2hlZHVsZSIsImlhdCI6MTU5NzI0NzY2MX0.3tRBEgvdIlKADm7kTagLLbzNxm1Gnc70VA49MX406xM';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Montserrat',
    margin: 0
  },
  formGrid: {
    width: '100%',
    paddingTop: theme.spacing(4),
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  selectLabel: {
    color: theme.palette.brandDark,
    marginBottom: 2,
    // fontWeight: 600
  },
  selectedColor: {
    '& .MuiSelect-select': {
      color: '#FF931E',
    }
  },
  footerButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(15),
    // margin: theme.spacing(8),
  },
  titleText: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 18
  },
  buttonDisabled: {
    backgroundColor: '#FFFFFF',
  },
  error: {
    padding: 5
  },
}));

const SimpleIntake = (props) => {
  const { user, setUser, nextStep, populationSetting } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();

  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(null);
  const [displaySuccess] = useState(null);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (user.dob) {
      let dob = moment.utc(user.dob);
      user.dateOfBirth = dob.date();
      user.monthOfBirth = dob.month() + 1;
      user.yearOfBirth = dob.year();
    }
    setFormState(user);
  }, [user]);

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
    }));
  };

  const handleNextButton = (e) => {
    e.preventDefault();
    setLoading(true);
    formState.dob = moment().year(formState.yearOfBirth).month(formState.monthOfBirth - 1).date(formState.dateOfBirth).format('YYYY-MM-DD');
    fetch(`${apiUrl}/schedule/user/${formState._id}`, {
      method: 'put',
      body: JSON.stringify(formState),
      headers: {
        'Content-Type': 'application/json',
        'testd-jwt-schedule': fetchHeaderToken
      }
    })
      .then(res => res.json())
      .then(async res => {
        setLoading(false);
        if (res.success) {
          nextStep();
          setUser(formState);
        } else {
          setDisplayError(res.message);
        }
      }).catch(error => {
        setLoading(false);
        setDisplayError(error.message || JSON.stringify(error));
      });
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div className={classes.error}>
          {displayError ? <Alert severity="error">{displayError}</Alert> : null}
          {displaySuccess ? <Alert severity="success">{displaySuccess}</Alert> : null}
        </div>

        <Grid item>
          <Typography variant="h4" className={classes.titleText}>
            Welcome to TESTD. <br />
            Please enter your contact information
          </Typography>
        </Grid>

        <Grid
          item
          // style={{ marginTop: 40 }}
          className={classes.formGrid}
        >
          <form
            onSubmit={handleNextButton}
          >
            <Grid container spacing={6}>
              {!populationSetting.last_name_hide &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="Last Name"
                    placeholder="Enter last name"
                    name="last_name"
                    className={brandClasses.shrinkTextField}
                    onChange={handleChange}
                    value={formState.last_name || ''}
                    required={populationSetting.last_name_required}
                    fullWidth
                    InputProps={{ classes: { root: classes.inputLabel } }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              }
              {!populationSetting.first_name_hide &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="First Name"
                    placeholder="Enter first name"
                    name="first_name"
                    className={brandClasses.shrinkTextField}
                    onChange={handleChange}
                    value={formState.first_name || ''}
                    required={populationSetting.first_name_required}
                    fullWidth
                    InputProps={{ classes: { root: classes.inputLabel } }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              }
              {!populationSetting.phone_hide &&
                <Grid item xs={12} sm={6}>
                  <NumberFormat
                    customInput={TextField}
                    format="### ### ####"
                    mask=" "
                    type="tel"
                    label="10 Digit Phone Number"
                    placeholder="Enter Phone number"
                    name="phone"
                    className={brandClasses.shrinkTextField}
                    onChange={handleChange}
                    value={formState.phone || ''}
                    required={populationSetting.phone_required}
                    fullWidth
                    disabled
                    InputProps={{ classes: { root: classes.inputLabel } }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              }
              {!populationSetting.email_hide &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="Email"
                    placeholder="Enter email address"
                    name="email"
                    className={brandClasses.shrinkTextField}
                    onChange={handleChange}
                    value={formState.email || ''}
                    required={populationSetting.email_required}
                    fullWidth
                    InputProps={{ classes: { root: classes.inputLabel } }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              }
              {!populationSetting.address_hide &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="Address"
                    placeholder="Enter address"
                    name="address"
                    className={brandClasses.shrinkTextField}
                    onChange={handleChange}
                    value={formState.address || ''}
                    fullWidth
                    required={populationSetting.address_required}
                    InputProps={{ classes: { root: classes.inputLabel } }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              }
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="City"
                  placeholder="Enter city"
                  name="city"
                  className={brandClasses.shrinkTextField}
                  onChange={handleChange}
                  value={formState.city || ''}
                  fullWidth
                  InputProps={{ classes: { root: classes.inputLabel } }}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item container spacing={3} xs={12} sm={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={brandClasses.shrinkTextField}
                    required
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel>State</InputLabel>
                    <Select
                      onChange={handleChange}
                      label="State* "
                      name="state"
                      value={formState.state || ''}
                    >
                      {getStates.map((state, index) => (
                        <MenuItem key={index} value={state.text}>{state.text}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item container xs={12} sm={6}>
                  <ZipCodeInput
                    label="Zip Code"
                    placeholder="Enter zip"
                    name="zip_code"
                    className={brandClasses.shrinkTextField}
                    onChange={handleChange}
                    value={formState.zip_code || ''}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  type="text"
                  label="Last 4 digits of social"
                  placeholder="0000"
                  name="social_digits"
                  className={brandClasses.shrinkTextField}
                  onChange={handleChange}
                  value={formState.social_digits || ''}
                  fullWidth
                  InputProps={{ classes: { root: classes.inputLabel } }}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <InputLabel className={classes.selectLabel}>Date of Birth</InputLabel>
                <FormControl
                  variant="outlined"
                  required
                  className={clsx(classes.selectedColor, brandClasses.selectExpandIcon, brandClasses.shrinkTextField)}
                  style={{ width: 100 }}
                >
                  <Select
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChange}
                    name="dateOfBirth"
                    value={formState.dateOfBirth || ''}
                  >
                    {[...Array(31)].map((_, item) => (
                      <MenuItem value={item + 1} key={item}>{item + 1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel className={classes.selectLabel}>Month of Birth</InputLabel>
                <FormControl
                  variant="outlined"
                  required
                  className={clsx(classes.selectedColor, brandClasses.selectExpandIcon, brandClasses.shrinkTextField)}
                  style={{ width: 100 }}
                >
                  <Select
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChange}
                    name="monthOfBirth"
                    value={formState.monthOfBirth || ''}
                  >
                    {[...Array(12)].map((_, item) => (
                      <MenuItem value={item + 1} key={item}>{item + 1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel className={classes.selectLabel}>Year of Birth</InputLabel>
                <FormControl
                  variant="outlined"
                  required
                  className={clsx(classes.selectedColor, brandClasses.selectExpandIcon, brandClasses.shrinkTextField)}
                  style={{ width: 200 }}
                >
                  <Select
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChange}
                    name="yearOfBirth"
                    value={formState.yearOfBirth || ''}
                  >
                    {[...Array.from({ length: (1900 - moment().get('y')) / -1 + 1 })].map((_, item) => (
                      <MenuItem value={moment().get('y') + (item * -1)} key={item}>{moment().get('y') + (item * -1)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel className={classes.selectLabel}>Gender</InputLabel>
                <FormControl
                  variant="outlined"
                  required
                  className={clsx(classes.selectedColor, brandClasses.selectExpandIcon, brandClasses.shrinkTextField)}
                  style={{ width: 200 }}
                >
                  <Select
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChange}
                    name="gender"
                    value={formState.gender || ''}
                  >
                    {getGenders.map((gender, index) => (
                      <MenuItem value={gender} key={index}>{gender}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel className={classes.selectLabel}>Ethnicity</InputLabel>
                <FormControl
                  variant="outlined"
                  className={clsx(classes.selectedColor, brandClasses.selectExpandIcon, brandClasses.shrinkTextField)}
                  style={{ width: 200 }}
                >
                  <Select
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChange}
                    name="ethnicity"
                    value={formState.ethnicity || ''}
                  >
                    {getEthnicities.map((ethnicity, index) => (
                      <MenuItem value={ethnicity} key={index}>{ethnicity}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel className={classes.selectLabel}>Race</InputLabel>
                <FormControl
                  variant="outlined"
                  className={clsx(classes.selectedColor, brandClasses.selectExpandIcon, brandClasses.shrinkTextField)}
                  style={{ width: 200 }}
                >
                  <Select
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChange}
                    name="race"
                    value={formState.race || ''}
                  >
                    {getRace.map((race, index) => (
                      <MenuItem key={index} value={race}>{race}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <div className={classes.footerButton}>
              <Button
                className={brandClasses.button}
                classes={{ disabled: brandClasses.buttonDisabled }}
                disabled={loading}
                type="submit"
              >
                {'Next'} {loading ? <CircularProgress size={20} className={brandClasses.progressSpinner} /> : ''}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div >
  )
}

SimpleIntake.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  backTab: PropTypes.func.isRequired,
};

export default withRouter(SimpleIntake);
