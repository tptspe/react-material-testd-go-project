import React from 'react';
import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
        border: '1px solid #3ECCCD',
        borderRadius: '8px',
        boxShadow: '4px 5px 8px 2px rgba(15,132,169,0.15)',
        margin: '4px 10px'
    },

    content: {
        textAlign: 'center',
        padding: 0
    },
    colorGray: {
        color: '#9B9B9B !important'
    },
    buttonRed: {
        color: '#DD2525 !important',
        borderColor: '#DD2525 !important',
    },
    actionButtonRow: {
        display: 'flex',
        justifyContent: 'space-around'
    }

}));

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
    root: {
        width: '100%',
    },
    palette: {
        primary: {
            main: '#0F84A9',
        },
    },
    overrides: {
        MuiSelect: {
           
            select: {
                color: '#9B9B9B',
                padding:'8px 14px',
                width:130,
                fontFamily: 'Montserrat',
                "&:focus": {
                    borderColor: '#0F84A9',
                },
                '&:before': {
                    borderColor: '#0F84A9'
                },
                '&:after': {
                    borderColor: '#0F84A9',
                },
                [defaultTheme.breakpoints.up('lg')]: {
                    width:120,
                },
                [defaultTheme.breakpoints.between('md', 'lg')]: {
                    width:80,
                },
                [defaultTheme.breakpoints.down('sm')]: {
                    width: 60,
                },
            },

            iconOutlined: {
                color: '#9B9B9B',
                width: 40,
                marginLeft: 10,
                height: '100%',
                top: 0,
                right: 0,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                // backgroundColor:'#0F84A9'
                [defaultTheme.breakpoints.up('lg')]: {
                    width:40,
                    color:'rgba(15,132,169,0.8)'
                },
                [defaultTheme.breakpoints.between('md', 'lg')]: {
                    width:30,
                },
                [defaultTheme.breakpoints.down('sm')]: {
                    width: 20,
                },
            }
        }

    }
});

export default function CustomSelectBox(props) {
    const classes = useStyles();
    const [location, setLocation] = React.useState(0);

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div className={classes.root} >
            <ThemeProvider theme={theme}>
                <FormControl variant="outlined" className={classes.locationName}>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Select
                        id="schedule-department"
                        value={location}
                        onChange={handleChange}
                    // className={classes.locationName}
                    // IconComponent={ExpandMoreIcon}
                    >
                        {props.data.map((item, index) => {
                            return (<MenuItem value={item.value} key={index}>{item.label}</MenuItem>)
                        })
                        }
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}