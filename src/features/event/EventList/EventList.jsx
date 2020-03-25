import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    return (
      <Fragment>
        <EventListItem />
        <EventListItem />
        <EventListItem />
      </Fragment>
    );
  }
}
