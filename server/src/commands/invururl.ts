import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import Discord from 'discord.js';

export default (itr: Interaction) => {

}


export const data = new SlashCommandBuilder()
    .setName("url")
    .setDescription("Create or Delete a hCaptcha URL")
    .addStringOption(option =>
        option.setRequired(true)
            .setName("options")
            .setDescription("Choose What to do")
            .addChoices([
                [
                    "Create",
                    'Create a URL'
                ],
                [
                    "Delete",
                    'Delete a URL if Exists'
                ]
            ])
    );