import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestInfo } from '../actions/DashBoardActions';

class DashBoard extends Component {

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(requestInfo());
  };

  onClickSave = () => {
    const { dispatch } = this.props;

    dispatch({});
  };

  render = () => {
    const { info } = this.props;
    console.log('this.props =',this.props);
    if (!info) {
      return <div>loading</div>
    }
    return (
        <div>
          <section className="content">
            <p>
              子供：{info.child.name}
            </p>
            <p>
              学園：{info.school ? info.school.name : ''}
            </p>
            <p>
              教室：{info.room ? info.room.name : ''}
            </p>

          </section>
        </div>
    );
  };
}

DashBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  data: PropTypes.object
};

export default connect(state => state.homeDashBoard)(DashBoard);
