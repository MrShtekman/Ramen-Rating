import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import Restaurant from "../../../schemas/Restaurant";
import Ramen from "../../../schemas/Ramen";

import ramenFactory from "../../../utils/factories/ramenFactory";
import restaurantFactory from "../../../utils/factories/restaurantFactory";

describe("Delete Ramen", () => {
    let restaurantId: Types.ObjectId;
    let ramenId: Types.ObjectId;

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        ramenId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
            ramen: [ramenId],
        }));
    })
    test("Should delete a ramen", async () => {
        const ramenToDelete = Ramen.create(ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
        }));

        const response = await supertest(app)
            .delete(`/ramen/${ramenId}`)

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen successfully deleted!");

        const updatedRestaurant = await Restaurant.findById(restaurantId);
        if(!updatedRestaurant) {
            throw new Error("Restaurant not found");
        }
        expect(updatedRestaurant.ramen).toHaveLength(0);
    })
})