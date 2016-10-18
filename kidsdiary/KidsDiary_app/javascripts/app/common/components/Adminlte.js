import React, { Component } from 'react';
import classNames from 'classnames';
import elementType from '../../../../node_modules/react-prop-types/lib/elementType';

export class Box extends Component {
  static propTypes = {
    componentClass: elementType,
    solid: React.PropTypes.bool,
    default: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    info: React.PropTypes.bool,
    warning: React.PropTypes.bool,
    success: React.PropTypes.bool,
    danger: React.PropTypes.bool,
    className: React.PropTypes.string,
    children: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const ComponentClass = this.props.componentClass;
    const classes = {
      'box': true,
      'solid': this.props.solid,
      'default': this.props.default,
      'primary': this.props.primary,
      'info': this.props.info,
      'warning': this.props.warning,
      'success': this.props.success,
      'danger': this.props.danger
    };

    return (
      <ComponentClass {...this.porps} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

export class BoxBody extends Component {
  static propTypes = {
    componentClass: elementType,
    noPadding: React.PropTypes.bool,
    className: React.PropTypes.string,
    children: React.PropTypes.object
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const ComponentClass = this.props.componentClass;
    const classes = {
      'box-body': true,
      'no-padding': this.props.noPadding
    };

    return (
      <ComponentClass {...this.porps} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

export class BoxHeader extends Component {
  static propTypes = {
    componentClass: elementType,
    withBorder: React.PropTypes.bool,
    noPadding: React.PropTypes.bool,
    className: React.PropTypes.string,
    children: React.PropTypes.object
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const ComponentClass = this.props.componentClass;
    const classes = {
      'box-header': true,
      'no-padding': this.props.noPadding,
      'with-border': this.props.withBorder
    };

    return (
      <ComponentClass {...this.porps} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

