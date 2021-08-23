import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Photos from './components/Photos';
import ReviewPersonalID from './components/ReviewPersonalID';

const PersonalID = (props) => {
  const { user, setUser, nextStep, backTab, setDisplayError, personal_identity_required } = props;

  const [step, setStep] = useState('photos');

  const handleNext = (data) => {
    if (step === 'photos') {
      setUser(user => ({
        ...user,
        ...data
      }));
      setStep('review-personal_id');
    } else if (step === 'review-personal_id') {
      nextStep();
    }
  };

  const handleBack = () => {
    backTab();
  };

  return (
    <Grid container>
      {step === 'photos' &&
        <Photos
          user={user}
          nextStep={handleNext}
          backTab={handleBack}
          setDisplayError={setDisplayError}
          personal_identity_required={personal_identity_required}
        />
      }

      {step === 'review-personal_id' &&
        <ReviewPersonalID
          user={user}
          nextStep={handleNext}
          backTab={handleBack}
          setDisplayError={setDisplayError}
        />
      }
    </Grid>
  )
}

PersonalID.propTypes = {
  user: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  backTab: PropTypes.func.isRequired,
  setDisplayError: PropTypes.func.isRequired,
};

export default PersonalID;

