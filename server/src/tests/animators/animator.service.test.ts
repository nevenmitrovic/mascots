import { AnimatorRepository } from "../../animators/animator.repository";
import { AnimatorService } from "../../animators/animator.service";
import { ErrorHandlerService } from "../../services/error-handler.service";

import { newAnimator, newAnimatorDocument } from "../../../mocks/mock-data";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";
import { DatabaseError } from "../../errors/database.error";
import { HttpError } from "../../errors/http.error";
import { BadRequestError } from "../../errors/bad-request.error";

jest.mock("../../animators/animator.repository");

describe("Animators Service With Error Handler Service", () => {
  let animatorService: AnimatorService;
  let errorHandlerService: ErrorHandlerService;
  let mockAnimatorRepository: jest.Mocked<AnimatorRepository>;
  let validId = "67f5237dcaf56ff295efd4a9";
  let invalidId = "invalid-id";

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

  describe("GET /animators", () => {
    it("should get all animators", async () => {
      mockAnimatorRepository.getAnimators.mockResolvedValue([
        newAnimatorDocument,
      ]);

      const result = await animatorService.getAnimators();

      expect(result).toEqual([newAnimatorDocument]);
      expect(mockAnimatorRepository.getAnimators).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const error = new DatabaseError("database error");
      mockAnimatorRepository.getAnimators.mockRejectedValue(error);

      await expect(animatorService.getAnimators()).rejects.toThrow(HttpError);
      expect(mockAnimatorRepository.getAnimators).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const error = new Error("unknown");
      mockAnimatorRepository.getAnimators.mockRejectedValue(error);

      await expect(animatorService.getAnimators()).rejects.toThrow(HttpError);
      expect(mockAnimatorRepository.getAnimators).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /animators/:id", () => {
    it("should get an animator by id", async () => {
      mockAnimatorRepository.getAnimatorById.mockResolvedValue(
        newAnimatorDocument
      );

      const result = await animatorService.getAnimatorById(validId);

      expect(result).toEqual(newAnimatorDocument);
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledTimes(1);
    });

    it("should handle invalid id", async () => {
      await expect(animatorService.getAnimatorById(invalidId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledTimes(0);
    });

    it("should handle not found error", async () => {
      mockAnimatorRepository.getAnimatorById.mockResolvedValue(null);
      await expect(animatorService.getAnimatorById(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const error = new DatabaseError("database error");
      mockAnimatorRepository.getAnimatorById.mockRejectedValue(error);

      await expect(animatorService.getAnimatorById(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const error = new Error("unknown");
      mockAnimatorRepository.getAnimatorById.mockRejectedValue(error);

      await expect(animatorService.getAnimatorById(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.getAnimatorById).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /animators/:id", () => {
    it("should update an animator by id", async () => {
      mockAnimatorRepository.updateAnimator.mockResolvedValue(
        newAnimatorDocument
      );

      const result = await animatorService.updateAnimator(validId, newAnimator);

      expect(result).toEqual({
        message: "animator updated successfully",
        data: newAnimatorDocument,
      });
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const error = new DatabaseError("database error");
      mockAnimatorRepository.updateAnimator.mockRejectedValue(error);

      await expect(
        animatorService.updateAnimator(validId, newAnimator)
      ).rejects.toThrow(HttpError);
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const error = new Error("unknown");
      mockAnimatorRepository.updateAnimator.mockRejectedValue(error);

      await expect(
        animatorService.updateAnimator(validId, newAnimator)
      ).rejects.toThrow(HttpError);
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle invalid id", async () => {
      await expect(
        animatorService.updateAnimator(invalidId, newAnimator)
      ).rejects.toThrow(HttpError);
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledTimes(0);
    });

    it("should handle not found error", async () => {
      mockAnimatorRepository.updateAnimator.mockResolvedValue(null);
      await expect(
        animatorService.updateAnimator(validId, newAnimator)
      ).rejects.toThrow(HttpError);
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
      expect(mockAnimatorRepository.updateAnimator).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /animators/:id", () => {
    it("should delete an animator by id", async () => {
      mockAnimatorRepository.deleteAnimator.mockResolvedValue(
        newAnimatorDocument
      );

      const result = await animatorService.deleteAnimator(validId);

      expect(result).toEqual({
        message: "animator deleted successfully",
        data: newAnimatorDocument,
      });
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const error = new DatabaseError("database error");
      mockAnimatorRepository.deleteAnimator.mockRejectedValue(error);

      await expect(animatorService.deleteAnimator(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const error = new Error("unknown");
      mockAnimatorRepository.deleteAnimator.mockRejectedValue(error);

      await expect(animatorService.deleteAnimator(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledTimes(1);
    });

    it("should handle invalid id", async () => {
      await expect(animatorService.deleteAnimator(invalidId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledTimes(0);
    });

    it("should handle not found error", async () => {
      mockAnimatorRepository.deleteAnimator.mockResolvedValue(null);
      await expect(animatorService.deleteAnimator(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledWith(
        validId
      );
      expect(mockAnimatorRepository.deleteAnimator).toHaveBeenCalledTimes(1);
    });
  });
});
