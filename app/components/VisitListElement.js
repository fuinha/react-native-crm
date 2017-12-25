import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { select } from './../reducers/actions';

import Icon from 'react-native-vector-icons/FontAwesome';

class VisitListElement extends React.Component {

    render() {
        moment.locale('es');
        let plannedFor 	= moment(this.props.visit.plannedFor).format('L');
        let fulfilledAt = (this.props.visit.fulfilledAt !== null) ? moment(this.props.visit.fulfilledAt).format('L') : <Text style={styles.italic}>Pending</Text>;

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', { visit: this.props.visit })} style={styles.cell}>
                <View>
                    <Text style={styles.text}><Icon name='shopping-cart' size={15} color='#518eba'/> <Text style={styles.bold}>Customer:</Text> {this.props.visit.Customer.name}</Text>
                    <Text style={styles.text}><Icon name='briefcase' size={15} color='#518eba'/> <Text style={styles.bold}>Salesman:</Text> {this.props.visit.Salesman.fullname}</Text>
                    <Text style={styles.text}><Icon name='calendar' size={15} color='#518eba'/> <Text style={styles.bold}>Date:</Text> {plannedFor} | {fulfilledAt}</Text>
                </View>
                <Icon name='chevron-right' color='#808080' />
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        navigation: state.nav
    };
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#FFFFFF',
        paddingRight: '4%',
        paddingLeft: '4%',
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bold: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 15
    },
    italic: {
        fontStyle: 'italic'
    }
});

export default connect(mapStateToProps)(VisitListElement);
