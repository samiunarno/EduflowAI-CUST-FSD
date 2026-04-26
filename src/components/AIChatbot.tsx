import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

interface AIChatbotProps {
  students: any[];
  feedbacks: any[];
}

export default function AIChatbot({ students, feedbacks }: AIChatbotProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: t.chatbot.welcome }]);
    }
  }, [t.chatbot.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          messages: messages,
          userMessage: userMessage,
          students: students.map(s => ({ name: s.name, course: s.course, marks: s.marks })),
          feedbacks: feedbacks.map(f => ({ student: f.studentId?.name, course: f.course, insight: f.content }))
        })
      });

      if (!response.ok) {
        throw new Error("Server failed to generate response");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error("AI Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error while analyzing the data. Please ensure the Gemini API key is properly configured." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        id="ai-chat-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-zinc-900 text-white p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-110 transition-transform active:scale-95 z-50 flex items-center gap-2 group border border-zinc-800"
      >
        <div className="relative">
          <Bot id="ai-chat-bot-icon" className="w-6 h-6 text-indigo-400 group-hover:animate-pulse" />
          <div id="ai-chat-online-indicator" className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900 shadow-sm" />
        </div>
        <span id="ai-chat-trigger-text" className="font-bold text-sm pr-1">{t.chatbot.trigger}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="ai-chat-window"
            initial={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            className="fixed bottom-24 right-8 w-[420px] max-w-[calc(100vw-64px)] h-[640px] max-h-[calc(100vh-140px)] bg-white rounded-[32px] border border-zinc-200 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.18)] flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div id="ai-chat-header" className="p-6 bg-zinc-900 text-white flex items-center justify-between relative overflow-hidden">
               <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
               <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[60px] pointer-events-none" />
               
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30 shadow-inner">
                  <Bot className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg tracking-tight leading-none mb-1">{t.chatbot.title}</div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5 opacity-90">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.chatbot.subtitle}
                  </div>
                </div>
              </div>
              <button 
                id="ai-chat-close-button"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Messages */}
            <div id="ai-chat-messages-container" className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-zinc-50/30">
              {messages.map((m, idx) => (
                <div key={idx} id={`ai-chat-message-row-${idx}`} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105 ${m.role === 'user' ? 'bg-zinc-900 text-white border border-zinc-800' : 'bg-white text-zinc-400 border border-zinc-200'}`}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm border transition-all ${m.role === 'user' ? 'bg-zinc-900 text-zinc-200 border-zinc-800 rounded-tr-none' : 'bg-white text-zinc-800 border-zinc-200/60 rounded-tl-none hover:border-zinc-300'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div id="ai-chat-loading-indicator" className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-indigo-400 animate-bounce" />
                    </div>
                    <div className="bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                      </div>
                      <span className="text-[13px] font-semibold text-zinc-500 italic">{t.chatbot.loading}</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div id="ai-chat-footer" className="p-6 border-t border-zinc-100 bg-white">
              <div className="relative group">
                <input 
                  id="ai-chat-input-field"
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.chatbot.placeholder}
                  className="w-full pl-5 pr-14 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-[14px] focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-400 font-medium"
                />
                <button 
                  id="ai-chat-send-button"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 disabled:opacity-30 transition-all active:scale-90 shadow-lg disabled:shadow-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="h-px bg-zinc-100 flex-1" />
                <p id="ai-chat-branding" className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                   {t.chatbot.branding}
                </p>
                <div className="h-px bg-zinc-100 flex-1" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
