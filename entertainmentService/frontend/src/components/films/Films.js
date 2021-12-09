import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Container, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Button, Input, Typography} from "@mui/material";
import {add_film, delete_film} from "../../actions/film";
import {useStyles} from "../services/Services";
import {get_film_list} from "../../actions/common";


export function Films(props){

    const {films} = useSelector(state => state.common);

    const [filmCredentials, setFilmCredentials] = useState({
        title: ''
    })
    const dispatch = useDispatch();

    //Download all services on page load
    useEffect(() => {
        dispatch(get_film_list());
    }, []);

    const deleteFilm = (filmId) => {
        props.delete_film(filmId);
    }
    const addNewService = (e) =>
    {
        e.preventDefault();
        props.add_film({
            'title': filmCredentials.title
        })
    }
    const onInputChange = (e) => {
        setFilmCredentials({...filmCredentials, [e.target.name]: e.target.value})
    }

    const classes = useStyles();

    return(
        <Fragment>
            <Container>
                <form onSubmit={addNewService}>
                    <div className={classes.formDivContainer}>
                        <Label for={'film_name'}>Название фильма</Label>
                        <Input id={'film_name'} name={'title'}
                               className={classes.input}
                               value={filmCredentials.title}
                               onChange={onInputChange}
                               />
                    </div>
                    <div className={classes.formDivContainer}>
                        <Button type={'submit'}>Добавить фильм</Button>
                    </div>
                </form>
            </Container>
            <Container>
                <table className={classes.table}>
                    <thead className={classes.tableHead}>
                    <th>Название фильма</th>
                    <Container>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </Container>
                    </thead>
                    <tbody >
                    {films.map((film, index) => (
                    <tr key={index} className={classes.tableRow}>
                        <td>
                            <Typography key={`text-${index}`}>
                                {film.title}
                            </Typography>
                        </td>
                        <Container>
                           <td>
                            <Button
                                key={`button-${index}`}
                                component={Link}
                                to={`${film.id}`}>
                            Изменить
                        </Button>
                        </td>
                        <td>
                            <Button
                        onClick={() => deleteFilm(film.id)}>
                            Удалить
                        </Button>
                        </td>
                        </Container>

                    </tr>
                ))}
                    </tbody>
                </table>

            </Container>
        </Fragment>
    )
}

Films.propTypes = {
    delete_film: PropTypes.func.isRequired,
    add_film: PropTypes.func.isRequired
}

export default connect(null, {delete_film, add_film})(Films);