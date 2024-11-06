import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
    const [newProduct, setNewProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '' });
    const [deleteProductName, setDeleteProductName] = useState('');

    const addProduct = (event) => {
        event.preventDefault();
        const product = { id: Date.now(), ...newProduct, price: parseFloat(newProduct.price), quantity: parseInt(newProduct.quantity, 10) };

        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        storedProducts.push(product);
        localStorage.setItem('products', JSON.stringify(storedProducts));
        alert('Product added successfully');
        setNewProduct({ name: '', description: '', category: '', price: '', quantity: '' });
    };

    const deleteProduct = (event) => {
        event.preventDefault();
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const filteredProducts = storedProducts.filter(product => product.name !== deleteProductName);

        if (filteredProducts.length === storedProducts.length) {
            alert('Product not found');
            return;
        }

        localStorage.setItem('products', JSON.stringify(filteredProducts));
        alert('Product deleted successfully');
        setDeleteProductName('');
    };

    return (
        <div>
            <h2>Product Management</h2>
            <form onSubmit={addProduct}>
                <input 
                    type="text" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                    placeholder="Product Name" 
                    required 
                />
                <input 
                    type="text" 
                    value={newProduct.description} 
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                    placeholder="Description" 
                    required 
                />
                <input 
                    type="text" 
                    value={newProduct.category} 
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
                    placeholder="Category" 
                    required 
                />
                <input 
                    type="number" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                    placeholder="Price" 
                    step="0.01" 
                    required 
                />
                <input 
                    type="number" 
                    value={newProduct.quantity} 
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} 
                    placeholder="Quantity" 
                    required 
                />
                <button type="submit">Add Product</button>
            </form>

            <form onSubmit={deleteProduct}>
                <input 
                    type="text" 
                    value={deleteProductName} 
                    onChange={(e) => setDeleteProductName(e.target.value)} 
                    placeholder="Product Name to delete" 
                    required 
                />
                <button type="submit">Delete Product</button>
            </form>

            {/* Back to Dashboard Link */}
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default ProductManagement;
