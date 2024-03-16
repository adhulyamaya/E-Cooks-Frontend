import React from 'react';

function Loader() {
  return (
    <lottie-player
    
      src="https://lottie.host/c4e1969a-1b74-4003-9e33-0c94ba05e27d/qhinDmYp2s.json"
      background="transparent"
      speed="2"
      style={{
        width: '300px',
        height: '300px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      loop
      autoplay
    ></lottie-player>
  );
}

export default Loader;
