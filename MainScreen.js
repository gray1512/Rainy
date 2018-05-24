import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View,
    BackHandler
} from 'react-native';
import Orientation from 'react-native-orientation';
import Sound from "react-native-sound";

type Props = {};
const limit = 10;
Sound.setCategory('Playback');
let rain = new Sound('audio.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('Cant load audio file: ' + error);
    }
});

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

        BackHandler.addEventListener('hardwareBackPress', function() {
            rain.release();
            BackHandler.exitApp();
            return true;
        });

        rain.setNumberOfLoops(-1);
        rain.play((success) => {
            if (!success) {
                console.log('Sound did not play');
            }
        });

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
    };

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
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.response,
                    index: 0,
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
        backgroundColor: '#231f20',
    }
});
