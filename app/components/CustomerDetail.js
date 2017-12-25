import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomerDetail extends React.Component {
    constructor(props) {
        super(props);

        this.empty = this.empty.bind(this);
    }

    empty(str) {
        if (str === null || str === '')
            {return true;}
        return false;
    }

    render() {
        return (
			<View>
				<Text style={styles.header}><Icon name='shopping-cart' size={18} color='#518eba'/> Customer</Text>
				<View>
					<Text><Icon name='user' color='#518eba'/> {(!this.empty(this.props.customer.name)) ? this.props.customer.name : <Text style={styles.empty}>empty</Text>}</Text>
					<Text><Icon name='barcode' color='#518eba'/> {(!this.empty(this.props.customer.code)) ? this.props.customer.code : <Text style={styles.empty}>empty</Text>}</Text>
					<Text><Icon name='tags' color='#518eba'/> {(!this.empty(this.props.customer.cif)) ? this.props.customer.cif : <Text style={styles.empty}>empty</Text>}</Text>
					<Text><Icon name='envelope' color='#518eba'/> {(!this.empty(this.props.customer.email1)) ? this.props.customer.email1 : <Text style={styles.empty}>empty</Text>}</Text>
					<Text><Icon name='home' color='#518eba'/> {(!this.empty(this.props.customer.address1)) ? this.props.customer.address1 : <Text style={styles.empty}>empty</Text>}</Text>
					<Text><Icon name='globe' color='#518eba'/> {(!this.empty(this.props.customer.web)) ? this.props.customer.web : <Text style={styles.empty}>empty</Text>}</Text>
					<Text><Icon name='phone' color='#518eba'/> {(!this.empty(this.props.customer.phone1)) ? this.props.customer.phone1 : <Text style={styles.empty}>empty</Text>}</Text>
				</View>
			</View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '1%'
    },
    empty: {
        fontStyle: 'italic',
        color: '#808080'
    }
});
