import requests
import json
def seed():
    beginFile("data.json")
    n = 5392
    while (n <= 21863):
        r = requests.get(f'https://trefle.io/api/v1/plants?token=eCFJvN25Qe_5-9jxpGL8r817XuvQo6KQPJGJAGwjw_Q&order[id]=asc&page={n}')
        print(n,":",r.status_code)
        if (r.status_code==200):    
            data = r.json()['data']
            appendDataToFile(data)    
            # insert(data)
            n+=1
    endFile("data.json")

    #     print("d")
def insert(plants):
    pass
def readFile(fileName):
    f = open(fileName, "r")
    raw = f.read()
    data = json.loads(raw)
    # print(data)
    f.close()
    return raw

def appendDataToFile(plants):
    for plant in plants:
        with open("data.json", "a") as f:
            json.dump(plant,f)
            f.write(", ")
    # f = open("data.json", "a")
    # f.write(plants)
    # f.close()

def beginFile(fileName):
    f = open(fileName, "w")
    f.write('{"data":[')
    f.close()

def endFile(fileName):
    f = open(fileName, "a")
    f.write("{}]}")
    f.close()

def writeFileFromScratch(fileName, plants):
    beginFile(fileName)
    appendDataToFile(plants)
    endFile(fileName)
n = 1
r = requests.get(f'https://trefle.io/api/v1/plants?token=eCFJvN25Qe_5-9jxpGL8r817XuvQo6KQPJGJAGwjw_Q&order[id]=asc&page={n}')
# print(r.json()['data'])
# f = open("./data.json")
# j = json.load(f)["data"]
k = (r.json()['data'])
# print(k)
# print(j==k)
# "{'data':5}".json
# writeFile(k)

# readFile("data.json")

writeFileFromScratch("data.json", k)

# with open("data2.json", "w") as f:
#             json.dump(k,f)
#             f.write(",")


# w = readFile("data.json")
# x = readFile("data2.json")

# for ind in range(0,len(w)):
#     if (w[ind] != x[ind]):
#         print(w[ind-5:ind+5], x[ind-5:ind+5])
#         break
# print(w==x)

# seed()