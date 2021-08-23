import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import AddIcon from '@material-ui/icons/Add';
// import { DatePicker, MuiPickersUtilsProvider, } from "@material-ui/pickers";
// import MomentUtils from '@date-io/moment';
import { getGenders, getInputPattern } from 'helpers';
import moment from "moment";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useTranslation, Trans } from 'react-i18next';
import { clientServer } from 'actions/api';

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
    paddingTop: '2vh'
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 16,
    [theme.breakpoints.up(415)]: {
      fontSize: 20,
      lineHeight: 1.5
    }
  },
  dobTitle: {
    color: '#0F84A9',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
    [theme.breakpoints.up(415)]: {
      fontSize: 16,
      marginBottom: 22,
    }
  },
  tempBox: {
    width: '100%',
    height: '100%',
    border: 'solid 1px #0F84A9',
    padding: 0,
    borderRadius: 8,
    marginTop: 16,
    // '& input': {
    //   padding: '4px 10px',
    // },
    '&>div:before': {
      borderBottom: 0
    },
    '&>div:after': {
      borderBottom: 0
    },
    '&>div:before:hover': {
      borderBottom: 0
    }
  },
  utilRoot: {
    width: '100%',
    height: '100%',
    border: 'solid 1px #0F84A9',
    borderRadius: 8,
    padding: 0,
    marginLeft: 8,
    marginTop: 16,
    '& input': {
      padding: '13px 13px',
    },
    '&>div:before': {
      borderBottom: 0
    },
    '&>div:after': {
      borderBottom: 0
    },
    '&>div:before:hover': {
      borderBottom: 0
    }
  },
  logonButton: {
    height: 50,
    width: 250,
    borderRadius: 10,
    backgroundColor: '#0F84A9',
    fontSize: 20,
    fontWeight: 500,
    marginTop: 30,
    [theme.breakpoints.up(376)]: {
      marginTop: 50,
    }
  },
  backButton: {
    height: 50,
    width: 250,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 20,
    fontWeight: 500,
    marginTop: 20,
    marginBottom: 25,
    color: '#0F84A9',
    border: '#0F84A9 solid 1px',
    '&:hover': {
      backgroundColor: '#0F84A9',
      color: '#fff',
    },
    [theme.breakpoints.up(440)]: {
      marginTop: 30,
    }
  },
  boxContainer: {
    width: 360,
    margin: '0 auto',
    [theme.breakpoints.up(376)]: {
      width: 320,
    }
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px'
  },
  dateLabel: {
    marginTop: '-8px',
    fontSize: '10px',
    backgroundColor: 'white',
    padding: '0 3px'
  },
  inputTextField: {
    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-input': {
        padding: '15px !important',
      },
      '& fieldset': {
      },
      '&:hover fieldset': {
      },
      '&.Mui-focused fieldset': {
      },
    },
    '& .MuiInputLabel-shrink': {
    },
  },

}));

