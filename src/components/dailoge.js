'use client'
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  Grid, Button, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import {  FormControl,  Typography, Select, MenuItem, InputLabel } from '@mui/material';





export default function Dailoge({ isOpen = 'false', handleClose, sendCity }) {

    const [countriesList, setCountriesList] = React.useState([]);
    const [stateList, setStateList] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);

    const fullWidth = true;
    const maxWidth = 'sm'

    const schema = yup.object().shape({
        selectedCountry: yup.string().required().label('Country '),
        selectedCity: yup.string().required().label('City '),
        selectedState: yup.string().required().label('State'),
       
    });

    const { handleSubmit, control, reset,getValues,trigger, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    })

    React.useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result)
        });
    }, []);

    const getStateByCountry = (countryId) =>{
        GetState(countryId).then((result) => {
            setStateList(result);
          });

    }
    const getCityByState = (stateId) =>{
        const countryId = getValues('selectedCountry')
        GetCity(countryId, stateId).then((result) => {
            setCityList(result);
           
          });

    }


    const OnSubmit = (values) => {
        sendCity(values.selectedCity)
        handleClose()
    }

    const handleToggle = () => {
        handleClose()
        reset()

    };


    return (
        <React.Fragment>

            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={isOpen}
                onClose={handleToggle}
                aria-labelledby="max-width-dialog-title"
            >
                <Box className='d-flex justify-content-between align-items-start'>
                    <DialogTitle id="max-width-dialog-title">Select Your City</DialogTitle>
                    <button className='border-0 fs-lgg closeButton me-3 mt-2' onClick={handleToggle}><Icon icon="fontisto:close" /></button>

                </Box>
              
                    
                    <form autoComplete='off' onSubmit={handleSubmit(OnSubmit)} className='w-100 mb-3 ' >

                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container spacing={2}>
                                    

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" error={errors?.selectedCountry ? true : false} >Country</InputLabel>
                                            <Controller
                                                control={control}
                                                name="selectedCountry"
                                                render={({ field: { onChange, value } }) => (

                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={value}
                                                        label="Country"
                                                        onChange={(e)=>{
                                                            onChange(e.target.value)
                                                            getStateByCountry(e.target.value)
                                                            trigger('selectedCountry')
                                                        }}
                                                        error={errors?.selectedCountry ? true : false}
                                                    >
                                                        {
                                                            countriesList?.map((item, index)=>{
                                                                return(
                                                                    <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>

                                                                )
                                                            })

                                                        }
                                                       

                                                    </Select>



                                                )}
                                            />
                                            <Typography variant='subtitle2' color={'error'} className='ps-2'>{errors?.selectedCountry ? errors?.selectedCountry?.message : ''} </Typography>


                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" error={errors?.selectedState ? true : false} >State</InputLabel>
                                            <Controller
                                                control={control}
                                                name="selectedState"
                                                render={({ field: { onChange, value } }) => (

                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={value}
                                                        label="State"
                                                        onChange={(e)=>{
                                                            onChange(e.target.value)
                                                            getCityByState(e.target.value)
                                                        }}
                                                        error={errors?.selectedState ? true : false}
                                                    >
                                                        {
                                                            stateList?.map((item, index)=>{
                                                                return(
                                                                    <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>

                                                                )
                                                            })

                                                        }
                                                       

                                                    </Select>



                                                )}
                                            />
                                            <Typography variant='subtitle2' color={'error'} className='ps-2'>{errors?.selectedState ? errors?.selectedState?.message : ''} </Typography>


                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" error={errors?.selectedCity ? true : false} >City</InputLabel>
                                            <Controller
                                                control={control}
                                                name="selectedCity"
                                                render={({ field: { onChange, value } }) => (

                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={value}
                                                        label="City"
                                                        onChange={(e)=>{
                                                            onChange(e.target.value)
                                                        }}
                                                        error={errors?.selectedCity ? true : false}
                                                    >
                                                        {
                                                            cityList?.map((item, index)=>{
                                                                return(
                                                                    <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>

                                                                )
                                                            })

                                                        }
                                                       

                                                    </Select>



                                                )}
                                            />
                                            <Typography variant='subtitle2' color={'error'} className='ps-2'>{errors?.selectedCity ? errors?.selectedCity?.message : ''} </Typography>


                                        </FormControl>
                                    </Grid>
                                    


                                </Grid>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          
                            <Button variant='contained' color='primary' type='submit'>Submit</Button>
                            <Button onClick={handleToggle} color="primary">
                        Close
                    </Button>
                        </DialogActions>
                    </form>
                  

                
               
            </Dialog>

            
        </React.Fragment>
    );
}