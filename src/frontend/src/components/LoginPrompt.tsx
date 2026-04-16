import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Activity, Lock } from "lucide-react";

interface LoginPromptProps {
  title?: string;
  description?: string;
}

export function LoginPrompt({
  title = "Sign in to access your dashboard",
  description = "Your glucose data is securely stored on the Internet Computer. Log in to track readings, view trends, and monitor your health over time.",
}: LoginPromptProps) {
  const { login, isLoginIdle } = useInternetIdentity();
  const isLoading = !isLoginIdle;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      data-ocid="login_prompt.section"
    >
      <div className="bg-card border border-border rounded-xl p-10 max-w-md w-full text-center elevation-medium">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {description}
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className="w-full"
          onClick={() => login()}
          disabled={isLoading}
          data-ocid="login_prompt.login_button"
        >
          {isLoading ? "Connecting…" : "Log in with Internet Identity"}
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Secure, decentralized authentication. No passwords required.
        </p>
      </div>
    </div>
  );
}
