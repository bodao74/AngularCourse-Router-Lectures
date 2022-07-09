
export class AuthService {
    loggedIn = false;

    /*retorna uma promise para simular um assincrono (tempo para autenticar),
     o resolve é pra retornar quando o processamento do login (simnulado) tenha concluído*/
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 300);
            }
        );
        return promise;
    }

    login() {
        this.loggedIn = true;
    }
    logout() {
        this.loggedIn = false;
    }
}