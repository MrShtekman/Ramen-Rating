import { Types } from "mongoose";
import supertest from "supertest";

import Restaurant from "../../../schemas/Restaurant";

import restaurantFactory from "../../../utils/factories/restaurantFactory";

import app from "../../../app";

describe("Update Restaurant", () => {
    let restaurantId: Types.ObjectId;

    const newFields = {
        name: "Dodgy Dave's Diner",
        location: "123 Fake Street, Faketown",
    };

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
        }));
    });

    test("Should update a restaurant", async () => {
        const response = await supertest(app)
            .put(`/restaurant/${restaurantId}`)
            .send(newFields);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant updated successfully!");

        const updatedRestaurant = await Restaurant.findById(restaurantId);
        if (!updatedRestaurant) {
            throw new Error("Restaurant not found");
        }
        expect(updatedRestaurant.name).toBe("Dodgy Dave's Diner");
        expect(updatedRestaurant.location).toBe("123 Fake Street, Faketown");
    });
    test("Should throw error 400 if the restaurant ID is invalid", async () => {
        const invalidRestaurantId = "Look at me, I'm not a valid restaurant ID!";

        const response = await supertest(app)
            .put(`/restaurant/${invalidRestaurantId}`)
            .send(newFields);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid restaurant ID");
    });
    test("Should throw error 404 if the restaurant does not exist", async () => {
        const nonExistentRestaurantId = new Types.ObjectId();

        const response = await supertest(app)
            .put(`/restaurant/${nonExistentRestaurantId}`)
            .send(newFields);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant not found");
    })
});