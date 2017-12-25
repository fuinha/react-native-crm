import React from 'react';

import VisitDetail from './VisitDetail';
import TargetDetail from './TargetDetail';
import CustomerDetail from './CustomerDetail';
import SalesmanDetail from './SalesmanDetail';

import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Switch, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { error, favourites, key } from './../reducers/actions';

import Icon from 'react-native-vector-icons/FontAwesome';

class Detail extends React.Component {
    static navigationOptions = ({ navigation }) => (
        {
            title: 'Information',
            headerRight:  (<TouchableOpacity onPress={navigation.state.params.favourite}>
                                <Icon name={navigation.state.params.star} color='#518eba' size={30} style={{ paddingRight: 15 }} />
                           </TouchableOpacity>),
        }
    );

    constructor(props) {
        super(props);

        this.state = {
            saved: false
        }

    	this.favourite 			= this.favourite.bind(this);
    	this.updateFavourites 	= this.updateFavourites.bind(this);
    	this.isFavourite 		= this.isFavourite.bind(this);
        this._isSaved           = this._isSaved.bind(this);

        this.visit = this.props.navigation.state.params.visit;

        this._isSaved(this.visit);
    }

    componentDidMount() {
        let star = (this.isFavourite(this.visit)) ? 'star' : 'star-o';

        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ 
            favourite: this.favourite.bind(this),
            star: star
        });
    }

    favourite() {
        let url = 'https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/' + this.visit.id + '?token=ca092035a9fe8bd421f8';
        if(this.isFavourite(this.visit)) {
            url += '&_method=DELETE';
        } else {
            url += '&_method=PUT';
        }
        fetch(url)
		.then((result) 		=> 	{ this.updateFavourites();						},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);

        setTimeout(() => {
            let star = (this.isFavourite(this.visit)) ? 'star' : 'star-o';
            this.props.navigation.setParams({ 
                favourite: this.favourite.bind(this),
                star: star
            });
        }, 500);
    }

    updateFavourites() {
        fetch('https://dcrmt.herokuapp.com/api/visits?token=ca092035a9fe8bd421f8&favourites=1')
		.then((res) 			=> 	res.json())
		.then((result) 		=> 	{ this.props.dispatch(favourites(result));		},
				(error_message) => { this.props.dispatch(error(error_message)); 	}
		);
    }

    isFavourite(visit) {
        let result = false;
        this.props.favourites.map((n_visit, index) => {
            if (n_visit.id === visit.id) {result = true;}
        });
        return result;
    }

    async _isSaved(visit) {
        let result = false;
        try {
            var value = await AsyncStorage.getItem(key);
            if (value != null) {
                value = JSON.parse(value);

                value.map((n_visit, index) => {
                    if (n_visit.id === visit.id) {result = true;}
                });
            }
            
            this.setState({ saved: result });

        } catch (error) {  // Error saving data 
            alert('Error: ' + error);
        }   
    }

    async _saveData(event) {
        try {
            this.setState({ saved: event })
            if (event) {
                var value = await AsyncStorage.getItem(key);
                if (value == null) 
                    await AsyncStorage.setItem(key, JSON.stringify([this.visit]));
                else {
                    value = JSON.parse(value);
                    value.unshift(this.visit);
                    await AsyncStorage.setItem(key, JSON.stringify(value));
                }

            } else if (!event) {
                var value = await AsyncStorage.getItem(key);
                value = JSON.parse(value);
                var result = [];
                value.map((n_visit, index) => {
                    if (n_visit.id !== this.visit.id) 
                        result.push(n_visit);
                });
                await AsyncStorage.setItem(key, JSON.stringify(result));
            }

        } catch (error) {  // Error saving data 
            alert('Error: ' + error);
        }
    }

    render() {

        return (
            <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
                <View style={styles.container} >
                    <View style={styles.row}>
                        <Text>Offline access.</Text>
                        <Switch onValueChange={this._saveData.bind(this)} value={this.state.saved}/>
                    </View>
                    <View style={styles.hr} />
            		<VisitDetail visit={this.visit} style={styles.item}/>
                    <View style={styles.hr} />
                    <TargetDetail targets={this.visit.Targets} style={styles.item}/>
                    <View style={styles.hr} />
        			<CustomerDetail customer={this.visit.Customer} style={styles.item}/>
                    <View style={styles.hr} />
        			<SalesmanDetail salesman={this.visit.Salesman} style={styles.item}/>
                    <View style={styles.hr} />
                </View>
            </ScrollView>
        );

    }
}

function mapStateToProps(state) {
    return {
        favourites: state.favourites
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 25
    },
    item: {
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        flexDirection: 'column'
    },
    hr: {
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
        marginTop: '3%',
        marginBottom: '3%'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default connect(mapStateToProps)(Detail);

