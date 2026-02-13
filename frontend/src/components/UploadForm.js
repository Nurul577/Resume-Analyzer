import { useState } from "react";
import axios from "axios";

export default function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!file || !jd) {
      alert("Please upload resume and enter job description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    const res = await axios.post(
      "http://localhost:5000/analyze",
      formData
    );

    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="card shadow p-4 mb-4">

      <h4 className="mb-3">Upload Resume & Job Description</h4>

      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={e => setFile(e.target.files[0])}
        />
      </div>

      <textarea
        className="form-control mb-3"
        rows="6"
        placeholder="Paste job description here..."
        onChange={e => setJd(e.target.value)}
      />

      <button
        className="btn btn-primary w-100"
        onClick={submit}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </div>
  );
}
