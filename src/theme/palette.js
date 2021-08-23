import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  brand: '#3ECCCD',
  brandDark: '#0F84A9',
  blueDark: '#043B5D',
  brandGray: '#9B9B9B',
  brandGreen: '#25DD83',
  brandDisableGray: '#D8D8D8',
  brandRed: '#DD2525',
  brandText: '#043B5D',
  brandOrange: '#FF931E',
  sideMenuBgColor: '#DAECF2',
  sideMenuItemActiveColor: '#74B7CD',
  sideMenuItemInActiveColor: '#DAECF2',
  sideMenuActiveColor: '#FFFFFF',
  sideMenuInActiveColor: '#6E93A7',
  brandBackdrop: 'rgba(15,132,169,0.3)',
  brandBackLight: 'rgba(15,132,169,0.15)',
  brandBackHeavy: 'rgba(15,132,169,0.8)',
  drawerWidth: 260,
  primary: {
    contrastText: white,
    dark: '#043B5D',
    main: '#0F84A9',
    light: '#3ECCCD'
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: '#0F84A9',
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
