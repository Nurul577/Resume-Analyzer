const fs = require("fs");
const pdf = require("pdf-parse");
const Analysis = require("../models/Analysis");
const { extractSkills } = require("../utils/skillExtractor");

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Resume file is required"
      });
    }

    const jd = req.body.jobDescription || "";

    const buffer = fs.readFileSync(req.file.path);
    const data = await pdf(buffer);

    const resumeText = data.text;

    const resumeSkills = extractSkills(resumeText);
    const jdSkills = extractSkills(jd);

    const matched = resumeSkills.filter(skill =>
      jdSkills.includes(skill)
    );

    const missing = jdSkills.filter(skill =>
      !resumeSkills.includes(skill)
    );

    const totalSkills = jdSkills.length;

    const matchPercent =
      totalSkills === 0
        ? 0
        : Math.round((matched.length / totalSkills) * 100);

    /* -------- Professional Suggestions -------- */
    let suggestions;

    if (missing.length === 0) {
      suggestions =
        "Outstanding alignment with the job requirements. The candidate demonstrates strong technical readiness for this role. Continuing to showcase measurable achievements and impactful project contributions will further strengthen the profile.";
    } else {
      suggestions =
        `The candidate already satisfies a significant portion of the technical expectations. To further enhance competitiveness, gaining practical exposure or project experience in ${missing.join(", ")} is recommended. Developing expertise in these areas will significantly improve job readiness and career opportunities.`;
    }

    /* -------- Professional AI Summary -------- */
    const summary = `
The candidate presents a solid technical foundation with demonstrated experience in ${resumeSkills.join(", ")}.

Analysis indicates approximately ${matchPercent}% alignment with the job requirements, reflecting strong suitability for the position. The profile already covers several critical competencies expected for the role.

With targeted improvements in a few technologies, the candidate is well-positioned to evolve into an excellent match for similar opportunities. Overall, the resume reflects adaptability, technical capability, and strong potential to contribute effectively within modern development teams.
`;

    const record = await Analysis.create({
      matchedSkills: matched,
      missingSkills: missing,
      summary,
      suggestions
    });

    res.json({
      matchedSkills: matched,
      missingSkills: missing,
      matchPercent,
      summary,
      suggestions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
