import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type AppState = "normal" | "upcoming" | "buzzing";

const supplies = [
  { name: "Heart Med", count: "14 pills" },
  { name: "Vitamin C", count: "30" },
  { name: "Joint Supp.", count: "20" },
];

type TakenEntry = { id: number; name: string; dose: string; time: string };

function Index() {
  const [state, setState] = useState<AppState>("normal");
  const [missed, setMissed] = useState(true);
  const [taken, setTaken] = useState<TakenEntry[]>([
    { id: 1, name: "Heart Med", dose: "1/2 pill", time: "08:15" },
    { id: 2, name: "Vitamin C", dose: "1 pill", time: "09:00" },
  ]);

  const markAsTaken = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;
    setTaken((t) => [
      { id: Date.now(), name: "Heart Med", dose: "1/2 pill", time },
      ...t,
    ]);
    setMissed(false);
    setState("normal");
  };

  const cardBorder =
    state === "buzzing"
      ? "border-red-500 animate-pulse shadow-[0_0_25px_rgba(239,68,68,0.5)]"
      : state === "upcoming"
        ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]"
        : "border-teal-300";

  const stateButtons: { key: AppState | "missed"; label: string; cls: string }[] = [
    { key: "normal", label: "Normal", cls: "bg-green-200 border-green-400 text-green-900" },
    { key: "upcoming", label: "Upcoming", cls: "bg-blue-200 border-blue-400 text-blue-900" },
    { key: "buzzing", label: "Buzzing", cls: "bg-yellow-200 border-yellow-400 text-yellow-900" },
    { key: "missed", label: "Missed", cls: "bg-red-200 border-red-400 text-red-900" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {missed && (
        <div className="bg-red-500 text-white font-bold text-center py-2 tracking-wide text-sm">
          MISSED DOSE ALERT
        </div>
      )}

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-4 space-y-5">
        <section
          className={`rounded-2xl bg-white border-2 overflow-hidden transition-all duration-300 ${cardBorder}`}
        >
          <div className="bg-teal-300 px-4 py-2 flex items-center justify-center gap-2">
            <h2 className="text-black font-semibold text-lg">Your Next Dose:</h2>
            <Clock className="w-5 h-5 text-black" />
          </div>
          <div className="px-4 py-5 text-center">
            {state === "buzzing" ? (
              <p className="text-3xl font-extrabold text-red-600 tracking-wide">
                DISPENSING NOW
              </p>
            ) : (
              <>
                <p className="text-3xl font-extrabold text-black leading-tight">Heart Med</p>
                <p className="text-2xl font-bold text-black leading-tight">(1/2 pill)</p>
                <p className="text-2xl font-bold text-black leading-tight">at 14:15</p>
              </>
            )}
          </div>
          <div className="px-4 pb-4">
            <button
              onClick={markAsTaken}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark as Taken
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-black mb-2">
            Taken Today{" "}
            <span className="text-teal-700 font-normal text-base">({taken.length})</span>
          </h3>
          {taken.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No doses logged yet.</p>
          ) : (
            <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-40 overflow-y-auto">
              {taken.map((t) => (
                <li
                  key={t.id}
                  className="px-3 py-2 flex items-center justify-between text-sm text-black"
                >
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{t.name}</span>
                    <span className="text-gray-500">· {t.dose}</span>
                  </span>
                  <span className="text-gray-600 font-mono">{t.time}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-xl font-semibold text-black mb-2">Your Supplies</h3>
          <ul className="divide-y divide-teal-200 border-y border-teal-200">
            {supplies.map((s) => (
              <li
                key={s.name}
                className="bg-teal-100 px-4 py-2 flex items-center justify-between text-black"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-teal-700 font-semibold">({s.count})</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-bold text-black tracking-widest mb-2">
            SIMULATE STATES
          </p>
          <div className="flex flex-wrap gap-2">
            {stateButtons.map((b) => {
              const active =
                b.key === "missed" ? missed : state === b.key;
              return (
                <button
                  key={b.key}
                  onClick={() => {
                    if (b.key === "missed") {
                      setMissed((m) => !m);
                    } else {
                      setState(b.key as AppState);
                    }
                  }}
                  className={`text-xs font-semibold px-3 py-1 rounded-md border ${b.cls} ${
                    active ? "ring-2 ring-offset-1 ring-black/40" : "opacity-90"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
