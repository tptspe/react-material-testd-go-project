import { makeStyles } from '@material-ui/styles';

const brandStyles = makeStyles(theme => ({
  brandText: {
    color: theme.palette.brand,
  },
  brandDarkText: {
    color: theme.palette.brandDark,
  },
  brandGrayText: {
    color: theme.palette.brandGray,
  },

  // logon page
  loginButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.brand,
    borderRadius: '10px',
    textTransform: 'none',
    letterSpacing: '0',
    lineHeight: '37px',
    textAlign: 'center',
    '&:hover': {
      color: theme.palette.white,
      backgroundColor: theme.palette.brand,
    },
  },
  logonBox: {
    borderColor: theme.palette.brand,
    borderRadius: '10px',
    borderStyle: 'solid',
    borderWidth: '1.5px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.brand,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.brandDark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.brand,
      },
    }
  },
  // dashboard page
  dashboardInfoCard: {
    // backgroundColor: theme.palette.white,
    // boxShadow: "none",
    // borderColor: theme.palette.brandDark,
    // borderRadius: '8px',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    padding: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    // marginBottom: theme.spacing(2),
  },
  dashboardMapCard: {
    backgroundColor: theme.palette.white,
    boxShadow: "none",
    borderColor: theme.palette.brandDark,
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '3px',
    height: '50vh'
  },
  // basic input
  shrinkTextField: {
    display: 'flex',
    '& .MuiOutlinedInput-root': {
      boxShadow: `4px 4px 8px 2px ${theme.palette.brandBackLight}`,
      borderRadius: 10,
      overflow: 'hidden',
      '& .MuiOutlinedInput-input': {
        padding: 12,
        paddingRight: 30,
        fontSize: 14,
        color: theme.palette.brandDark,
        backgroundColor: 'white',
      },
      '& fieldset': {
        borderColor: theme.palette.brandDark,
        borderRadius: 10,
        borderWidth: 1,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.brand,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.brandDark,
      },
    },
    '& .MuiInputLabel-shrink': {
      color: theme.palette.brandDark,
      // fontWeight: 600,
      // fontSize: theme.spacing(2)
    },
    '& .MuiFormLabel-asterisk': {
      color: theme.palette.brandRed,
    },
    '& .MuiInputLabel-asterisk': {
      color: theme.palette.brandRed,
    },
  },
  shrinkInputLabel2: {
    // color: theme.palette.brandDark,
    transform: 'translate(14px, 14px) scale(1)',
    '& .MuiInputLabel-outlined': {

    }
  },
  selectPlaceholder: {
    color: theme.palette.brandGray,
  },
  selectShrinkLabel: {
    background: theme.palette.white,
    left: -5,
    padding: '0 8px'
  },
  selectExpandIcon: {
    '& .MuiSelect-icon': {
      color: theme.palette.white,
      width: 50,
      height: '100%',
      borderRadius: '0 10px 10px 0',
      backgroundColor: theme.palette.brandDark,
      right: 0,
      top: 'auto'
    }
  },
  button: {
    color: theme.palette.white,
    backgroundColor: theme.palette.brand,
    borderRadius: 10,
    textTransform: 'none',
    letterSpacing: 1,
    display: 'flex',
    fontWeight: 600,
    border: `1px solid ${theme.palette.brandDark}`,
    // fontSize: 16,
    lineHeight: 2,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    minWidth: 120,
    '&:hover': {
      backgroundColor: theme.palette.brandDark,
    },
  },
  reportBtn: {
    color: theme.palette.brandDark,
    border: `0.7px solid ${theme.palette.brandDark}`,
    backgroundColor: theme.palette.white,
    boxShadow: '2px 2px 2px 0 rgba(15,132,169,0.15)',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    '&:hover': {
      color: theme.palette.white,
      backgroundColor: theme.palette.brandDark,
    }
  },
  disabledButton:{
    backgroundColor: '#D8D8D8 !important',
    color: 'white !important'
  },
  buttonDisabled: {
    backgroundColor: theme.palette.white,
    border: `1.5px solid ${theme.palette.brandDark}`
  },
  whiteButton: {
    backgroundColor: theme.palette.white,
    color: theme.palette.brandDark,
    '&:hover': {
      backgroundColor: theme.palette.brandDark,
      color: theme.palette.white,
    }
  },
  tableRow2: {
    backgroundColor: theme.palette.sideMenuBgColor,
  },
  progressSpinner: {
    color: theme.palette.brandDark,
    marginLeft: theme.spacing(1)
  },
  progressSpinnerWhite: {
    color: theme.palette.white,
    marginLeft: theme.spacing(1)
  },
  fetchProgressSpinner: {
    display: 'flex',
    color: theme.palette.brandDark,
    marginTop: theme.spacing(4),
    margin: 'auto',
  },
  tableHead: {
    padding: '8px 16px !important',
    backgroundColor: `${theme.palette.white} !important`,
    [theme.breakpoints.down('lg')]: {
      padding: '2px 8px !important',
    },
  },
  tableHead2: {
    padding: '8px 16px !important',
    backgroundColor: `${theme.palette.white} !important`,
    [theme.breakpoints.down('lg')]: {
      padding: '8px 8px !important',
    },
  },
  tableCell: {
    padding: '2px 16px !important',
    fontWeight: 100,
    [theme.breakpoints.down('lg')]: {
      padding: '2px 8px !important',
    },
  },
  tableCell2: {
    padding: '7px 16px !important',
    fontWeight: 100,
    [theme.breakpoints.down('lg')]: {
      padding: '7px 8px !important',
    },
  },
  settingIconBox: {
    width: '40px',
    height: '40px',
    display: 'block',
    fontFamily: 'verdana',
    fontSize: '22px',
    padding: 0,
    margin: 0,
    border: 'solid 1px rgba(155,155,155,0.5)',
    outline: 0,
    lineHeight: '50px',
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.white,
    background: theme.palette.white,
  },
  settingIcon: {
    fontSize: '2rem',
    marginTop: 4,
    color: 'rgba(155,155,155,0.5)',
  },
  tableSortLabel: {
    color: `${theme.palette.brand} !important`
  },
  headerContainer: {
    padding: '32px 34px 0 !important',
  },
  headerTitle: {
    color: theme.palette.brandText,
    fontSize: 24,
    fontWeight: 400,
    // display: 'flex',
    alignItems: 'flex-end',
    '& img': {
      marginRight: 8,
      width: 20
    }
  },
  headerTitle2: {
    color: theme.palette.brandText,
    fontSize: 24,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: 8,
      width: 20
    }
  },
  headerSubTitle: {
    color: theme.palette.brandText,
    marginLeft: 24
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontWeight: '600',
      color: theme.palette.brandText,
      marginLeft: theme.spacing(4)
    }
  },
  subHeaderBlueDark: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.brandBackHeavy,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    '& h4, h5': {
      fontWeight: '500',
      color: theme.palette.white,
      // marginLeft:theme.spacing(4)
    }
  },
  subHeaderDark: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.blueDark,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    '& h4, h5': {
      fontWeight: '500',
      color: theme.palette.white,
      // marginLeft:theme.spacing(4)
    }
  },
  naTitle: {
    position: 'relative',
    top: 10
  },
  naCheckbox: {
    '& .MuiTypography-body1': {
      color: 'white !important'
    }
  },
  footerButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2)
  },
  statusIcon: {
    width: '20px',
    height: '20px'
  },
  tableRow1: {
    backgroundColor: `${theme.palette.brandBackLight}`,
    "&:hover": {
      backgroundColor: `${theme.palette.brandBackLight} !important`
    }
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '25px',
      cursor: 'pointer'
    }
  },
  tableActionBar: {
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    margin: '0px auto'
  },
  tableActionBar2: {
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '0px auto'
  },
  searchBar: {
    paddingRight: 20
  },
  tablePagination: {
  },
  tablePaginationCaption: {
    color: theme.palette.brandDark
  },
  tablePaginationSelectIcon: {
    color: theme.palette.brandDark
  },
  tablePaginationSelect: {
    color: theme.palette.brandDark
  },
  tablePaginationActions: {
    color: theme.palette.brandDark
  },
  orangeBoard: {

    backgroundColor: theme.palette.brandOrange,
    '& h1, h3, h6': {
      color: theme.palette.white,
    }
  },
  skyBlueBoard: {
    backgroundColor: theme.palette.brand,
    '& h1, h3, h6': {
      color: theme.palette.white,
    }
  },
  barChartRoot: {
    padding: theme.spacing(2),
  },
  barChartContainer: {
    padding: theme.spacing(2),
    border: `solid 1px ${theme.palette.brandBackHeavy}`,
    boxShadow: `4px 4px 8px 2px ${theme.palette.brandBackLight}`,
    borderRadius: 8
  },
  pieChartRoot: {
    padding: theme.spacing(0),
    margin: '20px auto',
  },
  pieChartContainer: {
    // border: '1px solid #0F84A9;'
  },
  barChartLabel: {
    color: theme.palette.brandDark,
    fontSize: '26px',
    fontWeight: 500,
    textAlign: 'left',
    margin: '15px 0',
    [theme.breakpoints.up('lg')]: {
      fontSize: '26px',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '22px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  emptyTestResult: {
    color: theme.palette.blueDark,
    fontWeight: 'bold',
  },
  resultStatusIcon: {
    width: '25px',
    display: 'flex',
    // margin: '0 auto',
    // height: '30px'
  },
  // tabs  
  appBar: {
    backgroundColor: '#3F9DBA',
  },
  tabsIndicator: {
    backgroundColor: '#3F9DBA',
  },
  tabsWrapper: {
    '& .MuiTouchRipple-root': {
      borderRight: 'solid #043B5D 1px',
      height: '60%',
      marginTop: 10,
    }
  },
  tabsSelected: {
    '&.Mui-selected .MuiTab-wrapper': {
      borderBottom: 'solid white 2px'
    }
  },
  subTabWrapper: {
    '& .MuiTouchRipple-root': {
      borderRight: 'solid #fff 1px',
      height: '60%',
      marginTop: 10,

    },
    '&:last-child .MuiTouchRipple-root': {
      borderRight: 'solid #fff 0px',
      height: '60%',
      marginTop: 10,
    },
    '&.Mui-selected .MuiTab-wrapper': {
      borderBottom: 'solid white 2px'
    }
  },
  sigPad: {
    width: '100%',
    height: '100%'
  },
  signBoxContanier: {
    // height: 218,
    border: `solid 1px`,
    borderColor: theme.palette.brandDark,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    boxShadow: '4px 4px 8px 2px rgba(15,132,169,0.15)'
  },
  signBoxTitle: {
    color: theme.palette.brandDark,
    fontWeight: 600,
    position: 'absolute',
    top: -10,
    background: '#fff',
    padding: '0 4px'
  },
  signBoxDesc: {
    color: theme.palette.brandGray,
    padding: '4px 10px',
  },
  // upload image styles
  uploadedPhoto: {
    maxWidth: 150,
    maxHeight: 150,
    paddingTop: 10
  },
  uploadContanier: {
    border: `solid 1px`,
    borderColor: theme.palette.brandDark,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    boxShadow: '4px 4px 8px 2px rgba(15,132,169,0.15)'
  },
  uploadImageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& img': {
      marginRight: 10,
      width: 30
    }
  },
  uploadTitle: {
    color: '#0F84A9',
    fontSize: 10,
    position: 'absolute',
    top: -10,
    background: '#fff',
    padding: '0 4px'
  },
  uploadDesc: {
    color: '#9B9B9B',
    fontSize: 14,
    padding: '4px 10px'
  },
  uploadInput: {
    display: 'none',
  },
  hideElement: {
    display: 'none',
  },
  logonButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#0F84A9',
    fontSize: 20,
    fontWeight: 500,
    marginTop: 30,
    marginBottom: 30,
    color:'#fff',

    "& span": {
      justifyContent: 'space-around'
    },
    [theme.breakpoints.up(440)]: {
      marginTop: 50,
      width: 180,
    },
    '&:hover':{
      backgroundColor: '#0F84A9',
      color:'#fff',
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
    marginBottom: 30,
    color: '#0F84A9',
    border: '#0F84A9 solid 1px',
    '&:hover': {
      backgroundColor: '#FFF',
      color: '#0F84A9',
    },
    "& span": {
      justifyContent: 'space-around'
    },
    [theme.breakpoints.up(440)]: {
      marginTop: 50,
      width: 180,
    }
  },
}), { index: 1 });

export default brandStyles;