import type { Metadata } from "next";
import JdPage from "@/components/JdPage";
import { courseInfo, experiments, labOutcomes } from "@/lib/experiments-data";
import { institute } from "@/lib/institute";

export const metadata: Metadata = {
  title: "About the Institute | CSC701 Machine Learning",
  description: "About Machine Learning Theory + Virtual Labs — course syllabus, theory modules, virtual experiments, and evaluation rubrics.",
};

export default function AboutPage() {
  return (
    <JdPage title={<>{institute.name}</>} subtitle={`${courseInfo.department} · ${institute.address}`}>
      <table className="imgtable">
        <tbody>
          <tr>
            <td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sies-logo.png" alt={institute.name} style={{ width: 220, background: "#fff" }} />
            </td>
            <td>
              <p>
                <b>
                  {institute.name} ({institute.status})
                </b>{" "}
                <br />
                {institute.address} <br />
                Affiliated to the {institute.affiliation} <br />
                {institute.accreditation.join(" · ")} <br />
                <a href={institute.website} target="_blank" rel="noopener noreferrer">
                  {institute.website.replace("https://", "")}
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Department Vision</h2>
      <p>
        <i>&ldquo;{institute.vision}&rdquo;</i>
      </p>

      <h2>Department Mission</h2>
      <ul>
        {institute.mission.map((m) => (
          <li key={m.code}>
            <p>
              <b>{m.code}</b>: {m.text}
            </p>
          </li>
        ))}
      </ul>

      <h2>Program Specific Outcomes (PSOs)</h2>
      <ul>
        {institute.psos.map((p) => (
          <li key={p.code}>
            <p>
              <b>{p.code}</b>: {p.text}
            </p>
          </li>
        ))}
      </ul>

      <h2>Machine Learning Lab Outcomes (LO)</h2>
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

      <h1>Course Information</h1>
      <div className="jd-table-wrap">
        <table>
          <tbody>
            {[
              ["University", courseInfo.university],
              ["Institute", courseInfo.institute],
              ["Department", courseInfo.department],
              ["Course", courseInfo.courseName],
              ["Course Codes", courseInfo.courseCodes.join(" / ")],
              ["Semester", courseInfo.semester],
              ["Scheme", courseInfo.scheme],
              ["Lab", institute.lab],
              ["Faculty In-charge / Instructors", courseInfo.faculty.join(" · ")],
            ].map(([label, value]) => (
              <tr key={label}>
                <td className="left">
                  <b>{label}</b>
                </td>
                <td className="left">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1>Technology Stack</h1>
      <ul>
        <li>
          <p>
            <b>Next.js 15</b> &ndash; React framework with App Router &amp; TypeScript
          </p>
        </li>
        <li>
          <p>
            <b>Pyodide</b> &ndash; CPython compiled to WebAssembly: Python in the browser
          </p>
        </li>
        <li>
          <p>
            <b>Monaco Editor</b> &ndash; The same editor that powers VS Code
          </p>
        </li>
        <li>
          <p>
            <b>scikit-learn, NumPy, SciPy</b> &ndash; Scientific Python libraries pre-loaded in Pyodide
          </p>
        </li>
      </ul>
    </JdPage>
  );
}
