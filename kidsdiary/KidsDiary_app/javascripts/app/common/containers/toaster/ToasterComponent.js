import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeToastr } from './ToasterAction';

class Toastr extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.any,
    alertType: PropTypes.string,
    dispatch: PropTypes.func
  };
  render() {
    const alertTypes = {
      danger: { className: 'danger', icon: 'fa-ban' },
      info: { className: 'info', icon: 'fa-info' },
      warning: { className: 'warning', icon: 'fa-warning' },
      success: { className: 'success', icon: 'fa-check' }
    };

    const onToastrClose = () => {
      const { dispatch } = this.props;
      dispatch(closeToastr());
    };

    const stylesTemplate = {
      position: 'fixed', top: '10px', right: '10px', zIndex: '9999',
      minWidth: '200px'
    };
    const { alertType, show, title, body } = this.props;
    const alertClassName = `alert alert-${alertTypes[alertType].className} alert-dismissible`;
    const iconClassName = `icon fa ${alertTypes[alertType].icon}`;
    const styles = Object.assign({}, stylesTemplate, show ? {} : {display: 'none'});
    return (
      <div style={styles}>
        <div className={alertClassName}>
          <button type="button" className="close" onClick={onToastrClose}>×</button>
          <h4><i className={iconClassName} />{title}</h4>
          {body}
        </div>
      </div>
    );
  }
}

export default connect(state => state.toaster)(Toastr);
