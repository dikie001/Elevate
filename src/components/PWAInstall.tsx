import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}

export default function PWAInstallToast() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      if (!sessionStorage.getItem("pwa-modal-dismissed")) {
        setTimeout(() => {
          setIsOpen(true);
          requestAnimationFrame(() => setVisible(true));
        }, 1500);
      }
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      dismiss();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => setIsOpen(false), 300);
    sessionStorage.setItem("pwa-modal-dismissed", "true");
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") dismiss();
    } catch (e) {
      console.error(e);
    } finally {
      setDeferredPrompt(null);
      setIsInstalling(false);
    }
  };

  if (!isInstallable || !isOpen) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 w-72 transition-all duration-300 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
    >
      <Card className="shadow-lg">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Install
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 -mt-0.5 -mr-1 text-muted-foreground"
              onClick={dismiss}
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          <p className="text-sm font-semibold tracking-tight text-foreground">
            Get the Brillia app
          </p>
          <p className="mt-1 text-sm text-muted-foreground leading-snug">
            Faster, offline-ready, and lives on your home screen.
          </p>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              className="flex-1 h-9 text-sm"
              onClick={handleInstall}
              disabled={isInstalling}
            >
              {isInstalling ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  Installing
                </>
              ) : (
                "Add to home screen"
              )}
            </Button>
            <Button
              variant="outline"
              className="h-9 text-sm"
              onClick={dismiss}
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}