import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { productService, alertService } from '../_services';

function Add({ history, match }) {
    const { id } = match.params;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        price: Yup.string()
            .required('Price is required'),
        name: Yup.string()
            .required('Name is required'),
        discount_count: Yup.string(),
        discount_price: Yup.string()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return createUser(data);
    }

    function createUser(data) {
        return productService.create(data)
            .then(() => {
                alert('in')
                alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>Add Product</h1>
            <div className="form-row">
                <div className="form-group col-6">
                    <label>Product Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-6">
                    <label>Price</label>
                    <input name="price" type="text" ref={register} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6">
                    <label>Discount Count</label>
                    <input name="discount_count" type="text" ref={register} className={`form-control ${errors.discount_count ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.discount_count?.message}</div>
                </div>
                <div className="form-group col-6">
                    <label>Discount Price</label>
                    <input name="discount_price" type="text" ref={register} className={`form-control ${errors.discount_price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.discount_price?.message}</div>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={'.'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { Add };