from PySide6 import QtWidgets, QtCore

import database_tools


class ItemType:
    TASK = 1
    EXECUTOR = 2


class ItemInfo(QtWidgets.QWidget):
    def __init__(self, data: dict, item_type: ItemType):
        super(ItemInfo, self).__init__()

        grid = QtWidgets.QGridLayout()
        self.setLayout(grid)

        self.fill_list(data)
        if item_type == ItemType.TASK:
            save_button = QtWidgets.QPushButton("save")
            save_button.clicked.connect(self.save)
            self.layout().addWidget(save_button)

    def fill_list(self, data: dict):
        count = 0
        for key in data:
            self.layout().addWidget(QtWidgets.QLabel(key), count, 0)
            line_edit = QtWidgets.QLineEdit(str(data[key]))
            self.layout().addWidget(line_edit, count, 1)
            count += 1

    @QtCore.Slot()
    def save(self):
        new_data = {}
        for i in range(self.layout().rowCount()-1):
            new_data[self.layout().itemAtPosition(i,0).widget().text()] = self.layout().itemAtPosition(i,1).widget().text()
        database_tools.put_task(new_data)