import { Pipe, PipeTransform } from '@angular/core';

const TRANSLATIONS: Record<string, string> = {
  'Alive': 'Vivo',
  'Dead': 'Muerto',
  'unknown': 'Desconocido',

  'Male': 'Masculino',
  'Female': 'Femenino',
  'Genderless': 'Sin género',

  'Human': 'Humano',
  'Alien': 'Alienígena',
  'Robot': 'Robot',
  'Mutant': 'Mutante'
};

@Pipe({
  name: 'translateField',
  standalone: true
})
export class TranslateFieldPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    return TRANSLATIONS[value] ?? value;
  }
}
