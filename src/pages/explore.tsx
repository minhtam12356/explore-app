import React from 'react';
import TopBar from "components/layout/TopBar";
import { InferGetStaticPropsType } from 'next';
import API from 'utils/api';
import Card from 'components/layout/Card';

function Explore({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>
        <TopBar content='Login' />
        <div className="explore--title">Explore what others are building</div>
        <div className="flex flex-wrap justify-between">
            {
                products.map((product: any) =>
                    <Card product={product} />
                )
            }
        </div>
    </>
}

export const getStaticProps = async () => {
    const res = await API.get('/products')

    return {
        props: {
            products: res.data,
        },
    }
}

export default Explore