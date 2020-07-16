# Ride_Booking_API
Book a ride to the nearest Available Driver

WORKING URL(Deploy) = http://shiaam71.pythonanywhere.com/ride/book/ ---(TEST WITH POSTMAN)


superuserdetails:

username = shivam
password = 12345

input must be on url ---- /ride/book/

method = POST

content/payload : {
                      "user_name": "User",
                      "start_x":"1000",
                      "start_y" :"1000",
                      "end_x" :"124",
                      "end_y" : "197"
                  }
                  
                  
                        
Response-- {
    "ride_id": "c7a8dffc-c164-11ea-b264-0abcd7a549af",
    "ride_start_time": "2020-07-08T21:57:00.409906Z",
    "ride_end_time": "2020-07-08T21:57:00.409962Z",
    "start_x": 1.0,
    "start_y": 1.0,
    "end_x": 124.0,
    "end_y": 197.0,
    "driver": {
        "id": 3,
        "driver_name": "Ramesh",
        "driver_mobile_no": "0987654321",
        "rating": 4.0
    },
    "car": {
        "id": 1,
        "car_id": "cb931aac-c13e-11ea-be83-0250343f333c",
        "car_reg_no": "MP-09-cz-4126",
        "current_x": 19.0,
        "current_y": 12.0,
        "booked": true,
        "driver": {
            "id": 3,
            "driver_name": "Ramesh",
            "driver_mobile_no": "0987654321",
            "rating": 4.0
        }
    },
    "user_name": "User1",
    "fare": 2334.0,
    "status": "Available",
    "distance": 231.4,
    "estimated_time": 5.79
}



 if User error -> change user_name to User3 // or create a user with desired username
 
 if Rides error -> make some car booked as False or Create a new car 
 
 all above can done with admin panel
 
 
I initalized langitude as x and latitude as y.                 
                  
          
          
