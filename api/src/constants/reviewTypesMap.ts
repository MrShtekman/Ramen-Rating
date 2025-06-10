import RamenReview from "../schemas/reviews/RamenReview";
import RestaurantReview from "../schemas/reviews/RestaurantReview";
import Ramen from "../schemas/Ramen";
import Restaurant from "../schemas/Restaurant";

export const reviewTypeToSchema = {
    restaurant: RestaurantReview,
    ramen: RamenReview,
} as const;

export const reviewTypeToTargetModel = {
    restaurant: Restaurant,
    ramen: Ramen,
} as const;

export type ReviewType = keyof typeof reviewTypeToSchema;