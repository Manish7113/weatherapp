import { Icon } from "@iconify/react"
import { Grid } from "@mui/material"

export default function WeatherCard({data, hourTime}){

  

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
            case condition.includes('fog'): // high cloudy     
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
            <Icon icon={renderIcon(data?.condition?.text)} className="cardIcon" />
            <div className="d-flex justify-content-center align-items-center gap-3 p-0 m-0 mt-4 w-100">
                <p className="tempHeading p-0 m-0">{data?.temp_c} °C</p>
               
                {/* <p className="tempHeading">{data?.temp_f} °F</p> */}

            </div>
            <p className="weatherReport p-0 m-0">{data?.condition?.text} </p>
           

            <Grid container spacing={2} className="mt-2">
                <Grid item xs={12} className="m-0 p-0">
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
                    <Icon icon="material-symbols:humidity-percentage-outline-rounded" className="white font-24" />
                        <span className="m-0 p-0 white weatherReport">{data?.humidity} %</span>
                        <span className="m-0 p-0 white weatherReport">Humidity</span>                       
                    </div>
                </Grid>
                <Grid item xs={12} className="m-0 p-0">
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
                    <Icon  icon="solar:cloud-linear" className="white font-24" />
                    
                        <span className="m-0 p-0 white weatherReport">{data?.cloud} %</span>
                        <span className="m-0 p-0 white weatherReport">Cloudy</span>                       
                    </div>
                </Grid>
                <Grid item xs={12} className="m-0 p-0">
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
                    <Icon icon="ph:wind-duotone" className="white font-24" />
                    
                        <span className="m-0 p-0 white weatherReport">{data?.wind_kph}</span>
                        <span className="m-0 p-0 white weatherReport">KPH</span>                       
                    </div>
                </Grid>
            </Grid>
            
           
            

            </div>

            </div>

        </div>
    )
}