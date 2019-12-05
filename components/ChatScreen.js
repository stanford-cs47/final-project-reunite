import React, { Component } from 'react'
import { MESSAGE } from '../actions'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { GiftedChat, Composer, InputToolbar, Send, Bubble } from 'react-native-gifted-chat'

class ChatScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: this.props.navigation.getParam('firstName'),
      lastName: this.props.navigation.getParam('lastName')
    }
    this.props.navigation.setParams({ title: `${this.state.firstName} ${this.state.lastName}` })
  }

  static navigationOptions = ({ navigation }) => ({
      title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Chat': navigation.state.params.title,
      headerRight: () => <Icon name='phone' size={34} type='entypo' color='#f50' containerStyle={{marginRight: 20}}/>
  });

  onSend(dispatch, firstName, lastName, messages = []) {
    for (let i = 0; i < messages.length; i++) {
      let m = messages[i]
      dispatch({ type: 'MESSAGE', firstName, lastName, id: m._id, text: m.text, createdAt: m.createdAt, user: m.user})
    }
  }

  renderActions() {
    return (
      <Icon name='calendar-plus' size={30} type='material-community' color='#f50' containerStyle={styles.calendarButton}/>
    )
  }

  render() {
    let messages = []
    for (let i = 0; i < this.props.messages.length; i++) {
      if (this.state.firstName == this.props.messages[i].firstName && this.state.lastName == this.props.messages[i].lastName) {
        messages = this.props.messages[i].messages
        break
      }
    }
    return (
      <GiftedChat
        messages={messages.reverse()}
        onSend={messages => this.onSend(this.props.dispatch, this.state.firstName, this.state.lastName, messages)}
        user={{
          _id: 1,
        }}
        alwaysShowSend
        renderActions={() => this.renderActions()}
        renderComposer={props => ( <Composer {...props} textInputStyle={styles.composer} placeholder={'Send a chat'} /> )}
        renderInputToolbar={props1 => ( <InputToolbar {...props1} containerStyle={styles.inputToolbar} /> )}
        renderSend={props2 => ( <Send {...props2} textStyle={styles.send} /> )}
        renderBubble={props3 => ( <Bubble {...props3} wrapperStyle={{ left: { backgroundColor: '#f50' }, right: { backgroundColor: '#f50' } }} /> )}
      />
    )
  }
}

const styles = StyleSheet.create({
  calendarButton: {
    marginLeft: 10,
    marginBottom: 5
  },
  composer: {
    backgroundColor: '#ECEFF1',
    borderRadius: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 9,
    fontSize: 14
  },
  inputToolbar: {
    borderTopWidth: 0,
    marginBottom: '1%'
  },
  send: {
    color: '#f50'
  }
})

function mapStateToProps(state) {
  const { messages } = state;
  return {
    messages
  };
}

export default connect(mapStateToProps)(ChatScreen);
