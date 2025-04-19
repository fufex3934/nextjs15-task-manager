
import {connectToDatabase} from '../../lib/db.js'
import Task from '../../models/Task.js';

export async function GET(request) {
  await connectToDatabase();
  const tasks = await Task.find({});
  return Response.json(tasks);
}

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const newTask = await Task.create(body);
  console.log(body);
  return Response.json(newTask, { status: 201 });
}
