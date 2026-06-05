import { useEffect, useState } from "react";

function App() {
  const [dashboard, setDashboard] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  });

  // Product States
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Customer States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Order States
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
const [orders, setOrders] = useState([]);

  const loadDashboard = () => {
   fetch("https://inventory-management-system-45u0.onrender.com/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch((err) => console.log(err));
  };

  const loadProducts = () => {
  fetch("https://inventory-management-system-45u0.onrender.com/products")
    .then((res) => res.json())
    .then((data) => setProducts(data));
};

const loadCustomers = () => {
  fetch("https://inventory-management-system-45u0.onrender.com/customers")
    .then((res) => res.json())
    .then((data) => setCustomers(data));
};

const loadOrders = () => {
  fetch("https://inventory-management-system-45u0.onrender.com/orders")
    .then((res) => res.json())
    .then((data) => setOrders(data));
};

const deleteCustomer = async (id) => {
  await fetch(
    `https://inventory-management-system-45u0.onrender.com/customers/${id}`,
    { method: "DELETE" }
  );

  loadCustomers();
  loadDashboard();
};

const deleteOrder = async (id) => {
  await fetch(
    `https://inventory-management-system-45u0.onrender.com/orders/${id}`,
    { method: "DELETE" }
  );

  loadOrders();
  loadDashboard();
};

const deleteProduct = async (id) => {
  await fetch(
    `https://inventory-management-system-45u0.onrender.com/products/${id}`,
    {
      method: "DELETE",
    }
  );

  alert("Product Deleted Successfully");

  loadProducts();
  loadDashboard();
};

useEffect(() => {
  loadDashboard();
  loadProducts();
  loadCustomers();
  loadOrders();
}, []);

  // Add Product
  const addProduct = async () => {
    try {
      const response = await fetch(
        "https://inventory-management-system-45u0.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productName,
            sku: sku,
            price: parseFloat(price),
            quantity: parseInt(quantity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Product Added Successfully");

      setProductName("");
      setSku("");
      setPrice("");
      setQuantity("");
loadDashboard();
loadProducts();

    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  // Add Customer
  const addCustomer = async () => {
    try {
      const response = await fetch(
        "https://inventory-management-system-45u0.onrender.com/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email: email,
            phone: phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Customer Added Successfully");

      setFullName("");
      setEmail("");
      setPhone("");

loadDashboard();
loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Error adding customer");
    }
  };

  // Create Order
  const createOrder = async () => {
    try {
      const response = await fetch(
        "https://inventory-management-system-45u0.onrender.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: parseInt(customerId),
            product_id: parseInt(productId),
            quantity: parseInt(orderQuantity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Order Created Successfully");

      setCustomerId("");
      setProductId("");
      setOrderQuantity("");

      loadDashboard();
loadProducts();
loadOrders();

    } catch (error) {
      console.log(error);
      alert("Error creating order");
    }
  };

  return (
    <div className="container">
    <h1 className="title">
  Inventory Management Dashboard
</h1>

      <div className="dashboard">
        <div className="card">
          <h3>Total Products</h3>
          <p>{dashboard.total_products}</p>
        </div>

        <div className="card">
          <h3>Total Customers</h3>
          <p>{dashboard.total_customers}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>{dashboard.total_orders}</p>
        </div>

        <div className="card">
          <h3>Low Stock</h3>
          <p>{dashboard.low_stock_products}</p>
        </div>
      </div>

      <div className="section">
        <h2>Product Management</h2>

        <input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button onClick={addProduct}>
          Add Product
        </button>
        <hr />

<h3>Products</h3>

{products.map((p) => (
  <div key={p.id} className="product-item">
   ID: {p.id} | {p.name} | SKU: {p.sku} | ₹{p.price} | Qty:{p.quantity}

    <button
      onClick={() => {
  if (window.confirm("Delete this product?")) {
    deleteProduct(p.id);
  }
}}
      style={{ marginLeft: "10px" }}
    >
      Delete
    </button>
  </div>
))}
      </div>

      <div className="section">
        <h2>Customer Management</h2>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={addCustomer}>
          Add Customer
        </button>
        <hr />

<h3>Customers</h3>

{customers.map((c) => (
  <div key={c.id} className="product-item">
    ID:{c.id} | {c.full_name} | {c.email}

    <button
      onClick={() => {
        if (window.confirm("Delete this customer?")) {
          deleteCustomer(c.id);
        }
      }}
    >
      Delete
    </button>
  </div>
))}
      </div>

      <div className="section">
        <h2>Order Management</h2>

        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          placeholder="Quantity"
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(e.target.value)}
        />

        <hr />

<h3>Orders</h3>

{orders.map((o) => (
  <div key={o.id} className="product-item">
    Order:{o.id} | Customer:{o.customer_id} | Product:{o.product_id} | Qty:{o.quantity}

    <button
      onClick={() => {
        if (window.confirm("Delete this order?")) {
          deleteOrder(o.id);
        }
      }}
    >
      Delete
    </button>
  </div>
))}
      </div>
    </div>
  );
}

export default App;

