module.exports.createPost = (req, res, next) => {
  if(!req.body.title) {
    req.flash("error", `Fill in the information`);
		res.redirect("back");
		return;
  }

  if(!req.body.timeLimit) {
    req.flash("error", `Fill in the information`);
    res.redirect("back");
    return;
  }

  if(req.body.questions.length == 0) {
    req.flash("error", `Please add at least one question.`);
    res.redirect("back");
    return;
  }

  const { questions } = req.body;
  let hasError = false;
  questions.forEach((question, index) => {
    const questionNumber = index + 1;
    const title = question.title.trim();
    const answerOptions = question.answers;
    const hasCorrectAnswer = answerOptions.some(option => 
      option.isCorrect
    );
    const answers = answerOptions.map(option => 
      option.text.trim()
    );

    if (!title) {
      req.flash("error", `Question ${questionNumber}: Please enter question title`);
      res.redirect("back");
      hasError = true;
      return;
    }

    const emptyAnswers = answers.some(answer => !answer);
    if (emptyAnswers) {
      req.flash("error", `Question ${questionNumber}: Please fill in all answer options`);
      res.redirect("back");
      hasError = true;
      return;
    }

    if (!hasCorrectAnswer) {
      req.flash("error", `Question ${questionNumber}: Please select a correct answer`);
      res.redirect("back");
      hasError = true;
      return;
    }
  });

  if (hasError) {
    res.redirect("back");
    return;
  }

  next();
}