#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from faker.providers.internet import *
from app import app
from models import db, User, Plant, UserPlant, Comment
import requests
fake = Faker()

default_image = "https://imgix.bustle.com/mic/yvbchdnrdeckjsnxzgiam9pdhk6g2jsickeplgww84srjssynq0o0gfieo69vfkz.jpg?w=1200&h=630&q=70&fit=crop&crop=faces&fm=jpg"

def parsePlantEntry(plant):
    name = plant["common_name"]
    scientific_name = plant["scientific_name"]
    rank = plant["rank"]
    family = plant["family"]
    genus = plant["genus"]
    image = plant["image_url"]
    # 
    flower_color = ""
    if(image == None):
        image = "https://www.thespruce.com/thmb/wwG2JvRzLBzZzQ-o4TSeh0l2crs=/5121x3414/filters:fill(auto,1)/freshly-potted-plants-562613519-586ff9b25f9b584db36fb4de.jpg"
    if(name == None):
        name = ""
    if(scientific_name == None):
        name = ""
    if(genus == None):
        name = ""
    if(family == None):
        name = ""
    if(flower_color == None):
        flower_color = ""
    # duration = db.Column(db.String)
    # edible_part = db.Column(db.String)
    # edible = db.Column(db.String)
    # vegetable = db.Column(db.String)
    # observations = db.Column(db.String)
    # common_names = db.Column(db.String)
    # ph_max = db.Column(db.Integer)
    # ph_min = db.Column(db.Integer)
    # salinity = db.Column(db.Integer)
    # light = db.Column(db.Integer)
    # atmo_humidity = db.Column(db.Integer)
    # flower_color = db.Column(db.String)
    api_link = plant["links"]["self"]
    return Plant(name = name, scientific_name= scientific_name, rank = rank, family= family, genus=genus, image=image,
          api_link=api_link, flower_color = flower_color)



with app.app_context():
# def seed():
    # db.drop_all()
    print("Old data...")
    User.query.delete()
    Plant.query.delete()
    UserPlant.query.delete()
    Comment.query.delete()

##########################################################
    n = 5
    r = requests.get(f'https://trefle.io/api/v1/plants?token=eCFJvN25Qe_5-9jxpGL8r817XuvQo6KQPJGJAGwjw_Q&order[id]=asc&page={n}')
    k = r.json()['data']
    plants =[]
    for plant in k:
        # print(plant)
        plants.append(parsePlantEntry(plant))
        # print(plants)
    db.session.add_all(plants)
    db.session.commit()

    # db.session.commit()

#####################
    print("Creating Classname(User) data...")
    new_user_1 = User(username="Admin", email="Admin@flatironschool.com", admin=True, image=default_image, bio=fake.paragraph())
    new_user_1.password_hash = "Admin"

    new_user_2 = User(username="Matthew", email="Matthew@flatironschool.com", admin=False, image=default_image, bio=fake.paragraph())
    new_user_2.password_hash = "Matthew"

    new_user_3 = User(username="Preston", email="Preston@flatironschool.com", admin=False, image=default_image, bio=fake.paragraph())
    new_user_3.password_hash = "Preston"

    new_user_4 = User(username="Dylan", email="Dylan@flatironschool.com",  admin=False, image=default_image, bio=fake.paragraph())
    new_user_4.password_hash = "Dylan"

    new_user_5 = User(username="GreenGiant", email="Sarah@flatironschool.com", admin=False, image=default_image, bio=fake.paragraph())
    new_user_5.password_hash = "GreenGiant"

    users = [new_user_1,new_user_2,new_user_3,new_user_4,new_user_5]
    # usernames = ['Admin', 'Matthew', 'Preston', 'Nick', 'GreenGiant']
    # for n in range(20):
    #     username=fake.first_name()
    #     while username in usernames:
    #         username = fake.first_name()
    #     usernames.append(username)
    #     # password = username
    #     new_user = User(username=username, email=fake.email(), admin=False)
    #     users.append(new_user)
    print('Adding User objects...')
    db.session.add_all(users)
    db.session.commit()


##########################################################
    # while users[-1].id == None:
    #     x = 2
    print(users)
    userplants = []
    for user in users:
        up = UserPlant(plant_id = rc(plants).id, user_id = user.id, liked = True, planted = True)
        userplants.append(up)
    db.session.add_all(userplants)
    db.session.commit()



##########################################################
    comments = []
    for n in range(20):
        c = Comment(plant_id = rc(plants).id, user_id =rc(users).id , contents = fake.paragraph())
        print(fake.paragraph())
        comments.append(c)
    db.session.add_all(comments)


##########################################################



    print('Committing Seed...')
    print(users)
    db.session.commit()

    print("Seeding Complete!")

# seed()