import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getOrCreateLeadId } from "../lib/leadId";
import type { Step1Values, Step2Values } from "../lib/schemas";
import Step1 from "./DemoForm/Step1";
import Step2 from "./DemoForm/Step2";
import Step3 from "./DemoForm/Step3";
import HeroCopy from "./HeroCopy";
import StepHeading from "./StepHeading";
import LogoCarousel from "./LogoCarousel";

const stepVariants = {
  enter: { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

// Owns the form's state (leadId, step, accumulated values) so it survives the step 1
// -> step 2 layout swap below without remounting — App renders this component
// unconditionally, so its state persists even though the returned JSX shape (hero
// grid vs. centered card) changes completely between steps.
export default function DemoExperience({
  step,
  onStepChange,
}: {
  step: 1 | 2 | 3;
  onStepChange: (step: 1 | 2 | 3) => void;
}) {
  const leadId = useMemo(() => getOrCreateLeadId(), []);
  const [step1Values, setStep1Values] = useState<Step1Values | null>(null);
  const [step2Values, setStep2Values] = useState<Step2Values | null>(null);

  const card = (
    <div
      className="rounded-[10px] bg-white p-6 sm:p-8"
      style={{ boxShadow: "0 20px 60px 0 rgba(7, 0, 47, 0.2)" }}
    >
      {step === 1 && (
        <h2 className="mb-6 text-sm font-medium tracking-wide text-brand-ink uppercase">
          Request a demo with one of the{" "}
          <span className="font-bold">founders</span>
        </h2>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {step === 1 && (
            <Step1
              leadId={leadId}
              defaultValues={step1Values ?? undefined}
              onSuccess={(values) => {
                setStep1Values(values);
                onStepChange(2);
              }}
            />
          )}

          {step === 2 && step1Values && (
            <Step2
              leadId={leadId}
              step1Values={step1Values}
              defaultValues={step2Values ?? undefined}
              onSuccess={(values) => {
                setStep2Values(values);
                onStepChange(3);
              }}
            />
          )}

          {step === 3 && step1Values && <Step3 step1Values={step1Values} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (step === 1) {
    return (
      <section id="top" className="bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto grid max-w-6xl min-w-0 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <HeroCopy />
          <motion.div
            id="demo-form"
            className="min-w-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {card}
          </motion.div>
        </div>
      </section>
    );
  }

  // Steps 2 and 3 drop the hero copy and all the marketing sections below — just the
  // heading, the centered form, and the logo carousel — matching the real
  // /demo-step2 and /demo-step3 pages.
  if (step === 2) {
    return (
      <section id="top" className="bg-white pt-16 pb-20 sm:pt-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <StepHeading step={step} />
        </div>
        <div id="demo-form" className="mx-auto mt-10 max-w-2xl px-6">
          {card}
        </div>
        <div className="mx-auto mt-16 max-w-2xl px-6">
          <LogoCarousel />
        </div>
      </section>
    );
  }

  if (step === 3) {
    return (
      <section id="top" className="bg-white pt-16 pb-20 sm:pt-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <StepHeading step={step} />
        </div>
        <div id="demo-form" className="mx-auto mt-10 max-w-6xl px-6">
          {card}
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-6">
          <LogoCarousel />
        </div>
      </section>
    );
  }

  return <h1 className="red">Invalid step {step}</h1>;
}
