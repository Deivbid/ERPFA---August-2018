import React from 'react';

const Banner = ({src, alt}) => {
  return (
  	<div>
    <img className="main-banner" src={src} alt={alt} />
    
    </div>
  )
}

export default Banner;