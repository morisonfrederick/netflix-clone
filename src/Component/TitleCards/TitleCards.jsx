import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'

import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGYyOTg3ZGIxN2ZkYjcxOTc5ZjRiNjYxZmE2ZjJmNiIsIm5iZiI6MTcyNjY1OTUxOC4yMDk3MjEsInN1YiI6IjY2ZWFiOTM3ODJmZjg3M2Y3ZDFmM2Y2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s1I4y0oTXzRvVc5mmFy7byqLsbPS9aQz482jzDiaCKY'
    }
  };
  


  const [movieData,setMovieData]= useState([]) 

  const cardRef = useRef()
  const handleWheel = (event)=>{
    event.preventDefault()
    cardRef.current.scrollLeft+= event.deltaY
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setMovieData(response.results))
    .catch(err => console.error(err));
    cardRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='titleCards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
         {movieData.map((card,index)=>{
          return <Link to={`/player/${card.id}`}   className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
         })}
      </div>
    </div>
  )
}

export default TitleCards