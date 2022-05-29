import React, { useState } from 'react';
import TopBar from "components/layout/TopBar";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { API, apiPut } from 'utils';
import Card from 'components/layout/Card';
import { IProduct } from 'types/api';

function Explore({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [productState, setProductState] = useState<IProduct[]>(products);
    const onChangeBookMark = async (id: string) => {
        const product = productState.find((product: IProduct) => product.id === id);
        const productIndex = productState.findIndex((product: IProduct) => product.id === id);
        if (product) {
            const productEdited = { ...product, bookmark: !product.bookmark }
            await apiPut<IProduct>(`/products/${id}`, { ...product, bookmark: !product.bookmark })
            setProductState([...productState.slice(0, productIndex), productEdited, ...productState.slice(productIndex + 1, productState.length)])
        }
    }
    return <>
        <TopBar loginSuccess content={'username'}  />
        <div className="explore--title">Explore what others are building</div>
        <div className="flex flex-wrap justify-between">
            {
                productState.map((product: IProduct, index: number) =>
                    <Card key={index} product={product} onChangeBookMark={onChangeBookMark} loginSuccess/>
                )
            }
        </div>
    </>
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await API.get('/products')

    if (!response) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            products: response.data,
        },
    }
}

export default Explore;