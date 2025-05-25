import { Types } from "mongoose";

import { EventRepository } from "events/event.repository";
import { ReportRepository } from "reports/report.repository";
import { IReport, IReportDocument } from "reports/report.model";
import { AnimatorRepository } from "animators/animator.repository";

import { BadRequestError } from "errors/bad-request.error";
import { NotFoundError } from "errors/not-found.error";

import { ErrorHandlerService } from "services/error-handler.service";

class ReportService {
  private eventRepository = new EventRepository();
  private reportRepository = new ReportRepository();
  private animatorRepository = new AnimatorRepository();
  private errorHandler = new ErrorHandlerService();

  async getReportForAnimator(
    id: string,
    year: number,
    month: number
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
        let countAnimatorEvents = 0;
        let animatorEarned = 0;
        let animatorOwe = 0;

        const events = await this.eventRepository.getEvents(year, month);

        events.forEach((event) => {
          // count the number of animator events for a specific month
          event.animators.forEach(
            (animator) => animator._id.includes(id) && countAnimatorEvents++
          );

          // sum the animator's paycheck for a specific month
          event.collector.forEach(
            (collector) =>
              collector._id.includes(id) && (animatorOwe += event.price)
          );
        });

        animatorEarned = animator.paycheck * countAnimatorEvents;
        const paycheck = animatorEarned - animatorOwe;

        // TO DO: LOGIC FOR CREATE REPORT
      }

      return report;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async createReportForAnimator(data: IReport): Promise<IReportDocument> {
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
}
