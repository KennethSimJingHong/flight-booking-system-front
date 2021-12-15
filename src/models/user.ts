class User{
    id: number;
    username: string;
    email: string;
    name: string;
    phone: string;
    roles: string[];

    constructor(id: number, username: string, email: string, name: string, phone: string, roles: string[]){
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.roles = roles;
    }

}
export default User;