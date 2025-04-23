import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  time: string;
  read: boolean;
}

@Injectable({
	providedIn: 'root',
  })
  export class NotificationService {

	private currentUserType: 'donor' | 'organizer' = 'donor';
  
	private readonly STORAGE_KEY_PREFIX = 'notifications_';
	private _notifications = new BehaviorSubject<Notification[]>([]);
	notifications$ = this._notifications.asObservable();
  
	constructor() {
	  this.loadFromLocalStorage();
	}
  
	setUserType(userType: 'donor' | 'organizer') {
	  this.currentUserType = userType;
	  this.loadFromLocalStorage(); // reload from the new user’s store
	}
  
	private getStorageKey(): string {
	  return `${this.STORAGE_KEY_PREFIX}${this.currentUserType}`;
	}
  
	private getCurrentTime(): string {
	  return new Date().toLocaleString();
	}
  
	addNotification(message: string) {
	  const newNotification: Notification = {
		message,
		time: this.getCurrentTime(),
		read: false,
	  };
	  const updated = [newNotification, ...this._notifications.value];
	  this._notifications.next(updated);
	  this.saveToLocalStorage(updated);
	}
  
	clearNotifications() {
	  this._notifications.next([]);
	  localStorage.removeItem(this.getStorageKey());
	}
  
	private saveToLocalStorage(notifications: Notification[]) {
	  localStorage.setItem(this.getStorageKey(), JSON.stringify(notifications));
	}
  
	private loadFromLocalStorage() {
	  const data = localStorage.getItem(this.getStorageKey());
	  if (data) {
		this._notifications.next(JSON.parse(data));
	  } else {
		this._notifications.next([]);
	  }
	}
  
	markAsRead(index: number) {
	  const notifications = [...this._notifications.value];
	  if (notifications[index]) {
		notifications[index].read = true;
		this._notifications.next(notifications);
		this.saveToLocalStorage(notifications);
	  }
	}
  }
  