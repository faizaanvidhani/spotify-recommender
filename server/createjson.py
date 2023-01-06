import json
 
f = open('./countries.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)

new_dict = {}
for dict in data:
    name = dict['name']
    alpha2 = dict['alpha2']
    new_dict[name] = alpha2

json_object = json.dumps(new_dict, indent=4)
with open("sample.json", "w") as outfile:
    outfile.write(json_object)



# # Data to be written
# dictionary = {
#     "name": "sathiyajith",
#     "rollno": 56,
#     "cgpa": 8.6,
#     "phonenumber": "9976770500"
# }
 
# # Serializing json
# json_object = json.dumps(dictionary, indent=4)
 
# # Writing to sample.json
# with open("sample.json", "w") as outfile:
#     outfile.write(json_object)