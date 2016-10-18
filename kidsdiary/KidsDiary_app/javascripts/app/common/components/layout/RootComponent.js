import React, { PropTypes } from 'react';
import HeaderBar from './HeaderBar';
import NavigationMenu from './NavigationMenu';

const RootComponent = ({children}) =>
    <div>
      <HeaderBar />
      <NavigationMenu />
      <section id="main-content">
        <section className="wrapper" id="contentWrapper">
          { children }
        </section>
      </section>
    </div>;

RootComponent.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object
};

export default RootComponent;
