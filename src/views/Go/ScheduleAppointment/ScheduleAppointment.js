import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from "moment";
import brandStyles from 'theme/brand';
import clsx from 'clsx';
import { Button, Grid, Typography, CircularProgress, IconButton, ButtonGroup, List, FormControl, InputLabel, Select, MenuItem, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/styles';
import { apiUrl, clientServer } from 'actions/api';
import QRCode from 'qrcode.react';
import { RapidPassCard } from 'icons';
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import './ScheduleAppointment.css';
import { useTranslation, Trans } from 'react-i18next';

const fetchHeaderToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3IiOiJTY2hlZHVsZSIsImlhdCI6MTU5NzI0NzY2MX0.3tRBEgvdIlKADm7kTagLLbzNxm1Gnc70VA49MX406xM';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    fontFamily: 'Montserrat',
    margin: 0
  },
  header: {
    backgroundColor: '#0F84A9',
    boxShadow: 'none',
    height: '65px'
  },
  footer: {
    backgroundColor: '#0F84A9',
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    justifyContent: 'center'
  },
  formGrid: {
    width: '100%',
    paddingTop: theme.spacing(4),
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  accountKey: {
    color: theme.palette.brandDark,
    marginLeft: 60,
    fontWeight: 600,
  },
  accountValue: {
    color: theme.palette.brandGray,
    marginLeft: 60
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
  scrollText: {
    color: '#0F84A9',
  },
  titleText: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 18
  },
  subTitleText: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 14
  },
  description: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 18,
    textAlign: 'center'
  },
  selectedDateTime: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textAlign: 'center',
    fontSize: '22px'
  },
  spinner: {
    color: '#0F84A9',
  },
  desktop: {
    height: 145.2,
    width: 145.2,
  },
  mobile: {
    height: 86,
    width: 86,
  },
  dateBox: {
    padding: 18,
    margin: 10,
    boxSizing: 'border-box',
    borderRadius: 12,
    border: '1.2px solid #0F84A9',
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 7px 1px rgba(15,132,169,0.2)',
  },
  activeDateBox: {
    padding: 18,
    margin: 10,
    boxSizing: 'border-box',
    borderRadius: 12,
    border: '1.2px solid #0F84A9',
    backgroundColor: '#0F84A9',
    boxShadow: '2px 2px 6px 1px rgba(15,132,169,0.2)',
    '&:hover': {
      backgroundColor: '#0F84A9',
    },
  },
  displayDay: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    marginBottom: 5
  },
  activeDisplayDay: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    marginBottom: 5
  },
  displayDate: {
    color: '#0F84A9',
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  activeDisplayDate: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  hide: {
    display: 'none'
  },
  emptyIcon: {
    width: 49
  },
  emptyBox: {
    width: 86,
  },
  amPmGroup: {
    borderRadius: 5,
    boxShadow: '2px 2px 4px 1px rgba(15,132,169,0.15)',
    '&.MuiButton-outlined': {
      border: '1px solid #0F84A9',
    }
  },
  activeAmPm: {
    backgroundColor: '#0F84A9',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#0F84A9',
    },
  },
  amPm: {
    backgroundColor: '#FFFFFF',
    color: '#0F84A9'
  },
  timeSlotList: {
    overflow: 'auto',
    maxHeight: 165,
  },
  timeSlotButton: {
    width: 168.82,
    color: '#0F84A9',
    border: '0.82px solid #0F84A9',
    borderRadius: 5.5,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 7px 1px rgba(15,132,169,0.15)',
    textTransform: 'none',
    display: 'flex',
    margin: '0 auto 15px',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#0F84A9',
    },
  },
  confirmButton: {
    width: 140,
    color: '#FFFFFF',
    border: '0.82px solid #0F84A9',
    borderRadius: 5.5,
    backgroundColor: '#0F84A9',
    boxShadow: '2px 2px 7px 1px rgba(15,132,169,0.15)',
    textTransform: 'none',
    padding: '8px',
    display: 'flex',
    fontWeight: 600,
    textAlign: 'center',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#0F84A9',
    },
  },
  cancelButton: {
    width: 140,
    color: '#0F84A9',
    border: '0.82px solid #0F84A9',
    borderRadius: 5.5,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 7px 1px rgba(15,132,169,0.15)',
    textTransform: 'none',
    padding: '8px',
    display: 'flex',
    fontWeight: 600,
    marginRight: 30,
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#0F84A9',
    },
  },
  addButton: {
    width: 140,
    color: '#0F84A9',
    border: '0.82px solid #0F84A9',
    borderRadius: 5.5,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 7px 1px rgba(15,132,169,0.15)',
    textTransform: 'none',
    padding: '8px',
    display: 'flex',
    lineHeight: '22px',
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 30,
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#0F84A9',
    },
  },
  buttonDisabled: {
    backgroundColor: '#FFFFFF',
  },
  error: {
    padding: 5
  },
  divider: {
    width: '200px',
    borderTop: 'solid 1px #0F84A9',
    marginBottom: '15px'
  },
  walletRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '70px'
  },
  walletContainer: {
    border: 'solid 1px #0F84A9',
    borderRadius: 8,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    width: 168,
    '&:first-child': {
      marginRight: 15
    },
    '& h4': {
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: 600,
      '& span': {
        fontSize: 11,
        lineHeight: '14px',
        fontWeight: 600,
      }
    }
  },
  rapidPass: {
    width: '20em',
    height: '15em',
    fontSize: 'unset'
  }
}));

