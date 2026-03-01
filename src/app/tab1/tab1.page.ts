import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {SimpsonsService} from '../services/the-simpsons';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, CommonModule, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  characters: any[] = [];
  currentPage = 1;
  constructor(private rmService: SimpsonsService) { }
  ngOnInit() {
    this.loadCharacters();
  }
  loadCharacters(event?: any) {
    this.rmService.getCharacters(this.currentPage).subscribe(res => {
      this.characters.push(...res.results);
      if (event) event.target.complete();
    });
  }
  loadMore(event: any) {
    this.currentPage++;
    this.loadCharacters(event);
  }
}
