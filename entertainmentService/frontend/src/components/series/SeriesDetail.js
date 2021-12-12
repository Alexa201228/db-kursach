import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Button, Input, List, ListItem, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import {get_actors, get_companies, get_genres, getDirectors} from "../../actions/common";
import {useStyles} from "../services/Services";
import {change_series, getSeriesById} from "../../actions/series";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
      overflowY: {
        scroll: true
      }
  },
};


export function SeriesDetail(props){

    const {serie, directors, genres, companies, actors} = useSelector(state => state.common)
    const dispatch = useDispatch();
    const {serie_id} = useParams()

    const [seriesDetails, setSeriesDetails] = useState({
        title: serie?.title,
        director: serie?.director,
        genres: serie?.genres,
        actors: serie?.actors,
        companies: serie?.company,
        num_of_episodes: serie?.series_number
    })

    useEffect(() => {
        dispatch(getSeriesById(serie_id));
        dispatch(getDirectors());
        dispatch(get_genres());
        dispatch(get_actors());
        dispatch(get_companies())
    }, [serie_id])

    useEffect(() => {
        setSeriesDetails({...seriesDetails,
        title: serie?.title,
        director: serie?.director,
        genres: serie?.genres,
        actors: serie?.actors,
        companies: serie?.company,
        num_of_episodes: serie?.series_number})
    }, [serie])

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        return setSeriesDetails({
                ...seriesDetails,
                [e.target.name]: typeof value === 'string' ? value.split(',') : value
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.change_series({
            'title': seriesDetails.title,
            'director': seriesDetails.director,
            'genres': seriesDetails.genres,
            'actors': seriesDetails.actors,
            'company': seriesDetails.companies,
            'series_number': parseInt(seriesDetails.num_of_episodes)
        }, serie_id)
    }
    console.log(actors)
    const deleteFromList = (e) => {
        const {
            target: { value },
        } = e;
        var val = JSON.parse(value)
        return setSeriesDetails({
            ...seriesDetails,
            [e.target.name]: seriesDetails[e.target.name].filter(v => v.id != val.id)
        })
    }

    const classes = useStyles()
    return(
        <Fragment>
            {!!serie && !!directors && seriesDetails.genres && seriesDetails.actors &&
            <div>
                <form onSubmit={onSubmit}>
                    <table className={classes.table}>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'seriesName'}>Название сериала</Label>
                            </td>
                            <td>
                                <Input id={'seriesName'} name={'title'}
                               defaultValue={serie.title}
                               value={seriesDetails.title} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'filmDirector'}>Режиссер</Label>
                            </td>
                            <td>
                                <Select
                            multiple={false}

                            value={seriesDetails.director}
                            onChange={onChange}
                            name={'director'}
                            defaultValue={seriesDetails.director}
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
                                <Label for={'seriesGenres'}>Жанры</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={seriesDetails.genres}
                            onChange={onChange}
                            name={'genres'}
                            defaultValue={seriesDetails.genres}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(selected[i]['name'])
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {genres.filter(g => !seriesDetails.genres.some(genr => genr.id == g.id)).map((val, index) => (
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
                                        {seriesDetails.genres.map((val, key) => (
                                               <ListItem key={`series-${key}`} >
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
                                <Label for={'seriesActors'}>Актеры</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={seriesDetails.actors}
                            onChange={onChange}
                            name={'actors'}
                            defaultValue={seriesDetails.actors}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(`${selected[i]['first_name']} ${selected[i]['last_name']}`)
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {actors.filter(a => !seriesDetails.actors.some(act => act.id == a.id)).map((val, index) => (
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
                                        {seriesDetails.actors.map((val, key) => (
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
                            value={seriesDetails.companies}
                            onChange={onChange}
                            name={'companies'}
                            defaultValue={seriesDetails.companies}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(`${selected[i]['name']}`)
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {companies.filter(c => !seriesDetails.companies.some(comp => comp.id == c.id)).map((val, index) => (
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
                                        {seriesDetails.companies.map((val, key) => (
                                               <ListItem key={`company-${key}`} >
                                                {val.name}
                                                   <Button name={'companies'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
                                            </ListItem>

                                        ))
                                        }
                                    </List>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'numOfEpisodes'}>Количество серий (всего)</Label>
                            </td>
                            <td>
                                <TextField
                                    name={'num_of_episodes'}
                                    type="number"
                                    InputProps={{
                                            inputProps: { min: 1 }
                                    }}
                                    value={seriesDetails.num_of_episodes}
                                    onChange={onChange}
                                defaultValue={serie.series_number}/>
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
                        to={'/series/detail/'}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
            }

        </Fragment>
    )
}

SeriesDetail.propTypes = {
    change_series: PropTypes.func.isRequired
}


export default connect(null, {change_series})(SeriesDetail);