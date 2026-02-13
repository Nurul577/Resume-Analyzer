const skillsDB = [
  "react", "node", "express", "mongodb",
  "javascript", "typescript", "docker",
  "kubernetes", "aws", "sql", "python"
];

exports.extractSkills = text => {
  text = text.toLowerCase();
  return skillsDB.filter(skill => text.includes(skill));
};
