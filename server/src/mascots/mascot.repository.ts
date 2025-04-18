import { checkForErrors } from "../utils/globalUtils";
import { Mascot, MascotDocument, MascotModel } from "./mascot.model";

export class MascotRepository {
  private mascotModel = MascotModel;

  async createMascot(data: Mascot): Promise<MascotDocument> {
    try {
      const res = await this.mascotModel.create(data);
      return {
        ...res,
        _id: res._id.toString(),
      } as MascotDocument;
    } catch (error) {
      return checkForErrors(error);
    }
  }

  async getMascots(): Promise<MascotDocument[]> {
    try {
      return await this.mascotModel.find({});
    } catch (error) {
      return checkForErrors(error);
    }
  }

  async updateMascot(data: MascotDocument): Promise<MascotDocument | null> {
    try {
      return await this.mascotModel.findByIdAndUpdate(data._id, data, {
        new: true,
      });
    } catch (error) {
      return checkForErrors(error);
    }
  }

  async deleteMascot(id: string): Promise<MascotDocument | null> {
    try {
      return await this.mascotModel.findByIdAndDelete(id);
    } catch (error) {
      return checkForErrors(error);
    }
  }
}
