import express, { Router, Request, Response, RequestHandler } from "express";
import { PhoneSystemType } from "../db/models/PhoneSystemType";
const router: Router = express.Router();

/* GET home page. */
router.get("/", (async (_req: Request, res: Response) => {
  try {
    const types = await PhoneSystemType.findAll();
    console.log(types);
    res.render("index", { title: "Express" });
  } catch (err) {
    console.error(err);
  }
}) as RequestHandler);

export default router;
