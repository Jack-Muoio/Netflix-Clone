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

  const token = import.meta.env.VITE_TMDB_TOKEN;
  console.log("Sending Token:", token ? token.substring(0, 10) + "..." : "EMPTY");

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
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
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : "No Date Available"}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player