import request from "supertest";
import app, {paths} from "../src/app";

describe("Comments", () => {

    it("Remove Comment return 201 OK", function(done) {
        let id_product = '645e41ca8dfd41d2cc3a845b';
        /*Note: Ve auth/login para recuperar el nuevo token*/
        const myToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDVkMDdkMWJkNTFiZWJkYWViMzYyMGQiLCJpYXQiOjE2ODM5NTYzOTksImV4cCI6MTY4Mzk3MDc5OX0.XQx43WAkwrWDVmZiA7JLSN4QG7A7jXs5Nc-GaBjFcNQ";

        request(app).get(`${paths.comment}/${id_product}`)
            .set("x-token", myToken)
            .expect(201,{
                msg: "Se ha eliminado correctamente el item de comentarios"
            }, done);
    });
});