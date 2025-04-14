import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <header className="App-header">
      <Navbar bg="transparent" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            生物信息学预测平台
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">首页</Nav.Link>
              <NavDropdown title="蛋白质预测" id="protein-nav-dropdown">
                <NavDropdown.Item as={Link} to="/predict/kcat">Kcat预测</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/predict/km">Km预测</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/predict/tm">Tm预测</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/predict/solubility">溶解度预测</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="基因预测" id="gene-nav-dropdown">
                <NavDropdown.Item as={Link} to="/predict/promoter">启动子强度预测</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/predict/rbs">RBS翻译起始率预测</NavDropdown.Item>
              </NavDropdown>
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