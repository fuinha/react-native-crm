import { combineReducers } from 'redux';

/**
 * Reducers
 */

function dataReducer(state = [], action) {
    switch(action.type) {
    case 'DOWNLOAD':
        return action.data;
    case 'RESET':
        return [];
    default:
        return state;
    }
}

function isLoadedReducer(state = false, action) {
    switch(action.type) {
    case 'DOWNLOAD':
        return action.isLoaded;
    case 'ERROR':
        return true;
    case 'RESET':
        return false;
    default:
        return state;
    }
}

function errorReducer(state = false, action) {
    switch(action.type) {
    case 'ERROR':
        return action.error;
    case 'RESET':
        return false;
    default:
        return state;
    }
}

function favouritesReducer(state = [], action) {
    switch(action.type) {
    case 'FAVOURITES':
        return action.data;
    default:
        return state;
    }
}

function salesmenReducer(state = [], action) {
    switch(action.type) {
    case 'SALESMEN':
        return action.salesmen;
    default:
        return state;
    }
}

function customersReducer(state = [], action) {
    switch(action.type) {
    case 'CUSTOMERS':
        return action.customers;
    default:
        return state;
    }
}

function urlReducer(state='', action) {
    switch(action.type) {
    case 'REFRESH':
        return action.url;
    default:
        return state;
    }
}

function navReducer(state=null, action) {
    switch(action.type) {
    case 'NAVIGATION':
        return action.nav;
    default:
        return state;
    }
}


/**
 * Export GlobalState
 */
const GlobalState = combineReducers({
    data: dataReducer,
    isLoaded: isLoadedReducer,
    error: errorReducer,
    favourites: favouritesReducer,
    salesmen: salesmenReducer,
    customers: customersReducer,
    url: urlReducer,
    nav: navReducer
});

export default GlobalState;
