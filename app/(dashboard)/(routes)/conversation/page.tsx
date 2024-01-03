"use client";

import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import UserMessage from "@/components/dashboard/user-message";
import AiResponse from "@/components/dashboard/ai-response";
import { Textarea } from "@/components/ui/textarea";
import MarkdownResponse from "@/components/dashboard/markdown-response";
import ToolsNavigation from "@/components/dashboard/tools-navigation";
import { useProStore } from "@/stores/pro-store";
import { useToast } from "@/components/ui/use-toast";

const ConversationPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleOpenOrCloseProModal } = useProStore();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    setMessages,
  } = useChat({
    api: "/api/conversation",
  });

  const handleClearChat = () => {
    setMessages([]);
  };

  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      const errorParse = JSON.parse(error.message);

      if (errorParse?.status === 429) {
        toast({
          variant: "destructive",
          description: errorParse.message,
          title: "Exceed Request",
        });
      }
    }
  }, [error]);

  return (
    <div className="h-full relative flex flex-col justify-between">
      <div
        ref={containerRef}
        className="h-[calc(100vh-180px)] overflow-y-auto space-y-10 scroll-smooth"
      >
        {messages.length > 0 ? (
          <>
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? (
                  <UserMessage>
                    <MarkdownResponse content={m.content} />
                  </UserMessage>
                ) : (
                  <AiResponse>
                    <MarkdownResponse content={m.content} />
                  </AiResponse>
                )}
              </div>
            ))}
            <div className="absolute left-0 bottom-20 text-right w-full pr-3">
              <Button size="sm" onClick={handleClearChat} variant="outline">
                Clear chat
              </Button>
            </div>
          </>
        ) : (
          <ToolsNavigation />
        )}
      </div>
      <div className="mb-[13px]">
        <form
          onSubmit={isLoading ? stop : handleSubmit}
          className="flex items-center w-full relative"
        >
          <Textarea
            placeholder="Do you have any questions today?"
            value={input}
            className="min-h-1 resize-none"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            disabled={!input}
            className="absolute right-2 gradient-btn"
          >
            {isLoading ? "Stop" : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
