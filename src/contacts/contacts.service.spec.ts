import { ConfigModule } from "@nestjs/config";
import { ContactsService } from "./contacts.service";
import { Test, TestingModule } from '@nestjs/testing';
import { Contact } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/create-contact.dto";

describe('ContactService Test', () => {
    let contactsService: ContactsService;
    const data : CreateContactDto = {
        email: 'testing@gmail.com',
        firstname: 'Test',
        lastname: 'Testing',
        phone: '1234567890',
    };

    let contactLocal: Contact;
   
    beforeEach(async () => {
   
        const module: TestingModule = await Test.createTestingModule({
            providers: [ContactsService],
            imports: [ConfigModule.forRoot()]
        }).compile();

        contactsService = module.get<ContactsService>(ContactsService);
    })

    it('should be return an array of contacts', async () => {
        const contacts = await contactsService.findAll();
        expect(Array.isArray(contacts)).toBe(true); 
    });

    it('should be create an contanct', async () => {
        const contact = await contactsService.create(data);
        contactLocal = contact;
        expect(contact).toBeDefined();
        expect(contact).toHaveProperty('id');
    });

    it('should be return a contact', async () => {
        const contact = await contactsService.findOne(+contactLocal.id);
        expect(contact).toBeDefined();
        expect(contact).toHaveProperty('id');
        expect(contact).toHaveProperty('email');
        expect(contact).toHaveProperty('firstname');
        expect(contact).toHaveProperty('lastname');
        expect(contact).toHaveProperty('phone');
        expect(contact.email).toBe(data.email);
        expect(contact.firstname).toBe(data.firstname);
        expect(contact.lastname).toBe(data.lastname);   
    });

    it('should be return a contact by email', async () => {
        const contact = await contactsService.findByEmail(data.email);
        expect(contact).toBeDefined();
        expect(contact).toHaveProperty('id');
        expect(contact.firstname).toBe(data.firstname);
    });

    it('should be update a contact', async () => {
        const newFirstname = 'New Test';
        const newLastname = 'New Testing';
        const newContact = await contactsService.update(+contactLocal.id, {
            firstname: newFirstname,
            lastname: newLastname,
        });

        expect(newContact).toBeDefined();
        expect(newContact).toHaveProperty('id');
        expect(newContact.firstname).toBe(newFirstname);
        expect(newContact.lastname).toBe(newLastname);
    })

    it('should be delte a contact', async () => {
        const contact = await contactsService.remove(+contactLocal.id);
        expect(contact).toBe(true);
    })

})