const ScheduleAppointment = (props) => {
  const { user, location } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();

  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [displayError, setDisplayError] = useState(null);
  const [displaySuccess] = useState(null);
  const [availableDates, setAvailableDates] = useState(null);
  const [dependentsList, setDependentsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [displayTimeSlots, setDisplayTimeSlots] = useState({});
  const [addCalendarLink, setAddCalendarLink] = useState('');
  const [scheduleLocation, setScheduleLocation] = useState({});
  const [event, setEvent] = useState({});
  const [qrcodeValue, setQRcodeValue] = useState('');
  const [formState, setFormState] = useState({});
  const [ampm, setAmpm] = useState('AM');
  const [page, setPage] = useState(0);
  const [step, setStep] = useState(1);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });
  const icon = { textOnly: 'none' };

  const type = new URLSearchParams(location.search).get('type');

  useEffect(() => {
    console.log('ScheduleAppointment useEffect user._id:', user._id, ' type', type);
    if (user) {
      fetch(`${apiUrl}/schedule/available-dates/${user._id}`, {
        headers: {
          'testd-jwt-schedule': fetchHeaderToken
        }
      })
        .then(res => res.json())
        .then(async res => {
          setLoading(false);
          if (res.success) {
            setAvailableDates(res.data.dates);
            setDependentsList(res.data.dependents);
          } else {
            setDisplayError(res.message);
          }
        }).catch(error => {
          setLoading(false);
          setDisplayError(error.message || JSON.stringify(error));
        });
    } else {
      setLoading(false);
      setDisplayError('User is empty.');
    }
    // eslint-disable-next-line
  }, [user._id]);

  useEffect(() => {
    if (document.getElementById("rapid-pass-qr-code-id")) {
      let qrCodeId = document.getElementById("rapid-pass-qr-code-id");
      qrCodeId.removeAttribute("width");
      qrCodeId.removeAttribute("height");
      qrCodeId.setAttribute("viewBox", "0 0 22 80");
      qrCodeId.childNodes[0].setAttribute("transform", "translate(44.000000, 22.000000) rotate(45.267395)");
      qrCodeId.childNodes[1].setAttribute("transform", "translate(44.000000, 22.000000) rotate(45.267395)");
    }
  }, [qrcodeValue, step]);

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
    }));
  };

  // const closeMessages = () => {
  //   setDisplayError(null);
  //   setDisplaySuccess(null);
  // };

  const sortTimeSlots = async (timeSlots) => {
    let time = {
      AM: [],
      PM: [],
    };
    timeSlots.forEach(timeSlot => {
      if (moment(timeSlot, 'HH:mm').format('a') === 'am') {
        time.AM.push(timeSlot);
      } else {
        time.PM.push(timeSlot);
      }
    });
    return time;
  }

  const handleDateChange = (date) => {
    if (date !== selectedDate) {
      setDisplayTimeSlots({});
      setSelectedDate(date);
      fetch(`${apiUrl}/schedule/available-timeslots/${user._id}/${date}`, {
        headers: {
          'testd-jwt-schedule': fetchHeaderToken
        }
      })
        .then(res => res.json())
        .then(async res => {
          setLoading(false);
          if (res.success) {
            let displayTimes = await sortTimeSlots(res.data);
            if (!displayTimes.AM.length)
              setAmpm('PM');
            setDisplayTimeSlots(displayTimes);
          } else {
            setDisplayError(res.message);
          }
        }).catch(error => {
          setLoading(false);
          setDisplayError(error.message || JSON.stringify(error));
        });
    }
  }

  const handleAmPmChange = (ampm) => {
    setAmpm(ampm);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep((step) => step + 1);
    // handleConfirm(time);
  };

  const handleAppointmentNext = () => {
    setStep((step) => step + 1);
  };

  const handleDTChange = () => {
    setStep((step) => step - 1);
  };

  const handleChangePage = (newPage) => {
    if (newPage === 'add') {
      setPage(page => page + 1);
    } else {
      setPage(page => page - 1);
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    let body = {
      phone: user._id,
      date: selectedDate,
      time: selectedTime,
      dependent_id: formState.appointment_for ? formState.appointment_for === 'Self' ? undefined : formState.appointment_for : undefined,
      type: type
    };
    fetch(`${apiUrl}/schedule/confirm`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'testd-jwt-schedule': fetchHeaderToken
      },
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        if (res.success) {
          setStep((step) => step + 1);
          setAddCalendarLink(res.data.add_calendar_link);
          setScheduleLocation(res.data.location);
          setQRcodeValue(res.data.qrcode);
          let startTime = moment(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm').format();
          let endDate = moment(startTime).add(10, "minutes").format();
          setEvent({
            title: 'TESTD APPOINTMENT',
            description: 'Testd Appointment Reminder',
            location: `${res.data.location.address}, ${res.data.location.city}, ${res.data.location.state}, ${res.data.location.zip_code}`,
            startTime: startTime,
            endTime: endDate
          });
        } else {
          setDisplayError(res.message);
        }
      }).catch(error => {
        setLoading(false);
        setDisplayError(error.message || JSON.stringify(error));
      });
    console.log(addCalendarLink)
  };

  const onScheduleAnotherAppointment = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormState({});
  };

  const getNameScheduledFor = () => {
    if (!formState.appointment_for || formState.appointment_for === 'Self') {
      return 'Self'
    } else {
      let dependent = dependentsList.find(d => d._id === formState.appointment_for);
      return dependent ? `${dependent.first_name} ${dependent.last_name}` : '';
    }
  };

  // const disableUnavailableDays = (date) => {
  //   return !availableDates[date.day() === 7 ? 1 : date.day()].active;
  // }

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

        {step === 1 && (
          !availableDates
            ?
            loading && (<CircularProgress className={classes.spinner} />)
            :
            <>
              <Grid item>
                <Typography variant="h4" className={classes.titleText}>
                  <Trans
                    i18nKey="schedule_appointment_heading"
                    default="Please choose a date and time <br /> to schedule your {{type}} appointment:"
                    values={{ type: type ? type === 'undefined' ? 'POC' : type : 'POC' }}
                  >
                  </Trans>
                </Typography>
              </Grid>

              {dependentsList.length ?
                <Grid item style={{ marginTop: 20 }}>
                  <FormControl
                    className={brandClasses.shrinkTextField}
                    required
                    fullWidth
                    variant="outlined"
                    style={{ width: 250 }}
                  >
                    <InputLabel shrink className={brandClasses.selectShrinkLabel}>Appointment for</InputLabel>
                    <Select
                      onChange={handleChange}
                      label="Appointment for* "
                      name="appointment_for"
                      value={formState.appointment_for || 'Self'}
                    >
                      <MenuItem value='Self'>Self</MenuItem>
                      {dependentsList.map((dependent, index) => (
                        <MenuItem key={index} value={dependent._id}>
                          {dependent.first_name} {dependent.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                : null
              }

              <Grid item style={{ marginTop: 20 }}>
                <Typography variant="h4" className={classes.subTitleText}>
                  {`${t('schedule_appointment_select_day')}`}
                </Typography>
              </Grid>

              <Grid item style={{ marginTop: 20 }}>
                {!availableDates && <CircularProgress className={classes.spinner} />}
                {availableDates && (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <IconButton
                        className={page === 0 ? classes.hide : ''}
                        onClick={() => handleChangePage('minus')}
                      >
                        <img src='/images/svg/chevron_left.svg' alt='chevron_left' width="25" />
                      </IconButton>
                      <div className={page === 0 ? classes.emptyIcon : classes.hide}></div>
                    </Grid>

                    {availableDates.slice(page * (isDesktop ? 5 : 2), page * (isDesktop ? 5 : 2) + (isDesktop ? 5 : 2)).map((dateObj, index) => (
                      <Grid item key={index}>
                        <Button
                          className={clsx(selectedDate === dateObj.date ? classes.activeDateBox : classes.dateBox, isDesktop ? classes.desktop : classes.mobile)}
                          // className={selectedDate === dateObj.date ? classes.activeDateBox : classes.dateBox}
                          onClick={() => handleDateChange(dateObj.date)}
                        >
                          <Grid container direction="row" justify="center" alignItems="center" >
                            <Typography
                              variant="h5"
                              style={{ padding: 5 }}
                              className={selectedDate === dateObj.date ? classes.activeDisplayDay : classes.displayDay}
                            >
                              {isDesktop ? moment(dateObj.date).format('dddd') : moment(dateObj.date).format('ddd')}
                            </Typography>
                            <Typography
                              variant="h5"
                              style={{ marginTop: 5 }}
                              className={selectedDate === dateObj.date ? classes.activeDisplayDate : classes.displayDate}
                            >
                              {isDesktop ? moment(dateObj.date).format('MMMM DD') : moment(dateObj.date).format('MMM D')}
                            </Typography>
                          </Grid>
                        </Button>
                      </Grid>
                    ))}

                    <Grid item>
                      <IconButton
                        className={(availableDates.length / (isDesktop ? 5 : 2)) <= (page + 1) ? classes.hide : ''}
                        onClick={() => handleChangePage('add')}
                      >
                        {(availableDates.length / (isDesktop ? 5 : 2)) === page}
                        <img src='/images/svg/chevron_right.svg' alt='chevron_right' width="25" />
                      </IconButton>
                      <div className={(availableDates.length / (isDesktop ? 5 : 2)) <= (page + 1) ? classes.emptyIcon : classes.hide}></div>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {selectedDate && (
                <>
                  {displayTimeSlots[ampm]
                    ?
                    <>
                      <Grid item style={{ marginTop: 20 }}>
                        <Typography variant="h4" className={classes.subTitleText}>
                          {`${t('schedule_appointment_select_time')}`}
                        </Typography>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <ButtonGroup
                          className={classes.amPmGroup}
                        >
                          <Button
                            className={ampm === 'AM' ? classes.activeAmPm : classes.amPm}
                            onClick={() => handleAmPmChange('AM')}
                          >
                            {'AM'}
                          </Button>
                          <Button
                            className={ampm === 'PM' ? classes.activeAmPm : classes.amPm}
                            onClick={() => handleAmPmChange('PM')}
                          >
                            {'PM'}
                          </Button>
                        </ButtonGroup>
                      </Grid>

                      <Grid item style={{ margin: '20px auto' }}>
                        <List className={classes.timeSlotList}>
                          {displayTimeSlots[ampm].map((time, index) => (
                            <Button
                              key={index}
                              className={classes.timeSlotButton}
                              onClick={() => handleTimeSelect(time)}
                            >
                              {moment(time, 'HH:mm').format('h:mm A')}
                            </Button>
                          ))}
                        </List>
                      </Grid>

                      <Grid item style={{ marginTop: 0 }}>
                        <Typography variant="h5" className={classes.scrollText}>
                          {`${t('schedule_appointment_scroll_down')}`}
                        </Typography>
                      </Grid>

                      <Grid item style={{ marginBottom: 20 }}>
                        <img src='/images/svg/chevron_down.svg' alt='chevron_down' width="25" />
                      </Grid>
                    </>
                    :
                    <CircularProgress className={classes.spinner} />
                  }
                </>
              )}
            </>
        )}

        {step === 2 && (
          <>
            <Grid item style={{ marginBottom: 20 }}>
              <Typography variant="h4" className={classes.titleText}>
                <Trans
                  i18nKey="confirm_appointment"
                  default="Please confirm the date & time of <br />your appointment."
                  components={{ br: <br /> }}
                >
                </Trans>
              </Typography>
            </Grid>

            <Grid item className={classes.divider}></Grid>

            <Grid item style={{ marginTop: 16, marginBottom: 0 }}>
              <Typography variant="h4" className={classes.subTitleText}>
                {t('schedule_appointment_datetime')}:
              </Typography>
            </Grid>

            <Grid item style={{ marginBottom: 30 }}>
              <Typography variant="h2" className={classes.selectedDateTime}>
                {moment(selectedDate).format('MMMM DD, YYYY')} <br />
                {moment(selectedTime, 'HH:mm').format('h:mm A')}
              </Typography>

            </Grid>

            <Grid item className={classes.divider}></Grid>

            <br /><br />

            <Grid item style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
              <Button
                className={classes.cancelButton}
                classes={{ disabled: classes.buttonDisabled }}
                onClick={handleDTChange}
                disabled={loading}
              >
                {'CHANGE '} {loading ? <CircularProgress size={20} className={classes.spinner} /> : ''}
              </Button>
              <br />
              <Button
                className={classes.confirmButton}
                classes={{ disabled: classes.buttonDisabled }}
                onClick={handleConfirm}
                disabled={loading}
              >
                {`${t('schedule_appointment_next')} `} {loading ? <CircularProgress size={20} className={classes.spinner} /> : ''}
              </Button>
            </Grid>

            <Grid item style={{ marginBottom: 20 }}></Grid>

          </>
        )}

        {step === 3 && (
          <>
            <Grid item style={{ marginBottom: 20 }}>
              <Typography variant="h4" className={classes.titleText}>
                <Trans
                  i18nKey="schedule_appointment_thank_you"
                  default="Thank you for booking <br />your appointment."
                  components={{ br: <br /> }}
                >
                </Trans>
              </Typography>
            </Grid>

            <Grid item style={{ marginTop: 16, marginBottom: 0 }}>
              <Typography variant="h4" className={classes.subTitleText}>
                {t('schedule_appointment_datetime')}:
              </Typography>
            </Grid>

            <Grid item style={{ marginBottom: 30 }}>
              <Typography variant="h2" className={classes.selectedDateTime}>
                {moment(selectedDate).format('MMMM DD, YYYY')} <br />
                {moment(selectedTime, 'HH:mm').format('h:mm A')}
              </Typography>
            </Grid>
            <Grid >
              <AddToCalendar
                event={event}
                buttonTemplate={icon}
                buttonLabel={`${t('schedule_appointment_add_to_calendar')} `}
              />
            </Grid>

            <br /><br />

            <Grid item className={classes.divider}></Grid>

            <Grid item style={{ marginBottom: 20 }}>
              <Typography variant="h4" className={classes.subTitleText}>
                {t('schedule_appointment_test_location')}:
              </Typography>
              <Typography variant="h4" className={classes.description}>
                {scheduleLocation.unit && `${scheduleLocation.unit} ${<br />}`}
                {scheduleLocation.address} <br />
                {scheduleLocation.city}, {scheduleLocation.state} {scheduleLocation.zip_code} <br />
              </Typography>
            </Grid>

            {/* <Grid item className={classes.divider}>
            </Grid> */}

            <Grid item style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
              {/* <Button
                className={classes.cancelButton}
                classes={{ disabled: classes.buttonDisabled }}
                onClick={handleDTChange}
                disabled={loading}
              >
                {'CHANGE '} {loading ? <CircularProgress size={20} className={classes.spinner} /> : ''}
              </Button>
              <br /> */}
              <Button
                className={classes.confirmButton}
                classes={{ disabled: classes.buttonDisabled }}
                onClick={handleAppointmentNext}
                disabled={loading}
              >
                {`${t('schedule_appointment_next')} `} {loading ? <CircularProgress size={20} className={classes.spinner} /> : ''}
              </Button>
            </Grid>

            <Grid item style={{ marginBottom: 20 }}>

            </Grid>

            {/* <Grid item style={{ marginTop: 60, marginBottom: 20 }}>
              <img src='/favicon.svg' alt='favicon' width="25" />
            </Grid> */}
          </>
        )}

        {step === 4 && (
          <>
            <Grid item style={{ marginBottom: 15 }}>
              <Typography variant="h4" className={classes.titleText}>
                <Trans
                  i18nKey="schedule_appointment_please_move"
                  default=" Please move to the next<br /> station and present your<br /> Rapid Pass"
                  components={{ br: <br /> }}
                >
                </Trans>
              </Typography>
            </Grid>

            <Grid item style={{ marginTop: 16 }}>
              <Typography variant="h4" className={classes.subTitleText}>
                Scheduled for:
              </Typography>
            </Grid>

            <Grid item style={{ marginBottom: 16 }}>
              <Typography variant="h2" className={classes.selectedDateTime}>
                {getNameScheduledFor()}
              </Typography>
            </Grid>

            <Grid item className={classes.divider}></Grid>

            <Grid item style={{ marginTop: 10 }}>
              <Typography variant="h4" className={classes.subTitleText}>
                {t('schedule_appointment_datetime')}:
              </Typography>
            </Grid>

            <Grid item style={{ marginTop: 10, marginBottom: 16 }}>
              <Typography variant="h2" className={classes.selectedDateTime}>
                {moment(selectedDate).format('MMMM DD, YYYY')} <br />
                {moment(selectedTime, 'HH:mm').format('h:mm A')}
              </Typography>
            </Grid>

            <Grid item className={classes.divider}></Grid>
            <br />

            <Button
              className={clsx(brandClasses.button, brandClasses.whiteButton)}
              size="large"
              onClick={onScheduleAnotherAppointment}
            >
              Schedule Another Family-Member
            </Button>

            {/* <Grid item className={classes.divider}></Grid>

            <Grid item >
              <Typography variant="h4" className={classes.subTitleText}>
                Test date and time:
              </Typography>
            </Grid> */}

            {/* <Grid item style={{ marginBottom: 20 }}>
              <Typography variant="h2" className={classes.selectedDateTime}>
                {moment(selectedDate).format('MMMM DD, YYYY')} <br />
                {moment(selectedTime, 'HH:mm').format('h:mm A')}
              </Typography>
            </Grid>

            <Grid item className={classes.divider}>
            </Grid>

            <Grid item style={{ marginBottom: 30 }}>
              <Typography variant="h4" className={classes.subTitleText}>
                Testing site address
              </Typography>
              <Typography variant="h4" className={classes.description}>
                {scheduleLocation.unit && `${scheduleLocation.unit} ${<br />}`}
                {scheduleLocation.address} <br />
                {scheduleLocation.city}, {scheduleLocation.state} {scheduleLocation.zip_code} <br />
              </Typography>
            </Grid>

            <Grid item className={classes.divider}>
            </Grid> */}

            <Grid item >
              {/* <Button
                className={classes.confirmButton}
                component="a"
                href={addCalendarLink}
                target="_blank"
              >
                {'Add to Calendar'}
              </Button> */}

              {/* <div title="Add to Calendar" className="addeventatc">
                {'Add to Calendar'}
                <span className="start">12/14/2020 08:00 AM</span>
                <span className="end">12/14/2020 10:00 AM</span>
                <span className="timezone">America/Los_Angeles</span>
                <span className="title">Summary of the event</span>
                <span className="description">Description of the event</span>
                <span className="location">Location of the event</span>
              </div> */}

              {/* {scheduleLocation.state &&
                <div title="Add to Calendar" className="addeventatc">
                  {'Add to Calendar'}
                  <span className="start">{`${moment(selectedDate).format('MM/DD/YYYY')} ${moment(selectedTime, 'HH:mm').format('h:mm A')}`}</span>
                  <span className="end">{`${moment(selectedDate).format('MM/DD/YYYY')} ${moment(selectedTime, 'HH:mm').add(10, 'minute').format('h:mm A')}`}</span>
                  <span className="timezone">America/New_York</span>
                  <span className="title">TESTD APPOINTMENT</span>
                  <span className="description">Testd Appointment Reminder</span>
                  <span className="location">
                    {`${scheduleLocation.unit ? `${scheduleLocation.unit}, ` : ''} ${scheduleLocation.address}, ${scheduleLocation.city}. ${scheduleLocation.state} - ${scheduleLocation.zip_code}`}
                  </span>
                </div>
              } */}
            </Grid>

            {/* <Grid item >
              <img src='/images/svg/rapid_test_card.svg' alt='' />
            </Grid> */}

            <Grid item >
              {qrcodeValue &&
                <RapidPassCard
                  className={classes.rapidPass}
                  showTestd={clientServer === 'prod006' ? false : true}
                  qrcode={<QRCode
                    id="rapid-pass-qr-code-id"
                    renderAs="svg"
                    fgColor="#0F84A9"
                    value={qrcodeValue}
                  />}
                />
              }
            </Grid>

            <Grid item style={{ marginBottom: 20 }}></Grid>

            {clientServer === 'prod007' &&
              <Typography variant="h4" style={{ color: '#DD2525', textAlign: 'center', marginTop: 36 }}>
                **Please bring a copy of your health visa**
              </Typography>
            }

            <Grid item className={classes.walletRow}>
              <div className={classes.walletContainer}>
                <img src='/images/svg/Icon Copy.svg' alt='' style={{ width: 56 }} />
                <Typography variant="h4" style={{ paddingBottom: 3 }}>
                  <span>{t('schedule_appointment_add_to')}</span> <br />
                  Apple Wallet
                </Typography>
              </div>
              <div className={classes.walletContainer}>
                <img src='/images/svg/android_wallet copy.svg' alt='' />
                <Typography variant="h4">
                  <span>{t('schedule_appointment_add_to')}</span> <br />
                  Passbook
                </Typography>
              </div>
            </Grid>

            {/* <Grid item style={{ marginTop: 60, marginBottom: 20 }}>
              <img src='/favicon.svg' alt='favicon' width="25" />
            </Grid> */}
          </>
        )}
      </Grid>
      <br />
      <br />
      <br />
      <br />

      {/* <AppBar position="fixed" className={classes.footer}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" style={{ color: 'white' }}>
            Privacy &nbsp;&nbsp; | &nbsp;&nbsp; Terms &nbsp;&nbsp; | &nbsp;&nbsp; COVID-19 Information
          </Typography>
        </Toolbar>
      </AppBar> */}

    </div >
  )
};

ScheduleAppointment.propTypes = {
  user: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  backTab: PropTypes.func.isRequired,
};

export default withRouter(ScheduleAppointment);
