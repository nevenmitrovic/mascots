import { AnimatorRepository } from "animators/animator.repository";

import { ErrorHandlerService } from "services/error-handler.service";
import {
  IAnimator,
  IAnimatorDocument,
  IAnimatorMessageResponse,
} from "animators/animator.model";

export class AnimatorService {
  private readonly animatorRepository = new AnimatorRepository();
  private readonly errorHandler = new ErrorHandlerService();

  async createAnimator(data: IAnimator): Promise<IAnimatorMessageResponse> {
    try {
      const res = await this.animatorRepository.createAnimator(data);
      return { message: "Animator created successfully", data: res };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
