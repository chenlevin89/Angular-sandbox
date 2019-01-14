import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/models/person.interface';
import { ExampleComponent } from 'src/app/features/example/example.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person;

  constructor(private parent: ExampleComponent) { }

  ngOnInit() {
  }

  onClick() {
    const clone = { ...this.person, firstName: 'Gal', lastName: 'David' };
    this.parent.renamePerson(clone);
  }

}
