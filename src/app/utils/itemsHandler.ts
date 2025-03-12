import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/items.json');

export function loadItems() {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    }
    return {title: "Final Pitching BCC 2025", items: []};
}

export function saveItems(title: string, items: any[]) {
    const data = {title, items};
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
