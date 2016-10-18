import React from 'react';
import { Route } from 'react-router';

import RootComponent from './container/RootComponent';
import NotFound from './container/NotFound';
//import DiaryDetail from './diary/components/DiaryDetail';
//import DiaryForm from './diary/components/DiaryForm';
//import DiaryForm2 from './diary/components/DiaryForm2';
//import DiaryList from './diary/components/DiaryList';
import DashBoard from './dashBoard/components/DashBoard';
import DirectorMenu from './director/components/DirectorMenu';

import DiaryList from '../common/diary/components/DiaryList';
import DiaryDetail from '../common/diary/components/DiaryDetail';
import DiaryForm from '../common/diary/components/DiaryForm';
//import DiaryForm2 from '../common/diary/components/DiaryForm2';

import Album from '../common/album/components/Album';
import AlbumDetail from '../common/album/components/AlbumDetail';
import PetList from './petList/components/PetList';

export default (
  <Route>
    <Route path="/s" component={RootComponent}>
      <Route path="/s/dash_board" component={DashBoard}/>

      <Route path="/s/diary_list/:childId" component={DiaryList}/>
      <Route path="/s/diary/:childId/:diaryDate/form" component={DiaryForm}/>
      <Route path="/s/diary/:childId/:diaryDate" component={DiaryDetail}/>
      
      <Route path="/s/album" component={Album}/>
      <Route path="/s/album/:albumId" component={AlbumDetail}/>
      <Route path="/s/petList" component={PetList}/>

      <Route path="/s/*" component={NotFound}/>
    </Route>
    <Route path="/d" component={RootComponent}>
      <Route path="/d/menu" component={DirectorMenu}/>
      <Route path="/d/*" component={NotFound}/>
    </Route>
  </Route>
);
