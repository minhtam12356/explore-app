import React from 'react'
import { IProduct } from 'types/api'

interface CardProps {
    product: IProduct
}

function Card({ product }: CardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg explore--item">
            <img className="w-full" src={product.avatar} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <div className="font-400 text-md mb-2">polygon</div>
                </div>
                <span className="font-bold bg-gray-200 text-gray-700 text-base">{product.description}</span>
            </div>
            <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            </div>
        </div>
    )
}

export default Card