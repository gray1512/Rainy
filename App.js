import React, { Component } from 'react';

import {StackNavigator, SwitchNavigator} from "react-navigation";
import LaunchScreen from "./LaunchScreen";
import MainScreen from "./MainScreen";

// type Props = {};
// Main Stack
const Rainy = StackNavigator({
        Main: { screen: MainScreen },
    },
    {
        initialRouteName: 'Main',
    });

export default SwitchNavigator( //
    {
        Launch: LaunchScreen,
        App: Rainy
    },
    {
        initialRouteName: 'Launch',
    }
);

/*export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Rainy />;
    }
}*/
