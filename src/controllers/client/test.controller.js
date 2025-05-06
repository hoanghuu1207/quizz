
module.exports.index = async (req, res) => {
  res.render("client/pages/test/index", {
    titlePage: "Test",
    test: {
      title: "Test",
      description: "This is a test description"
    }
  });
}

module.exports.create = async (req, res) => {
  res.render("client/pages/test/create", {
    titlePage: "Create a New Quiz"
  });
}