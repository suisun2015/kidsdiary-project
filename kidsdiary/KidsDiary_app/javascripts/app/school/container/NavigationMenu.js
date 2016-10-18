import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux';

import {
    Table, TableHeader, TableBody,
    TableRow, TableHeaderColumn, TableRowColumn,
    FloatingActionButton, SelectField, TimePicker, Divider
    , ActionDone
    , Paper

    , Dialog
    , FlatButton
    , RaisedButton
    , Card
    , CardActions
    , CardHeader
    , CardText
    , Toolbar
    , ToolbarGroup
} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import cookie from '../../common/utils/Cookie';
import {ImageDiv} from '../../common/components/ImageDiv';


class NavigationMenu extends Component {

  handleLogout = ()=> {
    console.log('cookie =', cookie);
    cookie.unset('userToken');
    cookie.unset('userId');
    this.props.dispatch(push('/login'));
  };

  render() {
    const {user} = this.props;
    console.log('user =', user);
    const BACK_GROUND_COLOR = '#ac92ec';

    const menuStyle = {
      icon: {
        width: '28px',
        height: '28px',
        verticalAlign: 'middle'
      },
      iconD: {
        width: '28px',
        height: '28px',
        verticalAlign: 'middle',
        color: '#ccc'
      },
      text: {
        marginLeft: '16px',
        verticalAlign: 'middle'
      },
      textD: {
        marginLeft: '16px',
        verticalAlign: 'middle',
        color: '#ccc'
      }
    };
    let forceNavDown = {
      position: 'absolute',
      top: '64px'
    };

    return (
        <aside>
          <AppBar
              iconElementLeft={<i/>}
              style={{
                backgroundColor: BACK_GROUND_COLOR,
                boxShadow: '',
                textAlign: "center"
              }}
              iconElementRight={<FlatButton onTouchTap={this.handleLogout} label="サインアウト" />}
              title="X際児年間指導計画"
              />
          <Drawer width={220} containerStyle={forceNavDown} open={false}>
            <div className="h_center">
              <ImageDiv src="/assets/images/teacher.jpg" border="solid 3px #fff" width={140}
                        style={{marginTop:'16px', marginBottom: '8px'}}/>
            </div>
            <div className="h_center" style={{color: '', marginBottom: '4px'}}>{user.name} 先生</div>
            <div className="h_center" style={{color: '', marginBottom: '16px'}}>{user.room}</div>

            <MenuItem onTouchTap={() => this.props.dispatch(push('/s/dash_board'))} >
              <i className="material-icons md-32" style={menuStyle.icon}>apps</i>
              <span style={menuStyle.text}>ダッシュボード</span>
            </MenuItem>

            <MenuItem onTouchTap={() => this.props.dispatch(push('/s/manage'))}>
              <i className="material-icons md-32" style={menuStyle.icon}>apps</i>
              <span style={menuStyle.text}>管理</span>
            </MenuItem>

            <MenuItem onTouchTap={() => this.props.dispatch(push('/s/invitation'))}>
              <i className="material-icons md-32" style={menuStyle.icon}>apps</i>
              <span style={menuStyle.text}>招待</span>
            </MenuItem>

            <MenuItem disabled>
              <i className="material-icons md-32" style={menuStyle.iconD}>accessibility</i>
              <span style={menuStyle.textD}>健康</span>
            </MenuItem>

            <MenuItem onTouchTap={() => this.props.dispatch(push('/s/diary_list/1'))}>
              <i className="material-icons md-32" style={menuStyle.icon}>description</i>
              <span style={menuStyle.text}>ダイアリー</span>
            </MenuItem>

            <MenuItem disabled>
              <i className="material-icons md-32" style={menuStyle.iconD}>assignment_turned_in</i>
              <span style={menuStyle.textD}>お知らせ</span>
            </MenuItem>

            <MenuItem onTouchTap={() => this.props.dispatch(push('/s/album'))}>
              <i className="material-icons md-32" style={menuStyle.icon}>photo_album</i>
              <span style={menuStyle.text}>アルバム</span>
            </MenuItem>
            <MenuItem disabled>
              <i className="material-icons md-32" style={menuStyle.iconD}>event_note</i>
              <span style={menuStyle.textD}>カレンダー</span>
            </MenuItem>
          </Drawer>

        </aside>
    );
  }
}

export default connect(state => state)(NavigationMenu);
