"use client";

import { cn } from "@/lib/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CommonAccordionRootProps {
  questionId: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

interface CommonAccordionHeaderProps {
  children: React.ReactNode;
  description?: string | React.ReactNode;
}

interface CommonAccordionDescriptionProps {
  children: React.ReactNode;
}

interface CommonAccordionNextButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Root = ({
  questionId,
  defaultOpen = true,
  children,
}: CommonAccordionRootProps) => {
  return (
    <section className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-gray-300 bg-white">
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? questionId : undefined}
        className="w-full"
      >
        <AccordionItem value={questionId} className="border-none">
          {children}
        </AccordionItem>
      </Accordion>
    </section>
  );
};

const Header = ({ children, description }: CommonAccordionHeaderProps) => {
  return (
    <AccordionTrigger className="px-5 py-2.5 text-gray-900 [&>svg]:mt-1 [&>svg]:h-9 [&>svg]:w-9">
      <span className="flex flex-col gap-1 text-left">
        <span className="h4 font-semibold">{children}</span>
        {description ? (
          <span className="body text-gray-700">{description}</span>
        ) : null}
      </span>
    </AccordionTrigger>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccordionContent>
      <div className="rounded-sm bg-gray-200 p-5">{children}</div>
    </AccordionContent>
  );
};

const Description = ({ children }: CommonAccordionDescriptionProps) => {
  return <p className="caption pb-6 text-center text-gray-700">{children}</p>;
};

const NextButton = ({ children, onClick }: CommonAccordionNextButtonProps) => {
  return (
    <div className="pt-7 text-center">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "label cursor-pointer rounded-full bg-gray-300 px-2.5 py-1 text-gray-900",
        )}
      >
        {children}
      </button>
    </div>
  );
};

const CommonAccordion = Object.assign(Root, {
  Header,
  Content,
  Description,
  NextButton,
});

export {
  Root as CommonAccordionRoot,
  Header as CommonAccordionHeader,
  Content as CommonAccordionContent,
  Description as CommonAccordionDescription,
  NextButton as CommonAccordionNextButton,
};

export default CommonAccordion;
