import React  from 'react';
import { Link } from 'react-router';

// boxShadow: '0px 0px 10px  rgba(0, 0, 0, 0.6)', //, inset 0px 0px 10px rgba(0, 0, 0, 0.8)

export const ImageDivSquare = (props) => {
  const w = props.width ? props.width : 150;

  const style = {
    width: `${w}px`,
    height: `${w}px`,
    borderRadius: `0px`,
    border: props.border,
    background: `url(${props.src}) center center`,
    backgroundSize: 'contain',
    margin: '0 auto',
    ...props.style
  };
  return <div className={props.className} style={style}><i/></div>
};

