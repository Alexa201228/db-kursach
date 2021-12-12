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
import {change_subscription, getSubscriptionById} from "../../actions/subscriptions";
import {get_services} from "../../actions/service";

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


export function SubscriptionDetail(props){

    const {subscription, services} = useSelector(state => state.common)
    const dispatch = useDispatch();
    const {subscription_id} = useParams()

    const [subscriptionDetails, setSubscriptionDetails] = useState({
        name: subscription?.name,
        duration: subscription?.duration,
        services: subscription?.services
    })

    useEffect(() => {
        dispatch(getSubscriptionById(subscription_id));
        dispatch(get_services())
    }, [subscription_id])

    useEffect(() => {
        setSubscriptionDetails({...subscriptionDetails,
        name: subscription?.name,
        duration: subscription?.duration,
        services: subscription?.services})
    }, [subscription])

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        console.log(value)
        return setSubscriptionDetails({
                ...subscriptionDetails,
                [e.target.name]: typeof value === 'string' ? value.split(',') : value
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(subscriptionDetails)
        props.change_subscription({
            'name': subscriptionDetails.name,
            'duration': parseInt(subscriptionDetails.duration),
            'services': subscriptionDetails.services
        }, subscription_id)
    }


    const deleteFromList = (e) => {
        const {
            target: { value },
        } = e;

        var val = JSON.parse(value)
        return setSubscriptionDetails({
            ...subscriptionDetails,
            [e.target.name]: subscriptionDetails[e.target.name].filter(v => v.id != val.id)
        })
    }
    const classes = useStyles()
    return(
        <Fragment>
            {!!subscription && subscriptionDetails.services &&
            <div>
                <form onSubmit={onSubmit}>
                    <table className={classes.table}>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'subscriptionName'}>Название подписки</Label>
                            </td>
                            <td>
                                <Input id={'subscriptionName'} name={'name'}
                               defaultValue={subscription.name}
                               value={subscriptionDetails.name} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'subscriptionDuration'}>Длительность подписки (в днях)</Label>
                            </td>
                            <td>
                                <TextField name={'duration'}
                                           defaultValue={subscription.duration}
                                           value={subscriptionDetails.duration}
                                           type={'number'}
                                           onChange={onChange}
                                           InputProps={{
                                            inputProps: { min: 7 }
                                    }}/>
                            </td>
                        </tr>
                        <tr className={classes.tableRow}>
                            <td>
                                <Label for={'subscriptionServices'}>Сервисы подписки</Label>
                            </td>
                            <td>
                                 <Select
                            multiple={true}
                            value={subscriptionDetails.services}
                            onChange={onChange}
                            name={'services'}
                            defaultValue={subscriptionDetails.services}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            renderValue={(selected) => {
                                var names = [];
                                for(var i = 0; i < selected.length; i++){
                                    names.push(selected[i]['name'])
                                }
                                return names.join(', ')
                            }}
                            MenuProps={MenuProps}>
                            {services.filter(s => !subscriptionDetails.services.some(serv => serv.id == s.id)).map((val, index) => (
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
                                        {subscriptionDetails.services.map((val, key) => (
                                               <ListItem key={`film-${key}`} >
                                                {val.name}
                                                   <Button name={'services'} value={`${JSON.stringify(val)}`} onClick={deleteFromList}>X</Button>
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

SubscriptionDetail.propTypes = {
    change_subscription: PropTypes.func.isRequired
}


export default connect(null, {change_subscription})(SubscriptionDetail);