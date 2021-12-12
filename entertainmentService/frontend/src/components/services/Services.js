import React, {Fragment, useEffect, useState} from "react";
import {add_service, delete_service_item, get_services} from "../../actions/service";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Container, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Button, Input, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";


export const useStyles = makeStyles((theme) => ({
    input: {
        marginLeft: theme.spacing(4),
        width: '50%'
    },
    formDivContainer: {
        display: "flex",
        flexDirection: "row",
        marginLeft: theme.spacing(35),
        alignItems: "flex-start",
        marginBottom: theme.spacing(5)
    },
    table:{
        marginLeft: theme.spacing(35),
        marginRight: 0,
        width: "70%",
        alignItems: "flex-start"
    },
    tableHead:{
        display: "flex",
        marginBottom: theme.spacing(5),
        marginRight: 0,
        justifyContent: "space-between"
    },
    tableRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(4)
    }
}))

export function Services(props){

    const {services} = useSelector(state => state.common);

    const [serviceCredentials, setServiceCredentials] = useState({
        serviceName: ''
    })
    const dispatch = useDispatch();

    //Download all services on page load
    useEffect(() => {
        dispatch(get_services());
    }, [dispatch]);

    const deleteService = (serviceId) => {
        props.delete_service_item(serviceId);
    }
    const addNewService = (e) =>
    {
        e.preventDefault();
        props.add_service({
            'name': serviceCredentials.serviceName
        })
    }
    const onInputChange = (e) => {
        setServiceCredentials({...serviceCredentials, [e.target.name]: e.target.value})
    }

    const classes = useStyles();

    return(
        <Fragment>
            {services &&
            <div>
                <Container>
                <form onSubmit={addNewService}>
                    <div className={classes.formDivContainer}>
                        <Label for={'service_name'}>Название сервиса</Label>
                        <Input id={'service_name'} name={'serviceName'}
                               className={classes.input}
                               value={serviceCredentials.serviceName}
                               onChange={onInputChange}
                               />
                    </div>
                    <div className={classes.formDivContainer}>
                        <Button type={'submit'}>Добавить сервис</Button>
                    </div>
                </form>
            </Container>
            <Container>
                <table className={classes.table}>
                    <thead className={classes.tableHead}>
                    <th>Название сервиса</th>
                    <Container>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </Container>
                    </thead>
                    <tbody >
                    {services.map((service, index) => (
                    <tr key={index} className={classes.tableRow}>
                        <td><Typography key={`text-${index}`}>
                            {service.name}
                        </Typography>
                        </td>
                        <Container>
                           <td>
                            <Button
                                key={`button-${index}`}
                                component={Link}
                                to={`${service.id}`}>
                            Изменить
                        </Button>
                        </td>
                        <td>
                            <Button
                        onClick={() => deleteService(service.id)}>
                            Удалить
                        </Button>
                        </td>
                        </Container>

                    </tr>
                ))}
                    </tbody>
                </table>

            </Container>
            </div>}
        </Fragment>
    )
}

Services.propTypes = {
    delete_service_item: PropTypes.func.isRequired,
    add_service: PropTypes.func.isRequired
}

export default connect(null, {delete_service_item, add_service})(Services);