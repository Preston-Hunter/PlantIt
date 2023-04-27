#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from faker.providers.internet import *
from app import app
from models import db, User, Item, Transaction, Vendor, VendorItem

fake = Faker()

with app.app_context():

    print("Deleting Classname(User) data...")
    User.query.delete()
    print("Deleting Classname(Item) data...") 
    Item.query.delete()
    print("Deleting Classname(Transaction) data...")
    Transaction.query.delete()
    print("Deleting Classname(Vendor) data...") 
    Vendor.query.delete()
    print("Deleting Classname(VendorItem) data...") 
    VendorItem.query.delete()

##########################################################

    print("Creating Classname(User) data...")
    new_user_1 = User(username="Admin", email="Admin@flatironschool.com", shipping_address="2228 Blake St. Denver, CO 80205", account_balance=5, admin=True)
    new_user_1.password_hash = "Admin"
    new_user_2 = User(username="Matthew", email="Matthew@flatironschool.com", shipping_address="2228 Blake St. Denver, CO 80205", account_balance=5, admin=False)
    new_user_2.password_hash = "Matthew" 
    new_user_3 = User(username="Preston", email="Preston@flatironschool.com", shipping_address="2282 Blake St. Denver, CO 80205", account_balance=5, admin=False)
    new_user_3.password_hash = "Preston"
    new_user_4 = User(username="Dylan", email="Dylan@flatironschool.com", shipping_address="2822 Blake St. Denver, CO 80205", account_balance=5, admin=False)
    new_user_4.password_hash = "Dylan"
    new_user_5 = User(username="Sarah", email="Sarah@flatironschool.com", shipping_address="8222 Blake St. Denver, CO 80205", account_balance=5, admin=False)
    new_user_5.password_hash = "Sarah"
    users = [new_user_1,new_user_2,new_user_3,new_user_4,new_user_5]
    usernames = ['Admin', 'Matthew', 'Preston', 'Dylan', 'Sarah']
    for n in range(20):
        username=fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)
        password = username
        new_user = User(username=username, email=fake.email(), shipping_address=fake.address(), account_balance=5, admin=False)
        new_user.password_hash = password
        users.append(new_user)
    print('Adding User objects...')
    db.session.add_all(users)

##########################################################

    # print("Creating Classname(Item) data...")
    # items = []
    # categories = [
    #     "Home & Kitchen", "Clothing, Shoes & Jewelry", "Electronics", 
    #     "Cell Phones & Accessories", "Tools & Home Improvement", 
    #     "Toys & Games", "Automotive", "Office Products", "Sports & Outdoors", 
    #     "Patio, Lawn & Garden", "Pet Supplies", "Health & Household", 
    #     "Industrial & Scientific", "Beauty & Personal Care", "Baby Products", 
    #     "Arts, Crafts & Sewing", "Appliances", "Video Games", "Handmade Products", 
    #     "Musical Instruments", "Grocery & Gourmet Food"
    #     ]
    # for n in range(100):
    #     item = Item(
    #         name=fake.word(),
    #         price=randint(5, 60),
    #         category=rc(categories),
    #         image=fake.image_url(width=200, height=200),
    #         description=fake.paragraph(nb_sentences=3),
    #     )
    #     items.append(item)
    # print('Adding Item objects...')
    # db.session.add_all(items)

