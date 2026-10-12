import { progress } from "@/data/projects";

/** Construction timeline + "pay as it is built" bar (dark band styles). */
export default function Progress({ slug }: { slug: string }) {
  const pr = progress[slug];
  if (!pr) return null;
  return (
    <>
      <p className="sub reveal">
        Construction progress <span>{pr.updated}</span>
      </p>
      <ol className="prog reveal">
        {pr.stages.map((s) => (
          <li key={s.title} className={s.state || undefined}>
            <b>{s.title}</b>
            {s.note}
          </li>
        ))}
      </ol>
      <div className="pay reveal">
        <p className="sub" style={{ marginBottom: 14 }}>
          Pay as it is built
        </p>
        <div className="paybar" aria-hidden="true">
          <i className="d"></i>
          <i className="d"></i>
          <i className="h"></i>
          <i></i>
          <i></i>
        </div>
        <div className="paylab">
          <span><b>10%</b>Booking</span>
          <span><b>20%</b>Foundation</span>
          <span><b>20%</b>Structure</span>
          <span><b>20%</b>Finishing</span>
          <span><b>30%</b>Handover</span>
        </div>
        <p>Construction-linked plan · you pay only when a stage is done</p>
      </div>
    </>
  );
}
