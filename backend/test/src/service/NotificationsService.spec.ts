import { CategoriesRepository } from "../../../src/repository/CategoriesRepository";
import { NotificationsService } from "../../../src/service/NotificationsService";
import { NotificationsRepository } from "../../../src/repository/NotificationsRepository";

describe("NotificationsService", () => {
  const notificationsRepository = {} as NotificationsRepository;
  notificationsRepository.getAll = jest.fn();

  const categoriesRepository = {} as CategoriesRepository;
  categoriesRepository.getAll = jest.fn();

  it("should call repository getAll", async () => {
    const service = new NotificationsService(
      notificationsRepository,
      categoriesRepository,
    );
    await service.getAll();

    expect(notificationsRepository.getAll).toHaveBeenCalled();
  });

  it("should find any user", async () => {
    const service = new NotificationsService(
      notificationsRepository,
      categoriesRepository,
    );

    categoriesRepository.getUsersByCategory = jest
      .fn()
      .mockResolvedValue({ users: [] });

    const result = await service.send({} as any);

    expect(categoriesRepository.getUsersByCategory).toHaveBeenCalled();

    expect(result).toBe(undefined);
  });

  it("should return errors", async () => {
    const service = new NotificationsService(
      notificationsRepository,
      categoriesRepository,
    );

    categoriesRepository.getUsersByCategory = jest.fn().mockResolvedValue({
      users: [{ id: 1, notificationTypes: [{ id: 1 }] }],
    });

    notificationsRepository.save = jest
      .fn()
      .mockReturnValueOnce(Promise.reject())
      .mockReturnValueOnce(undefined);

    const result = await service.send({ message: "", category: "" } as any);

    expect(categoriesRepository.getUsersByCategory).toHaveBeenCalled();

    expect(result).toStrictEqual([
      "notification undefined not sent to user undefined",
    ]);
  });
});
