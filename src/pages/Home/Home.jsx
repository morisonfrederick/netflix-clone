import React, { useEffect } from 'react'
import './Home.css'
import Navbar from '../../Component/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../Component/TitleCards/TitleCards'
import Footer from '../../Component/Footer/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log('User is logged in');
        if (window.location.pathname !== '/') {
          navigate('/');
        }
      }
      else{
        navigate('/login')
      }
    })
  },[])
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero"> 
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>Discover his new movie . its all about how horrer movies are becoming comedy . </p>
          <div className="hero-btns">
            <button className='btn' ><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={'Blockbuster Movies'} category={'now_playing'}/>
        <TitleCards title={'Only on Netflix '} category={'popular'}/>
        <TitleCards title={'Upcoming '} category={'top_rated'}/>
        <TitleCards title={'Top pics for you'} category={'upcoming'}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home