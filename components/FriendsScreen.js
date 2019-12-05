import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Icon, SearchBar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PopoverTooltip from 'react-native-popover-tooltip';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class FriendsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      favorites: [
        {
          firstName: "Tyler",
          lastName: "Hong",
          location: "Vadreis Heights, MN",
          picture: require("../assets/tyler.png")
        },
        {
          firstName: "Daddy",
          lastName: "Marc",
          location: "Stanford, CA",
          picture: require("../assets/daddy_mark.jpeg")
        }
      ],
      friends: [
        {
          firstName: "Jennifer",
          lastName: "He",
          location: "Palo Alto, CA",
          picture: require("../assets/jen.png")
        },
        {
          firstName: "Danielle",
          lastName: "Tang",
          location: "Sydney, Australia",
          picture: require("../assets/danielle.png")
        },
        {
          firstName: "Barack",
          lastName: "Obama",
          location: "Honolulu, HI",
          picture: require("../assets/barack_obama.jpg")
        }
      ]
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <Icon name='person-add' size={34} type='material' color='#f50' containerStyle={{marginRight: 20}} onPress={() => navigation.navigate('AddFriends')}/>
    };
  };

  updateSearch = search => {
    this.setState({ search });
  }

  getFriendItem(firstName, lastName, location, picture) {
    return (
      <TouchableOpacity style={styles.listItem}>
        <Avatar
          size={50}
          rounded
          source={picture}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
          <View style={styles.listItemLocationPanel}>
            <Icon name='location-on' size={16} type='material' color='#f50'/>
            <Text style={styles.listItemLocation}>{`${location}`}</Text>
          </View>
        </View>
        <PopoverTooltip
          buttonComponent={
            <View style={styles.tooltipMenu}>
              <Icon name='dots-horizontal' size={34} type='material-community' color='#f50'/>
            </View>
          }
          items={[
            {
              label: 'View profile'
            },
            {
              label: 'Send message'
            },
            {
              label: 'Favorite'
            },
            {
              label: 'Unfriend'
            },
            {
              label: 'Block'
            }
          ]}
        />
      </TouchableOpacity>
    );
  }

  render () {
    let { search, favorites, friends } = this.state;

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
        <ScrollView style={styles.friendsPanel}>
          <Text style={styles.friendsText}>Favorites</Text>
          <FlatList
            data={this.state.favorites}
            renderItem={({ item }) => this.getFriendItem(item.firstName, item.lastName, item.location, item.picture)}
            keyExtractor={item => item.firstName + item.lastName}
          />
          <Text style={styles.friendsText}>All friends</Text>
          <FlatList
            data={this.state.friends}
            renderItem={({ item }) => this.getFriendItem(item.firstName, item.lastName, item.location, item.picture)}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  friendsPanel: {
    position: 'absolute',
    top: '9%',
    height: '91%',
    width: '100%'
  },
  friendsText: {
    fontSize: 20,
    marginTop: '3%',
    marginLeft: '5%'
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
    fontSize: 18
  },
  listItemLocationPanel: {
    flexDirection: 'row',
    marginTop: '2%'
  },
  listItemLocation: {
    fontSize: 14
  },
  tooltipMenu: {
    alignSelf: 'flex-end',
    marginRight: 20
  }
})

export default FriendsScreen
