import { Day } from './Day';
import { prepare, sum } from './utilities';

type File = {
    size: number;
    name: string;
}

type Dir = File & {
    children: (File | Dir)[];
    parent?: Dir;
}

const isDir = (dir: File | Dir): dir is Dir => {
    return dir.hasOwnProperty('children');
}

const buildFilesystemFromLog = (input:string): Dir => {
    const root = {name: '/', size: 0, children: []} as Dir;
    let currentDir: Dir = undefined as unknown as Dir;
    prepare(input).forEach(line => {
        if (line.startsWith('$')) {
            const [_, command, param] = line.split(' ');
            if (command === 'cd') {
                switch(param) {
                    case '/': currentDir = root; break;
                    case '..': currentDir = currentDir.parent!; break;
                    default: currentDir = currentDir.children.find(c => c.name === param)! as Dir; break;
                }
            }
        } else {
            const [sizeStr, name] = line.split(' ');
            if (sizeStr === 'dir') {
                currentDir.children.push({name, size: 0, children: [], parent: currentDir} as Dir);
            } else {
                const size = parseInt(sizeStr);
                currentDir.children.push({name, size} as File);
                for (let cd = currentDir; cd !== undefined; cd = cd.parent!) {
                    cd.size += size;
                }
            }
        }
    });
    return root;
}

const findAllDirectories = (root: Dir): Dir[] => {
    const result: Dir[] = [];
    const dirs: Dir[] = [root];
    while(dirs.length > 0) {
        const currentDir = dirs.shift()!;
        currentDir.children.filter(isDir).forEach(dir => dirs.push(dir));
        result.push(currentDir);
    }
    return result;
}


const sumUpSmallDirectories = (input: string) => {
    const filesystem = buildFilesystemFromLog(input);
    const dirs = findAllDirectories(filesystem);
    return dirs.filter(dir => dir.size < 100_000).map(dir => dir.size).reduce(sum);
}

const findSmallestDeleteableDirectory = (input: string) => {
    const filesystem = buildFilesystemFromLog(input);
    const dirs = findAllDirectories(filesystem);
    const dirsOrderdAsc = dirs.sort((a, b) => a.size > b.size ? 1 : -1)
    const freeSpace = 70_000_000 - dirsOrderdAsc[dirsOrderdAsc.length - 1].size
    const dirToDelete = dirsOrderdAsc.find(dir => freeSpace + dir.size >= 30_000_000)!
    return dirToDelete.size;
}

export const Day7: Day<number> = {
  part1: (input) => sumUpSmallDirectories(input),
  part2: (input) => findSmallestDeleteableDirectory(input)
}
