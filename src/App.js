import { useState, useEffect, useMemo } from "react";
import "./styles.css";

const PAGE_SIZE = 10;

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10000")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}$</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          className="nav-button" 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Назад
        </button>
        <span className="page-info">Страница {currentPage} из {totalPages}</span>
        <button 
          className="nav-button" 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Вперёд
        </button>
      </div>
    </div>
  );
}

