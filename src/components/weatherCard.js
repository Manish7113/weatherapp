import { Icon } from "@iconify/react"
import { Grid } from "@mui/material"

export default function WeatherCard({data, hourTime}){

  

    const renderIcon = (condtionString, date) => {
        const arr = date.split(' ')
        const time =  arr[1]
        const timeArr  = time.split(':')
        
        const hour = Number(timeArr[0])
        

        
        

        const condition = condtionString.toLowerCase()

        let reReturnCondtion = 'None'

        if(hour < 6 || hour > 18)
        {
            // night
            switch (true) {
                case condition.includes('patchy rain') || condition.includes('patchy light drizzle') || condition.includes('light drizzle'):
                    reReturnCondtion = "carbon:rain-scattered-night"
                    
                    
                    break;
                case condition.includes('overcast') || condition.includes('cloudy'): // high cloudy     
                    
                    reReturnCondtion = "meteocons:partly-cloudy-night-rain-fill"
                    
                    break;
                case condition.includes('fog') || condition.includes('mist'): // high cloudy     
                    reReturnCondtion = "meteocons:overcast-fog-fill"
                    
                    break;
                case condition.includes('rain'):
                    reReturnCondtion = "fluent:weather-rain-showers-night-20-filled"
                    
                    
                    break;
                case condition.includes('sunny') || condition.includes('clear'):
                    reReturnCondtion = "fluent-emoji-flat:crescent-moon"
                    
                    break;
                case condition.includes('thunderstorm ') || condition.includes('thunder'):
                    reReturnCondtion = "twemoji:cloud-with-lightning-and-rain"
                    
                    break;
                default:
                     reReturnCondtion = "fluent-emoji-flat:crescent-moon"
                    break;
    
            }
           

        }
        else{

            // day 
            switch (true) {
                case condition.includes('patchy rain') || condition.includes('patchy light drizzle') || condition.includes('light drizzle'):
                    reReturnCondtion = "noto:sun-behind-rain-cloud"
                    // <Icon icon="noto:umbrella-with-rain-drops" /> night
                    break;
                case condition.includes('overcast') || condition.includes('cloudy'): // high cloudy     
                    // reReturnCondtion = "carbon:cloudy"
                    // <Icon icon="meteocons:partly-cloudy-night-rain-fill" /> night
                    reReturnCondtion = "meteocons:partly-cloudy-day-smoke-fill"
                    
                    break;
                case condition.includes('fog') || condition.includes('mist'): // high cloudy     
                    reReturnCondtion = "meteocons:overcast-fog-fill"
                    
                    break;
                case condition.includes('rain'):
                    reReturnCondtion = "emojione:sun-behind-rain-cloud"
                    // <Icon icon="fluent:weather-rain-showers-night-20-filled" /> night
                    
                    break;
                case condition.includes('sunny') || condition.includes('clear'):
                    reReturnCondtion = "noto-v1:sun"
                    
                    // <Icon icon="fluent-emoji-flat:crescent-moon" /> night
                    break;
                case condition.includes('thunderstorm ') || condition.includes('thunder'):
                    reReturnCondtion = "twemoji:cloud-with-lightning-and-rain"
                    
                    break;
                default:
                    reReturnCondtion = "ph:sun-duotone"
                    break;
    
            }
           
        }

        

        return reReturnCondtion
    }

    const getTime = (time) =>{
        const arr = time.split(' ')
        const realTime  = formatTimeTo12Hour(arr[1])
        
        return realTime
    }


    function formatTimeTo12Hour(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        
        // Create a Date object
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        
        // Get hours and minutes in 12-hour format
        let hours12 = date.getHours() % 12 || 12; // Convert 24-hour time to 12-hour time
        let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        let minutesStr = date.getMinutes().toString().padStart(2, '0'); // Ensure minutes are always two digits
        
        return `${hours12} : ${minutesStr} ${ampm}`;
    }


    return(
        <div className="weatherCard">
            <div className='d-flex flex-column justify-content-center align-items-center wrap'>
            <p className="time d-flex justify-content-center align-item-center">{getTime(data?.time)}</p>
            <div className="w-75 d-flex justify-content-center align-items-center flex-column mt-2">
            <Icon icon={renderIcon(data?.condition?.text, data?.time)} className="cardIcon" />
            <div className="d-flex justify-content-center align-items-center gap-3 p-0 m-0 mt-4 w-100">
                <p className="tempHeading p-0 m-0">{data?.temp_c} °C</p>
               
                {/* <p className="tempHeading">{data?.temp_f} °F</p> */}

            </div>
            <p className="weatherReport p-0 m-0">{data?.condition?.text} </p>
           

            <Grid container spacing={2} className="mt-2">
                
              
                <Grid item xs={6}  className="m-0 p-0">
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
                    <Icon icon="ph:wind-duotone" className="white font-24" />
                    
                        <span className="m-0 p-0 white weatherReport">{data?.wind_kph}</span>
                        <span className="m-0 p-0 white weatherReport">KPH</span>                       
                    </div>
                </Grid>
                <Grid item xs={12}  className="m-0 p-0">
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
                    <Icon  icon="solar:cloud-linear" className="white font-24" />
                    
                        <span className="m-0 p-0 white weatherReport">{data?.cloud}%</span>
                        <span className="m-0 p-0 white weatherReport">Cloudy</span>                       
                    </div>
                </Grid>
                <Grid item xs={12} className="m-0 p-0">
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
                    <Icon icon="material-symbols:humidity-percentage-outline-rounded" className="white font-24" />
                        <span className="m-0 p-0 white weatherReport">{data?.humidity}%</span>
                        <span className="m-0 p-0 white weatherReport">Humidity</span>                       
                    </div>
                </Grid>
            </Grid>
            
           
            

            </div>

            </div>

        </div>
    )
}