import React, { useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ClipboardIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  RefreshCcwIcon,
  ArrowUpIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the structure of a chat message
interface ChatMessage {
  sender: string;
  content: string;
  avatar: string;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
}) => {
  const [inputMessage, setInputMessage] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      if (scrollContainer) {
        const targetScroll =
          scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const startTime = performance.now();
        const duration = 300; // Duration of the scroll animation in milliseconds

        const animateScroll = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeProgress = easeOutCubic(progress);
          const currentScroll = scrollContainer.scrollTop;
          const newScroll =
            currentScroll + (targetScroll - currentScroll) * easeProgress;

          scrollContainer.scrollTop = newScroll;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    }
  };

  // Easing function for smooth animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen pt-10">
      <ScrollArea
        className="h-[80vh] w-full rounded-md border mx-auto"
        ref={scrollAreaRef}
      >
        <div className="flex flex-col gap-4 p-6">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="w-6 h-6 border">
                <AvatarImage
                  src={message.avatar}
                  alt={`${message.sender} avatar`}
                />
                <AvatarFallback>
                  {message.sender.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-bold">{message.sender}</div>
                <div className="prose text-muted-foreground">
                  <p>{message.content}</p>
                </div>
                {message.sender === "Lyra" && (
                  <div className="flex items-center gap-2 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="sr-only">Upvote</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <ThumbsDownIcon className="w-4 h-4" />
                      <span className="sr-only">Downvote</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <RefreshCcwIcon className="w-4 h-4" />
                      <span className="sr-only">Regenerate</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-background">
        <div className="relative">
          <Textarea
            placeholder="Message Lyra..."
            name="message"
            id="message"
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            className="absolute w-8 h-8 top-3 right-3"
            disabled={!inputMessage.trim()}
            onClick={handleSendMessage}
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="text-xs font-medium text-center text-neutral-700">
          Lyra can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
