import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, GradeNumber } from '../types';
import { MessageSquare, Send, Sparkles, User, AlertCircle } from 'lucide-react';

interface AITutorProps {
  grade: GradeNumber;
}

export default function AITutor({ grade }: AITutorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Salom! Men sizning shaxsiy AI o'qituvchingizman. 😇\nSizga ${grade}-sinf matematika yoki ingliz tili darslarini o'rganishda yordam beraman. Menga xohlagan savolingizni bering! Masalan, ingliz tili zamonlari yoki qiyin matematik formulalar haqida so'rashingiz mumkin.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    { text: 'Present Simple va Present Continuous farqi nimada?', label: 'Zamonlar farqi 📝' },
    { text: 'Kvadrat uchhadni ko\'paytuvchilarga ajratish formulasi', label: 'Math formula 📐' },
    { text: 'Past Perfect Continuous nima va qachon ishlatiladi?', label: 'Past Perfect Continuous 🕒' },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          grade: grade,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: data.text || "Uzr, javob yuklashda muammo bo'ldi. Qayta urinib ko'ring.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error with AI Tutor API:', error);
      const errorMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: "Kechirasiz, tizimga ulanishda xatolik yuz berdi. Internetni tekshiring yoki birozdan so'ng qayta urinib ko'ring.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-tutor-container" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[520px]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse fill-indigo-100" />
            AI O'qituvchi Yordamchi
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">{grade}-sinf o'quv dasturi bo'yicha yordam beradi</p>
        </div>
        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold">
          Gemini 3.5 Flash
        </span>
      </div>

      {/* Chat Messages viewport */}
      <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-4 font-normal" id="chat-viewport">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                  AI
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                isAi 
                  ? 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none whitespace-pre-line' 
                  : 'bg-indigo-600 text-white rounded-tr-none'
              }`}>
                {msg.text}
                <span className={`block text-[10px] mt-1.5 text-right ${
                  isAi ? 'text-slate-400' : 'text-indigo-200'
                }`}>
                  {msg.timestamp}
                </span>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
              AI
            </div>
            <div className="bg-slate-50 border border-slate-150 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Prefilled helpers */}
      {messages.length < 3 && (
        <div className="flex gap-2 overflow-x-auto pb-3 shrink-0" id="suggested-prompts">
          {sampleQuestions.map((q) => (
            <button
              key={q.text}
              onClick={() => handleSend(q.text)}
              className="flex-shrink-0 text-left bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-150 text-indigo-950 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer select-none transition-colors"
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      {/* Bottom typing bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputText);
        }}
        className="flex items-center gap-2 pt-3 border-t border-slate-100 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Darslar yoki qiyin burchaklarni so'rang..."
          disabled={isLoading}
          className="flex-1 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-4 py-3 text-sm text-slate-800 transition-all font-medium placeholder-slate-400"
        />
        <button
          type="submit"
          id="send-ai-chat-btn"
          disabled={!inputText.trim() || isLoading}
          className="bg-indigo-600 disabled:opacity-45 hover:bg-indigo-500 text-white rounded-xl p-3 cursor-pointer transition-all flex items-center justify-center hover:scale-105 active:scale-95 shrink-0 shadow-md shadow-indigo-100"
        >
          <Send className="w-4 h-4 fill-current" />
        </button>
      </form>
    </div>
  );
}
