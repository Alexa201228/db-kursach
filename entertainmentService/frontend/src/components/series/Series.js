import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Container, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Button, Input, Typography} from "@mui/material";
import {useStyles} from "../services/Services";
import {get_series_list} from "../../actions/common";
import {add_series, delete_series} from "../../actions/series";


export function Series(props){

    const {series} = useSelector(state => state.common);

    const [seriesCredentials, setSeriesCredentials] = useState({
        title: ''
    })
    const dispatch = useDispatch();

    //Download all series on page load
    useEffect(() => {
        dispatch(get_series_list());
    }, [dispatch]);

    const deleteSeries = (seriesId) => {
        props.delete_series(seriesId);
    }
    const addNewSeries = (e) =>
    {
        e.preventDefault();
        props.add_series({
            'title': seriesCredentials.title
        })
    }
    const onInputChange = (e) => {
        setSeriesCredentials({...seriesCredentials, [e.target.name]: e.target.value})
    }

    const classes = useStyles();

    return(

    <Fragment>
            <Container>
            <form onSubmit={addNewSeries}>
                <div className={classes.formDivContainer}>
                    <Label for={'series_name'}>Название сериала</Label>
                    <Input id={'series_name'} name={'title'}
                           className={classes.input}
                           value={seriesCredentials.title}
                           onChange={onInputChange}
                    />
                </div>
                <div className={classes.formDivContainer}>
                    <Button type={'submit'}>Добавить сериал</Button>
                </div>
            </form>
        </Container>
        <Container>
            <table className={classes.table}>
                <thead className={classes.tableHead}>
                <th>Название сериала</th>
                <Container>
                    <th>Редактировать</th>
                    <th>Удалить</th>
                </Container>
                </thead>
                <tbody>
                {series.map((serie, index) => (
                    <tr key={index} className={classes.tableRow}>
                        <td>
                            <Typography key={`text-${index}`}>
                                {serie.title}
                            </Typography>
                        </td>
                        <Container>
                            <td>
                                <Button
                                    key={`button-${index}`}
                                    component={Link}
                                    to={`${serie.id}`}>
                                    Изменить
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => deleteSeries(serie.id)}>
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

Series.propTypes = {
    delete_series: PropTypes.func.isRequired,
    add_series: PropTypes.func.isRequired
}

export default connect(null, {delete_series, add_series})(Series);