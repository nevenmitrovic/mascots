import { Types } from "mongoose";
import bcrypt from "bcryptjs";

import { AnimatorRepository } from "animators/animator.repository";

import { ErrorHandlerService } from "services/error-handler.service";

import { BadRequestError } from "errors/bad-request.error";
import { NotFoundError } from "errors/not-found.error";

import {
  IAnimator,
  IAnimatorDocument,
  IAnimatorMessageResponse,
} from "animators/animator.model";

export class AnimatorService {
  private animatorRepository = new AnimatorRepository();
  private errorHandler = new ErrorHandlerService();

  async createAnimator(data: IAnimator): Promise<IAnimatorMessageResponse> {
    try {
      const { password, ...rest } = data;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const res = await this.animatorRepository.createAnimator({
        ...rest,
        password: hashedPassword,
      });
      return { message: "Animator created successfully", data: res };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getAnimators(): Promise<Partial<IAnimatorDocument>[]> {
    try {
      const res = await this.animatorRepository.getAnimators();
      return res;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getAnimatorById(id: string): Promise<Partial<IAnimatorDocument>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const animator = await this.animatorRepository.getAnimatorById(id);
      if (!animator) {
        throw new NotFoundError("animator not found");
      }

      return animator;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async updateAnimator(
    id: string,
    data: IAnimator
  ): Promise<IAnimatorMessageResponse> {
    try {
      if (!data) {
        throw new BadRequestError("data not provided");
      }
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const updatedAnimator = await this.animatorRepository.updateAnimator(
        id,
        data
      );
      if (!updatedAnimator) {
        throw new NotFoundError("animator not found");
      }
      return {
        message: "animator updated successfully",
        data: updatedAnimator,
      };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async deleteAnimator(id: string): Promise<IAnimatorMessageResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const deletedAnimator = await this.animatorRepository.deleteAnimator(id);
      if (!deletedAnimator) {
        throw new NotFoundError("animator not found");
      }
      return {
        message: "animator deleted successfully",
        data: deletedAnimator,
      };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
