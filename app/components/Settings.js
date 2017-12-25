import React from 'react';

import { Text, View, StyleSheet, Button, Switch, Picker, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import { download, error, reset } from './../reducers/actions';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datebefore: null,
            dateafter: null,

            favourites: false,
            customer: 'default',
            salesman: 'default'
        }
    }

    downloadFrom(url) {
        fetch(url)
        .then((res)             =>  res.json())
        .then((result)          =>  { this.props.dispatch(download(result, true));  },
                (error_message) =>  { this.props.dispatch(error(error_message));    }
        );
    }

    reload() {
        this.props.close();
        this.props.dispatch(reset());

        let url = 'https://dcrmt.herokuapp.com/api/visits/flattened?token=ca092035a9fe8bd421f8';

        if (this.state.dateafter)
            {url += '&dateafter=' + this.state.dateafter;}

        if (this.state.datebefore)
            {url += '&datebefore=' + this.state.datebefore;}

        if (this.state.favourites)
            {url += '&favourites=1';}

        if (this.state.customer && this.state.customer !== 'default')
            {url += '&customer=' + this.state.customer;}

        if (this.state.salesman && this.state.salesman !== 'default')
            {url += '&salesman=' + this.state.salesman;}

        this.downloadFrom(url);
    }

    reset() {
        this.setState({
            datebefore: null,
            dateafter: null,
            
            favourites: false,
            customer:   'default',
            salesman:   'default',
        });
        setTimeout(() => {
            this.reload();
        }, 10);
    }

    switch(event) {
        this.setState({ favourites: event });
    }

    handleDateAfter(date) {
        if (date.length == 4)
            this.setState({ dateafter: date + '-' });
        else if (date.length == 7)
            this.setState({ dateafter: date + '-' });
        else
            this.setState({ dateafter: date });
    }

    handleDateBefore(date) {
        if (date.length == 4)
            this.setState({ datebefore: date + '-' });
        else if (date.length == 7)
            this.setState({ datebefore: date + '-' });
        else
            this.setState({ datebefore: date });
    }

    render() {

        let salesmen = this.props.salesmen.map((salesman, index) => {
            return(<Picker.Item label={salesman.fullname} value={salesman.fullname} key={index} />);
        });

        let customers = this.props.customers.map((customer, index) => {
            return(<Picker.Item label={customer.name} value={customer.name} key={index} />);
        });

        return (
            <Modal isVisible={this.props.visible} onBackdropPress={this.props.close} animationOut={'slideOutUp'} >
                <View style={styles.container}>
                    <Text style={styles.header}>Custom your search</Text>
                    <View style={styles.hr} />
                    <View style={styles.favourites}>
                        <Text>All</Text>
                        <Switch onValueChange={this.switch.bind(this)} value={this.state.favourites} />
                        <Text>Favourites</Text>
                    </View>
                    
                    <Picker
                        style={styles.picker}
                        mode='dropdown'
                        selectedValue={this.state.customer}
                        onValueChange={(itemValue, itemIndex) => this.setState({ customer: itemValue })}>
                        <Picker.Item label='Customers' value='default' />
                        {customers}
                    </Picker>
                    <Picker
                        style={styles.picker}
                        mode='dropdown'
                        selectedValue={this.state.salesman}
                        onValueChange={(itemValue, itemIndex) => this.setState({ salesman: itemValue })}>
                        <Picker.Item label='Salesmen' value='default' />
                        {salesmen}
                    </Picker>
                    <View style={styles.hr} />
                    <Text style={styles.small}>Show visits between selected dates. (YYYY-MM-DD)</Text>
                    <View style={styles.inputDates}>
                        <TextInput
                            style={{ height: 40, width: '50%' }}
                            placeholder='From'
                            value={this.state.dateafter}
                            keyboardType='numeric'
                            onChangeText={this.handleDateAfter.bind(this)}
                        />
                        <TextInput
                            style={{ height: 40, width: '50%' }}
                            placeholder='To'
                            keyboardType='numeric'
                            value={this.state.datebefore}
                            onChangeText={this.handleDateBefore.bind(this)}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Button title='Apply' onPress={this.reload.bind(this)} color='#449d44' />
                        <Button title='Reset' onPress={this.reset.bind(this)} color='#c9302c' />
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers,
        salesmen: state.salesmen,
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttons: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end',
        marginTop: 5
    },
    favourites: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16
    },
    hr: {
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
        marginTop: '3%',
        marginBottom: '3%'
    },
    picker: {
        width: '100%'
    },
    inputDates: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    small: {
        fontSize: 10
    }
});

export default connect(mapStateToProps)(Settings);
