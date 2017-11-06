import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {dataForItem} from "../../data/protocol";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  getParticipant(): string {
    return this.item.data.participants.join(", ") || "aucun participant";
  }

  getDate(): string {
    return this.item.data.dateI || "aucune date";
  }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel();
  }

  setItem(label: string, participants: string, dateI: string) {
    this.setLabel(label);
    const participantsArray = participants.split(", ");
    const data: dataForItem = {
      participants : participantsArray,
      dateI : dateI
    };
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, data);

  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel() {
    this.editingLabel = !this.editingLabel;
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    if (confirm("Etes-vous sur de vouloir supprimer cet item ?")) {
      this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
    }
  }

  modifier() {
    this.todoListService.SERVER_UPDATE_LIST_DATA(this.listId, this.item.id);
  }

}
