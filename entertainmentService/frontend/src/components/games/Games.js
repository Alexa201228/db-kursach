import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Container, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Button, Input, Typography} from "@mui/material";
import {useStyles} from "../services/Services";
import {get_games_list} from "../../actions/common";
import {add_game, delete_game} from "../../actions/games";


export function Games(props){

    const {games} = useSelector(state => state.common);

    const [gameCredentials, setGameCredentials] = useState({
        title: ''
    })
    const dispatch = useDispatch();

    //Download all on page load
    useEffect(() => {
        dispatch(get_games_list());
    }, [dispatch]);

    const deleteGame= (gameId) => {
        props.delete_game(gameId);
    }
    const addNewGame = (e) =>
    {
        e.preventDefault();
        props.add_game({
            'title': gameCredentials.title
        })
    }
    const onInputChange = (e) => {
        setGameCredentials({...gameCredentials, [e.target.name]: e.target.value})
    }

    const classes = useStyles();

    return(
        <Fragment>
            <Container>
                <form onSubmit={addNewGame}>
                    <div className={classes.formDivContainer}>
                        <Label for={'game_name'}>Название игры</Label>
                        <Input id={'game_name'} name={'title'}
                               className={classes.input}
                               value={gameCredentials.title}
                               onChange={onInputChange}
                               />
                    </div>
                    <div className={classes.formDivContainer}>
                        <Button type={'submit'}>Добавить игру</Button>
                    </div>
                </form>
            </Container>
            <Container>
                <table className={classes.table}>
                    <thead className={classes.tableHead}>
                    <th>Название Игры</th>
                    <Container>
                        <th >Редактировать</th>
                        <th >Удалить</th>
                    </Container>
                    </thead>
                    <tbody >
                    {games.map((game, index) => (
                    <tr key={index} className={classes.tableRow}>
                        <td>
                            <Typography key={`text-${index}`}>
                                {game.title}
                            </Typography>
                        </td>
                        <Container>
                           <td>
                            <Button
                                key={`button-${index}`}
                                component={Link}
                                to={`${game.id}`}>
                            Изменить
                        </Button>
                        </td>
                        <td>
                            <Button
                        onClick={() => deleteGame(game.id)}>
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

Games.propTypes = {
    delete_game: PropTypes.func.isRequired,
    add_game: PropTypes.func.isRequired
}

export default connect(null, {delete_game, add_game})(Games);