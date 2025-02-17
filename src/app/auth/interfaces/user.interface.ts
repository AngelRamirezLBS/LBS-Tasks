
export interface User {
    _id:      string;
    email:    string;
    name:     string;
    password: string;
    isActive: boolean;
    roles:    string[];
    __v:      number;
}