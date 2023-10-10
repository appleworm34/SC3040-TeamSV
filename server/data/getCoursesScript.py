import requests
from bs4 import BeautifulSoup
import json
import pymongo
from pymongo import MongoClient, InsertOne

url = 'https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1'
acadsem = '2023;1' # Acad Yr 2023, Sem 1
r_course_yr = 'CSC;;1;F' # Computer Science, Year 1

params = {
  'acadsem': acadsem,
  'r_course_yr': r_course_yr,
  'r_search_type': 'F',
  'boption': 'CLoad',
  'staff_access': "false",
}
collections1 = {}

collections1 = requests.get(
  url,
  params = params
)
soup = BeautifulSoup(collections1.text, features='html.parser')

# print(soup)
tables = soup.find_all('table')

courseInfo = []

for idx, table in enumerate(tables):
  if idx % 2 == 0:
    course = {}

    row = table.find('tr')
    cols = row.find_all('td')
    cols = [col.text.strip() for col in cols]

    course = {
        'courseCode' : cols[0],
        'courseName' : cols[1],
        'courseNumOfAU' : cols[2],
        'indexes' : [],
    }
    
  else:
    index = {}

    rows = table.find_all('tr')
    rows = rows[1:]
    
    for row in rows:
      cols = row.find_all('td')
      cols = [col.text.strip() for col in cols]

      indexNo = cols[0]
      lesson_type = cols[1]
      group = cols[2]
      day = cols[3]
      time = cols[4]
      venue = cols[5]
      remarks = cols[6]
      
      if(indexNo):
        if(index):
            course['indexes'].append(index)
        index = {
            'indexNo' : indexNo,
            'lessons' : [],
        }
        
      lesson = {
        'type' : lesson_type,
        'group' : group,
        'day' : day,
        'time' : time,
        'venue' : venue,
        'remarks' : remarks
      }
        
      index['lessons'].append(lesson)
      
    if(index):
      course['indexes'].append(index)
      
    courseInfo.append(course)

# print(courseInfo[0])

### create json file to store details of modules
# file_name = "csc-2023-sem1-y1-courses.json"

# with open(file_name, "w") as json_file:
#   json.dump(courseInfo, json_file)

# print(f"Data saved to {file_name}")

### add to DB
# client = pymongo.MongoClient("") #insert MONGO_URL from .env
# file_path = "./courses/csc-2023-sem1-y1-courses.json"
# db = client.test
# collection = db.courses
# requesting = []

# with open(file_path) as f:
#   for course_list in f:
#     myDict = json.loads(course_list)
#     for i in myDict:
#       requesting.append(InsertOne(i))

# # print(requesting)
# result = collection.bulk_write(requesting)
# client.close()