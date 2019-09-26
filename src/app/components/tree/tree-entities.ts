export interface TreeNode {
    text: string;
    type: 'folder' | 'leaf';
    children?: TreeNode[];
}
