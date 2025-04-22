import { checkForErrors } from "utils/globalUtils";

import {
  IAnimator,
  IAnimatorDocument,
  AnimatorModel,
} from "animators/animator.model";

export class AnimatorRepository {
  private readonly animatorModel = AnimatorModel;

  async createAnimator(data: IAnimator): Promise<IAnimatorDocument> {
    try {
      const res = await this.animatorModel.create(data);
      return {
        ...res.toObject(),
        _id: res._id.toString(),
      } as IAnimatorDocument;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getAnimators(): Promise<IAnimatorDocument[]> {
    try {
      return this.animatorModel.find({});
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getAnimatorById(id: string): Promise<IAnimatorDocument | null> {
    try {
      return this.animatorModel.findById(id);
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async updateAnimator(
    id: string,
    data: IAnimator
  ): Promise<IAnimatorDocument | null> {
    try {
      return this.animatorModel.findByIdAndUpdate(id, data, {
        new: true,
        timestamps: false,
      });
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async deleteAnimator(id: string): Promise<IAnimatorDocument | null> {
    try {
      return this.animatorModel.findByIdAndDelete(id);
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
