from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

products = []
customers = []
orders = []

class Product(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int

class Customer(BaseModel):
    full_name: str
    email: str
    phone: str

class Order(BaseModel):
    customer_id: int
    product_id: int
    quantity: int

@app.get("/")
def home():
    return {"message": "Inventory Management API Running"}

@app.post("/products")
def create_product(product: Product):
    for p in products:
        if p["sku"] == product.sku:
            raise HTTPException(status_code=400, detail="SKU already exists")

    data = product.dict()
    data["id"] = len(products) + 1
    products.append(data)
    return data

@app.get("/products")
def get_products():
    return products
@app.get("/products/{product_id}")
def get_product(product_id: int):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    products.remove(product)
    return {"message": "Product deleted"}

@app.post("/customers")
def create_customer(customer: Customer):
    for c in customers:
        if c["email"] == customer.email:
            raise HTTPException(status_code=400, detail="Email already exists")

    data = customer.dict()
    data["id"] = len(customers) + 1
    customers.append(data)
    return data

@app.get("/customers")
def get_customers():
    return customers
@app.get("/customers/{customer_id}")
def get_customer(customer_id: int):
    customer = next((c for c in customers if c["id"] == customer_id), None)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):
    customer = next((c for c in customers if c["id"] == customer_id), None)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    customers.remove(customer)
    return {"message": "Customer deleted"}

@app.post("/orders")
def create_order(order: Order):

    product = next(
        (p for p in products if p["id"] == order.product_id),
        None
    )

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product["quantity"] < order.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    total = product["price"] * order.quantity

    product["quantity"] -= order.quantity

    data = order.dict()
    data["id"] = len(orders) + 1
    data["total_amount"] = total

    orders.append(data)

    return data

@app.get("/orders")
def get_orders():
    return orders
@app.get("/orders/{order_id}")
def get_order(order_id: int):
    order = next((o for o in orders if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@app.delete("/orders/{order_id}")
def delete_order(order_id: int):
    order = next((o for o in orders if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    orders.remove(order)
    return {"message": "Order deleted"}

@app.get("/dashboard")
def dashboard():
    low_stock = len([p for p in products if p["quantity"] < 5])

    return {
        "total_products": len(products),
        "total_customers": len(customers),
        "total_orders": len(orders),
        "low_stock_products": low_stock
    }