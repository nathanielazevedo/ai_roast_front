import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function AIResponse({ text, isLoading }: any) {
  const snarkyIntro =
    "You write code in the panel to the left and then click the submit button. Too complicated for you?";

  const [displayedText, setDisplayedText] = useState("");

  // Typing effect
  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;

      if (index > text.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  const loadingMessage = "Let's see how bad you messed this up...";

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
        fontFamily: "monospace",
        fontSize: "0.8rem",
        padding: "0.7rem",
        borderRadius: "8px",
        whiteSpace: "pre-wrap",
        lineHeight: "1.5",
        minHeight: "200px",
        border: "1px solid #333",
      }}
    >
      {!isLoading && !text && (
        <p
          style={{
            fontStyle: "italic",
            marginBottom: "1rem",
            color: "#aaaaaa",
          }}
        >
          {snarkyIntro}
        </p>
      )}

      {isLoading ? (
        <p style={{ color: "#aaaaaa", fontStyle: "italic" }}>
          {loadingMessage}
        </p>
      ) : (
        <ReactMarkdown
          children={displayedText}
          components={{
            code({ children, ...props }) {
              return (
                <code
                  style={{
                    backgroundColor: "#2c2c2c",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "4px",
                    color: "#4caf50",
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        />
      )}
    </div>
  );
}

export default AIResponse;
