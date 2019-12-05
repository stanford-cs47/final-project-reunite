import {
  ARCHIVE,
  MESSAGE
} from './actions';

const initialState = {
  inbox: [
    {
      firstName: "Danielle",
      lastName: "Tang",
      pronoun: 'her',
      date: "Friday, Nov. 29th, 2:40 PM",
      arrival: null,
      picture: require("./assets/danielle.png")
    },
    {
      firstName: "Tyler",
      lastName: "Hong",
      pronoun: 'him',
      date: "Saturday, Nov. 30th, 1:10 PM",
      arrival: "Dec. 1",
      picture: require("./assets/tyler.png")
    },
    {
      firstName: "Jennifer",
      lastName: "He",
      pronoun: 'her',
      arrival: null,
      date: "Saturday, Nov. 30th, 10:20 PM",
      picture: require("./assets/jen.png")
    },
    {
      firstName: "Barack",
      lastName: "Obama",
      pronoun: 'him',
      arrival: 'Dec. 2',
      date: "Sunday, Dec. 1st, 4:20 PM",
      picture: require("./assets/barack_obama.jpg")
    },
    {
      firstName: "Justin",
      lastName: "Bieber",
      pronoun: 'him',
      arrival: null,
      date: "Sunday, Dec. 1st, 8:00 PM",
      picture: require("./assets/justin_bieber.jpg")
    }
  ],
  messages: [
    {
      firstName: "Daddy",
      lastName: "Marc",
      pronoun: 'him',
      date: "Monday, Nov. 2nd, 11:30 PM",
      picture: require('./assets/daddy_mark.jpeg'),
      messages: []
    },
    {
      firstName: "Pete",
      lastName: "Buttigieg",
      pronoun: 'him',
      date: "Friday, Oct. 31st, 3:40 PM",
      picture: require('./assets/pete_buttigieg.jpg'),
      messages: []
    },
    {
      firstName: "Angela",
      lastName: "Merkel",
      pronoun: 'her',
      date: "Thursday, Oct. 30th, 2:20 PM",
      picture: require('./assets/angela_merkel.jpg'),
      messages: []
    }
  ]
};

function rootReducer(state = initialState, action) {
  if (action.type === ARCHIVE) {
    let inbox = []
    let messages_new = []
    for (let i = 0; i < state.inbox.length; i++) {
      let {firstName, lastName, pronoun, date, arrival, picture} = state.inbox[i]
      let message = {}
      message.firstName = firstName
      message.lastName = lastName
      message.pronoun = pronoun
      message.date = date
      message.arrival = arrival
      message.picture = picture
      if (firstName != action.firstName || lastName != action.lastName) {
        inbox.push(message)
      }
    }
    for (let i = 0; i < state.messages.length; i++) {
      let {firstName, lastName, pronoun, date, picture, messages} = state.messages[i]
      let message = {}
      message.firstName = firstName
      message.lastName = lastName
      message.pronoun = pronoun
      message.date = date
      message.picture = picture
      let new_messages = []
      for (let j = 0; j < messages.length; j++) {
        let m = {}
        m._id = messages[j]._id
        m.text = messages[j].text
        m.createdAt = messages[j].createdAt
        m.user = messages[j].user
        new_messages.push(m)
      }
      message.messages = new_messages
      messages_new.push(message)
    }
    return { inbox: inbox, messages: messages_new };
  } else if (action.type === MESSAGE) {
    let inbox = []
    let messages_new = []
    for (let i = 0; i < state.inbox.length; i++) {
      let {firstName, lastName, pronoun, date, arrival, picture} = state.inbox[i]
      let message = {}
      message.firstName = firstName
      message.lastName = lastName
      message.pronoun = pronoun
      message.date = date
      message.arrival = arrival
      message.picture = picture
      inbox.push(message)
    }
    for (let i = 0; i < state.messages.length; i++) {
      let {firstName, lastName, pronoun, date, picture, messages} = state.messages[i]
      let message = {}
      message.firstName = firstName
      message.lastName = lastName
      message.pronoun = pronoun
      message.date = date
      message.picture = picture
      let new_messages = []
      for (let j = 0; j < messages.length; j++) {
        let m = {}
        m._id = messages[j]._id
        m.text = messages[j].text
        m.createdAt = messages[j].createdAt
        m.user = messages[j].user
        new_messages.push(m)
      }
      if (action.firstName == firstName && action.lastName == lastName) {
        let m = {}
        m._id = action.id
        m.text = action.text
        m.createdAt = action.createdAt
        m.user = action.user
        new_messages.push(m)
      }
      message.messages = new_messages
      messages_new.push(message)
    }
    console.log(messages_new)
    console.log(action.firstName + " " + action.lastName)
    return { inbox: inbox, messages: messages_new };
  }
  return state;
}

export default rootReducer;
