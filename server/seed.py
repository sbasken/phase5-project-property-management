#!/usr/bin/env python3
from random import randint, choice as rc

from datetime import date, timedelta
from faker import Faker
import random

# Local imports
from app import app
from config import db, app
from models import User, Property, Unit, Expense, Tenant, Lease

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        print("Deleting all records...")
        Tenant.query.delete()
        Lease.query.delete()
        Expense.query.delete()
        Unit.query.delete()
        Property.query.delete()
        User.query.delete()

        print('Creating owners...')
        users = []

        for i in range(3):

            user = User(
                username = fake.user_name(),
                email = fake.email(),
                type = 'owner'
            )

            user.password_hash = user.username + 'pw'
            print("Committing owner data...")
            db.session.add(user)
            db.session.commit()

            users.append(user)

        print('Adding an agent...')

        user = User(
            username = fake.user_name(), 
            email = fake.email(), 
            type = 'agent'
        )

        user.password_hash = user.username + 'pw'
        print("Committing agent data...")
        db.session.add(user)
        db.session.commit()

        users.append(user)
            
        
        print('Creating properties...')
        properties = []
        property_ids = []
        p1 = Property(nickname='Ballard', address=fake.address(), owner_id=5)
        properties.append(p1)
        property_ids.append(p1.id)
        p2 = Property(nickname='Phinny Ridge', address=fake.address(), owner_id=5)
        properties.append(p2)
        property_ids.append(p2.id)


        print("Committing property data...")
        db.session.add_all(properties)
        db.session.commit()

        print('Creating units...')
        units = []
        u1 = Unit(unit_number="A1", property_id=7)
        units.append(u1)
        u2 = Unit(unit_number="A2", property_id=7)
        units.append(u2)

        print("Committing unit data...")
        db.session.add_all(units)
        db.session.commit()

        print('Creating expenses...')
        expenses = []
        expense_type = ['maintenance', 'repairs', 'management fees', 'insurance', 'interest','mortgage' ]

        for i in range(5):
            expense = Expense(
                date = fake.date_this_year(),
                expense_type = random.choice(expense_type),
                amount = random.randint(-1000, 0),
                unit_id = random.randint(3, 4),
                property_id = 7
            )
            print("Committing expense data...")
            db.session.add(expense)
            db.session.commit()
            expenses.append(expense)

        print('Creating tenant data...')
        for i in range(2):
            tenant = Tenant(
                name = fake.name(),
                username = fake.user_name(),
                email = fake.email(),
                phone_number = f"{random.randint(100, 999)} - {random.randint(100, 999)} - {random.randint(1000, 9999)}"
            )
            tenant.password_hash = tenant.name + 'pw'
            print("Committing tenant data...")
            db.session.add(tenant)
            db.session.commit()

        print('Creating lease data...')
        for i in range(2):
            date1 = fake.date_this_year()
            date2 = date1 + timedelta(days=364)
            lease = Lease(
                start_date = date1,
                end_date = date2,
                rent = random.randint(1500, 3000),
                deposit = random.randint(1500, 3000),
                unit_id = i + 3,
                tenant_id = i + 6
            )
            print("Committing lease data...")
            db.session.add(lease)
            db.session.commit()

    print('Seeding complete!!')









