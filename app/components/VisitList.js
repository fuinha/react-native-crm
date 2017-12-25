import React from 'react';
import VisitListElement from './VisitListElement';

import { FlatList, Text, View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { download, error } from './../reducers/actions';

class VisitList extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
        	refreshing: false
        }
    }

    refresh() {
    	this.setState({ refreshing: true })
        fetch(this.props.url)
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(download(result, true));	},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
        this.setState({ refreshing: false })
    }

    _renderSeparator() {
        return (
            <View style={{
                height: 1,
                width: '92%',
                backgroundColor: '#CED0CE',
                marginLeft: '4%',
                marginRight: '4%'
                }}
            />
        );
    }
    
	render() {
        if (this.props.visits.length < 1) {
            return (
                <View style={styles.centering} >
				    <Text>No Results</Text>
                </View>
            );
        } else {
	        return (
				<FlatList
                    data={this.props.visits}
                    renderItem={({item}) => 
                    	<VisitListElement visit={item}/>
                    }
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh.bind(this)}
                    keyExtractor={item => item.id}

                    ItemSeparatorComponent={this._renderSeparator}
               />
			);
		}

    }
}

function mapStateToProps(state) {
    return {
        url: state.url
    };
}

const styles = StyleSheet.create({
    centering: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    }
});

export default connect(mapStateToProps)(VisitList);

