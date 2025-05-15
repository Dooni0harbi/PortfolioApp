import React from 'react';
import CardWrapper from '../components/CardWrapper';
import '../components/AnimatedLink.css';
import project4 from '../assets/project4.jpg';
import JWA from '../assets/JWA.jpg';
import bab from '../assets/bab.jpg';
import nar from '../assets/nar.png';
import nasa from '../assets/nasa.jpg';
const MyProjects = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <CardWrapper  style={{ backgroundColor: 'white' }}> 
        <h1>My Projects</h1>
        <br />
        <div className="horizontal-gallery">
        
          <div>
          <h5>Filming And Editing</h5>
          <div className="gallery-item">
            <a
              href="https://drive.google.com/file/d/1NLQswGejyfy80WVlsQKs4U0ruR0YduwA/view?pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
              <img src={project4} alt="Project 1" className="clickable-image" />
            </a>

            </div>

            </div>

            <div>
            <h5>Filming And Editing</h5>

            
            <div className="gallery-item">
            
            <a
              href="https://www.instagram.com/reel/DC3RmrQtvZF/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
              <img src={nasa} alt="Project 1" className="clickable-image" />
            </a>
            </div>
            

          </div>

       
           <div>
           <h5>Motion Graphic & Media Design</h5>
           
          <div className="gallery-item">
          
            <a
              href="https://www.instagram.com/akademiataalamjeddah/?hl=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
              <img src={JWA} alt="Project 2" className="clickable-image" />
            </a>
            </div>
          </div>

          <div> <h5>Motion Graphic & Media Design</h5>
          
          <div className="gallery-item">
          
            <a
              href="https://www.instagram.com/brewandblend_sa/?hl=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
              <img src={bab} alt="Project 3" className="clickable-image" />
            </a>
          </div>
          </div>
        

        
       <div>
       <h5>Website Design & Development</h5>
      
          <div className="gallery-item">
         
            <a
              href="https://nhhcf.org/ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
              <img src={nar} alt="Project 4" className="clickable-image" />
            </a>
            </div>
          </div>


          <div> 
          <h5>Website Design & Development</h5>

          <div className="gallery-item">
         
            <a
              href="https://apps.apple.com/us/app/wecare360/id1475085126?ign-itscg=30200&ign-itsct=apps_box_badge"
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
              <img src={nar} alt="Project 5" className="clickable-image" />
            </a>
          </div>          </div>

        </div>
      </CardWrapper>
    </div>
  );
};

export default MyProjects;
