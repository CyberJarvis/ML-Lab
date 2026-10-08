"use client";

import { courseInfo } from "@/lib/experiments-data";
import { institute } from "@/lib/institute";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme, toggle } = useTheme();

  return (
    <div id="footer">
      <div id="footer-text">
        {courseInfo.department}, {institute.name} ({institute.status}), {institute.address} ·
        Affiliated to the {institute.affiliation}.{" "}
        <button onClick={toggle}>
          {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </div>
    </div>
  );
}
