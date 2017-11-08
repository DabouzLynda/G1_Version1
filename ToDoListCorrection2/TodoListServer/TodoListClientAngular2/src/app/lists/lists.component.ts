import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {ListID} from "../../data/protocol";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();
  private currentList: TodoListWithItems = undefined;
  private add = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    this.todoListService.SERVER_CREATE_NEW_LIST(name);
  }

  setAddClick() {
    this.add = !this.add;
  }

  getAddClick() {
    return this.add;
  }

  shouldAllListsBeDisplayed(): boolean {
    return this.currentList === undefined;
  }

  setCurrentListFromId(id?: string) {
    this.currentList = this.getLists().find( L => L.id === id ) || undefined;
  }

  getCurrentList(): TodoListWithItems {
    return this.currentList;
  }
/*
  setCurrentListName(name: string) {
    this.todoListService.SERVER_SET_CURRENT_LIST_NAME(name);
  }
*/
  getCurrentListName(): string {
    return this.currentList ? this.currentList.name : "TodoLists";
  }

  delete(list: TodoListJSON) {
    if (confirm(`Etes-vous sur de vouloir supprimer la liste ${list.name}?`)) {
      this.todoListService.SERVER_DELETE_LIST(list.id);
    }
  }

}
