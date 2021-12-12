import {
    ADD_FILM, ADD_GAME, ADD_SERIES,
    ADD_SERVICE, ADD_SUBSCRIPTION, CHANGE_FILM, CHANGE_GAME, CHANGE_SERIES, CHANGE_SERVICE, CHANGE_SUBSCRIPTION,
    DELETE_FILM, DELETE_GAME, DELETE_SERIES, DELETE_SUBSCRIPTION, GET_ACTORS, GET_COMPANIES, GET_DIRECTORS, GET_FILM,
    GET_FILMS_LIST, GET_GAME, GET_GAMES_LIST, GET_GENRES, GET_SERIES, GET_SERIES_LIST,
    GET_SERVICE,
    GET_SERVICES, GET_SUBSCRIPTION, GET_SUBSCRIPTIONS_LIST,
    SERVICE_ITEM_DELETED
} from "../actions/types";

const initialState = {
    services: [],
    service: null,
    films: [],
    film: null,
    genres: [],
    games: [],
    game: null,
    series: [],
    serie: null,
    subscriptions: [],
    subscription: null,
    companies: [],
    company: null,
    directors: [],
    actors: []
};

export default function (state = initialState, action){
    console.log(action.payload)
    switch (action.type){
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case SERVICE_ITEM_DELETED:
            return {
                ...state,
                services: state.services.filter(service => service.id != action.payload)
            }
        case ADD_SERVICE:
            return {
                ...state,
                services: [...state.services, action.payload]
            }
        case CHANGE_SERVICE:
        case GET_SERVICE:
            return {
                ...state,
                service: action.payload
            }
        case GET_FILMS_LIST:
            return {
                ...state,
                films: action.payload
            }
        case ADD_FILM:
            return{
                ...state,
                films: [...state.films, action.payload]
            }
        case DELETE_FILM:
            return {
                ...state,
                films: state.films.filter((film) => film.id != action.payload)
            }
        case CHANGE_FILM:
        case GET_FILM:
            return{
                ...state,
                film: action.payload
            }
        case GET_DIRECTORS:
            return{
                ...state,
                directors: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_ACTORS:
            return{
                ...state,
                actors: action.payload
            }
        case GET_COMPANIES:
            return{
                ...state,
                companies: action.payload
            }
        case GET_GAMES_LIST:
            return {
                ...state,
                games: action.payload
            }
        case ADD_GAME:
            return {
                ...state,
                games: [...state.games, action.payload]
            }
        case DELETE_GAME:
            return {
                ...state,
                games: state.games.filter((game) => game.id != action.payload)
            }
        case CHANGE_GAME:
        case GET_GAME:
            return {
                ...state,
                game: action.payload
            }
         case GET_SERIES_LIST:
            return {
                ...state,
                series: action.payload
            }
        case ADD_SERIES:
            return {
                ...state,
                series: [...state.series, action.payload]
            }
        case DELETE_SERIES:
            return {
                ...state,
                series: state.series.filter((series) => series.id != action.payload)
            }
        case CHANGE_SERIES:
        case GET_SERIES:
            return {
                ...state,
                serie: action.payload
            }
        case GET_SUBSCRIPTIONS_LIST:
            return {
                ...state,
                subscriptions: action.payload
            }
        case ADD_SUBSCRIPTION:
            return {
                ...state,
                subscriptions: [...state.subscriptions, action.payload]
            }
        case DELETE_SUBSCRIPTION:
            return {
                ...state,
                subscriptions: state.subscriptions.filter((subscription) => subscription.id != action.payload)
            }
        case CHANGE_SUBSCRIPTION:
        case GET_SUBSCRIPTION:
            return {
                ...state,
                subscription: action.payload
            }
        default:
            return state;
    }
}