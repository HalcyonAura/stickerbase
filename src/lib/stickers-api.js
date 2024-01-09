import axios from "axios"

class Stickers {
    #client;
    constructor(){
        console.dir(process.env)
        this.#client = axios.create({
            baseURL: new URL("", process.env.REACT_APP_APIURL).toString()
            });
    }
    static getInstance() {
        if (!this.instance) {
          this.instance = new Stickers();
        }
        return this.instance;
      }
    getAll(){
        return this.#client.get("/stickers");
    }
    getSticker(id){
        return this.#client.getSticker(`/stickers/${id}`)
    }
}

export default Stickers