'use client'
import { useEffect, useState } from 'react';

import Ramen, { RamenProps } from '../../components/ramen';

import configs from '../../../configs/common';


export default function RamenPage() {
    const [data, setData] = useState<RamenProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${configs.api.baseUrl}/ramen`);
            setData(await response.json());
        };
        fetchData();
    }, []);

    const ramenList = data.map((ramen, index) => {
        return <Ramen key={index} object={ramen} />
    })
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Ramens</h1>
            </div>
            <div className="flex flex-col items-center gap-5">
                {ramenList}
            </div>
        </>
    )
}