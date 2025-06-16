import { Types } from "mongoose";
import supertest from "supertest";

import restaurantFactory from "../../../utils/factories/restaurantFactory";
import reviewFactory from '../../../utils/factories/reviewFactory';

import Restaurant from "../../../schemas/Restaurant";
import Review from "../../../schemas/reviews/Review";
import RestaurantReview, { IRestaurantReview } from "../../../schemas/reviews/RestaurantReview";

import reviewTypes from '../../../constants/reviewTypes';

import app from "../../../app";

describe("Update Review", () => {
    let restaurantId: Types.ObjectId;
    let reviewId: Types.ObjectId;

    const newFields = {
        comment: "Soo bad!",
        rating: 3
    }

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        reviewId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
            reviews: [reviewId],
        }));        

        await RestaurantReview.create(reviewFactory(reviewTypes.RESTAURANT, {
            _id: reviewId,
            comment: "Sooo goood!",
            subject: restaurantId,
            rating: 9
        }));
    });

    test("Should update a review", async () => {
        const response = await supertest(app)
            .put(`/review/${reviewId}`)
            .send(newFields);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Review updated successfully!");

        const updatedReview = await Review.findById(reviewId) as IRestaurantReview;
        if (!updatedReview) {
            throw new Error("Review not found");
        }
        expect(updatedReview.comment).toBe("Soo bad!");
        expect(updatedReview.rating).toBe(3);
    });
    test("Should throw error 400 if the review ID is invalid", async () => {
        const invalidReviewId = "This is an invalidId";

        const response = await supertest(app)
            .put(`/review/${invalidReviewId}`)
            .send(newFields);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid review ID");
    });
    test("Should throw error 404 if the review does not exist", async () => {
        const nonExistentReviewId = new Types.ObjectId();

        const response = await supertest(app)
            .put(`/review/${nonExistentReviewId}`)
            .send(newFields);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Review not found");
    });
});