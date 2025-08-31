import React, { useState, useEffect } from 'react';
import { Brain, Star, Trophy, Zap, Heart, Sparkles, Clock, Target, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  funFact: string;
}

const triviaQuestions: Question[] = [
  {
    id: 1,
    question: "Which planet in our solar system has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1,
    category: "Space",
    difficulty: "medium",
    funFact: "Saturn has 146 confirmed moons! Its largest moon, Titan, is bigger than Mercury!"
  },
  {
    id: 2,
    question: "What's the only mammal capable of true flight?",
    options: ["Flying squirrel", "Sugar glider", "Bat", "Flying lemur"],
    correct: 2,
    category: "Animals",
    difficulty: "easy",
    funFact: "Bats use echolocation to navigate in complete darkness - like natural sonar!"
  },
  {
    id: 3,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Aluminum", "Argon"],
    correct: 1,
    category: "Science",
    difficulty: "medium",
    funFact: "'Au' comes from the Latin word 'aurum' meaning 'shining dawn'!"
  },
  {
    id: 4,
    question: "In which year did the Berlin Wall fall?",
    options: ["1987", "1989", "1991", "1993"],
    correct: 1,
    category: "History",
    difficulty: "medium",
    funFact: "The fall of the Berlin Wall on November 9, 1989, was broadcast live worldwide!"
  },
  {
    id: 5,
    question: "What's the smallest country in the world?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    correct: 2,
    category: "Geography",
    difficulty: "easy",
    funFact: "Vatican City is only 0.17 square miles - you could walk across it in 20 minutes!"
  },
  {
    id: 6,
    question: "Which programming language was created by Guido van Rossum?",
    options: ["Java", "Python", "JavaScript", "Ruby"],
    correct: 1,
    category: "Technology",
    difficulty: "medium",
    funFact: "Python was named after the British comedy group Monty Python's Flying Circus!"
  },
  {
    id: 7,
    question: "What's the hardest natural substance on Earth?",
    options: ["Quartz", "Titanium", "Diamond", "Graphene"],
    correct: 2,
    category: "Science",
    difficulty: "easy",
    funFact: "Diamonds form about 100 miles underground and take billions of years to create!"
  },
  {
    id: 8,
    question: "Which ocean is the deepest?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correct: 1,
    category: "Geography",
    difficulty: "easy",
    funFact: "The Pacific's Mariana Trench is so deep that Mount Everest could fit inside it!"
  }
];

const TriviaGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (gameStarted && !showResult && !gameComplete && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, gameStarted, showResult, gameComplete]);

  const handleTimeUp = () => {
    setLives(lives - 1);
    setStreak(0);
    setShowResult(true);
    setShowFunFact(true);
    
    if (lives <= 1) {
      setGameComplete(true);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === triviaQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 10 + (timeLeft * 2) + (streak * 5));
      setStreak(streak + 1);
    } else {
      setLives(lives - 1);
      setStreak(0);
      if (lives <= 1) {
        setGameComplete(true);
      }
    }
    
    setShowResult(true);
    setShowFunFact(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowFunFact(false);
      setTimeLeft(15);
    } else {
      setGameComplete(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setGameStarted(false);
    setShowFunFact(false);
    setTimeLeft(15);
    setStreak(0);
    setLives(3);
    setGameComplete(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(15);
  };

  const getScoreRating = () => {
    const maxScore = triviaQuestions.length * 40;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return { rating: "Genius!", color: "text-purple-600", icon: "🧠" };
    if (percentage >= 75) return { rating: "Brilliant!", color: "text-blue-600", icon: "⭐" };
    if (percentage >= 60) return { rating: "Great Job!", color: "text-green-600", icon: "🎉" };
    if (percentage >= 40) return { rating: "Good Effort!", color: "text-yellow-600", icon: "👍" };
    return { rating: "Keep Trying!", color: "text-orange-600", icon: "💪" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <div className="mb-8 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            TRIVIA MASTER
          </h1>
          
          <p className="text-xl text-white mb-8 leading-relaxed">
            🌟 Test your knowledge across amazing categories! 🌟<br/>
            Answer quickly for bonus points and build your streak!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-sm font-semibold">15 Seconds</div>
              <div className="text-xs opacity-80">Per Question</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-sm font-semibold">8 Questions</div>
              <div className="text-xs opacity-80">Total Challenge</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <div className="text-sm font-semibold">3 Lives</div>
              <div className="text-xs opacity-80">Don't Waste Them</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-sm font-semibold">Streak Bonus</div>
              <div className="text-xs opacity-80">Keep Going!</div>
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
          >
            🚀 START TRIVIA ADVENTURE 🚀
          </button>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const rating = getScoreRating();
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Celebration Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            >
              {['⭐', '🎉', '✨', '🏆', '💎'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-2xl mx-auto relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <div className="mb-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">Game Complete!</h1>
          <div className="text-6xl mb-4">{rating.icon}</div>
          <h2 className={`text-3xl font-bold ${rating.color} mb-6`}>{rating.rating}</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white">{score}</div>
              <div className="text-white/80">Final Score</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white">{Math.round((score / (triviaQuestions.length * 40)) * 100)}%</div>
              <div className="text-white/80">Accuracy</div>
            </div>
          </div>
          
          <button
            onClick={restartGame}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🎮 Play Again
          </button>
        </div>
      </div>
    );
  }

  const question = triviaQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / triviaQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <div className="flex items-center space-x-2 text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <div className="flex items-center space-x-2 text-white">
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="font-bold">{streak}x</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <div className="flex items-center space-x-2 text-white">
                {[...Array(3)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-5 h-5 ${i < lives ? 'text-red-400 fill-current' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
            <div className="flex items-center space-x-2 text-white">
              <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`} />
              <span className={`font-bold text-xl ${timeLeft <= 5 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white/80 mb-2">
            <span>Question {currentQuestion + 1} of {triviaQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden border border-white/30">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Category Badge */}
            <div className="flex justify-center mb-6">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                <Sparkles className="w-4 h-4 inline mr-2" />
                {question.category} • {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </span>
            </div>
            
            {/* Question */}
            <h2 className="text-3xl font-bold text-white text-center mb-8 leading-relaxed">
              {question.question}
            </h2>
            
            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2 ";
                
                if (showResult) {
                  if (index === question.correct) {
                    buttonClass += "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400 shadow-lg shadow-green-500/50";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-400 shadow-lg shadow-red-500/50";
                  } else {
                    buttonClass += "bg-white/10 text-white/60 border-white/20";
                  }
                } else {
                  buttonClass += "bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 hover:shadow-xl";
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showResult && index === question.correct && (
                        <Star className="w-6 h-6 text-yellow-400 ml-auto animate-spin" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Fun Fact */}
            {showFunFact && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 mb-6 border border-cyan-400/30 animate-fadeIn">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-6 h-6 text-cyan-400 mt-1 animate-pulse" />
                  <div>
                    <h3 className="font-bold text-cyan-400 mb-2">🤓 Fun Fact!</h3>
                    <p className="text-white/90">{question.funFact}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Next Button */}
            {showResult && (
              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {currentQuestion < triviaQuestions.length - 1 ? '✨ Next Question' : '🎯 See Results'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Elements */}
        {streak > 0 && (
          <div className="fixed top-20 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-bounce border-2 border-orange-300">
            🔥 {streak}x STREAK!
          </div>
        )}
      </div>
      </div>
    );
  }


export default TriviaGame;