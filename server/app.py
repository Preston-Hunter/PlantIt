#!/usr/bin/env python3

import os 
from flask import jsonify, make_response, request, session, g, current_app, redirect, abort
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,db,api
from models import User, Item, Transaction, Vendor, VendorItem
from flask_cors import CORS
CORS(app)
    ###########################################
    ##                Home API               ##
    ###########################################

class Home(Resource):
    def get(self):
        andez_dict = '''
            <h1>"message": "Welcome to the Andez RESTful API"</h1>
        '''
        response = make_response(andez_dict, 200)
        return response
api.add_resource(Home, '/')

    ###########################################
    ##            Logging in/Out             ##
    ##   Session, Authenticating, Password   ##
    ###########################################

# @app.before_request
# def check_if_logged_in():
#     access_list = ['clear', 'signup', 'check_session', 'login', ]
#     if (request.endpoint) not in access_list and (not session.get('user_id')):   
#         return {'error': 'Unauthorized'}, 401

class ClearSession(Resource):       ## DEV Only. Don't want users to be able to clear their cookies. 
    def delete(self):    
        session['user_cart'] = None
        session['user_id'] = None
        return {}, 204
api.add_resource(ClearSession, '/clear', endpoint='clear')  

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']  
        password = request.get_json()['password']
        email = request.get_json()['email']
        shipping_address = request.get_json()['shipping_address']
        if username and password:
            new_user = User(username=username, email=email, shipping_address=shipping_address, account_balance=5)
            new_user.password_hash = password
            try:
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '422 Unprocessable Entity'}, 422
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):
        print("app.py Line 64 - CheckSession")
        print(session)
        if session.get('user_id'):
            print(session['user_id'])
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict(), 200 
        return {'message': '401 Unauthorized'}, 401 
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200 
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):               ## Different from Deleting a User. 
        # if session.get('user_id'):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
        # return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout')

    ###########################################
    ##        GET, POST, PATCH, DELETE       ##
    ###########################################

##########
## USER ##
##########

class Users(Resource):          
    def get(self):                  ## DEV Only. Don't want Users to be able to look up all other users
        user_dict_list = []
        for user in User.query.all(): 
            user_dict_list.append(user.to_dict())
        if user_dict_list != []:
            response = make_response(jsonify(user_dict_list), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query User data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):                 ## DEV Only. Users will use the Signup above for these functions
        data=request.get_json()
        try:                                            
            new_user = User(
                username=data['username'], 
                email=data['email'],
                shipping_address=data['shipping_address'], 
                account_balance=5
                )
            new_user.password_hash = data['password'],
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        user_dict = new_user.to_dict()
        response = make_response(jsonify(user_dict), 201) 
        return response 
    
api.add_resource(Users, '/users')

