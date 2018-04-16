// @flow

import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, View, Text, TextInput, Button, StyleSheet, ActivityIndicator} from 'react-native';
import ShoppingItem from "./ShoppingItem"

export type ShoppingItemType = {
    key: number,
    doc: any,
    title: string,
    bought: boolean
}
type State = {
    textInput : string,
    loading : boolean,
    shoppingList : ShoppingItemType[]
}

type Props = {

}
class ShoppingList extends React.Component<Props, State> {
    ref : any
    unsubscribe : any

    constructor() {
        super();
        this.ref = firebase.firestore().collection('shoppinglist');
        this.unsubscribe = null
        this.state = {
            textInput: '',
            loading : true,
            shoppingList : []
        };
    }

    onCollectionUpdate = (snap : any) => {
        let shoppingList : ShoppingItemType[] = []
        
        snap.forEach((el) => {
            let { title, bought} = el.data()
            console.log("title", title)
            let key : number = el.id
            shoppingList.push({
                key: key,
                doc: el,
                title,
                bought
            });
        });
        
        console.log(shoppingList)
        this.setState({
            shoppingList,
            loading: false
        })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate.bind(this)) 
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    addItem() {
        this.ref.add({
          title: this.state.textInput,
          bought: false,
        });
        this.setState({
          textInput: '',
        });
      }

    updateTextInput(value : string) {
        this.setState({ textInput: value });
    }

    render() {
        if (this.state.loading) return <ActivityIndicator size="large" color="#000000" />
        console.log("not loading anymore")
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.shoppingList}
                    renderItem={({item}) => 
                        <ShoppingItem item={item}/> 
                    }
                >
                </FlatList>
                <TextInput
                    placeholder={'...new shopping-item'}
                    value={this.state.textInput}
                    onChangeText={(s) => this.updateTextInput(s)}
                />
                <Button
                    title={'Add new shopping-item'}
                    disabled={!this.state.textInput.length}
                    onPress={() => this.addItem()}
                />
            </View>
          );
    }
}

export default ShoppingList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
});