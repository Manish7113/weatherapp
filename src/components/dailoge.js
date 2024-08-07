'use client'
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Slide, Grid, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { Country, State, City }  from 'country-state-city';




export default function Dailoge({  isOpen = 'false', handleClose, sendCity }) {

  
    const handleToggle = () => {
      handleClose()

    };

    console.log(City?.getAllCities())

    return (
        <React.Fragment>

            <Dialog
                open={isOpen}
                keepMounted
                onClose={handleToggle}
                aria-describedby="alert-dialog-slide-description"
            >
                <Grid container spacing={0}>
                    <Grid item xs={11} sm={11} lg={11} xl={11}>
                        <DialogTitle>{"Select Your City"}</DialogTitle>

                    </Grid>
                    <Grid item xs={1} sm={1} lg={1} xl={1} className='d-flex justify-content-center align-items-start pt-2'>
                        <button className='border-0 fs-lgg closeButton' onClick={handleToggle}><Icon icon="fontisto:close" /></button>

                    </Grid>

                </Grid>
                        <DialogContent>
                           <Grid container spacing={5}>
                            <Grid item xs={12} sm={12} lg={6} xl={6}>

                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} xl={6}></Grid>
                            <Grid item xs={12} sm={12} lg={6} xl={6}></Grid>
                           </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' color='secondary' onClick={handleToggle}>Cancel</Button>
                            <Button variant='contained' color='error' type='submit'>Submit</Button>
                        </DialogActions>
            
           


            </Dialog>
        </React.Fragment>
    );
}