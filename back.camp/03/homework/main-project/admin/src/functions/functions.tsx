export function getFirstUpperCase(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}

export function getLastPath(pathName: string) {
    return pathName.split('/').slice(-1).join(' ');
}

export function getType(target: any): string {
    return Object.prototype.toString.call(target).slice(8, -1);
}

export function padding(str: string | number, size: number = 2) {
    return String(str).padStart(size, '0');
}
