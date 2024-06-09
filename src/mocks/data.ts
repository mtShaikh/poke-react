export const mockListData = {
  results: [
    {
      name: "bulbasaur",
      url: `${process.env.REACT_APP_BASE_API_URL}/pokemon/1`,
    },
    {
      name: "ivysaur",
      url: `${process.env.REACT_APP_BASE_API_URL}/pokemon/2`,
    },
  ],
  next: `${process.env.REACT_APP_BASE_API_URL}/pokemon?offset=20&limit=20`,
};

export const mockBulbasaur = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  species: { name: "bulbasaur" },
};

export const mockIvysaur = {
  id: 2,
  name: "ivysaur",
  height: 10,
  weight: 130,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  species: { name: "ivysaur" },
};
