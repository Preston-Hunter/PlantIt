from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt,db


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    # _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean)
    # created_at = db.Column(db.DateTime, server_default=db.func.now())
    # updated_at = db.Column(db.DateTime, onupdate=db.func.now())


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
        return f'User ID: {self.id}, Username: {self.username}, Email: {self.email}'


class Plant(db.Model, SerializerMixin):
    __tablename__="plants"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    scientific_name = db.Column(db.String)
    rank = db.Column(db.String)
    family = db.Column(db.String)
    genus = db.Column(db.String)
    image = db.Column(db.String)
    # duration = db.Column(db.String)
    # edible_part = db.Column(db.String)
    # edible = db.Column(db.String)
    # vegetable = db.Column(db.String)
    # observations = db.Column(db.String)
    # common_names = db.Column(db.String)
    ph_max = db.Column(db.Integer)
    ph_min = db.Column(db.Integer)
    salinity = db.Column(db.Integer)
    light = db.Column(db.Integer)
    atmo_humidity = db.Column(db.Integer)
    flower_color = db.Column(db.String)
    api_link = db.Column(db.String)
    

    def __repr__(self):
        return str(self.id) + self.scientific_name
    

class Comment(db.Model, SerializerMixin):
    __tablename__="comments"
    id = db.Column(db.Integer, primary_key=True)
    plant_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    contents = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class UserPlant(db.Model, SerializerMixin):
    __tablename__= "userplants"
    id = db.Column(db.Integer, primary_key=True)
    plant_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    liked = db.Column(db.Integer)
    planted = db.Column(db.Integer)


