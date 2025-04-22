import { BadRequestError } from "errors/bad-request.error";
import { NotFoundError } from "errors/not-found.error";
import { Types } from "mongoose";
import { ErrorHandlerService } from "services/error-handler.service";
import {
  Mascot,
  MascotDocument,
  MascotMessageResponse,
} from "mascots/mascot.model";
import { MascotRepository } from "mascots/mascot.repository";

export class MascotService {
  private mascotRepository = new MascotRepository();
  private errorHandler = new ErrorHandlerService();

  async createMascot(data: Mascot): Promise<MascotMessageResponse> {
    try {
      const mascot = await this.mascotRepository.createMascot(data);
      return { message: "Mascota created successfully", data: mascot };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getMascots(): Promise<MascotDocument[]> {
    try {
      const mascots = await this.mascotRepository.getMascots();
      return mascots;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async updateMascot(
    id: string,
    data: MascotDocument
  ): Promise<MascotMessageResponse> {
    try {
      if (!data) {
        throw new BadRequestError("data not provided");
      }
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const updatedMascot = await this.mascotRepository.updateMascot(id, data);
      if (!updatedMascot) {
        throw new NotFoundError("mascota not found");
      }
      return { message: "Mascota updated successfully", data: updatedMascot };
    } catch (error) {
      const newError = this.errorHandler.handleError(error as Error);
      throw newError;
    }
  }

  async deleteMascot(id: string): Promise<MascotMessageResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Invalid id");
      }

      const mascot = await this.mascotRepository.deleteMascot(id);
      if (!mascot) {
        throw new NotFoundError("Mascot not found");
      }

      return { message: "Mascot deleted successfully", data: mascot };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
