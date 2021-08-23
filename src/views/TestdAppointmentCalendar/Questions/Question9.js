import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import RadioGroup from "@material-ui/core/RadioGroup";
import RadioRoundCheckButton from 'components/RadioRoundCheckButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useTranslation } from 'react-i18next'; 

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
      lineHeight:1.5
    }
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 24,
    [theme.breakpoints.up(415)]: {
      fontSize: 16,
      marginBottom: 12,
    }
  },
  tempBox: {
    width: '100%',
    height: '100%',
    border: 'solid 1px #0F84A9',
    padding: 0,
    borderRadius: 8,
    marginLeft: 8,
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
    margin: theme.spacing(1),
    minWidth: '100%',
    marginLeft: 8
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  boxContainer: {
    width: 60,
    margin: '0 auto',
    [theme.breakpoints.up(376)]: {
      width: 60,
    }
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5px 10px',
    border: 0,
    boxShadow: 'none'
  }


}));

const Question9 = (props) => {
  const { isSetInsurance, submitLoading, handleQuestionsSubmit, backTab, id, setDisplayError } = props;

  const { t } = useTranslation(); 

  const classes = useStyles();
  const brandClasses = brandStyles();
  const [value, setValue] = React.useState(null);

  // const [values, setValues] = React.useState({
  //   data: initialValues,
  //   date: moment()
  // });

  React.useEffect(() => {
    setValue(isSetInsurance);
  }, [id, isSetInsurance]);

  const onChange = (e) => {
    console.log(' change ', e.target.value)
    setValue(e.target.value);
  }

  const handleSubmit = async event => {
    if (value === null) {
      setDisplayError('Please select option.');
      return;
    }
    handleQuestionsSubmit(value);
  };

  const handleBack = () => {
    backTab('question');
  }


  return (
    <div className={classes.content} >
      <div className={classes.contentBody}>
        <Typography className={classes.title}>
          {t('question9_heading')}
        </Typography>
        <Typography className={classes.description}>
          {t('question9_heading_sub')}
        </Typography>
        <br />

        <div className={classes.boxContainer}>


          <RadioGroup
            value={value}
            onChange={onChange}
            style={{ flexDirection: 'unset' }}
            required
          >
            <RadioRoundCheckButton label={t('question9_yes')} value="true" required={true} />
            <RadioRoundCheckButton label={t('question9_no')} value="false" required={true} />
          </RadioGroup>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '50px auto 50px' }}>
          {/* <img src='/images/svg/back_button.svg' alt='back' style={{ marginRight: 30, padding: '6px 8px', cursor: 'pointer' }} onClick={handleBack} />
          <Button onClick={handleSubmit} type="submit" disabled={submitLoading}>
            <img src='/images/svg/next_button.svg' alt='next' />
          </Button>
          {submitLoading ? <CircularProgress size={20} /> : ''} */}
          <Button
            className={clsx(brandClasses.backButton, brandClasses.loginButton)}
            onClick={handleBack}
          >
            <KeyboardBackspaceIcon style={{color:"#0F84A9"}} />
            {t('question1_back')}
          </Button>

          <Button
            className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
            onClick={handleSubmit}
          >
            {t('question1_next')}
            {submitLoading ? <CircularProgress size={20} style={{color:"#fff"}} /> : ''}
            <ArrowRightAltIcon style={{color:"#fff"}} />
          </Button>
        </div>
      </div>

    </div>
  )
}

Question9.propTypes = {
  handleQuestionsSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Question9;
