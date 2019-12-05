import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PopoverTooltip from 'react-native-popover-tooltip';

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: "Ricky",
      lastName: "Grannis-Vu",
      home: "Irvine, CA",
      email: "test@stanford.edu",
      phone: "+1 (123) 456-7890",
      plans: [
        {
          destination: 'Honolulu, HI',
          startDate: 'Dec. 13',
          endDate: 'Dec. 26'
        },
        {
          destination: 'Sydney, Australia',
          startDate: 'Dec. 27',
          endDate: 'Jan. 3'
        }
      ]
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <Icon name='settings' size={34} type='material' color='#f50' onPress={() => navigation.navigate('Settings')} containerStyle={{marginLeft: 20}}/>,
      headerRight: () => <Icon name='people' size={34} type='material' color='#f50' onPress={() => navigation.navigate('Friends')} containerStyle={{marginRight: 20}}/>
    };
  };

  getTravelItem(destination, startDate, endDate) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('Chat', { firstName, lastName })}>
        <View style={styles.listItemPanel}>
          <Text style={styles.listItemDestination}>{`${destination}`}</Text>
          <Text style={styles.listItemDate}>{`${startDate}-${endDate}`}</Text>
        </View>
        <PopoverTooltip
          buttonComponent={
            <View style={styles.tooltipMenu}>
              <Icon name='dots-horizontal' size={34} type='material-community' color='#f50'/>
            </View>
          }
          items={[
            {
              label: 'Edit'
            },
            {
              label: 'Delete'
            },
          ]}
        />
      </TouchableOpacity>
    );
  }

  render () {
    let { firstName, lastName, email, phone } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column'}}>
        <View style={styles.mainInfo}>
          <Image
            source={require('../assets/ricky.jpg')}
            style={{width: imageRadius, height: imageRadius, borderRadius: imageRadius/2}}
          />
          <View style={styles.namePanel}>
            <Text style={styles.nameText}>{`${this.state.firstName} ${this.state.lastName}`}</Text>
          </View>
          <View style={styles.homePanel}>
            <Icon name='location-on' size={24} type='material' color='#f50'/>
            <Text style={styles.homeText}>{`${this.state.home}`}</Text>
          </View>
        </View>
        <View style={styles.profilePanel}>
          <View style={styles.travelPanel}>
            <Text style={styles.profileText}>Travel plans </Text>
            <Icon name='add-circle' size={24} type='material' color='#f50'/>
          </View>
          <FlatList
            data={this.state.plans}
            renderItem={({ item }) => this.getTravelItem(item.destination, item.startDate, item.endDate)}
            keyExtractor={item => item.destination}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const imageRadius = 150;

const styles = StyleSheet.create({
  mainInfo: {
    alignItems: 'center',
    marginTop: '8%'
  },
  namePanel: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  nameText: {
    fontSize: 24
  },
  homePanel: {
    flexDirection: 'row',
    marginTop: '3%',
    marginBottom: '3%'
  },
  homeText: {
    fontSize: 20
  },
  profilePanel: {
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%'
  },
  profileText: {
    fontSize: 20
  },
  travelPanel: {
    flexDirection: 'row',
    marginTop: '3%',
    marginBottom: '3%'
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
    flexDirection: 'column'
  },
  listItemDestination: {
    fontSize: 18
  },
  listItemDate: {
    fontSize: 14
  },
  tooltipMenu: {
    alignSelf: 'flex-end',
    marginRight: 20
  }
})

export default ProfileScreen;
