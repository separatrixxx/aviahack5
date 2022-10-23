from PySide6 import QtWidgets, QtGui, QtCore

import database_tools
import datetime
from item_info import ItemInfo, ItemType


MIN_TIME = datetime.datetime.today().timestamp() - datetime.timedelta(days=1).total_seconds()
MAX_TIME = datetime.datetime.today().timestamp() + datetime.timedelta(days=1).total_seconds()


class MainWindow(QtWidgets.QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()

        self.setObjectName("Dispatcher desktop")
        self.central_widget = QtWidgets.QListWidget()
        self.central_widget.itemActivated.connect(self.open_item_info)

        self.setCentralWidget(self.central_widget)

        self.action_group = QtGui.QActionGroup(self)
        self.tasks_in_realtime_action = QtGui.QAction("Tasks in realtime")
        self.tasks_in_realtime_action.triggered.connect(self.show_realtime_tasks)
        self.tasks_in_realtime_action.setCheckable(True)
        self.tasks_without_executor_action = QtGui.QAction("Tasks without executor")
        self.tasks_without_executor_action.triggered.connect(self.show_without_executors_tasks)
        self.tasks_without_executor_action.setCheckable(True)
        self.executors_action = QtGui.QAction("Executors")
        self.executors_action.triggered.connect(self.show_executors)
        self.executors_action.setCheckable(True)
        self.statistics_action = QtGui.QAction("Statistics")
        self.statistics_action.triggered.connect(self.show_statistics)
        self.statistics_action.setCheckable(True)
        self.slider = QtWidgets.QSlider(QtCore.Qt.Horizontal, self)
        self.slider.sliderReleased.connect(self.show_interval_tasks)
        self.slider.setMinimum(MIN_TIME)
        self.slider.setMaximum(MAX_TIME)

        self.action_group.addAction(self.tasks_in_realtime_action)
        self.action_group.addAction(self.tasks_without_executor_action)
        self.action_group.addAction(self.executors_action)
        self.action_group.addAction(self.statistics_action)
        self.action_group.setExclusionPolicy(QtGui.QActionGroup.ExclusionPolicy.ExclusiveOptional)

        self.tool_bar = self.addToolBar("Tools")
        self.tool_bar.setMovable(False)
        self.tool_bar.addWidget(QtWidgets.QLabel(self))
        self.tool_bar.addWidget(self.slider)
        self.tool_bar.addSeparator()
        self.tool_bar.addAction(self.tasks_in_realtime_action)
        self.tool_bar.addSeparator()
        self.tool_bar.addAction(self.tasks_without_executor_action)
        self.tool_bar.addSeparator()
        self.tool_bar.addAction(self.executors_action)
        self.tool_bar.addSeparator()
        self.tool_bar.addAction(self.statistics_action)

        self.now_item_info = None
        self.realtime_tasks = []
        self.realtime_executors = []

    @QtCore.Slot()
    def show_realtime_tasks(self):
        self.central_widget.clear()
        for task in self.realtime_tasks:
            self.create_item(f"Task №{task['id']} | executor №{task['bus_id']} | status {task['status']}", ItemType.TASK, task)

    @QtCore.Slot()
    def show_without_executors_tasks(self):
        self.central_widget.clear()
        for task in self.realtime_tasks:
            if not task['bus_id']:
                self.create_item(f"Task №{task['id']} | status {task['status']}", ItemType.TASK, task)

    @QtCore.Slot()
    def show_executors(self):
        self.central_widget.clear()
        for task in self.realtime_executors:
            self.create_item(f"Executor №{task['id']} | task №{task.get('task_id')} | status {task.get('status')}", ItemType.EXECUTOR, task)

    @QtCore.Slot()
    def show_statistics(self):
        print("Statistics")

    @QtCore.Slot()
    def show_interval_tasks(self):
        self.central_widget.clear()
        self.tasks_in_realtime_action.setChecked(False)
        self.tasks_without_executor_action.setChecked(False)
        self.executors_action.setChecked(False)
        self.statistics_action.setChecked(False)
        tasks = database_tools.get_queries(self.slider.value(), MAX_TIME)
        for task in tasks:
            self.create_item(f"Task №{task['id']} | executor №{task['bus_id']} | status {task['status']}", ItemType.TASK, task)

    def create_item(self, id_item: str, item_type: ItemType, data):
        item = QtWidgets.QListWidgetItem(id_item)
        data["item_type"] = item_type
        item.setData(1, data)
        self.central_widget.addItem(item)

    @QtCore.Slot()
    def open_item_info(self, item):
        if self.now_item_info and self.now_item_info.isVisible():
            return
        new_data = item.data(1)
        item_type = new_data.pop("item_type")
        self.now_item_info = ItemInfo(new_data, item_type)
        self.now_item_info.show()

