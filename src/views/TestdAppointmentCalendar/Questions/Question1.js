import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import brandStyles from 'theme/brand';
import NumberFormat from 'react-number-format';
import BlueBox from "components/BlueBox";
import CheckCircleButton from 'components/CheckCircleButton';
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
    [theme.breakpoints.up(415)]: {
      fontSize: 20,
      lineHeight: 1.5
    }
  },
  description: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 20,
    [theme.breakpoints.up(415)]: {
      fontSize: 20,
      marginBottom: 25,
    }
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
  backButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 20,
    fontWeight: 500,
    marginTop: 30,
    marginRight: 20,
    marginBottom: 80,
    color: '#0F84A9',
    border: '#0F84A9 solid 1px',
    '&:hover': {
      backgroundColor: '#0F84A9',
      color: '#fff',
      '& span svg': {
        color: "white !important"
      }
    },
    "& span": {
      justifyContent: 'space-around',
    },
    [theme.breakpoints.up(440)]: {
      marginTop: 50,
      width: 180,
    }
  },
  boxContainer: {
    width: 360,
    margin: '0 auto',
    [theme.breakpoints.up(376)]: {
      width: 370,
    }
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px'
  },
  tempBox: {
    width: 80,
    padding: '0px 10px',
    marginBottom: 0,
    '& input': {
      padding: '10px'
    }
  }


}));

const initialValues = [
  {
    name: 'option1',
    checked: false,
    label: 'Fever, chills, or sweating'
  },
  {
    name: 'option2',
    value: '',
    label: 'If you have a fever what is your temp?'
  },
  {
    name: 'option3',
    checked: false,
    label: 'Difficulty breathing (not severe)'
  },
  {
    name: 'option4',
    checked: false,
    label: 'New or worsening cough'
  },
  {
    name: 'option5',
    checked: false,
    label: 'Sore throat?'
  },
];

const Question1 = (props) => {
  const { handleQuestionsSubmit, backTab, id, setDisplayError } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();
  const [values, setValues] = React.useState(initialValues);
  const { t } = useTranslation();

  React.useEffect(() => {
    setValues(initialValues);
  }, [id]);

  const onChange = (e, index) => {
    var prevValues = values;
    prevValues[index].checked = !prevValues[index].checked;
    setValues([...prevValues]);
  }

  const onChangeTemper = (e) => {
    var prevValues = values;
    prevValues[1].value = e.target.value;
    setValues([...prevValues]);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    // const validation_checked = values.filter(value => value.checked === true);
    // if(validation_checked.length < 1){
    //   setDisplayError('Please select one option at least.');
    //   return;
    // }

    if (values[0].checked === true && values[1].value === '') {
      setDisplayError('Please input your temperature.');
      return;
    }

    let fever = parseInt(values[1].value);
    if (fever < 94 || fever > 105) {
      setDisplayError('Please input temperature between 94-105.');
      return;
    }
    handleQuestionsSubmit(values);
  };

  const handleBack = () => {
    backTab('question');
  }

  return (
    <div className={classes.content} >
      <form
        onSubmit={handleSubmit}
      >
        <div className={classes.contentBody}>
          <Typography className={classes.title}>

            {/* Are you experiencing <br /> any of these symptoms? */}

            <Trans

              i18nKey="question1_heading"
              default="Are you experiencing <br /> any of these symptoms?"
              components={{ br: <br /> }}
            >

            </Trans>




          </Typography>
          <br />
          <Typography className={classes.description}>

            <Trans

              i18nKey="question1_heading_sub"
              default="Select all that apply. If none,<br /> proceed to the next screen."
              components={{ br: <br /> }}
            >

            </Trans>



          </Typography>

          <div className={classes.boxContainer}>

            {values.map((value, index) => (
              <div key={index}>
                {index === 1 ? (
                  values[0].checked ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30 }}>
                      <Typography >

                        {
                          value.name === "option2" ? t('question1_option2') : value.label
                        }


                      </Typography>
                      {/* <BlueBox class={classes.tempBox}> */}
                      {/* {values.temper} */}
                      <NumberFormat
                        customInput={TextField}
                        format={"###"}
                        mask=" "
                        onChange={onChangeTemper}
                        defaultValue={value.value}
                        required
                        variant="outlined"
                        className={classes.tempBox}
                      />
                      <Typography>{'°F'}</Typography>
                      {/* </BlueBox> */}
                    </div>) : (<></>)
                ) :
                  <BlueBox class={classes.box} >
                    <CheckCircleButton
                      checked={value.checked}
                      label={t(`question1_${value.name}`)}
                      name={value.index}
                      onChange={(e) => onChange(e, index)}
                    />
                  </BlueBox>
                }
              </div>
            ))}

          </div>


          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px auto 50px' }}>
            {/* <img src='/images/svg/back_button.svg' alt='back' style={{ marginRight: 30, padding: '6px 8px', cursor: 'pointer' }} onClick={handleBack} />
            <Button type="submit" >
              <img src='/images/svg/next_button.svg' alt='next' />
            </Button> */}
            <Button
              className={clsx(brandClasses.backButton, brandClasses.loginButton)}
              onClick={handleBack}
            >
              <KeyboardBackspaceIcon />
              {t('question1_back')}
            </Button>

            <Button
              className={clsx(brandClasses.logonButton, brandClasses.loginButton)}
              type="submit"
            >
              {t('question1_next')}
              <ArrowRightAltIcon style={{ color: "#fff" }} />
            </Button>

          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  )
}

Question1.propTypes = {
  handleQuestionsSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Question1;