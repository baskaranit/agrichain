import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { productService } from '../_services';

function List({ match }) {
    const { path } = match;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getAll().then(x => setProducts(x));
    }, []);

    function deleteProducr(id) {
        setProducts(products.map(x => {
            if (x._id === id) { x.isDeleting = true; }
            return x;
        }));
        productService.delete(id).then(() => {
            setProducts(products => products.filter(x => x._id !== id));
        });
    }

    return (
        <div>
            <h1>Products</h1>
            <Link to={`/add`} className="btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Price</th>
                        <th style={{ width: '30%' }}>Rule</th>
                        <th style={{ width: '10%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product?.discount?.count} of {product?.discount?.price}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteProducr(product._id)} className="btn btn-sm btn-danger btn-delete-product" disabled={product.isDeleting}>
                                    {product.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {products && !products.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No products To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };