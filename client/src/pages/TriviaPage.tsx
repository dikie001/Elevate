import { useState, useEffect } from "react";
import {
  ChevronRight,
  Trophy,
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
} from "lucide-react";

const triviaQuestions = {
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      explanation: "Au comes from the Latin word 'aurum' meaning gold.",
    },
    {
      question: "How many chambers does a human heart have?",
      options: ["2", "3", "4", "5"],
      correct: 2,
      explanation:
        "The human heart has four chambers: two atria and two ventricles.",
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      explanation: "Mars appears red due to iron oxide (rust) on its surface.",
    },
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
      explanation:
        "World War II ended in 1945 with Japan's surrender in September.",
    },
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      correct: 1,
      explanation:
        "Neil Armstrong was the first person to step onto the lunar surface on July 20, 1969.",
    },
    {
      question: "Which ancient wonder of the world was located in Alexandria?",
      options: [
        "Hanging Gardens",
        "Colossus of Rhodes",
        "Lighthouse",
        "Statue of Zeus",
      ],
      correct: 2,
      explanation:
        "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
    },
  ],
  literature: [
    {
      question: "Who wrote 'Pride and Prejudice'?",
      options: [
        "Charlotte Brontë",
        "Jane Austen",
        "Emily Dickinson",
        "Virginia Woolf",
      ],
      correct: 1,
      explanation: "Jane Austen published 'Pride and Prejudice' in 1813.",
    },
    {
      question:
        "In Shakespeare's 'Romeo and Juliet', which families are feuding?",
      options: [
        "Montague & Capulet",
        "Bennet & Darcy",
        "Earnshaw & Linton",
        "Stark & Lannister",
      ],
      correct: 0,
      explanation:
        "The Montagues and Capulets are the feuding families in Romeo and Juliet.",
    },
    {
      question: "What is the first book in the Harry Potter series?",
      options: [
        "Chamber of Secrets",
        "Prisoner of Azkaban",
        "Philosopher's Stone",
        "Goblet of Fire",
      ],
      correct: 2,
      explanation:
        "Harry Potter and the Philosopher's Stone (or Sorcerer's Stone in the US) was the first book.",
    },
  ],
};

const categories = {
  science: {
    name: "Science",
    icon: "🔬",
    color: "from-blue-500 to-purple-600",
  },
  history: {
    name: "History",
    icon: "📚",
    color: "from-amber-500 to-orange-600",
  },
  literature: {
    name: "Literature",
    icon: "📖",
    color: "from-green-500 to-teal-600",
  },
};

