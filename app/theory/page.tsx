import Link from "next/link";
import type { Metadata } from "next";
import JdPage from "@/components/JdPage";
import { getExperimentByNumber } from "@/lib/experiments-data";
import { assessment, courseHeader, references, syllabus, textbooks } from "@/lib/syllabus";

export const metadata: Metadata = {
  title: "Course Structure | CSC701 Machine Learning",
  description: "The full CSC701 Machine Learning syllabus — every module, topic, textbook and reference, mapped to the lab experiments that put it into practice.",
};

export default function TheoryPage() {
  return (
    <JdPage
      title={<>{courseHeader.code} &ndash; Course Structure</>}
      subtitle={`${courseHeader.title} · ${courseHeader.credit} Credits · ${courseHeader.totalHours} Hrs · University of Mumbai`}
    >
      <h2>Prerequisites</h2>
      <ul>
        {courseHeader.prerequisites.map((p) => (
          <li key={p}>
            <p>{p}</p>
          </li>
        ))}
      </ul>

      <h2>Course objectives</h2>
      <ol>
        {courseHeader.objectives.map((o) => (
          <li key={o}>
            <p>{o}</p>
          </li>
        ))}
      </ol>

      <h2>Course outcomes</h2>
      <ol>
        {courseHeader.outcomes.map((o) => (
          <li key={o}>
            <p>{o}</p>
          </li>
        ))}
      </ol>

      <h1>Modules</h1>
      {syllabus.map((mod) => (
        <section key={mod.number}>
          <h2>
            Module {mod.number}: {mod.title} ({mod.hours} hrs)
          </h2>
          <ul>
            {mod.topics.map((topic) => (
              <li key={topic.id}>
                <p>
                  <b>
                    {topic.id} {topic.title}
                  </b>
                </p>
                <ul>
                  {topic.points.map((point) => (
                    <li key={point}>
                      <p>{point}</p>
                    </li>
                  ))}
                  {topic.experiments && topic.experiments.length > 0 && (
                    <li>
                      <p>
                        <i>In the lab:</i>{" "}
                        {topic.experiments.map((num, i) => {
                          const experiment = getExperimentByNumber(num);
                          if (!experiment) return null;
                          return (
                            <span key={num}>
                              {i > 0 && ", "}
                              <Link href={`/experiments/${experiment.id}`}>
                                Exp {num} &ndash; {experiment.shortTitle}
                              </Link>
                            </span>
                          );
                        })}
                      </p>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h1>Textbooks</h1>
      <ol>
        {textbooks.map((b) => (
          <li key={b.title}>
            <p>
              {b.author}, <i>&ldquo;{b.title}&rdquo;</i>
              {b.publisher ? `, ${b.publisher}` : ""}
            </p>
          </li>
        ))}
      </ol>

      <h1>References</h1>
      <ol>
        {references.map((r) => (
          <li key={r.title}>
            <p>
              {r.author}, <i>&ldquo;{r.title}&rdquo;</i>
              {r.publisher ? `, ${r.publisher}` : ""}
            </p>
          </li>
        ))}
      </ol>

      <h1>Assessment</h1>
      <ul>
        <li>
          <p>
            <b>Internal assessment.</b> {assessment.internal}
          </p>
        </li>
        <li>
          <p>
            <b>End semester.</b> {assessment.endSemester}
          </p>
        </li>
      </ul>
      <p>
        Full marks distribution: <Link href="/evaluation">Evaluation Policy</Link>.
      </p>
    </JdPage>
  );
}
