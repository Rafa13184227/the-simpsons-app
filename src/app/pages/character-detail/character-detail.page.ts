import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpsonsService } from 'src/app/services/the-simpsons';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonBackButton, IonButtons
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { TranslateFieldPipe } from 'src/app/pipes/translate-field-pipe';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    TranslateFieldPipe, NgFor, NgIf,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonBackButton, IonButtons
  ]
})
export class CharacterDetailPage implements OnInit {
  character: any;

  constructor(private route: ActivatedRoute, private rmService: SimpsonsService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.rmService.getCharacterDetails(Number(id)).subscribe(data => {
      this.character = data;
    });
  }
}
