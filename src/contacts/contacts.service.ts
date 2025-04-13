import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  protected apiKey: string;
  private readonly logger = new Logger(ContactsService.name);

  constructor() {
    this.apiKey = process.env.KEY_HUB || '';
  }

  async create(createContactDto: CreateContactDto) : Promise<Contact> {
    try {
      const request = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            'properties': {
              ...createContactDto
            }
          }),
        },
      );

      const response = await request.json();
      const contact = Contact.createFromCreateRequest(response);
      return contact;
    } catch (error) {
      return this.handleError(error, 'Error creating contact');
    }
  }

  async findAll() : Promise<Contact[]> {
    try {
      const request = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        },
      );

      const data = await await request.json();
      const {results = []} = data;

      if(results.length === 0) return [];
      return results.map((contact: any) => {
        return Contact.createFromCreateRequest(contact);
      });

    } catch (error) {
      return this.handleError(error, 'Error fetching contacts');
    }
  }

  async findOne(id: number) : Promise<Contact> {
    try {
      const request = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        },
      );

      if(request.status === 404) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request.json();
      const contact = Contact.createFromCreateRequest(response);
      return contact;
    } catch (error) {
      return this.handleError(error, 'Error fetching contact');
    }
  }

  async findByEmail(email: string) : Promise<Contact> {
    try {
      const request = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        },
      );

      if(request.status === 404) {
        throw new NotFoundException('Contact not found');
      }

      const response = await request.json();
      const contact = Contact.createFromCreateRequest(response);
      return contact;
    } catch (error) {
      return this.handleError(error, 'Error fetching contact by email');
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto) : Promise<Contact> {
    try {
      const request = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              ...updateContactDto
            }
          }),
        },
      );
      if(request.status === 404) {
        throw new NotFoundException('Contact not found');
      }
      const response = await request.json();
      const contact = Contact.createFromCreateRequest(response);
      return contact;
    } catch(err) {
      this.handleError(err, 'Error updating contact');
    }
  }

  async remove(id: number) : Promise<Boolean> {
    try {
      const request = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        },
      );
      if(request.status === 204) {
        return true;
      } else {
        throw new InternalServerErrorException('Error deleting contact');
      }
    } catch(err) {
      this.handleError(err, 'Error deleting contact');
    }
  }

  private handleError(error: any, message: string) : never {
    this.logger.error(message, error);
    if(error.status === 404) {
      throw new NotFoundException(error.message);
    }
    if(error.status === 400) {
      throw new NotFoundException(error.message);
    }
    throw new InternalServerErrorException(message);
  }
}
