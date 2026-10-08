import Image from "next/image";
import type { Metadata } from "next";
import JdPage from "@/components/JdPage";
import { courseHeader } from "@/lib/syllabus";
import { instructor, teachingAssistants } from "@/lib/institute";

export const metadata: Metadata = {
  title: "Instructor & TAs | CSC701 Machine Learning",
  description: "Faculty in-charge and teaching assistants for the Machine Learning course and virtual lab.",
};

export default function TeamPage() {
  return (
    <JdPage title={<>{courseHeader.code} &ndash; Instructor &amp; Teaching Assistants</>}>
      <h2>Instructor</h2>
      <table className="imgtable">
        <tbody>
          <tr>
            <td>
              <Image
                src={instructor.photo}
                alt={instructor.name}
                width={160}
                height={200}
                style={{ objectFit: "cover", objectPosition: "top", width: 160, height: 200 }}
                priority
              />
            </td>
            <td>
              <p>
                <b>{instructor.name}</b> <br />
                {instructor.title} <br />
                {instructor.department} <br />
                {instructor.institute} <br />
                Email: <a href={`mailto:${instructor.email}`}>{instructor.email}</a>
              </p>
              <p>
                <a href={instructor.facultyPage} target="_blank" rel="noopener noreferrer">
                  Faculty Page
                </a>
                {" · "}
                <a href={instructor.homepage} target="_blank" rel="noopener noreferrer">
                  Homepage
                </a>
                {" · "}
                <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </p>
              <ul>
                {instructor.credentials.map((c) => (
                  <li key={c.label}>
                    <p>
                      {c.label}: {c.value}
                    </p>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Academic Profile &amp; Biography</h2>
      <p>
        <b>Dr. Deepika Kumari</b> is an interdisciplinary researcher, educator, and innovator
        with over a decade of experience across academia, research, and industry. Currently
        serving as an Associate Professor at the Department of Electronics &amp; Computer Science
        at SIES Graduate School of Technology.
      </p>
      <p>
        She received her Ph.D. from the <b>Indian Institute of Technology (IIT) Delhi</b>,
        specializing in Array Signal Processing. Her expertise spans Signal Processing,
        Artificial Intelligence, Machine Learning, Acoustic Source Localization, Spatial Audio,
        Robotics, Biomedical Imaging, and Intelligent Sensing Systems.
      </p>
      <p>
        Her research focuses on developing advanced signal processing and AI-based solutions for
        real-world challenges in acoustics, healthcare, robotics, and intelligent systems. She
        has published extensively in premier journals and conferences including{" "}
        <i>IEEE Transactions on Signal Processing</i>,{" "}
        <i>The Journal of the Acoustical Society of America</i>, and <i>ICASSP</i>.
      </p>

      <h2>Core Areas of Expertise</h2>
      <p>{instructor.expertise.join(", ")}.</p>

      <h2>Education &amp; Degrees</h2>
      <ul>
        <li>
          <p>
            <b>Ph.D. in Array Signal Processing</b>, IIT Delhi, July 2017 &ndash; Jan 2022. Thesis:{" "}
            <i>&ldquo;Optimal Array Processing for Spherical Sector Microphone Array&rdquo;</i>
          </p>
        </li>
        <li>
          <p>
            <b>M.Tech</b>, NIT Durgapur, July 2014 &ndash; June 2016
          </p>
        </li>
      </ul>

      <h2>Research &amp; Grants</h2>
      <ul>
        <li>
          <p>
            <b>SERB Sponsored Projects:</b> Research supported by the Science and Engineering
            Research Board (SERB), Government of India.
          </p>
        </li>
        <li>
          <p>
            <b>IIT Delhi Collaboration:</b> Active ongoing joint research in acoustics, medical
            imaging, healthcare analytics, and intelligent sensing.
          </p>
        </li>
      </ul>

      <h2>Granted Patents &amp; Inventions</h2>
      <p>Inventor &amp; Co-Inventor of 3 Granted Patents in Signal Processing, AI &amp; Robotics.</p>
      <ol>
        {instructor.patents.map((pat) => (
          <li key={pat.title}>
            <p>
              <b>{pat.title}</b> (Granted Patent) &ndash; {pat.desc}
            </p>
          </li>
        ))}
      </ol>

      <h1>Teaching Assistants</h1>
      <p>
        Student developers facilitating hands-on simulations, code assistance and experiment
        evaluations.
      </p>
      <table className="imgtable">
        <tbody>
          {teachingAssistants.map((ta) => (
            <tr key={ta.name}>
              <td>
                <Image
                  src={ta.image}
                  alt={ta.name}
                  width={64}
                  height={64}
                  style={{ objectFit: "cover", objectPosition: "top", width: 64, height: 64 }}
                />
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <b>{ta.name}</b> (<a href={`mailto:${ta.email}`}>{ta.email}</a>
                {" · "}
                <a href={ta.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                )
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </JdPage>
  );
}
