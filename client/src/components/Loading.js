import React from "react";

const Loading = (props) => {
  return (
    <div className='loading-dots'>
      <div className='bounce' style={props}></div>
      <div className='bounce2' style={props}></div>
      <div className='bounce3' style={props}></div>
    </div>
  );
};

export default Loading;
