"use client";

import { useState } from "react";
import Link from "next/link";
import { experiments, labOutcomes } from "@/lib/experiments-data";
import Reveal from "@/components/Reveal";

export default function OfficialLabWorkbench() {
  const [selectedLO, setSelectedLO] = useState<"ALL" | "LO1" | "LO2" | "LO3">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperiments = experiments.filter((exp) => {
    const matchesLO = selectedLO === "ALL" || exp.lo === selectedLO;
    const matchesSearch =
      searchQuery === "" ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.aim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLO && matchesSearch;
  });

  return (
    <></>
  );
}
