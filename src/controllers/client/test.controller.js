const Test = require("../../models/test.model");
const Question = require("../../models/question.model");
const Answer = require("../../models/answer.model");

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
  try {
    const { title, timeLimit, questions } = req.body;

    const userID = req.tokenUser;

    const newTest = {
      title: title,
      time: timeLimit,
      userId: userID
    };

    // Save the test to the database
    const test = await Test.create(newTest);

    await Promise.all(questions.map(async (question) => {
      const title = question.title;

      // Create the question object
      const newQuestion = {
        title: title,
        testId: test._id
      };

      // Save the question to the database
      const newQuestionCreated = await Question.create(newQuestion);

      const answerOptions = question.answers;

      await Promise.all(answerOptions.map(async (option) => {
        const text = option.text;
        const isCorrect = option.isCorrect;

        const newAnswer = {
          answer: text,
          isCorrect: isCorrect,
          questionId: newQuestionCreated._id
        };

        // Save the answer to the database
        await Answer.create(newAnswer);
      }));
    }));
    
    return res.json({
      code: 200,
      message: "Test created successfully",
    })
  } catch (error) {
    console.error("Error creating test:", error);
    req.flash("error", "An error occurred while creating the test");
    res.redirect("/do-test/create");
  }
}