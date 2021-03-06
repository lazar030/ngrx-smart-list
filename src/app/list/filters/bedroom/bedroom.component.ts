import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ResultsActions from '../../../store/actions/result.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-list-filter-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.scss']
})
export class ListFilterBedroomComponent implements OnInit, OnChanges {
  allAvailableOptions = [];
  changed = [];

  @Output() change = new EventEmitter();
  @Input() available;
  @Input() selected;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('available' in changes && this.changed.length === 0) {
      this.allAvailableOptions = changes.available.currentValue;
      this.changed = changes.selected.currentValue;
    }
  }

  onToggle(bedroom, event) {
    const checked = event.target.classList.contains('selected');
    if (checked && this.changed.length === 1) return;

    if (checked) {
      event.target.classList.remove('selected');
      this.changed = this.changed.filter(e => e !== bedroom);
    } else {
      event.target.classList.add('selected');
      this.changed.push(bedroom);
    }
  }

  applyBedroomFilters() {
    this.store.dispatch(ResultsActions.filter({ filters: { bedrooms: this.changed } }));
    this.change.emit(this.changed);
  }
}
