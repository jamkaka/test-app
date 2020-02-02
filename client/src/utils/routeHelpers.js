const redirectIfNoWithNoParams = (to, from, next) => {
  if (Object.keys(to.params).length === 0) next({ name: "Home" });
  next();
};

export { redirectIfNoWithNoParams };
