import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Ocupa todo o elemento pai (que precisa ser position: relative/absolute). */
  fill?: boolean;
  /** Imagem acima da dobra: carrega com prioridade em vez de lazy. */
  preload?: boolean;
};

export default function Image({ fill, preload, className = "", ...rest }: Props) {
  return (
    <img
      loading={preload ? "eager" : "lazy"}
      fetchPriority={preload ? "high" : undefined}
      decoding="async"
      className={`${fill ? "absolute inset-0 size-full" : ""} ${className}`}
      {...rest}
    />
  );
}
