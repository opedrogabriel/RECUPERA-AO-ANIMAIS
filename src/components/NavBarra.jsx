import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Componente de barra de navegação com pesquisa e links
const NavBarra = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(""); // Estado para o valor do campo de busca

  // Função para manipular a busca ao enviar o formulário
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue); // Atualiza o termo de busca no componente pai
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {/* Logo com link para a página inicial */}
        <Navbar.Brand href="/home">
        <span
            style={{ fontSize: "50px", color: "black", margin: "7px" }}
            className="material-symbols-outlined"
          >
            pets
          </span>
         
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          {/* Navegação com links */}

          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/animal/cadastrar" style={{ color: "black" }} >CADASTRAR PET</Nav.Link>
            <Nav.Link href="/login" style={{ color: "red" }}>SAIR</Nav.Link>
          </Nav>

          {/* Formulário de busca */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="PROCURAR"
              className="me-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado
            />
            <Button variant="outline-success" type="submit">PROCURAR</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarra; // Exporta o componente
