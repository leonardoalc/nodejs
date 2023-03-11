const Task = require("../models/Task")

module.exports = class TaskController {

    static createTask(req, res) {
        res.render("tasks/create")
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        Task.create(task)
           .then(res.redirect("/tasks"))
           .catch((err) => console.log(err))
    }

    static showTasks(req, res) {
        res.render("tasks/all")
    }


}