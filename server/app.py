#!/usr/bin/env python3

from flask import jsonify, make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime


from config import app, api, db
from models import User, Property, Unit, Expense, Tenant, Lease

@app.before_request
def is_Logged_in():
    user_id = session.get('user_id')
    ok_list = [
        'signup',
        'login',
        'logout',
        'check_session'
    ]
    if (not user_id) and (request.endpoint not in ok_list):
        return {'message': 'Please login or signup first'}, 401

class Home(Resource):
    
    def get(self):

        return f'<h1>Welcome to our API!<h1>'
    
class Signup(Resource):

    def post(self):
        data = request.get_json()

        try:
            new_user = User(
                name = data['name'],
                email = data['email'],
                type = data['type']
            )
            new_user.password_hash = data['password']
            db.sessoin.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except:
            return make_response({'error': 'Unprocessable Entity'}, 422)
        
class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        current_user = User.query.filter(User.id == user_id).first()
        return make_response(current_user.to_dict(), 200)

class Login(Resource):

    def post(self):
        data = request.get_json()

        check_user = User.query.filter(User.username == data['username']).first()
        if not check_user:
            return {'error': 'Unauthorized'}, 401
        check_user.authenticate(data['password'])
        session['user_id'] = check_user.id
        return make_response(check_user.to_dict(), 200)
    
class Logout(Resource):

    def delete(self):

        session['user_id'] = None
        return {}, 204

    
class Properties(Resource):

    def get(self):

        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':
            properties = [ p.to_dict(rules=('units',)) for p in Property.query.filter(Property.owner_id == found_user.id).all() ]
            return make_response(properties, 200)
        if found_user.type == 'agent':
            properties = [ p.to_dict() for p in Property.query.filter(Property.agent_id == found_user.id).all() ]
            return make_response(properties, 200)
    
    def post(self):

        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':
            data = request.get_json()

            new_property = Property(
                nickname = data['nickname'],
                address = data['address'],
                latitude = data['latitude'],
                longitude = data['longitude'],
                image_url = data['image_url'],
                owner_id = data['owner_id'],
                agent_id = data['agent_id']
            )
            db.session.add(new_property)
            db.session.commit()

            return make_response(new_property.to_dict(), 201)
        
class PropertyByID(Resource):

    def get(self, id):
        found_property = Property.query.filter(Property.id == id).first()
        return make_response(found_property.to_dict(rules=('units','units.expenses', 'units.leases')), 200)

    def patch(self, id):
        data = request.get_json()
        to_update = Property.query.filter(Property.id == id).first()
        if to_update:
            for key in data:
                print(key)
                setattr(to_update, key, data[key])
            db.session.add(to_update)
            db.session.commit()
            return make_response(to_update.to_dict(), 200)
        else:
            return {'error': 'Property not found'}, 404

    def delete(self, id):

        to_delete = Property.query.filter(Property.id == id).first()
        db.session.delete(to_delete)
        db.session.commit()

        return make_response({'message': 'Property successfully deleted'}, 204)
    
class Units(Resource):

    def post(self):
        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':
            data = request.get_json()

            new_unit = Unit(
                unit_number = data['unit_number'],
                owner_occupied = data['owner_occupied'],
                vacant = data['vacant'],
                property_id = data['property_id']
            )
            db.session.add(new_unit)
            db.session.commit()
            return make_response(new_unit.to_dict(), 201)
        return {'error': 'Unauthorized'}, 401
    
class UnitByID(Resource):

    def get(self, id):
        found_unit = Unit.query.filter(Unit.id == id).first()
        return make_response(found_unit.to_dict(), 200)


    def patch(self, id):
        data = request.get_json()
        to_update = Unit.query.filter(Unit.id == id).first()
        if to_update:
            for key in data:
                setattr(to_update, key, data[key])
            db.session.add(to_update)
            db.session.commit()
            return make_response(to_update.to_dict(), 200)
        else:
            return {'error': 'Unit not found'}, 404

    def delete(self, id):

        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':

            to_delete = Unit.query.filter(Unit.id == id).first()
            db.session.delete(to_delete)
            db.session.commit()

            return make_response({'message': 'Unit successfully deleted'}, 204)
        return {'error': 'Unauthorized'}, 401
    
class UnitsByProperty(Resource):

    def get(self, property_id):
        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':
            found_units = [ u.to_dict() for u in Unit.query.filter(Unit.property_id == property_id).all() ]
            return make_response(found_units, 200)
    
