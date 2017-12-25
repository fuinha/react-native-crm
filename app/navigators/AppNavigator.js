import React from 'react'; 

import { StackNavigator } from 'react-navigation';

import CRM from './../components/CRM';
import Detail from './../components/Detail';

export default AppNavigator = StackNavigator({
    VisitList: { screen: CRM },
    Info: { screen: Detail }
});