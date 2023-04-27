from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt,db


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-transactions.user', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    # _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    # @hybrid_property
    # def password_hash(self):
    #     raise Exception('Password hashes may not be viewed.')

    # @password_hash.setter
    # def password_hash(self, password):
    #     password_hash = bcrypt.generate_password_hash(
    #         password.encode('utf-8')) 
    #     self._password_hash = password_hash.decode('utf-8')

    # def authenticate(self, password):
    #     return bcrypt.check_password_hash(
    #         self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, username):
        users = User.query.all()
        usernames = [user.username for user in users]
        if not username:
            raise ValueError("User must have a username")
        elif username in usernames:
            raise ValueError("User Username must be unique")
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError("User must have a email")
        if '@' not in email:
            raise ValueError("User failed simple email validation")
        return email

    def __repr__(self):
        return f'User ID: {self.id}, Username: {self.username}, Email: {self.email}, Address: {self.shipping_address}'


