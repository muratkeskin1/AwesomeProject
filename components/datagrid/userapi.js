import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
export default class AppUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }
  
  async getUsers() {
    const url ="https://stajprojewebapi.azurewebsites.net/";
    try {
      const response = await fetch(REACT_APP_WEB_API+"user");
      const json = await response.json();
      console.log(json);
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { data, isLoading } = this.state;
    return (
      <View style={{ flex: 0.2, padding: 6 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Text>
                {item.name}, {item.age}
              </Text>
            )}
          ></FlatList>
        )}
      </View>
    );
  }
}
