import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteTrackingServiceService {
  // Un BehaviorSubject che mantiene l'URL corrente
  private currentUrlSubject = new BehaviorSubject<string>('');
  // Una proprietà observable per permettere ai componenti di sottoscriversi ai cambiamenti dell'URL
  public currentUrl$ = this.currentUrlSubject.asObservable();

  constructor(private router: Router) {
    // Sottoscriviti agli eventi del router
    this.router.events.subscribe((event) => {
      // Se l'evento è un NavigationEnd (indicando che la navigazione è completata)
      if (event instanceof NavigationEnd) {
        // Aggiorna il BehaviorSubject con l'URL corrente
        this.currentUrlSubject.next(event.urlAfterRedirects);
      }
    });
  }

  // Metodo per ottenere l'URL corrente
  getCurrentUrl(): string {
    return this.currentUrlSubject.value;
  }
}
