import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { expanded } from './../reducers/actions';

import Icon from 'react-native-vector-icons/FontAwesome';

class TargetElement extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect 	= this.handleSelect.bind(this);
        this.empty 			= this.empty.bind(this);
    }

    handleSelect() {
        if (this.props.expanded === this.props.index)
            {this.props.dispatch(expanded(null));}
        else
			{this.props.dispatch(expanded(this.props.index));}
    }

    empty(str) {
        if (str === null || str === '')
            {return true;}
        return false;
    }

    render() {

        let status;
        if (this.props.target.success) {
            status = <Text style={styles.succeeded}>Succeeded <Icon name='check' color='#518eba'/></Text>;
        } else if (this.props.target.success === null) {
            status = <Text style={styles.pending}>Pending <Icon name='clock-o' color='#518eba'/></Text>;
        } else {
            status = <Text style={styles.fail}>Fail <Icon name='remove' color='#518eba'/></Text>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.bold}><Icon name='chevron-right' color='#518eba' /> {this.props.target.Company.name}</Text> 
                    <Text>{status}</Text>
                </View>

                <Text style={styles.type}>{this.props.target.TargetType.name}</Text>

    			<View style={styles.blockquote}>
    				<Text><Icon name='envelope' color='#518eba' /> {(!this.empty(this.props.target.Company.name)) ? this.props.target.Company.name : <Text style={styles.empty}>empty</Text>}</Text>
    				<Text><Icon name='globe' color='#518eba' /> {(!this.empty(this.props.target.Company.web1)) ? this.props.target.Company.web1 : <Text style={styles.empty}>empty</Text>}</Text>
    				<Text><Icon name='info-circle' color='#518eba' /> {(!this.empty(this.props.target.Company.notes)) ? this.props.target.Company.notes : <Text style={styles.empty}>empty</Text>}</Text>
    			</View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        expanded: state.expanded,
    };
}

const styles = StyleSheet.create({
    succeeded: {
        fontWeight: 'bold',
        color: 'green'
    },
    pending: {
        fontWeight: 'bold',
        color: '#bd9127'
    },
    fail: {
        fontWeight: 'bold',
        color: 'red'
    },
    empty: {
        fontStyle: 'italic',
        color: '#808080'
    },
    bold: {
        fontWeight: 'bold'
    },
    type: {
        fontStyle: 'italic',
        fontSize: 12,
        marginLeft: 12
    },
    blockquote: {
        marginLeft: 12,
        paddingLeft: 14,
        borderLeftWidth: 5,
        borderColor: '#eee',
        marginBottom: 5
    },
    row: {
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        width: '100%'
    }
});

export default connect(mapStateToProps)(TargetElement);
