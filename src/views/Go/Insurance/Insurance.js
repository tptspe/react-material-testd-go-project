import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckAvailability from './components/CheckAvailability';
import { CircularProgress, Grid } from '@material-ui/core';
import Inputs from './components/Inputs';
import Photos from './components/Photos';
import ReviewInsurance from './components/ReviewInsurance';
import Signature from './components/Signature';
import { getGoPatient } from 'actions/api';

const Insurance = (props) => {
  const { user, nextStep, backTab, setDisplayError, getGoPatient, insurance_information_required } = props;

  const [step, setStep] = useState('check_availability');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        setLoading(true);
        let res = await getGoPatient(user._id);
        setLoading(false);
        if (res.success) {
          setPatient(res.data);
        }
      }
    })();
    // eslint-disable-next-line
  }, [user._id]);

  const handleNext = (data) => {
    console.log('handleNext')
    if (step === 'check_availability') {
      if (data)
        setStep('inputs');
      else
        setStep('signature');
    } else if (step === 'inputs') {
      setPatient(data);
      setStep('photos');
    } else if (step === 'photos') {
      setPatient(patient => ({
        ...patient,
        ...data
      }));
      setStep('review-insurance');
    } else if (step === 'review-insurance') {
      nextStep();
    } else if (step === 'signature') {
      nextStep();
    }
  };

  const handleBack = () => {
    console.log('handleBack')
    if (step === 'check_availability') {
      backTab();
    } else if (step === 'inputs') {
      setStep('check_availability');
    } else if (step === 'photos') {
      setStep('inputs');
    } else if (step === 'review-insurance') {
      setStep('photos');
    } else if (step === 'signature') {
      setStep('check_availability');
    }
  };

  return (
    <Grid container>
      {loading
        ?
        <CircularProgress />
        :
        <>
          {step === 'check_availability' &&
            <CheckAvailability
              user={user}
              nextStep={handleNext}
              backTab={handleBack}
              setDisplayError={setDisplayError}
            />
          }

          {step === 'inputs' &&
            <Inputs
              user={user}
              patient={patient}
              nextStep={handleNext}
              backTab={handleBack}
              setDisplayError={setDisplayError}
              insurance_information_required={insurance_information_required}
            />
          }

          {step === 'photos' &&
            <Photos
              user={user}
              patient={patient}
              nextStep={handleNext}
              backTab={handleBack}
              setDisplayError={setDisplayError}
              insurance_information_required={insurance_information_required}
            />
          }

          {step === 'review-insurance' &&
            <ReviewInsurance
              user={user}
              patient={patient}
              nextStep={handleNext}
              backTab={handleBack}
              setDisplayError={setDisplayError}
            />
          }

          {step === 'signature' &&
            <Signature
              user={user}
              nextStep={handleNext}
              backTab={handleBack}
              setDisplayError={setDisplayError}
              insurance_information_required={insurance_information_required}
            />
          }
        </>
      }
    </Grid>
  )
};

Insurance.propTypes = {
  user: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  backTab: PropTypes.func.isRequired,
  setDisplayError: PropTypes.func.isRequired,
  getGoPatient: PropTypes.func.isRequired,
};

export default connect(null, { getGoPatient })(Insurance)

