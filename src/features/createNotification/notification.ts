export default class Notify {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    notification() {
        new Notification(this.name);
    }

    static verifyNotification() {
        if ('Notification' in window) {
            if (Notification.permission === 'denied') {
                alert('Você precisa habilitar as notificações');
            } else if (Notification.permission === 'default') {
                Notification.requestPermission().then(res => {
                    if (res === 'denied') {
                        alert('Você precisa habilitar as notificações');
                    }
                })
            }
        } else {
            alert('Seu nabegador não suporta notificações.');
        }
    }
}