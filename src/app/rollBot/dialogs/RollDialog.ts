import { Dialog, DialogContext, DialogTurnResult } from 'botbuilder-dialogs';
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler } from "botbuilder";
import { DiceRoller } from 'rpg-dice-roller';

export default class RollDialog extends Dialog {
    diceRoller: DiceRoller;

    constructor(dialogId: string) {
        super(dialogId);
        this.diceRoller = new DiceRoller();
    }

    public async beginDialog(context: DialogContext, options?: any): Promise<DialogTurnResult> {
        let text = TurnContext.removeRecipientMention(context.context.activity).trim();
        if (text.toLowerCase().startsWith("roll"))
        {
            text = text.substring(4).trim();
        }
        let rolls: string[] = [];
        for (let roll of text.split(" "))
        {
            roll = roll.trim();
            if (roll !== "")
            {
                rolls.push(roll);
            }
        }
        if (rolls.length === 0)
        {
            context.context.sendActivity("Tell me what to roll!");
        } else {
            let results = DiceRoller.prototype.roll.apply(this.diceRoller, rolls);
            let name = context.context.activity.from.name;
            context.context.sendActivity(name + " rolled " + results);
        }
        
        return await context.endDialog();
    }
}
