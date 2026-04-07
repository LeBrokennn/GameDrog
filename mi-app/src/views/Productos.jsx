import Card from "../components/Card";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Productos() {
  const { carrito } = useContext(AppContext);

  const productos = [
    { id: 1, nombre: "Fifa 26", precio: 500000 },
    { id: 2, nombre: "Mouse", precio: 10000 },
    { id: 3, nombre: "Teclado", precio: 20000 },
  ];

  return (
    <div className="container mt-5">
      <h1>Productos</h1>

      <div className="row">
        {productos.map((p) => (
          <Card key={p.id} nombre={p.nombre} precio={p.precio} />
        ))}
      </div>

      <h2>Carrito</h2>
      {carrito.map((item, index) => (
        <p key={index}>{item.nombre}</p>
      ))}
    </div>
  );
}

export default Productos;