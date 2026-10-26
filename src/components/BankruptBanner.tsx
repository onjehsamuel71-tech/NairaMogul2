import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";

interface Props {
  company: string;
  onDismiss: () => void;
}

export function BankruptBanner({ company, onDismiss }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-rose-600 bg-gradient-to-r from-rose-700 to-red-800 p-4 text-white shadow-2xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertOctagon className="h-8 w-8 shrink-0 text-amber-300" />
          <div>
            <p className="font-serif text-lg font-bold">
              🚨 SAPA ALERT: {company} is in distress!
            </p>
            <p className="text-sm text-rose-100">
              Your Sapa Meter hit 100%. Assets are at risk of liquidation.
              Repay debt or sell assets now.
            </p>
          </div>
        </div>
        <Button
          onClick={onDismiss}
          className="bg-amber-400 text-rose-950 hover:bg-amber-300"
        >
          I Understand
        </Button>
      </div>
    </div>
  );
}