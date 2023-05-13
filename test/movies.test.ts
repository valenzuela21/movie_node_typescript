import request from "supertest";
import app from "../src/app";

describe("Movies", () => {
    it("All Movies list return 201 OK", () => {
        return request(app).get("/api/movie/list")
            .expect(201);
    });

    it("Insert Movie return 401 Not Auth Header", function(done) {
        const payload = {title: "New Title of test node"};
        request(app)
            .post("/api/movie")
            .send(payload) // x-www-form-urlencoded upload
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(401, {
                msg: "No hay token en la petición"
            }, done);
    });

    it("Insert Movie return 201", function(done) {
        const payload = {title: "New Title of test node 1"};
        const myToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDVkMDdkMWJkNTFiZWJkYWViMzYyMGQiLCJpYXQiOjE2ODM5NTYzOTksImV4cCI6MTY4Mzk3MDc5OX0.XQx43WAkwrWDVmZiA7JLSN4QG7A7jXs5Nc-GaBjFcNQ";
        request(app)
            .post("/api/movie")
            .send(payload) // x-www-form-urlencoded upload
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("x-token", myToken)
            .expect(201, {
                msg: "Se ha creado nueva movie"
            }, done);
    });
});