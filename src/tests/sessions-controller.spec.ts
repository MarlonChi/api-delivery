import request from "supertest";

import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("SessionsController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should authenticate a user and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "user2",
      email: "user2@example.com",
      password: "testpassword",
    });

    const sessionResponse = await request(app).post("/sessions").send({
      email: "user2@example.com",
      password: "testpassword",
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));

    user_id = userResponse.body.id;
  });
});
