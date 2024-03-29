from factory.validation import Validator
from factory.database import Database


class Product(object):
    def __init__(self):
        self.validator = Validator()
        self.db = Database()

        self.collection_name = 'product'  # collection name

        self.fields = {
            "name": "string",
            "price": "int",
            "discount":"list",
            "created": "datetime",
            "updated": "datetime",
        }

        self.create_required_fields = ["name", "price"]

        # Fields optional for CREATE
        self.create_optional_fields = ["discount"]

        # Fields required for UPDATE
        self.update_required_fields = ["name", "price"]

        # Fields optional for UPDATE
        self.update_optional_fields = ["discount"]

    def create(self, todo):
        # Validator will throw error if invalid   
        self.validator.validate(todo, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(todo, self.collection_name)
        return { "msg": "Data Added", "Id":res }

    def find(self, todo):  # find all
        return self.db.find(todo, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, todo):
        self.validator.validate(todo, self.fields, self.update_required_fields, self.update_optional_fields)
        res =  self.db.update(id, todo,self.collection_name)
        return { "msg": "Data Updated", "Id":res }

    def delete(self, id):
        return self.db.delete(id, self.collection_name)
