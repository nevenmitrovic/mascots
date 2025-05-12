import { checkForErrors } from "utils/globalUtils";

import { AnimatorModel, IAnimatorDocument } from "animators/animator.model";

export class AuthRepository {
  private readonly animatorModel = AnimatorModel;

  async getAnimatorByUsername(
    username: string
  ): Promise<IAnimatorDocument | null> {
    try {
      const animator = await this.animatorModel.findOne({ username }).lean();

      if (!animator) return null;

      return {
        ...animator,
        _id: animator._id.toString(),
      };
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
