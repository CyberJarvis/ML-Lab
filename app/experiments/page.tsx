import Link from "next/link";
import type { Metadata } from "next";
import JdPage from "@/components/JdPage";
import { courseInfo, experiments, labOutcomes } from "@/lib/experiments-data";
import { courseHeader } from "@/lib/syllabus";
import { institute } from "@/lib/institute";
import { EXPERIMENT_LIST_PDF, LAB_MANUAL_PDF } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Lab | CSC701 Machine Learning",
  description: "All 10 Machine Learning lab experiments with interactive Python code execution.",
};

export default function ExperimentsPage() {
  return (
    <JdPage title={<>{courseHeader.code} &ndash; Machine Learning Lab</>}>
      <ul>
        <li>
          <p>Course codes : {courseInfo.courseCodes.join(" / ")}</p>
        </li>
        <li>
          <p>Timing : 2 hours per week</p>
        </li>
        <li>
          <p>
            Room : {institute.lab}, {courseInfo.department}
          </p>
        </li>
        <li>
          <p>
            Manual :{" "}
            <a href={LAB_MANUAL_PDF} target="_blank" rel="noopener noreferrer">
              Lab Manual (PDF)
            </a>
            ,{" "}
            <a href={EXPERIMENT_LIST_PDF} target="_blank" rel="noopener noreferrer">
              Experiment List (PDF)
            </a>
          </p>
        </li>
      </ul>

      <h2>List of experiments</h2>
      <div className="jd-table-wrap">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th className="left">Experiment</th>
              <th>Topic</th>
              <th>LO</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.number}</td>
                <td className="left">
                  <Link href={`/experiments/${exp.id}`}>{exp.title}</Link>
                </td>
                <td>{exp.category}</td>
                <td>{exp.lo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lab outcomes</h2>
      <ul>
        {courseInfo.labOutcomes.map((lo) => {
          const count = experiments.filter((e) => e.lo === lo.code).length;
          return (
            <li key={lo.code}>
              <p>
                <b>{labOutcomes[lo.code].label}</b>: {lo.text} ({count} experiment{count !== 1 ? "s" : ""})
              </p>
            </li>
          );
        })}
      </ul>

      <h2>How to use the virtual lab</h2>
      <ol>
        <li>
          <p>Select any of the {experiments.length} experiments from the list above or the menu on the left.</p>
        </li>
        <li>
          <p>
            Read the <b>Aim</b> and <b>Theory</b>, then take the <b>Pretest</b>.
          </p>
        </li>
        <li>
          <p>
            Follow the <b>Procedure</b> and open the <b>Simulation</b>. The code editor comes
            pre-loaded with <b>starter code</b> with TODO markers. Complete it or click{" "}
            <b>Load Solution</b>.
          </p>
        </li>
        <li>
          <p>
            Click <b>Run</b>. The first run downloads the Python interpreter and the scientific
            stack &ndash; be patient. Later runs are instant.
          </p>
        </li>
        <li>
          <p>
            View text output in the <b>Console</b> tab and matplotlib figures in the <b>Plots</b> tab.
          </p>
        </li>
        <li>
          <p>
            Edit and re-run as many times as you like, then take the <b>Posttest</b>.
          </p>
        </li>
      </ol>

    </JdPage>
  );
}
