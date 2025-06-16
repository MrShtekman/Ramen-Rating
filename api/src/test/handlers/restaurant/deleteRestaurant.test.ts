import { Types } from "mongoose";
import supertest from "supertest";

import app from "../../../app";

import Restaurant from "../../../schemas/Restaurant";
import Ramen from "../../../schemas/Ramen";
import Review from "../../../schemas/reviews/Review";

import ramenFactory from "../../../utils/factories/ramenFactory";
import restaurantFactory from "../../../utils/factories/restaurantFactory";
import reviewFactory from '../../../utils/factories/reviewFactory';

import reviewTypes from '../../../constants/reviewTypes';

describe("Delete Restaurant", () => {
    let restaurantId: Types.ObjectId;
    let ramenId: Types.ObjectId;
    let reviewId: Types.ObjectId;
    let secondReviewId: Types.ObjectId;

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        ramenId = new Types.ObjectId();
        reviewId = new Types.ObjectId();
        secondReviewId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
            ramen: [ramenId],
            reviews: [reviewId, secondReviewId],
        }));

        await Ramen.create(ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
        }));

        await Review.create(reviewFactory(reviewTypes.RESTAURANT, {
            _id: reviewId,
            comment: "Sooo goood!",
            subject: restaurantId,
        }));

        await Review.create(reviewFactory(reviewTypes.RESTAURANT, {
            _id: secondReviewId,
            comment: "This is so bad!",
            subject: restaurantId,
        }));
    });

    test("Should delete a restaurant and its ramen and reviews", async () => {
        const response = await supertest(app)
            .delete(`/restaurant/${restaurantId}`)
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant deleted successfully!");

        const deletedRestaurant = await Restaurant.findById(restaurantId);
        expect(deletedRestaurant).toBeNull();

        const deletedRamen = await Ramen.findById(ramenId);
        expect(deletedRamen).toBeNull();

        const deletedReview = await Review.find({ _id: { $in: [reviewId, secondReviewId] }});
        expect(deletedReview).toHaveLength(0);
    });
    test("Should throw error 400 if the restaurant ID is invalid", async () => {
        const invalidRestaurantId = "Look at me, I'm not a valid restaurant ID!";

        const response = await supertest(app)
            .delete(`/restaurant/${invalidRestaurantId}`);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid restaurat ID");
    });
    test("Should throw error 404 if the restaurant does not exist", async () => {
        const nonExistentRestaurantId = new Types.ObjectId();

        const response = await supertest(app)
            .delete(`/restaurant/${nonExistentRestaurantId}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant not found!");
    })
});