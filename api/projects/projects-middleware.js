// projects ara yazılımları buraya
const projectModel = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    let { id } = req.params;
    let existProject = await projectModel.get(id);
    if (!existProject) {
      res.status(404).json({ message: "project not found" });
    } else {
      req.project = existProject;
    }
    next();
  } catch (error) {
    next(error);
  }
}

function validateProjectDetail(req, res, next) {
  let { name, description, completed } = req.body;
  if (!name || !description || typeof completed != "boolean") {
    res.status(400).json({ message: "Eksik Alan var" });
  } else {
    req.project = {
      name: name,
      description: description,
      completed: completed,
    };
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProjectDetail,
};
