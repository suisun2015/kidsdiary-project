import React from 'react';
import { Route } from 'react-router';
import RootComponent from '../common/components/layout/RootComponent';
import NotFound from '../common/components/NotFound';

import HomeRoutes from '../home/HomeRoutes';
import SchoolRoutes from '../school/SchoolRoutes';

import SignUp from '../common/signUp/components/SignUp';
import SignUpParent from '../common/signUp/components/SignUpParent';
import SignUpTeacher from '../common/signUp/components/SignUpTeacher';
import SignUpDirector from '../common/signUp/components/SignUpDirector';
import Login from '../common/login/components/Login';
import Top from '../common/login/components/Top';

export default (
    <Route>
      <Route path="/login" component={Login}/>
      <Route path="/signUp" component={SignUp}/>
      <Route path="/signUp/parent" component={SignUpParent}/>
      <Route path="/signUp/teacher" component={SignUpTeacher}/>
      <Route path="/signUp/director" component={SignUpDirector}/>

      {SchoolRoutes}

      {HomeRoutes}
      <Route path="/" component={Top} />
      <Route path="*" component={NotFound}/>
    </Route>
);
