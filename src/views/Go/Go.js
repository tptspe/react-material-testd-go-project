import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  CircularProgress,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import brandStyles from 'theme/brand';
import decodeUriComponent from 'decode-uri-component';
import Helmet from 'react-helmet';
import { fetchGoEndpoint, authenticateGoUser, createGoUser, updateGoUser, createGoDependent, clientServer } from 'actions/api';
import Alert from '@material-ui/lab/Alert';
import { getPopulationManagerInit } from 'helpers';
import Authenticate from './Authenticate';
import GotIt from './GotIt';
import AnySymptoms from './AnySymptoms';
import Welcome from './Welcome';
import { Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8 } from './Questions';
import Insurance from './Insurance';
import PersonalID from './PersonalID';
import SimpleIntake from './SimpleIntake';
import ScheduleAppointment from './ScheduleAppointment';
import AddDependent from './AddDependent';
import Prod004Content from './Prod004Content';
import Prod005Content from './Prod005Content';
import Prod006Content from './Prod006Content';
import Prod007Content from './Prod007Content';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#0F84A9',
    boxShadow: 'none',
    height: 65,
    alignItems: 'center',
    [theme.breakpoints.up(415)]: {
      height: 80
    }
  },
  toolbar: {
    justifyContent: 'center'
  },
}));

