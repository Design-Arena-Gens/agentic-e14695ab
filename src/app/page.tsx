"use client";

import { useMemo, useState } from "react";
import {
  angles,
  clientAudit,
  competitors,
  customerAvatar,
  hooksByAngle,
  psychologicalMatrices,
  researchNotes,
  stepsOrder,
  taglines,
  transformation
} from "@/data/strategy";
import type { StepId } from "@/data/strategy";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Info,
  Layers3,
  ListChecks,
  PenSquare,
  Play,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const stepIcons: Record<StepId, JSX.Element> = {
  "cliente-avatar": <Info className="h-4 w-4" />,
  competencia: <Layers3 className="h-4 w-4" />,
  angulos: <Sparkles className="h-4 w-4" />,
  matriz: <ListChecks className="h-4 w-4" />,
  hooks: <Play className="h-4 w-4" />,
  consciencia: <PenSquare className="h-4 w-4" />,
  activos: <ShieldCheck className="h-4 w-4" />
};

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [confirmedSteps, setConfirmedSteps] = useState<Record<StepId, boolean>>({
    "cliente-avatar": false,
    competencia: false,
    angulos: false,
    matriz: false,
    hooks: false,
    consciencia: false,
    activos: false
  });

  const currentStep = stepsOrder[activeIndex];
  const canGoNext = confirmedSteps[currentStep.id] && activeIndex < stepsOrder.length - 1;
  const canGoPrevious = activeIndex > 0;

  const handleConfirm = () => {
    setConfirmedSteps((prev) => ({ ...prev, [currentStep.id]: true }));
  };

  const goNext = () => {
    if (canGoNext) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const goPrevious = () => {
    if (canGoPrevious) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row">
        <aside className="md:w-72">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">Playbook Fuxion</h1>
            <p className="mt-1 text-sm text-slate-500">
              Sigue el flujo, confirma cada fase y desbloquea la siguiente. El contenido está listo
              para accionarse en campañas digitales.
            </p>
            <nav className="mt-6 space-y-3">
              {stepsOrder.map((step, index) => {
                const isActive = index === activeIndex;
                const isCompleted = confirmedSteps[step.id];
                const isLocked = !isCompleted && index > activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (!isLocked && index <= activeIndex) {
                        setActiveIndex(index);
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-200 bg-white text-slate-700 hover:border-primary/60",
                      isLocked && "cursor-not-allowed opacity-50"
                    )}
                    disabled={isLocked}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border",
                        isActive ? "border-primary bg-primary/20" : "border-slate-200 bg-slate-50"
                      )}
                    >
                      {stepIcons[step.id]}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="text-xs text-slate-500">{isCompleted ? "Confirmado" : "Pendiente"}</p>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-300" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>
        <section className="flex-1">
          <article className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
            <header className="border-b border-slate-200 pb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Fase {activeIndex + 1} de 7</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{currentStep.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{currentStep.intro}</p>
            </header>
            <div className="mt-8 space-y-10">
              <StepContent stepId={currentStep.id} />
            </div>
            <footer className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Info className="h-4 w-4" />
                <span>Confirma para desbloquear la fase siguiente.</span>
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={!canGoPrevious}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition",
                    canGoPrevious
                      ? "border-slate-300 text-slate-700 hover:border-primary/60 hover:text-primary"
                      : "border-slate-200 text-slate-300"
                  )}
                >
                  <ArrowLeft className="h-4 w-4" /> Retroceder
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
                >
                  <CheckCircle2 className="h-4 w-4" /> Confirmar fase
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
                    canGoNext
                      ? "bg-slate-900 text-white hover:bg-slate-700"
                      : "bg-slate-200 text-slate-400"
                  )}
                >
                  Avanzar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
}

type StepContentProps = {
  stepId: StepId;
};

function StepContent({ stepId }: StepContentProps) {
  switch (stepId) {
    case "cliente-avatar":
      return <ClientAudit />;
    case "competencia":
      return <CompetitiveIntel />;
    case "angulos":
      return <AngleEngineering />;
    case "matriz":
      return <PsychologicalMatrix />;
    case "hooks":
      return <HookEngineering />;
    case "consciencia":
      return <ConsciousnessTable />;
    case "activos":
      return <CommunicationAssets />;
    default:
      return null;
  }
}

