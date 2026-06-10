import { GenericButton } from "@/src/components/GenericButton";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_#f4efe2,_#d9e7ff_55%,_#f8fafc)] px-6 py-12">
      <main className="w-full max-w-5xl rounded-[32px] border border-slate-200/80 bg-white/90 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-4 py-1 text-sm font-medium text-slate-700">
              Next.js + Node.js + Event-Driven
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Generic starter untuk pola microservices dan event-driven.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Frontend ini disiapkan untuk berkomunikasi dengan API gateway
                generik, memusatkan konfigurasi HTTP client, dan menjaga UI
                tetap reusable.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <GenericButton>Trigger Generic Action</GenericButton>
              <GenericButton variant="secondary">Open API Docs Draft</GenericButton>
            </div>
          </section>

          <aside className="rounded-[28px] bg-slate-950 p-6 text-slate-50">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Starter Blocks
              </p>
              <div className="grid gap-3">
                {[
                  "API Gateway dengan controller dan service terpisah",
                  "Worker RabbitMQ untuk GENERIC_QUEUE",
                  "Redis lock wrapper untuk race condition handling",
                  "Axios instance dengan global interceptor",
                ].map((entry) => (
                  <div
                    key={entry}
                    className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm leading-7 text-slate-300"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
