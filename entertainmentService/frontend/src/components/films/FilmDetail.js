import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Button, Checkbox, Chip, Input, MenuItem, OutlinedInput, Select} from "@mui/material";
import {change_film, getFilmById, getDirectors} from "../../actions/film";
import {get_genres} from "../../actions/common";

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

    const dispatch = useDispatch();
    const id = useParams()
    const {film, directors, genres, actors} = useSelector(state => state.common)
    const [filmDetails, setFilmDetails] = useState({
        title: film?.title,
        director: film?.director,
        genres: film?.genres,
        actors: film?.actors
    })

    useEffect(() => {
        dispatch(getFilmById(id));
        dispatch(getDirectors());
        dispatch(get_genres());
    }, [])

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
            'actors': filmDetails.actors
        }, id)
    }
    console.log(genres)
    return(
        <Fragment>
            {!!film && !!directors && !!filmDetails.genres &&
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <Label for={'filmName'}>Название фильма</Label>
                        <Input id={'filmName'} name={'title'}
                               defaultValue={film.title}
                               value={filmDetails.title} onChange={onChange}/>
                    </div>
                    <div>
                        <Label for={'filmDirector'}>Режиссер</Label>
                        <Select
                            multiple={false}
                            value={filmDetails.director}
                            onChange={onChange}
                            name={'director'}
                            defaultValue={filmDetails.director}
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
                    </div>
                     <div>
                        <Label for={'filmGenres'}>Жанры</Label>
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
                            {genres.map((val, index) => (
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
                    </div>
                    <div>
                        <Button type={'submit'}>
                            Изменить
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