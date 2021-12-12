import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {
    Button,
    Input,
    List,
    ListItem,
    MenuItem,
    OutlinedInput,
    Select,
    TextareaAutosize,
    TextField
} from "@mui/material";
import {get_companies, get_genres} from "../../actions/common";
import {useStyles} from "../services/Services";
import {change_game, getGameById} from "../../actions/games";

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


export function GameDetail(props){

    const {game, genres, companies} = useSelector(state => state.common)
    const dispatch = useDispatch();
    const {game_id} = useParams()

    const [gameDetails, setGameDetails] = useState({
        title: game?.title,
        description: game?.description,
        genres: game?.genres,
        companies: game?.company
    })

    useEffect(() => {
        dispatch(getGameById(game_id));
        dispatch(get_genres());
        dispatch(get_companies())
    }, [game_id])

    useEffect(() => {
        setGameDetails({...gameDetails,
        title: game?.title,
        description: game?.description,
        genres: game?.genres,
        companies: game?.company})
    }, [game])

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        return setGameDetails({
                ...gameDetails,
                [e.target.name]: typeof value === 'string' ? value.split(',') : value
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.change_game({
            'title': gameDetails.title,
            'description': gameDetails.description[0],
            'genres': gameDetails.genres,
            'company': gameDetails.companies
        }, game_id)
    }

    const deleteFromList = (e) => {
        const {
            target: { value },
        } = e;
        var val = JSON.parse(value)
        return setGameDetails({
            ...gameDetails,
            [e.target.name]: gameDetails[e.target.name].filter(v => v.id != val.id)
        })
    }
    console.log(game)
    const classes = useStyles()
    return(
        <Fragment>
            {!!game && gameDetails.genres &&
            <div>
                <form onSubmit={onSubmit}>
                    <table className={classes.table}>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'gameName'}>Название игры</Label>
                            </td>
                            <td>
                                <Input id={'gameName'} name={'title'}
                               defaultValue={game.title}
                               value={gameDetails.title} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'gameDescription'}>Описание игры</Label>
                            </td>
                            <td>
                                <TextareaAutosize style={{
                                    minHeight: "200px",
                                    minWidth: "300px"
                                }} type={'text'}
                                           defaultValue={game.description}
                                           value={gameDetails.description}
                                           name={'description'}
                                           onChange={onChange}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'gameGenres'}>Жанры</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={gameDetails.genres}
                            onChange={onChange}
                            name={'genres'}
                            defaultValue={gameDetails.genres}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(selected[i]['name'])
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {genres.filter(g => !gameDetails.genres.some(genr => genr.id == g.id)).map((val, index) => (
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
                                        {gameDetails.genres.map((val, key) => (
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
                                <Label for={'filmCompanies'}>Игровые компании</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={gameDetails.companies}
                            onChange={onChange}
                            name={'companies'}
                            defaultValue={gameDetails.companies}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(`${selected[i]['name']}`)
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {companies.filter(c => !gameDetails.companies.some(comp => comp.id == c.id)).map((val, index) => (
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
                                        {gameDetails.companies.map((val, key) => (
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
                        to={'/game/detail/'}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
            }

        </Fragment>
    )
}

GameDetail.propTypes = {
    change_game: PropTypes.func.isRequired
}


export default connect(null, {change_game})(GameDetail);