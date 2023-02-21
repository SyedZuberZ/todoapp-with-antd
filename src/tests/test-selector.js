const state = {
  todo: "",
};

export const testSelector = (f) => f(state);
