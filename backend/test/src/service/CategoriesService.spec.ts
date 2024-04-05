import { CategoriesService } from "../../../src/service/CategoriesService";
import { CategoriesRepository } from "../../../src/repository/CategoriesRepository";

describe("CategoriesService", () => {
  it("should call repository getAll", async () => {
    const repository = {} as CategoriesRepository;
    repository.getAll = jest.fn();

    const service = new CategoriesService(repository);
    await service.getAll();

    expect(repository.getAll).toHaveBeenCalled();
  });
});
