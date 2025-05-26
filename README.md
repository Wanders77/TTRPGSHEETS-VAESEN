
# Vaesen Interactive Character Sheet

## Overview

This is an interactive, browser-based character sheet designed for the Vaesen - Nordic Horror Roleplaying game by Fria Ligan (Free League Publishing). It aims to provide a digital alternative to paper character sheets, allowing players to easily create, manage, and update their Vaesen investigators.

The sheet integrates various rulebook elements for quick reference, automates some calculations, and provides tools for dice rolling and tracking character progression.

## Features

*   **Character Creation & Management**:
    *   Input and save all core character details: Name, Age, Archetype, Motivation, Trauma, Dark Secret, Memento.
    *   Manage Attributes (Physique, Precision, Logic, Empathy) and Skills.
    *   Track Conditions (Physical and Mental) and Broken states.
    *   Record Resources, Capital, and manage current resource values.
    *   Select and manage Talents (Archetype-specific and general).
    *   Add and manage Relationships with other player characters.
    *   Equip and manage Armor, Weapons, and general Equipment.
    *   Track Insights, Defects, and Critical Injuries.
    *   Keep session notes directly on the sheet.
*   **Dynamic Calculations**:
    *   Automatic calculation of dice pools for skills, factoring in attributes, skill ranks, conditions, armor penalties, and modifiers from insights/defects.
*   **Dice Rolling**:
    *   Integrated dice roller for attributes, skills, and weapon attacks.
    *   Rolls automatically include relevant modifiers (conditions, insights/defects, weapon/equipment bonuses).
    *   Option to add "Other Dice" (e.g., GM modifiers).
    *   Support for pushing rolls.
    *   Optional Discord integration to send roll results to a specified webhook.
*   **Progression & Tracking**:
    *   Track Experience Points (XP) and manage spending.
    *   Manage Advantages gained during mysteries.
*   **Data Persistence**:
    *   Character data is saved locally in the browser's localStorage.
    *   Import and Export character data as JSON files for backup or transfer.
*   **Rulebook Integration**:
    *   Dropdowns populated with options from the Vaesen core rulebook (e.g., Archetypes, Mementos, Talents, Equipment).
    *   Descriptions and effects for many items and talents available for quick reference.

## How to Use

1.  **Open `index.html`**: Simply open the `index.html` file in a modern web browser (Chrome, Firefox, Edge, Safari).
2.  **Create/Edit Character**: Fill in the fields on the character sheet. Most changes are saved automatically to your browser's local storage.
3.  **Import/Export**:
    *   Use the "Sheet Actions" > "Export JSON" button to save your character to a file.
    *   Use the "Sheet Actions" > "Import JSON" button to load a previously saved character file.
4.  **Dice Rolling**:
    *   Click the "Roll" button next to an attribute or skill, or the "Use" button for weapons/equipment that trigger rolls.
    *   A modal will appear showing the dice pool calculation. You can add "Other Dice" (e.g., GM modifiers) before rolling.
    *   Optionally, configure a Discord Webhook URL under "Sheet Actions" > "Discord Settings" to send roll results to a Discord channel.

## Technology

This application is built using:

*   HTML
*   CSS
*   TypeScript

It runs entirely in the client's browser and does not require a backend server (except for the optional Discord webhook communication).

## Disclaimer

*   **Fan-Made Project**: This is an unofficial, fan-made project created for personal use and convenience.
*   **No Affiliation**: This project is not affiliated with, endorsed, sponsored, or approved by Fria Ligan AB (Free League Publishing).
*   **Copyright**: Vaesen&trade; and all associated names, art, and concepts are trademarks and copyright &copy; Fria Ligan AB. This tool uses names and concepts from the Vaesen RPG for the purpose of creating a functional character sheet.
*   **Personal Use Only**: This tool is intended for personal, non-commercial use only.
*   **Support the Official Game**: This character sheet is a supplement to, not a replacement for, the official Vaesen RPG rulebooks. We strongly encourage you to purchase the official books from Fria Ligan to support their work.

## License

This project is provided as-is for personal use. No specific open-source license is attached at this time, but it is intended to be freely used and modified for personal applications within the Vaesen gaming community, respecting the copyrights of Fria Ligan AB.

## Acknowledgements

*   Thanks to **Fria Ligan AB** for creating the wonderful Vaesen - Nordic Horror Roleplaying game.
