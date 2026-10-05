import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { estados, modelos, passos } from "@/content/spas";
import { Arrow } from "./ui";

const field =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3.5 text-[15px] outline-none focus:border-teal focus:bg-white";

export default function ComoComprar() {
  const ref = useRef<HTMLElement>(null);
  const [enviado, setEnviado] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-step]", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-steps]", start: "top 85%", once: true },
        });
        gsap.from("[data-form]", {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-form]", start: "top 90%", once: true },
        });
      });
    },
    { scope: ref },
  );

  // Demonstração: ainda não envia para lugar nenhum. Integrar ao CRM/RD do cliente antes de publicar.
  const onSubmit = contextSafe((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    gsap.to("[data-form-fields]", {
      autoAlpha: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setEnviado(true),
    });
  });

  useGSAP(
    () => {
      if (enviado) gsap.from("[data-form-ok]", { autoAlpha: 0, y: 20, duration: 0.6, ease: "power3.out" });
    },
    { scope: ref, dependencies: [enviado] },
  );

  return (
    <section ref={ref} id="como-comprar" className="relative z-10 py-[clamp(100px,11vw,200px)]">
      <div className="mx-auto grid w-[min(100%-8vw,1440px)] gap-[clamp(56px,6vw,110px)] lg:grid-cols-[1fr_minmax(0,560px)]">
        <div>
          <h2 data-reveal className="font-editorial text-[clamp(44px,5.6vw,96px)] leading-[0.9] font-light tracking-[-0.045em]">
            QUERO TER UM
            <br />
            SPA JACUZZI®
          </h2>
          <ol data-steps className="mt-[clamp(40px,5vw,80px)] grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {passos.map((p, i) => (
              <li key={p.titulo} data-step className="border-t border-line pt-5">
                <span className="font-editorial text-[clamp(44px,4vw,64px)] leading-none font-light text-teal">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-medium">{p.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-form className="relative self-start rounded-[28px] bg-mist p-[clamp(22px,2.6vw,40px)]">
          {enviado ? (
            <div data-form-ok className="py-16 text-center" role="status">
              <p className="font-editorial text-5xl font-light">Obrigado!</p>
              <p className="mt-4 text-ink/70">Um especialista Jacuzzi® vai entrar em contato em breve.</p>
            </div>
          ) : (
            <form data-form-fields onSubmit={onSubmit} className="grid gap-4">
              <p className="font-editorial text-[clamp(28px,2.4vw,38px)] leading-tight">Fale com um especialista</p>
              <label className="grid gap-1.5 text-sm">
                Nome
                <input required name="nome" autoComplete="name" className={field} />
              </label>
              <label className="grid gap-1.5 text-sm">
                E-mail
                <input required type="email" name="email" autoComplete="email" className={field} />
              </label>
              <label className="grid gap-1.5 text-sm">
                WhatsApp
                <input required type="tel" name="telefone" autoComplete="tel" className={field} />
              </label>
              <div className="grid grid-cols-[110px_1fr] gap-4">
                <label className="grid gap-1.5 text-sm">
                  Estado
                  <select required name="estado" defaultValue="" className={field}>
                    <option value="" disabled>
                      UF
                    </option>
                    {estados.map((uf) => (
                      <option key={uf}>{uf}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-sm">
                  Área de atuação
                  <select required name="area" defaultValue="" className={field}>
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option>Arquiteto</option>
                    <option>Construtora</option>
                    <option>Consumidor final</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-1.5 text-sm">
                Modelo de interesse
                <select name="modelo" defaultValue="" className={field}>
                  <option value="">Ainda não sei</option>
                  {modelos.map((m) => (
                    <option key={m.slug}>{m.nome}</option>
                  ))}
                </select>
              </label>
              <p className="text-xs leading-relaxed text-ink/60">
                Seus dados serão usados apenas para retornar o contato e enviar informações sobre nossos produtos. Saiba mais na{" "}
                <a href="#" className="underline">
                  Política de Privacidade
                </a>
                .
              </p>
              <button
                type="submit"
                data-hover="pill"
                className="mt-2 inline-flex h-16 items-center justify-between gap-5 rounded-full bg-ink py-2 pr-2 pl-8 text-lg font-medium text-white"
              >
                Enviar
                <span data-hover-arrow className="grid aspect-square h-full place-items-center rounded-full bg-white text-ink">
                  <Arrow className="size-5" />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
