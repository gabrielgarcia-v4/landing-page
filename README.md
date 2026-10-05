# SPAs Jacuzzi® — landing page

Landing page da linha de SPAs Jacuzzi®, em duas versões:

- `/` — versão clássica
- `/wellness` — versão wellness

Stack: Vite, React, TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText) e Lenis.

## Regra de animação

**Toda animação usa Lenis no scroll e GSAP no movimento.**

- Scroll: uma única instância do Lenis (`src/components/SmoothScroll.tsx`). Não usar `scroll-behavior: smooth`.
- Movimento: sempre GSAP, importado de `src/lib/gsap.ts`. Não usar `@keyframes`, Framer Motion ou `IntersectionObserver` para animar. `transition` de CSS só para cor/opacidade em hover e foco.
- Animação ligada ao scroll: ScrollTrigger. Em componentes, usar o hook `useGSAP` com `scope`.
- Hovers com movimento: atributo `data-hover` (`src/components/HoverEffects.tsx`).
- Respeitar `prefers-reduced-motion` com `gsap.matchMedia()`.

## Onde fica cada coisa

- `src/pages/` — as duas páginas.
- `src/components/` — seções da versão clássica; `src/components/wellness/` — seções da versão wellness.
- `src/content/` — textos e dados (modelos, tecnologias, FAQ, pilares, rituais).
- `src/lib/animations.ts` — animações reutilizáveis (`data-reveal`, `data-reveal-image`, `data-parallax`).
- `src/index.css` — tokens de cor e fonte; o tema wellness é a classe `.theme-wellness`.
- `public/images/` — imagens.

## Pendências antes de publicar

- O formulário é demonstração: ainda não envia os dados para nenhum sistema.
- Imagens vieram do site atual da Jacuzzi; o SPA recortado do hero foi gerado automaticamente e as fotos de tecnologia são de baixa resolução.

## Rodar localmente

```bash
npm install
npm run dev
```
