import mongoose, {ConnectOptions} from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions ).then(
        () => {   console.log(
            "Connected to Distribution API Database - Initial Connection"
        ); },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
};


