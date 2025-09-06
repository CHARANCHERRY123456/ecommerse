import express from 'express'
import authRouter from './authRouter.js'
import itemRouter from './itemRouter.js'

const router = express.Router()


router.use("/auth" , authRouter);
router.use("/items" , itemRouter);


export default router;