"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
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
  const [openValue, setOpenValue] = useState<string | undefined>(
    defaultOpen ? questionId : undefined,
  );

  return (
    <section
      className={
        "border-border bg-card w-full max-w-[560px] overflow-hidden rounded-md border"
      }
    >
      <Accordion
        type="single"
        collapsible
        value={openValue}
        onValueChange={(value) => setOpenValue(value || undefined)}
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
    <AccordionTrigger className="group text-foreground px-5 py-2.5 data-[state=closed]:bg-gray-200 data-[state=closed]:text-gray-500 [&>svg]:h-5 [&>svg]:w-5">
      <span className="flex flex-col gap-1 text-left">
        <span className="h4 font-semibold">{children}</span>
        {description ? (
          <span className="body text-muted-foreground group-data-[state=closed]:text-gray-500">
            {description}
          </span>
        ) : null}
      </span>
    </AccordionTrigger>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccordionContent className="rounded-br-sm rounded-bl-sm">
      <div className="bg-muted rounded-br-sm rounded-bl-sm p-5">{children}</div>
    </AccordionContent>
  );
};

const Description = ({ children }: CommonAccordionDescriptionProps) => {
  return (
    <p className="caption text-muted-foreground pb-6 text-center">{children}</p>
  );
};

const NextButton = ({ children, onClick }: CommonAccordionNextButtonProps) => {
  return (
    <div className="pt-7 text-center">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "label bg-muted text-foreground cursor-pointer rounded-full px-2.5 py-1",
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
