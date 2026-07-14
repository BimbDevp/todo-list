export default function createProject(title, color){
    return {
        id: crypto.randomUUID(),
        title: title,
        color: color,
        createdAt: new Date(),
    };
}