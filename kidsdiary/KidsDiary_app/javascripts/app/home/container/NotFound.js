import React, { Component } from 'react';
import ContentHeader from '../../common/components/ContentHeader';

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
