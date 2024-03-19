import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { productService, alertService } from '../_services';
import { useForm } from "react-hook-form";
function Checkout({ match }) {
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        items: Yup.string()
            .required('Enter Product Items')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        setIsLoading(true);
        return productService.checkout(data)
            .then((response) => {
                let totalPrice = 0;
                var myData = Object.keys(response).map(key => {
                    console.log(response[key])
                    totalPrice += parseInt(response[key].price)
                    return response[key];
                });
                setTotal(totalPrice);
                setProducts(myData)
                setIsLoading(false);
            })
            .catch(alertService.error);
    }
    return (
      <div>
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <div className="form-row">
            <div className="form-group col-6">
              <label>Enter Product Code</label>
              <input
                name="items"
                type="text"
                ref={register}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.items?.message}</div>
            </div>
            <div className="form-group col-6" style={{padding: "30px 50px"}}>
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="btn btn-primary"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Calculate
              </button>
              <Link to={"."} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </div>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "12%" }}>Product Name</th>
              <th style={{ width: "15%" }}>Discount Quantity</th>
              <th style={{ width: "12%" }}>Unit Quantity</th>
              <th style={{ width: "12%" }}>Discount Price</th>
              <th style={{ width: "12%" }}>Discount Unit</th>
              <th style={{ width: "12%" }}>Total Quantity</th>
              <th style={{ width: "10%" }}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products && !isLoading &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.discount_quantity}</td>
                  <td>{product.unit_quantity}</td>
                  <td>{product.discount_price}</td>
                  <td>{product.unit_price}</td>
                  <td>{product.total_quantity}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            {isLoading && (
              <tr>
                <td colSpan="7" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {!products && (
              <tr>
                <td colSpan="7" className="text-center">
                  <div className="p-2">No products To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div class="clearfix">
            <div class="btn btn-secondary float-right">
                <div class="row">
                    <div class="col-6">
                        Total 
                    </div>
                    <div class="col-6">
                        {total}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}

export { Checkout };