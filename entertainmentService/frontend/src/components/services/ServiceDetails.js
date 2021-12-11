import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {getServiceById, change_service} from "../../actions/service";
import {Link, useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Button, Input, List, ListItem, MenuItem, OutlinedInput, Select} from "@mui/material";
import {get_film_list, get_games_list, get_series_list} from "../../actions/common";
import {useStyles} from "./Services";


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


export function ServiceDetails(props){

    const {service, films, series, games} = useSelector((state) => state.common)


    const dispatch = useDispatch();
    const {service_id} = useParams();

    const [serviceDetails, setServiceDetails] = useState({
        name: '',
        films: [],
        series: [],
        games: []
    })

    useEffect(() => {
        dispatch(getServiceById(service_id));
        dispatch(get_film_list());
        dispatch(get_series_list());
        dispatch(get_games_list())
    }, [service_id])

    useEffect(() => {
        setServiceDetails({...serviceDetails,
                name: service.name,
                films: service.films,
                series: service.series,
                games: service.games})
    }, [service])

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        return setServiceDetails({
                ...serviceDetails,
                [e.target.name]: typeof value === 'string' ? value.split(',') : value
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.change_service({
            'name': serviceDetails.name,
            'films': serviceDetails.films,
            'series': serviceDetails.series,
            'games': serviceDetails.games
        }, service_id)
    }

    const deleteFromList = (e) => {
        const {
            target: { value },
        } = e;
        var val = JSON.parse(value)
        return setServiceDetails({
            ...serviceDetails,
            [e.target.name]: serviceDetails[e.target.name].filter(v => v.id != val.id)
        })
    }

    const classes = useStyles()
    return(

        <Fragment>
            {serviceDetails.films && films && service.films &&
            <div>
                <form onSubmit={onSubmit}>
                    <table className={classes.table}>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'serviceName'}>Название сервиса</Label>
                            </td>
                            <td>
                                <Input id={'serviceName'} name={'name'}
                                       defaultValue={service.name}
                                       value={serviceDetails.name} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'serviceFilms'}>Фильмы, доступные на сервисе</Label>
                            </td>
                            <td>
                                <Select
                                    multiple={true}
                                    value={serviceDetails.films}
                                    onChange={onChange}
                                    name={'films'}
                                    input={<OutlinedInput style={{ width: "250px"}}/>}
                                    renderValue={(selected) => {
                                        var names = [];
                                        for(var i = 0; i < selected.length; i++){
                                            names.push(selected[i]['title'])
                                        }
                                        return names.join(', ')
                                    }}
                                    MenuProps={MenuProps}>
                                    {films.filter(f => !serviceDetails.films.some(fl => fl.id == f.id)).map((val, index) => (
                                        <MenuItem
                                        key={index}
                                        value={val}
                                        style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                            {val.title}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </td>
                            <td>
                                    <List style={{
                                        maxHeight: "200px"
                                    }}>
                                        {serviceDetails.films.map((val, key) => (
                                               <ListItem key={`film-${key}`} >
                                                {val.title}
                                                   <Button name={'films'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
                                            </ListItem>

                                        ))
                                        }
                                    </List>
                                </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'serviceSeries'}>Сериалы, доступные на сервисе</Label>
                            </td>
                            <td>
                                <Select
                                    multiple={true}
                                    value={serviceDetails.series}
                                    onChange={onChange}
                                    name={'series'}
                                    input={<OutlinedInput style={{ width: "250px"}}/>}
                                    renderValue={(selected) => {
                                        var names = [];
                                        for(var i = 0; i < selected.length; i++){
                                            names.push(selected[i]['title'])
                                        }
                                        return names.join(', ')
                                    }}
                                    MenuProps={MenuProps}>
                                    {series.filter(s => !serviceDetails.series.some(sr => sr.id == s.id)).map((val, index) => (
                                        <MenuItem
                                        key={index}
                                        value={val}
                                        style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                            {val.title}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </td>
                            <td>
                                    <List style={{
                                        maxHeight: "200px"
                                    }}>
                                        {serviceDetails.series.map((val, key) => (
                                               <ListItem key={`series-${key}`} >
                                                {val.title}
                                                   <Button name={'series'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
                                            </ListItem>

                                        ))
                                        }
                                    </List>
                                </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'serviceGames'}>Игры, доступные на сервисе</Label>
                            </td>
                            <td>
                                <Select
                                    multiple={true}
                                    value={serviceDetails.games}
                                    onChange={onChange}
                                    name={'games'}
                                    input={<OutlinedInput style={{ width: "250px"}}/>}
                                    renderValue={(selected) => {
                                        var names = [];
                                        for(var i = 0; i < selected.length; i++){
                                            names.push(selected[i]['title'])
                                        }
                                        return names.join(', ')
                                    }}
                                    MenuProps={MenuProps}>
                                    {games.filter(g => !serviceDetails.games.some(gm => gm.id == g.id)).map((val, index) => (
                                        <MenuItem
                                        key={index}
                                        value={val}
                                        style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                            {val.title}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </td>
                            <td>
                                    <List style={{
                                        maxHeight: "200px"
                                    }}>
                                        {serviceDetails.games.map((val, key) => (
                                               <ListItem key={`games-${key}`} >
                                                {val.title}
                                                   <Button name={'games'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
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
                        to={'/service/detail/'}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
            }

        </Fragment>
    )
}

ServiceDetails.propTypes = {
    change_service: PropTypes.func.isRequired
}


export default connect(null, {change_service})(ServiceDetails);