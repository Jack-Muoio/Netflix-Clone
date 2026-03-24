import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()

  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjFkNzM2NmM1MjA0MjQ4YmRhODBhYTYyNGI4ZmU1MCIsIm5iZiI6MTc3Mzg3MTEzMC4yNjksInN1YiI6IjY5YmIyMDFhMDkwMmMxZDhlODA1MjQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YMScGlZtYA8KPHmWeXIhaFidNlJRrRxkmrXJOLa6AhA'
    }
  };

  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
    .then(res => res.json())
    .then(res => {
        if(res.results && res.results.length > 0) {
            setApiData(res.results[0]);
        }
    })
    .catch(err => console.error(err));
}, [id]); 




  return (
    <div className='player'>
      <img src={back_arrow_icon } alt="" onClick={() => {navigate('/')}}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player