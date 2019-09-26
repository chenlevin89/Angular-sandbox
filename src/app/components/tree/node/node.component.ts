import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TreeNode} from '../tree-entities';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input() treeNode: TreeNode;
  @Output() selected = new EventEmitter();

  open = false;

  constructor() {}

  ngOnInit() {
    console.log(this.treeNode);
  }

  onClick(event) {
    if (this.treeNode.type === 'folder') {
      this.open = !this.open;
      event.stopPropagation();
    } else {
      this.selected.emit(this.treeNode);
    }

  }

}
