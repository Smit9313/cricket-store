import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Loader from '../components/Loader';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        function fetchProducts() {
            setIsLoading(true)
            axios.get('https://dummyjson.com/products').then(res => { return res.data }).then(res => {
                setProducts(res.products)
                setIsLoading(false)
            })
        }
        fetchProducts()
    }, [])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSort = (e) => {
        setSortOrder(e.target.value);
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredProducts.sort((a, b) => {
        if (sortOrder === 'priceAsc') {
            return a.price - b.price;
        } else if (sortOrder === 'priceDesc') {
            return b.price - a.price;
        } else if (sortOrder === 'titleAsc') {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === 'titleDesc') {
            return b.title.localeCompare(a.title);
        } else {
            return 0;
        }
    });

    const isProducts = !isLoading && !!filteredProducts.length;
    const isNoProduct = filteredProducts.length === 0 && !isLoading

    const displayedProduct = isProducts && filteredProducts.map((val, index) => {
        return (<Link to={`product/${val.id}`} className="group" key={val.id}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                <img src={val.thumbnail} alt={val.title} className="h-48 w-72 object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{val.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${val.price}</p>
        </Link>)
    })

    const noPrductFound = (<div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold mb-4">No products found for your search query.</p>
    </div>)

    return (
        <>
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <section class=" py-2 text-white bg-white border rounded-none h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:py-4">
                    <div class="mx-auto  w-full">
                        <div class="relative bg-gray-200 shadow-md sm:rounded-lg">
                            <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                                <div class="w-full md:w-1/2">
                                    <div class="flex items-center">
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative w-full">
                                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <input type="text" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none" placeholder="Search" value={searchQuery}
                                                onChange={handleSearch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                                    <div class="flex items-center w-full space-x-3 md:w-auto">
                                        <div class="max-w-sm mx-auto">
                                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
                                                value={sortOrder}
                                                onChange={handleSort}>
                                                <option value="">Sort By</option>
                                                <option value="priceAsc">Price [Low to High]</option>
                                                <option value="priceDesc">Price [High to Low]</option>
                                                <option value="titleAsc">Title [A to Z]</option>
                                                <option value="titleDesc">Title [Z to A]</option>
                                            </select>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <h2 className="mb-5 text-2xl">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {displayedProduct}
                </div>
            </div>
            {isLoading &&<Loader /> }
            {isNoProduct && noPrductFound}
        </>
    )
}

export default ProductList;
