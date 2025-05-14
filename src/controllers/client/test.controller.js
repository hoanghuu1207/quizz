
// [GET] /do-test
module.exports.index = async (req, res) => {
  res.render("client/pages/test/index", {
    titlePage: "Test",
    test: {
      title: "Test",
      description: "This is a test description"
    }
  });
}

// [GET] /do-test/create
module.exports.create = async (req, res) => {
  res.render("client/pages/test/create", {
    titlePage: "Create a New Quiz"
  });
}

// [POST] /do-test/create
module.exports.createPost = async (req, res) => {
  // Handle the form submission, only submit when user click the button
  // Error of the form submission, when click "Add Question" button, or edit "Time Limit" field, form submission will be triggered

  console.log(req.body);
  const questions = req.body;
  questions.forEach((question, index) => {
    console.log(`Question ${index + 1}: ${question.title}`);
    question.answers.forEach((answer, answerIndex) => {
      console.log(answer);
    });
  });
}