import React from 'react'; 

import { TabNavigator } from 'react-navigation';

import CRM from './../components/CRM';
import VisitsSaved from './../components/VisitsSaved';

export default Navigator = TabNavigator(
	{
	    All: { 
	    	screen: CRM,
	    	navigationOptions: { tabBarLabel: 'All' }
	    },
	    Saved: { 
	    	screen: VisitsSaved,
	    	navigationOptions: { tabBarLabel: 'Saved' }
	    }
	},{
		tabBarOptions: {
  			labelStyle: {
    			fontSize: 12
  			},
  			style: {
    			backgroundColor: '#518eba',
    			borderColor: 'white'
  			},
		}
	}
);
