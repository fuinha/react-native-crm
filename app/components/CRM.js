import React from 'react'; 
import { visits } from './../assets/mock.data.js';

import VisitList from './VisitList';
import Settings from './Settings';

import { StyleSheet, Text, View, ActivityIndicator, Button, TouchableOpacity, Picker } from 'react-native';

import { connect } from 'react-redux';
import { download, error, favourites, customers, salesmen, navigation } from './../reducers/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
// https://oblador.github.io/react-native-vector-icons/

class CRM extends React.Component {
    static navigationOptions = ({ navigation }) => (
        {
            title: 'Visits',
            headerRight:  (<TouchableOpacity onPress={(navigation.state.params) ? navigation.state.params.filter : () => null}>
                                <Icon name='filter-list' color='#518eba' size={30} style={{ paddingRight: 15 }} />
                           </TouchableOpacity>),
        }
    );

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }

        this.downloadFrom = this.downloadFrom.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

		// Descargar las visitas favoritas para almacenarlas al inicial la app
        fetch('https://dcrmt.herokuapp.com/api/visits?token=ca092035a9fe8bd421f8&favourites=1')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(favourites(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);

		// Descargar todos los vendedores
        fetch('https://dcrmt.herokuapp.com/api/salesmen?token=ca092035a9fe8bd421f8')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(salesmen(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);

		// Descargar todos los clientes
        fetch('https://dcrmt.herokuapp.com/api/customers?token=ca092035a9fe8bd421f8')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(customers(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
    }

    componentDidMount() {
        console.log('Downloading...');
        let url = 'https://dcrmt.herokuapp.com/api/visits/flattened?token=ca092035a9fe8bd421f8';

        this.downloadFrom(url);
        this.props.dispatch(navigation(this.props.navigation));

        this.props.navigation.setParams({ 
            filter: this.handleFilter.bind(this)
        });
    }

    handleFilter() {
        this.setState({ modal: true });
    }

    close() {
        this.setState({ modal: false });
    }

    downloadFrom(url) {
        fetch(url)
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(download(result, true));	},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
        console.log('Downloaded')
    }

  	render() {

        let main;
        if (this.props.error) {
            main = <Text style={styles.centering}>Error: {this.props.error.message}</Text>

        } else if (!this.props.isLoaded) {
            main = <ActivityIndicator animating size={70} color="#518eba" style={styles.centering}/>

        } else {
            main = <VisitList style={{ flex: 1 }} style={styles.visitList}/>
        }

    	return (
            <View style={(!this.props.isLoaded) ? styles.centering : styles.container}>
                {main}
                <Settings visible={this.state.modal} close={this.close.bind(this)} />
            </View>
      	);
  	}
}

function mapStateToProps(state) {
    return {
        data: state.data,
        isLoaded: state.isLoaded,
        error: state.error,
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

export default connect(mapStateToProps)(CRM);

