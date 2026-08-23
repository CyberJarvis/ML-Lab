"use client";

import dynamic from "next/dynamic";
import type { OnMount, OnChange } from "@monaco-editor/react";
import { useTheme } from "./ThemeProvider";

// Monaco editor is loaded client-side only (it needs the browser)
const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((m) => m.default),
  { ssr: false, loading: () => <div className="h-full bg-white dark:bg-[#1e1e1e]" /> }
);

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  height?: string;
}

export default function CodeEditor({
  value,
  onChange,
  height = "100%",
}: CodeEditorProps) {
  const { theme } = useTheme();

  const handleMount: OnMount = (editor) => {
    editor.focus();
  };

  const handleChange: OnChange = (val) => {
    onChange?.(val ?? "");
  };

  // Absolutely positioned so Monaco always resolves against a definite box;
  // a percentage height would collapse inside a flex or grid parent.
  return (
    <div className="absolute inset-0 overflow-hidden">
      <MonacoEditor
        height={height}
        language="python"
        value={value}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        onChange={handleChange}
        onMount={handleMount}
        options={{
          fontSize: 14,
          fontFamily:
            "'Menlo', 'Monaco', 'Courier New', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          tabSize: 4,
          insertSpaces: true,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          lineNumbers: "on",
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
        loading={
          <div className="flex h-full items-center justify-center bg-white text-slate-500 text-sm dark:bg-[#1e1e1e] dark:text-slate-400">
            Loading editor…
          </div>
        }
      />
    </div>
  );
}
