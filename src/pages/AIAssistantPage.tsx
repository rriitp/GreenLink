import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Trash2,
  Sparkles,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantPageProps {
  currentUser: { name: string; preferredLanguage?: string };
}

const SUGGESTED_PROMPTS = [
  {
    label: 'Wheat Cultivation Precautions',
    hindiLabel: 'गेहूं की खेती की सावधानियां',
    prompt: 'What precautions should I take when growing wheat?',
  },
  {
    label: 'Official Scheme Information',
    hindiLabel: 'सरकारी योजनाओं की सही जानकारी',
    prompt: 'How can I find official information about agricultural schemes?',
  },
  {
    label: 'Selling Checklist & Mandi Rates',
    hindiLabel: 'मंडी में फसल बेचने से पहले की जांच',
    prompt: 'What information should I compare before selling my crops?',
  },
  {
    label: 'Crop Rotation in Hindi',
    hindiLabel: 'फसल चक्र (Crop Rotation) की सरल समझ',
    prompt: 'Explain crop rotation in simple Hindi.',
  },
  {
    label: 'Integrated Pest Management',
    hindiLabel: 'टमाटर फल छेदक (Fruit Borer) नियंत्रण',
    prompt: 'What are safe organic pest management practices for tomato fruit borer?',
  },
];

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: `🌾 **नमस्ते किसान भाई / Welcome!**
I am **Kisan Saathi (किसान साथी)**, your digital agricultural assistant on the GreenLink platform.

How can I assist your farming today?
- Ask about crop cycles (Wheat, Paddy, Mustard, Potato, Onion, Tomato)
- Understand official central & state schemes (PM-KISAN, PMFBY, KCC)
- Learn fair mandi price comparisons and storage precautions

*You can speak or type in English, Hindi (हिंदी), or Hinglish!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLiveAI: true,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [languageMode, setLanguageMode] = useState<'mixed' | 'hi' | 'en'>(
    currentUser.preferredLanguage === 'Hindi' ? 'hi' : 'mixed'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send to server-side /api/chat route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          language: languageMode,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || 'No response generated. Please retry.';

      const assistantMsg: ChatMessage = {
        id: 'msg_asst_' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLiveAI: data.isLiveAI,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Error querying Kisan Saathi:', err);
      // Graceful local resilience
      const fallbackMsg: ChatMessage = {
        id: 'msg_fallback_' + Date.now(),
        sender: 'assistant',
        text: `👨‍🌾 **Kisan Saathi Agricultural Advisory:**
We received your question regarding: *"${text}"*.

**Key Best Practices:**
1. **Soil & Input Testing:** Verify soil moisture and test with local Krishi Vigyan Kendra (KVK) before chemical applications.
2. **Weather-Smart Timing:** Avoid irrigation or spraying during windy (>15 km/h) or humid, overcast days.
3. **Official Portals:** Check [pmkisan.gov.in](https://pmkisan.gov.in) and [pmfby.gov.in](https://pmfby.gov.in) for verified scheme guidelines.

⚠️ *Reminder: Always consult your block Agriculture Extension Officer for farm-specific chemical or seed determinations.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLiveAI: false,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        text: 'Chat history cleared. Feel free to ask any new question about crops, schemes, or mandi prices!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown characters for smooth speech
    const cleanText = text.replace(/[*#_`]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick hindi or english voice if available
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find((v) => v.lang.startsWith('hi'));
    if (hiVoice) {
      utterance.voice = hiVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#168B5C] to-[#0B362F] text-white flex items-center justify-center shadow-md">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Kisan Saathi (किसान साथी)
              </h1>
              <span className="text-[10px] bg-emerald-100 text-[#0B362F] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Gemini 3.8 Flash AI
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Conversational Agricultural Assistant &bull; Hindi, English & Hinglish
            </p>
          </div>
        </div>

        {/* Controls: Language & Clear */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
            <button
              onClick={() => setLanguageMode('hi')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                languageMode === 'hi' ? 'bg-[#168B5C] text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                languageMode === 'en' ? 'bg-[#168B5C] text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguageMode('mixed')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                languageMode === 'mixed' ? 'bg-[#168B5C] text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Auto
            </button>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Questions Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
          Frequently Asked Agricultural Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sp.prompt)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-400 text-gray-700 text-xs font-medium transition-all shadow-sm hover:scale-102 text-left"
            >
              {languageMode === 'hi' ? sp.hindiLabel : sp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#168B5C] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#168B5C] text-white rounded-tr-none shadow-sm'
                      : 'bg-emerald-50/60 text-gray-800 border border-emerald-100 rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* Message body with Markdown support */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text}
                  </div>

                  {/* Actions for Assistant */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[10px] text-gray-500">
                      <span>{msg.timestamp} &bull; {msg.isLiveAI ? 'Gemini 3.8 Flash' : 'Kisan Saathi Engine'}</span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeakText(msg.text)}
                          className="hover:text-emerald-700 p-0.5"
                          title="Listen to audio response"
                        >
                          {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-emerald-700 p-0.5"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {isUser && (
                    <div className="mt-1 text-right text-[10px] text-emerald-100/70">
                      {msg.timestamp}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#168B5C] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-[#168B5C] animate-ping" />
                <span>Kisan Saathi is synthesizing agricultural advisory...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={
                languageMode === 'hi'
                  ? 'अपनी फसल या योजना से संबंधित सवाल यहाँ पूछें...'
                  : 'Ask a question about wheat sowing, fertilizer timing, PM-KISAN, or pest control...'
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 rounded-xl bg-[#168B5C] hover:bg-[#12724B] disabled:bg-gray-300 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          {/* AI Disclosure */}
          <div className="mt-2 text-center text-[10px] text-gray-400">
            Kisan Saathi provides general agricultural information. For laboratory chemical dosages, always consult your local Krishi Vigyan Kendra (KVK).
          </div>
        </div>
      </div>
    </div>
  );
};
