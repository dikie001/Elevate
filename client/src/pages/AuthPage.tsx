import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Sparkles, Shield, Zap, Star, Heart, Trophy, LogIn, UserPlus, Brain } from 'lucide-react';

interface User {
  username: string;
  pin: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleAuth = async () => {
    if (!username.trim()) {
      showMessage('Please enter a username!', 'error');
      return;
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      showMessage('PIN must be exactly 4 digits!', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isLogin) {
      // Login logic
      const user = users.find(u => u.username === username && u.pin === pin);
      if (user) {
        setCurrentUser(username);
        setIsLoggedIn(true);
        showMessage(`Welcome back, ${username}! 🎉`, 'success');
      } else {
        showMessage('Invalid username or PIN!', 'error');
      }
    } else {
      // Signup logic
      if (confirmPin !== pin) {
        showMessage('PINs do not match!', 'error');
        setIsLoading(false);
        return;
      }

      const existingUser = users.find(u => u.username === username);
      if (existingUser) {
        showMessage('Username already exists!', 'error');
      } else {
        const newUser = { username, pin };
        setUsers([...users, newUser]);
        setCurrentUser(username);
        setIsLoggedIn(true);
        showMessage(`Account created successfully! Welcome, ${username}! ✨`, 'success');
      }
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setUsername('');
    setPin('');
    setConfirmPin('');
    showMessage('Logged out successfully! 👋', 'success');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPin('');
    setConfirmPin('');
    setMessage('');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Success Animation Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            >
              {['🎉', '✨', '🌟', '💎', '🚀'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto relative z-10">
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center shadow-2xl animate-pulse">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4">
              Welcome Back!
            </h1>
            
            <h2 className="text-3xl font-bold text-white mb-8">
              Hey there, {currentUser}! 🎮
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              You're successfully logged in and ready to explore amazing experiences!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/20">
                <Brain className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Ready for Trivia?</div>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/20">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Account Active</div>
              </div>
              <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl p-6 border border-white/20">
                <Star className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Premium Access</div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Icons */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          >
            {[<Shield className="w-8 h-8" />, <Lock className="w-8 h-8" />, <User className="w-8 h-8" />, <Star className="w-8 h-8" />][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Main Auth Card */}
        <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full mx-auto w-20 h-20 flex items-center justify-center shadow-2xl mb-6 animate-pulse">
              {isLogin ? <LogIn className="w-10 h-10 text-white" /> : <UserPlus className="w-10 h-10 text-white" />}
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Welcome Back!' : 'Join the Fun!'}
            </h1>
            
            <p className="text-white/80 text-lg">
              {isLogin ? '🎮 Ready to play some trivia?' : '✨ Create your account to start!'}
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl border-2 animate-slideIn ${
              messageType === 'success' 
                ? 'bg-green-500/20 border-green-400/50 text-green-100' 
                : 'bg-red-500/20 border-red-400/50 text-red-100'
            }`}>
              <div className="flex items-center space-x-2">
                {messageType === 'success' ? 
                  <Sparkles className="w-5 h-5" /> : 
                  <Shield className="w-5 h-5" />
                }
                <span className="font-medium">{message}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-white/90 font-semibold text-sm">
                <User className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:border-pink-400 focus:bg-white/25 transition-all duration-300 outline-none"
                  placeholder="Enter your username"
                  maxLength={20}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>

            {/* PIN Field */}
            <div className="space-y-2">
              <label className="block text-white/90 font-semibold text-sm">
                <Lock className="w-4 h-4 inline mr-2" />
                4-Digit PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setPin(value);
                  }}
                  className="w-full px-4 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:border-pink-400 focus:bg-white/25 transition-all duration-300 outline-none text-center text-2xl tracking-widest"
                  placeholder="••••"
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-center space-x-2 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < pin.length 
                        ? 'bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg' 
                        : 'bg-white/30'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Confirm PIN for Signup */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-white/90 font-semibold text-sm">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Confirm PIN
                </label>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={confirmPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setConfirmPin(value);
                    }}
                    className="w-full px-4 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:border-pink-400 focus:bg-white/25 transition-all duration-300 outline-none text-center text-2xl tracking-widest"
                    placeholder="••••"
                    maxLength={4}
                  />
                </div>
                <div className="flex justify-center space-x-2 mt-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i < confirmPin.length 
                          ? pin === confirmPin && confirmPin.length === 4
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg'
                          : 'bg-white/30'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleAuth}
              disabled={isLoading || !username.trim() || pin.length !== 4 || (!isLogin && confirmPin !== pin)}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold rounded-xl text-lg shadow-2xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  <span>{isLogin ? '🚀 Login' : '✨ Create Account'}</span>
                </div>
              )}
            </button>
          </div>

          {/* Switch Mode */}
          <div className="mt-8 text-center">
            <p className="text-white/80 mb-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={switchMode}
              className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg hover:underline transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? '🌟 Sign up here' : '🎯 Login here'}
            </button>
          </div>

          {/* Fun Security Tips */}
          <div className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 mt-1 animate-pulse" />
              <div>
                <h3 className="font-bold text-blue-400 mb-2">🔐 Security Tips</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Choose a unique 4-digit PIN</li>
                  <li>• Don't share your credentials</li>
                  <li>• Make your username memorable!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8">
          <div className="bg-white/10 p-3 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}>
            <Heart className="w-6 h-6 text-pink-400" />
          </div>
        </div>
        
        <div className="absolute top-8 right-8">
          <div className="bg-white/10 p-3 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 p-3 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}>
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>
      </div>
    );
};

export default AuthPage;