import sys
import time

from PySide6 import QtWidgets

from main_window import MainWindow
from threading import Thread
import database_tools
import datetime

TIME_SLEEP = 5


def update_realtime_tasks():
    while widget.isVisible():
        if widget.tasks_in_realtime_action.isChecked() or widget.tasks_without_executor_action.isChecked():
            from_time = datetime.datetime.today().timestamp() - datetime.timedelta(minutes=60).total_seconds()
            to_time = datetime.datetime.today().timestamp() + datetime.timedelta(minutes=60).total_seconds()
            widget.realtime_tasks = database_tools.get_queries(from_time, to_time)
            if widget.tasks_in_realtime_action.isChecked():
                widget.show_realtime_tasks()
            else:
                widget.show_without_executors_tasks()
        time.sleep(TIME_SLEEP)


def update_executors():
    while widget.isVisible():
        if widget.executors_action.isChecked():
            widget.realtime_executors = database_tools.get_all_executors()
            widget.show_executors()
        time.sleep(TIME_SLEEP)


if __name__ == "__main__":
    app = QtWidgets.QApplication([])

    widget = MainWindow()
    widget.resize(800, 600)
    widget.show()

    worker1 = Thread(target=update_executors)
    worker2 = Thread(target=update_realtime_tasks)
    worker1.start()
    worker2.start()

    sys.exit(app.exec())
