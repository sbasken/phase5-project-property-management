from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-created_at', '-updated_at', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    type = db.Column(db.String, default='owner')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    properties = db.relationship(
        'Property', backref='user',
        foreign_keys='Property.owner_id',
        cascade='all, delete-orphan')

    agents_properties = db.relationship(
        'Property', backref='agent',
        foreign_keys='Property.agent_id',
        cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def ___repr__(self):
        return f'<User {self.id} * Name: {self.name}, Type: {self.type}>'

class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    image_url = db.Column(db.String, default='https://media.gettyimages.com/id/1080313282/video/smart-home-system-line-icon-animation-with-alpha.jpg?s=640x640&k=20&c=OXx_Fk5Z3v46ymrbW8e52mE2hoJ7v2G2V6lhDSMo1zQ=')
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    units = db.relationship('Unit', backref='property')

    def ___repr__(self):
        return f'<Property {self.id} * Name: {self.name}, Type: {self.type}>'

class Unit(db.Model, SerializerMixin):
    __tablename__ = 'units'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    unit_number = db.Column(db.String, nullable=False)
    owner_occupied = db.Column(db.Boolean, default=False)
    vacant = db.Column(db.Boolean, default=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    expenses = db.relationship('Expense', backref='unit', cascade='all, delete-orphan')
    leases = db.relationship('Lease', backref='unit', cascade='all, delete-orphan')

    def ___repr__(self):
        return f'<Unit {self.id} * Unit: {self.unit_number}, Owner_Occupied: {self.owner_occupied}, Vacant: {self.vacant}, Property ID: {self.property_id}>'

class Expense(db.Model, SerializerMixin):
    __tablename__ = 'expenses'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def ___repr__(self):
        return f'<Expense {self.id} * Date: {self.date}, Type: {self.type}, Amount: {self.amount}, Unit ID: {self.unit_id}>'

class Tenant(db.Model, SerializerMixin):
    __tablename__ = 'tenants'

    serialize_rules = ('-created_at', '-updated_at', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    leases = db.relationship('Lease', backref='tenant', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def ___repr__(self):
        return f'<Tenant {self.id} * Name: {self.name}>'


class Lease(db.Model, SerializerMixin):
    __tablename__ = 'leases'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.String)
    rent = db.Column(db.Integer)
    deposit = db.Column(db.Integer)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'), nullable=False)
    tenent_id = db.Column(db.Integer, db.ForeignKey('tenants.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def ___repr__(self):
        return f'<Lease {self.id} * Date: {self.date}, Type: {self.type}, Amount: {self.amount}, Unit ID: {self.unit_id}>'
