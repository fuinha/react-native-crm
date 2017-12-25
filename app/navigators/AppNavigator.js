import React from 'react'; 

import { StackNavigator } from 'react-navigation';

import Navigator from './TabNavigator';
import Detail from './../components/Detail';

export default AppNavigator = StackNavigator({
    VisitList: { screen: Navigator },
    Info: { screen: Detail }
});