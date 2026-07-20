export default function DialogShell({ title, children }) {
  return (
    <section className="dialog-shell" aria-labelledby={`${title.toLowerCase()}-dialog-title`}>
      <div className="dialog-shell__head">
        <h2 id={`${title.toLowerCase()}-dialog-title`}>{title}</h2>
        <button className="dialog-shell__close" type="button" aria-label={`Close ${title}`}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      {children}
    </section>
  );
}
