import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import moment from 'moment';
import 'moment/locale/es';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class VisitDetail extends React.Component {

    render() {
        moment.locale('es');
        let plannedFor 	= moment(this.props.visit.plannedFor).format('L');
        let fulfilledAt = (this.props.visit.fulfilledAt !== null) ? moment(this.props.visit.fulfilledAt).format('L') : 'Pending';

        return (
            <View>
				<Text style={styles.text}><Icon name='calendar' color='#518eba'/> <Text style={styles.bold}>Planned for:</Text> {plannedFor}</Text>
				<Text style={styles.text}><Icon name='calendar' color='#518eba'/> <Text style={styles.bold}>Fulfilled at:</Text> {fulfilledAt}</Text>
			</View>
        );
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    }
});
