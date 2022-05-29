import React from 'react'
import { IProduct } from 'types/api'

interface CardProps {
    product: IProduct,
    loginSuccess?: boolean;
    onChangeBookMark: (id: string) => void;
}

function Card({ product, onChangeBookMark, loginSuccess = false }: CardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg explore--item">
            <img className="w-full" src={product.avatar} alt="Sunset in the mountains" />
            <div className="p-6">
                <div className="flex justify-between mb-2">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <div className="font-400 text-md mb-2">polygon</div>
                </div>
                <span className="font-bold bg-gray-200 text-gray-700 text-base px-3 py-1">{product.description}</span>
            </div>
            <div className="p-6 pt-4 flex justify-between">
                <span className='cursor-pointer'>Join now</span>
                {loginSuccess &&
                    <span onClick={() => onChangeBookMark(product.id)}>
                        {product.bookmark && <svg className="w-6 h-6 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>}
                        {!product.bookmark && <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
                    </span>
                }
            </div>
        </div>
    )
}

export default Card