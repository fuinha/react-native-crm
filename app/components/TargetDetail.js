import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import TargetElement from './TargetElement';

import Icon from 'react-native-vector-icons/Zocial';

export default class TargetDetail extends React.Component {

    render() {

        let targets;
        if (this.props.targets.length > 0) {
            targets = this.props.targets.map((target, index) => {
                return(<TargetElement target={target} key={index} index={index} />);
            });
        } else {
            targets = <Text style={styles.empty}>empty</Text>;
        }

        return (
			<View>
                <Text style={styles.header}><Icon name='pinboard' size={18} color='#518eba'/> Targets</Text>
				{targets}
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

