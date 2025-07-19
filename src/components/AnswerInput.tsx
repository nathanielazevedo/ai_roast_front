import Editor from "@monaco-editor/react";
import React from "react";

function AnswerInput({ onSubmitAnswer, question, isSubmitting }: any) {
  const editorRef = React.useRef(null);

  const handleSubmit = async () => {
    // @ts-expect-error aaa
    const editorValue = editorRef.current?.getValue() || "";
    await onSubmitAnswer(editorValue);
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
      }}
    >
      {/* Question Box */}
      <div
        style={{
          backgroundColor: "#2c2c2c",
          borderBottom: "1px solid #444",
          padding: "1rem",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#d4d4d4",
        }}
      >
        {question}
      </div>

      {/* Monaco Editor */}
      <div
        style={{
          flex: 1,
          width: "100%",
          overflow: "hidden",
          paddingTop: "10px",
        }}
      >
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// Type your answer here..."
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          padding: "0.75rem 1.5rem",
          margin: 15,
          backgroundColor: isSubmitting ? "#666" : "#388e3c",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "4px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          marginBottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isSubmitting ? (
          <div
            style={{
              border: "2px solid white",
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              width: "16px",
              height: "16px",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          "Submit Answer"
        )}
      </button>

      {/* Spinner Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AnswerInput;
