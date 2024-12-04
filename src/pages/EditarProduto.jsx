// Importando components
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Importando o hook useState para monitorar
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// URL da API de tipos e produtos
const urlTipo = "http://localhost:5000/tipo";
const urlProdutos = "http://localhost:5000/animais";

const EditarProduto = () => {
  // Estado para armazenar os tipos de produtos
  const [tipoC, setTipos] = useState([]);

  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState("");

  // Busca os tipos de produtos da API
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(urlTipo);
        const tipoC = await req.json();
        setTipos(tipoC);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Link padrão para imagens sem URL definida
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/animal-sem-imagem.png";

  // Estados para armazenar os dados do animal
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [vacina, setVacina] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  // Estados para exibir alertas
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMessagem, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate();

  // Obter o ID do animal pela URL
  const params = window.location.pathname.split("/");
  const idAnimal = params[params.length - 1];

  // Busca os dados do animal a ser editado da API
  useEffect(() => {
    async function fetchProduto() {
      try {
        const req = await fetch(`${urlProdutos}/${idAnimal}`);
        const animal = await req.json();
        setNome(animal.nome);
        setRaca(animal.raca);
        setTipo(animal.tipo);
        setVacina(animal.vacina);
        setImagemUrl(animal.imagemUrl || "");
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProduto();
  }, [idAnimal]);

  // Função para enviar os dados atualizados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome !== "" && raca !== "") {
      const animal = { nome, raca, tipo, vacina, imagemUrl };

      try {
        const req = await fetch(`${urlProdutos}/${idAnimal}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(animal),
        });

        const res = await req.json();
        console.log(res);

        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMessage("PET EDITADO COM SUCESSO");
        alert("PET EDITADO COM SUCCESO");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("TODOS OS CAMPOS OBRIGATORIOS DEVEM SER PREENCHIDOS");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#CDCDCD" }}>
      {/* Barra de navegação com a funcionalidade de pesquisa */}
      <NavBarra setSearchTerm={setSearchTerm} />
      <Container>
        <h1 style={{ margin: "50px" }}>EDIÇAO DO PET</h1>

        <form onSubmit={handleSubmit} className="mt-3">
          <Row className="mb-3">
            <Col xs={6}>
              {/* Campo de Nome */}
              <FloatingLabel
                controlId="floatingInputNome"
                label="NOME"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="NOME DO PET"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              {/* Campo de Tipo */}
              <Form.Group as={Col} controlId="formGridTipo">
                <Form.Label>TIPO</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">SELECIONE UM TIPO DE ANIMAL</option>
                  {tipoC.map((t) => (
                    <option key={t.id} value={t.nome}>
                      {t.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

            
              <Form.Label style={{ margin: "20px" }}>RAÇA</Form.Label>
              <FloatingLabel
                controlId="floatingInputPreco"
                label="RAÇA"
                className="mb-3"
              >
                <Form.Control
                  placeholder="DIGITE A RAÇA DO ANIMAL"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                />
              </FloatingLabel>
              <Form.Label style={{ margin: "20px" }}>
                {" "}
                ESTADO DA VACINA{" "}
              </Form.Label>
              

              <FloatingLabel
              
              controlId="floatingInputRaca"
              label="VACINADO"
              className="mb-3"
            >
              <Form.Control
                type="Text"
                placeholder="VACINADO S/N"
                value={vacina}
                onChange={(e) => {
                  setVacina(e.target.value);
                }}
              />
            </FloatingLabel>
            </Col>

            <Col xs={6}>
              {/* Campo de Imagem */}
              <Form.Group controlId="formFileLg" className="mb-3">
                <FloatingLabel
                  controlId="floatingInputImagem"
                  label="LINK DA IMAGEM DO PET"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="DIGIE O LINK DA IMAGEM"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                  />
                </FloatingLabel>
                <Image
                  src={imagemUrl === "" ? linkImagem : imagemUrl}
                  rounded
                  width={300}
                  height={300}
                  style={{
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                  }}
                />
                
              </Form.Group>
            </Col>
          </Row>

          {/* Alerta de Feedback */}
          <Alert className={alertClass} variant={alertVariant}>
            {alertMessagem}
          </Alert>

          {/* Botão de Enviar */}
          <Button
            variant="success"
            size="lg"
            type="submit"
            style={{ marginBottom: "253px" }}
          >
            EDITAR PET
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditarProduto;
