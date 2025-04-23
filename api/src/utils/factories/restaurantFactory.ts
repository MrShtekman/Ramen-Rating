import { Types } from "mongoose";
import dayjs from "dayjs";

export const restaurantFactory = (overrides = {}) => {
    return {
        name: "Test Restaurant",
        location: "Test City, Test Country",
        created: dayjs(),
        ramen: [],
        reviews: [],
        ...overrides,
    };
};

export default restaurantFactory;