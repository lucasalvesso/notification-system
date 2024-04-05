import { NotificationsService } from "../../../src/service/NotificationsService";
import { NotificationsController } from "../../../src/controller/NotificationsController";

describe("NotificationsController", () => {
  const service = {} as NotificationsService;
  service.getAll = jest.fn();
  service.send = jest.fn();

  it("should call service getAll", async () => {
    const controller = new NotificationsController(service);
    await controller.getAll({} as any, { json: jest.fn() } as any);

    expect(service.getAll).toHaveBeenCalled();
  });

  it("should validate body and return errors", async () => {
    const response = {} as any;
    response.json = jest.fn();
    response.status = jest.fn(() => response);

    const controller = new NotificationsController(service);

    await controller.send({} as any, response as any);

    expect(service.send).toHaveBeenCalledTimes(0);
    expect(response.json).toHaveBeenCalledWith([
      "Invalid value for message",
      "Invalid value for category",
    ]);

    await controller.send(
      { body: { message: "test", category: "Sport" } } as any,
      response as any,
    );

    expect(service.send).toHaveBeenCalledTimes(0);
    expect(response.json).toHaveBeenCalledWith(["Invalid value for category"]);
  });

  it("should validate body and reach service send", async () => {
    const response = {} as any;
    response.json = jest.fn();
    response.status = jest.fn(() => response);

    const controller = new NotificationsController(service);

    await controller.send(
      { body: { message: "test", category: "Sports" } } as any,
      response as any,
    );

    expect(service.send).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      message: "notifications sent successfully",
    });
  });
});
