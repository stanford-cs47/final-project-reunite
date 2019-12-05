import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Icon, SearchBar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

class ArchiveScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <Icon name='new-message' size={34} type='entypo' color='#f50' containerStyle={{marginRight: 20}}/>
    };
  };

  updateSearch = search => {
    this.setState({ search });
  }

  getMessageItem(firstName, lastName, date, picture, messages) {
    let day = date.split(', ')[1]
    let message = ''
    for (let i = 0; i < messages.length; i++) {
      let m = messages[i]
      if (firstName == m.firstName && lastName == m.lastName) {
        if (m.messages.length > 0) {
          message = m.messages[m.messages.length - 1].text
        }
        break
      }
    }
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('Chat', { firstName, lastName })}>
        <Avatar
          size={50}
          rounded
          source={picture}
        />
        <View style={styles.listItemPanel}>
          <View style={styles.listItemTop}>
            <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.listItemDate}>{`${day}`}</Text>
            <Icon name='chevron-right' size={18} type='material-community' color='gray' containerStyle={{marginRight: 20}}/>
          </View>
          <Text style={styles.listItemMessage}>{`${message}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    let { search } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchBar
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme
          style={{
            position: 'absolute'
          }}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
        <ScrollView style={styles.messagesPanel}>
          <FlatList
            data={this.props.messages}
            renderItem={({ item }) => this.getMessageItem(item.firstName, item.lastName, item.date, item.picture, this.props.messages)}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchBarInput: {
    backgroundColor: '#ECEFF1',
    borderRadius: 20
  },
  messagesPanel: {
    position: 'absolute',
    top: '9%',
    height: '91%',
    width: '100%'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },
  listItemPanel: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  listItemTop: {
    flexDirection: 'row'
  },
  listItemName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  listItemDate: {
    fontSize: 14,
    marginLeft: 'auto',
    color: 'gray'
  },
  listItemMessage: {
    fontSize: 14,
    color: 'gray'
  }
})

function mapStateToProps(state) {
  const { messages } = state;
  return {
    messages
  };
}

export default connect(mapStateToProps)(ArchiveScreen);
