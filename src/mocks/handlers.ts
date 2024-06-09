import { rest } from "msw";
import { mockBulbasaur, mockIvysaur, mockListData } from "./data";

export const handlers = [
  rest.get(`${process.env.REACT_APP_BASE_API_URL}/pokemon`, (req, res, ctx) => {
    return res(ctx.json(mockListData));
  }),
  rest.get(
    `${process.env.REACT_APP_BASE_API_URL}/pokemon/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      if (id === "1") {
        return res(ctx.json(mockBulbasaur));
      }
      if (id === "2") {
        return res(ctx.json(mockIvysaur));
      }
      return res(ctx.status(404), ctx.json({ message: "Not Found" }));
    }
  ),
];
