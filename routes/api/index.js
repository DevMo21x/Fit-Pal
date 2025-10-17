import express from "express";
import eventsRouter from "./events.js";
import usersRouter from "./users.js";
const router = express.Router();

router.use("/events", eventsRouter);
router.use("/users", usersRouter);
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

export default router;
