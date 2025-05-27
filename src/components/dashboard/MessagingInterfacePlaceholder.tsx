"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, Search, Smile, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Chat, Message, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// Mock data
const MOCK_USERS: Record<string, Pick<User, 'id' | 'name' | 'avatarUrl'>> = {
  'user1': { id: 'user1', name: 'Alice (Brand Manager)', avatarUrl: 'https://placehold.co/100x100/9400D3/FFFFFF.png?text=AM' },
  'user2': { id: 'user2', name: 'Bob (Influencer)', avatarUrl: 'https://placehold.co/100x100/7DF9FF/000000.png?text=BI' },
  'user3': { id: 'user3', name: 'Charlie (Agency Rep)', avatarUrl: 'https://placehold.co/100x100/F0F0F0/333333.png?text=CR' },
};

const MOCK_CHATS: Chat[] = [
  { id: 'chat1', participantIds: ['currentUser', 'user2'], updatedAt: new Date(Date.now() - 3600000).toISOString(), lastMessage: { id:'msg1', chatId:'chat1', senderId:'user2', receiverId:'currentUser', content:'Hey, interested in your new campaign!', timestamp: new Date(Date.now() - 3600000).toISOString(), read:false } },
  { id: 'chat2', participantIds: ['currentUser', 'user3'], updatedAt: new Date(Date.now() - 7200000).toISOString(), lastMessage: { id:'msg2', chatId:'chat2', senderId:'currentUser', receiverId:'user3', content:'Let\'s discuss the terms for Project X.', timestamp: new Date(Date.now() - 7200000).toISOString(), read:true } },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  'chat1': [
    { id:'msg1.1', chatId:'chat1', senderId:'user2', receiverId:'currentUser', content:'Hey, interested in your new campaign!', timestamp: new Date(Date.now() - 3600000).toISOString(), read:false },
    { id:'msg1.2', chatId:'chat1', senderId:'currentUser', receiverId:'user2', content:'Great! Let me send you the brief.', timestamp: new Date(Date.now() - 3500000).toISOString(), read:true },
  ],
  'chat2': [
     { id:'msg2.1', chatId:'chat2', senderId:'currentUser', receiverId:'user3', content:'Let\'s discuss the terms for Project X.', timestamp: new Date(Date.now() - 7200000).toISOString(), read:true },
     { id:'msg2.2', chatId:'chat2', senderId:'user3', receiverId:'currentUser', content:'Sure, I\'m available to chat now.', timestamp: new Date(Date.now() - 7100000).toISOString(), read:true },
  ],
};


export function MessagingInterfacePlaceholder() {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate fetching chats for current user
    if(currentUser) {
        const userChats = MOCK_CHATS.map(chat => ({
            ...chat,
            participantIds: chat.participantIds.map(id => id === 'currentUser' ? currentUser.id : id)
        })).filter(chat => chat.participantIds.includes(currentUser.id));
        setChats(userChats);
        if(userChats.length > 0) {
            setSelectedChat(userChats[0]);
        }
    }
  }, [currentUser]);

  useEffect(() => {
    // Simulate fetching messages for selected chat
    if (selectedChat) {
      setMessages(MOCK_MESSAGES[selectedChat.id] || []);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);
  
  const getOtherParticipant = (chat: Chat) => {
      if (!currentUser) return null;
      const otherId = chat.participantIds.find(id => id !== currentUser.id);
      return otherId ? MOCK_USERS[otherId] || {id: otherId, name: `User ${otherId.slice(-4)}`} : null;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !currentUser) return;
    const msg: Message = {
      id: `msg${Date.now()}`,
      chatId: selectedChat.id,
      senderId: currentUser.id,
      receiverId: selectedChat.participantIds.find(id => id !== currentUser.id)!,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, msg]);
    // Update last message in chat list (mock)
    setChats(prevChats => prevChats.map(c => c.id === selectedChat.id ? {...c, lastMessage: msg, updatedAt: msg.timestamp} : c).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    setNewMessage("");
  };

  const filteredChats = chats.filter(chat => {
    const otherParticipant = getOtherParticipant(chat);
    return otherParticipant?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <Card className="h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] flex flex-col shadow-xl overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar for chats */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col bg-background">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <div className="relative mt-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search chats..." 
                    className="pl-8 h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredChats.map(chat => {
              const otherParticipant = getOtherParticipant(chat);
              if (!otherParticipant) return null;
              const initials = otherParticipant.name ? otherParticipant.name.substring(0,2).toUpperCase() : '??';
              return (
                <div
                  key={chat.id}
                  className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-secondary/70 border-b ${selectedChat?.id === chat.id ? 'bg-secondary' : ''}`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} data-ai-hint="person avatar"/>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-semibold text-sm truncate">{otherParticipant.name}</h3>
                    <p className={`text-xs truncate ${!chat.lastMessage?.read && chat.lastMessage?.receiverId === currentUser?.id ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                        {chat.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                  {/* Unread indicator could go here */}
                </div>
              );
            })}
            {filteredChats.length === 0 && <p className="p-4 text-sm text-muted-foreground text-center">No conversations found.</p>}
          </ScrollArea>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-secondary/30">
          {selectedChat && currentUser ? (
            <>
              <div className="p-4 border-b bg-background flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={getOtherParticipant(selectedChat)?.avatarUrl} alt={getOtherParticipant(selectedChat)?.name} data-ai-hint="person avatar"/>
                    <AvatarFallback>{getOtherParticipant(selectedChat)?.name?.substring(0,2).toUpperCase() || '??'}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">{getOtherParticipant(selectedChat)?.name}</h2>
              </div>
              <ScrollArea className="flex-1 p-4 space-y-4 bg-slate-50 dark:bg-slate-800/30">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-xl shadow-sm ${msg.senderId === currentUser.id ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Start the conversation!</p>}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-background flex items-center gap-2">
                <Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon" type="button"><Smile className="h-5 w-5 text-muted-foreground" /></Button>
                <Input 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type a message..." 
                    className="flex-1 h-10" 
                    autoComplete="off"
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/80 text-primary-foreground aspect-square">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-800/30">
              <MessageSquare className="h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">Select a Chat</h3>
              <p className="mt-1 text-muted-foreground">Choose a conversation from the list to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
