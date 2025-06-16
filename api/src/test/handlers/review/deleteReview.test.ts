import { Types } from "mongoose";
import supertest from "supertest";

import restaurantFactory from "../../../utils/factories/restaurantFactory";
import reviewFactory from '../../../utils/factories/reviewFactory';

import Restaurant from "../../../schemas/Restaurant";
import Review from "../../../schemas/reviews/Review";

import reviewTypes from '../../../constants/reviewTypes';

import app from "../../../app";

describe("Delete Review", () => {
    let restaurantId: Types.ObjectId;
    let reviewId: Types.ObjectId;
    let secondReviewId: Types.ObjectId;
    let noSubjectReviewId: Types.ObjectId;

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        reviewId = new Types.ObjectId();
        secondReviewId = new Types.ObjectId();
        noSubjectReviewId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
            reviews: [reviewId, secondReviewId],
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
    test("Should delete a review and remove itself from the subject it belongs to", async () => {
        const response = await supertest(app)
            .delete(`/review/${reviewId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Review successfully deleted!");

        const updatedRestaurant = await Restaurant.findById(restaurantId);
        if(!updatedRestaurant) {
            throw new Error("Restaurant not found");
        }
        expect(updatedRestaurant.reviews).toHaveLength(1);
        expect(updatedRestaurant.reviews).not.toContain(reviewId);
    });
    test("Should throw error 400 if the review ID is invalid", async () => {
        const invalidReviewId = "This is an invalidId";

        const response = await supertest(app)
            .delete(`/review/${invalidReviewId}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid review ID");
    });
    test("Should throw error 404 if the review does not exist", async () => {
        const invalidReviewId = new Types.ObjectId();

        const response = await supertest(app)
            .delete(`/review/${invalidReviewId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Review not found!");
    });
    test("Should throw error 404 if the subject of the review does not exist", async () => {
        await Review.create(reviewFactory(reviewTypes.RESTAURANT, {
            _id: noSubjectReviewId,
            comment: "This is so bad!",
        }));

        const response = await supertest(app)
            .delete(`/review/${noSubjectReviewId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Subject of the review not found!");
    });
});