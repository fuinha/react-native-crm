import React from 'react'; 
//import { visits } from './../assets/mock.data.js';

import VisitList from './VisitList';

import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { error, key, reloadSaved } from './../reducers/actions';

import Icon from 'react-native-vector-icons/FontAwesome';

class VisitsSaved extends React.Component {
    static navigationOptions = {
        title: 'Visits',
        headerRight:  (<TouchableOpacity onPress={() => AsyncStorage.removeItem(key)}>
                            <Icon name='trash-o' color='#518eba' size={30} style={{ paddingRight: 15 }} />
                       </TouchableOpacity>),
    };

    constructor(props) {
        super(props);

        this.state = {
            visits: []
        }
    }

    async _loadData() {
        try {
            var value = await AsyncStorage.getItem(key);
            if (value !== null)
                this.setState({ visits: JSON.parse(value) });
            else 
                this.setState({ visits: [] });

        } catch (error_message) {
            this.props.dispatch(error(error_message))
        }
    }

  	render() {

        this._loadData();
        
        let main;
        if (this.props.error) {
            main =  <View style={styles.centering} >
                        <Text>Error: {this.props.error}</Text>
                    </View>

        } else if (this.state.visits.length > 0) {
            main = <VisitList style={{ flex: 1 }} style={styles.visitList} visits={this.state.visits}/>

        } else {
            main =  <View style={styles.centering} >
                        <Text>No visits saved</Text>
                    </View>
        }

    	return (
            <View style={(this.state.visits) ? styles.container : styles.centering}>
                {main}
            </View>
      	);
  	}
}

function mapStateToProps(state) {
    return {
        error: state.error
    };
}

const styles = StyleSheet.create({
    centering: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    container: {
        backgroundColor: '#FFFFFF',
        height: '100%'
    },
    visitList: {
        marginTop: '2%',
        marginBottom: '2%',
        backgroundColor: '#FFFFFF'
    }
});

export default connect(mapStateToProps)(VisitsSaved);

