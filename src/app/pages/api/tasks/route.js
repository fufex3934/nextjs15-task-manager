import { connectToDatabase } from "../../../lib/db";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const tasks = await Task.find({});
      res.status(200).json(tasks);
      break;
    case "POST":
      const newTask = await Task.create(req.body);
      res.status(201).json(newTask);
      break;
    case "PUT":
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedTask);
      break;
    case "DELETE":
      await Task.findByIdAndDelete(id);
      res.status(204).send();
    default:
      res.status(405).send({ message: "Method Not Allowed" });
  }
}
