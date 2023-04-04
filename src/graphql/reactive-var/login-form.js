const { makeVar, useReactiveVar } = require('@apollo/client');

const initialValue = {
  userName: '',
  password: '',
};

const loginFormVarFn = makeVar(initialValue);

const useLoginFormVar = () => useReactiveVar(loginFormVarFn);

export const loginFormVar = {
  set: (p) => loginFormVarFn(p),
  get: () => loginFormVarFn(),
  reset: () => loginFormVarFn(initialValue),
  use: useLoginFormVar,
};
