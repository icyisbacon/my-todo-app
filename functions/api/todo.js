// GET request -> fetch todos from KV
export async function onRequestGet(context) {
  const todos = await context.env.TODO_KV.get("todos", { type: "json" });
  return new Response(JSON.stringify(todos || []), {
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}

// POST request -> add a todo to KV
export async function onRequestPost(context) {
  const data = await context.request.json();
  const text = (data?.text || "").trim();
  if (!text) {
    return new Response(JSON.stringify({ error: "Missing text" }), { status: 400 });
  }

  let todos = (await context.env.TODO_KV.get("todos", { type: "json" })) || [];
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos = [newTodo, ...todos];

  await context.env.TODO_KV.put("todos", JSON.stringify(todos));
  return new Response(JSON.stringify({ success: true, todo: newTodo, todos }), {
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}

// PUT request -> update an existing todo (text/completed)
export async function onRequestPut(context) {
  const data = await context.request.json();
  const id = data?.id;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
  }

  let todos = (await context.env.TODO_KV.get("todos", { type: "json" })) || [];
  let found = false;
  todos = todos.map((t) => {
    if (t.id === id) {
      found = true;
      return {
        ...t,
        ...(typeof data.text === "string" ? { text: data.text.trim() } : {}),
        ...(typeof data.completed === "boolean" ? { completed: data.completed } : {})
      };
    }
    return t;
  });

  if (!found) {
    return new Response(JSON.stringify({ error: "Todo not found" }), { status: 404 });
  }

  await context.env.TODO_KV.put("todos", JSON.stringify(todos));
  return new Response(JSON.stringify({ success: true, todos }), {
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}

// DELETE request -> remove a todo by id
export async function onRequestDelete(context) {
  const url = new URL(context.request.url);
  const idParam = url.searchParams.get("id");
  const id = idParam ? Number(idParam) : undefined;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
  }

  let todos = (await context.env.TODO_KV.get("todos", { type: "json" })) || [];
  const originalLength = todos.length;
  todos = todos.filter((t) => t.id !== id);

  if (todos.length === originalLength) {
    return new Response(JSON.stringify({ error: "Todo not found" }), { status: 404 });
  }

  await context.env.TODO_KV.put("todos", JSON.stringify(todos));
  return new Response(JSON.stringify({ success: true, todos }), {
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}