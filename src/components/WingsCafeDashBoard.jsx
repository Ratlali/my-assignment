// src/components/WingsCafeDashBoard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WingsCafeDashBoard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    const chartData = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Stock Quantity',
                data: products.map(product => product.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Product Stock Levels',
            },
        },
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>Wings Cafe Dashboard</h1>
            </header>
            
            <nav>
                <Link to="/productmanagement">Product Management</Link>
                <Link to="/usermanagement">User Management</Link>
            </nav>
            
            <section>
                <h2>Welcome to the Wings Cafe Management System</h2>
                <p>Manage your products efficiently.</p>
            </section>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate("/")}>Logout</button>
            </div>

            <h3>Product Stock Levels</h3>
            <div>
                {products.length > 0 ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <p>No products available.</p>
                )}
            </div>

            <h3>Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WingsCafeDashBoard;
