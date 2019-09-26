import {Component, OnInit, Input} from '@angular/core';
import {TreeNode} from './tree-entities';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() set root(val: TreeNode) {
    this.sourceRoot = {...val};
    this.displayedRoot = {...val};
  }

  sourceRoot: TreeNode;
  displayedRoot: TreeNode;

  constructor() {}

  ngOnInit() {
  }

  onSelected(node: TreeNode) {
    console.log(node);
  }

  searchChange(term) {
    if (term) {
      this.displayedRoot = this.buildTree(term);
    } else {
      this.displayedRoot = {...this.sourceRoot};
    }
  }

  private buildTree(term): TreeNode {
    return {
      ...this.sourceRoot,
      children: this.sourceRoot.children.filter(child => {
        const res = this.isNodeContainTerm(child, term);
        return res;
      })
    };
  }

  private isNodeContainTerm(curr: TreeNode, term: string): boolean {
    if (curr.text.includes(term)) {
      return true;
    }
    if (curr.children && curr.children.length) {
      const results = [];
      for (let i = 0; i < curr.children.length; i++) {
        results.push(this.isNodeContainTerm({...curr.children[i]}, term));
      }
      return results.includes(true);
    }
  }

}
