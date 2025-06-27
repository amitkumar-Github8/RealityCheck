import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Brain, 
  Zap, 
  Settings,
  MessageSquare,
  Sparkles,
  Download,
  Copy,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ModelConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const OracleRoomPage: React.FC = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const models: ModelConfig[] = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Advanced reasoning and analysis',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mistral',
      name: 'Mistral',
      description: 'Fast and efficient responses',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ollama',
      name: 'Ollama',
      description: 'Local model processing',
      icon: Settings,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateMockResponse(inputMessage, selectedModel),
        timestamp: new Date(),
        model: selectedModel
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const generateMockResponse = (input: string, model: string): string => {
    const responses = {
      'gpt-4': [
        "Based on my analysis, this is a complex topic that requires careful consideration of multiple factors. Let me break this down systematically...",
        "I understand you're looking for insights on this matter. From a strategic perspective, there are several key considerations...",
        "This is an interesting question that touches on several important domains. Let me provide a comprehensive analysis..."
      ],
      'mistral': [
        "Here's a concise analysis of your query. The key points to consider are...",
        "I can help you with that. Based on current data and trends...",
        "That's a great question. Let me provide you with a focused response..."
      ],
      'ollama': [
        "Processing your request locally. Here's what I found...",
        "Using local inference to analyze your query. The results indicate...",
        "Local model analysis complete. Key insights include..."
      ]
    };

    const modelResponses = responses[model as keyof typeof responses] || responses['gpt-4'];
    return modelResponses[Math.floor(Math.random() * modelResponses.length)] + 
           " This response demonstrates the capabilities of the " + models.find(m => m.id === model)?.name + 
           " model in providing detailed, contextual answers to your research questions.";
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-8 h-[calc(100vh-5rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-sm border mb-4 ${
            isDark 
              ? 'bg-white/5 border-white/10 text-purple-300' 
              : 'bg-white/50 border-purple-200 text-purple-700'
          }`}>
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Advanced AI Consultation</span>
          </div>
          
          <h1 className={`text-4xl font-bold mb-2 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Oracle Room
          </h1>
          <p className={`text-lg transition-colors ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Consult with advanced AI models for research and strategic guidance
          </p>
        </motion.div>

        <div className="flex-1 flex gap-6">
          {/* Model Selection Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80"
          >
            <div className={`backdrop-blur-sm border rounded-3xl p-6 shadow-xl h-fit ${
              isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-white/50 border-slate-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                AI Models
              </h2>
              
              <div className="space-y-3">
                {models.map((model) => {
                  const Icon = model.icon;
                  const isSelected = selectedModel === model.id;
                  
                  return (
                    <motion.button
                      key={model.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedModel(model.id)}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                        isSelected
                          ? isDark
                            ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                            : 'bg-purple-100 border-purple-300 shadow-lg shadow-purple-500/10'
                          : isDark
                            ? 'bg-white/5 border-white/10 hover:bg-white/10'
                            : 'bg-white/50 border-slate-200 hover:bg-white/70'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${model.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`font-semibold transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {model.name}
                        </span>
                      </div>
                      <p className={`text-sm transition-colors ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {model.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {messages.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearChat}
                  className={`w-full mt-6 p-3 rounded-2xl border transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isDark
                      ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                      : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear Chat</span>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className={`backdrop-blur-sm border rounded-3xl shadow-xl flex-1 flex flex-col ${
              isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-white/50 border-slate-200'
            }`}>
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <p className={`text-xl font-semibold mb-2 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Start a Conversation
                      </p>
                      <p className={`transition-colors ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Ask questions, seek insights, or discuss research topics
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-3xl flex items-start space-x-3 ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`p-2 rounded-xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : isDark
                                ? 'bg-slate-700'
                                : 'bg-slate-200'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-5 h-5 text-white" />
                            ) : (
                              <Bot className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                            )}
                          </div>
                          
                          <div className={`p-4 rounded-2xl backdrop-blur-sm border relative group ${
                            message.type === 'user'
                              ? isDark
                                ? 'bg-purple-600/20 border-purple-500/30'
                                : 'bg-purple-100 border-purple-200'
                              : isDark
                                ? 'bg-white/5 border-white/10'
                                : 'bg-white/70 border-slate-200'
                          }`}>
                            <p className={`transition-colors ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {message.content}
                            </p>
                            
                            {message.model && (
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                <span className={`text-xs font-medium transition-colors ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  {models.find(m => m.id === message.model)?.name}
                                </span>
                                <button
                                  onClick={() => copyMessage(message.content)}
                                  className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 ${
                                    isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                                  }`}
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-xl ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                          }`}>
                            <Bot className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                          </div>
                          <div className={`p-4 rounded-2xl backdrop-blur-sm border ${
                            isDark
                              ? 'bg-white/5 border-white/10'
                              : 'bg-white/70 border-slate-200'
                          }`}>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/10">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask the Oracle anything..."
                    className={`flex-1 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-slate-400'
                        : 'bg-white/50 border-slate-200 text-slate-900 placeholder-slate-500'
                    }`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${
          isDark ? 'bg-purple-500' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${
          isDark ? 'bg-pink-500' : 'bg-pink-300'
        }`}></div>
      </div>
    </div>
  );
};

export default OracleRoomPage;