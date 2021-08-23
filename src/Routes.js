import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { PublicRouteWithLayout } from './components/RouteWithLayout';
import { Minimal as MinimalLayout } from './layouts';

import ScheduleAppointment from 'views/ScheduleAppointment';
import TestdAppointmentCalendar from 'views/TestdAppointmentCalendar';
import RapidPass from 'views/RapidPass';
import Prod007Start from 'views/Prod007Start';
import { NotFound } from 'views';
import Go from 'views/Go';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/not-found"
      />

      <PublicRouteWithLayout
        component={Go}
        exact
        layout={MinimalLayout}
        path="/go/:endpoint"
      />
      <PublicRouteWithLayout
        component={ScheduleAppointment}
        exact
        layout={MinimalLayout}
        path="/schedule-appointment/:phone"
      />
      <PublicRouteWithLayout
        component={TestdAppointmentCalendar}
        exact
        layout={MinimalLayout}
        path="/testd-appointment-calendar/:step"
      />
      <PublicRouteWithLayout
        component={RapidPass}
        exact
        layout={MinimalLayout}
        path="/rapid-pass/:id"
      />
      <PublicRouteWithLayout
        component={Prod007Start}
        exact
        layout={MinimalLayout}
        path="/start"
      />
      <PublicRouteWithLayout
        component={NotFound}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
