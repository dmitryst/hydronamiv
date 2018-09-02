import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>Гидронамыв 1.0</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Главная
          </NavItem>
        </LinkContainer>        
        <LinkContainer to={'/block1'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> 1.Исходные данные
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/block2'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> 2.Расчет производительности земснаряда
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/block3'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> 3.Расчет гидротранспорта грунта от карьера до карты намыва
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/block4'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> 4.Расчет водосбросных сооружений на карте намыва
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/block5'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> 5.Расчет основных параметров карты намыва
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/block7'}>
          <NavItem>
            <Glyphicon glyph='download-alt' /> Основные расчетные показатели
          </NavItem>
        </LinkContainer>     
       </Nav>
    </Navbar.Collapse>
    
  </Navbar>
);

//<Navbar.Text>
    //   Разработка сайта: <Navbar.Link href="mailto:dmitry_stepanov@inbox.ru/">DS</Navbar.Link>
    //</Navbar.Text>

//<LinkContainer to={'/counter'}>
//    <NavItem>
//        <Glyphicon glyph='education' /> Counter
//          </NavItem>
//</LinkContainer>
//    <LinkContainer to={'/fetchdata'}>
//        <NavItem>
//            <Glyphicon glyph='th-list' /> Fetch data
//          </NavItem>
//    </LinkContainer>

//<LinkContainer to={'/about'}>
        //  <NavItem>
        //    <Glyphicon glyph='th-large' /> О программе
        //  </NavItem>
        //</LinkContainer>