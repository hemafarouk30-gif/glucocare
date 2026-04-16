import { Header } from "./Header";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function Layout({ children, showNav = true }: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const footerLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {showNav && <Navigation />}
      <main className="flex-1 bg-background">{children}</main>
      <footer className="bg-muted/40 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {year}.{" "}
            <a
              href={footerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200 underline underline-offset-2"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
