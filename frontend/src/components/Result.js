export default function Result({ result }) {
  if (!result) return null;

  return (
    <div className="card shadow p-4">

      <h3 className="mb-3">Analysis Result</h3>

      <h5>Match Score</h5>
      <p>{result.matchPercent}% match with job</p>

      <h5>Matched Skills</h5>
      <p>{result.matchedSkills.join(", ")}</p>

      <h5>Missing Skills</h5>
      <p>{result.missingSkills.join(", ")}</p>

      <h5>Suggestions</h5>
      <p>{result.suggestions}</p>

      <h5>AI Summary</h5>
      <p>{result.summary}</p>

    </div>
  );
}
