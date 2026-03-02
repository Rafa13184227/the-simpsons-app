import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SimpsonsService } from '../services/the-simpsons';
import { TranslateFieldPipe } from '../pipes/translate-field-pipe';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader,TranslateFieldPipe, CommonModule, IonToolbar, IonTitle, IonContent, RouterLink, CommonModule, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonInfiniteScroll, IonInfiniteScrollContent],
})

export class Tab1Page implements OnInit {
  filteredCharacters: any[] = [];

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


