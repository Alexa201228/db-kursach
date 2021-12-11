import {
    ADD_FILM,
    ADD_SERVICE, CHANGE_FILM, CHANGE_SERVICE,
    DELETE_FILM, GET_ACTORS, GET_COMPANIES, GET_DIRECTORS, GET_FILM,
    GET_FILMS_LIST, GET_GENRES,
    GET_SERVICE,
    GET_SERVICES,
    SERVICE_ITEM_DELETED
} from "../actions/types";

const initialState = {
    services: [],
    service: localStorage.getItem('service'),
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
            localStorage.setItem('service', action.payload)
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
        default:
            return state;
    }
}