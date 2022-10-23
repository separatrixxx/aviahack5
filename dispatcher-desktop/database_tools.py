import requests
import datetime

URL = "http://127.0.0.1:8000"


def get_all_executors() -> list:
    req = requests.get(f"{URL}/get_all_buses/")
    return req.json()


def get_queries(time_from, time_to) -> list:
    time_f = datetime.datetime.fromtimestamp(time_from).strftime("%H:%M:%S")
    time_t = datetime.datetime.fromtimestamp(time_to).strftime("%H:%M:%S")
    date = datetime.datetime.fromtimestamp(time_from).strftime("%Y-%m-%d")
    req = requests.get(f"{URL}/get_queries_in_time/", params={"begin_time": time_f, "end_time": time_t, "day": date})
    return req.json()


def get_executor_queries(executor_id) -> list:
    pass


def put_task(task_params):
    print("PUT!")
    requests.put(f"{URL}/put_start_time/", params={"id": int(task_params["id"]), "start_time": task_params["start_time"]})
    requests.put(f"{URL}/put_end_time/", params={"id": int(task_params["id"]), "end_time": task_params["end_time"]})
    requests.put(f"{URL}/put_start_date/", params={"id": int(task_params["id"]), "put_start_date": task_params["put_start_date"]})
    requests.put(f"{URL}/put_end_date/", params={"id": int(task_params["id"]), "end_date": task_params["end_date"]})
    requests.put(f"{URL}/put_bus/", params={"id": int(task_params["id"]), "bus_id": task_params["bus_id"]})
