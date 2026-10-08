import type { Metadata } from "next";
import JdPage from "@/components/JdPage";
import FeedbackForm from "@/components/FeedbackForm";
import { courseHeader } from "@/lib/syllabus";
import { labDonts, labDos } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "Misc. | CSC701 Machine Learning",
  description: "Academic honesty, laboratory code of conduct and course feedback.",
};

export default function MiscPage() {
  return (
    <>
      <JdPage title={<>{courseHeader.code} &ndash; Misc.</>}>
        <h2>
          <span style={{ color: "red", fontSize: "125%" }}>Academic Dishonesty</span>
        </h2>
        <p>
          There will not be any tolerance towards any academic misconduct. Plagiarism,
          unauthorized software usage, or disregard for lab decorum is graded at the lowest
          level of the Lab Ethics &amp; Professional Conduct rubric. Do not plagiarize or
          blindly copy-paste solutions without conceptual comprehension.
        </p>

        <h2>
          <span style={{ color: "green", fontSize: "125%" }}>Collaboration</span>
        </h2>
        <p>
          Students can discuss the experiments among themselves and refer to the textbooks,
          the lab manual and the further readings listed with each experiment. The submitted
          code and journal write-up should be their own work.
        </p>

        <h2>Laboratory Best Practices (Do&apos;s)</h2>
        <ul>
          {labDos.map((item) => (
            <li key={item}>
              <p>{item}</p>
            </li>
          ))}
        </ul>

        <h2>Laboratory Code of Conduct (Don&apos;ts)</h2>
        <ul>
          {labDonts.map((item) => (
            <li key={item}>
              <p>{item}</p>
            </li>
          ))}
        </ul>

        <h2>Feedback</h2>
        <p>Help improve this course site and its virtual lab.</p>
      </JdPage>
      <FeedbackForm experimentId="course" />
    </>
  );
}
