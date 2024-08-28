import { Icon } from "@mui/material";

export default function WeatherCard({data, hourTime}){

    console.log(data, 'data')

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

    return(
        <div className="weatherCard">
            <div className='d-flex flex-column justify-content-center align-items-center wrap'>
            {/* <Icon icon={renderIcon(data?.condition?.text)} className="cardIcon" /> */}
            <p>{hourTime} </p>

            </div>

        </div>
    )
}