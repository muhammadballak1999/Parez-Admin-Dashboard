
export function GET_ALL_USERS (state, payload) {
    state.admins = payload.admins;
    state.data = payload.admins;
    state.police_stations = payload.police_stations;
    state.users = payload.users;
}

export function GET_ADMINS (state) {
    state.data = state.admins
}

export function GET_POLICE_STATIONS (state) {
    state.data = state.police_stations
}

export function GET_USERS (state) {
    state.data = state.users
}
