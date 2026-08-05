import { getProducts } from '@/lib/data';
import React from 'react';

const Products = async () => {
    const products = await getProducts();
    return (
        <div>
            {
                products.map(product => <div key={product._id}><h1>{product.title}</h1></div>)
            }
        </div>
    );
};

export default Products;