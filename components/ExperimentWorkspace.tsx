"use client";

import { useState } from "react";
import IdeWorkspace from "./IdeWorkspace";
import Quiz from "./Quiz";
import FeedbackForm from "./FeedbackForm";
import { usePyodide } from "./PyodideProvider";
import type { Experiment } from "@/lib/experiments";

type SectionId =
  | "aim"
  | "theory"
  | "pretest"
  | "procedure"
  | "simulation"
  | "posttest"
  | "references"
  | "feedback";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "aim", label: "Aim" },
  { id: "theory", label: "Theory" },
  { id: "pretest", label: "Pretest" },
  { id: "procedure", label: "Procedure" },
  { id: "simulation", label: "Simulation" },
  { id: "posttest", label: "Posttest" },
  { id: "references", label: "Further Readings" },
  { id: "feedback", label: "Feedback" },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <h2>{title}</h2>
      {subtitle && <p><i>{subtitle}</i></p>}
    </>
  );
}

export default function ExperimentWorkspace({ experiment }: { experiment: Experiment }) {
  const [active, setActive] = useState<SectionId>("aim");
  const { pythonVersion, pyodideVersion } = usePyodide();

  if (active === "simulation") {
    return <IdeWorkspace experiment={experiment} onExit={() => setActive("procedure")} />;
  }

  return (
    <div>
      <div className="jd-prose">
        {/* Section navigation — the fixed spine of every Virtual Labs experiment. */}
        <nav aria-label="Experiment sections" className="jd-tabs">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActive(section.id)}
              aria-current={active === section.id ? "page" : undefined}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {active === "aim" && (
          <section className="rise">
            <SectionHeading title="Aim" />
            <p>{experiment.aim}</p>

            <h3>Key concepts</h3>
            <p>{experiment.keyConcepts.join(", ")}.</p>

            <h3>Algorithm</h3>
            <ol>
              {experiment.algorithm.map((step, index) => (
                <li key={index}>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {active === "theory" && (
          <section className="rise">
            <SectionHeading title="Theory" subtitle="The background you need before writing any code." />
            <div
              className="prose-lab max-w-none"
              dangerouslySetInnerHTML={{ __html: experiment.theory }}
            />
          </section>
        )}

        {active === "pretest" && (
          <SectionHeading title="Pretest" subtitle="Five questions on the prerequisites for this experiment." />
        )}

        {active === "procedure" && (
          <section className="rise">
            <SectionHeading title="Procedure" subtitle="What to do, step by step, in the Simulation section." />
            <ol>
              {experiment.instructions.map((step, index) => (
                <li key={index}>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            <p>
              <button className="jd-launch" onClick={() => setActive("simulation")}>
                Open the Simulation &raquo;
              </button>
            </p>

            <div className="infoblock">
              <div className="blocktitle">Before your first run</div>
              <div className="blockcontent">
                <p>
                  Python runs inside your browser, so the first Run downloads the interpreter and
                  the scientific stack (roughly 25 MB). It is cached afterwards. No account, no
                  installation, and no code ever leaves your machine.
                </p>
              </div>
            </div>
          </section>
        )}

        {active === "posttest" && (
          <SectionHeading title="Posttest" subtitle="Five questions on what this experiment demonstrated." />
        )}

        {active === "references" && (
          <section className="rise">
            <SectionHeading title="Further Readings" subtitle="Where to go deeper on this topic." />
            <ul>
              {experiment.references.map((reference) => (
                <li key={reference.title}>
                  <p>
                    {reference.url ? (
                      <a href={reference.url} target="_blank" rel="noopener noreferrer">
                        <b>{reference.title}</b>
                      </a>
                    ) : (
                      <b>{reference.title}</b>
                    )}
                    {" "}&ndash; {reference.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {active === "feedback" && <SectionHeading title="Feedback" subtitle="Help improve this experiment." />}
      </div>

      {/* Interactive widgets sit outside .jd-prose so its element rules leave them alone. */}
      {active === "pretest" && (
        <div className="rise mt-4">
          <Quiz
            questions={experiment.pretest}
            storageKey={`${experiment.id}-pre`}
            intro="Answer these before you begin. They check the background the experiment assumes — if several go wrong, read the Theory section first."
          />
        </div>
      )}

      {active === "posttest" && (
        <div className="rise mt-4">
          <Quiz
            questions={experiment.posttest}
            storageKey={`${experiment.id}-post`}
            intro="Take this after running the simulation. Several questions refer to output and plots you will only have seen by executing the code yourself."
          />
        </div>
      )}

      {active === "feedback" && (
        <div className="rise mt-4">
          <FeedbackForm experimentId={experiment.id} />
        </div>
      )}

      <div className="jd-prose">
        <h3>Environment</h3>
        <p>
          Python <code>{pythonVersion}</code> · Pyodide <code>{pyodideVersion}</code> · Packages:{" "}
          {experiment.packages.map((name, i) => (
            <span key={name}>
              {i > 0 && ", "}
              <code>{name}</code>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
