import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/motion/marquee";
import { tools } from "@/content/home";

/** Tools named on converter.sk, as a calm marquee between hero and services. */
export function ToolsStrip() {
  return (
    <section aria-labelledby="tools-title" className="relative border-y border-line py-10 md:py-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <h2
          id="tools-title"
          className="shrink-0 font-mono text-eyebrow uppercase text-fg-subtle md:max-w-[11rem]"
        >
          Nástroje, s ktorými pracujeme
        </h2>
        <Marquee duration={48} gap="3.5rem" className="min-w-0 flex-1">
          {tools.map((tool) => (
            <span key={tool} className="text-h4 font-medium whitespace-nowrap text-fg-subtle">
              {tool}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
