import { IReport, IReportDocument, ReportModel } from "reports/report.model";
import { checkForErrors, getRangeForDates } from "utils/globalUtils";

export class ReportRepository {
  private reportModel = ReportModel;

  async getReportsForAnimator(id: string): Promise<IReport[] | null> {
    try {
      const reports = await this.reportModel
        .find({ animatorId: id })
        .lean<IReport[]>();

      if (!reports || reports.length === 0) return null;

      return reports;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getReportForAnimator(
    id: string,
    year: number,
    month: number
  ): Promise<IReport | null> {
    try {
      const { from, to } = getRangeForDates(year, month);

      const report = await this.reportModel
        .find({
          animatorId: id,
          payPeriod: {
            $gte: from,
            $lt: to,
          },
        })
        .lean<IReport>()
        .exec();

      if (!report) return null;

      return report;
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
