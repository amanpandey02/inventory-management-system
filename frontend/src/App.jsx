import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

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
  const [productSearch, setProductSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
const [orders, setOrders] = useState([]);

const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("token") ? true : false
);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
const [showRegister, setShowRegister] = useState(false);

const [registerUsername, setRegisterUsername] = useState("");
const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");

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

const loginUser = async () => {
  try {
    const response = await fetch(
     "https://inventory-management-system-45u0.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert("Invalid Login");
      return;
    }

    localStorage.setItem(
      "token",
      data.access_token
    );

    setIsLoggedIn(true);

  } catch (error) {
    console.log(error);
  }
};

const registerUser = async () => {
  try {
    const response = await fetch(
      "https://inventory-management-system-45u0.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail);
      return;
    }

    alert("Registration Successful");

    setRegisterUsername("");
    setRegisterEmail("");
    setRegisterPassword("");

    setShowRegister(false);
  } catch (error) {
    console.log(error);
    alert("Registration Failed");
  }
};

const logout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
};

const toggleTheme = () => {
  const newTheme = !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    "theme",
    newTheme ? "dark" : "light"
  );
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

if (!isLoggedIn) {
  return (
   <div className={`auth-container ${darkMode ? "dark" : ""}`}>
  <div className="auth-card">
        {!showRegister ? (
          <>
            <h1 className="auth-title">
            Inventory Management
                  </h1>

          <h2 className="auth-title">
  Login
              </h2>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

           <button
  className="auth-btn"
  onClick={loginUser}
>
              Login
            </button>
            <p>Don't have an account?</p>
<button
  className="auth-btn"
  onClick={() => setShowRegister(true)}
>
              Register
            </button>
          </>
        ) : (
          <>

            <h1 className="auth-title">
               Create Account
                 </h1>

            <input
              placeholder="Username"
              value={registerUsername}
              onChange={(e) =>
                setRegisterUsername(e.target.value)
              }
            />

            <input
              placeholder="Email"
              value={registerEmail}
              onChange={(e) =>
                setRegisterEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) =>
                setRegisterPassword(e.target.value)
              }
            />

<button
className="auth-btn"
  onClick={registerUser}
>
              Register
            </button>

            <p>
              Already have an account?
            </p>

            <button
              onClick={() => setShowRegister(false)}
            >
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}

  return (
    //Dashboard and Management UI
    <div className={`container ${darkMode ? "dark" : ""}`}>
  <div className="header">
  <h1 className="title">
    Inventory Management System
  </h1>
</div>

  <div className="header-actions">
  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>

  <button onClick={toggleTheme}>
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
</div>

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
  <h2>Analytics</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={[
        {
          name: "Products",
          value: dashboard.total_products,
        },
        {
          name: "Customers",
          value: dashboard.total_customers,
        },
        {
          name: "Orders",
          value: dashboard.total_orders,
        },
        {
          name: "Low Stock",
          value: dashboard.low_stock_products,
        },
      ]}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  </ResponsiveContainer>
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

<input
  placeholder="Search Product"
  value={productSearch}
  onChange={(e) =>
    setProductSearch(e.target.value)
  }
/>
<h3>Products</h3>

{products.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase())).map((p) => (
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

<input
  placeholder="Search Customer"
  value={customerSearch}
  onChange={(e) =>
    setCustomerSearch(e.target.value)
  }
/>
<h3>Customers</h3>

{customers.filter((c) => c.full_name.toLowerCase().includes(customerSearch.toLowerCase())).map((c) => (
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
         
<button onClick={createOrder}>
  Create Order
</button>
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

