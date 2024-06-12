from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
import stripe
import ipdb

SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

STRIPE_API_KEY = "sk_test_tR3PYbcVNZZ796tH88S4VQ2u"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

stripe.api_key = STRIPE_API_KEY

def generate_payment_link(amount: float, appointment_id: int) -> str:
    # Convert amount to cents
    stripe_amount = int(amount * 100)
    
    # Create a product for the appointment
    product = stripe.Product.create(name=f"Appointment Number: {appointment_id}")
    
    # Create a price object for the product
    price = stripe.Price.create(
        currency="usd",
        unit_amount=stripe_amount,
        product=product.id
    )
    
    # Create a payment link for the price
    link = stripe.PaymentLink.create(
        line_items=[{"price": price.id, "quantity": 1}],
        after_completion={"type": "redirect", "redirect": {"url": f"http://localhost:5173/payment_success/{appointment_id}"}}
    )
    
    return link

def get_password_hash(password: str):
    return pwd_context.hash(password)


def create_access_token(*, data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt