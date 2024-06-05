import React from 'react'
import Gemini from '../Gemini/Gemini'
import Nav from '../Navbar/Nav';
import Ho from './Home.module.css';
import Img from '../../assets/earth.png';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

function Home() {
  return (
    <div>
    <Nav/>
    <div className={Ho.main}>
       <div className={Ho.main1}>
        <img src={Img} alt="3D Earth" className={Ho.earthimg} />
       </div>
       <div className={Ho.main2}>
        <h1>Disease Outbreak Generator</h1>
        <ScrollLink to='generate' smooth={true} duration={800} className={Ho.btn}>
            Generate Data
          </ScrollLink>
       </div>
    </div>
    <div className={Ho.ai}>
      <img className={Ho.gem} src="https://ai.google.dev/static/images/competition/competition-star.svg" alt="" />
      <h1>Built and integrated with <br/><span>Gemini API</span></h1>
    </div>
    <div id='about'></div>
    <div  className={Ho.detail}>
      <h1>Why W.H.O ?</h1>
      <p>As the Gemini API couldn't directly generate the latest disease outbreak data, we used the WHO website data,<a href="https://www.who.int/emergencies/disease-outbreak-news"> available here</a> to gather information on recent disease outbreaks. The WHO website is constantly updated with the latest data on disease outbreaks. We developed a Python algorithm to scrape the latest disease outbreak news links from the WHO website. This algorithm extracts detailed information about each disease from the links and stores it in a JSON file.The JSON file is then passed to the Gemini API, which reads the file and provides the disease data along with victim counts. Since this is official data from WHO, it is highly accurate.Due to the limitation that the API cannot provide two different outputs for a single query, we implemented a method in the frontend to parse the output. The victim counts and the names of the diseases are separated from the output and stored in an array. The final output is then presented in a table format.To minimize the number of API calls, we designed the process such that the API requests the URL and reads the link in a loop, reducing the frequency of API hits which increases the performace of site</p>
    </div>
    <div id='generate' className={Ho.ai1}>
      <h1>Click the button to<br/><span>Generate Data</span></h1>
      <Gemini/>  
    </div>
    
    </div>
  )
}

export default Home