import type { Metadata } from "next";
import JdPage from "@/components/JdPage";
import { courseHeader, assessment } from "@/lib/syllabus";
import { examScheme, rubricCriteria } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "Evaluation Policy | CSC701 Machine Learning",
  description: "Marks distribution, continuous-assessment rubric and evaluation policy for CSC701 Machine Learning.",
};

export default function EvaluationPage() {
  const total = examScheme.reduce((sum, row) => sum + row.marks, 0);
  const [ese, ia, tw, oral] = examScheme;

  return (
    <JdPage title={<>{courseHeader.code} &ndash; Marks Distribution and Evaluation Policy</>}>
      <h2>Theory - {ese.marks + ia.marks}</h2>
      <ul>
        <li>
          <p>
            {ese.component} - {ese.marks} ({ese.duration}). {ese.desc}
          </p>
        </li>
        <li>
          <p>
            {ia.component} - {ia.marks} ({ia.duration}). {assessment.internal}
          </p>
        </li>
      </ul>

      <h1>Lab - {tw.marks + oral.marks}</h1>
      <ul>
        <li>
          <p>
            {tw.component} - {tw.marks}. {tw.desc}
          </p>
        </li>
        <li>
          <p>
            {oral.component} - {oral.marks}. {oral.desc}
          </p>
        </li>
      </ul>

      <h2>Summary ({total} marks)</h2>
      <div className="jd-table-wrap">
        <table>
          <thead>
            <tr>
              <th className="left">Component</th>
              <th>Marks</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {examScheme.map((row) => (
              <tr key={row.component}>
                <td className="left">{row.component}</td>
                <td>{row.marks}</td>
                <td>{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1>Continuous Assessment Rubric</h1>
      <p>
        Every laboratory practical is graded on five criteria: Exceed Expectations (3), Meet
        Expectations (2), Below Expectations (1).
      </p>
      <div className="jd-table-wrap">
        <table>
          <thead>
            <tr>
              <th className="left">Criterion</th>
              <th className="left">Level 3</th>
              <th className="left">Level 2</th>
              <th className="left">Level 1</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {rubricCriteria.map((c, i) => (
              <tr key={c.name}>
                <td className="left">
                  <b>
                    {i + 1}. {c.name}
                  </b>
                  <br />
                  {c.description}
                </td>
                <td className="left">{c.level3}</td>
                <td className="left">{c.level2}</td>
                <td className="left">{c.level1}</td>
                <td>{c.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1>Other Policies</h1>
      <ul>
        <li>
          <p>{assessment.endSemester}</p>
        </li>
        <li>
          <p>Each virtual experiment carries a pretest and a posttest for self-assessment.</p>
        </li>
        <li>
          <p>Term work is signed off only after the experiment output is verified by the faculty.</p>
        </li>
      </ul>
    </JdPage>
  );
}
