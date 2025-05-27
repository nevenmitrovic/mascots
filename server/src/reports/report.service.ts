import { Types } from "mongoose";
import dayjs from "dayjs";

import { EventRepository } from "events/event.repository";
import { ReportRepository } from "reports/report.repository";
import { IReport, IReportDocument } from "reports/report.model";
import { AnimatorRepository } from "animators/animator.repository";

import { BadRequestError } from "errors/bad-request.error";
import { NotFoundError } from "errors/not-found.error";

import { ErrorHandlerService } from "services/error-handler.service";
import { IAnimatorDocument } from "animators/animator.model";

export class ReportService {
  private eventRepository = new EventRepository();
  private reportRepository = new ReportRepository();
  private animatorRepository = new AnimatorRepository();
  private errorHandler = new ErrorHandlerService();

  async getCurrentMonthReport(
    year: number,
    month: number,
    id: string
  ): Promise<IReport> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const animator = await this.animatorRepository.getAnimatorById(id);
      if (!animator) throw new NotFoundError("animator not found");

      const report = await this.getPaycheckForAnimator(
        animator,
        year,
        month,
        id
      );

      return report;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getReportForLastMonth(
    year: number,
    month: number,
    id: string
  ): Promise<IReportDocument> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const animator = await this.animatorRepository.getAnimatorById(id);
      if (!animator) throw new NotFoundError("animator not found");

      const report = await this.reportRepository.getReportForAnimator(
        id,
        year,
        month
      );
      if (!report) {
        const reportData = await this.getPaycheckForAnimator(
          animator,
          year,
          month,
          id
        );

        // Create a new report if it doesn't exist
        const newReport = await this.reportRepository.createReportForAnimator(
          reportData
        );
        return newReport;
      }

      return report;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  private async getPaycheckForAnimator(
    animator: Omit<IAnimatorDocument, "password">,
    year: number,
    month: number,
    id: string
  ): Promise<IReport> {
    try {
      let countAnimatorEvents = 0;
      let animatorEarned = 0;
      let animatorOwe = 0;

      const events = await this.eventRepository.getEvents(year, month);
      if (events.length == 0)
        throw new NotFoundError("events for provided date range not found");

      events.forEach((event) => {
        // count the number of animator events for a specific month
        event.animators.forEach(
          (animator) => animator._id.toString() === id && countAnimatorEvents++
        );
        // sum the animator's paycheck for a specific month
        event.collector.forEach(
          (collector) =>
            collector._id.toString() === id && (animatorOwe += event.price)
        );
      });

      animatorEarned = animator.paycheck * countAnimatorEvents;
      const paycheck = animatorEarned - animatorOwe;

      const reportData: IReport = {
        animatorId: id,
        payPeriod: dayjs()
          .year(year)
          .month(month - 1)
          .date(1)
          .toDate(),
        paid: false,
        total: paycheck,
      };

      return reportData;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  private async createReportForAnimator(
    data: IReport
  ): Promise<IReportDocument> {
    try {
      if (!data) throw new BadRequestError("data missing");
      if (!Types.ObjectId.isValid(data.animatorId)) {
        throw new BadRequestError("invalid id");
      }

      const createdReport = await this.reportRepository.createReportForAnimator(
        data
      );

      return createdReport;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async patchReport(
    id: string,
    data: Pick<IReport, "paid">,
    year: number,
    month: number
  ): Promise<IReportDocument> {
    try {
      if (!data) throw new BadRequestError("data missing");
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const patchedReport = await this.reportRepository.patchReport(
        id,
        data,
        year,
        month
      );
      if (!patchedReport) throw new NotFoundError("report not found");

      return patchedReport;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
