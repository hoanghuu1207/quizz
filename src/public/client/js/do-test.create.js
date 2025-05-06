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
});
