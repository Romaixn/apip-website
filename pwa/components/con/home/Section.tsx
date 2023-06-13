import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import useDynamicRefs from "hooks/con/useDynamicRefs";
import useIntersection from "hooks/useIntersection";

interface SectionProps extends PropsWithChildren {
  className?: string;
  section: string;
}

interface SectionsContextInterface {
  sectionsVisibles: string[];
  setSectionsVisibles: (sections: string[]) => void;
  isVisible: (section: string) => boolean;
}

export const SectionsContext = createContext<SectionsContextInterface>({
  sectionsVisibles: [],
  setSectionsVisibles: () => null,
  isVisible: () => false,
});

export default function Section({
  className = "",
  section,
  children,
}: SectionProps) {
  const [, setRef] = useDynamicRefs();
  const containerRef = setRef(
    `section-${section}`
  ) as React.RefObject<HTMLElement>;
  const { sectionsVisibles, setSectionsVisibles } = useContext(SectionsContext);

  const intersection = useIntersection(containerRef, {
    threshold: 0.2,
  });

  const isVisible = intersection?.isIntersecting;

  useEffect(() => {
    if (isVisible && !sectionsVisibles.includes(section)) {
      setSectionsVisibles([...sectionsVisibles, section]);
    } else if (false === isVisible && sectionsVisibles.includes(section)) {
      setSectionsVisibles(
        sectionsVisibles.filter(
          (sectionVisible: string) => sectionVisible !== section
        )
      );
    }
  }, [isVisible, setSectionsVisibles, sectionsVisibles, section]);

  return (
    <section
      key={section}
      className={className}
      ref={containerRef}
      id={section}
    >
      {children}
    </section>
  );
}
