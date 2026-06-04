from sqlalchemy import func
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import engine, SessionLocal, get_db
from models import (
    Base,
    Product as ProductModel,
    Customer as CustomerModel,
    Order as OrderModel
)
app = FastAPI()
Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def create_product(
    product: Product,
    db: Session = Depends(get_db)
):
    existing_product = db.query(ProductModel).filter(
        ProductModel.sku == product.sku
    ).first()

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    new_product = ProductModel(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity=product.quantity
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@app.get("/products")
def get_products(
    db: Session = Depends(get_db)
):
    products = db.query(ProductModel).all()
    return products

@app.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(ProductModel).filter(
        ProductModel.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(ProductModel).filter(
        ProductModel.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {"message": "Product deleted"}

@app.post("/customers")
def create_customer(
    customer: Customer,
    db: Session = Depends(get_db)
):
    existing_customer = db.query(CustomerModel).filter(
        CustomerModel.email == customer.email
    ).first()

    if existing_customer:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_customer = CustomerModel(
        full_name=customer.full_name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


@app.get("/customers")
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(CustomerModel).all()


@app.get("/customers/{customer_id}")
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = db.query(CustomerModel).filter(
        CustomerModel.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@app.delete("/customers/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = db.query(CustomerModel).filter(
        CustomerModel.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    db.delete(customer)
    db.commit()

    return {"message": "Customer deleted"}

@app.post("/orders")
def create_order(
    order: Order,
    db: Session = Depends(get_db)
):
    product = db.query(ProductModel).filter(
        ProductModel.id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    customer = db.query(CustomerModel).filter(
        CustomerModel.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    if product.quantity < order.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    total = product.price * order.quantity

    product.quantity -= order.quantity

    new_order = OrderModel(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_amount=total
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


@app.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(OrderModel).all()


@app.get("/orders/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(OrderModel).filter(
        OrderModel.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


@app.delete("/orders/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(OrderModel).filter(
        OrderModel.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {"message": "Order deleted"}

@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):
    total_products = db.query(ProductModel).count()

    total_customers = db.query(CustomerModel).count()

    total_orders = db.query(OrderModel).count()

    low_stock_products = db.query(ProductModel).filter(
        ProductModel.quantity < 5
    ).count()

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": low_stock_products
    }