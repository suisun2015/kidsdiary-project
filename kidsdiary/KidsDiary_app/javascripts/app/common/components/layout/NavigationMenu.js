import React, { Component } from 'react';
import { Link } from 'react-router';
import { LeftNav } from 'material-ui';

export default class NavigationMenu extends Component {

  render() {
    const { userName } = this.props;

    return (
      <aside>
        <LeftNav>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </LeftNav>
          <div id="sidebar"  className="nav-collapse ">
              <ul className="sidebar-menu" id="nav-accordion">
                  <p className="centered">
                    <Link to="/profile">
                      <img src="/assets/images/sample_face2.jpg"
                           className="img-circle" width="180"/>
                    </Link>
                  </p>
                  <h5 className="centered">Mary & Paul</h5>

                  <li className="mt">
                      <Link to="/dashBoard" className="active">
                          <i className="fa fa-dashboard" />
                          <span>DASH BOARD</span>
                      </Link>
                  </li>
                
                  <li className="sub-menu">
                      <Link to="/health">
                          <i className="fa fa-desktop" />
                          <span>HEALTH</span>
                      </Link>
                  </li>
                  <li className="sub-menu">
                      <Link to="/diary">
                          <i className="fa fa-desktop" />
                          <span>DIARY</span>
                      </Link>
                  </li>
                  <li className="sub-menu">
                      <Link to="/notice">
                          <i className="fa fa-desktop" />
                          <span>NOTICE</span>
                      </Link>
                  </li>
                  <li className="sub-menu">
                      <Link to="">
                          <i className="fa fa-desktop" />
                          <span>ALBUM</span>
                      </Link>
                  </li>
                  <li className="sub-menu">
                      <Link to="/calendar">
                          <i className="fa fa-desktop" />
                          <span>CALENDAR</span>
                      </Link>
                  </li>
                  <li className="sub-menu">
                      <Link to="/food">
                          <i className="fa fa-desktop" />
                          <span>FOOD</span>
                      </Link>
                  </li>

              </ul>
          </div>
      </aside>
    );
  }

}
