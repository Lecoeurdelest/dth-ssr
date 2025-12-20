import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useChat } from '../contexts/ChatContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBox() {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Chúng tôi là dịch vụ sửa chữa điện-nước và bảo trì nhà cửa. Bạn cần hỗ trợ gì?',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: 'Chúng tôi phục vụ 24/7, sẵn sàng hỗ trợ bạn mọi lúc!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'Cảm ơn bạn đã liên hệ! Nhân viên của chúng tôi sẽ phản hồi trong vài phút. Hoặc bạn có thể gọi hotline: 0123-456-789 để được hỗ trợ ngay.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickMessage = (serviceType: string) => {
    const quickMessages: { [key: string]: string } = {
      'Sửa điện': 'Tôi cần tư vấn về dịch vụ sửa chữa điện',
      'Sửa nước': 'Tôi cần tư vấn về dịch vụ sửa chữa nước',
      'Thông tắc': 'Tôi cần tư vấn về dịch vụ thông tắc cống',
      'Điều hòa': 'Tôi cần tư vấn về dịch vụ sửa điều hòa',
      'Sơn nhà': 'Tôi cần tư vấn về dịch vụ sơn nhà',
      'Báo giá': 'Tôi muốn nhận báo giá dịch vụ'
    };

    const message = quickMessages[serviceType] || serviceType;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);

    // Simulate bot response with specific service info
    setTimeout(() => {
      let botText = '';
      
      switch(serviceType) {
        case 'Sửa điện':
          botText = 'Cảm ơn bạn quan tâm đến dịch vụ sửa điện! Chúng tôi cung cấp: sửa chập điện, thay thế ổ cắm, lắp đèn, kiểm tra hệ thống điện... Bạn gặp vấn đề gì cụ thể? Hoặc gọi ngay: 0123-456-789';
          break;
        case 'Sửa nước':
          botText = 'Cảm ơn bạn quan tâm đến dịch vụ sửa nước! Chúng tôi cung cấp: sửa vòi nước, thay đường ống, sửa bồn cầu, bình nóng lạnh... Bạn cần hỗ trợ gì? Hotline: 0123-456-789';
          break;
        case 'Thông tắc':
          botText = 'Cảm ơn bạn quan tâm đến dịch vụ thông tắc! Chúng tôi xử lý: thông tắc bồn cầu, chậu rửa, cống thoát nước, đường ống... Vấn đề của bạn ở đâu? Gọi ngay: 0123-456-789';
          break;
        case 'Điều hòa':
          botText = 'Cảm ơn bạn quan tâm đến dịch vụ điều hòa! Chúng tôi cung cấp: vệ sinh, sửa chữa, nạp gas, di dời máy lạnh... Bạn cần dịch vụ gì? Hotline: 0123-456-789';
          break;
        case 'Sơn nhà':
          botText = 'Cảm ơn bạn quan tâm đến dịch vụ sơn nhà! Chúng tôi cung cấp: sơn trong/ngoại thất, sơn lại, chống thấm... Diện tích cần sơn bao nhiêu m²? Gọi: 0123-456-789';
          break;
        case 'Báo giá':
          botText = 'Để báo giá chính xác, vui lòng cho biết: 1) Loại dịch vụ cần, 2) Địa chỉ, 3) Mô tả chi tiết vấn đề. Hoặc gọi trực tiếp: 0123-456-789 để được tư vấn miễn phí!';
          break;
        default:
          botText = 'Cảm ơn bạn đã liên hệ! Nhân viên của chúng tôi sẽ phản hồi trong vài phút. Hoặc bạn có thể gọi hotline: 0123-456-789 để được hỗ trợ ngay.';
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[90vw] md:w-96 h-[500px] md:h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-t-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="text-white">
            <h3 className="font-bold">Tư vấn 24/7</h3>
            <p className="text-xs opacity-90">Luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>
        <button
          onClick={closeChat}
          className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-md'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 mb-2">Chọn nhanh dịch vụ:</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="text-xs bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 text-amber-900 rounded-lg px-3 py-2 transition-all shadow-sm hover:shadow-md"
            onClick={() => handleQuickMessage('Sửa điện')}
          >
            ⚡ Sửa điện
          </button>
          <button
            className="text-xs bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 text-blue-900 rounded-lg px-3 py-2 transition-all shadow-sm hover:shadow-md"
            onClick={() => handleQuickMessage('Sửa nước')}
          >
            💧 Sửa nước
          </button>
          <button
            className="text-xs bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 text-green-900 rounded-lg px-3 py-2 transition-all shadow-sm hover:shadow-md"
            onClick={() => handleQuickMessage('Thông tắc')}
          >
            🔧 Thông tắc
          </button>
          <button
            className="text-xs bg-gradient-to-r from-cyan-100 to-cyan-50 hover:from-cyan-200 hover:to-cyan-100 text-cyan-900 rounded-lg px-3 py-2 transition-all shadow-sm hover:shadow-md"
            onClick={() => handleQuickMessage('Điều hòa')}
          >
            ❄️ Điều hòa
          </button>
          <button
            className="text-xs bg-gradient-to-r from-purple-100 to-purple-50 hover:from-purple-200 hover:to-purple-100 text-purple-900 rounded-lg px-3 py-2 transition-all shadow-sm hover:shadow-md"
            onClick={() => handleQuickMessage('Sơn nhà')}
          >
            🎨 Sơn nhà
          </button>
          <button
            className="text-xs bg-gradient-to-r from-rose-100 to-rose-50 hover:from-rose-200 hover:to-rose-100 text-rose-900 rounded-lg px-3 py-2 transition-all shadow-sm hover:shadow-md"
            onClick={() => handleQuickMessage('Báo giá')}
          >
            💰 Báo giá
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1 rounded-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-cyan-600 hover:bg-cyan-700 rounded-full px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Phone className="w-4 h-4 text-gray-500" />
          <a href="tel:0123456789" className="text-sm text-cyan-600 font-medium hover:underline">
            0123-456-789
          </a>
        </div>
      </div>
    </div>
  );
}