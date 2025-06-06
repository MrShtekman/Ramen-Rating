import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import restaurantFactory from "../../../utils/factories/restaurantFactory";

describe("Add Restaurant", () => {
    test("Should creat a new restaurant", async () => {
        const restaurantId = new Types.ObjectId();

        const restaurant = restaurantFactory({
            _id: restaurantId,
        });

        const response = await supertest(app)
            .post("/restaurant")
            .send(restaurant);
        
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant created successfully");
    });
})