import { connect } from "../../helpers/db/connect.js";

export class movies extends connect{
    static instance;
    constructor(){
        if(typeof movies.instance === "object"){
            return movies.instance;
        }
        super();
        this.collection = this.db.collection("movies");
        movies.instance = this;
        return this;
    }
    async getAllMovies(){
        let res = await this.collection.agregate([
            {
                $proyect :{
                    name:1
                }
            }
        ]).toArray();
        await this.collection.close();
        return res;
    }
}

