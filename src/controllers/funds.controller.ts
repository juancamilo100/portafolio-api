import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import FundDetailsService from '../services/fund.service'

export default class FundsController {
    constructor(private fundDetailService: FundDetailsService) {}

    public getFundDetails: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const details = await this.fundDetailService.getPrice(req.params.fund);
            res.send(details);
        } catch (error) {
            next(createError(500));
        }
    }
}