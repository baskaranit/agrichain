from flask import Flask, request, jsonify
from models import product  # call model file
from flask_cors import CORS  # to avoid cors error in different frontend like react js or any other
import json
import ast

app = Flask(__name__)
CORS(app)

product = product.Product()

@app.route('/product/', methods=['GET'])
def get_tasks():
    return jsonify(product.find({})), 200

@app.route('/product/checkout', methods=['POST'])
def process_checkout():
    if request.method == "POST":
        responseData = {}
        formData = request.json
        productItems = formData["items"]
        productItemsCount = count_duplicate_product(productItems)
        if len(productItemsCount) > 0:
            products = product.find({})
            index = 0
            for productName in productItemsCount:
                productCount =  productItemsCount[productName]
                productInfoFromMongo  = filter_products_by_name(products,productName)
                if len(productInfoFromMongo) > 0:
                    responseData[index] = {}
                    print(productInfoFromMongo["discount"])
                    responseData[index]['name'] = productName
                    responseData[index]["price"] = 0
                    productPrice  = productInfoFromMongo["price"]
                    discountPrice = productInfoFromMongo["discount"]["price"]
                    discountCount = productInfoFromMongo["discount"]["count"]
                    getDiscountQuantity = find_quotient_and_remainder(int(productCount),int(discountCount))                   
                    discountQuantityCount = getDiscountQuantity[0]
                    unitQuantityCount = getDiscountQuantity[1]
                    responseData[index]['discount_price'] = 0
                    responseData[index]['discount_quantity'] = 0
                    
                    if discountQuantityCount > 0:
                        responseData[index]["price"]  += int(discountQuantityCount) *  int(discountPrice)
                        responseData[index]['discount_price'] += int(discountQuantityCount) *  int(discountPrice)
                        responseData[index]['discount_quantity'] += int(discountQuantityCount) *  int(discountCount)

                    responseData[index]['unit_price'] = 0
                    responseData[index]['unit_quantity'] = 0
                    if unitQuantityCount > 0:
                        responseData[index]["price"]  += int(unitQuantityCount) *  int(productPrice)    
                        responseData[index]['unit_price'] += int(unitQuantityCount) *  int(productPrice)
                        responseData[index]['unit_quantity'] = unitQuantityCount
                    
                    responseData[index]['total_quantity'] = responseData[index]['unit_quantity'] + responseData[index]['discount_quantity']
                    
                    index += 1

    return jsonify(responseData), 200    

def count_duplicate_product(product):
    char_count = {}
    for char in product:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    
    duplicate_char_count = {char: count for char, count in char_count.items() if count > 0}
    return duplicate_char_count

def filter_products_by_name(products, product_name):
    filtered_products = {}
    for product_info in products:
        if product_info["name"] == product_name:
            filtered_products = product_info
            break
    return filtered_products    

def find_quotient_and_remainder(dividend, divisor):
    discountCount = dividend // divisor
    unitCount = dividend % divisor
    return discountCount, unitCount    

@app.route('/product/<string:product_id>', methods=['GET'])
def get_task(product_id):
    return product.find_by_id(product_id), 200


@app.route('/product', methods=['POST'])
def add_tasks():
    if request.method == "POST":
        formData = request.json
        payload = {}
        discount = {}
        discount["count"] = formData['discount_count']
        discount["price"] = formData['discount_price']
        payload["name"]  = formData['name']
        payload["price"] = formData['price']
        payload["discount"] = discount
        response = product.create(payload)
        return response, 201


@app.route('/product/<string:product_id>', methods=['PUT'])
def update_tasks(product_id):
    if request.method == "PUT":
        formData = request.json
        payload = {}
        discount = {}
        discount["count"] = formData['discount_count']
        discount["price"] = formData['discount_price']
        payload["name"]  = formData['name']
        payload["price"] = formData['price']
        payload["discount"] = discount
        response = product.update(product_id, payload)
        return response, 201


@app.route('/product/<string:product_id>', methods=['DELETE'])
def delete_tasks(product_id):
    if request.method == "DELETE":
        response = product.delete(product_id)
        return response, 201



if __name__ == '__main__':
    app.run(debug=True)
