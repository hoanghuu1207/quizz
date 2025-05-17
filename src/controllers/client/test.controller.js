
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
  const { title, timeLimit, questions } = req.body;

  console.log("Title:", title);
  console.log("Time Limit:", timeLimit);

  questions.forEach((question) => {
    const title = question.title;
    console.log("Question Title:", title);
    
    const answerOptions = question.answers;
    answerOptions.forEach((option) => {
      const text = option.text;
      const isCorrect = option.isCorrect;

      console.log("Answer Option:", text, "Is Correct:", isCorrect);
    });
  });
}