const AddDependent = (props) => {
  const { user, nextStep, submitLoading, backTab } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();
  const [formState, setFormState] = useState({});
  const [submitButton, setSubmitButton] = useState('');

  const { t } = useTranslation();

  const inputRegex = clientServer === 'prod002' ? { pattern: getInputPattern } : undefined;

  React.useEffect(() => {
    if (user) {
      setIds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
    }));
  };

  const setIds = () => {
    setFormState({
      client_id: user.client_id,
      location_id: user.location_id,
      department_id: user.department_id,
      user_id: user._id,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    formState.dob = moment().year(formState.yearOfBirth).month(formState.monthOfBirth - 1).date(formState.dateOfBirth).format('YYYY-MM-DD');
    if (submitButton === 'Next')
      formState.next = true;
    let data = { ...formState };
    nextStep(data);
    // set id's for another dependent
    setIds();
  };

  // const handleBack = () => {
  //   backTab('question');
  // }

  return (
    <div className={classes.content} >
      <div className={classes.contentBody}>
        <Typography className={classes.title}>


          <Trans

            i18nKey="dependent_heading"
            default="Please provide <br /> dependent’s information"
            components={{ br: <br /> }}
          >

          </Trans>


        </Typography>
        <br />

        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.boxContainer}>
            <TextField
              type="text"
              label={t('dependent_first_name_label')}
              placeholder={t('dependent_first_name_place')}
              name="first_name"
              className={clsx(brandClasses.shrinkTextField, classes.inputTextField)}
              onChange={handleChange}
              value={formState.first_name || ''}
              fullWidth
              required
              InputProps={{ classes: { root: classes.inputLabel } }}
              inputProps={inputRegex}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <br />
            <TextField
              type="text"
              label={t('dependent_middle_name_label')}
              placeholder={t('dependent_middle_name_place')}
              name="middle_name"
              className={clsx(brandClasses.shrinkTextField, classes.inputTextField)}
              onChange={handleChange}
              value={formState.middle_name || ''}
              fullWidth
              InputProps={{ classes: { root: classes.inputLabel } }}
              inputProps={inputRegex}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <br />
            <TextField
              type="text"
              label={t('dependent_last_name_label')}
              placeholder={t('dependent_last_name_place')}
              name="last_name"
              className={clsx(brandClasses.shrinkTextField, classes.inputTextField)}
              onChange={handleChange}
              value={formState.last_name || ''}
              fullWidth
              required
              InputProps={{ classes: { root: classes.inputLabel } }}
              inputProps={inputRegex}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <br />
            <TextField
              type="text"
              label={t('dependent_relationship_label')}
              placeholder={t('dependent_relationship_place')}
              name="relationship"
              className={clsx(brandClasses.shrinkTextField, classes.inputTextField)}
              onChange={handleChange}
              value={formState.relationship || ''}
              fullWidth
              required
              InputProps={{ classes: { root: classes.inputLabel } }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <br />
            <FormControl
              variant="outlined"
              required
              className={brandClasses.shrinkTextField}
            >
              <InputLabel shrink className={brandClasses.selectShrinkLabel}>Gender</InputLabel>
              <Select
                onChange={handleChange}
                label="Gender* "
                name="gender"
                displayEmpty
                value={formState.gender || ''}
              >
                <MenuItem value=''>
                  <Typography className={brandClasses.selectPlaceholder}>Select Gender</Typography>
                </MenuItem>
                {getGenders.map((gender, index) => (
                  <MenuItem key={index} value={gender}>{gender}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <Typography className={classes.dobTitle}>{t('dependent_dob_label')}:</Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <FormControl
                variant="outlined"
                required
                className={brandClasses.shrinkTextField}
                style={{ width: 120, marginRight: 10 }}
              >
                <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('dependent_month_label')}</InputLabel>
                <Select
                  onChange={handleChange}
                  label={`${t('dependent_month_label')}* `}
                  name="monthOfBirth"
                  displayEmpty
                  value={formState.monthOfBirth || ''}
                >
                  <MenuItem value=''>
                    <Typography className={brandClasses.selectPlaceholder}>{t('dependent_month_label')}</Typography>
                  </MenuItem>
                  {moment.months().map((item, index) => (
                    <MenuItem value={index + 1} key={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                className={brandClasses.shrinkTextField}
                style={{ width: '80px', marginRight: 10 }}
                required
                variant="outlined"
              >
                <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('dependent_day_label')}</InputLabel>
                <Select
                  onChange={handleChange}
                  label={`${t('dependent_day_label')}* `}
                  name="dateOfBirth"
                  displayEmpty
                  value={formState.dateOfBirth || ''}
                >
                  <MenuItem value=''>
                    <Typography className={brandClasses.selectPlaceholder}>{t('dependent_day_label')}</Typography>
                  </MenuItem>
                  {[...Array(31)].map((_, item) => (
                    <MenuItem value={item + 1} key={item}>{item + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                required
                className={brandClasses.shrinkTextField}
                style={{ width: 80 }}
              >
                <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('dependent_year_label')}</InputLabel>
                <Select
                  onChange={handleChange}
                  label={`${t('dependent_year_label')}* `}
                  name="yearOfBirth"
                  displayEmpty
                  value={formState.yearOfBirth || ''}
                >
                  <MenuItem value=''>
                    <Typography className={brandClasses.selectPlaceholder}>{t('dependent_year_label')}</Typography>
                  </MenuItem>
                  {[...Array.from({ length: (1900 - moment().get('y')) / -1 + 1 })].map((_, item) => (
                    <MenuItem value={moment().get('y') + (item * -1)} key={item}>{moment().get('y') + (item * -1)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <br /><br />

            <Button
              className={clsx(brandClasses.button, brandClasses.whiteButton)}
              fullWidth
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setSubmitButton('AnotherDependent')}
              disabled={submitLoading}
              type="submit"
            >
              {`${t('dependent_add_btn')}`}
              {submitLoading ? <CircularProgress size={20} /> : ''}
            </Button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Typography className={classes.description} style={{ textAlign: 'center' }}>
              <img src='/images/svg/lock_icon.svg' style={{ marginRight: '1em' }} alt='lock' />
              &nbsp;

              <Trans

                i18nKey="dependent_secure"
                default="All your personal information <br /> is encrypted and secure."
                components={{ br: <br /> }}
              >

              </Trans>


            </Typography>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto 50px' }}>
            <Button
              className={clsx(brandClasses.backButton, brandClasses.loginButton)}
              onClick={backTab}
            >
              <KeyboardBackspaceIcon />
              {t('question1_back')}
            </Button>

            <Button
              className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
              onClick={() => setSubmitButton('Next')}
              disabled={submitLoading}
              type="submit"
            >
              {t('question1_next')} {submitLoading ? <CircularProgress size={20} style={{ color: "#fff" }} /> : ''}
              <ArrowRightAltIcon style={{ color: "#fff" }} />
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

AddDependent.propTypes = {
  nextStep: PropTypes.func.isRequired,
  backTab: PropTypes.func.isRequired,
  submitLoading: PropTypes.bool.isRequired
};

export default AddDependent;
