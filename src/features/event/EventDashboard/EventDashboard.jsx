import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsFromDashBoard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
];

class EventDashboard extends Component {
  state = {
    events: eventsFromDashBoard,
    isOpen: false,
    selectedEvent: null,
  };

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null,
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false,
    });
  };

  //A funtion to handle created new event, then we pass down the function as props to EventForm
  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid(); // Create unique id
    newEvent.hostPhotoURL = "/assets/user.png"; //set up temporary hostPhotoURL
    this.setState(({ events }) => ({
      //events here is from previous state
      events: [...events, newEvent], //create a new array with the element in the event array at previous state and newEvent
      isOpen: false, //close the form
    }));
  };

  handleSelectEvent = (event) => {
    //receive actual event object as parameter (not the onClick event)
    this.setState({
      selectedEvent: event,
      isOpen: true,
    });
  };

  handleUpdateEvent = (updatedEvent) => {
    //received an updatedEvent
    this.setState(({ events }) => ({
      //get our events out of our previous state // destructure events from state
      events: events.map((event) => {
        //loop over each individual event in events array
        if (event.id === updatedEvent.id) {
          //if the event has the id the same with id of updatedEvent
          return { ...updatedEvent }; //we'll return an updatedEvent, this is going to spread the event properties and return that as a new event inside our events array
        } else {
          // if the event.id doesn't equal updatedEvent.id, we want to just return the event as it is because that hasn't been updated
          return event;
        }
      }),
      isOpen: false, //close the form
      selectedEvent: null, //reset the selectedEvent
    }));
  };

  handleDeleteEvent = (id) => {
    //pass in the event id as the parameter
    this.setState(({ events }) => ({
      //bring in our previous state events
      events: events.filter((e) => e.id !== id), //Filter out the events that we're deleting, this returns a new array that excludes the event that matches the id that we're passing here
      //this filter method returns the elements of an array that meets the condition specified in a callback function which is e.id !== id,
    }));
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            //pass the handleDeletEvent method to EventList which will then pass down to EventListItem
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content='Create Event'
          />
          {isOpen && (
            <EventForm
              //Give an EventForm a key
              //if there is a selectedEvent then we'll use selectedEvent.id as the key value, but if the selectedEvent is null we'll use zero as the key value
              key={selectedEvent ? selectedEvent.id : 0}
              //pass down handleUpdateEvent method to our EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
