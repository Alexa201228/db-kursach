import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Button, Input, List, ListItem, MenuItem, OutlinedInput, Select} from "@mui/material";
import {change_film, getFilmById} from "../../actions/film";
import {get_actors, get_companies, get_genres, getDirectors} from "../../actions/common";
import {useStyles} from "../services/Services";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export function FilmDetail(props){

    const {film, directors, genres, companies, actors} = useSelector(state => state.common)
    const dispatch = useDispatch();
    const {film_id} = useParams()

    const [filmDetails, setFilmDetails] = useState({
        title: '',
        director: '',
        genres: [],
        actors: [],
        companies: [],
    })

    useEffect(() => {
        dispatch(getFilmById(film_id));
        dispatch(getDirectors());
        dispatch(get_genres());
        dispatch(get_actors());
        dispatch(get_companies())
    }, [film_id])

    useEffect(() => {
        setFilmDetails({...filmDetails,
        title: film?.title,
        director: film?.director,
        genres: film?.genres,
        actors: film?.actors,
        companies: film?.company})
    }, [film])

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        if(e.target.name == 'title' || e.target.name == 'director'){
            return setFilmDetails({...filmDetails, [e.target.name]: e.target.value})
        }
        return setFilmDetails({
                ...filmDetails,
                [e.target.name]: typeof value === 'string' ? value.split(',') : value
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.change_film({
            'title': filmDetails.title,
            'director': filmDetails.director,
            'genres': filmDetails.genres,
            'actors': filmDetails.actors,
            'company': filmDetails.companies
        }, film_id)
    }

    const deleteFromList = (e) => {
        const {
            target: { value },
        } = e;
        var val = JSON.parse(value)
        return setFilmDetails({
            ...filmDetails,
            [e.target.name]: filmDetails[e.target.name].filter(v => v.id != val.id)
        })
    }

    const classes = useStyles()
    return(
        <Fragment>
            {!!film && !!directors && filmDetails.genres && filmDetails.actors &&
            <div>
                <form onSubmit={onSubmit}>
                    <table className={classes.table}>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'filmName'}>Название фильма</Label>
                            </td>
                            <td>
                                <Input id={'filmName'} name={'title'}
                               defaultValue={film.title}
                               value={filmDetails.title} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'filmDirector'}>Режиссер</Label>
                            </td>
                            <td>
                                <Select
                            multiple={false}
                            value={filmDetails.director}
                            onChange={onChange}
                            name={'director'}
                            defaultValue={filmDetails.director}
                            renderValue={selected => `${selected.first_name} ${selected.last_name}` }
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            MenuProps={MenuProps}>
                            {directors.map((val, index) => (
                                <MenuItem
                                key={index}
                                value={val}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                    {val.first_name} {val.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'filmGenres'}>Жанры</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={filmDetails.genres}
                            onChange={onChange}
                            name={'genres'}
                            defaultValue={filmDetails.genres}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(selected[i]['name'])
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {genres.filter(g => !filmDetails.genres.some(genr => genr.id == g.id)).map((val, index) => (
                                <MenuItem
                                key={index}
                                value={val}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}
                                >
                                    {val.name}
                                </MenuItem>
                            ))}
                        </Select>
                            </td>
                            <td>
                                <List style={{
                                        maxHeight: "200px"
                                    }}>
                                        {filmDetails.genres.map((val, key) => (
                                               <ListItem key={`film-${key}`} >
                                                {val.name}
                                                   <Button name={'genres'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
                                            </ListItem>

                                        ))
                                        }
                                    </List>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'filmActors'}>Актеры</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={filmDetails.actors}
                            onChange={onChange}
                            name={'actors'}
                            defaultValue={filmDetails.actors}
                            input={<OutlinedInput style={{ width: "250px"}}/>}

                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(`${selected[i]['first_name']} ${selected[i]['last_name']}`)
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {actors.filter(a => !filmDetails.actors.some(act => act.id == a.id)).map((val, index) => (
                                <MenuItem
                                key={index}
                                value={val}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}
                                >
                                    {val.first_name} {val.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                            </td>
                            <td>
                                <List style={{
                                        maxHeight: "200px"
                                    }}>
                                        {filmDetails.actors.map((val, key) => (
                                               <ListItem key={`actor-${key}`} >
                                                {val.first_name} {val.last_name}
                                                   <Button name={'actors'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
                                            </ListItem>

                                        ))
                                        }
                                    </List>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'filmCompanies'}>Кинокомпании</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={filmDetails.companies}
                            onChange={onChange}
                            name={'companies'}
                            defaultValue={filmDetails.companies}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(`${selected[i]['name']}`)
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {companies.filter(c => !filmDetails.companies.some(comp => comp.id == c.id)).map((val, index) => (
                                <MenuItem
                                key={index}
                                value={val}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}
                                >
                                    {val.name}
                                </MenuItem>
                            ))}
                        </Select>
                            </td>
                            <td>
                                <List style={{
                                        maxHeight: "200px"
                                    }}>
                                        {filmDetails.companies.map((val, key) => (
                                               <ListItem key={`company-${key}`} >
                                                {val.name}
                                                   <Button name={'companies'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
                                            </ListItem>

                                        ))
                                        }
                                    </List>
                            </td>
                        </tr>
                    </table>
                    <div>
                        <Button type={'submit'}>
                            Изменить
                        </Button>
                    </div>
                    <div>
                        <Button
                        component={Link}
                        to={'/film/detail/'}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
            }

        </Fragment>
    )
}

FilmDetail.propTypes = {
    change_film: PropTypes.func.isRequired
}


export default connect(null, {change_film})(FilmDetail);