// "project" routerını buraya yazın!
const express = require("express");
const router = express.Router();
const projectModel = require("./projects-model");

const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectModel.get();
    /*if(!allProjects){
            allProjects = [];
        }*/
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateProjectId, async (req, res, next) => {
  try {
    let project = await projectModel.get(req.params.id);
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateProjectDetail, async (req, res, next) => {
  try {
    let { project } = req;
    let createdProject = await projectModel.insert(project);
    res.json(createdProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProjectDetail,
  async (req, res, next) => {
    try {
      let updatedData = await projectModel.update(req.params.id, req.project);
      res.json(updatedData);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateProjectId, async (req, res, next) => {
  try {
    await projectModel.remove(req.params.id);
    res.json({ message: "Silme İşlemi Başarılı" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
  try {
    let actionList = await projectModel.getProjectActions(req.params.id);
    res.json(actionList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
