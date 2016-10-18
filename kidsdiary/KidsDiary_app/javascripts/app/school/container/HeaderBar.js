import React, { Component } from 'react';

/*
 * サンプルのまま
 */
export default class HeaderBar extends Component {

  constructor(props) {
    super(props);
  }

  pushMenu() {
    const body = document.body;
    if (body.clientWidth > 768) {
      if (body.className.indexOf('sidebar-collapse') === -1) {
        body.className += ' sidebar-collapse';
      } else {
        body.className = body.className.replace(' sidebar-collapse', '');
      }
    } else {
      if (body.className.indexOf('sidebar-open') === -1) {
        body.className += ' sidebar-open';
      } else {
        body.className = body.className.replace(' sidebar-open', '');
      }
    }
  }

  render() {
    const { onClickLogout } = this.props;
    return (
      <header className="header black-bg">
            <div className="sidebar-toggle-box">
                <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
            </div>
          <a href="#" className="logo"><b>KIDS DIARY at SCHOOL</b></a>
          <div className="nav notify-row" id="top_menu">
              <ul className="nav top-menu">
                  <li className="dropdown">
                      <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                          <i className="fa fa-tasks"></i>
                          <span className="badge bg-theme">4</span>
                      </a>
                      <ul className="dropdown-menu extended tasks-bar">
                          <div className="notify-arrow notify-arrow-green"></div>
                          <li>
                              <p className="green">You have 4 pending tasks</p>
                          </li>
                          <li>
                              <a href="#">
                                  <div className="task-info">
                                      <div className="desc">DashGum Admin Panel</div>
                                      <div className="percent">40%</div>
                                  </div>
                                  <div className="progress progress-striped">
                                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" >
                                          <span className="sr-only">40% Complete (success)</span>
                                      </div>
                                  </div>
                              </a>
                          </li>
                          <li className="external">
                              <a href="#">See All Tasks</a>
                          </li>
                      </ul>
                  </li>
                  <li id="header_inbox_bar" className="dropdown">
                      <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                          <i className="fa fa-envelope-o"></i>
                          <span className="badge bg-theme">5</span>
                      </a>
                      <ul className="dropdown-menu extended inbox">
                          <div className="notify-arrow notify-arrow-green"></div>
                          <li>
                              <p className="green">You have 5 new messages</p>
                          </li>
                          <li>
                              <a href="#">
                                  <span className="photo"><img alt="avatar" /></span>
                                  <span className="subject">
                                  <span className="from">Zac Snider</span>
                                  <span className="time">Just now</span>
                                  </span>
                                  <span className="message">
                                      Hi mate, how is everything?
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a href="#">See all messages</a>
                          </li>
                      </ul>
                  </li>
              </ul>
          </div>
          <div className="top-menu">
            <ul className="nav pull-right top-menu">
                  <li><a className="logout" onClick={onClickLogout}>Logout</a></li>
            </ul>
          </div>
      </header>
    );
  }
}
