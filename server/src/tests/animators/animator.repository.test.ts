import { AnimatorRepository } from "../../animators/animator.repository";

import { newAnimator, newAnimatorDocument } from "../../../mocks/mock-data";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";
import { DatabaseError } from "../../errors/database.error";

describe("Animators Repository", () => {
  let animatorRepository: AnimatorRepository;
  let validId = "67f5237dcaf56ff295efd4a9";
  let invalidId = "invalid-id";

  beforeAll(() => {
    animatorRepository = new AnimatorRepository();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /animators", () => {
    it("should create a new animator", async () => {
      const mockCreateAnimator = jest
        .spyOn(animatorRepository, "createAnimator")
        .mockResolvedValue(newAnimatorDocument);

      const res = await animatorRepository.createAnimator(newAnimator);
      expect(res).toEqual(newAnimatorDocument);
      expect(mockCreateAnimator).toHaveBeenCalledTimes(1);
      expect(mockCreateAnimator).toHaveBeenCalledWith(newAnimator);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to create animator: MongooseError"
      );
      const mockCreateAnimator = jest
        .spyOn(animatorRepository, "createAnimator")
        .mockRejectedValue(dbError);

      await expect(
        animatorRepository.createAnimator(newAnimator)
      ).rejects.toThrow(dbError);
      expect(mockCreateAnimator).toHaveBeenCalledTimes(1);
      expect(mockCreateAnimator).toHaveBeenCalledWith(newAnimator);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockCreateAnimator = jest
        .spyOn(animatorRepository, "createAnimator")
        .mockRejectedValue(mockError);

      await expect(
        animatorRepository.createAnimator(newAnimator)
      ).rejects.toThrow(mockError);
      expect(mockCreateAnimator).toHaveBeenCalledTimes(1);
      expect(mockCreateAnimator).toHaveBeenCalledWith(newAnimator);
    });

    it("should handle unique constraint error", async () => {
      const uniqueConstraintError = new UniqueConstraintError(
        "email",
        "nevenmitrovic4@gmail.com"
      );
      const mockCreateAnimator = jest
        .spyOn(animatorRepository, "createAnimator")
        .mockRejectedValue(uniqueConstraintError);
      await expect(
        animatorRepository.createAnimator(newAnimator)
      ).rejects.toThrow(uniqueConstraintError);
      expect(mockCreateAnimator).toHaveBeenCalledTimes(1);
      expect(mockCreateAnimator).toHaveBeenCalledWith(newAnimator);
    });
  });

  describe("GET /animators", () => {
    it("should get all animators", async () => {
      const mockGetAnimators = jest
        .spyOn(animatorRepository, "getAnimators")
        .mockResolvedValue([newAnimatorDocument]);

      const res = await animatorRepository.getAnimators();
      expect(res).toEqual([newAnimatorDocument]);
      expect(mockGetAnimators).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to get animators: MongooseError"
      );
      const mockGetAnimators = jest
        .spyOn(animatorRepository, "getAnimators")
        .mockRejectedValue(dbError);

      await expect(animatorRepository.getAnimators()).rejects.toThrow(dbError);
      expect(mockGetAnimators).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetAnimators = jest
        .spyOn(animatorRepository, "getAnimators")
        .mockRejectedValue(mockError);

      await expect(animatorRepository.getAnimators()).rejects.toThrow(
        mockError
      );
      expect(mockGetAnimators).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /animators/:id", () => {
    it("should get animator by id", async () => {
      const mockGetAnimatorById = jest
        .spyOn(animatorRepository, "getAnimatorById")
        .mockResolvedValue(newAnimatorDocument);

      const res = await animatorRepository.getAnimatorById(validId);
      expect(res).toEqual(newAnimatorDocument);
      expect(mockGetAnimatorById).toHaveBeenCalledTimes(1);
      expect(mockGetAnimatorById).toHaveBeenCalledWith(validId);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to get animator by id: MongooseError"
      );
      const mockGetAnimatorById = jest
        .spyOn(animatorRepository, "getAnimatorById")
        .mockRejectedValue(dbError);

      await expect(animatorRepository.getAnimatorById(validId)).rejects.toThrow(
        dbError
      );
      expect(mockGetAnimatorById).toHaveBeenCalledTimes(1);
      expect(mockGetAnimatorById).toHaveBeenCalledWith(validId);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetAnimatorById = jest
        .spyOn(animatorRepository, "getAnimatorById")
        .mockRejectedValue(mockError);

      await expect(animatorRepository.getAnimatorById(validId)).rejects.toThrow(
        mockError
      );
      expect(mockGetAnimatorById).toHaveBeenCalledTimes(1);
      expect(mockGetAnimatorById).toHaveBeenCalledWith(validId);
    });
  });

  describe("PUT /animators/:id", () => {
    it("should update animator by id", async () => {
      const mockUpdateAnimator = jest
        .spyOn(animatorRepository, "updateAnimator")
        .mockResolvedValue(newAnimatorDocument);

      const res = await animatorRepository.updateAnimator(validId, newAnimator);
      expect(res).toEqual(newAnimatorDocument);
      expect(mockUpdateAnimator).toHaveBeenCalledTimes(1);
      expect(mockUpdateAnimator).toHaveBeenCalledWith(validId, newAnimator);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to update animator: MongooseError"
      );
      const mockUpdateAnimator = jest
        .spyOn(animatorRepository, "updateAnimator")
        .mockRejectedValue(dbError);

      await expect(
        animatorRepository.updateAnimator(validId, newAnimator)
      ).rejects.toThrow(dbError);
      expect(mockUpdateAnimator).toHaveBeenCalledTimes(1);
      expect(mockUpdateAnimator).toHaveBeenCalledWith(validId, newAnimator);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockUpdateAnimator = jest
        .spyOn(animatorRepository, "updateAnimator")
        .mockRejectedValue(mockError);

      await expect(
        animatorRepository.updateAnimator(validId, newAnimator)
      ).rejects.toThrow(mockError);
      expect(mockUpdateAnimator).toHaveBeenCalledTimes(1);
      expect(mockUpdateAnimator).toHaveBeenCalledWith(validId, newAnimator);
    });

    it("should handle unique constraint error", async () => {
      const uniqueConstraintError = new UniqueConstraintError(
        "email",
        "nevenmitrovic4@gmail.com"
      );
      const mockUpdateAnimator = jest
        .spyOn(animatorRepository, "updateAnimator")
        .mockRejectedValue(uniqueConstraintError);
      await expect(
        animatorRepository.updateAnimator(validId, newAnimator)
      ).rejects.toThrow(uniqueConstraintError);
      expect(mockUpdateAnimator).toHaveBeenCalledTimes(1);
      expect(mockUpdateAnimator).toHaveBeenCalledWith(validId, newAnimator);
    });
  });

  describe("DELETE /animators/:id", () => {
    it("should delete animator by id", async () => {
      const mockDeleteAnimator = jest
        .spyOn(animatorRepository, "deleteAnimator")
        .mockResolvedValue(newAnimatorDocument);

      const res = await animatorRepository.deleteAnimator(validId);
      expect(res).toEqual(newAnimatorDocument);
      expect(mockDeleteAnimator).toHaveBeenCalledTimes(1);
      expect(mockDeleteAnimator).toHaveBeenCalledWith(validId);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to delete animator: MongooseError"
      );
      const mockDeleteAnimator = jest
        .spyOn(animatorRepository, "deleteAnimator")
        .mockRejectedValue(dbError);

      await expect(animatorRepository.deleteAnimator(validId)).rejects.toThrow(
        dbError
      );
      expect(mockDeleteAnimator).toHaveBeenCalledTimes(1);
      expect(mockDeleteAnimator).toHaveBeenCalledWith(validId);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockDeleteAnimator = jest
        .spyOn(animatorRepository, "deleteAnimator")
        .mockRejectedValue(mockError);

      await expect(animatorRepository.deleteAnimator(validId)).rejects.toThrow(
        mockError
      );
      expect(mockDeleteAnimator).toHaveBeenCalledTimes(1);
      expect(mockDeleteAnimator).toHaveBeenCalledWith(validId);
    });
  });
});
