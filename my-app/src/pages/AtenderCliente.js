import imagen from 'assets/img/es-1x1.png';

import Page from 'components/Page';

import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

class AtenderCliente extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="AtenderCliente"
        title="Ver Pantalla del cliente"
        breadcrumbs={[{ name: 'ver pantalla del cliente', active: true }]}
      >
        <Row>
        <Col xl={6} lg={12} md={12}>
         <img src={imagen} alt="Logo" />;
        </Col>
        </Row>
      </Page>
    );
  }
}
export default AtenderCliente;
