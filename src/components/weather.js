import { Icon } from "@iconify/react"
import { Grid, TextField } from "@mui/material"
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

const customTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': '#E0E3E7',
                        '--TextField-brandBorderFocusedColor': '#E0E3E7',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });



export default function Weather() {
    const outerTheme = useTheme();

    let d = new Date()

    const getCurrentDay = () => {
        const crrday = d?.getDay()
        switch (crrday) {
            case 0: return 'Sun'
                break;
            case 1: return 'Mon'
                break;
            case 2: return 'Tue'
                break;
            case 3: return 'wed'
                break;
            case 4: return 'Thr'
                break;
            case 5: return 'Fri'
                break;
            case 6: return 'Sat'
                break;
            default: return ''
                break;

        }

    }
    return (
        <div className="weatherPageContainer">
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <div className="leftSideContainer d-flex flex-column justify-content-between align-items-start p-5 gap-5  ">
                        <p className="upperContainer p-2 px-4 rounded-3">Rainy Weather</p>

                        <div className="d-flex justify-content-around align-items-center flex-wrap gap-4 bottomContainer p-3 rounded-3">
                            <h1 className="centigrade">08°</h1>
                            <div className="d-felx flex-column gap-0">
                                <h4 className="p-0 m-0 city"> London</h4>
                                <p className="p-0 m-0 ">{d?.getHours()} : {d?.getMinutes()} {' '} {getCurrentDay()} {d.getDate()} {'Jul'} {d.getFullYear()}</p>
                            </div>
                            <div>
                                <Icon icon="ion:rainy-outline" className="icon" />
                                <p className="m-0 p-0">rainy</p>
                            </div>

                        </div>

                    </div>


                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className="rightSide ps-5">
                        <Grid conatiner spacing={5}>
                            <Grid item xs={12} sm={12}>
                                <div className="d-flex justify-content-between align-items-end gap-5">
                                   <input type='text' className="inputField" placeholder="Another Location"></input>

                                    <div className="iconContainer d-flex justify-content-center align-items-center rounded-2" >
                                        <Icon icon="quill:search" width="32" height="32" />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="mt-5">
                                    
                                    <p className="nearCityName">New Jerssy</p>
                                    <p className="nearCityName">Manchaster</p>
                                    <p className="nearCityName">NewYork</p>
                                    <p className="nearCityName">Callifornia</p>
                                </div>
                                <div className="breakerLine"></div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="mt-4">
                                    <p className="nearCityName">Weather Details</p>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Cloudy</p>
                                        <p className="nearCityName white">86%</p>

                                    </div>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Humidity</p>
                                        <p className="nearCityName white">68%</p>

                                    </div>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Wind</p>
                                        <p className="nearCityName white">8Km/h</p>

                                    </div>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Rain</p>
                                        <p className="nearCityName white">8mm</p>

                                    </div>

                                </div>
                            </Grid>



                        </Grid>


                    </div>
                </Grid>




            </Grid>










        </div>

    )
}