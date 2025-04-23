import { Types } from "mongoose";
import dayjs from "dayjs";

const ramenFactory = (overrides = {}) => {
    return {
        name: "Test Ramen",
        price: 10,
        restaurant: new Types.ObjectId(),
        rating: 5,
        created: dayjs(),
        reviews: [],
        flavor: {
            saltiness: 5,
            spiciness: 5,
            sweetness: 5,
            umami: 5,
            bitterness: 5,
        },
        components: {
            broth: "Pork Bone",
            toppings: ["Chashu Pork", "Soft-boiled Egg", "Green Onion", "Seaweed"],
            noodles: "Thin",
        },
        ...overrides,
    };
};

export default ramenFactory;