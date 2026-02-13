import { useState } from "react";
import UploadForm from "./components/UploadForm";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container mt-4">

      <div className="text-center mb-4">
        <h1>AI Resume Analyzer</h1>
        <p className="text-muted">
          Smart resume and job description matching powered by AI
        </p>
      </div>

      <UploadForm setResult={setResult} />

      <Result result={result} />

    </div>
  );
}

export default App;
