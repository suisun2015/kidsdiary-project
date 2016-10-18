import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ContentHeader extends Component {

  render() {
    const { headerTitle, description, breadcrumb } = this.props;

    return (
      <section className="content-header">
        <h1>
          { headerTitle }<small>{ description }</small>
        </h1>
          {
            breadcrumb ? (
              <ol className="breadcrumb">
              {
                breadcrumb.map((crumb, num) => {
                  const isNotLast = breadcrumb.length !== num + 1;
                  return isNotLast ?
                    (<li key={num}><Link to={crumb.to}>{crumb.text}</Link></li>)
                    : (<li className={'active'} key={num}>{crumb.text}</li>);
                })
              }
              </ol>
            ) : ''
          }
      </section>
    );
  }

}

ContentHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  description: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(PropTypes.object)
};
