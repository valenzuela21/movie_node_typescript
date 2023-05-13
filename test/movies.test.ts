import request from "supertest";
import app from "../src/app";
import {describe, it} from "node:test";

describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/movie/list")
            .expect(201);
    });
});