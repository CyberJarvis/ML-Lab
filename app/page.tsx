import Link from "next/link";
import JdPage from "@/components/JdPage";
import { courseHeader, textbooks, references } from "@/lib/syllabus";
import { courseInfo, experiments } from "@/lib/experiments-data";
import { institute, instructor, teachingAssistants } from "@/lib/institute";
import { EXPERIMENT_LIST_PDF, LAB_MANUAL_PDF } from "@/lib/site-nav";

export default function HomePage() {
  return (
    <JdPage title={<>{courseHeader.title}</>}>
      <p>
        Instructor: <Link href="/team">{instructor.name}</Link> (
        <a href={`mailto:${instructor.email}`}>{instructor.email}</a>) <br />
        4 credits :- 3 Lecture hours and 2 Lab. hours per week (39h Theory + 26h Lab) <br />
        Pre-requisite: {courseHeader.prerequisites.join(", ")} <br />
        {courseInfo.semester}, {courseInfo.scheme} Scheme &ndash; Theory {courseHeader.code}, Lab{" "}
        {courseInfo.courseCodes.join(" / ")} <br />
        {courseInfo.department}, <Link href="/about">{institute.name}</Link> ({institute.status}),{" "}
        {courseInfo.university}
      </p>

      <h2>About the course</h2>
      <p>
        This site carries the complete Machine Learning theory curriculum and its virtual
        laboratory. The lab runs entirely in your browser &ndash; real Python with NumPy,
        scikit-learn and Matplotlib, no installation and no server. Every experiment comes
        with its aim, theory, a pretest, the procedure, a live simulation, a posttest and
        further readings.
      </p>
      <ul>
        <li>
          <p>
            <b>Theory</b>: 6 modules, {courseHeader.totalHours} lecture hours &ndash; see{" "}
            <Link href="/theory">Course Structure</Link>
          </p>
        </li>
        <li>
          <p>
            <b>Lab</b>: {experiments.length} virtual experiments mapped to LO1&ndash;LO3 &ndash; see{" "}
            <Link href="/experiments">Lab</Link>
          </p>
        </li>
        <li>
          <p>
            <b>Evaluation</b>: 150 marks (80 Theory + 70 Lab / Internal Assessment) &ndash; see{" "}
            <Link href="/evaluation">Evaluation Policy</Link>
          </p>
        </li>
      </ul>

      <h2>Timings and location</h2>
      <ul>
        <li>
          <p>
            <b>Lectures</b>: 3 hours per week
          </p>
        </li>
        <li>
          <p>
            <b>Lab</b>: 2 hours per week, {institute.lab}, {courseInfo.department}
          </p>
        </li>
        <li>
          <p>
            <b>Campus</b>: {institute.name}, {institute.address}
          </p>
        </li>
      </ul>

      <h2>Institute</h2>
      <ul>
        <li>
          <p>
            <a href={institute.website} target="_blank" rel="noopener noreferrer">
              {institute.name}
            </a>{" "}
            ({institute.status}), Nerul &ndash; affiliated to the {institute.affiliation}
          </p>
        </li>
        <li>
          <p>{institute.accreditation.join(", ")}</p>
        </li>
        <li>
          <p>
            Department vision, mission and programme outcomes:{" "}
            <Link href="/about">About the Institute</Link>
          </p>
        </li>
      </ul>

      <h2>Textbooks</h2>
      <ul>
        {textbooks.map((b) => (
          <li key={b.title}>
            <p>
              {b.title} by {b.author}
              {b.publisher ? `, ${b.publisher}` : ""}.
            </p>
          </li>
        ))}
      </ul>

      <h2>References</h2>
      <ul>
        {references.map((r) => (
          <li key={r.title}>
            <p>
              {r.title} by {r.author}
              {r.publisher ? `, ${r.publisher}` : ""}.
            </p>
          </li>
        ))}
        <li>
          <p>
            <a href={LAB_MANUAL_PDF} target="_blank" rel="noopener noreferrer">
              SIES GST Machine Learning Lab Manual
            </a>{" "}
            and the{" "}
            <a href={EXPERIMENT_LIST_PDF} target="_blank" rel="noopener noreferrer">
              Experiment List
            </a>{" "}
            (PDF, for lab only)
          </p>
        </li>
      </ul>

    </JdPage>
  );
}
