const {ToDo} = require("../../database/")

class TodoController {

    /**
     * создает todo у пользователя
     * @param req
     * @param res
     * @returns {Promise<ToDo>} возвращет созданный todo
     */
    async create_todo(req, res) {
        try{
            const userId = req.user.id;
            const {task} = req.body;
            const todo = new ToDo({task, owner: userId});
            await todo.save();
            return res.json({todo})
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Server error"});
        }
    }

    /**
     * находит todos из параметра page-страница, limit- количество на странице
     * @param req
     * @param res
     * @returns {Promise<[ToDo]>}
     */
    async find_todos(req, res) {
        try{
            const userId = req.user.id;
            const page = Math.max(0, req.query.page)-1;
            const limit = Math.max(0, req.query.limit);

            const todos = await ToDo.find()
                .select('-owner')
                .limit(limit)
                .skip(limit*page)
                .where('owner')
                .equals(userId);
            return res.json({todos});
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Server error"});
        }
    }

    /**
     * находит todo по id
     * @param req
     * @param res
     * @returns {Promise<ToDo>}
     */
    async find_todo_by_id(req, res) {
        try{
            const userId = req.user.id;
            const todoId = req.params["id"];
            const todo = await ToDo.find()
                .where('owner').equals(userId)
                .select('-owner')
                .where('_id').equals(todoId);
            return res.json({todo});
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Server error"});
        }
    }

    /**
     *обновляет todo по id, обновляя его task из body
     * @param req
     * @param res
     * @returns {message}
     */
    async update_todo(req, res) {
        try{
            const userId = req.user.id;
            const todoId = req.params["id"];
            const {task} = req.body;
            const todo = await ToDo.updateOne()
                .set({task, updatedAt: Date.now()})
                .where('owner').equals(userId)
                .where('_id').equals(todoId);
            return res.json({message:"Task updated"})
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Server error"});
        }
    }

    /**
     * удаляет todo по id
     * @param req
     * @param res
     * @returns {message}
     */
    async delete_todo(req, res) {
        try{
            const userId = req.user.id;
            const todoId = req.params["id"];
            const todo = await ToDo.deleteOne()
                .where('owner').equals(userId)
                .where('_id').equals(todoId);
            return res.json({message:"Task deleted"})

        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Server error"});
        }
    }
}

module.exports = new TodoController();