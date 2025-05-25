import { NextFunction, Request, Response } from "express";

import { Controller } from "interfaces/controller.interface";

import { ReportService } from "reports/report.service";
import { reportPatchSchema } from "reports/report.validate";
import { validationMiddleware } from "middlewares/validate.middleware";
import { authMiddleware } from "middlewares/auth.middleware";
import { authorizeMiddleware } from "middlewares/authorize.middleware";

export class ReportController extends Controller {
  private reportService = new ReportService();
  private patchSchema = reportPatchSchema;

  constructor() {
    super("/reports");
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router
      .route(`${this.path}/:year/:month/:id`)
      .post(
        authMiddleware,
        authorizeMiddleware(["admin"]),
        (req: Request, res: Response, next: NextFunction) =>
          this.getReportForLastMonth(req, res, next)
      );

    this.router
      .route(`${this.path}/:year/:month/:id`)
      .get(
        authMiddleware,
        authorizeMiddleware(["admin"]),
        (req: Request, res: Response, next: NextFunction) =>
          this.getCurrentMonthReport(req, res, next)
      );
  }

  async getReportForLastMonth(req: Request, res: Response, next: NextFunction) {
    try {
      const { year, month, id } = req.params;

      const report = await this.reportService.getReportForLastMonth(
        Number(year),
        Number(month),
        id
      );

      return res.status(201).json(report);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentMonthReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { year, month, id } = req.params;

      const report = await this.reportService.getCurrentMonthReport(
        Number(year),
        Number(month),
        id
      );

      return res.status(200).json(report);
    } catch (err) {
      next(err);
    }
  }
}
