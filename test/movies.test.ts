import request from "supertest";
import app from "../src/app";

describe("GET /api", () => {
    it("should return 201 OK", () => {
        return request(app).get("/api/movie/list")
            .expect(201);
    });
});