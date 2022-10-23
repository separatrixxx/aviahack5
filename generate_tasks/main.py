
from pydantic import BaseModel
from datetime import date, time
from tools import *


class Query(BaseModel):
    dispatcher_id: int
    flight_id: int
    bus_id: int
    status: str
    begin: int
    end: int
    start_date: date
    start_time: str
    end_date: date
    end_time: str
    passengers_count: int

class Bus(BaseModel):
    capacity : int
    token : str
    position : str
    name: str


def get_bus(av_bus, bus_id):
    return None

def change_bus_info(av_bus, bus_id):
    pass

def create_tasks(distance_filename, flight_filename):
    tasks = []
    excel_flight = pandas.read_excel(flight_filename)
    graph = create_graph(distance_filename)
    dict_points = create_dict_points(distance_filename)
    gates = {"DGA_D": times_search(dict_points['DGA_D'], graph),
             "DGA_I": times_search(dict_points['DGA_I'], graph)}
    av_bus = {856:[[Bus(capacity=100,token="asd",position=856,name="Petrov"),0],[Bus(capacity=50,token="asd",position=856,name="Mezenin"),0]],
              874:[[Bus(capacity=100,token="asd",position=874,name="Ovanov"),0]],
              174:[[Bus(capacity=100,token="asd",position=174,name="Chapkin"),0]],
              955:[[Bus(capacity=100,token="asd",position=955,name="Ivanov"),0]]}
    for i, row in excel_flight.iterrows():
        passengers_count = row["Количество пассажиров"]
        while passengers_count:
            if row["AD (A-прилет, D-вылет)"] == 'A':
                start_pos = row["Номер места стоянки"]  # позиция посадки самолета
                end_pos = gates(row["Номер гейта"])  # позиция гейта
                bus_id, start_time, end_time = takeoff(end_pos, start_pos, row["Плановое время"], av_bus, graph)
            else:
                start_pos = gates(row["Номер гейта"])  # позиция посадки самолета
                end_pos = row["Номер места стоянки"]  # позиция гейта
                bus_id, start_time, end_time = landing(start_pos, end_pos, row["Плановое время"], av_bus, graph)
            bus = get_bus(av_bus, bus_id)
            pass_count_now = min(bus.capacity, passengers_count)
            passengers_count -= pass_count_now
            task = Query(dispatcher_id=None, flight_id=row["Номер рейса"], bus_id=bus_id, status="not_started",
                         begin=start_pos, end=end_pos, passengers_count=pass_count_now)
            tasks.append(task)
            change_bus_info(av_bus, bus_id)
    # в БД должны добавляться все из tasks и все из av_bus

create_tasks("Distance20221022.xlsx", 'Рейсы, пассажиры.xlsx')
