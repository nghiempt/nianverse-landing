"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Upload, Loader2 } from "lucide-react";
import { chatService } from "@/lib/chat-service";
import { uploadService } from "@/lib/upload-service";

interface Message {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
}

interface ConversationState {
    current_step: string;
    collected_fields: string[];
    next_field_to_collect: string | null;
    progress_percentage: number;
    business_type?: string;
}

export default function ChatPage() {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationState, setConversationState] = useState<ConversationState | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [collectedData, setCollectedData] = useState<{
        IsComplete: boolean;
        CanCreateStore: boolean;
        CollectedData?: Record<string, unknown>;
        MissingFields?: string[];
        ValidationErrors?: unknown[];
        ProgressPercentage: number;
        NextFieldToCollect: string | null;
    } | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Create session on mount
        const initSession = async () => {
            try {
                const userId = localStorage.getItem("chatUserId") || crypto.randomUUID();
                localStorage.setItem("chatUserId", userId);

                const result = await chatService.createSession(userId);
                if (result.status === 2 && result.data) {
                    setSessionId(result.data.SessionId);
                    localStorage.setItem("chatSessionId", result.data.SessionId);
                    localStorage.setItem("chatExpiresAt", result.data.ExpiresAt);

                    // Load chat history
                    await loadChatHistory(result.data.SessionId);
                }
            } catch (error) {
                console.error("Failed to create session:", error);
                addSystemMessage("Không thể khởi tạo phiên chat. Vui lòng thử lại.");
            }
        };

        initSession();
    }, []);

    const loadChatHistory = async (sid: string) => {
        try {
            const result = await chatService.getChatHistory(sid);
            if (result.status === 2 && result.data && result.data.length > 0) {
                const historyMessages: Message[] = result.data.map((msg: { ID: string; Role: "user" | "assistant" | "system"; Content: string; CreatedAt: string }) => ({
                    id: msg.ID,
                    role: msg.Role,
                    content: msg.Content,
                    timestamp: new Date(msg.CreatedAt),
                }));
                setMessages(historyMessages);
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
    };

    const addSystemMessage = (content: string) => {
        const systemMsg: Message = {
            id: `system-${Date.now()}`,
            role: "system",
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, systemMsg]);
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() && selectedFiles.length === 0) return;
        if (!sessionId) {
            addSystemMessage("Session không hợp lệ. Vui lòng tải lại trang.");
            return;
        }

        setIsLoading(true);

        try {
            let messageContent = inputMessage.trim();

            // Upload images first if any
            if (selectedFiles.length > 0) {
                setUploadingImages(true);
                const uploadedUrls: string[] = [];

                for (const file of selectedFiles) {
                    const result = await uploadService.uploadImage(file, `CHAT_${sessionId}`);
                    if (result.url) {
                        uploadedUrls.push(result.url);
                    }
                }

                setUploadingImages(false);

                // Append URLs to message
                if (uploadedUrls.length > 0) {
                    messageContent = uploadedUrls.join(" ");
                    if (inputMessage.trim()) {
                        messageContent = `${inputMessage.trim()} ${messageContent}`;
                    }
                }

                setSelectedFiles([]);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }

            // Add user message to UI
            const userMsg: Message = {
                id: `user-${Date.now()}`,
                role: "user",
                content: messageContent,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMsg]);
            setInputMessage("");

            // Send to API
            const result = await chatService.sendMessage(sessionId, messageContent);

            if (result.status === 2 && result.data) {
                // Add AI response
                const aiMsg: Message = {
                    id: result.data.MessageId,
                    role: "assistant",
                    content: result.data.AiResponse,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiMsg]);

                // Update conversation state
                if (result.data.ConversationState) {
                    setConversationState(result.data.ConversationState);
                }

                // Check if completed
                if (result.data.ConversationState?.current_step === "completed") {
                    await validateSession();
                }
            } else {
                addSystemMessage(`Lỗi: ${result.message}`);
            }
        } catch (error: unknown) {
            console.error("Failed to send message:", error);
            addSystemMessage("Lỗi kết nối. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
            setUploadingImages(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles(files);
    };

    const validateSession = async () => {
        if (!sessionId) return;

        try {
            const result = await chatService.validateSession(sessionId, true);
            if (result.status === 2 && result.data) {
                setCollectedData(result.data);
            }
        } catch (error) {
            console.error("Failed to validate session:", error);
        }
    };

    const handleNewSession = async () => {
        localStorage.removeItem("chatSessionId");
        localStorage.removeItem("chatExpiresAt");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        AI Chat - Test Store Registration
                    </h1>
                    <p className="text-gray-600">
                        Test tạo cửa hàng với AI Assistant
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Chat Panel */}
                    <Card className="lg:col-span-2 flex flex-col h-175 py-0! gap-0">
                        <div className="p-4 border-b bg-white rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-lg">Chat với AI</h2>
                                    {sessionId && (
                                        <p className="text-xs text-gray-500 truncate max-w-xs">
                                            Session: {sessionId}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNewSession}
                                    className="cursor-pointer"
                                >
                                    Session mới
                                </Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg p-3 ${msg.role === "user"
                                                ? "bg-gradient-to-br from-blue-300 to-yellow-300 text-gray-900"
                                                : msg.role === "system"
                                                    ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
                                                    : "bg-white text-gray-900 shadow-sm"
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap wrap-break-word">
                                            {msg.content}
                                        </div>
                                        <div
                                            className={`text-xs mt-1 ${msg.role === "user"
                                                    ? "text-gray-700"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {msg.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(isLoading || uploadingImages) && (
                                <div className="flex justify-start">
                                    <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm text-gray-600">
                                            {uploadingImages ? "Đang upload ảnh..." : "AI đang xử lý..."}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t rounded-b-lg">
                            {selectedFiles.length > 0 && (
                                <div className="mb-2 flex flex-wrap gap-2">
                                    {selectedFiles.map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                                        >
                                            <Upload className="w-3 h-3" />
                                            {file.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2 items-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    multiple
                                    accept="image/*,.pdf"
                                    className="hidden"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isLoading}
                                    className="cursor-pointer h-10 w-10 rounded-xl"
                                >
                                    <Upload className="w-4 h-4" />
                                </Button>
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập tin nhắn hoặc chọn ảnh..."
                                    className="flex-1 h-10 px-4 py-2 border rounded-lg focus:outline-none"
                                    disabled={isLoading}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || (!inputMessage.trim() && selectedFiles.length === 0)}
                                    className="cursor-pointer hover:opacity-80 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-300 to-yellow-300 text-gray-900 border-0"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Info Panel */}
                    <div className="w-full space-y-4">
                        {/* Progress */}
                        {conversationState && (
                            <Card className="p-4">
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Hoàn thành</span>
                                            <span className="font-semibold">
                                                {conversationState.progress_percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${conversationState.progress_percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-sm">
                                        <p className="text-gray-600">Bước hiện tại:</p>
                                        <p className="font-medium">{conversationState.current_step}</p>
                                    </div>

                                    {conversationState.business_type && (
                                        <div className="text-sm">
                                            <p className="text-gray-600">Loại hình:</p>
                                            <p className="font-medium capitalize">
                                                {conversationState.business_type === "individual"
                                                    ? "Cá nhân"
                                                    : "Doanh nghiệp"}
                                            </p>
                                        </div>
                                    )}

                                    {conversationState.next_field_to_collect && (
                                        <div className="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded">
                                            <p className="text-yellow-800">
                                                <strong>Tiếp theo:</strong>{" "}
                                                {conversationState.next_field_to_collect}
                                            </p>
                                        </div>
                                    )}

                                    <div className="text-sm">
                                        <p className="text-gray-600 mb-1">
                                            Đã thu thập ({conversationState.collected_fields.length}):
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {conversationState.collected_fields.map((field) => (
                                                <span
                                                    key={field}
                                                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                                                >
                                                    {field}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Collected Data */}
                        {collectedData && (
                            <Card className="p-4 gap-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Dữ liệu đã thu thập</h3>
                                    {collectedData.CanCreateStore && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                            ✓ Có thể tạo store
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2 text-sm">
                                    {collectedData.CollectedData && (
                                        <div className="bg-gray-50 p-3 rounded max-h-96 overflow-y-auto">
                                            <pre className="whitespace-pre-wrap text-xs">
                                                {JSON.stringify(collectedData.CollectedData, null, 2)}
                                            </pre>
                                        </div>
                                    )}

                                    {collectedData.MissingFields && collectedData.MissingFields.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-red-600 font-medium mb-1">
                                                Còn thiếu:
                                            </p>
                                            <ul className="list-disc list-inside text-red-600 text-xs">
                                                {collectedData.MissingFields.map((field: string) => (
                                                    <li key={field}>{field}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={validateSession}
                                    className="w-full mt-3 cursor-pointer"
                                >
                                    Refresh Status
                                </Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
