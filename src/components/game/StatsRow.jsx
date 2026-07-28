function StatTile({ label, value, tone }) {
  return (
    <div className={tone ? `stat-tile stat-tile--${tone}` : "stat-tile"}>
      <dd className="stat-tile__value">{value}</dd>
      <dt className="stat-tile__label">{label}</dt>
    </div>
  );
}

export default function StatsRow({ stats }) {
  return (
    <dl className="stats-row" aria-label="Current session stats">
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </dl>
  );
}
