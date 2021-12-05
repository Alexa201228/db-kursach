import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getServiceById} from "../../actions/service";
import {useParams} from "react-router-dom";
import {Label} from "reactstrap";
import {Input} from "@mui/material";

export function ServiceDetails(){

    const dispatch = useDispatch();
    const id = useParams()



    useEffect(() => {
        dispatch(getServiceById(id))
    }, [])

    const {service} = useSelector(state => state.common)

    return(

        <Fragment>
            {service &&
            <div>
                <form>
                    <div>
                        <Label for={'serviceName'}>Название сервиса</Label>
                        <Input id={'serviceName'} name={'name'} defaultValue={service.name}/>
                    </div>
                </form>
            </div>
            }

        </Fragment>
    )
}

export default ServiceDetails;