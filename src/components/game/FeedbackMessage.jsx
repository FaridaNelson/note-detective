export default function FeedbackMessage({ feedback }) {
  const className = [
    "feedback-message",
    feedback?.tone ? `feedback-message--${feedback.tone}` : "",
  ].filter(Boolean).join(" ");

  return (
    <p className={className} aria-live="polite">
      {feedback?.message ?? "Listen, look, then choose the matching key."}
    </p>
  );
}
