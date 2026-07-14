export default function createTask(title, desc, dueDate, priority, isCompleted) {
   return { 
    id: crypto.randomUUID(),
    projectId: null,
    title: title,
    desc: desc,
    dueDate: dueDate,
    priority: priority,
    isCompleted: isCompleted,
    createdAt: new Date(),
   };
}