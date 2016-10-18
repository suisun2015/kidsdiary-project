import React from 'react';

export const Row = (props) => {
  const style = props.style ? props.style : {};
  style.margin = 0;
  const classNames = ['row'];
  if (props.start) classNames.push('start-xs');
  if (props.center) classNames.push('center-xs');
  if (props.end) classNames.push('end-xs');
  if (props.between) classNames.push('between-xs');
  if (props.around) classNames.push('around-xs');
  return <div className={classNames.join(' ') + ' ' + props.className} style={style}>{props.children}</div>};

export const Col = (props) => {
  const classNames = [props.className];
  const lg = props.lg ? props.lg : props.md ? props.md : props.sm ? props.sm : props.xs ? props.xs : 12;
  const md = props.md ? props.md : lg;
  const sm = props.sm ? props.sm : md;
  const xs = props.xs ? props.xs : sm;
  const style = props.style ? props.style : {};
  style.padding = 0;
  switch (md) {
    case '1':
      classNames.push('col-md-1');
      break;
    case '2':
      classNames.push('col-md-2');
      break;
    case '3':
      classNames.push('col-md-3');
      break;
    case '4':
      classNames.push('col-md-4');
      break;
    case '5':
      classNames.push('col-md-5');
      break;
    case '6':
      classNames.push('col-md-6');
      break;
    case '7':
      classNames.push('col-md-7');
      break;
    case '8':
      classNames.push('col-md-8');
      break;
    case '9':
      classNames.push('col-md-9');
      break;
    case '10':
      classNames.push('col-md-10');
      break;
    case '11':
      classNames.push('col-md-11');
      break;
    case '12':
      classNames.push('col-md-12');
      break;
  }
  switch (sm) {
    case '1':
      classNames.push('col-sm-1');
      break;
    case '2':
      classNames.push('col-sm-2');
      break;
    case '3':
      classNames.push('col-sm-3');
      break;
    case '4':
      classNames.push('col-sm-4');
      break;
    case '5':
      classNames.push('col-sm-5');
      break;
    case '6':
      classNames.push('col-sm-6');
      break;
    case '7':
      classNames.push('col-sm-7');
      break;
    case '8':
      classNames.push('col-sm-8');
      break;
    case '9':
      classNames.push('col-sm-9');
      break;
    case '10':
      classNames.push('col-sm-10');
      break;
    case '11':
      classNames.push('col-sm-11');
      break;
    case '12':
      classNames.push('col-sm-12');
      break;
  }
  switch (xs) {
    case '1':
      classNames.push('col-xs-1');
      break;
    case '2':
      classNames.push('col-xs-2');
      break;
    case '3':
      classNames.push('col-xs-3');
      break;
    case '4':
      classNames.push('col-xs-4');
      break;
    case '5':
      classNames.push('col-xs-5');
      break;
    case '6':
      classNames.push('col-xs-6');
      break;
    case '7':
      classNames.push('col-xs-7');
      break;
    case '8':
      classNames.push('col-xs-8');
      break;
    case '9':
      classNames.push('col-xs-9');
      break;
    case '10':
      classNames.push('col-xs-10');
      break;
    case '11':
      classNames.push('col-xs-11');
      break;
    case '12':
      classNames.push('col-xs-12');
      break;
  }
  switch (lg) {
    case '1':
      classNames.push('col-lg-1');
      break;
    case '2':
      classNames.push('col-lg-2');
      break;
    case '3':
      classNames.push('col-lg-3');
      break;
    case '4':
      classNames.push('col-lg-4');
      break;
    case '5':
      classNames.push('col-lg-5');
      break;
    case '6':
      classNames.push('col-lg-6');
      break;
    case '7':
      classNames.push('col-lg-7');
      break;
    case '8':
      classNames.push('col-lg-8');
      break;
    case '9':
      classNames.push('col-lg-9');
      break;
    case '10':
      classNames.push('col-lg-10');
      break;
    case '11':
      classNames.push('col-lg-11');
      break;
    case '12':
      classNames.push('col-lg-12');
      break;
  }
  return <div className={classNames.join(' ') } style={style}>{props.children}</div>;
};