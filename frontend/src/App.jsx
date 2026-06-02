function App() {
  return (
    <div className="container">

      <h1 className="title">
        Inventory Management System
      </h1>

      <div className="dashboard">

        <div className="card">
          <h3>Total Products</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Total Customers</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Low Stock</h3>
          <p>0</p>
        </div>

      </div>

      <div className="section">
        <h2>Product Management</h2>

        <input placeholder="Product Name" />
        <input placeholder="SKU" />
        <input placeholder="Price" />
        <input placeholder="Quantity" />

        <button>Add Product</button>
      </div>

      <div className="section">
        <h2>Customer Management</h2>

        <input placeholder="Full Name" />
        <input placeholder="Email" />
        <input placeholder="Phone Number" />

        <button>Add Customer</button>
      </div>

      <div className="section">
        <h2>Order Management</h2>

        <input placeholder="Customer ID" />
        <input placeholder="Product ID" />
        <input placeholder="Quantity" />

        <button>Create Order</button>
      </div>

    </div>
  );
}

export default App;