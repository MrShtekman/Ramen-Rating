'use client'
import convertDate from "@/util/convertDate";

const Restaurant =({ object, className = '' }: { object: RestaurantProps, className?: string }) => {
    const { name, location, created } = object;
    return (
        <div className={`flex flex-col gap-3 border ${className}`}>
            <h1>Name: {name}</h1>
            <p>Location: {location}</p>
            <p>Created: {convertDate(created)}</p>
        </div>
    )
}

export type RestaurantProps = {
    name: string;
    location: string;
    created: Date;
}

export default Restaurant;