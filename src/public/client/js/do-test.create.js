document.addEventListener('DOMContentLoaded', function () {
  // Time selector functionality
  const timeDisplay = document.getElementById('time-display');
  const hoursInput = document.getElementById('hours-input');
  const minutesInput = document.getElementById('minutes-input');
  const timePresets = document.querySelectorAll('.time-preset');

  let currentTimeInMinutes = 30;

  function updateTimeDisplay() {
    const hours = Math.floor(currentTimeInMinutes / 60);
    const minutes = currentTimeInMinutes % 60;

    if (hours > 0) {
      timeDisplay.textContent = `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
    } else {
      timeDisplay.textContent = `${minutes}m`;
    }

    hoursInput.value = hours;
    minutesInput.value = minutes;

    // Update active preset
    timePresets.forEach((preset) => {
      const presetMinutes = parseInt(preset.dataset.minutes);
      preset.classList.toggle('active', presetMinutes === currentTimeInMinutes);
    });
  }

  timePresets.forEach((preset) => {
    preset.addEventListener('click', function () {
      currentTimeInMinutes = parseInt(this.dataset.minutes);
      updateTimeDisplay();
    });
  });

  hoursInput.addEventListener('change', function () {
    const hours = parseInt(this.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    currentTimeInMinutes = hours * 60 + minutes;
    updateTimeDisplay();
  });

  minutesInput.addEventListener('change', function () {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(this.value) || 0;
    currentTimeInMinutes = hours * 60 + minutes;
    updateTimeDisplay();
  });

  // Questions functionality
  const questionsContainer = document.getElementById('questions-container');
  const addQuestionBtn = document.getElementById('add-question-btn');
  const questionTemplate = document.getElementById('question-template');
  const emptyQuestions = document.querySelector('.empty-questions');

  let questionCounter = 0;

  function addQuestion() {
    if (questionCounter === 0) {
      emptyQuestions.style.display = 'none';
    }

    questionCounter++;

    const questionId = `question-${Date.now()}`;
    const questionClone = document.importNode(questionTemplate.content, true);
    const questionCard = questionClone.querySelector('.question-card');

    questionCard.dataset.id = questionId;
    questionCard.querySelector(
      '.question-number'
    ).textContent = `Q${questionCounter}:`;

    const radioGroup = `answers-${questionId}`;
    const radioInputs = questionCard.querySelectorAll('.answer-radio');
    radioInputs.forEach((input) => {
      input.name = radioGroup;
    });

    // Add event listeners
    const deleteBtn = questionCard.querySelector('.delete-question');
    deleteBtn.addEventListener('click', function () {
      questionCard.remove();
      questionCounter--;

      // Update question numbers
      const questions = questionsContainer.querySelectorAll('.question-card');
      questions.forEach((q, index) => {
        q.querySelector('.question-number').textContent = `Q${index + 1}:`;
      });

      if (questionCounter === 0) {
        emptyQuestions.style.display = 'block';
      }
    });

    const toggleBtn = questionCard.querySelector('.toggle-question');
    toggleBtn.addEventListener('click', function () {
      questionCard.classList.toggle('collapsed');
    });

    // Auto-resize textarea
    const textarea = questionCard.querySelector('.question-title');
    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });

    // Handle correct answer selection
    const answerOptions = questionCard.querySelectorAll('.answer-option');
    radioInputs.forEach((radio, index) => {
      radio.addEventListener('change', function () {
        answerOptions.forEach((option) => option.classList.remove('correct'));
        if (this.checked) {
          answerOptions[index].classList.add('correct');
        }
      });
    });

    questionsContainer.appendChild(questionClone);
  }

  addQuestionBtn.addEventListener('click', addQuestion);

  // Initialize time display
  updateTimeDisplay();

  const form = document.querySelector('form#create-quiz-form'); // Chọn form cần xử lý

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn form submit mặc định

    const questions = form.querySelectorAll('.question-card');
    
    const titleQuiz = form.querySelector('input#quiz-title').value;
    const hour = form.querySelector('input#hours-input').value;
    const minute = form.querySelector('input#minutes-input').value;

    if(!titleQuiz) {
      alert('Please enter a title for the quiz.');
      return;
    }

    if (questions.length === 0) {
      alert('Please add at least one question.');
      return;
    }

    if (hour < 0 || minute < 0) {
      alert('Time limit cannot be negative.')
      return;
    }

    if (hour > 24 || minute > 59) {
      alert('Time limit is not valid.')
      return;
    }

    let hasError = false;
    questions.forEach((question, index) => {
      const questionNumber = index + 1;
      const title = question.querySelector('.question-header .question-title').value.trim();
      const answerOptions = question.querySelectorAll('.question-content .answer-option');
      const hasCorrectAnswer = Array.from(answerOptions).some(option => 
        option.querySelector('input[type="radio"]').checked
      );
      const answers = Array.from(answerOptions).map(option => 
        option.querySelector('input.answer-text').value.trim()
      );

      if (!title) {
        alert(`Question ${questionNumber}: Please enter question title`);
        hasError = true;
        return;
      }

      const emptyAnswers = answers.some(answer => !answer);
      if (emptyAnswers) {
        alert(`Question ${questionNumber}: Please fill in all answer options`);
        hasError = true;
        return;
      }

      if (!hasCorrectAnswer) {
        alert(`Question ${questionNumber}: Please select a correct answer`);
        hasError = true;
        return;
      }
    });

    if (hasError) {
      return;
    }

    const formattedData = {
      title: titleQuiz,
      timeLimit: parseInt(hour) * 60 + parseInt(minute),
      questions: [],
    }

    questions.forEach((question) => {
      const questionId = question.dataset.id;
      const title = question.querySelector('.question-header .question-title').value.trim();
      const answers = Array.from(question.querySelectorAll('.question-content .answer-option')).map((option) => {
        const radio = option.querySelector('input[type="radio"]').checked;

        const answerText = option.querySelector('input.answer-text').value.trim();

        return {
          text: answerText,
          isCorrect: radio,
        };
      });

      formattedData.questions.push({
        questionId,
        title,
        answers,
      });
    });
    console.log('Formatted Data:', formattedData);


    // Send to server
    fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server Response:', data);
        if (data.code == 200){
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});