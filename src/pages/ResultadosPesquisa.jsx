import React, { useState, useEffect } from "react";
import CardProduto from "../components/CardProduto";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarra from "../components/NavBarra";
import { useLocation } from "react-router-dom";


const url = "http://localhost:5000/produtos";

const ResultadosPesquisa = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const req = await fetch(`${url}?nome_like=${search}`);
        const data = await req.json();
        setProdutos(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, [search]);

  return (
    <div style={{ minHeight: "100vh", background: "#ffcbdb" }}>
      <NavBarra />
      <h1 style={{ margin: "50px", color: "black" }}>
        RESULTADOS PARA: "{search}"
      </h1>
      <div className="container">
        <div className="lista-produtos d-flex gap-3 mt-3 justify-content-start flex-wrap col-12">
          {loading ? (
            <p>CARREGANDO...</p>
          ) : produtos.length > 0 ? (
            produtos.map((prod) => (
              <CardProduto
                key={prod.id}
                id={prod.id}
                nome={prod.nome}
                raca={prod.raca}
                tipo={prod.tipo}
                imagemUrl={prod.imagemUrl}
              />
            ))
          ) : (
            <p style={{ color: "black" }}>NENHUM PRODUTO ENCONTRADO.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultadosPesquisa;
