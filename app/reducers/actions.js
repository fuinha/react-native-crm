
export function download(data, isLoaded) {
    return {
        type: 'DOWNLOAD',
        data: data,
        visible: data,
        isLoaded: isLoaded,
    };
}

export function favourites(data) {
    return {
        type: 'FAVOURITES',
        data: data,
    };
}

export function error(error) {
    return {
        type: 'ERROR',
        error: error,
    };
}

export function salesmen(salesmen) {
    return {
        type: 'SALESMEN',
        salesmen: salesmen,
    };
}

export function customers(customers) {
    return {
        type: 'CUSTOMERS',
        customers: customers,
    };
}

export function reset() {
    return {
        type: 'RESET',
    };
}

export function navigation(nav) {
    return {
        type: 'NAVIGATION',
        nav: nav
    }
}

