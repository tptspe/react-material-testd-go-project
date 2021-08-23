import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import { getEthnicities, getGenders, getRace } from 'helpers';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useTranslation, Trans } from 'react-i18next';

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
    lineHeight: '24px',
    [theme.breakpoints.up(415)]: {
      fontSize: 20,
      lineHeight: 1.5
    }
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 24,
    [theme.breakpoints.up(415)]: {
      fontSize: 14,
      marginBottom: 12,
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
      padding: 16,
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
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%',
    margin: 0
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  boxContainer: {
    width: 360,
    margin: '0 auto',
    [theme.breakpoints.up(376)]: {
      width: 340,
    }
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px'
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

const Question8 = (props) => {
  const { user, submitLoading, handleQuestionsSubmit, backTab } = props;


  const { t } = useTranslation();

  const classes = useStyles();
  const brandClasses = brandStyles();
  const [formState, setFormState] = React.useState({});
  const [submitButton, setSubmitButton] = React.useState('');

  React.useEffect(() => {
    if (user)
      setFormState(user);
  }, [user]);

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (submitButton === 'AddDependent')
      formState.addDependent = true;
    handleQuestionsSubmit(formState);
  };

  const handleBack = () => {
    backTab('question');
  }

  return (
    <div className={classes.content} >
      <div className={classes.contentBody}>
        <Typography className={classes.title}>


          <Trans

            i18nKey="question8_heading"
            default="Tell us about your <br /> background"
            components={{ br: <br /> }}
          >

          </Trans>


        </Typography>
        <br />

        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.boxContainer}>
            {/* <TextField
            type="number"
            placeholder="Last 4 digits of your Social ** ** 0000"
            className={classes.tempBox}
            name="social_digits"
            value={formState.social_digits || ''}
            onChange={handleChange}
            variant="outlined"
          /> */}
            <TextField
              type="number"
              label={t('question8_ssn_label')}
              placeholder={t('question8_ssn_place')}
              name="social_digits"
              className={clsx(brandClasses.shrinkTextField, classes.inputTextField)}
              onChange={handleChange}
              value={formState.social_digits || ''}
              fullWidth
              InputProps={{ classes: { root: classes.inputLabel } }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <br />
            <FormControl
              className={brandClasses.shrinkTextField}
              fullWidth
              variant="outlined"
            >
              <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('question8_gender_label')}</InputLabel>
              <Select
                onChange={handleChange}
                label={t('question8_gender_label')}
                name="gender"
                value={formState.gender || `${t('question8_gender_place')}`}
              >
                <MenuItem value={`${t('question8_gender_place')}`}>
                  <Typography className={brandClasses.selectPlaceholder}>{t('question8_gender_place')}</Typography>
                </MenuItem>
                {getGenders.map((gender, index) => (
                  <MenuItem key={index} value={gender}>{gender}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl
              className={brandClasses.shrinkTextField}
              fullWidth
              variant="outlined"
            >
              <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('question8_race_label')}</InputLabel>
              <Select
                onChange={handleChange}
                label={t('question8_race_label')}
                name="race"
                value={formState.race || `${t('question8_race_place')}`}
              >
                <MenuItem value={t('question8_race_place')}>
                  <Typography className={brandClasses.selectPlaceholder}>{t('question8_race_place')}</Typography>
                </MenuItem>
                {getRace.map((race, index) => (
                  <MenuItem key={index} value={race}>{race}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl
              className={brandClasses.shrinkTextField}
              fullWidth
              variant="outlined"
            >
              <InputLabel shrink className={brandClasses.selectShrinkLabel}>{t('question8_ethnicity_label')}</InputLabel>
              <Select
                onChange={handleChange}
                label={t('question8_ethnicity_label')}
                name="ethnicity"
                value={formState.ethnicity || `${t('question8_ethnicity_place')}`}
              >
                <MenuItem value={t('question8_ethnicity_place')}>
                  <Typography className={brandClasses.selectPlaceholder}>{t('question8_ethnicity_place')}</Typography>
                </MenuItem>
                {getEthnicities.map((ethnicity, index) => (
                  <MenuItem key={index} value={ethnicity}>{ethnicity}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <br /><br />

            <Button
              className={clsx(brandClasses.button, brandClasses.whiteButton)}
              fullWidth
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setSubmitButton('AddDependent')}
              type="submit"
            >
              {`${t('question8_dependent_btn')}`}
            </Button>
          </div>

          {/* <div style={{ textAlign: 'center' }}>
          <Typography className={classes.description}>
            *All your personal information <br /> is encrypted and secure.
          </Typography>
        </div> */}

          <div style={{ display: 'flex', justifyContent: 'center', margin: '1px auto 50px' }}>
            {/* <img src='/images/svg/back_button.svg' alt='back' style={{ marginRight: 30, padding: '6px 8px', cursor: 'pointer' }} onClick={handleBack} />
            <Button type="submit" type="submit" disabled={submitLoading}>
              <img src='/images/svg/next_button.svg' alt='next' />
            </Button>*/}

            <Button
              className={clsx(brandClasses.backButton, brandClasses.loginButton)}
              onClick={handleBack}
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
          <br /><br /><br /><br />
        </form>
      </div>

    </div>
  )
}

Question8.propTypes = {
  handleQuestionsSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Question8;
