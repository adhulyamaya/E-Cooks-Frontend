import React from 'react';

function Loader() {
  return (
    <lottie-player
      src="https://lottie.host/b7ed822f-498f-4806-a758-ea93bef344a5/HnfD2AXvTs.json"
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
