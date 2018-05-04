import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import Orientation from 'react-native-orientation';

type Props = {};
const limit = 20;

export default class MainScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state ={ isLoading: true, index: 19}
    }

    componentDidMount() {
        Orientation.lockToLandscape();
        this.loadGifList();
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
        if (this.state.index < limit - 1) {
            this.setState(previousState =>
                ({ index: previousState.index + 1 })
            );
        } else {
            this.loadGifList();
        }
    }

    loadGifList() {
        this.setState({ isLoading: true }, function(){});
        let timestamp = (this.state.dataSource) ? this.state.dataSource[this.state.index].timestamp
            : Math.floor(Date.now() / 1000);
        return fetch('https://api.tumblr.com/v2/tagged?tag=rainy%20gif'
            + '&api_key=UP92HnXLD36Gyng30sqhyVZiG1eMxgGIGT3ihNoL3wkM3wQqgr'
            + '&limit=' + limit
            + '&before=' + timestamp)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.response);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.response,
                    index: 19,
                });
            })
            .catch((error) => {
                console.error(error);
            });
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
