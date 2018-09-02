import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

export default props => (
    <Grid fluid>
        <Row>
            <Col sm={3}>
                <NavMenu />
                <Footer />
            </Col>
            <Col sm={9}>
                {props.children}
            </Col>
        </Row>        
    </Grid>
);
//<Row>
//    <Col sm={12}>
//        <Footer />
//    </Col>
//</Row>