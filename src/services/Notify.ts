export class Notify {
  public static allow() {
    Notification.requestPermission();
  }

  public static send(title: string, body?: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }
}
