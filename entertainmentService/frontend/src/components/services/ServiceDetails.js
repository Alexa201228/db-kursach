import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes, {string} from "prop-types";
import {getServiceById, change_service} from "../../actions/service";
import {useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Box, Button, Checkbox, Chip, Input, MenuItem, OutlinedInput, Select} from "@mui/material";
import {get_film_list} from "../../actions/common";


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

    const dispatch = useDispatch();
    const id = useParams()
    const {service, films} = useSelector(state => state.common)
    const [serviceDetails, setServiceDetails] = useState({
        name: service?.name,
        films: service?.films,
        series: service?.series,
        games: service?.games
    })

    useEffect(() => {
        dispatch(getServiceById(id));
        dispatch(get_film_list());
    }, [])


    const onChange = (e) => {
        const {
            target: { value },
        } = e;

        if(e.target.name == 'name'){
            return setServiceDetails({...serviceDetails, [e.target.name]: e.target.value})
        }
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
        }, id)
    }

    return(

        <Fragment>
            {!!service && films && serviceDetails.films &&
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <Label for={'serviceName'}>Название сервиса</Label>
                        <Input id={'serviceName'} name={'name'}
                               defaultValue={service.name}
                               value={serviceDetails.name} onChange={onChange}/>
                    </div>
                    <div>
                        <Label for={'serviceFilms'}>Фильмы, доступные на сервисе</Label>
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
                            {films.map((val, index) => (
                                <MenuItem
                                key={index}
                                value={val}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                    <Checkbox checked={serviceDetails.films.indexOf(val) > -1} />
                                    {val.title}
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

ServiceDetails.propTypes = {
    change_service: PropTypes.func.isRequired
}


export default connect(null, {change_service})(ServiceDetails);