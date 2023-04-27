#!/usr/bin/env python3

from flask import jsonify, make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


from config import app, api, db
from models import User, Property, Unit, Expense, Tenant

@app.before_request
def is_Logged_in():
    ok_list = [
        'signup',
        'login',
        'logout',
    ]
    if not session.get('user_id') and request.endpoint not in ok_list:
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

        check_user = User.query.filter(User.email == data['email']).first()
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
            properties = [ p.to_dict() for p in Property.query.filter(Property.owner_id == session.get('user_id')).all() ]
            return make_response(properties, 200)
        elif found_user.type == 'agent':
            properties = [ p.to_dict() for p in Property.query.filter(Property.agent_id == session.get('user_id')).all() ]
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

    def patch(self, id):
        data = request.get_json()
        to_update = Property.query.filter(Property.id == id).first()
        if to_update:
            for key in data:
                setattr(to_update, key, data[key])
                db.session.add(to_update)
                db.session.commit()
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

    def patch(self, id):
        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':
            data = request.get_json()
            to_update = Unit.query.filter(Unit.id == id).first()
            if to_update:
                for key in data:
                    setattr(to_update, key, data[key])
                    db.session.add(to_update)
                    db.session.commit()
            else:
                return {'error': 'Unit not found'}, 404
        return {'error': 'Unauthorized'}, 401

    def delete(self, id):

        found_user = User.query.filter(User.id == session.get('user_id')).first()
        if found_user.type == 'owner':

            to_delete = Unit.query.filter(Unit.id == id).first()
            db.session.delete(to_delete)
            db.session.commit()

            return make_response({'message': 'Unit successfully deleted'}, 204)
        return {'error': 'Unauthorized'}, 401
    
class Expenses(Resource):

    def post(self):
        data = request.get_json()

        new_expense = Expense(
            date = data['date'],
            type = data['type'],
            amount = data['amount'],
            unit_id = data['unit_id']
        )
        db.session.add(new_expense)
        db.session.commit()
        return make_response(new_expense.to_dict(), 201)

class ExpenseByID(Resource):

    def patch(self, id):
        data = request.get_json()
        to_update = Expense.query.filter(Expense.id == id).first()
        if to_update:
            for key in data:
                setattr(to_update, key, data[key])
                db.session.add(to_update)
                db.session.commit()
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


api.add_resource(Home, '/')
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Properties, '/properties')
api.add_resource(Units, '/units')
api.add_resource(UnitByID, '/unit/<int:id>')
api.add_resource(Expenses, '/expenses')
api.add_resource(ExpenseByID, '/expense/<int:id>')
api.add_resource(Tenants, '/tenants')
api.add_resource(TenantByID, '/tenant/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
