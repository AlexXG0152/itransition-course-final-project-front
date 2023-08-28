import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss'],
})
export class TagsCloudComponent {
  @Input() tags: string[] = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'Sed',
    'nibh',
    'nunc',
    'sodales',
    'vel',
    'odio',
    'duis',
    'ultrices',
    'lacinia',
    'quam',
    'vitae',
    'ullamcorper',
    'morbi',
    'velit',
    'leo',
    'tincidunt',
    'nec',
    'lacus',
    'eget',
    'facilisis',
    'rhoncus',
    'nibh',
  ];

  handleClick(tag: string) {
    // Добавить здесь логику обработки действия по клику на тег
    console.log('Clicked tag:', tag);
  }
}