##########################################################
    ## The NUT Version of Items ##

    print("Creating Classname(Item) data...")
    item_1 = Item(
        name="Andez Nuts (Original Flavor)",
        price=4,
        category="Featured Items",
        image="https://ih1.redbubble.net/image.853066046.9330/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u4.jpg",
        description="Andez Nuts are the biggest, best, sweetest, and saltiest nuts you will ever have in your mouth. All types of nuts can be Andez Nuts. It just comes down to personal preference.",
    )
    items = [item_1]
    treenutnames = ["almonds", "cashews", "hazelnuts", "macadamia nuts", "pecans", "pine nuts", "pistachios", "walnuts"]
    peanutnames = ["peanuts"]
    seednames = ["sunflower seeds", "pumpkin seeds"]
    coconutnames = ["coconut"]
    nutbutternames = ["coconut butter", "peanut butter", "almond butter", "cashew butter", "hazelnut butter", "macadamia nut butter", "pecan butter", "pine nut butter", "pistachio butter", "walnut butter"]
    nutoilnames = ["coconut oil", "peanut oil", "almond oil", "cashew oil", "hazelnut oil", "macadamia nut oil", "pecan oil", "pine nut oil", "pistachio oil", "walnut oil"]
    nutmilknames = ["coconut milk", "peanut milk", "almond milk", "cashew milk", "hazelnut milk", "macadamia nut milk", "pecan milk", "pine nut milk", "pistachio milk", "walnut milk"]
    nutflournames = ["coconut flour", "peanut flour", "almond flour", "cashew flour", "hazelnut flour", "macadamia nut flour", "pecan flour", "pine nut flour", "pistachio flour", "walnut flour"]
    categories = [
        "Tree nuts", "Peanuts", "Seeds", "Coconut", "Nut Butters", 
        "Nut Oils", "Nut Milk", "Nut Flours", "Featured Items", "Other"
        ]
    descriptions = [
        "Tree nuts: This category includes nuts that grow on trees, such as almonds, cashews, hazelnuts, macadamia nuts, pecans, pine nuts, pistachios, and walnuts.", 
        "Peanuts: Although peanuts are technically legumes, they are often referred to as nuts because of their similar nutritional profile and culinary uses.", 
        "Seeds: Some types of seeds are commonly referred to as nuts, such as sunflower seeds and pumpkin seeds.", 
        "Coconut: Although technically not a nut, coconut is often considered a tree nut because it has a similar nutritional profile and is used in similar ways in cooking and baking.",
        "Nut Butters: Nut butters, such as peanut butter, almond butter, and cashew butter, are made from ground nuts and are often used as spreads or in cooking and baking.",
        "Nut Oils: Some types of nuts, such as peanuts and walnuts, can be used to make oil that is used in cooking and baking.",
        "Nut Milk: Nut milk, such as almond milk and cashew milk, is made by blending nuts with water and straining out the pulp. Nut milk is often used as a dairy-free alternative to cow's milk.",
        "Nut Flours: Nut flours, such as almond flour and hazelnut flour, are made by grinding nuts into a fine powder. Nut flours are often used in gluten-free baking.",
        "Featured Items: Our Featured Items are something special. Either it has been with us a long time and was purposely chosen... or the seed file randomly selected it. In either case... it is still special.",
        f"{fake.sentence()}"
    ]
    for i in range(99):
        category = rc(categories)
        index = categories.index(category)
        if category == "Tree nuts":
            names = treenutnames
        elif category == "Peanuts":
            names = peanutnames
        elif category == "Seeds":
            names = seednames
        elif category == "Coconut":
            names = coconutnames
        elif category == "Nut Butters":
            names = nutbutternames
        elif category == "Nut Oils":
            names = nutoilnames
        elif category == "Nut Milk":
            names = nutmilknames
        elif category == "Nut Flours":
            names = nutflournames
        elif category == "Featured Items":
            names = ["Special Nuts"]
        else:
            names = ["not_a_nut"]

        name = rc(names)
        description = descriptions[index]

        item = Item(
            name=f"{fake.word()} {name}",
            price=randint(6, 60),
            category=category,
            image=fake.image_url(width=200, height=200),
            description=description,
        )
        items.append(item)
    print('Adding Item objects...')
    db.session.add_all(items)

##########################################################

    print("Creating Classname(Transaction) data...")
    transactions = []
    for user in users:
        for n in range(randint(1, 10)):
            transaction = Transaction(
                refund=False,
                user=user,
                item=rc(items))
            transactions.append(transaction)
    print('Adding Transaction objects...')
    db.session.add_all(transactions)

##########################################################

    print("Creating Classname(Vendor) data...")
    new_vendor_1 = Vendor(vendor_name="Vendor_Admin", vendor_email="Vendor_Admin@andeznutz.com", vendor_address="2228 Blake St. Denver, CO 80205", vendor_account_balance=500)
    new_vendor_2 = Vendor(vendor_name="Vendor_Yesenia", vendor_email="Vendor_Yesenia@andeznutz.com", vendor_address="2228 Blake St. Denver, CO 80205", vendor_account_balance=500)
    new_vendor_3 = Vendor(vendor_name="Vendor_Dakota", vendor_email="Vendor_Dakota@andeznutz.com", vendor_address="2282 Blake St. Denver, CO 80205", vendor_account_balance=500)
    new_vendor_4 = Vendor(vendor_name="Vendor_David", vendor_email="Vendor_David@andeznutz.com", vendor_address="2822 Blake St. Denver, CO 80205", vendor_account_balance=500)
    new_vendor_5 = Vendor(vendor_name="Vendor_Sam", vendor_email="Vendor_Sam@andeznutz.com", vendor_address="8222 Blake St. Denver, CO 80205", vendor_account_balance=500)
    vendors = [new_vendor_1,new_vendor_2,new_vendor_3,new_vendor_4,new_vendor_5]
    vendor_names = ['Vendor_Admin', 'Vendor_Yesenia', 'Vendor_Dakota', 'Vendor_David', 'Vendor_Sam']
    for n in range(20):
        vendor_name=f"Vendor_{fake.first_name()}"
        while vendor_name in vendor_names:
            vendor_name = f"Vendor_{fake.first_name()}"
        vendor_names.append(vendor_name)
        new_vendor = Vendor(vendor_name=vendor_name, vendor_email=fake.email(), vendor_address=fake.address(), vendor_account_balance=500)
        vendors.append(new_vendor)
    print('Adding Vendor objects...')
    db.session.add_all(vendors)

##########################################################

    print("Creating Classname(VendorItem) data...")
    vendoritems = []
    for vendor in vendors:
        for n in range(randint(1, 10)):
            vendoritem = VendorItem(
                vendor=vendor,
                item=rc(items))
            vendoritems.append(vendoritem)
    print('Adding VendorItem objects...')
    db.session.add_all(vendoritems)

##########################################################

    print("Just collating Data, as they say...")
    for item in items:
        transaction= rc(transactions)
        item.transaction = transaction
        transactions.remove(transaction)
        vendoritem= rc(vendoritems)
        item.vendoritem = vendoritem
        vendoritems.remove(vendoritem)

    print('Committing Seed...')
    db.session.commit()

    print("Seeding Complete!")