import React from 'react';
import { Route } from 'react-router';

import RootComponent from './container/RootComponent';
import NotFound from './container/NotFound';
import DashBoard from './dashBoard/components/DashBoard';

import DiaryList from '../common/diary/components/DiaryList';
import DiaryDetail from '../common/diary/components/DiaryDetail';
import DiaryForm from '../common/diary/components/DiaryForm';

import Album from '../common/album/components/Album';
import AlbumDetail from '../common/album/components/AlbumDetail';

export default (
  <Route path="/h" component={RootComponent}>

    <Route path="/h/dash_board" component={DashBoard}/>

    <Route path="/h/diary" component={DiaryList}/>
    <Route path="/h/diary/form" component={DiaryForm}/>
    <Route path="/h/diary/:diaryDate" component={DiaryDetail}/>

    <Route path="/h/album" component={Album}/>
    <Route path="/h/album/:albumId" component={AlbumDetail}/>

    <Route path="/h/*" component={NotFound}/>

  </Route>
);
