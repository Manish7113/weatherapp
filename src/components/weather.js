import { Icon } from "@iconify/react"
import { Grid } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import React from 'react';
import Dailoge from "./dailoge";



export default function Weather() {

    const [crrForcast , setCrrForcast] = useState({})
    const [city , setCity] = useState('Indore')
    const [backgroundClass , setBackgroundClass] = useState('clear')
    const [daialog , setDaialog] = useState({isOpen : false})
    const [otherCity, setOtherCity] = useState(['Ujjain', 'Indore', 'Ratlam', 'Dewas'])


    useEffect(()=>{
        getCurrentWeather()
        
    },[city])

    const getCurrentWeather = async() =>{
        try{
            const response = await axios({
                method: 'get',
                url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=1&aqi=yes&alerts=yes`,
               
              });
              if(response?.data)
              {
                console.log(response?.data)
                setCrrForcast(response?.data)
                getBackgroundImage(response?.data)
              }
        }
        catch(error)
        {
            console.log(error , '--------------------')
        }
       

    }
   

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


    const toggleDailog = () =>{
        setDaialog({isOpen : false})
    }

    const getCity = (city) =>{
        console.log(city)

    }


    const getBackgroundImage = (data)=>{
        console.log(data?.current?.condition?.text , '====================================')
        switch(data?.current?.condition?.text)
        {
            case 'Partly cloudy' : 
            setBackgroundClass('Pcloudy')
            break;
            case 'Patchy rain nearby' : 
            setBackgroundClass('Prain')
            break;
            case 'Light rain shower' : 
            setBackgroundClass('Prain')
            break;
            case 'Patchy light drizzle' : 
            setBackgroundClass('pdrizzel')
            break;
            case 'Patchy light rain with thunder' : 
            setBackgroundClass('prainThunder')
            break;
            case 'Patchy light rain' : 
            setBackgroundClass('PrainLight')
            break;
            case 'Light drizzle' : 
            setBackgroundClass('PrainLight')
            break;
            default: setBackgroundClass('clear')
            break;

        
        }
      
    }

  
    return (
        <div className={`weatherPageContainer ${backgroundClass}` }>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <div className="leftSideContainer d-flex flex-column justify-content-between align-items-start p-5 gap-5  ">
                        <p className="upperContainer p-2 px-4 rounded-3">{crrForcast?.forecast?.forecastday[0]?.day?.condition?.text}</p>

                        <div className="d-flex justify-content-around align-items-center flex-wrap gap-4 bottomContainer p-3 rounded-3">
                            <h1 className="centigrade">{crrForcast?.current?.temp_c || ''}°</h1>
                            <div className="d-felx flex-column gap-0">
                                <h4 className="p-0 m-0 city"> {crrForcast?.location?.name || ''}</h4>
                                <p className="p-0 m-0 ">{d?.getHours()} : {d?.getMinutes()} {' '} {getCurrentDay()} {d.getDate()} {'Jul'} {d.getFullYear()}</p>
                            </div>
                            <div>
                                <Icon icon="ion:rainy-outline" className="icon" />
                                <p className="m-0 p-0">{crrForcast?.current?.condition?.text}</p>
                            </div>

                        </div>

                    </div>


                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className="rightSide ps-5">
                        <Grid conatiner spacing={5}>
                            <Grid item xs={12} sm={12}>
                                <div className="d-flex justify-content-between align-items-end gap-5">
                                   <input type='text' className="inputField" placeholder="Another Location" onClick={()=>{
                                    setDaialog({isOpen : true})
                                   }}></input>

                                    <button className="iconContainer d-flex justify-content-center align-items-center rounded-2 white" >
                                        <Icon icon="quill:search" width="32" height="32" />
                                    </button>
                                </div>
                            </Grid>
                           {otherCity?.length ?  <Grid item xs={12} sm={12}>
                                <div className="mt-5">
                                    {otherCity?.map((item, index)=>(
                                        <p key={index} className="nearCityName" onClick={()=>{
                                            setCity(item)
                                        }}>{item}</p>

                                    ))}
                                    
                                   
                                </div>
                                <div className="breakerLine"></div>
                            </Grid> : ''}
                            <Grid item xs={12} sm={12}>
                                <div className="mt-4">
                                    <p className="nearCityName">Weather Details</p>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Cloudy</p>
                                        <p className="nearCityName white">{crrForcast?.current?.cloud}%</p>

                                    </div>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Humidity</p>
                                        <p className="nearCityName white">{crrForcast?.current?.humidity}%</p>

                                    </div>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Wind</p>
                                        <p className="nearCityName white">{crrForcast?.current?.wind_kph}/kph</p>

                                    </div>
                                    <div className='d-flex justify-content-between align-items-center pe-5'>
                                        <p className="nearCityName">Wind degree</p>
                                        <p className="nearCityName white">{crrForcast?.current?.windchill_c}°</p>

                                    </div>

                                </div>
                            </Grid>



                        </Grid>


                    </div>
                </Grid>





            </Grid>
            <Dailoge isOpen={daialog?.isOpen} handleClose={toggleDailog} sendCity={getCity} ></Dailoge>
        </div>

    )
}