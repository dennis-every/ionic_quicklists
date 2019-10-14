import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklists';

@Injectable({
  providedIn: 'root'
})
export class ChecklistDataService {
  public checklists: Checklist[] = [];
  public loaded = false;

  constructor() { }

  load(): Promise<boolean> {
    return Promise.resolve(true);
  }

  createChecklist(data): void {

    this.checklists.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: []
    });

    this.save();

  }

  renameChecklist(checklist, data): void {

    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists[index].title = data.name;
      this.save();
    }
  }

  removeChecklist(checklist): void {

    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }
  }

  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(checklistId, data): void {

    this.getChecklist(checklistId).items.push({
      title: data.name,
      checked: false
    });

    this.save();
  }

  removeItem(checklist, item): void {

    let index = checklist.items.indexOf(item);

    if (index > -1) {
      checklist.items.splice(index, 1);
      this.save();
    }
  }

  renamItem(item, data): void {

    item.title = data.name;
    this.save();
  }

  toggleItem(item): void {
    item.checked = !item.checked;
    this.save();
  }

  save(): void {}

  generateSlug(title): string {
    // Simplistic slug generator, does not handle things like special charachters
    let slug = title.toLowerCase().replace(/\s+/g, '-');
    // Check if slug already exists
    let exists = this.checklists.filter((checklist) => {
      return checklist.id.substring(0, slug.length) === slug;
    });
    // If the title is already being used, add a number to make the slug unique
    if (exists.length > 0) {
      slug = slug + exists.length.toString();
    }
    return slug;
  }


}