function ClientAudit() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2">
        {clientAudit.map((section) => (
          <div key={section.heading} className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">{section.heading}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="rounded-2xl bg-slate-900 p-6 text-white">
        <h3 className="text-lg font-semibold">Avatar principal</h3>
        <p className="mt-2 text-sm text-slate-100">{customerAvatar.nombre}</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Demografía</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-100">
              {customerAvatar.detallesDemograficos.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Psicografía</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-100">
              {customerAvatar.psicografia.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Dolores emocionales</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-100">
              {customerAvatar.doloresEmocionales.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Objeciones clave</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-100">
              {customerAvatar.objeciones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-200">Fuentes pendientes</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-100">
            {customerAvatar.fuentesVerificacionPendientes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rounded-2xl border border-dashed border-primary/30 p-6">
        <h3 className="text-base font-semibold text-slate-900">Guía de investigación continua</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-primary">Fuentes recomendadas</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {researchNotes.fuentes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">Advertencias</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {researchNotes.advertencias.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function CompetitiveIntel() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Benchmark de players relevantes en nutracéuticos y venta directa. Las oportunidades se enfocan en
        construir campañas que evidencien diferenciales medibles de Fuxion.
      </p>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Competidor</th>
              <th className="px-4 py-3">Promesa core</th>
              <th className="px-4 py-3">Ángulos detectados</th>
              <th className="px-4 py-3">Oportunidad para Fuxion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {competitors.map((competitor) => (
              <tr key={competitor.nombre}>
                <td className="px-4 py-4 font-semibold text-slate-900">
                  <div>{competitor.nombre}</div>
                  {competitor.url && (
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {competitor.url}
                    </a>
                  )}
                </td>
                <td className="px-4 py-4 text-slate-600">{competitor.propuesta}</td>
                <td className="px-4 py-4 text-slate-600">
                  <ul className="list-disc space-y-1 pl-4">
                    {competitor.angulosDetectados.map((angle) => (
                      <li key={angle}>{angle}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4 text-slate-600">{competitor.oportunidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl border border-amber-400/40 bg-amber-50 p-5 text-sm text-amber-800">
        <h4 className="font-semibold">Meta Ad Library: próximos pasos</h4>
        <ul className="mt-2 space-y-1">
          <li>Documenta ID de anuncio, copy y formato (imagen/video) de cada competidor.</li>
          <li>
            Crea carpeta compartida con capturas y enlaces, etiquetando si comunican producto, oportunidad de
            negocio o estilo de vida.
          </li>
          <li>Marca oportunidades no explotadas: claims de ciencia local, dropshipping y mentoría estructurada.</li>
        </ul>
      </div>
    </div>
  );
}

function AngleEngineering() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Estos cinco ángulos resumen beneficios, objeciones y aspiraciones reales del avatar. Prioriza pruebas y
        creatividades para validar rápidamente CTR y CPL.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {angles.map((angle) => (
          <div key={angle.id} className="rounded-2xl border border-slate-200 p-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {angle.nombre}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{angle.promesa}</h3>
            <p className="mt-3 text-sm text-slate-600">Insight clave: {angle.insight}</p>
            <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Soportes inmediatos
            </h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {angle.soporte.map((support) => (
                <li key={support} className="flex gap-2">
                  <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{support}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <strong>Checkpoint obligatorio:</strong> valida cada ángulo con datos (testimonios, cifras, documentos) antes de escalar
        inversión. Documenta la fuente exacta en Notion o CRM.
      </div>
    </div>
  );
}

function PsychologicalMatrix() {
  return (
    <div className="space-y-8">
      {angles.map((angle) => (
        <section key={angle.id} className="rounded-2xl border border-slate-200">
          <header className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{angle.nombre}</h3>
            <p className="text-sm text-slate-500">{angle.promesa}</p>
          </header>
          <div className="grid gap-px bg-slate-200 md:grid-cols-3">
            {psychologicalMatrices[angle.id].map((cell) => (
              <div key={cell.categoria} className="bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {cell.categoria}
                </p>
                <p className="mt-2 text-sm text-slate-600">{cell.contenido}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function HookEngineering() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-600">
        Hooks para videos UGC (máximo 5 segundos cada uno). Úsalos como línea de apertura en testimonios, demostraciones y
        anuncios con creadoras asociadas.
      </p>
      <div className="space-y-6">
        {angles.map((angle) => (
          <div key={angle.id} className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">{angle.nombre}</h3>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {hooksByAngle[angle.id].map((hook) => (
                <li key={hook.texto} className="flex flex-col gap-1 rounded-xl bg-slate-50 p-3">
                  <span className="text-sm font-semibold text-slate-800">{hook.texto}</span>
                  <span className="text-xs uppercase tracking-widest text-slate-500">{hook.nivel}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsciousnessTable() {
  const data = useMemo(() => {
    const grouped: Record<string, { hook: string; angle: string }[]> = {
      Inconsciente: [],
      "Consciente del problema": [],
      "Consciente de la solución": [],
      "Consciente del producto": [],
      "Más consciente": []
    };
    angles.forEach((angle) => {
      hooksByAngle[angle.id].forEach((hook) => {
        grouped[hook.nivel].push({ hook: hook.texto, angle: angle.nombre });
      });
    });
    return grouped;
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Distribución según los cinco niveles de consciencia de Eugene Schwartz. Usa esta matriz para seleccionar hooks
        alineados al nivel de sofisticación de cada audiencia o funnel stage.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(data).map(([level, items]) => (
          <div key={level} className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">{level}</h3>
            <ul className="mt-3 space-y-3">
              {items.map((item) => (
                <li key={item.hook} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-800">{item.hook}</p>
                  <p className="text-xs text-slate-500">Ángulo: {item.angle}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunicationAssets() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">Ads</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {taglines.ads.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">Landing</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {taglines.landing.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">Email</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {taglines.email.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
          Proceso de transformación del cliente
        </h3>
        <ol className="mt-4 space-y-4">
          {transformation.pasos.map((paso, index) => (
            <li key={paso.titulo} className="flex gap-3">
              <span className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{paso.titulo}</p>
                <p className="text-sm text-slate-600">{paso.descripcion}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="rounded-2xl border border-dashed border-primary/30 p-6 text-sm text-slate-600">
        <strong>Checklist final:</strong> valida claims, integra pruebas sociales y coordina con legal/regulatorio antes de lanzar la
        campaña en Meta Ads y creadores UGC.
      </section>
    </div>
  );
}
