import RollDialog from '../RollDialog';
import { DialogTestClient } from 'botbuilder-testing';

let dialog: RollDialog;
let client: DialogTestClient;

beforeEach(() => {
    dialog = new RollDialog("Unit Test");
    client = new DialogTestClient("teams", dialog);
});

test('Simple roll', async () => {
    let reply = await client.sendActivity("1d20");
    expect(reply.text).toMatch(/^User1 rolled 1d20.*/);
});