export default function TriviaPage() {
  const [gameState, setGameState] = useState("menu"); // menu, playing, finished
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let timer;
    if (gameState === "playing" && timeLeft > 0 && !showAnswer) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showAnswer) {
      handleAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, showAnswer, gameState]);

  const startQuiz = (category) => {
    setSelectedCategory(category);
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(30);
    setAnswers([]);
  };

  const handleAnswer = (answerIndex) => {
    if (showAnswer) return;

    setSelectedAnswer(answerIndex);
    setShowAnswer(true);

    const question = triviaQuestions[selectedCategory][currentQuestion];
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([
      ...answers,
      {
        question: question.question,
        selected: answerIndex,
        correct: question.correct,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < triviaQuestions[selectedCategory].length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(30);
    } else {
      setGameState("finished");
    }
  };

  const resetQuiz = () => {
    setGameState("menu");
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(30);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / triviaQuestions[selectedCategory].length) * 100;
    if (percentage === 100) return "Perfect! Outstanding work! 🌟";
    if (percentage >= 80) return "Excellent! Great job! 🎉";
    if (percentage >= 60) return "Good work! Keep it up! 👏";
    return "Keep practicing! You'll improve! 💪";
  };

  if (gameState === "menu") {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4`}
      >
        <div className={`max-w-4xl mx-auto`}>
          {/* Header */}
          <div className={`text-center mb-12 pt-8`}>
            <div className={`flex items-center justify-center mb-4`}>
              <Brain className={`w-12 h-12 text-white mr-3`} />
              <h1 className={`text-5xl font-bold text-white tracking-tight`}>
                Elevate
              </h1>
            </div>
            <p className={`text-xl text-purple-200 mb-2`}>
              Brain Training Trivia
            </p>
            <p className={`text-purple-300`}>
              Challenge yourself and elevate your knowledge
            </p>
          </div>

          {/* Category Selection */}
          <div className={`grid md:grid-cols-3 gap-6`}>
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                onClick={() => startQuiz(key)}
                className={`bg-gradient-to-r ${category.color} p-8 rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group`}
              >
                <div className={`text-center`}>
                  <div
                    className={`text-6xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-2`}>
                    {category.name}
                  </h3>
                  <p className={`text-white/80 mb-4`}>
                    {triviaQuestions[key].length} questions
                  </p>
                  <div
                    className={`flex items-center justify-center text-white group-hover:translate-x-1 transition-transform duration-300`}
                  >
                    <span className={`mr-2 font-medium`}>Start Quiz</span>
                    <ChevronRight className={`w-5 h-5`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className={`mt-16 grid md:grid-cols-3 gap-6`}>
            <div
              className={`text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm`}
            >
              <Clock className={`w-8 h-8 text-purple-300 mx-auto mb-3`} />
              <h4 className={`text-white font-semibold mb-2`}>
                Timed Challenges
              </h4>
              <p className={`text-purple-200 text-sm`}>
                30 seconds per question to keep you sharp
              </p>
            </div>
            <div
              className={`text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm`}
            >
              <Trophy className={`w-8 h-8 text-yellow-400 mx-auto mb-3`} />
              <h4 className={`text-white font-semibold mb-2`}>
                Score Tracking
              </h4>
              <p className={`text-purple-200 text-sm`}>
                Monitor your progress and improvement
              </p>
            </div>
            <div
              className={`text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm`}
            >
              <Star className={`w-8 h-8 text-pink-300 mx-auto mb-3`} />
              <h4 className={`text-white font-semibold mb-2`}>
                Detailed Explanations
              </h4>
              <p className={`text-purple-200 text-sm`}>
                Learn from every question
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
    const question = triviaQuestions[selectedCategory][currentQuestion];
    const category = categories[selectedCategory];

    return (
      <div className={`min-h-screen bg-gradient-to-br ${category.color} p-4`}>
        <div className={`max-w-3xl mx-auto`}>
          {/* Header */}
          <div className={`flex items-center justify-between mb-8 pt-4`}>
            <div className={`flex items-center`}>
              <div className={`text-2xl mr-3`}>{category.icon}</div>
              <div>
                <h2 className={`text-xl font-bold text-white`}>
                  {category.name}
                </h2>
                <p className={`text-white/80 text-sm`}>
                  Question {currentQuestion + 1} of{" "}
                  {triviaQuestions[selectedCategory].length}
                </p>
              </div>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center bg-white/20 px-4 py-2 rounded-full`}
            >
              <Clock className={`w-5 h-5 text-white mr-2`} />
              <span className={`text-white font-bold text-lg`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`mb-8`}>
            <div className={`bg-white/20 rounded-full h-2`}>
              <div
                className={`bg-white rounded-full h-2 transition-all duration-300`}
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      triviaQuestions[selectedCategory].length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className={`bg-white rounded-2xl p-8 mb-6 shadow-2xl`}>
            <h3
              className={`text-2xl font-bold text-gray-800 mb-6 leading-relaxed`}
            >
              {question.question}
            </h3>

            {/* Answer Options */}
            <div className={`space-y-3`}>
              {question.options.map((option, index) => {
                let buttonClass = `w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border-2 `;

                if (showAnswer) {
                  if (index === question.correct) {
                    buttonClass += `border-green-500 bg-green-50 text-green-800`;
                  } else if (
                    index === selectedAnswer &&
                    selectedAnswer !== question.correct
                  ) {
                    buttonClass += `border-red-500 bg-red-50 text-red-800`;
                  } else {
                    buttonClass += `border-gray-200 bg-gray-50 text-gray-600`;
                  }
                } else {
                  buttonClass += `border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700 cursor-pointer hover:shadow-md`;
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showAnswer}
                    className={buttonClass}
                  >
                    <div className={`flex items-center justify-between`}>
                      <span>{option}</span>
                      {showAnswer && index === question.correct && (
                        <CheckCircle className={`w-6 h-6 text-green-600`} />
                      )}
                      {showAnswer &&
                        index === selectedAnswer &&
                        selectedAnswer !== question.correct && (
                          <XCircle className={`w-6 h-6 text-red-600`} />
                        )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showAnswer && (
              <div
                className={`mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl`}
              >
                <p className={`text-blue-800 font-medium`}>Explanation:</p>
                <p className={`text-blue-700 mt-1`}>{question.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showAnswer && (
              <div className={`mt-6 text-center`}>
                <button
                  onClick={nextQuestion}
                  className={`bg-gradient-to-r ${category.color} text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  {currentQuestion + 1 <
                  triviaQuestions[selectedCategory].length
                    ? "Next Question"
                    : "View Results"}
                </button>
              </div>
            )}
          </div>

          {/* Score Display */}
          <div className={`text-center`}>
            <div
              className={`inline-flex items-center bg-white/20 px-6 py-3 rounded-full`}
            >
              <Trophy className={`w-5 h-5 text-white mr-2`} />
              <span className={`text-white font-bold`}>
                Score: {score}/{currentQuestion + (showAnswer ? 1 : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    const category = categories[selectedCategory];
    const percentage = Math.round(
      (score / triviaQuestions[selectedCategory].length) * 100
    );

    return (
      <div className={`min-h-screen bg-gradient-to-br ${category.color} p-4`}>
        <div className={`max-w-3xl mx-auto pt-8`}>
          {/* Results Header */}
          <div className={`text-center mb-12`}>
            <div className={`text-8xl mb-4`}>
              {percentage === 100
                ? "🏆"
                : percentage >= 80
                ? "🌟"
                : percentage >= 60
                ? "👏"
                : "💪"}
            </div>
            <h2 className={`text-4xl font-bold text-white mb-4`}>
              Quiz Complete!
            </h2>
            <p className={`text-2xl text-white/90 mb-2`}>{getScoreMessage()}</p>
            <div className={`text-6xl font-bold text-white mb-4`}>
              {score}/{triviaQuestions[selectedCategory].length}
            </div>
            <div className={`text-xl text-white/80`}>{percentage}% Correct</div>
          </div>

          {/* Detailed Results */}
          <div className={`bg-white rounded-2xl p-8 mb-8 shadow-2xl`}>
            <h3 className={`text-2xl font-bold text-gray-800 mb-6`}>
              Question Review
            </h3>
            <div className={`space-y-4`}>
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${
                    answer.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className={`flex items-start justify-between mb-2`}>
                    <p className={`font-medium text-gray-800 flex-1 mr-4`}>
                      {index + 1}. {answer.question}
                    </p>
                    {answer.isCorrect ? (
                      <CheckCircle
                        className={`w-6 h-6 text-green-600 flex-shrink-0`}
                      />
                    ) : (
                      <XCircle
                        className={`w-6 h-6 text-red-600 flex-shrink-0`}
                      />
                    )}
                  </div>
                  {!answer.isCorrect && (
                    <p className={`text-sm text-gray-600`}>
                      Your answer:{" "}
                      {answer.selected !== null
                        ? triviaQuestions[selectedCategory][index].options[
                            answer.selected
                          ]
                        : "No answer"}{" "}
                      | Correct:{" "}
                      {
                        triviaQuestions[selectedCategory][index].options[
                          answer.correct
                        ]
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center`}>
            <button
              onClick={() => startQuiz(selectedCategory)}
              className={`flex items-center justify-center bg-white text-gray-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
              <RotateCcw className={`w-5 h-5 mr-2`} />
              Try Again
            </button>
            <button
              onClick={resetQuiz}
              className={`flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <ChevronRight className={`w-5 h-5 mr-2`} />
              Choose New Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
