// GET request -> fetch todos from KV
export async function onRequestGet(context) {
  const todos = await context.env.TODO_KV.get("todos", { type: "json" });
  return Response.json(todos || []);
}

// POST request -> add a todo to KV
export async function onRequestPost(context) {
  const data = await context.request.json();
  
  let todos = await context.env.TODO_KV.get("todos", { type: "json" }) || [];
  todos.push({ id: Date.now(), text: data.text });
  
  await context.env.TODO_KV.put("todos", JSON.stringify(todos));
  
  return Response.json({ success: true, todos });
}