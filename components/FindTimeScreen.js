import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation'

class FindTimeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      friendFirstName: this.props.navigation.getParam('friendFirstName'),
      friendLastName: this.props.navigation.getParam('friendLastName'),
      times: [
        {
          date: "December 3rd",
          time: "7:00 PM",
          selected: false
        },
        {
          date: "December 4th",
          time: "4:00 PM",
          selected: false
        },
        {
          date: "December 7th",
          time: "2:00 PM",
          selected: false
        },
        {
          date: "December 7th",
          time: "8:00 PM",
          selected: false
        }
      ]
    }
  }

  toggleSelection(date, time) {
    for (let i = 0; i < this.state.times.length; i++) {
      let t = this.state.times[i]
      if (t.date == date && t.time == time) {
        let times = this.state.times
        times[i].selected = !times[i].selected
        this.setState({ times: times })
        return
      }
    }
  }

  getIcon(selected) {
    if (selected) {
      return (
        <Icon name='check-box' size={28} type='material' color='white' containerStyle={styles.check}/>
      )
    } else {
      return (
        <Icon name='check-box-outline-blank' size={28} type='material' color='white' containerStyle={styles.check}/>
      )
    }
  }

  getTimeItem(date, time, selected) {
    return (
      <TouchableOpacity style={selected ? styles.listItemSelected : styles.listItem} onPress={() => this.toggleSelection(date, time)}>
        <Text style={styles.listItemTime}>{`${date}, ${time}`}</Text>
        {
          this.getIcon(selected)
        }
      </TouchableOpacity>
    );
  }

  navigate(navigation) {
    navigation.dispatch(StackActions.pop({ n: 1 }))
    navigation.navigate('Meetups')
  }

  render () {
    let { friendFirstName, friendLastName } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.infoText}>
          <Text style={styles.infoText1}>
            {`We have found the optimal times for you and ${friendFirstName} ${friendLastName} to meet, based off of your Google Calendars.`}
          </Text>
          <Text style={styles.infoText2}>
            Select times you are available. You can select as many times as you like.
          </Text>
        </View>
        <FlatList
          data={this.state.times}
          renderItem={({ item }) => this.getTimeItem(item.date, item.time, item.selected)}
          keyExtractor={item => item.date + item.time}
        />
        <Button
          containerStyle={styles.finishButtonContainer}
          buttonStyle={styles.finishButton}
          title='Finish'
          onPress={() => this.navigate(this.props.navigation)}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  infoText: {
    backgroundColor: '#ffbf9f',
    borderStyle: 'dashed',
    borderColor: '#f50',
    borderWidth: 2,
    margin: '5%'
  },
  infoText1: {
    fontSize: 16,
    margin: '5%'
  },
  infoText2: {
    fontSize: 16,
    margin: '5%',
    marginTop: 0
  },
  finishButtonContainer: {
    height: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%'
  },
  finishButton: {
    backgroundColor: '#f50'
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f50',
    marginBottom: '3%',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%'
  },
  listItemSelected: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffbf9f',
    marginBottom: '3%',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%'
  },
  listItemTime: {
    fontSize: 16,
    color: 'white',
    paddingTop: 4
  },
  check: {
    marginLeft: 'auto'
  }
})

export default FindTimeScreen
