import json
 
f = open('./countries.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)

new_list = []
for dict in data:
    new_list.append({"value": dict['alpha2'], "label": dict['name']})

json_object = json.dumps(new_list, indent=4)
with open("searchCountries.json", "w") as outfile:
    outfile.write(json_object)