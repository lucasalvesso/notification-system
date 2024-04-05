import { UsersController } from "../../../src/controller/UsersController";
import { UsersService } from "../../../src/service/UsersService";

describe("UsersController", () => {
  const service = {} as UsersService;
  service.getAll = jest.fn();
  service.save = jest.fn();

  it("should call service getAll", async () => {
    const controller = new UsersController(service);
    await controller.getAll({} as any, { json: jest.fn() } as any);

    expect(service.getAll).toHaveBeenCalled();
  });

  it("should validate body and return errors", async () => {
    const response = {} as any;
    response.json = jest.fn();
    response.status = jest.fn(() => response);

    const controller = new UsersController(service);

    await controller.save({} as any, response as any);

    expect(service.save).toHaveBeenCalledTimes(0);
    expect(response.json).toHaveBeenCalledWith([
      "Invalid value for name",
      "Invalid value for email",
      "Invalid value for phoneNumber",
      "Invalid value for categories",
      "Invalid value for notificationTypes",
    ]);

    response.json = jest.fn();

    await controller.save(
      {
        body: {
          name: "1",
          email: "2",
          phoneNumber: "sdc",
          categories: ["1"],
          notificationTypes: ["5"],
        },
      } as any,
      response as any,
    );

    expect(service.save).toHaveBeenCalledTimes(0);
    expect(response.json).toHaveBeenCalledWith([
      "Invalid value for categories",
      "Invalid value for notificationTypes",
    ]);
  });

  it("should validate body and reach service send", async () => {
    const response = {} as any;
    response.json = jest.fn();
    response.status = jest.fn(() => response);

    const controller = new UsersController(service);

    await controller.save(
      {
        body: {
          name: "1",
          email: "2",
          phoneNumber: "sdc",
          categories: ["Sports"],
          notificationTypes: ["SMS"],
        },
      } as any,
      response as any,
    );

    expect(service.save).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      message: "user created successfully",
    });
  });
});
