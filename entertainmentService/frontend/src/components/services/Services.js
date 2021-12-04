import React, {Fragment, useEffect} from "react";
import {get_category_items} from "../../actions/common";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, CardText, Container} from "reactstrap";
import {useLocation, useParams} from "react-router-dom";


export function Services(){

    const {services} = useSelector(state => state.common);
    const dispatch = useDispatch();
    const slug = useLocation();
    useEffect(() => {
        dispatch(get_category_items(slug.pathname));
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