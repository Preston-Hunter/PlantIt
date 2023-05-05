#!/usr/bin/env python3

import os 
from flask import jsonify, make_response, request, session, g, current_app, redirect, abort
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,db,api
from models import User, Plant, UserPlant, Comment
from flask_cors import CORS
from random import choice as rc
# from flask_session import Session
# Session(app)
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


# class Signup(Resource):
#     def post(self):
#         username = request.get_json()['username']  
#         password = request.get_json()['password']
#         email = request.get_json()['email']
#         shipping_address = request.get_json()['shipping_address']
#         if username and password:
#             new_user = User(username=username, email=email, shipping_address=shipping_address, account_balance=5)
#             new_user.password_hash = password
#             try:
#                 db.session.add(new_user)
#                 db.session.commit()
#                 session['user_id'] = new_user.id
#                 return new_user.to_dict(), 201
#             except IntegrityError:
#                 return {'error': '422 Unprocessable Entity'}, 422
#         return {'error': '422 Unprocessable Entity'}, 422
# api.add_resource(Signup, '/signup', endpoint='signup')

# class CheckSession(Resource):
#     def get(self):
#         print("app.py Line 64 - CheckSession")
#         print(session)
#         if session.get('user_id'):
#             print(session['user_id'])
#             user = User.query.filter(User.id == session.get('user_id')).first()
#             return user.to_dict(), 200 
#         return {'message': '401 Unauthorized'}, 401 
# api.add_resource(CheckSession, '/check_session', endpoint='check_session')

# class Login(Resource):
#     def post(self):
#         username = request.get_json()['username']
#         password = request.get_json()['password']
#         user = User.query.filter(User.username == username).first()
#         if user:
#             if user.authenticate(password):
#                 session['user_id'] = user.id
#                 return user.to_dict(), 200 
#         return {'error': '401 Unauthorized'}, 401
# api.add_resource(Login, '/login', endpoint='login')

# class Logout(Resource):
#     def delete(self):               ## Different from Deleting a User. 
#         # if session.get('user_id'):
#         session['user_id'] = None
#         return {'message': '204: No Content'}, 204
#         # return {'error': '401 Unauthorized'}, 401
# api.add_resource(Logout, '/logout')

#     ###########################################
#     ##        GET, POST, PATCH, DELETE       ##
#     ###########################################

# ##########
# ## USER ##
# ##########

cors = CORS(app)


class AllUsers(Resource):
    def get(self):
        users = User.query.all()
        users_list = []
        for u in users:
            users_list.append(u.to_dict())
        if len(users_list) > 0:
            return make_response(jsonify(users_list), 200)
        return make_response({"error":"no plants to query" }, 500)
    def post(self):
        data=request.get_json()
        user = User()
        try:
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)
        except:
            return make_response({"error":"invalid attributes"}, 400)

api.add_resource(AllUsers, '/users')

