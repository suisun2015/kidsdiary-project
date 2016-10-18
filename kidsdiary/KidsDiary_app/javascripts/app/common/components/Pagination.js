import _ from 'immutable';
import React, { Component, PropTypes } from 'react';
import { Pagination } from 'react-bootstrap';
import { push } from 'react-router-redux'
import { mapToUrlParams } from '../utils/Url';

export default class PaginationWrapper extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { limit, totalHits, center, dispatch, location } = this.props;

    const activePageAct = location.query.page ? parseInt(location.query.page, 10) : 1;

    const items = Math.ceil(totalHits / limit);
    const c = center ? 'text-center' : '';
    return (
      <div className={c}>
        <Pagination
          bsSize="medium"
          items={items}
          prev
          next
          ellipsis
          maxButtons={9}
          activePage={activePageAct}
          onSelect={function(event, selectedEvent) {
            const newQuery = _.Map(location.query).set('page', selectedEvent.eventKey);
            dispatch(push({
              pathname: location.pathname,
              search: mapToUrlParams(newQuery)
            }));
          }}
        />
      </div>
    );
  }
}

PaginationWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired,
  totalHits: PropTypes.number.isRequired,
  center: PropTypes.bool
};
