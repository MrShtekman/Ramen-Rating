import convertDate from "@/util/convertDate";

const Review = ({ object, className = '' }: { object: ReviewProps, className?: string }) => {
    const { comment, type, created, rating } = object;
    return (
        <div className={`flex flex-col gap-3 border ${className}`}>
            <h1>Comment: {comment} </h1>
            <p>Type: {type}</p>
            <p>created: {convertDate(created)}</p>
            {
                typeof rating === 'object' ?
                    (<div>
                        <h2>Rating:</h2>
                        <p>broth: {rating.broth}</p>
                        <p>toppings: {rating.toppings}</p>
                        <p>noodles: {rating.noodles}</p>
                    </div>) :
                <p>Rating: {rating}</p>
            }
        </div>
    )
}

export type ReviewProps = {
    comment: string;
    type: string;
    created: Date;
    rating: {
        broth: number;
        toppings: number;
        noodles: number;
    } | number;
}

export default Review;