class OneUser(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user != None:
            user_dict = user.to_dict()
            response = make_response(jsonify(user_dict), 200)
            return response
        
        return make_response({"error": "User Record not found"}, 404)
        

    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if user != None:
            data=request.get_json() 
            try:
                for attr in data:
                    if attr != "id":
                        setattr(user, attr, data[attr])
                db.session.add(user)
                db.session.commit()
                return make_response(user.to_dict(), 201)

            except:
                return make_response({"error":"invalid attribute"}, 400)
        return make_response({"error":"invalid id"}, 400)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if user != None:
            db.session.delete(user)
            db.session.commit()
            user_dict = {"message": "User Record successfully deleted"}
            return make_response(user_dict, 200)
        return make_response(jsonify({"error":"invalid id"}), 400)
    
api.add_resource(OneUser, '/users/<int:id>')


class AllPlants(Resource):
    def get(self):
        plants = Plant.query.all()
        plants_list = []
        for p in plants:
            plants_list.append(p.to_dict())
        if len(plants_list) > 0:
            return make_response(jsonify(plants_list), 200)
        return make_response({"error":"no plants to query" }, 500)
    def post(self):
        data=request.get_json()
        plant = Plant()
        try:
            for attr in data:
                setattr(plant, attr, data[attr])
            db.session.add(plant)
            db.session.commit()
            return make_response(plant.to_dict(), 201)
        except:
            return make_response({"error":"invalid attributes"}, 400)
api.add_resource(AllPlants, "/plants")


class OnePlant(Resource):
    def get(self, id):
        plant = Plant.query.filter(Plant.id == id).first()
        if plant != None:
            plant_dict = plant.to_dict()
            response = make_response(jsonify(plant_dict), 200)
            return response
        return make_response(jsonify({"error":"invalid id"}), 404)

    def patch(self, id):
        plant = Plant.query.filter(Plant.id == id).first()
        if plant != None:
            data=request.get_json() 
            try:
                for attr in data:
                    if attr != "id":
                        setattr(plant, attr, data[attr])
                db.session.add(plant)
                db.session.commit()
                return make_response(plant.to_dict(), 201)

            except:
                return make_response({"error":"invalid attribute"}, 400)
        return make_response({"error":"invalid id"}, 400)

    def delete(self, id):
        plant = Plant.query.filter(Plant.id == id).first()
        if plant != None:
            db.session.delete(plant)
            db.session.commit()
            plant_dict = {"message": "User Record successfully deleted"}
            return make_response(plant_dict, 200)
        return make_response(jsonify({"error":"invalid id"}), 400)
        
api.add_resource(OnePlant, "/plants/<int:id>")

class RandomPlant(Resource):
    def get(self):
        plants = Plant.query.all()
        if plants.length != 0:
            print(len(plants))
            # plant = rc(plants)
            plant = plants[0]
            return make_response(plant.to_dict(), 200)
        return make_response({"error":"no plant entries"}, 404)

api.add_resource(RandomPlant, "/randomplant")

class AllComments(Resource):
    def get(self):
        comments = Comment.query.all()
        comments_list = []
        for c in comments:
            comments_list.append(c.to_dict())
        if len(comments_list) > 0:
            return make_response(jsonify(comments_list), 200)
        return make_response({"error":"no comments to query" }, 500)
    def post(self):
        data=request.get_json()
        comment = Comment()
        try:
            for attr in data:
                setattr(comment, attr, data[attr])
            db.session.add(comment)
            db.session.commit()
            return make_response(comment.to_dict(), 201)
        except:
            return make_response({"error":"invalid attributes"}, 400)
api.add_resource(AllComments, "/comments")
      


class OneComment(Resource):
    def get(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        if comment != None:
            comment_dict = comment.to_dict()
            response = make_response(jsonify(comment_dict), 200)
            return response
        return make_response(jsonify({"error": "User Record not found"}), 404)
        

    def patch(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        if comment != None:
            data=request.get_json() 
            try:
                for attr in data:
                    if attr != "id":
                        setattr(comment, attr, data[attr])
                db.session.add(comment)
                db.session.commit()
                return make_response(comment.to_dict(), 201)

            except:
                return make_response({"error":"invalid attribute"}, 400)
        return make_response({"error":"invalid id"}, 400)

    def delete(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        if comment != None:
            db.session.delete(comment)
            db.session.commit()
            comment_dict = {"message": "User Record successfully deleted"}
            return make_response(comment_dict, 200)
        return make_response(jsonify({"error":"invalid id"}), 400)
    
api.add_resource(OneComment, "/comments/<int:id>")

class AllCommentsForPlantId(Resource):
    def get(self, pid):
        comments = Comment.query.filter(Comment.plant_id == pid).all()
        comments_list = []
        for c in comments:
            comments_list.append(c.to_dict())
        if len(comments_list) > 0:
            return make_response(jsonify(comments_list), 200)
        return make_response({"error":f"no comments to query for this plant {pid}" }, 500)
api.add_resource(AllCommentsForPlantId, "/commentsforplant/<int:pid>")


class AllUserPlants(Resource):
    def get(self):
        userplants = UserPlant.query.all()
        userplants_list = []
        for p in userplants:
            userplants_list.append(p.to_dict())
        if len(userplants_list) > 0:
            return make_response(jsonify(userplants_list), 200)
        return make_response({"error":"no userplants to query" }, 500)
    def post(self):
        data=request.get_json()
        userplant = UserPlant()
        try:
            for attr in data:
                setattr(userplant, attr, data[attr])
            db.session.add(userplant)
            db.session.commit()
            return make_response(userplant.to_dict(), 201)
        except:
            return make_response({"error":"invalid attributes"}, 400)
api.add_resource(AllUserPlants, "/userplants")



class OneUserPlant(Resource):
    def get(self, id):
        userplant = UserPlant.query.filter(UserPlant.id == id).first()
        if userplant != None:
            userplant_dict = userplant.to_dict()
            response = make_response(jsonify(userplant_dict), 200)
            return response
        return make_response(jsonify({"error":"invalid id"}), 404)

    def patch(self, id):
        userplant = UserPlant.query.filter(UserPlant.id == id).first()
        if userplant != None:
            data=request.get_json() 
            try:
                for attr in data:
                    if attr != "id":
                        setattr(userplant, attr, data[attr])
                db.session.add(userplant)
                db.session.commit()
                return make_response(userplant.to_dict(), 201)

            except:
                return make_response({"error":"invalid attribute"}, 400)
        return make_response({"error":"invalid id"}, 400)

    def delete(self, id):
        userplant = UserPlant.query.filter(UserPlant.id == id).first()
        if userplant != None:
            db.session.delete(userplant)
            db.session.commit()
            userplant_dict = {"message": "User Record successfully deleted"}
            return make_response(userplant_dict, 200)
        return make_response(jsonify({"error":"invalid id"}), 400)

api.add_resource(OneUserPlant, "/userplants/<int:id>")

class Signup(Resource):
    def post(self):
        pass

class CheckSession(Resource):
    def get(self):
        # print(session.get('username').first())
        print("sessionid: ",session, session.get('username'))
        if(session.get('username')):
            user = User.query.filter(User.username == session.get('username')).first()
            if user:
                return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Logout(Resource):
    def delete(self):
        session['username'] = None
        return {}, 204
api.add_resource(Logout, '/api/logout', endpoint='logout')  


class ClearSession(Resource):
    def delete(self):    
        # session[''] = None
        session['username'] = None
        return {}, 204
api.add_resource(ClearSession, '/clear', endpoint='clear')  
 
class Login(Resource):
    def get(self):
        pass
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['username'] = user.username
                print(session.get("username"))
                return user.to_dict(), 200 
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/api/login', endpoint='login')

# @app.before_request
# def setup():
#     session.permanent = True

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
    