class UserById(Resource):           ## For Users to see their profiles
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            user_dict = user.to_dict()
            response = make_response(jsonify(user_dict, 200))
            return response
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def patch(self, id):            ## For Updating email, shipping_address, and account_balance (when people add funds, or make purchases)
        user = User.query.filter(User.id == id).first()
        if user:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(user, attr, data[attr]) 
                db.session.add(user) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            user_dict = user.to_dict()
            response = make_response(jsonify(user_dict), 201)
            return response 
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def delete(self, id):           ## To Delete a User (not just Logging them Out) [as well as any Transactions that relies on that user]  
        user = User.query.filter(User.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            user_dict = {"message": "User Record successfully deleted"}
            return make_response(user_dict, 200)
        return make_response(jsonify({"error": "User Record not found"}), 404)

api.add_resource(UserById, '/users/<int:id>')

##########
## ITEM ##
##########

class Items(Resource):
    def get(self):                  ## List of all items... should be useful to map through
        item_dict_list = []
        for item in Item.query.all():
            item_dict_list.append(item.to_dict())
        if item_dict_list != []:
            response = make_response(jsonify(item_dict_list), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Item data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):                 ## To add new items if we want to create an extra function
        data=request.get_json() 
        try:                                            
            new_item = Item(
                name=data['name'], 
                price=int(data['price']),
                category=data['category'],
                image=data['image'],
                description=data['description'], 
                )
            db.session.add(new_item)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        item_dict = new_item.to_dict()
        response = make_response(jsonify(item_dict), 201) 
        return response 

api.add_resource(Items, '/items')

class ItemById(Resource):           ## To pull an individual Item out for a detailed view
    def get(self, id): 
        item = Item.query.filter(Item.id == id).first()
        if item:
            item_dict = item.to_dict()
            response = make_response(jsonify(item_dict, 200))
            return response
        return make_response(jsonify({"error": "Item Record not found"}), 404)

    def patch(self, id):            ## To modify an Item. Price or Description maybe?
        item = Item.query.filter(Item.id == id).first()
        if item:
            data=request.get_json() 
            try:                                        
                for attr in data: 
                    setattr(item, attr, data[attr])
                db.session.add(item) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            item_dict = item.to_dict()
            response = make_response(jsonify(item_dict), 201)
            return response 
        return make_response(jsonify({"error": "Item Record not found"}), 404)

    def delete(self, id):           ## To delete an item (as well as any Transactions or VendorItems that rely on it)
        item = Item.query.filter(Item.id == id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
            item_dict = {"message": "Item Record successfully deleted"}
            return make_response(item_dict, 200)
        return make_response(jsonify({"error": "Item Record not found"}), 404)

api.add_resource(ItemById, '/items/<int:id>')

#################
## TRANSACTION ##
#################

class Transactions(Resource):
    def get(self):                  ## To get a list of all transactions. This, filtered by user_id and created_at will let us make a reciept of transaction group
        transaction_dict = []
        for transaction in Transaction.query.all():
            transaction_dict.append(transaction.to_dict())
        if transaction_dict != []:
            response = make_response(jsonify(transaction_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Transaction data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):                 ## To create new transactions
        data=request.get_json()
        try:                                            
            new_transaction = Transaction(
                refund=False, 
                user_id=int(data['user_id']),
                item_id=int(data['item_id']),
                )
            db.session.add(new_transaction)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        transaction_dict = new_transaction.to_dict()
        response = make_response(jsonify(transaction_dict), 201) 
        return response 

api.add_resource(Transactions, '/transactions')

class TransactionById(Resource):    ## To find a specific transaction. Not sure if/how we will use it yet
    def get(self, id):
        transaction = Transaction.query.filter(Transaction.id == id).first()
        if transaction:
            transaction_dict = transaction.to_dict()
            response = make_response(jsonify(transaction_dict, 200))
            return response
        return make_response(jsonify({"error": "Transaction Record not found"}), 404)

    def patch(self, id):            ## To update a specific transaction. Mostly updating the refund to true from false. 
        transaction = Transaction.query.filter(Transaction.id == id).first()
        if transaction:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(transaction, attr, data[attr])
                db.session.add(transaction)
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            transaction_dict = transaction.to_dict()
            response = make_response(jsonify(transaction_dict), 201)
            return response 
        return make_response(jsonify({"error": "Transaction Record not found"}), 404)

    def delete(self, id):           ## To delete a transaction (or deleted if a user or item it needs is deleted)
        transaction = Transaction.query.filter(Transaction.id == id).first()
        if transaction:
            db.session.delete(transaction)
            db.session.commit()
            transaction_dict = {"message": "Transaction Record successfully deleted"}
            return make_response(transaction_dict, 200)
        return make_response(jsonify({"error": "Transaction Record not found"}), 404)

api.add_resource(TransactionById, '/transactions/<int:id>')

############
## VENDOR ##
############

class Vendors(Resource):
    def get(self):                  ## To get a list of all Vendor - Unsure if/how we will use this
        vendor_dict_list = []
        for vendor in Vendor.query.all():
            vendor_dict_list.append(vendor.to_dict())
        if vendor_dict_list != []:
            response = make_response(jsonify(vendor_dict_list), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Vendor data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):                 ## To add a new Vendor if we want to add extra funtionality
        data=request.get_json()
        try:                                            
            new_vendor = Vendor(
                vendor_name=data['vendor_name'],
                vendor_email=data['vendor_email'],
                vendor_address=data['vendor_address'],
                vendor_account_balance=int(data['vendor_account_balance']),
                )
            db.session.add(new_vendor)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        vendor_dict = new_vendor.to_dict()
        response = make_response(jsonify(vendor_dict), 201) 
        return response 

api.add_resource(Vendors, '/vendors')

class VendorById(Resource):
    def get(self, id):              ## To find a specific Vendor - Maybe to let users sort/filter by vendor
        vendor = Vendor.query.filter(Vendor.id == id).first()
        if vendor:
            vendor_dict = vendor.to_dict()
            response = make_response(jsonify(vendor_dict, 200))
            return response
        return make_response(jsonify({"error": "Vendor Record not found"}), 404)

    def patch(self, id):            ## To modify Vendor info - name, email, address, account balance (especially if we decide to have accounts add or subtract when users buy things) 
        vendor = Vendor.query.filter(Vendor.id == id).first()
        if vendor:
            data=request.get_json()
            try:                                        
                for attr in data:
                    setattr(vendor, attr, data[attr])
                db.session.add(vendor)
                db.session.commit()
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            vendor_dict = vendor.to_dict()
            response = make_response(jsonify(vendor_dict), 201)
            return response 
        return make_response(jsonify({"error": "Vendor Record not found"}), 404)

    def delete(self, id):           ## To delete a Vendor (and any VendorItems it relies on)
        vendor = Vendor.query.filter(Vendor.id == id).first()
        if vendor:
            db.session.delete(vendor)
            db.session.commit()
            vendor_dict = {"message": "Vendor Record successfully deleted"}
            return make_response(vendor_dict, 200)
        return make_response(jsonify({"error": "Vendor Record not found"}), 404)

api.add_resource(VendorById, '/vendors/<int:id>')

#################
## VENDOR_ITEM ##
#################

class VendorItems(Resource):
    def get(self):                  ## Get a list of all item/vendor combinations
        vendoritem_dict_list = []
        for vendoritem in VendorItem.query.all():
            vendoritem_dict_list.append(vendoritem.to_dict())
        if vendoritem_dict_list != []:
            response = make_response(jsonify(vendoritem_dict_list), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query VendorItem data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):                 ## To connect when an existing vendor starts selling an existing item - Only used if we decide to add extra functionality
        data=request.get_json()
        try:                                            
            new_vendoritem = VendorItem(
                vendor_id=int(data['vendor_id']),
                item_id=int(data['item_id']),
                )
            db.session.add(new_vendoritem)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        vendoritem_dict = new_vendoritem.to_dict()
        response = make_response(jsonify(vendoritem_dict), 201) 
        return response 

api.add_resource(VendorItems, '/vendoritems')

class VendorItemById(Resource):
    def get(self, id):              ## To get a specific item sold by a specific vendor - mostly to let an item display the vendor selling it
        vendoritem = VendorItem.query.filter(VendorItem.id == id).first()
        if vendoritem:
            vendoritem_dict = vendoritem.to_dict()
            response = make_response(jsonify(vendoritem_dict, 200))
            return response
        return make_response(jsonify({"error": "VendorItem Record not found"}), 404)

    def patch(self, id):            ## To update an item with a new vendor, or vice versa - Don't know if/how we will use this
        vendoritem = VendorItem.query.filter(VendorItem.id == id).first()
        if vendoritem:
            data=request.get_json()
            try:                                        
                for attr in data:
                    setattr(vendoritem, attr, data[attr])
                db.session.add(vendoritem)
                db.session.commit()
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            vendoritem_dict = vendoritem.to_dict()
            response = make_response(jsonify(vendoritem_dict), 201)
            return response 
        return make_response(jsonify({"error": "VendorItem Record not found"}), 404)

    def delete(self, id):           ## To delete if a vendor no longer sells an item, or if the item or vendor is deleted
        vendoritem = VendorItem.query.filter(VendorItem.id == id).first()
        if vendoritem:
            db.session.delete(vendoritem)
            db.session.commit()
            vendoritem_dict = {"message": "VendorItem Record successfully deleted"}
            return make_response(vendoritem_dict, 200)
        return make_response(jsonify({"error": "VendorItem Record not found"}), 404)

api.add_resource(VendorItemById, '/vendoritems/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    