// importando components
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

const url = "http://localhost:5000/tipo";
const url2 = "http://localhost:5000/animais";

const CadastroProduto = () => {
  const [categoriaC, setCategoriaC] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const categoriaC = await req.json();
        setCategoriaC(categoriaC);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  //   Link animal sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/animal-sem-imagem.png";

  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [vacina, setVacina] = useState("");
  const [tipo, setTipo] = useState("Gato");
  const [imagemUrl, setImagemUrl] = useState("");

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMessagem, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  // Criando o navigate
  const navigate = useNavigate();

  // Função pra lidar com o recarregamento da página
  const handleSubmit = async (e) => {
    // faz com que a pagina não recarregue
    e.preventDefault();

    
    if (nome != "") {
      if ( raca != "") {
        const animal = { nome, tipo, raca, vacina, imagemUrl };
        console.log(animal);

        try {
          const req = await fetch(url2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(animal),
          });

          const res = await req.json();
          console.log(res);

          setAlertClass("mb-3 mt-2");
          setAlertVariant("success");
          setAlertMessage("CADASTRO EFETUADO COM SUCESSO");
          alert("PET CADASTRADO COM SUCESSO");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMessage("O CAMPO DA RAÇA NAO PODE SER VAZIO");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("O CAMPO DE NOME NAO PODE SER VAZIO");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "gray" }}>
      <NavBarra />
      <Container>
        <h1 style={{ margin: "50px" }}>CADASTRAR NOVOS PETS</h1>

        <form onSubmit={handleSubmit} className="mt-3">
          <Row className="mb-3">
            <Col xs={6}>
              {/* Caixinha de Imagem*/}
              <Form.Group controlId="formFileLg" className="mb-3">
                <FloatingLabel
                  controlId="floatingInputImagem"
                  label="ENVIE O LINK DA IMAGEM !"
                  className="mb-3"
                >
                  <Form.Control
                    type="Text"
                    placeholder="ENVIE A IMAGEM DO PET"
                    value={imagemUrl}
                    onChange={(e) => {
                      setImagemUrl(e.target.value);
                    }}
                  />
                </FloatingLabel>

                <Image
                  src={imagemUrl == "" ? linkImagem : imagemUrl}
                  rounded
                  width={480}
                  height={400}
                  style={{
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={6}>
              {/* Caixinha de Nome */}
              <FloatingLabel
              
                controlId="floatingInputNome"
                label="NOME"
                className="mb-3"
              >
                <Form.Control
                  type="Text"
                  placeholder="DIGITE O NOME DO ANIMAL"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
              </FloatingLabel>

              {/* Select tipo */}
              <Form.Group as={Col} controlId="formGridTipo">
                <Form.Label>TIPO DO ANIMAL</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => {
                    setTipo(e.target.value);
                  }}
                >
                
                  {categoriaC.map((tipo) => (
                    <option key={tipo.id} value={tipo.nome}>
                      {tipo.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
                  
            
              <Form.Label style={{ margin: "20px" }}>
                {" "}
                RAÇA{" "}
              </Form.Label>
              

              <FloatingLabel
              
              controlId="floatingInputRaca"
              label="RAÇA"
              className="mb-3"
            >
              <Form.Control
                type="Text"
                placeholder="DIGITE O NOME DO ANIMAL"
                value={raca}
                onChange={(e) => {
                  setRaca(e.target.value);
                }}
              />
            </FloatingLabel>

            <Form.Label style={{ margin: "20px" }}>
                {" "}
                VACINADO{" "}
              </Form.Label>
              

              <FloatingLabel
              
              controlId="floatingInputVacina"
              label="VACINADO?"
              className="mb-3"
            >
              <Form.Control
                type="Text"
                placeholder="VACINADO?:"
                value={vacina}
                onChange={(e) => {
                  setVacina(e.target.value);
                }}
              />
            </FloatingLabel>
            </Col>
          </Row>

          {/* Alerta caso haja erro */}
          <Alert className={alertClass} variant={alertVariant}>
            {alertMessagem}
          </Alert>

          {/* Botão para enviar formulário */}
          <Button
            variant="success"
            size="lg"
            type="submit"
            style={{ marginBottom: "253px" }}
          >
            CADASTRAR
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroProduto;