const Go = props => {
  const { location, fetchGoEndpoint, authenticateGoUser, createGoUser, updateGoUser, createGoDependent } = props;

  // styles
  const classes = useStyles();
  const brandClasses = brandStyles();

  // hooks
  const [step, setStep] = useState('authenticate');
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [user, setUser] = useState({});
  const [displayError, setDisplayError] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [haveSymptoms, setHaveSymptoms] = useState(false);
  const [populationSetting, setPopulationSetting] = useState({ ...getPopulationManagerInit });

  const endpoint = props.match.params.endpoint;

  const from = new URLSearchParams(location.search).get('from');
  const guest = new URLSearchParams(location.search).get('guest');
  const vendor = new URLSearchParams(location.search).get('vendor');

  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      let res = await fetchGoEndpoint({
        endpoint: decodeUriComponent(endpoint)
      });
      setFetchLoading(false);
      if (res.success) {
        setLocationData(res.data);
        setPopulationSetting(res.data.population_settings);
        if (from || guest || vendor) {
          let newUser = {};
          if (from)
            newUser['from'] = from;
          if (guest)
            newUser['guest'] = guest;
          if (vendor)
            newUser['vendor'] = vendor;
          setUser(user => ({ ...user, ...newUser }));
        }
      } else {
        setDisplayError('Something went wrong. Please contact Administrator');
      }
    })();
    // eslint-disable-next-line
  }, [endpoint]);

  const handleAuthenticateSubmit = async body => {
    setSubmitLoading(true);
    let res = await authenticateGoUser(body);
    setSubmitLoading(false);
    if (res.success) {
      let userObj = {
        location_id: locationData.location_id,
        client_id: locationData.client_id,
        populationsettings_id: locationData.populationsettings_id,
        population_type: locationData.population_type,
      };
      if (res.data) {
        userObj = { ...res.data, ...userObj };
      }
      if (body.email)
        userObj.email = body.email;
      if (body.phone)
        userObj.phone = body.phone;
      setUser(user => ({
        ...user,
        ...userObj
      }));
      if (populationSetting.web_intake_type === 'Simple Intake') {
        if (res.data) {
          if (userObj.signature)
            setStep('simple_intake');
          else if (clientServer === 'prod004')
            setStep('prod004_content');
          else if (clientServer === 'prod005')
            setStep('prod005_content');
          else if (clientServer === 'prod006')
            setStep('prod006_content');
          else if (clientServer === 'prod007')
            setStep('prod007_content');
          else
            setStep('simple_intake');
        } else {
          setDisplayError('New register not possible in "Simple Intake" type.');
        }
      } else {
        if (userObj.signature)
          setStep('got_it');
        else if (clientServer === 'prod004')
          setStep('prod004_content');
        else if (clientServer === 'prod005')
          setStep('prod005_content');
        else if (clientServer === 'prod006')
          setStep('prod006_content');
        else if (clientServer === 'prod007')
          setStep('prod007_content');
        else
          setStep('got_it');
      }
    } else {
      setDisplayError('Something went wrong. Please contact Adminstrator');
    }
  };

  const handleQuestionsSubmit = async data => {
    if (
      step === 'question_1' ||
      step === 'question_2' ||
      step === 'question_3' ||
      step === 'question_4' ||
      step === 'question_5'
    ) {
      // questions
      let questions = questionsData ? [...questionsData] : [];
      data.forEach(d => {
        let index = questions.findIndex(q => q.question === d.label);
        if (index >= 0)
          questions[index].value =
            d.checked === true ? 'Yes' : d.checked === false ? 'No' : d.checked;
        else
          questions.push({
            question: d.label,
            value:
              d.checked === true
                ? 'Yes'
                : d.checked === false
                  ? 'No'
                  : d.checked
          });
      });
      setQuestionsData(questions);
      checkAndGoNextStep();
    } else if (
      step === 'question_6' ||
      step === 'question_7' ||
      step === 'question_8'
    ) {
      // User details
      if (step === 'question_7' && data['zip_code'])
        if (data['zip_code'].length < 5) {
          setDisplayError('Invalid Zip code');
          return;
        }
      setUser(data);
      if (step === 'question_8') {
        saveUserToDB(data);
        // if next questions are hidden
      } else if (step === 'question_7' && populationSetting.demographics_ssn_hide) {
        saveUserToDB(data);
      } else if (step === 'question_6' && populationSetting.home_address_hide) {
        saveUserToDB(data);
      } else {
        checkAndGoNextStep();
      }
    }
  };

  const saveUserToDB = async (data) => {
    let res;
    setSubmitLoading(true);
    if (user._id)
      res = await updateGoUser(user._id, data);
    else
      res = await createGoUser(data);
    setSubmitLoading(false);
    if (res.success) {
      setUser(res.data);
      if (data.addDependent)
        setStep('add_dependent');
      else
        checkAndGoNextStep(res.data);
    }
  };

  const handleDependentSubmit = async (data) => {
    setSubmitLoading(true);
    let res = await createGoDependent(data);
    setSubmitLoading(false);
    if (res.success) {
      if (data.next) {
        checkAndGoNextStep();
      }
    }
  };

  const getNextStep = () => {
    switch (step) {
      case 'welcome':
        if (!populationSetting.health_screening_hide)
          return 'question_1';
        if (!populationSetting.health_condition_hide)
          return 'question_2';
        if (!populationSetting.last_14days_contact_hide)
          return 'question_5';
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'question_1':
        if (!populationSetting.health_condition_hide)
          return 'question_2';
        if (!populationSetting.last_14days_contact_hide)
          return 'question_5';
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'question_2':
        return 'question_3';

      case 'question_3':
        return 'question_4';

      case 'question_4':
        if (!populationSetting.last_14days_contact_hide)
          return 'question_5';
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'any_symptoms':
      case 'question_5':
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'question_6':
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'question_7':
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'add_dependent':
      case 'question_8':
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'insurance':
        if (!populationSetting.personal_identity_hide)
          return 'personal_identity';
        return 'schedule_appointment';

      case 'personal_identity':
        return 'schedule_appointment';

      default:
        return 'authenticate';
    }
  };

  const getBackStep = () => {
    switch (step) {
      case 'question_1':
        return 'welcome';

      case 'question_2':
        if (!populationSetting.health_screening_hide)
          return 'question_1';
        else
          return 'welcome';

      case 'question_3':
        return 'question_2';

      case 'question_4':
        return 'question_3';

      case 'question_5':
        if (!populationSetting.health_condition_hide)
          return 'question_4';
        if (!populationSetting.health_screening_hide)
          return 'question_1';
        return 'welcome';

      case 'question_6':
        if (haveSymptoms) {
          if (!populationSetting.last_14days_contact_hide)
            return 'question_5';
          if (!populationSetting.health_condition_hide)
            return 'question_4';
          if (!populationSetting.health_screening_hide)
            return 'question_1';
          return 'welcome';
        } else {
          return 'any_symptoms';
        }

      case 'question_7':
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (haveSymptoms) {
          if (!populationSetting.last_14days_contact_hide)
            return 'question_5';
          if (!populationSetting.health_condition_hide)
            return 'question_4';
          if (!populationSetting.health_screening_hide)
            return 'question_1';
          return 'welcome';
        } else {
          return 'any_symptoms';
        }

      case 'question_8':
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (haveSymptoms) {
          if (!populationSetting.last_14days_contact_hide)
            return 'question_5';
          if (!populationSetting.health_condition_hide)
            return 'question_4';
          if (!populationSetting.health_screening_hide)
            return 'question_1';
          return 'welcome';
        } else {
          return 'any_symptoms';
        }

      case 'add_dependent':
      case 'insurance':
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (haveSymptoms) {
          if (!populationSetting.last_14days_contact_hide)
            return 'question_5';
          if (!populationSetting.health_condition_hide)
            return 'question_4';
          if (!populationSetting.health_screening_hide)
            return 'question_1';
          return 'welcome';
        } else {
          return 'any_symptoms';
        }

      case 'personal_identity':
        if (!populationSetting.insurance_information_hide)
          return 'insurance';
        if (!populationSetting.demographics_ssn_hide)
          return 'question_8';
        if (!populationSetting.home_address_hide)
          return 'question_7';
        if (!populationSetting.contact_information_hide)
          return 'question_6';
        if (haveSymptoms) {
          if (!populationSetting.last_14days_contact_hide)
            return 'question_5';
          if (!populationSetting.health_condition_hide)
            return 'question_4';
          if (!populationSetting.health_screening_hide)
            return 'question_1';
          return 'welcome';
        } else {
          return 'any_symptoms';
        }

      default:
        return 'authenticate';
    }
  };

  const checkAndGoNextStep = (paramsUser) => {
    let next_step = getNextStep();
    // setUser is taking time before checking !user._id
    let gotUser = paramsUser ? paramsUser : user;
    if ((next_step === 'schedule_appointment' || next_step === 'insurance' || next_step === 'personal_identity') && !gotUser._id)
      return setDisplayError('Seems Form Settings is incorrect. Please contact Administrator.');
    setStep(next_step);
  };

  const checkAndGoBackStep = () => {
    let back_step = getBackStep();
    setStep(back_step);
  };

  const nextStep = (data) => {
    console.log('nextStep', step);
    setDisplayError(null);
    if (step === 'authenticate') {
      // authenticate
      handleAuthenticateSubmit(data);
    } else if (step === 'prod004_content' ||
      step === 'prod005_content' ||
      step === 'prod006_content' ||
      step === 'prod007_content') {
      // prod00{4, 5, 6, 7}
      setUser(user => ({
        ...user,
        ...data
      }));
      setStep('got_it');
    } else if (step === 'got_it') {
      // got it
      setStep('any_symptoms');
    } else if (step === 'any_symptoms') {
      // any symptoms
      if (data === 'true') {
        setHaveSymptoms(true);
        setStep('welcome');
      } else {
        setHaveSymptoms(false);
        checkAndGoNextStep();
      }
    } else if (step === 'welcome') {
      checkAndGoNextStep();
    } else if (step.includes('question')) {
      handleQuestionsSubmit(data);
    } else if (step === 'add_dependent') {
      handleDependentSubmit(data);
    } else if (step === 'insurance') {
      checkAndGoNextStep();
    } else if (step === 'personal_identity') {
      checkAndGoNextStep();
    } else if (step === 'simple_intake') {
      setStep('schedule_appointment');
    }
  };

  const backTab = () => {
    setDisplayError(null);
    if (step === 'any_symptoms') {
      setStep('got_it');
    } else if (step === 'welcome') {
      setStep('any_symptoms');
    } else if (step.includes('question')) {
      checkAndGoBackStep();
    } else if (step === 'add_dependent') {
      checkAndGoBackStep();
    } else if (step === 'insurance') {
      checkAndGoBackStep();
    } else if (step === 'personal_identity') {
      checkAndGoBackStep();
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {locationData
            ? `${locationData.location_name} | Check In`
            : 'TESTD Dashboard'
          }
        </title>
      </Helmet>

      <Grid container>
        {displayError ? <Alert severity="error" style={{ zIndex: 10, width: '100%' }}>{displayError}</Alert> : null}

        {fetchLoading
          ?
          <CircularProgress className={brandClasses.fetchProgressSpinner} />
          :
          <>
            {step !== 'authenticate' && step !== 'got_it' &&
              <AppBar position="static" className={classes.header}>
                <Toolbar className={classes.toolbar}>
                  {clientServer === 'prod006'
                    ?
                    <img
                      src="/go/images/v2g.png"
                      alt="Testd_logo"
                      style={{ height: 85, marginTop: 5 }}
                    />
                    :
                    <img
                      src="/images/svg/Testd_ID_logo.svg"
                      alt="Testd_logo"
                      style={{ height: 50, marginTop: 10 }}
                    />
                  }
                </Toolbar>
              </AppBar>
            }

            {step === 'authenticate' &&
              <Authenticate
                locationData={locationData}
                nextStep={nextStep}
                submitLoading={submitLoading}
                isEmailRequired={populationSetting.email_required}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'got_it' &&
              <GotIt
                nextStep={nextStep}
              />
            }

            {step === 'any_symptoms' &&
              <AnySymptoms
                nextStep={nextStep}
                backTab={backTab}
              />
            }

            {step === 'welcome' &&
              <Welcome
                locationInfo={locationData}
                nextStep={nextStep}
                backTab={backTab}
              />
            }

            {step === 'question_1' &&
              <Question1
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'question_2' &&
              <Question2
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'question_3' &&
              <Question3
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'question_4' &&
              <Question4
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'question_5' &&
              <Question5
                nextStep={nextStep}
                backTab={backTab}
                submitLoading={submitLoading}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'question_6' &&
              <Question6
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                submitLoading={submitLoading}
                setDisplayError={setDisplayError}
                first_name_hide={populationSetting.first_name_hide}
                first_name_required={populationSetting.first_name_required}
                last_name_hide={populationSetting.last_name_hide}
                last_name_required={populationSetting.last_name_required}
                contact_information_required={populationSetting.contact_information_required}
              />
            }

            {step === 'question_7' &&
              <Question7
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                submitLoading={submitLoading}
                setDisplayError={setDisplayError}
                address_hide={populationSetting.address_hide}
                address_required={populationSetting.address_required}
                home_address_required={populationSetting.home_address_required}
              />
            }

            {step === 'question_8' &&
              <Question8
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                submitLoading={submitLoading}
                setDisplayError={setDisplayError}
                demographics_ssn_required={populationSetting.demographics_ssn_required}
              />
            }

            {step === 'add_dependent' &&
              <AddDependent
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                submitLoading={submitLoading}
              />
            }

            {step === 'insurance' &&
              <Insurance
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
                insurance_information_required={populationSetting.insurance_information_required}
              />
            }

            {step === 'personal_identity' &&
              <PersonalID
                user={user}
                setUser={setUser}
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
                personal_identity_required={populationSetting.personal_identity_required}
              />
            }

            {step === 'simple_intake' &&
              <SimpleIntake
                user={user}
                setUser={setUser}
                nextStep={nextStep}
                backTab={backTab}
                populationSetting={populationSetting}
              />
            }

            {step === 'schedule_appointment' &&
              <ScheduleAppointment
                user={user}
                nextStep={nextStep}
                backTab={backTab}
              />
            }

            {/* Client Components */}
            {step === 'prod004_content' &&
              <Prod004Content
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'prod005_content' &&
              <Prod005Content
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'prod006_content' &&
              <Prod006Content
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

            {step === 'prod007_content' &&
              <Prod007Content
                user={user}
                nextStep={nextStep}
                backTab={backTab}
                setDisplayError={setDisplayError}
              />
            }

          </>
        }
      </Grid>
    </div>
  );
};

Go.propTypes = {
  fetchGoEndpoint: PropTypes.func.isRequired,
  authenticateGoUser: PropTypes.func.isRequired,
  createGoUser: PropTypes.func.isRequired,
  updateGoUser: PropTypes.func.isRequired,
  createGoDependent: PropTypes.func.isRequired,
};

export default connect(null, { fetchGoEndpoint, authenticateGoUser, createGoUser, updateGoUser, createGoDependent })(Go);
