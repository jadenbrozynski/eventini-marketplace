'use client';

import { useState } from 'react';
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
  ChevronLeft,
} from 'lucide-react';

const mockConversations = [
  {
    id: '1',
    name: 'Emily Chen',
    lastMessage: 'Hi! I wanted to confirm the menu for next Saturday...',
    time: '10 min ago',
    unread: 2,
    online: true,
    eventType: 'Wedding',
  },
  {
    id: '2',
    name: 'David Park',
    lastMessage: 'Thank you for the quote. We would like to proceed with the package.',
    time: '1 hour ago',
    unread: 1,
    online: false,
    eventType: 'Corporate',
  },
  {
    id: '3',
    name: 'Lisa Martinez',
    lastMessage: 'Can you accommodate 20 additional guests?',
    time: '3 hours ago',
    unread: 0,
    online: true,
    eventType: 'Birthday',
  },
  {
    id: '4',
    name: 'Tech Corp Inc.',
    lastMessage: 'We have confirmed the venue. Looking forward to working with you.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    eventType: 'Corporate',
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    lastMessage: 'The decorations look amazing! Thank you so much.',
    time: '2 days ago',
    unread: 0,
    online: false,
    eventType: 'Wedding',
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: 'client',
    text: 'Hi! I wanted to confirm the menu for next Saturday. Can we make some changes?',
    time: '10:30 AM',
    status: 'read',
  },
  {
    id: '2',
    senderId: 'provider',
    text: 'Of course! I\'d be happy to help. What changes would you like to make?',
    time: '10:32 AM',
    status: 'read',
  },
  {
    id: '3',
    senderId: 'client',
    text: 'We have a few guests with dietary restrictions. Can we add some vegan and gluten-free options?',
    time: '10:35 AM',
    status: 'read',
  },
  {
    id: '4',
    senderId: 'provider',
    text: 'Absolutely! I can add our signature vegan dishes and gluten-free alternatives. How many guests have these requirements?',
    time: '10:38 AM',
    status: 'read',
  },
  {
    id: '5',
    senderId: 'client',
    text: 'About 15 vegan and 8 gluten-free. Is that manageable?',
    time: '10:40 AM',
    status: 'delivered',
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  const filteredConversations = mockConversations.filter((conv) => {
    if (searchQuery && !conv.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessageInput('');
  };

  const handleSelectConversation = (conv: typeof mockConversations[0]) => {
    setSelectedConversation(conv);
    setShowChat(true);
  };

  return (
    <div className="fixed inset-0 top-[136px] md:top-[152px] flex bg-white">
      {/* Conversations List */}
      <div className={`${showChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-200`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#44646c]/20"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedConversation.id === conversation.id ? 'bg-[#44646c]/5' : ''
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  conversation.unread > 0 ? 'bg-[#44646c]' : 'bg-gray-200'
                }`}>
                  <span className={`text-sm font-semibold ${
                    conversation.unread > 0 ? 'text-white' : 'text-gray-600'
                  }`}>
                    {conversation.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm truncate ${conversation.unread > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-400 shrink-0">{conversation.time}</span>
                </div>
                <span className="text-xs text-[#44646c] bg-[#44646c]/10 px-2 py-0.5 rounded-full inline-block mt-1">
                  {conversation.eventType}
                </span>
                <p className={`text-sm truncate mt-1 ${conversation.unread > 0 ? 'text-gray-700' : 'text-gray-500'}`}>
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#44646c] text-white text-xs flex items-center justify-center font-medium shrink-0">
                  {conversation.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${showChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-gray-50`}>
        {/* Chat Header */}
        <div className="h-16 px-4 md:px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChat(false)}
              className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#44646c] flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {selectedConversation.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              {selectedConversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
              <p className="text-xs text-gray-500">
                {selectedConversation.online ? (
                  <span className="text-green-600">Online</span>
                ) : (
                  'Last seen recently'
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Info className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <div className="text-center mb-6">
            <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">Today</span>
          </div>
          {mockMessages.map((message) => {
            const isProvider = message.senderId === 'provider';
            return (
              <div
                key={message.id}
                className={`flex ${isProvider ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-2xl ${
                    isProvider
                      ? 'bg-[#44646c] text-white rounded-br-md'
                      : 'bg-white text-gray-900 shadow-sm rounded-bl-md border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1.5 ${
                    isProvider ? 'text-white/60' : 'text-gray-400'
                  }`}>
                    <span className="text-[11px]">{message.time}</span>
                    {isProvider && (
                      message.status === 'read' ? (
                        <CheckCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors shrink-0">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#44646c]/20"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="p-3 bg-[#44646c] text-white rounded-full hover:bg-[#3a565d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
