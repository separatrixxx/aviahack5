import pandas

def create_graph(filename) -> dict:
    excel_data_df = pandas.read_excel(filename, sheet_name='Roads')

    graph = {}



    for i, row in excel_data_df.iterrows():

        # print(f"Index: {i}")
        # print(type(row['source_point_id']))
        if row['source_point_id'] in graph:
            graph[int(row['source_point_id'])][int(row['target_point_id'])] = row['time'] * 60
        else:
            graph[int(row['source_point_id'])] = {int(row['target_point_id']): row['time'] * 60}

    return graph

def create_dict_points(filename) -> dict:
    excel_points_df = pandas.read_excel(filename, sheet_name='Points')
    dict_points = {}

    for i, row in excel_points_df.iterrows():
        dict_points[str(row['location_id'])] = int(row['point_id'])
    return dict_points


def times_search(point,graph):
  d = {}
  mark = {}
  for i,item in graph.items():
      mark[i]=False
      d[i]=1000000
      for j in item:
        mark[j]=False
        d[j]=1000000


  d[point] = 0


  for i in graph:
      v = -1
      for j in graph:
          if (not mark[j]) and ((v == -1) or (d[v] > d[j])):
              v = j
      mark[v] = True
      for k in graph[v]:
        if d[k] > d[v] + graph[v][k]:
          d[k] = d[v] + graph[v][k]

  return d




def min_time_and_bus(dict_point_times,av_bus):
  min_time=10000000000000000
  res=[]
  for i,item in av_bus.items():
    for j in item:
      if min_time>j[1] + dict_point_times[i]:
        min_time=j[1] + dict_point_times[i]
        res=[i,j[0],min_time,dict_point_times[i]]
  return res


def takeoff(gate_times,point_flight,time_s,av_bus,graph):
  to_term = min_time_and_bus(gate_times,av_bus)
  dist_toplane=times_search(point_flight,graph)
  time_toplane = gate_times[point_flight] +900
  if to_term[3] ==1000000:
    to_term[2]=to_term[2]-1000000+180
    to_term[3]=180
  if to_term[2] > time_s-time_toplane:
    print('wrong')
    return
  start_time= time_s - to_term[3] - time_toplane
  id_bus=to_term[1]
  return [id_bus,start_time,time_s]

def landing(gate_times,point_flight,time_s,av_bus,graph):
  dist_toplane=times_search(point_flight,graph)
  to_plane = min_time_and_bus(dist_toplane,av_bus)
  time_toterm = gate_times[point_flight] +900
  if to_plane[3] ==1000000:
    to_plane[2]=to_plane[2]-1000000+180
    to_plane[3]=180
  if to_plane[2] > time_s:
    print('wrong')
    return
  start_time= time_s - to_plane[3]
  id_bus=to_plane[1]
  return [id_bus,start_time,time_s+time_toterm]

