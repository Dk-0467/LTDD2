import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import ProductList from './component/Products/list';
import Dashboard from './component/Dashboard/Dashboard';
import CreateProduct from './component/Products/add';
import EditProduct from './component/Products/edit';
import CategoryList from './component/Category/list';
import AddCategory from './component/Category/add';
import EditCategory from './component/Category/edit';
import ProtectedRoute from './component/ProtectedRoute'; // Nhập ProtectedRoute
import { AuthProvider } from './context/AuthContext';
import Cart from './component/Cart/list';
import OrderList from './component/Order/list';
const App = () => {
    return (
        <AuthProvider>
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/products" 
                        element={
                            <ProtectedRoute allowedRoles={['admin', 'user']}>
                                <ProductList />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/products/create" 
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <CreateProduct />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/products/edit/:id" 
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <EditProduct />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/categories" 
                        element={
                            <ProtectedRoute allowedRoles={['admin', 'user']}>
                                <CategoryList />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/categories/create" 
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AddCategory />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/categories/edit/:id" 
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <EditCategory />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/cart" 
                        element={
                            <ProtectedRoute allowedRoles={['admin', 'user']}>
                                <Cart />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/orders" 
                        element={
                            <ProtectedRoute allowedRoles={['admin', 'user']}>
                                <OrderList />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
        </AuthProvider>
    );
};

export default App;
