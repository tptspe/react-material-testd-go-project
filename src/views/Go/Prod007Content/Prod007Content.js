import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, CircularProgress, Typography, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import SignaturePad from 'react-signature-canvas';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import { uploadGoImage } from 'actions/api';
import { useTranslation, Trans } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
// import RadioRoundCheckButton from 'components/RadioRoundCheckButton';

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
    color: '#043B5D',
    fontSize: '18px',
    lineHeight: '23px',
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 16,
    [theme.breakpoints.up(415)]: {
      fontSize: 20,
      lineHeight: 1.3
    }
  },
  description: {
    fontSize: 14,
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
    marginTop: 20,
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
    width: 300,
    // height: 110,
    margin: '0 auto',
    border: '#0F84A9 solid 1px',
    borderRadius: '6px',
    [theme.breakpoints.up(376)]: {
      width: 300,
    }
  },
  boxContainer1: {
    width: 60,
    margin: '30px auto 16px',
    [theme.breakpoints.up(376)]: {
      width: 60,
    }
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5px 10px',
  },
  alertContainer: {
    display: 'flex',
    padding: '0 15px',
    width: '100%',
    justifyContent: 'center',
    marginTop: 10
  },
  clearContainer: {
    display: 'flex',
    padding: '0 15px',
    margin: '20px 0 0',
    width: '100%',
    justifyContent: 'center'
  },
  radioRoot: {
    '& svg': {
      color: '#0F84A9'
    }
  },
  buttonDisabled: {
    backgroundColor: '#D8D8D8 !important',
  },

}));

let sigPad = {};

const Prod007Content = (props) => {
  const { nextStep, uploadGoImage } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(null);
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = async event => {
    if (value === 'false') return setDisplayError('Please select YES to continue.');
    if (!sigPad.isEmpty()) {
      setDisplayError('');
      setLoading(true);
      const sigBlob = dataURLtoBlob(sigPad.getTrimmedCanvas().toDataURL('image/png'));
      // Form Data
      const sigFormData = new FormData();
      sigFormData.append('uploadImage', sigBlob, 'patient-signature.png');
      const res = await uploadGoImage(sigFormData);
      setLoading(false);
      if (res.success) {
        nextStep({ signature: '/images/' + res.data, signature_timestamp: new Date() });
      }
    } else {
      setDisplayError('Please make Signature.');
    }
  };

  const sigClear = () => {
    sigPad.clear();
  };

  // const handleBack = () => {
  //   backTab('question');
  // }

  const changeSignature = () => {
    console.log(sigPad);
  }

  return (
    <div className={classes.content} >
      <div className={classes.contentBody}>
        <Typography className={classes.title}>
          <Trans
            i18nKey="signature007_heading"
            default="COVID Attention of <br /> Uninsured Patients"
            components={{ br: <br /> }}
          >
          </Trans>
        </Typography>

        <div className={classes.boxContainer1}>

          <RadioGroup
            value={value}
            onChange={onChange}
            style={{ flexDirection: 'unset' }}
            required
          >
            <FormControlLabel value="true" control={<Radio required={true} classes={{ root: classes.radioRoot }} />} label="YES" />
            <FormControlLabel value="false" control={<Radio required={true} classes={{ root: classes.radioRoot }} />} label="NO" />
          </RadioGroup>
        </div>
        <br />

        <div className={classes.boxContainer}>
          <SignaturePad
            penColor='#0F84A9'
            canvasProps={{ width: 300, height: 150, className: 'sigCanvas' }}
            clearOnResize={false}
            onChange={changeSignature}
            ref={(ref) => { sigPad = ref }}
          />
        </div>

        <div className={classes.clearContainer}>
          <Button
            className={clsx(brandClasses.button, brandClasses.whiteButton)}
            onClick={sigClear}
          >
            {`${t('question10_clear_btn')}`}
          </Button>
        </div>

        <div className={classes.alertContainer}>
          {displayError ? <Alert severity="error">{displayError}</Alert> : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '0px auto 50px' }}>
          {/* <Button
            className={clsx(brandClasses.backButton, brandClasses.loginButton)}
            onClick={handleBack}
          >
            {t('question1_back')}
          </Button> */}

          <Button
            className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
            onClick={handleSubmit}
            classes={{ disabled: classes.buttonDisabled }}
            disabled={!value}
          >
            {t('loginSubmitBtn')}
            {loading ? <CircularProgress size={20} style={{ color: "#fff" }} /> : ''}
          </Button>
        </div>
      </div>

    </div>
  )
}

Prod007Content.propTypes = {
  uploadGoImage: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  backTab: PropTypes.func.isRequired
};

export default connect(null, { uploadGoImage })(Prod007Content);