import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ContentHeader from '../../../common/components/ContentHeader';
import { requestSomeData, requestDetail } from '../actions/PetListAction';

import DropDownSelYr from './selectYear';
import DropDownSelChildAge from './selectChildAge';
import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import EditablePlanTable from './planTable';


class PetList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
    someData01: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onClickRequest = this.onClickRequest.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestSomeData());
  }

  componentDidUpdate(prevProps) {
    const { dispatch, location } = this.props;

    if (location !== prevProps.location) {
      dispatch(requestSomeData());
    }
  }

  onClickRequest() {
    const { dispatch } = this.props;
    dispatch(requestDetail({}));
  }

  render() {
    const { data, someData } = this.props;
    console.log('someData =',someData);
    return (
        <div>
          <ContentHeader
              headerTitle=""
              description=""
              breadcrumb="" />

          <Toolbar style={{ margin: 20, borderRadius: 8 }}>
            <ToolbarGroup firstChild={ true }>
              <DropDownSelYr/>
              <DropDownSelChildAge/>
            </ToolbarGroup>
            <ToolbarGroup>
              <FontIcon className="material-icons">print</FontIcon>
            </ToolbarGroup>
          </Toolbar>

          <div className="input-panel">
            <h3>
              保育目標
            </h3>
            <textarea rows="6" />
          </div>

          <div className="input-panel">
            <h3>
              注力ポイント
            </h3>
            <textarea rows="6" />
          </div>

          <EditablePlanTable/>

          <br /><br /><br />

        </div>
    );
  }
}

export default connect(state => state.petList)(PetList);
