import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {getServiceById} from "../../actions/service";
import {useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Button, Checkbox, Input, MenuItem, OutlinedInput, Select} from "@mui/material";
import {get_film_list} from "../../actions/film";

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


export function ServiceDetails(){

    const dispatch = useDispatch();
    const id = useParams()

    const [serviceDetails, setServiceDetails] = useState({
        name: '',
        films: [],
        series: [],
        games: []
    })

    useEffect(() => {
        dispatch(getServiceById(id));
        dispatch(get_film_list());
    }, [])

    const {service, films} = useSelector(state => state.common)
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        console.log(value)
        if(e.target.name == 'name'){
            setServiceDetails({...serviceDetails, [e.target.name]: e.target.value})
        }
        else{
            setServiceDetails({
                ...serviceDetails,
                [e.target.name]: typeof value === 'string' ? value.split(',') : value
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }
    return(

        <Fragment>
            {service &&
            <div>
                <form onSubmit={}>
                    <div>
                        <Label for={'serviceName'}>Название сервиса</Label>
                        <Input id={'serviceName'} name={'name'}
                               defaultValue={service.name}
                               value={serviceDetails.title} onChange={onChange}/>
                    </div>
                    <div>
                        <Label for={'serviceFilms'}>Фильмы, доступные на сервисе</Label>
                        <Select
                            multiple={true}
                            value={serviceDetails.films}
                            onChange={onChange}
                            name={'films'}
                            input={<OutlinedInput style={{ width: "250px"}}/>}
                            MenuProps={MenuProps}>
                            {films.map((val) => (
                                <MenuItem
                                key={`key-${val}`}
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


export default connect(null, {})(ServiceDetails);