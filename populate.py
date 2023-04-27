import requests
import json
n = 1
r = requests.get(f'https://trefle.io/api/v1/plants?token=eCFJvN25Qe_5-9jxpGL8r817XuvQo6KQPJGJAGwjw_Q&order[id]=asc&page={n}')
# print(r.json()['data'])
# f = open("./data.json")
# j = json.load(f)["data"]
k = r.json()['data']
# print(j==k)
# "{'data':5}".json


def seed():
    while (n <= 21863):
        r = requests.get(f'https://trefle.io/api/v1/plants?token=eCFJvN25Qe_5-9jxpGL8r817XuvQo6KQPJGJAGwjw_Q&order[id]=asc&page={n}')
        data = r.json()['data']
        insert(data)
        n+=1

    #     print("d")
def insert(plants):
    pass