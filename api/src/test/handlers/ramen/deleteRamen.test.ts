import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import Restaurant from "../../../schemas/Restaurant";
import Ramen from "../../../schemas/Ramen";
import Review from "../../../schemas/reviews/Review";

import ramenFactory from "../../../utils/factories/ramenFactory";
import restaurantFactory from "../../../utils/factories/restaurantFactory";
import reviewFactory from '../../../utils/factories/reviewFactory';

import reviewTypes from '../../../constants/reviewTypes';

describe("Delete Ramen", () => {
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
        }));

        await Ramen.create(ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
            reviews: [reviewId, secondReviewId],
        }));

        await Review.create(reviewFactory(reviewTypes.RAMEN, {
            _id: reviewId,
            comment: "Sooo goood!",
            subject: ramenId,
        }));

        await Review.create(reviewFactory(reviewTypes.RAMEN, {
            _id: secondReviewId,
            comment: "This is so bad!",
            subject: ramenId,
        }));
    });
    test("Should delete a ramen and its reviews and remove it from the restaurant it belongs to", async () => {
        const response = await supertest(app)
            .delete(`/ramen/${ramenId}`)    
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen deleted successfully!");
        
        const deletedRamen = await Ramen.findById(ramenId);
        expect(deletedRamen).toBeNull();
        
        const updatedRestaurant = await Restaurant.findById(restaurantId);
        if(!updatedRestaurant) {
            throw new Error("Restaurant not found");
        }
        expect(updatedRestaurant.ramen).toHaveLength(0);
        
        const deletedReview = await Review.find({ _id: { $in: [reviewId, secondReviewId] }});
        expect(deletedReview).toHaveLength(0);
    });
    test("Should throw error 400 if the ramen ID is invalid", async () => {
        const invalidRamentId = "Look at me, I'm an invalid ID!";

        const response = await supertest(app)
            .delete(`/ramen/${invalidRamentId}`);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid ramen ID");

    });
    test("Should throw error 404 if the ramen does not exist", async () => {
        const nonExistentRamenId = new Types.ObjectId();

        const response = await supertest(app)
            .delete(`/ramen/${nonExistentRamenId}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen not found!");
    });
    test("Shoud throw error 404 if the restaurant related to the ramen does not exist", async () => {
        const nonExistentRestaurantId = new Types.ObjectId();
        const faultyRamenId = new Types.ObjectId();

        await Ramen.create(ramenFactory({
            _id: faultyRamenId,
            restaurant: nonExistentRestaurantId,
        }));

        const response = await supertest(app)
            .delete(`/ramen/${faultyRamenId}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant related to this Ramen not found!");
    });
})