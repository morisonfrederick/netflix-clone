import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [movieDetails,setmovieDetails] = useState(null)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGYyOTg3ZGIxN2ZkYjcxOTc5ZjRiNjYxZmE2ZjJmNiIsIm5iZiI6MTcyNjY1OTUxOC4yMDk3MjEsInN1YiI6IjY2ZWFiOTM3ODJmZjg3M2Y3ZDFmM2Y2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s1I4y0oTXzRvVc5mmFy7byqLsbPS9aQz482jzDiaCKY'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setmovieDetails(response.results[0]))
    .catch(err => console.error(err));
    console.log(movieDetails);
    
  },[])
  if(!movieDetails){
    return (
      <div>Loading. . .</div>
    )
  }
  

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe width='90%' height='90%' 
      src= {`https://www.youtube.com/embed/${movieDetails.key}`}  
      frameBorder="0" title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{movieDetails.published_at.slice(0,10)}</p>
        <p>{movieDetails.name}</p>
        <p>{movieDetails.type}</p>
      </div>
    </div>
  )
}

export default Player