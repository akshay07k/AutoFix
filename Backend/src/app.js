import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import session from 'express-session';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(
  session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
  })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes 
import userRouter from "./routes/user.route.js"
import cartRouter from "./routes/cart.route.js"
import bookingRouter from "./routes/booking.route.js"
import serviceRouter from "./routes/service.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/book", bookingRouter)
app.use("/api/v1/service", serviceRouter)


app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});


export default app;