import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, AlertTriangle, Pill } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type AppState = "normal" | "upcoming" | "buzzing" | "missed";

const supplies = [
  { name: "Heart Med", count: 12 },
  { name: "Vitamin C", count: 30 },
  { name: "Joint Supp.", count: 8 },
];

const states: { key: AppState; label: string }[] = [
  { key: "normal", label: "Normal" },
  { key: "upcoming", label: "Upcoming" },
  { key: "buzzing", label: "Buzzing" },
  { key: "missed", label: "Missed" },
];

function Index() {
  const [state, setState] = useState<AppState>("normal");

  const cardClasses =
    state === "buzzing"
      ? "border-red-500 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.5)]"
      : state === "upcoming"
        ? "border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.5)]"
        : "border-teal-200";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {state === "missed" && (
        <div className="bg-red-600 text-white font-bold text-center py-4 px-4 flex items-center justify-center gap-2 tracking-wide">
          <AlertTriangle className="w-5 h-5" />
          MISSED DOSE ALERT
        </div>
      )}

      <main className="flex-1 max-w-md w-full mx-auto px-5 py-8 space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">PillPal</h1>
          <p className="text-sm text-slate-500">Smart Pill Dispenser</p>
        </header>

        <section
          className={`rounded-3xl bg-white border-2 overflow-hidden transition-all duration-300 ${cardClasses}`}
        >
          <div className="bg-teal-100 px-6 py-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <h2 className="text-teal-800 font-semibold">Your Next Dose:</h2>
          </div>
          <div className="px-6 py-8 text-center">
            {state === "buzzing" ? (
              <p className="text-3xl font-extrabold text-red-600 tracking-wide">
                DISPENSING NOW
              </p>
            ) : (
              <>
                <p className="text-3xl font-extrabold text-black">Heart Med</p>
                <p className="text-2xl font-bold text-black mt-2">1/2 pill</p>
                <p className="text-xl font-bold text-black mt-2">at 14:15</p>
              </>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Your Supplies</h3>
          <ul className="space-y-2">
            {supplies.map((s) => (
              <li
                key={s.name}
                className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <span className="flex items-center gap-2 font-medium text-slate-800">
                  <Pill className="w-4 h-4 text-teal-600" />
                  {s.name}
                </span>
                <span className="text-slate-600 font-semibold">({s.count})</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-4 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-500 tracking-widest mb-3">
            SIMULATE STATES
          </p>
          <div className="grid grid-cols-4 gap-2">
            {states.map((s) => (
              <button
                key={s.key}
                onClick={() => setState(s.key)}
                className={`text-xs font-semibold py-2 rounded-lg border transition-colors ${
                  state === s.key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
