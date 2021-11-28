import React, {Fragment, useEffect} from "react";
import {greeting} from "../../actions/common";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, CardText, Container} from "reactstrap";


export function Services(){

    const {services} = useSelector(state => state.common);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(greeting());
    }, []);
    return(
        <Fragment>
            <Container>
                {services.map((service, index) => (
                    <CardBody key={index}>
                        <CardText key='text-{index}'>
                            {service.name}
                        </CardText>
                    </CardBody>
                ))}
            </Container>
        </Fragment>
    )
}

export default Services;