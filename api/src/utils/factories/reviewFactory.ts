import { Types } from "mongoose";
import dayjs from "dayjs";

import reviewTypes from "../../constants/reviewTypes";

const reviewFactory = (type: string, overrides = {}) => {
    const baseReview = {
        comment: "Wow this is so good!",
        type,
        subject: new Types.ObjectId(),
        created: dayjs(),
    };

    if (type === reviewTypes.RAMEN) {
        return {
            ...baseReview,
            rating: {
                broth: 5,
                toppings: 5,
                noodles: 5,
            },
            ...overrides,
        };
    } else if (type === reviewTypes.RESTAURANT) {
        return {
            ...baseReview,
            rating: 5,
            ...overrides,
        };
    } else {
        return {
            ...baseReview,
            ...overrides
        }
    }
};

export default reviewFactory;