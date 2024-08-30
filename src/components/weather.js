import { Icon } from "@iconify/react"
import { Grid } from "@mui/material"
import axios from "axios"
import { useEffect, useLayoutEffect, useState } from "react"
import React from 'react';
import Dailoge from "./dailoge";
import loadingImage from '../assets/loading.png'
import WeatherCard from "./weatherCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';




export default function Weather() {

    const [crrForcast, setCrrForcast] = useState(null)
    const [city, setCity] = useState()
    const [backgroundClass, setBackgroundClass] = useState('clear')
    const [daialog, setDaialog] = useState({ isOpen: false })
    const [otherCity, setOtherCity] = useState()
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState({
        heading: 'Looking Outside For You',
        subHeading: 'One Sec...'
    })


    useLayoutEffect(() => {

        const cityList = localStorage.getItem('cityList')
        const crrCity = localStorage.getItem('crrCity')
        if (cityList) {
            let arr = cityList.split(',')
            setOtherCity(arr)
        }
        else {
            setOtherCity(['New Delhi', 'London', 'Washington', 'Moscow'])
        }


        if (crrCity) {

            setCity(crrCity)
        }
        else {
            setCity('New Delhi')
        }

    }, [])


    useEffect(() => {
        getCurrentWeather()

    }, [city])



    const getCurrentWeather = async () => {
        setLoading(true)
        setLoadingData({
            heading: 'Looking Outside For You',
            subHeading: 'One Sec...'
        })
        if (city) {

            try {
                const response = await axios({
                    method: 'get',
                    url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=1&aqi=yes&alerts=yes`,

                });
                if (response?.data) {


                    setCrrForcast(response?.data)
                    getBackgroundImage(response?.data)

                    setTimeout(() => {
                        setLoading(false)
                    }, 2000)
                }
            }
            catch (error) {
                setLoadingData({
                    heading: 'Trouble To Connect Server',
                    subHeading: 'Please Try Again Later'
                })
                console.log(error, '--------------------')

            }
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
    const getCurrentMonth = () => {
        const crrMonth = d?.getMonth()
        switch (crrMonth) {
            case 0: return 'Jan'
                break;
            case 1: return 'Feb'
                break;
            case 2: return 'Mar'
                break;
            case 3: return 'Apr'
                break;
            case 4: return 'May'
                break;
            case 5: return 'Jun'
                break;
            case 6: return 'Jul'
                break;
            case 7: return 'Aug'
                break;
            case 8: return 'Sept'
                break;
            case 9: return 'Oct'
                break;
            case 10: return 'Nov'
                break;
            case 11: return 'Dec'
                break;
            default: return ''
                break;

        }

    }


    const toggleDailog = () => {
        setDaialog({ isOpen: false })
    }







    const activeCity = (city) => {
        const updatedCities = otherCity.filter((item) => item !== city)
        updatedCities.unshift(city)
        setOtherCity(updatedCities)
        localStorage.setItem('crrCity', city)
    }

    const getCity = (city) => {
        if (otherCity?.includes(city)) {
            activeCity(city)
            localStorage.setItem('crrCity', city)
        }
        else {
            const otherCity2 = otherCity
            otherCity2.pop()
            otherCity2.unshift(city)
            setCity(city)
            setOtherCity(otherCity2)
            localStorage.setItem('cityList', otherCity2)
            localStorage.setItem('crrCity', city)

        }

    }

    const getBackgroundImage = (condtionString) => {

        const condition = condtionString?.current?.condition?.text.toLowerCase()


        switch (true) {
            case condition.includes('thunderstorm') || condition.includes('thunder'):
                setBackgroundClass('prainThunder')
                break;
            case condition.includes('patchy rain') || condition.includes('patchy light drizzle') || condition.includes('light drizzle') || condition.includes('light rain shower'):
                setBackgroundClass('prain')
                break;
            case condition.includes('overcast'): // high cloudy     
                setBackgroundClass('overcast')
                break;
            case condition.includes('partly cloudy') || condition.includes('cloudy'): // high cloudy     
                setBackgroundClass('Pcloudy')
                break;
            case condition.includes('fog') || condition.includes('mist'): // high cloudy     
                setBackgroundClass('fog')
                break;
            case condition.includes('rain'):
                setBackgroundClass('rain')
                break;
            case condition.includes('cloudy'):
                setBackgroundClass('cloudy')
                break;
            case condition.includes('sunny') || condition.includes('clear'):
                setBackgroundClass('clear')
                break;

            default:
                setBackgroundClass('clear')
                break;

        }



    }


    const renderIcon = (condtionString) => {

        const condition = condtionString.toLowerCase()

        let reReturnCondtion = 'None'

        switch (true) {
            case condition.includes('patchy rain') || condition.includes('patchy light drizzle') || condition.includes('light drizzle'):
                reReturnCondtion = "lets-icons:rain-light"
                break;
            case condition.includes('overcast') || condition.includes('cloudy'): // high cloudy     
                reReturnCondtion = "carbon:cloudy"
                break;
            case condition.includes('fog') || condition.includes('mist'): // high cloudy     
                reReturnCondtion = "solar:fog-line-duotone"
                break;
            case condition.includes('rain'):
                reReturnCondtion = "ion:rainy-outline"
                break;
            case condition.includes('sunny') || condition.includes('clear'):
                reReturnCondtion = "ph:sun-duotone"
                break;
            case condition.includes('thunderstorm ') || condition.includes('thunder'):
                reReturnCondtion = "iconoir:thunderstorm"
                break;
            default:
                reReturnCondtion = "ph:sun-duotone"
                break;

        }

        return reReturnCondtion
    }



    return (
        <>
            {
                loading ? <div className=' d-flex flex-column justify-content-center align-items-center  loadingContainer'>
                    <img src={loadingImage} alt="not found" className="loadingImage"></img>
                    <p className="m-0 p-0 loadingText">{loadingData?.heading}</p>
                    {/* <p className="m-0 p-0 ">Please Wait...</p> */}
                    <p className="m-0 p-0 loadingText">{loadingData?.subHeading}</p>

                </div> : <div className={`weatherPageContainer ${backgroundClass}`}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                            <div className="leftSideContainer d-flex flex-column justify-content-between align-items-start p-5 gap-5  ">
                                <p className="upperContainer p-2 px-4 rounded-3">{crrForcast?.forecast?.forecastday[0]?.day?.condition?.text}</p>

                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 bottomContainer p-3 rounded-3 container">
                                    <h1 className="centigrade">{crrForcast?.current?.temp_c || ''}°</h1>
                                    <div className="d-felx flex-column gap-0">
                                        <h4 className="p-0 m-0 city"> {crrForcast?.location?.name || ''}</h4>
                                        <p className="p-0 m-0 ">{d?.getHours()} : {d?.getMinutes()} {' '} {getCurrentDay()} {d.getDate()} {getCurrentMonth()} {d.getFullYear()}</p>
                                    </div>
                                    <div>

                                        <Icon icon={renderIcon(crrForcast?.current?.condition?.text)} className="icon" />

                                        <p className="m-0 p-0">{crrForcast?.current?.condition?.text}</p>
                                        {/* {renderIcon(crrForcast?.current?.condition?.text)} */}
                                    </div>

                                </div>

                            </div>


                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                            <div className="rightSide ps-5">
                                <Grid conatiner spacing={5}>
                                    <Grid item xs={12} sm={12}>
                                        <div className="d-flex justify-content-between align-items-end gap-5">
                                            <input type='text' className="inputField" placeholder="Another Location" onClick={() => {
                                                setDaialog({ isOpen: true })
                                            }}></input>

                                            <button className="iconContainer d-flex justify-content-center align-items-center rounded-2 white" >
                                                <Icon icon="quill:search" width="32" height="32" />
                                            </button>
                                        </div>
                                    </Grid>

                                    {otherCity?.length ? <Grid item xs={12} sm={12}>
                                        <div className="mt-5">
                                            {otherCity?.map((item, index) => (
                                                <p key={index} className={`nearCityName ${city === item ? 'activeCity' : null}`} onClick={() => {
                                                    setCity(item)
                                                    activeCity(item)
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

                    <div className="bgnavyBlue w-100 d-flex justify-content-center align-items-center ">
                        <div className="d-flex justify-content-center align-items-center container w-100">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                navigation
                                spaceBetween={10}

                                // slidesPerView={3}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 1.2,
                                    },
                                    // when window width is >= 480px
                                    480: {
                                        slidesPerView: 1.6,
                                    },
                                    // when window width is >= 768px
                                    768: {
                                        slidesPerView: 2.2,
                                    },
                                    // when window width is >= 1024px
                                    1024: {
                                        slidesPerView: 3.2,
                                    },
                                }}

                            >
                                {
                                    crrForcast?.forecast?.forecastday[0].hour?.map((item, index) => (

                                        <SwiperSlide key={index}><WeatherCard data={item} hourTime={index}></WeatherCard></SwiperSlide>

                                    ))
                                }



                            </Swiper>

                        </div>
                    </div>
                    <Dailoge isOpen={daialog?.isOpen} handleClose={toggleDailog} sendCity={getCity} ></Dailoge>
                </div>
            }
        </>

    )
}