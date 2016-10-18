import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {requestSignUp} from '../actions/SignUpActions';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {FlatButton} from 'material-ui';

import {ImageDiv} from '../../../common/components/ImageDiv';
import {Row, Col} from '../../components/FlexGrid';
class SignUp extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  state = {
    schoolDialog: false,
    homeDialog: false
  };

  constructor(props) {
    super(props);
  }

  getChildContext = () => {
    return {muiTheme: getMuiTheme(baseTheme)};
  };

  render() {
    const {data} = this.props;

    return (
      <Row center>
        <Col md="12">
          <Row center>
            <Col>
              役割の登録
            </Col>
          </Row>
          <Row center>
            <Col>
              あなたの役割を選んでください。
            </Col>
          </Row>
        </Col>
        <Link to="/signUp/parent">
          <Col mdOffset='6' md="2"> 
            <Row center>
              <Col>
                <ImageDiv src={'assets/images/app/parent.png'} />
              </Col>
            </Row>
            <Row center>
              <Col>
                保護者
              </Col>
            </Row>
          </Col>
        </Link>
        <Link to="/signUp/teacher">
          <Col md="2">
            <Row center>
              <Col>
                <ImageDiv src={'assets/images/app/teacher.png'} />
              </Col>
            </Row>
            <Row center>
              <Col>
                先生
              </Col>
            </Row>
          </Col>
        </Link>
        <Link to="/signUp/director">
          <Col md="2">
            <Row center>
              <Col>
                <ImageDiv src={'assets/images/app/director.png'} />
              </Col>
            </Row>
            <Row center>
              <Col>
                園長
              </Col>
            </Row>
          </Col>
        </Link>
      </Row>

);
}
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  data: PropTypes.object
};

export default connect(state => state)(SignUp);
