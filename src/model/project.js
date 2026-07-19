export default function createProject(title){
    return {
        id: crypto.randomUUID(),
        title: title,
        createdAt: new Date(),
        isDefault: false,
    };
}