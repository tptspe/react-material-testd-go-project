import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { uploadGoImage } from 'actions/api';
import brandStyles from 'theme/brand';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useTranslation } from 'react-i18next';
import SignaturePad from 'react-signature-canvas';
import dataURLtoBlob from 'blueimp-canvas-to-blob';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Montserrat',
    margin: 0
  },
  content: {
    top: 0,
    // width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
  contentBody: {
    padding: '20px',
    textAlign: 'center'
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
    marginTop: '40vh'
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'justify',
    width: '80%',
    margin: 'auto'
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
  boxContainer: {
    width: 300,
    height: 110,
    margin: '0 auto',
    border: '#0F84A9 solid 1px',
    borderRadius: '6px',
    [theme.breakpoints.up(376)]: {
      width: 300,
    }
  },
  clearContainer: {
    display: 'flex',
    padding: '0 15px',
    margin: '20px 0 0',
    width: '100%',
    justifyContent: 'center'
  },
  error: {
    width: 300,
    margin: 'auto'
  },

}));

let sigPad = {};

const Prod005Content = (props) => {
  const { user, nextStep, uploadGoImage } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();

  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(null);

  const { t } = useTranslation();

  const sigClear = () => {
    sigPad.clear();
  };

  const changeSignature = () => {
    console.log(sigPad);
  }

  const handleSubmit = async event => {
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

  return (
    <div className={classes.content}>
      <div className={classes.contentBody}>
        <Typography component={'div'} className={classes.description}>
          COVID-19 Testing Release:<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp; I, {`${(user && user.first_name) ? `${user.first_name} ${user.last_name}, ` : ''}`}hereby authorize a nasopharyngeal swab test for the testing of COVID-19. I agree and consent to being tested to protect my health and the health of fellow HEI Sheraton Atlanta employees and guests. To ensure the safety of HEI  Sheraton Atlanta  employees during the COVID-19 pandemic, I understand, agree, and consent to being tested for COVID-19 and I also consent to my test results being released to my employer HEI Sheraton Atlanta. I further understand, agree, certify, and authorize the following:
          <br />
          <br />
          <ol>
            <li>The patient named above is consenting to a diagnostic Antigen COVID-19 test.</li>
            <li>I understand that HEI Sheraton Atlanta has contracted Testd Rx for collection of my specimen. I authorize the third-party company to collect the specimen (nasopharyngeal swab) and process it onsite, if needed a second specimen PCR test will be sent to a CLIA Certified laboratory for testing.</li>
            <li>I understand that Testd Rx is not responsible for any delays in testing results once a PCR specimen is delivered to laboratory.</li>
            <li>I understand that processing the PCR specimen and results may take up to 3-4 days. </li>
            <li>I authorize Testd to share my test results with HEI Sheraton Atlanta.</li>
          </ol>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp; I have read and agree to the consent form. I have read, certify, understand, and agree to the information herein. I further agree that this test is  to ensure safety, and I agree to waive any claims related to this COVID- 19 testing against HEI Sheraton Atlanta.
        </Typography>
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

        <div style={{ textAlign: 'center', marginTop: 30, cursor: 'pointer' }}>
          {/* <img src='/images/svg/back_button.svg' alt='back' style={{marginRight:30}} /> */}
          {/* <img src='/images/svg/next_button.svg' alt='next' onClick={handleSubmit} /> */}
          <div className={classes.error}>
            {displayError ? <Alert severity="error" className={classes.alertContainer}>{displayError}</Alert> : null}
          </div>
          <Button
            className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
            onClick={handleSubmit}
          >
            {t('question1_next')}
            {loading ? <CircularProgress size={20} style={{ color: "#fff" }} /> : ''}
            <ArrowRightAltIcon style={{ color: '#fff' }} />
          </Button>
        </div>
      </div>

    </div>
  )
}

Prod005Content.propTypes = {
  nextStep: PropTypes.func.isRequired,
  uploadGoImage: PropTypes.func.isRequired,
};

export default connect(null, { uploadGoImage })(Prod005Content);