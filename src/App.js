import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  state = {
    weatherAll: {},
    city: "",
    sunrise: "",
    sunset: "",
    time: new Date().toLocaleTimeString(),
    londonTime:new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  };

  componentWillMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Haifa&appid=0b6e4e1b4e7cc2cc26ec9c693c7aa280"
    )
      .then((response) => response.json())
      .then((json) => this.setState({ weatherAll: json }))
      .then(() => {
        this.sunrise();
      })
  }



  handleChange = (event) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + event.target.value + "&appid=0b6e4e1b4e7cc2cc26ec9c693c7aa280"
    )
      .then((response) => response.json())
      .then((json) => this.setState({ weatherAll: json }))
      .then(() => {
        this.sunrise();
      })
     
      
  }

  sunrise = () => {
    fetch(
      "https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=" + this.state.weatherAll.sys.sunrise
    )
      .then((response) => response.json())
      .then((json) => this.setState({ sunrise: json }));

    fetch(
      "https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=" + this.state.weatherAll.sys.sunset
    )
      .then((response) => response.json())
      .then((json) => this.setState({ sunset: json }))
      .then(() => {
        this.changesunrise();
      })
      
  }

  changesunrise = () => {
  
    let diff = ((this.state.time).substring(0, 2)) - ((this.state.londonTime).substring(12, 14))
    let changeSunRise = this.state.sunrise
    let changeSunSet = this.state.sunset
    changeSunRise = changeSunRise.substring(11)
    changeSunSet = changeSunSet.substring(11)
    let x=parseInt(changeSunRise.substring(0,2))
    let y=parseInt(changeSunSet.substring(0,2))
    changeSunRise=changeSunRise.replace(x,x+diff)
    changeSunSet=changeSunSet.replace(y,y+diff)
    this.setState({sunrise:changeSunRise})
    this.setState({sunset:changeSunSet})
  

}



  render() {
    if (!this.state.weatherAll.main || !this.state.weatherAll.sys) {
      return null;
    }
    else return (
      <div className='main'>
        <select
          Style=" text-align:center heigh:30px;width:150px;font-size:20px "
          onChange={this.handleChange}>
          <option value="Haifa" >Haifa</option>
          <option value="Houston">Houston</option>
          <option value="Bangkok">Bangkok</option>
          <option value="new york">New-York</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Paris">Paris</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Batumi">Batumi</option>
          <option value="Las Vegas">Las Vegas</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Eilat">Eilat</option>
          <option value="Monrovia">Monrovia</option>







        </select><br />
        <h2 className="city-name">
          <span>{this.state.weatherAll.name}</span>
          <sup>{this.state.weatherAll.sys.country}</sup>
        </h2>
        
        <div className="city-temp">
          {Math.round(this.state.weatherAll.main.temp - 273.15)}
          <sup>&deg;c</sup>
        </div>
        <div className="info">
          <img className="city-icon" src={`https://openweathermap.org/img/wn/${this.state.weatherAll.weather[0].icon}@2x.png`} alt={this.state.weatherAll.weather[0].description} />
          <h1>{this.state.weatherAll.weather[0].description}</h1>
        </div>


        <div className="size">
         {Math.round((this.state.weatherAll.main.temp_max - 273.15) ) }<sup>&deg;c </sup> / {Math.round((this.state.weatherAll.main.temp_min - 273.15) ) }
        <sup>&deg;c  &#127777;</sup><br></br>
        Humidity : {this.state.weatherAll.main.humidity}&#127778;%<br/>
        Wind Speed:{Math.round((this.state.weatherAll.wind.speed))} &#127787;<br></br>
        Feels Like :  {Math.round((this.state.weatherAll.main.feels_like - 273.15) ) }
        <sup>&deg;c</sup><br></br>

        <span>Sunrise : {this.state.sunrise}   &#127748;</span><br/>
        <span>Sunset : {this.state.sunset}&#127751;</span><br/>
        <span>time london: {(this.state.londonTime).substring(12,14)}</span><br/>
        <span>israel time: {(this.state.time).substring(0,2)}</span><br/>




  
         </div>
      </div>
    );
  }
}

export default App;