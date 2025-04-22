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
});
