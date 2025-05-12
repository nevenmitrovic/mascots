import { checkForErrors } from "utils/globalUtils";

import {
  IAnimator,
  IAnimatorDocument,
  AnimatorModel,
} from "animators/animator.model";

export class AnimatorRepository {
  private readonly animatorModel = AnimatorModel;

  async createAnimator(data: IAnimator): Promise<Partial<IAnimatorDocument>> {
    try {
      const res = await this.animatorModel.create(data);
      const { _id, password, ...rest } = res.toObject();
      return {
        ...rest,
        _id: _id.toString(),
      };
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getAnimators(): Promise<Partial<IAnimatorDocument>[]> {
    try {
      return this.animatorModel.find({}, { password: 0 });
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getAnimatorById(
    id: string
  ): Promise<Partial<IAnimatorDocument> | null> {
    try {
      const animator = await this.animatorModel
        .findById(id, { password: 0 })
        .lean();

      if (!animator) return null;

      return {
        ...animator,
        _id: animator._id.toString(),
      } as Partial<IAnimatorDocument>;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async updateAnimator(
    id: string,
    data: Partial<IAnimator>
  ): Promise<Partial<IAnimatorDocument> | null> {
    try {
      const res = await this.animatorModel
        .findByIdAndUpdate(id, data, {
          new: true,
          timestamps: false,
        })
        .lean();

      if (res) {
        const { password, _id, ...rest } = res;
        return {
          ...rest,
          _id: _id.toString(),
        };
      }

      return res;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async deleteAnimator(id: string): Promise<Partial<IAnimatorDocument> | null> {
    try {
      const res = await this.animatorModel.findByIdAndDelete(id).lean();

      if (res) {
        const { password, _id, ...rest } = res;
        return {
          ...rest,
          _id: _id.toString(),
        };
      }

      return res;
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
