# Inventory Management System

A full-stack Inventory Management System built using FastAPI, React, SQLite, and SQLAlchemy. The application provides product, customer, and order management with authentication, dashboard analytics, search functionality, and a modern responsive user interface.

## Features

### Authentication

* User Registration
* User Login
* JWT Token Generation
* Secure Session Management

### Product Management

* Add Products
* View Products
* Delete Products
* Product Search
* SKU Validation

### Customer Management

* Add Customers
* View Customers
* Delete Customers
* Customer Search

### Order Management

* Create Orders
* View Orders
* Delete Orders
* Automatic Stock Updates

### Dashboard & Analytics

* Total Products
* Total Customers
* Total Orders
* Low Stock Products
* Analytics Charts

### User Interface

* Modern Responsive Design
* Dashboard Cards
* Search & Filter Functionality
* Mobile Friendly Layout

## Tech Stack

### Frontend

* React
* Vite
* CSS3
* Recharts

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### Authentication

* JWT (JSON Web Tokens)
* Passlib
* Python-Jose

### Deployment

* Frontend: Vercel
* Backend: Render

## Project Structure

inventory-system/

├── backend/

│   ├── main.py

│   ├── models.py

│   ├── database.py

│   ├── requirements.txt

│   └── inventory.db

│

└── frontend/

```
├── src/

│   ├── App.jsx

│   ├── App.css

│   └── main.jsx

└── package.json
```

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

* POST /register
* POST /login

### Products

* GET /products
* POST /products
* DELETE /products/{id}

### Customers

* GET /customers
* POST /customers
* DELETE /customers/{id}

### Orders

* GET /orders
* POST /orders
* DELETE /orders/{id}

### Dashboard

<img width="1843" height="866" alt="image" src="https://github.com/user-attachments/assets/bf73655c-5f8d-4d5a-8556-8bd4a7f6c67f" />


## Future Enhancements

* JWT Protected Routes
* Product Edit Feature
* Customer Edit Feature
* Order Edit Feature
* Sidebar Navigation
* Dark Mode
* PostgreSQL Database Integration

## Author

Aman Pandey

Developed as a full-stack portfolio project demonstrating FastAPI backend development, React frontend development, authentication, CRUD operations, analytics dashboards, and cloud deployment.
