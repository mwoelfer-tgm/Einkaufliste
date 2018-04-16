import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import ShoppingList from './ShoppingList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  componentDidMount() {
    // firebase things?
  }

  render() {
    return (
      <ShoppingList/>
    );
  }
}