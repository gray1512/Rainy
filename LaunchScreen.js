import React, { Component } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

type Props = {};

export default class LaunchScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        setTimeout(() => {
            this.props.navigation.navigate('Main')
        }, 3000);
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden />
                <Image
                    style={{height: 128}}
                    source={require('./res/rainy_logo.png')}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#231f20',
    }
});
