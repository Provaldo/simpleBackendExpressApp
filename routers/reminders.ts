import { Router } from 'express';
import CreateReminderDto from '../dtos/create-reminder';
import Reminder from '../models/reminder';

const router = Router();
const reminders: Reminder[] = [];

router.get('/', (req, res) => {
    // res.send('List of reminders');
    res.json(reminders);
})

router.post('/', (req, res) => {
    // req.body
    // The type of the req.body property is any because express doesn't know
    // what the client is going to send to the server. So to add type information
    // to our code we need an interface.

    // type assertion
    const { title } = (req.body as CreateReminderDto);

    // to test this let's just send the title back to the client
    // res.json(title);

    // Now we need to create a reminder object and store it somewhere.
    // Every reminder shall have 3 properties: an id, a title and a boolean
    // showing if it is completed.
    // In a real application we will probably store this object in a DB and 
    // have the DB generate the id for us. But for now to do things simple
    // we are going to use Date.now() as a unique identifier.
    // const reminder = {
    //     id: Date.now(),
    //     title,
    //     isComplete: false
    // }
    // But we don't like the fact that this router module is responsible for 
    // generating this id and setting this isComplete property to false.
    // It would be better if we encapsulated these details inside a reminder 
    // class. This way each module would be responsible for a single thing.
    // So we want this router module to only be responsible for routing. No other
    // details should be implemented here.
    const reminder = new Reminder(title);

    // Now this would normally be stored in a DB but for simplicity's sake
    // we are going to store the reminder in a Reminder Array.
    reminders.push(reminder);

    // return the new reminder in the response.
    // It would also be good to set the status to 201 because by convention
    // in REST APIs when we create an object, the status of the response should
    // be 201.
    res.status(201).json(reminder);
})

export default router;