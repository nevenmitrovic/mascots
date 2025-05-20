import { AuthRepository } from "auth/auth.repository";
import { env } from "config/env";

import { IAnimatorDocument } from "animators/animator.model";
import { AnimatorRepository } from "animators/animator.repository";
import { ErrorHandlerService } from "services/error-handler.service";

import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { BadRequestError } from "errors/bad-request.error";
import { UnauthorizedError } from "errors/unauthorized.error";
import { NotFoundError } from "errors/not-found.error";

interface LoginResponse {
  token: string;
  user: Omit<IAnimatorDocument, "password">;
}

export class AuthService {
  private readonly authRepository = new AuthRepository();
  private readonly animatorRepository = new AnimatorRepository();
  private errorHandler = new ErrorHandlerService();

  async login(username: string, pass: string): Promise<LoginResponse> {
    try {
      const animator = await this.authRepository.getAnimatorByUsername(
        username
      );

      if (!animator) {
        throw new UnauthorizedError("invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(pass, animator.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError("invalid credentials");
      }

      const token = this.createToken(animator._id.toString());
      const { password, ...user } = animator;
      return {
        token,
        user: user,
      };
    } catch (err) {
      this.errorHandler.handleError(err as Error);
      throw err;
    }
  }

  public createToken(id: string): string {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestError("invalid id");
    }

    return jwt.sign({ _id: id }, env.SECRET_KEY, { expiresIn: "1h" });
  }

  private removePassword(
    animator: Partial<IAnimatorDocument>
  ): Partial<IAnimatorDocument> {
    const { password, ...rest } = animator;
    return rest;
  }

  async isLoggedIn(id: string): Promise<Partial<IAnimatorDocument>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new UnauthorizedError("user not logged in");
      }

      const animator = await this.animatorRepository.getAnimatorById(id);
      if (!animator) {
        throw new NotFoundError("animator not found");
      }

      return this.removePassword(animator);
    } catch (err) {
      this.errorHandler.handleError(err as Error);
      throw err;
    }
  }
}
