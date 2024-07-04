import { MongoClient } from "mongodb";
export class connect{
    user;
    port;
    #pass;
    #host;
    #cluster;
    #dbName;
    static instance;
    constructor({user: u, port: p, pass: w, host: h, cluster: c, dbName: d}={
        user: "mongo",
        port: "47797",
        pass: "PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF",
        host: "mongodb://",
        cluster: "monorail.proxy.rlwy.net",
        dbName: "test"
    }){
    if (typeof connect.instance === "object"){
        return connect.instance;
    }
    this.user = u;
    this.port = p;
    this.setPass = w;
    this.setHost = h;
    this.setCluster = c;
    this.setDbName = d;
    this.#open();
    this.db = this.conexion.db(this.getDbName)
    connect.instance = this;
    return this;
    }
    set setPass(pass){
        this.#pass = pass;
    }
    get getPass(){
        return this.#pass;
    }
    set setHost(host){
        this.#host = host;
    }
    get getHost(){
        return this.#host;
    }
    set setCluster(cluster){
        this.#cluster = cluster;
    }
    get getCluster(){
        return this.#cluster;
    }
    set setDbName(dbName){
        this.#dbName = dbName;
    }
    get getDbName(){
        return this.#dbName;
    }
    async #open(){
        this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}`)
        console.log("Connected")
        await this.conexion.connect();
    }
    async reconnect(){
        await this.#open();
    }
    async close(){
        await this.conexion.close();
    }
}