class Expenses(Resource):

    def get(self):
        user_id = session.get('user_id')
        found_user = User.query.filter_by(id=user_id).first()
        if found_user.type == 'owner':
            expenses = Expense.query.join(Property).filter(Property.owner_id == user_id).order_by(Expense.date).all()
            expense_list = [exp.to_dict() for exp in expenses]
            return expense_list

    def post(self):
        data = request.get_json()

        date_str = data['date']
        date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S.%fZ')

        new_expense = Expense(
            date=date_obj,
            expense_type = data['expense_type'],
            amount = data['amount'],
            property_id = data['property_id'],
            unit_id = data['unit_id']
        )
        db.session.add(new_expense)
        db.session.commit()
        return make_response(new_expense.to_dict(), 201)

class ExpenseByID(Resource):

    def get(self, id):
        found_expense = Expense.query.filter(Expense.id == id).first()
        return make_response(found_expense.to_dict(), 200)

    def patch(self, id):
        data = request.get_json()
        to_update = Expense.query.filter(Expense.id == id).first()
        if to_update:
            if 'date' in data:
                date_str = data['date']
                date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S.%fZ')
                data['date'] = date_obj
            for key in data:
                setattr(to_update, key, data[key])
            db.session.add(to_update)
            db.session.commit()
            return make_response(to_update.to_dict(), 200)
        else:
            return {'error': 'Expense not found'}, 404

    
    def delete(self, id):

        to_delete = Expense.query.filter(Expense.id == id).first()
        db.session.delete(to_delete)
        db.session.commit()

        return make_response({'message': 'Expense successfully deleted'}, 204)

class Tenants(Resource):
    
    def post(self):
        data = request.get_json()

        new_tenant = Tenant(
            name = data['name'],
            phone_number = data['phone_number'],
            email = data['amount'],
        )
        db.session.add(new_tenant)
        db.session.commit()
        return make_response(new_tenant.to_dict(), 201)

class TenantByID(Resource):

    def get(self, id):
        found_tenant = Tenant.query.filter(Tenant.id == id).first()
        return make_response(found_tenant.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        to_update = Tenant.query.filter(Tenant.id == id).first()
        if to_update:
            for key in data:
                setattr(to_update, key, data[key])
                db.session.add(to_update)
                db.session.commit()
        else:
            return {'error': 'Tenant not found'}, 404
    
    def delete(self, id):

        to_delete = Tenant.query.filter(Tenant.id == id).first()
        db.session.delete(to_delete)
        db.session.commit()

        return make_response({'message': 'Tenant successfully deleted'}, 204)
    

class Leases(Resource):

    def get(self):
        user_id = session.get('user_id')
        found_user = User.query.filter_by(id=user_id).first()
        if found_user.type == 'owner':
            leases_list = [l.to_dict() for l in Lease.query.all()]
            return make_response(leases_list, 200)

    def post(self):
        data = request.get_json()

        start_date_str = data['start_date']
        start_date_obj = datetime.strptime(start_date_str, '%Y-%m-%dT%H:%M:%S.%fZ')
        end_date_str = data['end_date']
        end_date_obj = datetime.strptime(end_date_str, '%Y-%m-%dT%H:%M:%S.%fZ')

        new_lease = Lease(
            start_date = start_date_obj,
            end_date = end_date_obj,
            rent = data['rent'],
            deposit = data['deposit'],
            unit_id = data['unit_id'],
            tenant_id = data['tenant_id']
        )
        db.session.add(new_lease)
        db.session.commit()
        return make_response(new_lease.to_dict(), 201)

class LeaseByID(Resource):

    def patch(self, id):
        data = request.get_json()
        to_update = Lease.query.filter(Lease.id == id).first()
        if to_update:
            for key in data:
                setattr(to_update, key, data[key])
                db.session.add(to_update)
                db.session.commit()
        else:
            return {'error': 'Tenant not found'}, 404
    
    def delete(self, id):

        to_delete = Lease.query.filter(Lease.id == id).first()
        db.session.delete(to_delete)
        db.session.commit()

        return make_response({'message': 'Lease successfully deleted'}, 204)


api.add_resource(Home, '/')
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Properties, '/properties', endpoint='properties')
api.add_resource(PropertyByID, '/properties/<int:id>', endpoint='properties/<int:id>')
api.add_resource(UnitsByProperty, '/properties/<int:property_id>/units', endpoint='properties/<int:property_id>/units')
api.add_resource(Units, '/units')
api.add_resource(UnitByID, '/units/<int:id>', endpoint='units/<int:id>')
api.add_resource(Expenses, '/expenses')
api.add_resource(ExpenseByID, '/expenses/<int:id>')
api.add_resource(Tenants, '/tenants')
api.add_resource(TenantByID, '/tenants/<int:id>')
api.add_resource(Leases, '/leases', endpoint='leases')
api.add_resource(LeaseByID, '/leases/<int:id>', endpoint='leases/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
