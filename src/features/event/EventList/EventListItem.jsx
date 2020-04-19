import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

export default class EventListItem extends Component {
  render() {
    const { event, selectEvent, deleteEvent } = this.props; //destructure
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {event.date} |
            <Icon name='marker' /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {
              //if the event.attendee is undefined, then it is not true, and the right hand side of this will not be executed
              event.attendees &&
                event.attendees.map((attendee) => (
                  <EventListAttendee key={attendee.id} attendee={attendee} />
                ))
            }
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            //To pass a parameter to a selectEvent function, we need to wrap selectEvent(event) into an arrow function so that it isn't immediately executed when we render this component
            onClick={() => deleteEvent(event.id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            //To pass a parameter to a selectEvent function, we need to wrap selectEvent(event) into an arrow function so that it isn't immediately executed when we render this component
            onClick={() => selectEvent(event)}
            as='a'
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}
