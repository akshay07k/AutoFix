import dbConnect from "@/db/dbConnect";
import dotenv from "dotenv";
import app from "@/app";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;

dbConnect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((error) => {
    console.error("Error connecting to database: ", error);
    process.exit(1);
});