#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db, app
from models import User, Property, Unit, Expense, Tenant

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        print("Deleting all records...")
        User.query.delete()
        Property.query.delete()
        Unit.query.delete()
        Expense.query.delete()
        Tenant.query.delete()

        print('Creating users...')
        users = []

        for i in range(3):

            user = User(
                name = fake.name(),
                email = fake.email(),
                type = 'owner'
            )

            user.password_hash = user.name + 'p'
            print("Committing user data...")
            db.session.add(user)
            db.session.commit()

            users.append(user)
            
        
        print('Creating properties...')
        properties = []
        p1 = Property(nickname='Ballard', address=fake.address(), owner_id=1)
        properties.append(p1)
        p2 = Property(nickname='Phinny Ridge', address=fake.address(), owner_id=1)
        properties.append(p2)

        print("Committing property data...")
        db.session.add_all(properties)
        db.session.commit()







