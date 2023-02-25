// eylemlerle ilgili ara katman yazılımları yazın
const actionModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    let isExistAction = await actionModel.get(req.params.id);
    if (!isExistAction) {
      res.status(404).json({ message: "actions not found" });
    } else {
      req.action = isExistAction;
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateActionDetail(req, res, next) {
  try {
    let { project_id, description, notes, completed } = req.body;
    if (
      !project_id ||
      !description ||
      !notes ||
      typeof completed != "boolean"
    ) {
      res.status(400).json({ message: "Missed fields" });
    } else {
      if (project_id > 0) {
        let isExistProject = await projectModel.get(project_id);
        if (!isExistProject)
          res.status(400).json({ message: "Project not found" });
        else {
          req.action = {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: completed,
          };
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateActionDetail,
  validateActionId,
};
