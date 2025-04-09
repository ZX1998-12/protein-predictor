import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <header className="App-header">
      <Navbar bg="transparent" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            蛋白质特性预测数据库
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">首页</Nav.Link>
              <Nav.Link as={Link} to="/about">关于</Nav.Link>
              <Nav.Link as={Link} to="/faq">常见问题</Nav.Link>
              <Nav.Link as={Link} to="/api">API</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 