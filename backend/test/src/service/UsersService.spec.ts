import { UsersService } from "../../../src/service/UsersService";
import { UsersRepository } from "../../../src/repository/UsersRepository";
import { UsersEntity } from "../../../src/entity/UsersEntity";
import { CategoriesEntity } from "../../../src/entity/CategoriesEntity";
import { NotificationTypesEntity } from "../../../src/entity/NotificationTypesEntity";

describe("UsersService", () => {
  const repository = {} as UsersRepository;
  repository.getAll = jest.fn();
  repository.save = jest.fn();

  it("should call repository getAll", async () => {
    const service = new UsersService(repository);
    await service.getAll();

    expect(repository.getAll).toHaveBeenCalled();
  });

  it("should call repository save", async () => {
    const service = new UsersService(repository);

    await service.save({
      name: "",
      email: "",
      phoneNumber: "",
      categories: ["Sports"],
      notificationTypes: ["SMS"],
    } as any);

    expect(repository.save).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalledWith(
      new UsersEntity({
        name: "",
        email: "",
        phoneNumber: "",
        categories: [new CategoriesEntity({ id: 1 })],
        notificationTypes: [new NotificationTypesEntity({ id: 1 })],
      }),
    );
  });
});
