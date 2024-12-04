import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {
  // Funcao pra deletar um animal
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/animais/${props.id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
    alert(`ANIMAL ${res.nome} ADOTADO COM SUCESSO 😍`);
  };

  return (
    <div>
      <Card style={{ width: "22rem", height: "30rem", margin: "30px", border: "2px solid black", boxShadow: "0px 0px 50px black"}}>
        {/* Imagem do Card */}

        <Card.Img variant="end" src={props.imagemUrl} height="200px" style={{borderBottom: "1px solid black"}} />
        <Card.Body>
          {/* Título do card com nome do animal */}

          <Card.Title>{props.nome}</Card.Title>

          {/* Subtitulo no card com raca do animal */}
          <Card.Subtitle className="mb-2 text-muted">
            RAÇA: {props.raca}
          </Card.Subtitle>

          <Card.Text>
            {" "}
            <b>TIPO:</b> <br />
            {props.tipo}
          </Card.Text>
      
          <Card.Text>
            {" "}
            <b>VACINADO?:</b> <br />
            {props.vacina}
          </Card.Text>

          <Card.Link href={`/animal/editar/${props.id}`}>
            <Button variant="primary">EDITAR</Button>
          </Card.Link>

          <Card.Link href="/home">
            <Button variant="danger" type="button" onClick={handleDelete}>
              ADOÇÃO   
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
