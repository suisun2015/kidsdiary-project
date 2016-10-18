import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { FlatButton, TextField, Table, TableHeader, TableBody,
    TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui';

import ContentHeader from '../../../common/components/ContentHeader';

import { requestSomeData, requestDetail } from '../actions/NewPageAction';

class NewPage extends Component {
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
              breadcrumb=""
          />

          <section className="content">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>?</TableHeaderColumn>
                  <TableHeaderColumn>?</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody>
                {someData.list.map((data, i) => {
                  return (
                    <TableRow key={i}>
                      <TableRowColumn>{data.name}</TableRowColumn>
                      <TableRowColumn>?</TableRowColumn>
                      <TableRowColumn>?</TableRowColumn>
                    </TableRow>);
                })}
              </TableBody>

            </Table>
            <FlatButton label="DETAIL" onClick={this.onClickRequest}/>
          </section>
        </div>
    );
  }
}

export default connect(state => state.newPage)(NewPage);
