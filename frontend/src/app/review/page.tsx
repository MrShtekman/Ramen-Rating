'use client'
import { useEffect, useState } from 'react';

import Review, { ReviewProps } from '../../components/review';

import configs from '../../../configs/common';

export default function ReviewPage() {
    const [data, setData] = useState<ReviewProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${configs.api.baseUrl}/review`);
            setData(await response.json());
        }
        fetchData();
    })

    const reviewList = data.map((review, index) => {
        return <Review key={index} object={review}/>
    })

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Reviews</h1>
            </div>
            <div className="flex flex-col items-center gap-5">
                {reviewList}
            </div>
        </>
    )
}