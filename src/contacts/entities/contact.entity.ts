import { ContactCreateResponse } from "../types/contacts-create.type";


export class Contact {
    constructor(
        public createdate: string,
        public email: string,
        public firstname: string,
        public id: string,
        public lastname: string,
        public phone: string,
    ) {};

    static createFromCreateRequest(contactCreate: ContactCreateResponse) {
        const {id, properties} = contactCreate;
        const {email, firstname, lastname, phone, createdate} = properties;
        return new Contact(
            createdate,
            email,
            firstname,
            id,
            lastname,
            phone,
        );
    }
}
