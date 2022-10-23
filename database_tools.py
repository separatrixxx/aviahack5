import requests
import datetime

URL = "http://localhost"


def get_all_executors() -> list:
    #req = requests.get(f"{URL}/get_all_buses/")
    #return req.json()
    return [{
    		'id': 1,
    		'capacity': 100,
    		'token': "asdasdasd",
    		'position': 123
    	}]


def get_queries(time_from, time_to) -> list:
    #time_f = datetime.datetime.fromtimestamp(time_from).strftime("%H:%M:%S")
    #time_t = datetime.datetime.fromtimestamp(time_to).strftime("%H:%M:%S")
    #date = datetime.datetime.fromtimestamp(time_from).strftime("%Y-%m-%d")
    #req = requests.get(f"{URL}/get_queries_in_time/", params={"begin_time": time_f, "end_time": time_t, "day": date})
    #return req.json()
    return [{
        'id': 123,
        'dispatcher_id': 32,
        'flight_id': 123,
        'bus_id': 123,
        'status': "wait",
        'begin': 1,
        'end': 3,
        'start_date': "10.10.10",
        'start_time': "11:11:11",
        'end_date': "10.10.10",
        'end_time': "11:11:11",
        'passengers_count': 100
    },
        {
            'id': 1234,
            'dispatcher_id': 32,
            'flight_id': 123,
            'bus_id': None,
            'status': "wait",
            'begin': 1,
            'end': 3,
            'start_date': "10.10.10",
            'start_time': "11:11:11",
            'end_date': "10.10.10",
            'end_time': "11:11:11",
            'passengers_count': 100
        }
    ]


def get_executor_queries(executor_id) -> list:
    pass


def put_task(task_params):
    print("PUT!")
    requests.put(f"{URL}/put_start_time/", params={"id": task_params["id"], "start_time": task_params["start_time"]})
    requests.put(f"{URL}/put_end_time/", params={"id": task_params["id"], "end_time": task_params["end_time"]})
    requests.put(f"{URL}/put_start_date/", params={"id": task_params["id"], "put_start_date": task_params["put_start_date"]})
    requests.put(f"{URL}/put_end_date/", params={"id": task_params["id"], "end_date": task_params["end_date"]})
    requests.put(f"{URL}/put_bus/", params={"id": task_params["id"], "bus_id": task_params["bus_id"]})
