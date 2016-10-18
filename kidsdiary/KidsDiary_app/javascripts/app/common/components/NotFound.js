import React, { Component } from 'react';
import ContentHeader from './ContentHeader';

export default class NotFound extends Component {
  render() {
    return (
      <ContentHeader
        headerTitle={'Not found'}
        description={'(・_・)?'}
      />
    );
  }
}
