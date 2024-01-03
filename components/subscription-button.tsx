'use client'

import { Sparkle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useToast } from "./ui/use-toast";

interface SubscriptionButtonProps {
  className?: string;
  isPro?: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  className,
  isPro,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  const handleSubscribe = async () => {
    // todo some thing
    try {
      setLoading(true)
      const { data } = await axios.get("/api/stripe")
      // todo some thing after get data from stripe

    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again"
      })
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="lg"
        disabled={loading}
        onClick={handleSubscribe}
        className={cn(
          "text-white w-full font-semibold border-none gradient-btn",
          "hover:text-white"
        )}
      >
        <span>{isPro ? "Manage Subscription" : "Upgrade to Pro"}</span>
        <Sparkle />
      </Button>
    </div>
  );
};

export default SubscriptionButton;
