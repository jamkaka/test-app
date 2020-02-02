const catchAsyncVuex = fn => {
  return (state, payload) => {
    // need to return fn() to be able to handle errors local try{...}catch{...}
    const { commit } = state;
    return fn(state, payload)
      .catch(err => {
        // console.log(err);
        throw err;
      })
      .finally(() => commit("TOGGLE_PROGRESS_BAR", null, { root: true }));
  };
};

export { catchAsyncVuex };
