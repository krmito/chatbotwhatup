export class User {
  chatId:string = '';
  body:string = '';
  state:string = '';

  constructor(chatId:string, body:string, state:string){
    this.chatId = chatId;
    this.body = body;
    this.state = state;
  }

  
  get getChatId(): string{
    return this.chatId;
  }
  get getMessage(): string{
    return this.body;
  }
  get getState(): string{
    return this.state;
  }

  set setChatId(chatId:string){
     this.chatId = chatId;
  }
  set setMessage(body:string){
     this.body = body;
  }
  set setState(state:string){
     this.state = state;
  }
  

}
