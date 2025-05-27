import dayjs from "dayjs";
import { IReport, IReportDocument, ReportModel } from "reports/report.model";
import { checkForErrors, getRangeForDates } from "utils/globalUtils";

export class ReportRepository {
  private reportModel = ReportModel;

  async getReportsForAnimator(id: string): Promise<IReportDocument[] | null> {
    try {
      const reports = await this.reportModel
        .find({ animatorId: id })
        .lean<IReportDocument[]>();

      if (!reports || reports.length === 0) return null;

      return reports;
    } catch (err) {
      return checkForErrors(err as Error);
    }
  }

  // method can be called only if the month is in the past - disable button on client side
  async getReportForAnimator(
    id: string,
    year: number,
    month: number
  ): Promise<IReportDocument | null> {
    try {
      // checking if the requested month is in the future
      if (month > dayjs().get("month") + 1) return null;

      const { from, to } = getRangeForDates(year, month);

      const reports = await this.reportModel
        .find({
          animatorId: id,
          payPeriod: {
            $gte: from,
            $lt: to,
          },
        })
        .lean<IReportDocument[]>()
        .exec();

      if (!reports || reports.length === 0) return null;

      const report = reports[0];

      return {
        ...report,
        _id: report._id.toString(),
      };
    } catch (err) {
      return checkForErrors(err as Error);
    }
  }

  async createReportForAnimator(data: IReport): Promise<IReportDocument> {
    try {
      const report = (await this.reportModel.create(data)).toObject();

      return {
        ...report,
        _id: report._id.toString(),
      };
    } catch (err) {
      return checkForErrors(err as Error);
    }
  }

  async patchReport(
    id: string,
    data: Pick<IReport, "paid">,
    year: number,
    month: number
  ): Promise<IReportDocument | null> {
    try {
      const { from, to } = getRangeForDates(year, month);

      const report = await this.reportModel
        .findOneAndUpdate(
          {
            animatorId: id,
            payPeriod: {
              $gte: from,
              $lt: to,
            },
          },
          {
            $set: data,
          },
          {
            new: true,
            runValidators: true,
          }
        )
        .lean<IReportDocument>()
        .exec();

      if (!report) return null;

      return {
        ...report,
        _id: report._id.toString(),
      };
    } catch (err) {
      return checkForErrors(err as Error);
    }
  }
}
