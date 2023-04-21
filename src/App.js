import React from 'react';
import './App.css';
import {getAuth, signInAnonymously} from 'firebase/auth';
import {getToken, onMessage} from "firebase/messaging";
import {messaging} from "./firebase";
import {ToastContainer, toast} from 'react-toastify';
import { useState } from 'react';

function App() {
  const [CitiesData, setDataCities] = useState(5);
  const [climaData, setClimaDataCities] = useState([]);
  const cities = ['Osaka', 'Oita', 'Tokio', 'Tijuana', 'Nagoya', 'Aguascalientes', 'United States', 'Acapulco', 'Canada','Salamanca', 'San Luis Río Colorado', 'Zapopan'];
  const fetchClimaDataCities = async () => {
    const city = cities[CitiesData];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb8c78d5f15dc590c735529204622ed1&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return { city, temperature: data.main.temp };
  };

  const DataSyncShow = async () => {
    const newData = await fetchClimaDataCities();
    setClimaDataCities([...climaData, newData]);
    setDataCities((CitiesData + 1) % cities.length);
  };
  
  const login = ()=>{
    signInAnonymously(getAuth()).then(usuario=> console.log
      (usuario));
  }

  const activarMensajes = async ()=>{
    const token = await getToken(messaging, {
      vapidKey:"BFd4xSClH-bZf9KmqbsJUQPvIp6Scg5V32sVED7ys-LpWY9qfesmE5S81ErQhnJlHAyCYzjU6l_sqZFMZZDig4o"
    }).catch(error => console.log("error al generar el token paps"));

    if(token) console.log("Este es tu token: "+ token);
    if(!token) console.log("No tienes token paps")
  }

  React.useEffect(()=>{
    onMessage(messaging, message=>{
      console.log("Tu mensaje: ", message);
      toast(message.notification.title);
    })

  }, []);

  return (
    <div className="details">
      <div className="clima">
        <div className='buscar'>
        <button> <img src='/images/buscar.png' alt='' width={30} onClick={DataSyncShow} /> </button>
        <img src='/images/clima.png' alt='' width={70}/>
        </div>
          <ul>
            {climaData.map(({ city, temperature }) => (
              <div className='col-sm-6'>
                <li key={city}>
                  {city} : {temperature}°C
                </li>
              </div>
            ))}
          </ul>
      </div>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

isPushNotificationSupported()

export default App;