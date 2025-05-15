// import React from 'react';


// const Home = () => {
//   return (
//     <div>
//     <CardWrapper>
//       <h1>Wejdan AlHarbi Portfolio</h1>
//       </CardWrapper>
//       <p>Welcome to my creative space!</p>
//       </div>
   
//   );
// };

// export default Home;


import React from 'react';
import './Home.css';
import CardWrapper from '../components/CardWrapper';
import Me from '../assets/Me.png';
const Home = () => {
  return (
    <div className="home-container">
    
    <img src={Me} alt="Center" className="center-image" />
    <div><h1>Welcome to my creative space!</h1>
    
    <h3 className="typewriter"> "Creativity is intelligence having fun"
  
    Albert Einstein
    </h3>
    </div>
  </div>
  );
};

export default Home;
