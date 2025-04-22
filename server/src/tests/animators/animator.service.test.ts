import { AnimatorRepository } from "../../animators/animator.repository";
import { AnimatorService } from "../../animators/animator.service";
import { ErrorHandlerService } from "../../services/error-handler.service";

import { newAnimator, newAnimatorDocument } from "../../../mocks/mock-data";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";
import { DatabaseError } from "../../errors/database.error";
import { HttpError } from "../../errors/http.error";

jest.mock("../../animators/animator.repository");

describe("Animators Service With Error Handler Service", () => {
  let animatorService: AnimatorService;
  let errorHandlerService: ErrorHandlerService;
  let mockAnimatorRepository: jest.Mocked<AnimatorRepository>;

  beforeAll(() => {
    // mock the animator repository
    mockAnimatorRepository =
      new AnimatorRepository() as jest.Mocked<AnimatorRepository>;
    (AnimatorRepository as jest.Mock).mockImplementation(
      () => mockAnimatorRepository
    );

    errorHandlerService = new ErrorHandlerService();
    animatorService = new AnimatorService();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /animators", () => {
    it("should create a new animator", async () => {
      mockAnimatorRepository.createAnimator.mockResolvedValue(
        newAnimatorDocument
      );

      const result = await animatorService.createAnimator(newAnimator);

      expect(result).toEqual({
        message: "Animator created successfully",
        data: newAnimatorDocument,
      });
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle unique constraint error", async () => {
      const error = new UniqueConstraintError("email", "unique");
      mockAnimatorRepository.createAnimator.mockRejectedValue(error);

      await expect(animatorService.createAnimator(newAnimator)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledTimes(1);
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
    });

    it("should handle database error", async () => {
      const error = new DatabaseError("database error");
      mockAnimatorRepository.createAnimator.mockRejectedValue(error);

      await expect(animatorService.createAnimator(newAnimator)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledTimes(1);
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
    });

    it("should handle unknown error", async () => {
      const error = new Error("unknown");
      mockAnimatorRepository.createAnimator.mockRejectedValue(error);

      await expect(animatorService.createAnimator(newAnimator)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledTimes(1);
      expect(mockAnimatorRepository.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
    });
  });
});
