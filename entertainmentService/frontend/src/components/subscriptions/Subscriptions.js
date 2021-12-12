import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Container, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Button, Input, Typography} from "@mui/material";
import {useStyles} from "../services/Services";
import {add_subscription, delete_subscription, get_subscriptions_list} from "../../actions/subscriptions";


export function Subscriptions(props){

    const {subscriptions} = useSelector(state => state.common);

    const [subscriptionCredentials, setSubscriptionCredentials] = useState({
        name: ''
    })
    const dispatch = useDispatch();

    //Download all on page load
    useEffect(() => {
        dispatch(get_subscriptions_list());
    }, [dispatch]);

    const deleteSubscription= (subscriptionId) => {
        props.delete_subscription(subscriptionId);
    }
    const addNewSubscription = (e) =>
    {
        e.preventDefault();
        props.add_subscription({
            'name': subscriptionCredentials.name
        })
    }
    const onInputChange = (e) => {
        setSubscriptionCredentials({...subscriptionCredentials, [e.target.name]: e.target.value})
    }

    const classes = useStyles();
    return(
        <Fragment>
            <Container>
                <form onSubmit={addNewSubscription}>
                    <div className={classes.formDivContainer}>
                        <Label for={'film_name'}>Название подписки</Label>
                        <Input id={'film_name'} name={'name'}
                               className={classes.input}
                               value={subscriptionCredentials.name}
                               onChange={onInputChange}
                               />
                    </div>
                    <div className={classes.formDivContainer}>
                        <Button type={'submit'}>Добавить подписку</Button>
                    </div>
                </form>
            </Container>
            <Container>
                <table className={classes.table}>
                    <thead className={classes.tableHead}>
                    <th>Название подписки</th>
                    <Container>
                        <th >Редактировать</th>
                        <th >Удалить</th>
                    </Container>
                    </thead>
                    <tbody >
                    {subscriptions.map((subscription, index) => (
                    <tr key={index} className={classes.tableRow}>
                        <td>
                            <Typography key={`text-${index}`}>
                                {subscription.name}
                            </Typography>
                        </td>
                        <Container>
                           <td>
                            <Button
                                key={`button-${index}`}
                                component={Link}
                                to={`${subscription.id}`}>
                            Изменить
                        </Button>
                        </td>
                        <td>
                            <Button
                        onClick={() => deleteSubscription(subscription.id)}>
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

Subscriptions.propTypes = {
    delete_subscription: PropTypes.func.isRequired,
    add_subscription: PropTypes.func.isRequired
}

export default connect(null, {delete_subscription, add_subscription})(Subscriptions);