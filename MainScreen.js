import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';

type Props = {};
const limit = 20;

export default class MainScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state ={ isLoading: true, index: 0}
    }

    componentDidMount() {
        return fetch('https://api.tumblr.com/v2/tagged?tag=rainy%20gif&api_key=UP92HnXLD36Gyng30sqhyVZiG1eMxgGIGT3ihNoL3wkM3wQqgr'
            + '&limit=' + limit)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.response,
                }, function(){});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <StatusBar hidden />

                    <ActivityIndicator size='large' color='#757473' />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <TouchableHighlight
                    style={{width: '100%', height: '100%'}}
                    onLongPress={this._onLongPressImg}>
                    <Image
                        style={{width: '100%', height: '100%'}}
                        source={{uri: this.state.dataSource[this.state.index].photos[0].alt_sizes[0].url}}
                    />
                </TouchableHighlight>

            </View>
        );
    }

    _onLongPressImg = () => {
        if (this.state.index < limit) {
            this.setState(previousState =>
                ({ index: previousState.index + 1 })
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%', height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    }
});
