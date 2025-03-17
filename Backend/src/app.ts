import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
const app: Express = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes 
import userRouter from "./routes/user.route"
import cartRouter from "./routes/cart.route"
import bookingRouter from "./routes/booking.route"
import serviceRouter from "./routes/service.route"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/booking", bookingRouter)
app.use("/api/v1/service", serviceRouter)


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


export default app;