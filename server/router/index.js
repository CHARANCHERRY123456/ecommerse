import express from 'express'
import authRouter from './authRouter.js'
import itemRouter from './itemRouter.js'
import cartRouter from './cartRouter.js'

const router = express.Router()


router.use("/auth" , authRouter);
router.use("/items" , itemRouter);
router.use("/cart" ,cartRouter);


export default router;