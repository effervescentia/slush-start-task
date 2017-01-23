export default () => (input) => {
  return function <%= appNameCamel %> (log) {
    return Promise.resolve(input);
  };
};
