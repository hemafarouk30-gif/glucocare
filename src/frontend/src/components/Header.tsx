import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";

export function Header() {
  const { isAuthenticated, login, clear } = useInternetIdentity();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <span className="font-display text-xl font-bold">
            <span className="text-foreground">Gluco</span>
            <span className="text-accent">Care</span>
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              data-ocid="header.logout_button"
              onClick={() => clear()}
              className="gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Log out
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              data-ocid="header.login_button"
              onClick={() => login()}
              className="gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
