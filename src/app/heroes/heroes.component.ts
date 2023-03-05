import { Component} from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  // selectedHero?: Hero;
  heroes: Hero[] = []
  constructor(private heroService: HeroService,
              private messageService: MessageService) {

  }
  // ngOnInit 라이프싸이클 함수를 이용해서 초기값을 세팅해줌
  ngOnInit(): void {
    this.getHeroes()
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }

  // 클래스 프로퍼티로 연결하는 간단한 동작으로 하는 코드로 유지함 (실제 처리는 서비스 코드에서 하고 리턴값만 받도록 함)
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes()
    // 해당 서비스 코드를 보면서 옵저버블 다큐먼트 복습
    // https://angular.kr/guide/observables
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
