import React, { useState, useEffect } from "react";
import CardProduto from "../components/CardProduto";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarra from "../components/NavBarra";

// URL da API
const url = "http://localhost:5000/animais";


const Home = () => {
  const [cads, setCads] = useState([]); // 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredCads, setFilteredCads] = useState([]); 

 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCads(data);
        setFilteredCads(data);
      } catch (error) {
        console.log("ERRO AO CARREGAR", error.message);
      }
    }
    fetchData();
  }, []);

  
  useEffect(() => {
    const filtered = cads.filter((animal) =>
      animal.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCads(filtered);
  }, [searchTerm, cads]);

  return (
    <div style={{background: "cdcdcd" }}>
      <NavBarra setSearchTerm={setSearchTerm} />
      <img src="https://cczcampos.com.br/wp-content/uploads/2024/09/NovosBanners-6-940x380-1.png" style={{ height: "350px", width: "100%"}} alt="" />
      <h1 style={{ margin: "50px", color: "black" }}>NOSSOS PETS</h1>
      <div className="container">
        <div className="lista-produtos d-flex gap-3 mt-3 justify-content-start flex-wrap col-12">
          {filteredCads.map((prod) => (
            <CardProduto
              key={prod.id}
              id={prod.id}
              nome={prod.nome}
              raca={prod.raca}
              tipo={prod.tipo}
              vacina={prod.vacina}
              imagemUrl={prod.imagemUrl}

            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
