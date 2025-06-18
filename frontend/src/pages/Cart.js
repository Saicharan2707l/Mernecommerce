import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context'
import dispalyINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md"
import { current } from '@reduxjs/toolkit'
const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
    const fetchCartData = async () => {
        setLoading(true)
        const response = await fetch(summaryApi.addToCartProductView.url, {
            method: summaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",

            }
        })
        setLoading(false)

        const dataResponse = await response.json()

        if (dataResponse.success) {
            setData(dataResponse.data)
        }
    }
    useEffect(() => {
        fetchCartData()
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(summaryApi.updateCartProduct.url, {
            method: summaryApi.updateCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                quantity: qty + 1,
                _id: id
            })
        })
        const dataResponse = await response.json()
        if (dataResponse.success) {
            fetchCartData()
        }
    }
    const decreaseQty = async (id, qty) => {
        if (qty > 2) {
            const response = await fetch(summaryApi.updateCartProduct.url, {
                method: summaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })
            const dataResponse = await response.json()
            if (dataResponse.success) {
                fetchCartData()
            }
        }
    }
    const deletCartProduct = async (id) => {
        const response = await fetch(summaryApi.deletCartProduct.url, {
            method: summaryApi.deletCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        })
        const dataResponse = await response.json()
        if (dataResponse.success) {
            fetchCartData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousvalue, currentValue) => previousvalue + currentValue.quantity, 0)
    const totalPrice = data.reduce((previousvalue, currentValue) => previousvalue + (currentValue.quantity * currentValue.productId.selling), 0)
    return (
        <div className='container mx-auto py-8'>
            <div className='text-center text-lg py-3'>
                {
                    data.length == 0 && !loading && (
                        <p className='bg-white py-5 rounded shadow'>No Data</p>
                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                {/* View Product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, idx) => (
                                <div key={el + "Add to cart Product" + idx} className='w-full bg-slate-200 h-32 my-4 border-slate-300 animate-pulse rounded-xl shadow' />
                            ))
                        ) : (
                            data.map((product, index) => (
                                <div key={product?._id + "Cart data"} className='w-full bg-white h-36 my-4 border border-slate-200 rounded-xl shadow flex items-center px-4 transition-all duration-200 hover:shadow-lg'>
                                    {/* Product Image */}
                                    <div className='w-28 h-28 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden'>
                                        <img src={product?.productId?.productImage[0]} className='object-contain w-full h-full' alt={product?.productId?.productName} />
                                    </div>
                                    <div className='flex-1 px-6 py-2 flex flex-col justify-between h-full'>
                                        <h2 className='text-xl font-semibold text-ellipsis line-clamp-1 mb-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500 text-sm mb-2'>{product?.productId?.category}</p>
                                        <div className='flex justify-between gap-2 mb-2'>
                                            <p className='text-red-600 font-bold text-lg'>{dispalyINRCurrency(product?.productId.selling)}</p>
                                            <p className='text-slate-700 font-bold text-lg'>{dispalyINRCurrency(product?.productId.selling * product?.quantity)}</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <button className='w-8 h-8 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded-full flex items-center justify-center text-lg transition-all' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                            <span className='font-semibold text-lg'>{product?.quantity}</span>
                                            <button className='w-8 h-8 text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white flex items-center justify-center text-lg transition-all' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                    <div className='text-red-600 rounded-full text-2xl cursor-pointer hover:bg-red-600 hover:text-white p-2 transition-all' onClick={() => deletCartProduct(product?._id)}>
                                        <MdDelete />
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
                {/* Summary product */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-40 bg-slate-200 p-4 border-bg-slate-200 rounded-xl animate-pulse mb-4 shadow' />
                        ) : (
                            <div className='h-48 bg-white rounded-xl shadow flex flex-col justify-between'>
                                <h2 className='text-white bg-red-600 px-4 py-2 rounded-t-xl text-lg font-semibold'>Summary</h2>
                                <div className='flex flex-col gap-2 px-6 py-4 flex-1 justify-center'>
                                    <div className='flex justify-between items-center font-medium text-base text-slate-700'>
                                        <span>Quantity:</span>
                                        <span>{totalQty}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-medium text-base text-slate-700'>
                                        <span>Total Price:</span>
                                        <span>{dispalyINRCurrency(totalPrice)}</span>
                                    </div>
                                </div>
                                <button className='bg-blue-500 w-full py-3 text-white font-bold text-lg rounded-b-xl hover:bg-blue-600 transition-all'>Payment</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart