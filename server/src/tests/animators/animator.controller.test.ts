import request from "supertest";
import { NextFunction, Request, Response } from "express";
import express from "express";

import { AnimatorController } from "../../animators/animator.controller";
import { AnimatorService } from "../../animators/animator.service";
import { errorMiddleware } from "../../middlewares/error.middleware";
import { ErrorHandlerService } from "../../services/error-handler.service";

import { HttpError } from "../../errors/http.error";
import { NotFoundError } from "../../errors/not-found.error";
import { BadRequestError } from "../../errors/bad-request.error";
import { DatabaseError } from "../../errors/database.error";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";
import {
  newAnimator,
  newAnimatorBadRequest,
  newAnimatorDocument,
} from "../../../mocks/mock-data";

jest.mock("../../animators/animator.service");

describe("Animator Controller with errorMiddleware and validationMiddleware", () => {
  let app: express.Application;
  let mockAnimatorService: jest.Mocked<AnimatorService>;
  let animatorController: AnimatorController;
  let errorHandlerService: ErrorHandlerService;
  let validId = "1234567890abcdef12345678";
  let invalidId = "1234567890abcdef1234567";

  beforeAll(() => {
    // mock the animator service
    mockAnimatorService = new AnimatorService() as jest.Mocked<AnimatorService>;
    (AnimatorService as jest.Mock).mockImplementation(
      () => mockAnimatorService
    );

    errorHandlerService = new ErrorHandlerService();
    animatorController = new AnimatorController();

    app = express();
    app.use(express.json());
    app.use(animatorController.router);
    app.use(
      (err: HttpError, req: Request, res: Response, _next: NextFunction) => {
        errorMiddleware(err, req, res, _next);
      }
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    jest.resetAllMocks();
  });

  describe("GET /animators", () => {
    it("should return a list of animators", async () => {
      mockAnimatorService.getAnimators.mockResolvedValue([newAnimatorDocument]);

      const response = await request(app).get("/animators").expect(200);

      expect(response.body).toEqual([newAnimatorDocument]);
      expect(mockAnimatorService.getAnimators).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error in location repository");
      mockAnimatorService.getAnimators.mockRejectedValue(mockError);

      const response = await request(app).get("/animators").expect(500);

      expect(response.body).toEqual({
        message: "unknown error in location repository",
        statusCode: 500,
        name: "Error",
      });
      expect(mockAnimatorService.getAnimators).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an database throw error", async () => {
      const mockError = new DatabaseError(
        "failed to get locations: MongooseError"
      );
      mockAnimatorService.getAnimators.mockRejectedValue(mockError);

      const response = await request(app).get("/animators").expect(500);

      expect(response.body).toEqual({
        message: "failed to get locations: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockAnimatorService.getAnimators).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /animators/:id", () => {
    it("should return a single animator by id", async () => {
      mockAnimatorService.getAnimatorById.mockResolvedValue(
        newAnimatorDocument
      );

      const response = await request(app)
        .get(`/animators/${validId}`)
        .expect(200);

      expect(response.body).toEqual(newAnimatorDocument);
      expect(mockAnimatorService.getAnimatorById).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error");
      mockAnimatorService.getAnimatorById.mockRejectedValue(mockError);

      const response = await request(app)
        .get(`/animators/${validId}`)
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error",
        statusCode: 500,
        name: "Error",
      });
      expect(mockAnimatorService.getAnimatorById).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an database throw error", async () => {
      const mockError = new DatabaseError(
        "failed to get locations: MongooseError"
      );
      mockAnimatorService.getAnimatorById.mockRejectedValue(mockError);

      const response = await request(app)
        .get(`/animators/${validId}`)
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to get locations: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockAnimatorService.getAnimatorById).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an invalid id is provided", async () => {
      const mockError = new BadRequestError("invalid id");
      mockAnimatorService.getAnimatorById.mockRejectedValue(mockError);

      const response = await request(app)
        .get(`/animators/${invalidId}`)
        .expect(400);

      expect(response.body).toEqual({
        message: "invalid id",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockAnimatorService.getAnimatorById).toHaveBeenCalledWith(
        invalidId
      );
    });

    it("should handle error when an animator is not found", async () => {
      const mockError = new NotFoundError("animator not found");
      mockAnimatorService.getAnimatorById.mockRejectedValue(mockError);

      const response = await request(app)
        .get(`/animators/${validId}`)
        .expect(404);

      expect(response.body).toEqual({
        message: "animator not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockAnimatorService.getAnimatorById).toHaveBeenCalledWith(validId);
    });
  });

  describe("POST /animators", () => {
    it("should create a new animator", async () => {
      mockAnimatorService.createAnimator.mockResolvedValue({
        message: "animator created successfully",
        data: newAnimatorDocument,
      });

      const response = await request(app)
        .post("/animators")
        .send(newAnimator)
        .expect(201);

      expect(response.body).toEqual({
        message: "animator created successfully",
        data: newAnimatorDocument,
      });
      expect(mockAnimatorService.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error");
      mockAnimatorService.createAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/animators")
        .send(newAnimator)
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error",
        statusCode: 500,
        name: "Error",
      });
      expect(mockAnimatorService.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
    });

    it("should handle error when an database throw error", async () => {
      const mockError = new DatabaseError(
        "failed to create animator: MongooseError"
      );
      mockAnimatorService.createAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/animators")
        .send(newAnimator)
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to create animator: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockAnimatorService.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
    });

    it("should handle error when an invalid request body is provided", async () => {
      const mockError = new BadRequestError(
        "username must contain at least 3 characters"
      );
      mockAnimatorService.createAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/animators")
        .send(newAnimatorBadRequest)
        .expect(400);

      expect(response.body).toEqual({
        message: "username must contain at least 3 characters",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockAnimatorService.createAnimator).toHaveBeenCalledTimes(0);
    });

    it("should handle error when an animator already exists", async () => {
      const mockError = new UniqueConstraintError(
        "email",
        "animator already exists"
      );
      const handledError = errorHandlerService.handleError(mockError);
      mockAnimatorService.createAnimator.mockRejectedValue(handledError);

      const response = await request(app)
        .post("/animators")
        .send(newAnimator)
        .expect(409);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("statusCode");
      expect(response.body).toHaveProperty("name");
      expect(mockAnimatorService.createAnimator).toHaveBeenCalledWith(
        newAnimator
      );
      expect(mockAnimatorService.createAnimator).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /animators/:id", () => {
    it("should update an animator by id", async () => {
      mockAnimatorService.updateAnimator.mockResolvedValue({
        message: "animator updated successfully",
        data: newAnimatorDocument,
      });

      const response = await request(app)
        .put(`/animators/${validId}`)
        .send(newAnimator)
        .expect(200);

      expect(response.body).toEqual({
        message: "animator updated successfully",
        data: newAnimatorDocument,
      });
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error");
      mockAnimatorService.updateAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .put(`/animators/${validId}`)
        .send(newAnimator)
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error",
        statusCode: 500,
        name: "Error",
      });
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
    });

    it("should handle error when an database throw error", async () => {
      const mockError = new DatabaseError(
        "failed to update animator: MongooseError"
      );
      mockAnimatorService.updateAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .put(`/animators/${validId}`)
        .send(newAnimator)
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to update animator: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
    });

    it("should handle error when an invalid id is provided", async () => {
      const mockError = new BadRequestError("invalid id");
      mockAnimatorService.updateAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .put(`/animators/${invalidId}`)
        .send(newAnimator)
        .expect(400);

      expect(response.body).toEqual({
        message: "invalid id",
        statusCode: 400,
        name: "BadRequestError",
      });
    });

    it("should handle error when an animator is not found", async () => {
      const mockError = new NotFoundError("animator not found");
      mockAnimatorService.updateAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .put(`/animators/${validId}`)
        .send(newAnimator)
        .expect(404);

      expect(response.body).toEqual({
        message: "animator not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
    });

    it("should handle error when an invalid request body is provided", async () => {
      const mockError = new BadRequestError(
        "username must contain at least 3 characters"
      );
      mockAnimatorService.updateAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .put(`/animators/${validId}`)
        .send(newAnimatorBadRequest)
        .expect(400);

      expect(response.body).toEqual({
        message: "username must contain at least 3 characters",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledTimes(0);
    });

    it("should handle error when an animator already exists", async () => {
      const mockError = new UniqueConstraintError(
        "email",
        "animator already exists"
      );
      const handledError = errorHandlerService.handleError(mockError);
      mockAnimatorService.updateAnimator.mockRejectedValue(handledError);

      const response = await request(app)
        .put(`/animators/${validId}`)
        .send(newAnimator)
        .expect(409);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("statusCode");
      expect(response.body).toHaveProperty("name");
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledWith(
        validId,
        newAnimator
      );
      expect(mockAnimatorService.updateAnimator).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /animators/:id", () => {
    it("should delete an animator by id", async () => {
      mockAnimatorService.deleteAnimator.mockResolvedValue({
        message: "animator deleted successfully",
        data: newAnimatorDocument,
      });

      const response = await request(app)
        .delete(`/animators/${validId}`)
        .expect(200);

      expect(response.body).toEqual({
        message: "animator deleted successfully",
        data: newAnimatorDocument,
      });
      expect(mockAnimatorService.deleteAnimator).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error");
      mockAnimatorService.deleteAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .delete(`/animators/${validId}`)
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error",
        statusCode: 500,
        name: "Error",
      });
      expect(mockAnimatorService.deleteAnimator).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an database throw error", async () => {
      const mockError = new DatabaseError(
        "failed to delete animator: MongooseError"
      );
      mockAnimatorService.deleteAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .delete(`/animators/${validId}`)
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to delete animator: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockAnimatorService.deleteAnimator).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an animator is not found", async () => {
      const mockError = new NotFoundError("animator not found");
      mockAnimatorService.deleteAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .delete(`/animators/${validId}`)
        .expect(404);

      expect(response.body).toEqual({
        message: "animator not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockAnimatorService.deleteAnimator).toHaveBeenCalledWith(validId);
    });

    it("should handle error when an invalid id is provided", async () => {
      const mockError = new BadRequestError("invalid id");
      mockAnimatorService.deleteAnimator.mockRejectedValue(mockError);

      const response = await request(app)
        .delete(`/animators/${invalidId}`)
        .expect(400);

      expect(response.body).toEqual({
        message: "invalid id",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockAnimatorService.deleteAnimator).toHaveBeenCalledWith(
        invalidId
      );
    });
  });
});
