import { AnimatorRepository } from "../../animators/animator.repository";

import { newAnimator, newAnimatorDocument } from "../../../mocks/mock-data";

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
  });
});
