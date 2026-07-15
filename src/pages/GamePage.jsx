export default function GamePage() {
  return (
    <main className="game-page">
      <section className="game-page__intro" aria-labelledby="game-title">
        <p className="game-page__eyebrow">StudioPulse Learning</p>
        <h1 id="game-title">
          Note <em>Detective</em>
        </h1>
        <p className="game-page__description">
          Build note-reading fluency through focused, interactive practice.
        </p>

        <div className="game-page__status" role="status">
          Game foundation ready.
        </div>
      </section>
    </main>
  );
}
