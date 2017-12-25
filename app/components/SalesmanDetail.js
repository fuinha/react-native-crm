import React from 'react';

import { Text, View, StyleSheet, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SalesmanDetail extends React.Component {
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
        	<View style={styles.row}>
                <View>
                    <Text style={styles.header}><Icon name='briefcase' size={18} color='#518eba'/> Salesman</Text>
            		<View>
    	        		<Text><Icon name='user' color='#518eba'/> {(!this.empty(this.props.salesman.fullname)) ? this.props.salesman.fullname : <Text style={styles.empty}>empty</Text>}</Text>
    					<Text><Icon name='envelope' color='#518eba'/> {(!this.empty(this.props.salesman.email1)) ? this.props.salesman.email1 : <Text style={styles.empty}>empty</Text>}</Text>
    					<Text><Icon name='phone' color='#518eba'/> {(!this.empty(this.props.salesman.phone1)) ? this.props.salesman.phone1 : <Text style={styles.empty}>empty</Text>}</Text>
            		</View>
                </View>
                <View style={styles.imgFrame}>
                    <Image source={{uri: this.props.salesman.Photo.url}} style={styles.img} />
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
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imgFrame: {
        height: 80,
        width: 80,
        borderRadius: 50,
        overflow: 'hidden'
    },
    img: {
        height: '100%',
        width: '100%',
        transform: [{ scaleX: 1.1 },{ scaleY: 1.1 }]
    }
});
