import { Types } from "mongoose";
import supertest from "supertest";

import Restaurant from "../../../schemas/Restaurant";
import Ramen from "../../../schemas/Ramen";

import restaurantFactory from "../../../utils/factories/restaurantFactory";
import ramenFactory from "../../../utils/factories/ramenFactory";

import app from "../../../app";

describe("Update ramen", () => {
    let restaurantId: Types.ObjectId;
    let ramenId: Types.ObjectId;

    const newFields = {
        name: "New ramen",
        price: 12,
    };

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        ramenId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
        }));

        await Ramen.create(ramenFactory({
            _id: ramenId,
            name: "Old ramen",
            price: 10,
            restaurant: restaurantId,
        }));
    });

    test("Should update a ramen", async () => {
        const response = await supertest(app)
            .put(`/ramen/${ramenId}`)
            .send(newFields);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen updated successfully");

        const updatedRamen = await Ramen.findById(ramenId);
        if (!updatedRamen) {
            throw new Error("Ramen not found");
        }
        expect(updatedRamen.name).toBe("New ramen");
        expect(updatedRamen.price).toBe(12);
    });
    test("Should throw error 400 if the ramen ID is invalid", async () => {
        const invalidRamenId = "Look at me, I'm not a valid ID!";

        const response = await supertest(app)
            .put(`/ramen/${invalidRamenId}`)
            .send(newFields);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid ramen ID");
    });
    test("Should throw error 404 if the ramen does not exist", async () => {
        const nonExistentRamenId = new Types.ObjectId();

        const response = await supertest(app)
            .put(`/ramen/${nonExistentRamenId}`)
            .send(newFields);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen not found");
    });
});