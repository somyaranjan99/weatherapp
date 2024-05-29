import React from 'react'

function WeatherData({data}) {

  return (
    <div className='tbl_wrapper'>
     {data  && data.map((ele,index)=>{
        let date = new Date(ele.dt_txt);
        let dateStr=date.getMonth()+'/'+date.getMonth()+'/'+date.getFullYear() ;
        return (
           
            <table key={index}>
                
  <tr>
    <th colSpan="2" className='date__container'>Date:{dateStr} </th>
  </tr>
  <tr>
    <th colSpan='2'>Temprature</th>
  </tr>
  <tr>
    <th>Min</th>
    <th>Max</th>
  </tr>
  <tr>
    <td>{ele.main.temp_min}</td>
    <td>{ele.main.temp_max}</td>
  </tr>
  <tr>
    <td>Pressure</td>
    <td>{ele.main.pressure} </td>
  </tr>
  <tr>
    <td>Humidity</td>
    <td>{ele.main.humidity} </td>
  </tr>
</table>
        )
     })
};

    </div>
  )
}

export default WeatherData;