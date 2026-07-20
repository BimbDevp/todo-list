

export default function createTask(title, desc, dueDate, priority, isCompleted, notes, checklist) {
   return { 
    id: crypto.randomUUID(),
    projectId: null,
    title: title,
    desc: desc,
    dueDate: dueDate,
    priority: priority,
    isCompleted: isCompleted,
    notes: notes,
    checklist: checklist || [],
    createdAt: new Date().toISOString(),
   };
}

