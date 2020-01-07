import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled1';
  apiUrl = '';
  apiKey = '';
  actorName = '';
  actorId = '';
  actorFilms = [];

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://api.themoviedb.org/3';
    this.apiKey = 'b5979630940045fbc20befb750de664a';
    // this.viewResult = [ this.actorName,  this.actorFilms];
  }

  searchActorFilms() {
    this.http.get(`${this.apiUrl}/person/${this.actorId}/movie_credits?api_key=${this.apiKey}&language=ru`)
      .toPromise()
      .then((response: any) => {
        console.log(response);
        if (response.cast && response.cast.length > 0) {
          this.actorFilms = response.cast;
          this.actorFilms.sort((a, b) => b.vote_average - a.vote_average);
          console.log(this.actorFilms);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchPersonId() {
    this.http.get(`${this.apiUrl}/search/person?api_key=${this.apiKey}&language=ru&query=${this.actorName}`)
      .toPromise()
      .then((response: any) => {
        console.log(response);
        if (response.results && response.results.length > 0) {
          response.results.sort((a, b) => b.popularity - a.popularity);
          console.log(response.results);
          this.actorId = response.results[0].id;
          console.log(this.actorId);
          this.searchActorFilms();
        } else { console.log('Error!'); }
      })
      .catch(err => {
        console.log(err);
      });

  }

  getActorName() {
    console.log('here2: ' + this.actorName);
    this.searchPersonId();
  }
}
