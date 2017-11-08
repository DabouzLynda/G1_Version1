import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;

  currentListItem = -1;
  filtre = "";

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  createItem(label: string, participants: string, dateI: string) {
  if(label == ""){
  alert("L'item doit avoir un nom.");
  } else {
      const localIdItem = this.todoListService.SERVER_CREATE_ITEM(
      this.list.id,
      label,
      false,
      {participants: participants.split(",").map( P => P.trim()), dateI}
    );
    }
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }

  sortByDate(a,b){
   var x = Date.parse(a.data.dateI);
   var y = Date.parse(b.data.dateI);
   return (( x < y) ? -1 : ((x > y) ? 1 : 0));
  }
}
