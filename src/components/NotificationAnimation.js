import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../asset/notification.json';

function NotificationAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, 
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

export default  NotificationAnimation;
