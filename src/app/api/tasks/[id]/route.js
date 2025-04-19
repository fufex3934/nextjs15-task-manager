// app/api/tasks/[id]/route.js
import { connectToDatabase } from '../../../lib/db.js';
import Task from '../../../models/Task.js'

export async function PUT(request, { params }) {
  await connectToDatabase();
  const body = await request.json();
  const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updatedTask);
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  await Task.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
