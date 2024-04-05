import { CategoriesController } from "../../../src/controller/CategoriesController";
import { CategoriesService } from "../../../src/service/CategoriesService";

describe("CategoriesController", () => {
  it("should call service getAll", async () => {
    const service = {} as CategoriesService;
    service.getAll = jest.fn();

    const controller = new CategoriesController(service);
    await controller.getAll({} as any, { json: jest.fn() } as any);

    expect(service.getAll).toHaveBeenCalled();
  });
});
