import React from "react";
import loadingAnimation from '../../assets/img/loadingAmination.svg';

function Loading({ text }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={loadingAnimation} alt="Loading..." />
      <h3>{text}</h3>
    </div>
  );
}

export default Loading;
