'use client';
import { useEffect, useState } from 'react';

import Restaurant, { RestaurantProps } from '../../components/restaurant';

import configs from '../../../configs/common';

export default function RestaurantPage() {
  const [data, setData] = useState<RestaurantProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${configs.api.baseUrl}/restaurant`);
      setData(await response.json());
    };
    fetchData();
  }, []);

  const restaurantList = data.map((ramen, index) => {
    return (
      <Restaurant key={index} object={ramen} />
    )
  })
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Restaurants</h1>
      </div>
      <div className="flex flex-col items-center gap-5">
        {restaurantList}
      </div>
    </>
  );
}