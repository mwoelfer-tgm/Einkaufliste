// @flow
import React from 'react';
import { Animated, TouchableOpacity, View, Text } from 'react-native';
import firebase from 'react-native-firebase';

type State = {
}

type Props = {
    item : any
}

export default class Todo extends React.PureComponent<Props,State> {
    animatedValue : Animated.Value
    constructor(props : any) {
        super(props)

    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0)
    }

    componentDidMount(){
        Animated.timing(this.animatedValue, {
            toValue: this.props.item.bought == true ? 150 : 0,
            duration: 500
        }).start()
    }

    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.item.doc.ref.update({
            bought: !this.props.item.bought,
        });
        Animated.timing(this.animatedValue, {
            toValue: this.props.item.bought ? 0 : 150,
            duration: 500
        }).start()
    }

    delete() {
        this.props.item.doc.ref.delete()
    }

    render() {
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgb(255,255,255)', 'rgb(0, 255, 0)']
        })
        return (
            <TouchableOpacity
                onPress={() => this.toggleComplete()}
                onLongPress={() => this.delete()}
            >
                <Animated.View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center', backgroundColor:interpolateColor}}>
                    <View style={{ flex: 8 }}>
                        <Text style={{paddingLeft: 10 }}>{this.props.item.title}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        {this.props.item.bought && (
                            <Text style={{textAlign: "right", paddingRight: 10}}>Bought!</Text>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}