import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonSearchbar
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpsonsService } from '../services/the-simpsons';
import { TranslateFieldPipe } from '../pipes/translate-field-pipe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonSearchbar,
    RouterLink, CommonModule, FormsModule, TranslateFieldPipe
  ],
})
export class Tab1Page implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  searchTerm: string = '';

  constructor(private rmService: SimpsonsService) {}

  ngOnInit() {
    this.loadAllCharacters();
  }

  loadAllCharacters() {
    this.rmService.getCharacters(1).subscribe(res => {
      this.characters.push(...res.results);
      this.filterCharacters();

      const totalPages = res.info?.pages ?? 1;

      const requests = [];
      for (let i = 2; i <= totalPages; i++) {
        requests.push(this.rmService.getCharacters(i));
      }

      if (requests.length === 0) return;

      forkJoin(requests).subscribe(responses => {
        responses.forEach((r: any) => this.characters.push(...r.results));
        this.filterCharacters();
      });
    });
  }

  filterCharacters() {
    if (!this.searchTerm.trim()) {
      this.filteredCharacters = [...this.characters];
    } else {
      this.filteredCharacters = this.characters.filter(c =>
        c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
