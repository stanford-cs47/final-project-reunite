import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native'
import { Avatar, Icon, SearchBar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PopoverTooltip from 'react-native-popover-tooltip';

function Meetup({ firstName, lastName, date, time, location, picture }) {
  return (
    <View style={styles.listItem}>
      <Avatar
        size={50}
        rounded
        source={picture}
      />
      <View style={styles.listItemText}>
        <Text style={styles.listItemDate}>{`${date}, ${time}`}</Text>
        <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.listItemLocation}>{`${location}`}</Text>
      </View>
      <PopoverTooltip
        buttonComponent={
          <View style={styles.tooltipMenu}>
            <Icon name='dots-horizontal' size={34} type='material-community' color='#f50'/>
          </View>
        }
        items={[
          {
            label: 'Change location'
          },
          {
            label: 'Change date/time'
          },
          {
            label: 'Cancel meetup'
          },
        ]}
      />
    </View>
  );
}

class EventsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      events: [
        {
          firstName: "Jennifer",
          lastName: "He",
          date: "Dec. 3",
          time: "7:00 PM",
          location: "Disneyland",
          picture: require("../assets/jen.png")
        },
        {
          firstName: "Tyler",
          lastName: "Hong",
          date: "Dec. 6",
          time: "1:00 PM",
          location: "Main Quad",
          picture: require("../assets/tyler.png")
        },
        {
          firstName: "Barack",
          lastName: "Obama",
          date: "Dec. 8",
          time: "12:00 PM",
          location: "No location specified",
          picture: require("../assets/barack_obama.jpg")
        }
      ]
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <Icon name='add-circle' size={34} type='material' color='#f50' containerStyle={{marginRight: 20}}/>
    };
  };

  updateSearch = search => {
    this.setState({ search });
  }

  render () {
    let { search, events } = this.state;

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
        <Text style={styles.eventsText}>Upcoming meetups</Text>
        <ScrollView style={styles.eventsPanel}>
          <FlatList
            data={this.state.events}
            renderItem={({ item }) => <Meetup firstName={item.firstName} lastName={item.lastName} date={item.date} time={item.time} location={item.location} picture={item.picture}/>}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  eventsPanel: {
    position: 'absolute',
    top: '13%',
    height: '90%',
    width: '100%'
  },
  eventsText: {
    fontSize: 20,
    left: '5%'
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchBarInput: {
    backgroundColor: '#ECEFF1',
    borderRadius: 20
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },
  listItemText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  listItemName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  listItemDate: {
    fontSize: 14
  },
  listItemLocation: {
    fontSize: 14
  },
  tooltipMenu: {
    alignSelf: 'flex-end',
    marginRight: 20
  }
})

export default EventsScreen
