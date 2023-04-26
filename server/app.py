#!/usr/bin/env python3

from flask import jsonify, make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


from config import app, api, db
from models import User, Property, Unit, Expense, Tenant

class Home(Resource):
    
    def get(self):

        return f'<h1>Welcome to our API!<h1>'
    
api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
