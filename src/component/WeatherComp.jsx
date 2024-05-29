import React,{useState,useCallback,useTransition} from 'react'
import WeatherData from './WeatherData';
import useDebounce from './hooks/useDebounce';
import Loder from '../Util/Loder';
 const WeatherComp = () => {
    const [searchData,setSearchData]=useState([])
    const [cityname,setCityname]=useState(''); 
    const debouncedInputValue = useDebounce(cityname, 300);   
    const [isPending, startTransition] = useTransition();
    const [isDisabled,setDisabled]=useState(false);
    const [isLoading,setIsloading]=useState(false);
    const API_KEY= '1635890035cbba097fd5c26c8ea672a1';
  
    const handleCityname=(e)=>{
        setCityname(e.target.value);
    }
    const fetchWeatherData=useCallback(async ()=>{
        try{
            if(debouncedInputValue===''){
                alert('Please enter cityname')
                return;
            }
            setIsloading(true);
            setDisabled(true)
            const weatherRes= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${debouncedInputValue}&appid=${API_KEY}`);
            const result = await weatherRes.json();
            startTransition(() => {
             setSearchData(result?.list)
            });
            setDisabled(false)
            setIsloading(false);
        }catch(err){
            setDisabled(true);
            setIsloading(false);
        }
      
    },[debouncedInputValue]);
    
    // useEffect(()=>{

    // },[]);
  return (
    <div className='container'>
        <div className='wrapper'>
                <div className='search_wrapper'>
                    <h1> Weather in your city</h1>
                    <input type='text' name='search'  onChange={handleCityname} disabled={isDisabled}/>
                    <button onClick={fetchWeatherData}>Search</button>
                    <div>{(isPending || isLoading )&& <Loder /> }</div>
                </div>
        </div>
        <WeatherData  data={searchData}/>
    </div>
  )
}
export default WeatherComp;
