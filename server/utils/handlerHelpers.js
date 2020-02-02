exports.getOne = async (res, Model, queryObj, toSelectArray, toPopulate) => {
  try {
    // implement 'toSelect' from object to be more robust
    const doc = await Model.findOne(queryObj)
      .select(toSelectArray)
      .populate(toPopulate);
    if (!doc) throw Error;
    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Document with specified ID is not found!",
      data: null
    });
  }
};

exports.getAll = async (res, Model, queryObj, toSelectArray, toPopulate) => {
  try {
    // implement 'toSelect' from object to be more robust
    const docs = await Model.find(queryObj)
      .select(toSelectArray)
      .populate(toPopulate);
    res.status(200).json({
      status: "success",
      data: {
        data: docs
      }
    });
  } catch (err) {
    console.log(err);
  }
};
