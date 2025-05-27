
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// --- DATA STRUCTURES ---
interface RelationshipItem {
    id: string; // Unique ID for each relationship
    pcName: string;
    type: string;
}

interface InsightDefectItem {
    id: string; // Unique id for the instance on the sheet
    originalId: string; // ID from the definition list
    name: string;
    effect: string;
    type: 'Insight' | 'Defect' | 'Injury'; // To categorize
}

interface NoteItem {
    id: string;
    title: string;
    content: string;
    isLocked: boolean;
}

interface Character {
    name: string;
    ageGroup: string;
    age: number | null;
    archetype: string;
    motivation: string;
    trauma: string;
    darkSecret: string;
    memento: string;
    mementoUsed: boolean;
    attributes: { [key: string]: number };
    skills: { [key: string]: number };
    conditions: { [key: string]: boolean };
    physicalBroken: boolean; 
    mentalBroken: boolean;   
    resources: number;
    currentCapitalValue: number | null; 
    currentResourcesValue: number | null;
    actualCapital: string; // Retained for now, but new table uses currentCapitalValue
    talents: string[]; // Stores talent IDs
    otherTalents: string;
    relationships: RelationshipItem[]; 
    experiencePoints: number;
    advantages: string; // This is the description of the current advantage
    advantageUsed: boolean; 
    notes: NoteItem[];
    armor: ArmorItem | null;
    weapons: WeaponItem[];
    equipment: EquipmentItem[];
    discordWebhookUrl: string;
    insightsAndDefects: InsightDefectItem[]; 
}

interface AttributeDefinition {
    name: string;
}

interface SkillDefinition {
    name: string;
    attribute: string; // Key of the linked attribute
}

interface AgeGroupDefinition {
    name: string;
    attributePoints: number;
    skillPoints: number; 
}

interface ArchetypeDefinition {
    name: string;
    mainAttribute: string;
    mainSkill: string;
    talentChoices: string[]; 
    resourceRange: [number, number]; 
    startingEquipment: string[];
    motivations: string[];
    traumas: string[];
    darkSecrets: string[];
    relationshipHooks: string[]; 
    description: string;
}

interface MementoDefinition {
    d66: string;
    item: string;
}

interface ConditionDefinition {
    id: string;
    name: string;
    type: 'Physical' | 'Mental';
    description: string; 
}

interface ResourceLevel {
    value: number;
    standardOfLiving: string;
    description: string;
}

interface ResourceModifier {
    level: number;
    bonus: number;
    capital: string;
}

interface TalentDefinition {
    id: string;
    name: string;
    description: string;
    archetype?: string; 
}

interface ArmorDefinition {
    id: string;
    name: string;
    type: 'Light' | 'Medium' | 'Heavy';
    protection: number;
    agilityPenalty: number;
    availability: number;
}
interface WeaponDefinition {
    id: string;
    name: string;
    damage: string; 
    range: string;
    bonus: string; 
    skill: string; 
    availability: number;
    type: 'Melee' | 'Ranged';
}
interface GeneralEquipmentDefinition {
    id: string;
    name: string;
    bonus: string; 
    availability: number;
    effect: string;
}

interface CriticalInjuryDefinition {
    id: string; // e.g., "physical_11", "mental_42"
    d66: string;
    injury: string;
    status: 'Defect' | 'Insight' | 'Fatal' | 'Chronic'; // Simplified
    timeLimit?: string; // e.g., "1D6 days", "1D6 rounds"
    effect: string;
    table: 'Physical' | 'Mental';
}


interface ArmorItem extends ArmorDefinition {}
interface WeaponItem extends WeaponDefinition { instanceId: string; }
interface EquipmentItem extends GeneralEquipmentDefinition { instanceId: string; }


// --- RULEBOOK DATA CONSTANTS ---
const AGE_GROUPS: AgeGroupDefinition[] = [
    { name: "Young (17-25)", attributePoints: 15, skillPoints: 10 },
    { name: "Middle-Aged (26-50)", attributePoints: 14, skillPoints: 12 },
    { name: "Old (51+)", attributePoints: 13, skillPoints: 14 },
];

const ATTRIBUTES_LIST: AttributeDefinition[] = [
    { name: "Physique" }, { name: "Precision" }, { name: "Logic" }, { name: "Empathy" }
];
const ATTRIBUTE_KEYS = ATTRIBUTES_LIST.map(a => a.name);

const SKILLS_LIST: SkillDefinition[] = [
    { name: "Agility", attribute: "Physique" },
    { name: "Close Combat", attribute: "Physique" },
    { name: "Force", attribute: "Physique" },
    { name: "Medicine", attribute: "Precision" },
    { name: "Ranged Combat", attribute: "Precision" },
    { name: "Stealth", attribute: "Precision" },
    { name: "Investigation", attribute: "Logic" },
    { name: "Learning", attribute: "Logic" },
    { name: "Vigilance", attribute: "Logic" },
    { name: "Inspiration", attribute: "Empathy" },
    { name: "Manipulation", attribute: "Empathy" },
    { name: "Observation", attribute: "Empathy" },
];
const SKILL_KEYS = SKILLS_LIST.map(s => s.name);

const GENERIC_RELATIONSHIP_HOOKS = [ 
    "Needs my character's help with something.",
    "My character wants to protect them.",
    "My character is suspicious of them."
];
const CUSTOM_RELATIONSHIP_TYPE_VALUE = "custom_relationship_type_placeholder_value";


const ARCHETYPES_LIST: ArchetypeDefinition[] = [
    { 
        name: "Academic", mainAttribute: "Logic", mainSkill: "Learning", 
        talentChoices: ["Bookworm", "Erudite", "Knowledge is Reassuring"], 
        resourceRange: [4, 6], 
        startingEquipment: ["Book collection or map book", "Writing utensils", "Liquor or slide rule"],
        motivations: ["Charting the unknown", "Proving my critics wrong", "Becoming famous"],
        traumas: ["Vaettir turned you into a rat", "Aged by the magic of a mermaid", "Watched your partner being torn apart by a giant"],
        darkSecrets: ["Addicted to drugs", "Stole or falsified documents to get research results", "Hunted by a vaesen"],
        relationshipHooks: [
            "A tool for my purposes",
            "I cannot stay calm in your presence",
            "A good friend"
        ],
        description: "Utilizes knowledge and intellect to understand and overcome supernatural threats. Often found in libraries or pursuing research."
    },
    { 
        name: "Doctor", mainAttribute: "Logic", mainSkill: "Medicine", 
        talentChoices: ["Army Medic", "Chief Physician", "Emergency Medicine"], 
        resourceRange: [4, 6], 
        startingEquipment: ["Doctor’s bag with medical equipment", "Liquor or fine wine", "Weak horse or strong poison"],
        motivations: ["Exploring and describing the world", "Aiding the weak and afflicted", "Strengthening the Society and becoming its leader"],
        traumas: ["A corpse came back to life during an autopsy", "Operated on a person with donkey’s ears and hooves", "Saw your destiny in the eyes of a dying mermaid"],
        darkSecrets: ["Has two separate personalities", "Involved in illicit affairs", "Unnatural lust"],
        relationshipHooks: [
            "I trust you with my secrets",
            "You annoy me",
            "I dream of you at night"
        ],
        description: "A medical professional dedicated to healing and understanding the physical body, often confronting gruesome and unnatural afflictions."
    },
    { 
        name: "Hunter", mainAttribute: "Precision", mainSkill: "Ranged Combat", 
        talentChoices: ["Bloodhound", "Herbalist", "Marksman"], 
        resourceRange: [2, 4], 
        startingEquipment: ["Rifle", "Hunting knife or hunting dog", "Hunting trap or hunting equipment"],
        motivations: ["The thing that attacked my family must be destroyed", "Live in tune with nature", "Wants to bag some fantastic game"],
        traumas: ["Attacked by the branches of an ash tree wife", "Broke your leg in the forest, but was guided home by a will o’ the wisp", "Captured at dawn by a mountain troll and was stuck in its petrified arms"],
        darkSecrets: ["I sold my soul", "I cannot control my fits of rage", "Has children with a vaesen"],
        relationshipHooks: [
            "I am attracted to you",
            "I hate bullies like you",
            "You’re a townie weakling"
        ],
        description: "Lives off the land, skilled in tracking and survival. Often solitary and pragmatic, facing the dangers of the wild and its creatures."
    },
     { 
        name: "Occultist", mainAttribute: "Precision", mainSkill: "Stealth", 
        talentChoices: ["Magic tricks", "Medium", "Striking Fear"], 
        resourceRange: [1, 4], 
        startingEquipment: ["Crystal ball", "Powdered stag’s horn or tinder box", "Dagger or cooking pot"],
        motivations: ["Learning about vaesen", "Understanding myself", "Power"],
        traumas: ["Was hit by corrosive venom while trying to steal a lindworm egg", "The family farm is being run by a grumpy house nisse", "Was attacked by a night raven who infected you with a febrile disease"],
        darkSecrets: ["Guilty of a heinous crime", "My powers control me", "Changeling"],
        relationshipHooks: [
            "You are hiding something from the rest of us",
            "You bring me peace.",
            "You will save us all one day"
        ],
        description: "Dabbles in forbidden knowledge and mysterious arts, seeking to understand and sometimes control supernatural forces."
    },
    { 
        name: "Officer", mainAttribute: "Precision", mainSkill: "Ranged Combat", 
        talentChoices: ["Battle-hardened", "Gentleman", "Tactician"], 
        resourceRange: [3, 7], 
        startingEquipment: ["Rifle or pistol", "Compass or bayonet", "Map book or saber"],
        motivations: ["Make my father proud", "My friends need me", "Seek out danger and death"],
        traumas: ["Almost drowned when your ship was dragged down by a sea monster", "Lost all your men to an angry giant", "Saw dead warriors rise again on the battlefield"],
        darkSecrets: ["Deserter", "Cannot cope with filth and disorder", "Killed a defenseless enemy"],
        relationshipHooks: [
            "Protects you at any cost",
            "My leader",
            "Distrusts you"
        ],
        description: "A disciplined leader, trained in combat and strategy, accustomed to giving and following orders in dangerous situations."
    },
    { 
        name: "Priest", mainAttribute: "Empathy", mainSkill: "Observation", 
        talentChoices: ["Absolution", "Blessing", "Confessor"], 
        resourceRange: [4, 6], 
        startingEquipment: ["Musical instrument or fine wines", "Writing utensils", "Holy water or old bible"],
        motivations: ["Performing a sacred mission", "Cleansing my tarnished soul", "Understanding God’s creation"],
        traumas: ["Hurt someone after being enthralled by a witch", "Watched a church grim tear apart some thieves trying to steal the church silver", "The third owner of a spertus, serving the church to avoid being twisted"],
        darkSecrets: ["The Devil speaks to me", "I have stolen my identity", "Ensnared by a vaesen"],
        relationshipHooks: [
            "I am better than you",
            "Secretly in love with you",
            "My disciple"
        ],
        description: "A spiritual guide and protector of the faith, offering solace and wielding sacred power against dark entities."
    },
    { 
        name: "Private Detective", mainAttribute: "Logic", mainSkill: "Investigation", 
        talentChoices: ["Eagle Eye", "Elementary", "Focused"], 
        resourceRange: [2, 5], 
        startingEquipment: ["Magnifying glass or lockpicks", "Revolver", "Knuckle duster or binoculars"],
        motivations: ["Getting away from my family", "Uncovering the truth", "Thrill-seeking"],
        traumas: ["Heard the cry of a myling during your search for a missing child", "Had nightmares and woke up breathless and mare-ridden", "Came face-to-face with a werewolf"],
        darkSecrets: ["There is a price on my head", "Constant adulterer", "Drug addict"],
        relationshipHooks: [
            "You think you can trust me",
            "A good person",
            "Tries to understand you"
        ],
        description: "An investigator who uncovers secrets and solves mysteries, often navigating the shadowy underbelly of society."
    },
    { 
        name: "Servant", mainAttribute: "Physique", mainSkill: "Force", 
        talentChoices: ["Loyal", "Robust", "Tough as Nails"], 
        resourceRange: [2, 4], 
        startingEquipment: ["Revolver", "Hurricane lamp or make-up", "Field kitchen or simple bandages"],
        motivations: ["Protecting my master", "Curiosity", "An urge to help humans and vaesen alike"],
        traumas: ["Bitten by a brook horse", "Lost a master to the alluring song of the Neck", "Served a household plagued by a changeling"],
        darkSecrets: ["I murdered someone", "Persecuted for my religion", "Spying for a foreign power"],
        relationshipHooks: [
            "At your service",
            "I don’t take orders from you",
            "Mutual respect"
        ],
        description: "Often overlooked but resilient and resourceful, with a strong sense of duty and an intimate knowledge of their employers' lives."
    },
    { 
        name: "Vagabond", mainAttribute: "Physique", mainSkill: "Manipulation", 
        talentChoices: ["Hobo Tricks", "Suspicious", "Well-traveled"], 
        resourceRange: [1, 3], 
        startingEquipment: ["Walking stick", "Knife or crowbar", "Liquor or pet dog"],
        motivations: ["Avenging my family", "Exposing supernatural secrets", "Being liked"],
        traumas: ["Saw a revenant rise from its grave", "Forever in love with a wood wife", "Survived a week inside a troll bag"],
        darkSecrets: ["Stolen identity", "Terminal illness", "A vaesen kills anyone I love"],
        relationshipHooks: [
            "You scratch my back, and I’ll scratch yours",
            "Feigned gratitude",
            "You are my friend"
        ],
        description: "A wanderer who lives on the fringes of society, possessing street smarts and a knack for survival in harsh conditions."
    },
    { 
        name: "Writer", mainAttribute: "Empathy", mainSkill: "Inspiration", 
        talentChoices: ["Automatic Writing", "Journalist", "Wordsmith"], 
        resourceRange: [2, 5], 
        startingEquipment: ["Writing utensils and paper", "Camera or opera glasses", "Pet dog or book collection"],
        motivations: ["Finding a certain vaesen", "Researching a book", "Revenge"],
        traumas: ["Angered fairies who put you to sleep and sucked your blood", "Cursed by a homeless vaettir to write a book in your own blood", "Heard the song of the Neck, but failed to write down the lyrics"],
        darkSecrets: ["I record and use the secrets and weaknesses of my friends", "Wanted for revolutionary ideas", "My life’s work is a lie"],
        relationshipHooks: [
            "You inspire me",
            "Tries to win your appreciation",
            "You frighten me"
        ],
        description: "Observes and chronicles the world, often drawn to unusual stories and the depths of human (and inhuman) nature."
    },
    {
        name: "Custom Life Path", mainAttribute: "", mainSkill: "",
        talentChoices: [], 
        resourceRange: [1, 8], 
        startingEquipment: [],
        motivations: ["Unique goals defined by player"],
        traumas: ["Player-defined trauma"],
        darkSecrets: ["Player-defined dark secret"],
        relationshipHooks: GENERIC_RELATIONSHIP_HOOKS, 
        description: "A character following a unique path, defined by the player using the Life Path tables in Chapter 11 of the Core Rulebook."
    }
];

const MEMENTOS_LIST: MementoDefinition[] = [
    { d66: "11", item: "Dried red rose" }, { d66: "12", item: "Photo of someone close to you" },
    { d66: "13", item: "Seal ring with a secret chamber" }, { d66: "14", item: "Your father’s cane" },
    { d66: "15", item: "Hat with a secret compartment" }, { d66: "16", item: "Book in a foreign language" },
    { d66: "21", item: "Hip flask with inscription" }, { d66: "22", item: "Old love letter" },
    { d66: "23", item: "A scruffy cat" }, { d66: "24", item: "A monkey’s skull" },
    { d66: "25", item: "Bloodstained promissory note" }, { d66: "26", item: "Gold jewelry worn by your mother" },
    { d66: "31", item: "Silver cross on a chain" }, { d66: "32", item: "Beautiful fiddle passed down in the family" },
    { d66: "33", item: "Journal (yours or someone else’s)" }, { d66: "34", item: "Newspaper from a date that means something to you" },
    { d66: "35", item: "Ragged doll" }, { d66: "36", item: "Tame pigeon" },
    { d66: "41", item: "Well-thumbed novel with dedication" }, { d66: "42", item: "Plans for a family tomb" },
    { d66: "43", item: "Map with notes in the margin" }, { d66: "44", item: "Strange animal preserved in a glass jar" },
    { d66: "45", item: "Music box from your childhood" }, { d66: "46", item: "Sunstone (cut mineral)" },
    { d66: "51", item: "Small bottle of perfume that reminds you of someone" }, { d66: "52", item: "Hymnbook passed down in the family" },
    { d66: "53", item: "Pocket watch with a photo inside" }, { d66: "54", item: "An unsigned will" },
    { d66: "55", item: "Golden box from a foreign land" }, { d66: "56", item: "Sheet music from a forgotten master" },
    { d66: "61", item: "Powder compact with sleeping pills" }, { d66: "62", item: "Beautifully ornamented pipe" },
    { d66: "63", item: "Rabbit’s foot or some other lucky charm" }, { d66: "64", item: "Syringe with needle in a box" },
    { d66: "65", item: "Worn dice made of bone" }, { d66: "66", item: "A manuscript passed down in the family" },
];

const CONDITIONS_LIST: ConditionDefinition[] = [
    { id: "exhausted", name: "Exhausted", type: "Physical", description: "-1 to Physique/Precision skills" },
    { id: "battered", name: "Battered", type: "Physical", description: "-1 to Physique/Precision skills" },
    { id: "wounded", name: "Wounded", type: "Physical", description: "-1 to Physique/Precision skills" },
    { id: "angry", name: "Angry", type: "Mental", description: "-1 to Logic/Empathy skills" },
    { id: "frightened", name: "Frightened", type: "Mental", description: "-1 to Logic/Empathy skills" },
    { id: "hopeless", name: "Hopeless", type: "Mental", description: "-1 to Logic/Empathy skills" },
];

const RESOURCE_LEVELS: ResourceLevel[] = [
    { value: 1, standardOfLiving: "Destitute", description: "Completely dependent on others. Struggle for food, few belongings. May have diseases, starve, or turn to drugs/alcohol." },
    { value: 2, standardOfLiving: "Poor", description: "Live very simply. Food is scarce. Children in squalor. Maybe a change of clothes. Loss of income is disastrous." },
    { value: 3, standardOfLiving: "Struggling", description: "Humble home, fixed income. No savings. Can dress family for special occasions, children have some access to education for a few years." },
    { value: 4, standardOfLiving: "Financially Stable", description: "Own home, steady job/income. Some money stashed. Occasional treats. People to lend money in crisis." },
    { value: 5, standardOfLiving: "Middle-Class", description: "Own home and business. Maybe employees. Know how to invest. Savings and loans. Family lives well." },
    { value: 6, standardOfLiving: "Well-Off", description: "Big house/apartment. Multiple income sources, several employees. Money is a game. Fine company, little contact with poor. Family vacations, latest innovations." },
    { value: 7, standardOfLiving: "Wealthy", description: "Large inherited money/real estate. Multiple properties, servants, income sources. Few things unaffordable. Well-connected with elite. Only see poor through carriage window." },
    { value: 8, standardOfLiving: "Filthy Rich", description: "Richest in country, direct contact with rulers. Owns castles/mansions. No expense too great. Lavish extravagance without worry." }
];

const RESOURCE_MODIFIERS: ResourceModifier[] = [
    { level: 1, bonus: -1, capital: "—" },
    { level: 2, bonus: 0,  capital: "—" },
    { level: 3, bonus: 0,  capital: "1 kr" },
    { level: 4, bonus: 1,  capital: "2 kr" },
    { level: 5, bonus: 1,  capital: "3 kr" },
    { level: 6, bonus: 2,  capital: "5 kr" },
    { level: 7, bonus: 3,  capital: "8 kr" },
    { level: 8, bonus: 5,  capital: "12 kr" }
];


const ALL_TALENTS_LIST: TalentDefinition[] = [
    { id: "bookworm", name: "Bookworm", description: "Gain +2 to LEARNING when looking for clues in books or libraries.", archetype: "Academic" },
    { id: "erudite", name: "Erudite", description: "Pass a LEARNING test to establish truths about places/phenomena.", archetype: "Academic" },
    { id: "knowledgeIsReassuring", name: "Knowledge is Reassuring", description: "Ignore Conditions when making LEARNING tests.", archetype: "Academic" },
    { id: "armyMedic", name: "Army Medic", description: "Gain +2 to Fear tests when frightened by dead/damaged human bodies.", archetype: "Doctor" },
    { id: "chiefPhysician", name: "Chief Physician", description: "When using MEDICINE to treat others, they heal 4 Conditions instead of 3 (applies to extra successes too).", archetype: "Doctor" },
    { id: "emergencyMedicine", name: "Emergency Medicine", description: "Ignore mental Conditions when using MEDICINE.", archetype: "Doctor" },
    { id: "bloodhound", name: "Bloodhound", description: "Gain +2 to VIGILANCE when tracking your prey.", archetype: "Hunter" },
    { id: "herbalist", name: "Herbalist", description: "Can use MEDICINE without medical supplies by using wild herbs.", archetype: "Hunter" },
    { id: "marksman", name: "Marksman", description: "Gain +2 to RANGED COMBAT on your first round when successfully ambushing/attacking.", archetype: "Hunter" },
    { id: "magicTricks", name: "Magic tricks", description: "Use STEALTH instead of MANIPULATION for conjuring tricks to influence people.", archetype: "Occultist" },
    { id: "medium", name: "Medium", description: "Use OBSERVATION for seances (predict futures, contact dead). Extra successes = more info/contact/materialization. Failure = inaccurate info/attacked/Condition.", archetype: "Occultist" },
    { id: "strikingFear", name: "Striking Fear", description: "Strike fear (Fear 1, slow action, not vs vaesen). Target in zone makes Logic/Empathy test (bonus dice = friendly individuals in zone).", archetype: "Occultist" },
    { id: "battleHardened", name: "Battle-hardened", description: "When drawing initiative, draw two cards and pick one.", archetype: "Officer" },
    { id: "gentleman", name: "Gentleman", description: "Ignore penalties from mental Conditions when making MANIPULATION tests.", archetype: "Officer" },
    { id: "tactician", name: "Tactician", description: "On successful RANGED COMBAT test with extra successes, can issue an order to a friend (costs 1 success). Friend gains +2 to next test if they follow.", archetype: "Officer" },
    { id: "absolution", name: "Absolution", description: "A PC confessing to you (activity) heals 3 Conditions instead of 2.", archetype: "Priest" },
    { id: "blessing", name: "Blessing", description: "Once per session, bless an object or PC. Target gains Blessed Advantage (+2 to a test). Expires on use or end of mystery.", archetype: "Priest" },
    { id: "confessor", name: "Confessor", description: "Use OBSERVATION instead of MANIPULATION for confidential conversations.", archetype: "Priest" },
    { id: "eagleEye", name: "Eagle Eye", description: "Gain +2 to VIGILANCE when interpreting a situation you're not involved in.", archetype: "Private Detective" },
    { id: "elementary", name: "Elementary", description: "Once per session, ask GM to explain how clues are connected.", archetype: "Private Detective" },
    { id: "focused", name: "Focused", description: "Ignore penalties from Conditions when making INVESTIGATION tests.", archetype: "Private Detective" },
    { id: "loyal", name: "Loyal", description: "Gain +2 on Fear tests in the presence of someone you've sworn to protect.", archetype: "Servant" },
    { id: "robust", name: "Robust", description: "May ignore penalties for physical Conditions on one roll per gaming session.", archetype: "Servant" },
    { id: "toughAsNails", name: "Tough as Nails", description: "Gain +2 to FORCE when fighting unarmed.", archetype: "Servant" },
    { id: "hoboTricks", name: "Hobo Tricks", description: "Gain +2 to STEALTH when hiding yourself/object from a wealthy human.", archetype: "Vagabond" },
    { id: "suspicious", name: "Suspicious", description: "Ignore mental Conditions when making VIGILANCE tests.", archetype: "Vagabond" },
    { id: "wellTraveled", name: "Well-traveled", description: "Once per mystery, MANIPULATION test to create an NPC in the area you've met. GM decides how they changed. Fail = hostile/needs help.", archetype: "Vagabond" },
    { id: "automaticWriting", name: "Automatic Writing", description: "Use INSPIRATION to gain clues via automatic writing. GM gives vague clues/predictions/insights. Extra successes = more clues. Fail = Condition/possessed/personality change (1D6h). Once per session.", archetype: "Writer" },
    { id: "journalist", name: "Journalist", description: "Use INSPIRATION instead of MANIPULATION when charming/deceiving for information.", archetype: "Writer" },
    { id: "wordsmith", name: "Wordsmith", description: "Ignore penalties from Conditions when making INSPIRATION tests.", archetype: "Writer" },
    { id: "battleExperience", name: "Battle Experience", description: "Gain +2 to MEDICINE when treating a physical critical injury." },
    { id: "brave", name: "Brave", description: "Gain +1 to all Fear tests." },
    { id: "combatTrained", name: "Combat-Trained", description: "Gain +2 to CLOSE COMBAT and FORCE when parrying." },
    { id: "contacts", name: "Contacts", description: "Once per session, decide you know an NPC and relationship is positive. (GM may disallow if it makes mystery less fun)." },
    { id: "coward", name: "Coward", description: "When wounded in combat, pass STEALTH test (not an action) to make another PC take damage instead. Fail = +1 extra damage. Once per combat." },
    { id: "deceptive", name: "Deceptive", description: "Gain +2 to MANIPULATION when cheating and deceiving." },
    { id: "dedicated", name: "Dedicated", description: "Once per session, ignore mental Conditions from a skill test." },
    { id: "defensive", name: "Defensive", description: "Each round, get one extra action (dodge or parry only)." },
    { id: "dualWeapons", name: "Dual Weapons", description: "With dual weapons (close combat), extra successes can hit additional enemy in zone. If more successes to increase damage, choose which attack deals more." },
    { id: "dynamiter", name: "Dynamiter", description: "Gain +2 to RANGED COMBAT when using explosives." },
    { id: "empathetic", name: "Empathetic", description: "Ignore penalties from Conditions when making OBSERVATION tests." },
    { id: "escapeArtist", name: "Escape Artist", description: "Ignore penalties from Conditions when using AGILITY to flee." },
    { id: "famous", name: "Famous", description: "Gain +2 to MANIPULATION when trying to influence someone who has heard of you." },
    { id: "fleetFooted", name: "Fleet-Footed", description: "During combat, may move within own zone without using an action." },
    { id: "holySymbol", name: "Holy Symbol", description: "Religious item lets you use INSPIRATION to attack vaesen in close combat, dealing 1 damage." },
    { id: "lightningReflexes", name: "Lightning Reflexes", description: "Can draw weapons without using an action." },
    { id: "nineLives", name: "Nine Lives", description: "When rolling for critical injury, may decide which die is tens and which is ones." },
    { id: "pet", name: "Pet", description: "Have a pet. Once per session, gain +1 to a test of choice where pet is clearly of use." },
    { id: "pugilist", name: "Pugilist", description: "Deal 1 extra damage when fighting unarmed." },
    { id: "safetyInNumbers", name: "Safety in Numbers", description: "Gain +2 to Fear tests when with at least two other PCs. (In combat, only if in same zone)." },
    { id: "sixthSense", name: "Sixth Sense", description: "When making INVESTIGATION tests, spend extra successes to learn if vaesen was in area, vague impressions of kind, or if magic used." },
    { id: "sprinter", name: "Sprinter", description: "Gain +2 to AGILITY when trying to outrun or chase down someone." },
    { id: "theLordsShepherd", name: "The Lord's Shepherd", description: "Gain +2 when using INSPIRATION to treat a mental critical injury." },
    { id: "wealthy", name: "Wealthy", description: "Increase Resources by 1 (can be purchased multiple times)." },
];

const ARMOR_DEFINITIONS: ArmorDefinition[] = [
    { id: "light_armor", name: "Leather Cuirass", type: "Light", protection: 2, agilityPenalty: -1, availability: 2 },
    { id: "medium_armor", name: "Chain Mail Shirt", type: "Medium", protection: 4, agilityPenalty: -2, availability: 3 },
    { id: "heavy_armor", name: "Plate Mail Armor", type: "Heavy", protection: 6, agilityPenalty: -3, availability: 4 },
];

const WEAPON_DEFINITIONS: WeaponDefinition[] = [
    { id: "kick_punch", name: "Kick or punch", damage: "1", range: "0", bonus: "±0", skill: "Force", availability: 0, type: 'Melee' },
    { id: "knuckle_duster", name: "Knuckle duster", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 2, type: 'Melee' },
    { id: "chair", name: "Chair", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 1, type: 'Melee' },
    { id: "sledgehammer", name: "Sledgehammer", damage: "2", range: "0", bonus: "±0", skill: "Close Combat", availability: 2, type: 'Melee' },
    { id: "flail", name: "Flail", damage: "2", range: "0", bonus: "+2", skill: "Close Combat", availability: 4, type: 'Melee' },
    { id: "rifle_butt", name: "Rifle butt", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 0, type: 'Melee' },
    { id: "knife_dagger", name: "Knife or dagger", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 1, type: 'Melee' },
    { id: "rapier", name: "Rapier", damage: "1", range: "0", bonus: "+2", skill: "Close Combat", availability: 3, type: 'Melee' },
    { id: "sword_saber", name: "Sword or saber", damage: "2", range: "0", bonus: "+2", skill: "Close Combat", availability: 4, type: 'Melee' },
    { id: "crowbar_weapon", name: "Crowbar (as weapon)", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 2, type: 'Melee' }, 
    { id: "axe", name: "Axe", damage: "2", range: "0", bonus: "+1", skill: "Close Combat", availability: 1, type: 'Melee' },
    { id: "quarterstaff", name: "Quarterstaff", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 1, type: 'Melee' },
    { id: "halberd", name: "Halberd", damage: "3", range: "0", bonus: "+1", skill: "Close Combat", availability: 4, type: 'Melee' },
    { id: "bayonet", name: "Bayonet", damage: "2", range: "0", bonus: "+1", skill: "Close Combat", availability: 3, type: 'Melee' },
    { id: "whip", name: "Whip", damage: "1", range: "0", bonus: "+1", skill: "Close Combat", availability: 1, type: 'Melee' },
    { id: "spear", name: "Spear", damage: "1", range: "0–1", bonus: "+1", skill: "Close Combat/Ranged Combat", availability: 1, type: 'Ranged' },
    { id: "bow", name: "Bow", damage: "1", range: "0–2", bonus: "+1", skill: "Ranged Combat", availability: 1, type: 'Ranged' },
    { id: "longbow", name: "Longbow", damage: "2", range: "1–3", bonus: "+1", skill: "Ranged Combat", availability: 2, type: 'Ranged' },
    { id: "crossbow", name: "Crossbow", damage: "2", range: "0–1", bonus: "+1", skill: "Ranged Combat", availability: 3, type: 'Ranged' },
    { id: "pistol_revolver", name: "Pistol or revolver", damage: "2", range: "0–1", bonus: "+2", skill: "Ranged Combat", availability: 4, type: 'Ranged' },
    { id: "musket", name: "Musket", damage: "2", range: "1–2", bonus: "+1", skill: "Ranged Combat", availability: 3, type: 'Ranged' },
    { id: "rifle", name: "Rifle", damage: "2", range: "1–3", bonus: "+2", skill: "Ranged Combat", availability: 4, type: 'Ranged' },
    { id: "cannon", name: "Cannon", damage: "5", range: "2–5", bonus: "+1", skill: "Ranged Combat", availability: 5, type: 'Ranged' },
];

const GENERAL_EQUIPMENT_DEFINITIONS: GeneralEquipmentDefinition[] = [
    { id: "crowbar", name: "Crowbar", bonus: "+1", availability: 2, effect: "Break locks with FORCE" },
    { id: "lockpicks", name: "Lockpicks", bonus: "+1", availability: 2, effect: "Pick locks with STEALTH" },
    { id: "opera_glasses", name: "Opera glasses", bonus: "+1", availability: 1, effect: "Use VIGILANCE from a distance" },
    { id: "binoculars", name: "Binoculars", bonus: "+2", availability: 2, effect: "Use VIGILANCE from a distance" },
    { id: "hunting_trap", name: "Hunting trap", bonus: "+1", availability: 1, effect: "Detect sneaking people with VIGILANCE" },
    { id: "hunting_equipment", name: "Hunting equipment", bonus: "+2", availability: 2, effect: "Use INVESTIGATION in the wilderness" },
    { id: "tinderbox", name: "Tinderbox", bonus: "+1", availability: 1, effect: "Use INVESTIGATION in dim places" },
    { id: "hurricane_lamp", name: "Hurricane lamp", bonus: "+2", availability: 1, effect: "Use INVESTIGATION in darkness and detect sneaking people with VIGILANCE" },
    { id: "compass", name: "Compass", bonus: "+1", availability: 2, effect: "Use LEARNING to find the way" },
    { id: "magnifying_glass", name: "Magnifying glass", bonus: "+1", availability: 2, effect: "Use to find clues during INVESTIGATION" },
    { id: "camera", name: "Camera", bonus: "+2", availability: 3, effect: "Use to gain knowledge about a place with LEARNING or INVESTIGATION" },
    { id: "writing_utensils_paper", name: "Writing utensils and paper", bonus: "+1", availability: 1, effect: "Use to take notes during INVESTIGATION" },
    { id: "slide_rule", name: "Slide rule", bonus: "+1", availability: 2, effect: "Use to make calculations with LEARNING" },
    { id: "simple_bandages", name: "Simple bandages", bonus: "+1", availability: 1, effect: "Required for MEDICINE" },
    { id: "medical_equipment", name: "Medical equipment", bonus: "+2", availability: 2, effect: "Required for MEDICINE" },
    { id: "musical_instrument", name: "Musical instrument", bonus: "+1", availability: 2, effect: "Influence listeners with INSPIRATION" },
    { id: "mastercrafted_musical_instrument", name: "Mastercrafted musical Instrument", bonus: "+2", availability: 3, effect: "Influence listeners with INSPIRATION" },
    { id: "cooking_pot", name: "Cooking pot", bonus: "+1", availability: 1, effect: "Cook with INSPIRATION" },
    { id: "field_kitchen", name: "Field kitchen", bonus: "+2", availability: 2, effect: "Cook with INSPIRATION" },
    { id: "simple_provisions", name: "Simple provisions", bonus: "—", availability: 1, effect: "Last several days without FORCE tests" },
    { id: "nutritious_provisions", name: "Nutritious provisions", bonus: "—", availability: 2, effect: "Last many days without FORCE tests" },
    { id: "liquor", name: "Liquor", bonus: "+1", availability: 1, effect: "INSPIRE with alcohol" },
    { id: "fine_wines", name: "Fine wines", bonus: "+1", availability: 2, effect: "INSPIRE and MANIPULATE with alcohol" },
    { id: "chemical_equipment", name: "Chemical equipment", bonus: "+1", availability: 2, effect: "Determine cause of death with INVESTIGATION" },
    { id: "portable_laboratory", name: "Portable laboratory", bonus: "+1", availability: 3, effect: "Produce poison with LEARNING" },
    { id: "book_collection", name: "Book collection", bonus: "+1", availability: 2, effect: "Use to find information for LEARNING" },
    { id: "old_scrolls", name: "Old scrolls", bonus: "+2", availability: 3, effect: "Use to find information for LEARNING" },
    { id: "crystal_ball", name: "Crystal ball", bonus: "+1", availability: 3, effect: "Use OBSERVATION to search for clues" },
    { id: "map_book", name: "Map book", bonus: "+1", availability: 2, effect: "Use for INVESTIGATION and LEARNING when navigating" },
    { id: "weak_horse", name: "Weak horse", bonus: "+1", availability: 2, effect: "Use for FORCE" },
    { id: "strong_horse", name: "Strong horse", bonus: "+2", availability: 3, effect: "Use in CLOSE COMBAT and for FORCE" },
    { id: "pet_dog", name: "Pet dog", bonus: "+1", availability: 1, effect: "Use for CLOSE COMBAT" },
    { id: "guard_dog", name: "Guard dog", bonus: "+2", availability: 2, effect: "Use for VIGILANCE and CLOSE COMBAT" },
    { id: "hunting_dog", name: "Hunting dog", bonus: "+3", availability: 3, effect: "Use for VIGILANCE, CLOSE COMBAT and INVESTIGATION" },
    { id: "make_up", name: "Make-up", bonus: "+1", availability: 1, effect: "Sometimes required for MANIPULATION" },
    { id: "disguise", name: "Disguise", bonus: "+2", availability: 2, effect: "Sometimes required for MANIPULATION" },
    { id: "elegant_disguise", name: "Elegant disguise", bonus: "+2", availability: 3, effect: "Sometimes required for MANIPULATION and can be used to sneak with MANIPULATION" },
    { id: "rope", name: "Rope", bonus: "+1", availability: 1, effect: "Use FORCE to climb" },
    { id: "rope_ladder", name: "Rope ladder", bonus: "+3", availability: 2, effect: "Use FORCE or AGILITY to climb" },
    { id: "weak_poison_3", name: "Weak poison (3 doses)", bonus: "—", availability: 1, effect: "Required to poison someone (toxicity 3)" },
    { id: "strong_poison_2", name: "Strong poison (2 doses)", bonus: "—", availability: 2, effect: "Required to poison someone (toxicity 6)" },
    { id: "extreme_poison_1", name: "Extremely strong poison (1 dose)", bonus: "—", availability: 3, effect: "Required to poison someone (toxicity 9)" },
];

const PHYSICAL_CRITICAL_INJURIES: CriticalInjuryDefinition[] = [
    // From p.69 OCR
    { id: "phys_11", d66: "11", injury: "Foot injury", status: "Defect", effect: "Limp, AGILITY −1", table: "Physical" },
    { id: "phys_12", d66: "12", injury: "Broken fingers", status: "Defect", effect: "Crooked fingers, CLOSE COMBAT −1", table: "Physical" },
    { id: "phys_13", d66: "13", injury: "Ruptured tendon", status: "Defect", effect: "Reduced mobility, AGILITY −1", table: "Physical" },
    { id: "phys_14", d66: "14", injury: "Knee injury", status: "Defect", effect: "Skewed walk, AGILITY −1", table: "Physical" },
    { id: "phys_15", d66: "15", injury: "Fracture", status: "Defect", effect: "False joint, FORCE −1", table: "Physical" },
    { id: "phys_16", d66: "16", injury: "Splinters in the body", status: "Defect", effect: "Ulcer, INSPIRATION −1", table: "Physical" },
    { id: "phys_21", d66: "21", injury: "Skin lesion", status: "Defect", effect: "Disfigured, MANIPULATION −1", table: "Physical" },
    { id: "phys_22", d66: "22", injury: "Damaged throat", status: "Defect", effect: "Wheezing, STEALTH −1", table: "Physical" },
    { id: "phys_23", d66: "23", injury: "Eye injury", status: "Defect", effect: "Impaired eyesight, VIGILANCE −1", table: "Physical" },
    { id: "phys_24", d66: "24", injury: "Injured arm", status: "Defect", effect: "Crooked arm, RANGED COMBAT −1", table: "Physical" },
    { id: "phys_25", d66: "25", injury: "Facial injury", status: "Defect", effect: "Deformed face, MANIPULATION −1", table: "Physical" },
    { id: "phys_26", d66: "26", injury: "Crush injury", status: "Defect", effect: "Tremor, RANGED COMBAT −1", table: "Physical" },
    { id: "phys_31", d66: "31", injury: "Dislodged teeth", status: "Defect", effect: "Toothless, INSPIRATION −1", table: "Physical" },
    { id: "phys_32", d66: "32", injury: "Ear injury", status: "Defect", effect: "Impaired balance, CLOSE COMBAT −1", table: "Physical" },
    { id: "phys_33", d66: "33", injury: "Jaw injury", status: "Defect", effect: "Drooling, INSPIRATION −1", table: "Physical" },
    { id: "phys_34", d66: "34", injury: "Back injury", status: "Defect", effect: "Hunchback, AGILITY −1", table: "Physical" },
    { id: "phys_35", d66: "35", injury: "Severed fingers", status: "Defect", effect: "Finger stumps, RANGED COMBAT −1", table: "Physical" },
    { id: "phys_36", d66: "36", injury: "Nerve damage", status: "Defect", effect: "Pain, FORCE −1", table: "Physical" },
    { id: "phys_41", d66: "41", injury: "Torn ear", status: "Defect", effect: "Impaired hearing, VIGILANCE −1", table: "Physical" },
    { id: "phys_42", d66: "42", injury: "Abdominal injury", status: "Fatal", timeLimit: "1D6 days", effect: "Stiff body, CLOSE COMBAT −1", table: "Physical" },
    { id: "phys_43", d66: "43", injury: "Dirty wound", status: "Fatal", timeLimit: "1D6 days", effect: "Sepsis, FORCE −1", table: "Physical" },
    { id: "phys_44", d66: "44", injury: "Bleeding wound", status: "Fatal", timeLimit: "1D6 days", effect: "Gangrene, AGILITY −1", table: "Physical" },
    { id: "phys_45", d66: "45", injury: "Crushed genitals", status: "Fatal", timeLimit: "1D6 days", effect: "Incontinence, AGILITY −1", table: "Physical" },
    { id: "phys_46", d66: "46", injury: "Punctured eye", status: "Fatal", timeLimit: "1D6 hours", effect: "One-eyed, VIGILANCE −1", table: "Physical" },
    { id: "phys_51", d66: "51", injury: "Ruptured bowel", status: "Fatal", timeLimit: "1D6 hours", effect: "Wears a colostomy bag, AGILITY −1", table: "Physical" },
    { id: "phys_52", d66: "52", injury: "Deep arm gash", status: "Fatal", timeLimit: "1D6 hours", effect: "One-armed, FORCE −1 (cannot use two-handed weapons)", table: "Physical" },
    { id: "phys_53", d66: "53", injury: "Burst artery", status: "Fatal", timeLimit: "1D6 rounds", effect: "Phobia of blood, Fear −2", table: "Physical" },
    { id: "phys_54", d66: "54", injury: "Internal bleeding", status: "Fatal", timeLimit: "1D6 rounds", effect: "Anemia, FORCE −2", table: "Physical" },
    { id: "phys_55", d66: "55", injury: "Caved-in forehead", status: "Fatal", timeLimit: "1D6 rounds", effect: "Altered personality, OBSERVATION −2", table: "Physical" },
    { id: "phys_56", d66: "56", injury: "Cracked skull", status: "Fatal", timeLimit: "1D6 rounds", effect: "Brain damage, LEARNING −2", table: "Physical" },
    { id: "phys_61", d66: "61", injury: "Coma", status: "Insight", timeLimit: "1D6 days", effect: "Prophetic vision, INVESTIGATION +3", table: "Physical" },
    { id: "phys_62", d66: "62", injury: "Spinal injury", status: "Insight", timeLimit: "1D6 hours", effect: "Living dead, STEALTH +3", table: "Physical" },
    { id: "phys_63", d66: "63", injury: "Torn abdomen", status: "Insight", timeLimit: "1D6 hours", effect: "Supernatural focus, RANGED COMBAT +3", table: "Physical" },
    { id: "phys_64", d66: "64", injury: "Torn body", status: "Insight", timeLimit: "1D6 minutes", effect: "Champion, CLOSE COMBAT +3", table: "Physical" },
    { id: "phys_65", d66: "65", injury: "Punctured lungs", status: "Insight", timeLimit: "1D6 rounds", effect: "Guardian angel, AGILITY +4", table: "Physical" },
    { id: "phys_66", d66: "66", injury: "Crushed chest", status: "Insight", timeLimit: "1D6 rounds", effect: "Supernatural strength, FORCE +4", table: "Physical" },
];

const MENTAL_CRITICAL_INJURIES: CriticalInjuryDefinition[] = [
    // From p.70 OCR
    { id: "ment_11", d66: "11", injury: "Confused", status: "Defect", effect: "Dazed, INVESTIGATION −1", table: "Mental" },
    { id: "ment_12", d66: "12", injury: "Overwhelmed", status: "Defect", effect: "Sensitive to stress, STEALTH −1", table: "Mental" },
    { id: "ment_13", d66: "13", injury: "Pushed too far", status: "Defect", effect: "Fanatic, MANIPULATION −1", table: "Mental" },
    { id: "ment_14", d66: "14", injury: "Incapacitated", status: "Defect", effect: "Clumsy, AGILITY −1", table: "Mental" },
    { id: "ment_15", d66: "15", injury: "Exhausted", status: "Defect", effect: "Claustrophobic, STEALTH −1", table: "Mental" },
    { id: "ment_16", d66: "16", injury: "Panic attack", status: "Defect", effect: "Skittish, Fear −1", table: "Mental" },
    { id: "ment_21", d66: "21", injury: "Sees her true self", status: "Defect", effect: "Compulsive liar, INSPIRATION −1", table: "Mental" },
    { id: "ment_22", d66: "22", injury: "Frozen facial muscles", status: "Defect", effect: "Mask of terror, MANIPULATION −1", table: "Mental" },
    { id: "ment_23", d66: "23", injury: "Whitened hair", status: "Defect", effect: "Aged, OBSERVATION −1", table: "Mental" },
    { id: "ment_24", d66: "24", injury: "Feelings of worthlessness", status: "Defect", effect: "Shattered confidence, INSPIRATION −1", table: "Mental" },
    { id: "ment_25", d66: "25", injury: "Paralyzed", status: "Defect", effect: "Lacks initiative, INVESTIGATION −1", table: "Mental" },
    { id: "ment_26", d66: "26", injury: "Trembling", status: "Defect", effect: "Tremor, RANGED COMBAT −1", table: "Mental" },
    { id: "ment_31", d66: "31", injury: "Confronted with mortality", status: "Defect", effect: "Fear of death, CLOSE COMBAT −1", table: "Mental" },
    { id: "ment_32", d66: "32", injury: "Fighting and screaming", status: "Defect", effect: "Impaired impulse control, STEALTH −1", table: "Mental" },
    { id: "ment_33", d66: "33", injury: "Divided attention", status: "Defect", effect: "Hears voices, LEARNING −1", table: "Mental" },
    { id: "ment_34", d66: "34", injury: "Disgusted", status: "Defect", effect: "Hates filth, MEDICINE −1", table: "Mental" },
    { id: "ment_35", d66: "35", injury: "Shaken", status: "Defect", effect: "Sentimental, MANIPULATION −1", table: "Mental" },
    { id: "ment_36", d66: "36", injury: "Stressed", status: "Defect", effect: "Weakened immune system, FORCE −1", table: "Mental" },
    { id: "ment_41", d66: "41", injury: "Extreme muscle tension", status: "Defect", effect: "High-strung, AGILITY −1", table: "Mental" },
    { id: "ment_42", d66: "42", injury: "Traumatized", status: "Chronic", timeLimit: "1D6 days", effect: "PTSD, Fear −1", table: "Mental" },
    { id: "ment_43", d66: "43", injury: "Furious", status: "Chronic", timeLimit: "1D6 days", effect: "Capricious, MANIPULATION −1", table: "Mental" },
    { id: "ment_44", d66: "44", injury: "Abandoned", status: "Chronic", timeLimit: "1D6 days", effect: "Lack of trust, MANIPULATION −1", table: "Mental" },
    { id: "ment_45", d66: "45", injury: "Overwhelmed by vulnerability", status: "Chronic", timeLimit: "1D6 days", effect: "Paranoid, VIGILANCE −1", table: "Mental" },
    { id: "ment_46", d66: "46", injury: "Crushed", status: "Chronic", timeLimit: "1D6 hours", effect: "Impaired empathy, INSPIRATION −1", table: "Mental" },
    { id: "ment_51", d66: "51", injury: "Ashamed", status: "Chronic", timeLimit: "1D6 hours", effect: "Self-loathing, MANIPULATION −1", table: "Mental" },
    { id: "ment_52", d66: "52", injury: "Detached", status: "Chronic", timeLimit: "1D6 hours", effect: "Egocentric, MEDICINE −1", table: "Mental" },
    { id: "ment_53", d66: "53", injury: "Out-of-body experience", status: "Chronic", timeLimit: "1D6 rounds", effect: "Dissociating, RANGED COMBAT −2", table: "Mental" },
    { id: "ment_54", d66: "54", injury: "Dream state", status: "Chronic", timeLimit: "1D6 rounds", effect: "Nightmares, Fear −2", table: "Mental" },
    { id: "ment_55", d66: "55", injury: "Return to childhood", status: "Chronic", timeLimit: "1D6 rounds", effect: "Regressing, LEARNING −2", table: "Mental" },
    { id: "ment_56", d66: "56", injury: "Horrifying realization", status: "Chronic", timeLimit: "1D6 rounds", effect: "Mortified, MEDICINE −2", table: "Mental" },
    { id: "ment_61", d66: "61", injury: "Hypersensitive", status: "Insight", timeLimit: "1D6 days", effect: "Healer, MEDICINE +3", table: "Mental" },
    { id: "ment_62", d66: "62", injury: "Possessed", status: "Insight", timeLimit: "1D6 minutes", effect: "Haunted, LEARNING +3", table: "Mental" },
    { id: "ment_63", d66: "63", injury: "Obsessed with detail", status: "Insight", timeLimit: "1D6 minutes", effect: "All-seeing, INVESTIGATION +3", table: "Mental" },
    { id: "ment_64", d66: "64", injury: "Supernatural experience", status: "Insight", timeLimit: "1D6 minutes", effect: "Divine messenger, INSPIRATION +3", table: "Mental" },
    { id: "ment_65", d66: "65", injury: "Invaded by other people’s emotions", status: "Insight", timeLimit: "1D6 rounds", effect: "Absolute empathy, OBSERVATION +4", table: "Mental" },
    { id: "ment_66", d66: "66", injury: "Split consciousness", status: "Insight", timeLimit: "1D6 rounds", effect: "Enlightened, LEARNING +4", table: "Mental" },
];

const ALL_CRITICAL_TABLE_ITEMS = [...PHYSICAL_CRITICAL_INJURIES, ...MENTAL_CRITICAL_INJURIES];

const XP_QUESTIONS: string[] = [
    "Did you participate in the session?",
    "Did you learn something new and important about the vaesen?",
    "Did you learn something new and important about yourself or another player character?",
    "Did you overcome a difficult obstacle or a dangerous enemy?",
    "Did you risk something important for another person or for the group?",
    "Did you use your Trauma, Dark Secret, or Memento in a way that affected the story?",
    "Did you visit a new and exciting place?",
    "(GM) Did you do something else that significantly drove the story forward or contributed to the fun of the group?"
];

interface ActionListItem { name: string; skill: string; }

const SLOW_ACTIONS_LIST: ActionListItem[] = [
    { name: "Attack with melee weapon", skill: "Close Combat" },
    { name: "Attack with ranged weapon", skill: "Ranged Combat" },
    { name: "Unarmed attack", skill: "Force" },
    { name: "Wrestle, push, grapple", skill: "Force" },
    { name: "Flee", skill: "Agility" },
    { name: "Persuade", skill: "Manipulation" },
    { name: "Lure enemy to a certain place", skill: "Agility" },
    { name: "Perform ritual (often takes several rounds)", skill: "—" },
    { name: "Survey the situation", skill: "Vigilance" },
    { name: "Treat injuries", skill: "Medicine" },
    { name: "Climb a wall", skill: "Agility" }
];

const FAST_ACTIONS_LIST: ActionListItem[] = [
    { name: "Draw weapon/Swap weapon", skill: "—" },
    { name: "Stand up", skill: "—" },
    { name: "Dodge (reaction)", skill: "Agility" },
    { name: "Parry (reaction)", skill: "Close Combat/Force" },
    { name: "Break free (reaction)", skill: "Force" },
    { name: "Hold (reaction)", skill: "Force" },
    { name: "Chase (reaction)", skill: "Agility" },
    { name: "Resist magic (reaction)", skill: "Depends on the magic" },
    { name: "Shout more than a few words", skill: "—" },
    { name: "Turn around", skill: "—" },
    { name: "Close a door", skill: "—" },
    { name: "Put out a candle", skill: "—" },
    { name: "Move within the zone", skill: "—" },
    { name: "Move into the next zone", skill: "—" },
    { name: "Take cover", skill: "—" }
];


// --- ID GENERATION & MANAGEMENT ---
let noteIdCounter = 0;
let relationshipIdCounter = 0;
let weaponInstanceIdCounter = 0;
let equipmentInstanceIdCounter = 0;
let insightDefectIdCounter = 0;

function getNextIdForType(type: 'Note' | 'Relationship' | 'WeaponInst' | 'EquipmentInst' | 'InsightDefectInst'): string {
    switch (type) {
        case 'Note': noteIdCounter++; return `Note_${noteIdCounter}`;
        case 'Relationship': relationshipIdCounter++; return `Rel_${relationshipIdCounter}`;
        case 'WeaponInst': weaponInstanceIdCounter++; return `WeaponInst_${weaponInstanceIdCounter}`;
        case 'EquipmentInst': equipmentInstanceIdCounter++; return `EquipInst_${equipmentInstanceIdCounter}`;
        case 'InsightDefectInst': insightDefectIdCounter++; return `IDInst_${insightDefectIdCounter}`;
        default: console.error("Unknown ID type:", type); return `Unknown_${Date.now()}`;
    }
}

function initializeAllIdCounters(rawData: any | null) {
    const getMaxIdSuffix = (items: any[] | undefined, prefix: string): number => {
        if (!items || !Array.isArray(items)) return 0;
        let maxSuffix = 0;
        items.forEach(item => {
            if (item && typeof item.id === 'string' && item.id.startsWith(prefix)) {
                const suffix = parseInt(item.id.substring(prefix.length), 10);
                if (!isNaN(suffix) && suffix > maxSuffix) {
                    maxSuffix = suffix;
                }
            } else if (item && typeof (item as any).instanceId === 'string' && (item as any).instanceId.startsWith(prefix)) { // For weapon/equipment
                 const suffix = parseInt((item as any).instanceId.substring(prefix.length), 10);
                if (!isNaN(suffix) && suffix > maxSuffix) {
                    maxSuffix = suffix;
                }
            }
        });
        return maxSuffix;
    };

    if (rawData) {
        noteIdCounter = getMaxIdSuffix(rawData.notes, "Note_");
        relationshipIdCounter = getMaxIdSuffix(rawData.relationships, "Rel_");
        weaponInstanceIdCounter = getMaxIdSuffix(rawData.weapons, "WeaponInst_");
        equipmentInstanceIdCounter = getMaxIdSuffix(rawData.equipment, "EquipInst_");
        insightDefectIdCounter = getMaxIdSuffix(rawData.insightsAndDefects, "IDInst_");
    } else {
        noteIdCounter = 0;
        relationshipIdCounter = 0;
        weaponInstanceIdCounter = 0;
        equipmentInstanceIdCounter = 0;
        insightDefectIdCounter = 0;
    }
}

const ID_PREFIXES = ["Note_", "Rel_", "WeaponInst_", "EquipInst_", "IDInst_"];
function isNewIdFormat(id: string): boolean {
    if (typeof id !== 'string') return false;
    return ID_PREFIXES.some(prefix => id.startsWith(prefix) && !isNaN(parseInt(id.substring(prefix.length), 10)));
}


// --- UTILITY FUNCTIONS ---
const getEl = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

function toSafeId(name: string): string {
    return name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9-_]/g, '');
}

function updateSelectTooltip(selectElement: HTMLSelectElement | null) {
    if (selectElement && selectElement.selectedIndex >= 0) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        if (selectedOption && selectedOption.title) {
            selectElement.title = selectedOption.title;
        } else {
            selectElement.title = ''; 
        }
    } else if (selectElement) {
        selectElement.title = ''; 
    }
}

// Helper function to parse bonus strings like "+1", "-2", "±0" into numbers
function getNumericModifierFromString(bonusStr: string): number {
    if (typeof bonusStr !== 'string' || !bonusStr.trim()) {
        return 0;
    }
    if (bonusStr === "—") return 0;

    const match = bonusStr.match(/([+\-−±])\s*(\d+)/);
    if (match) {
        const sign = match[1];
        const value = parseInt(match[2], 10);
        if (sign === '-' || sign === '−') {
            return -value;
        }
        return value; // Covers + and ± (treating ± as + for bonus)
    }
    const justNumberMatch = bonusStr.match(/^(\d+)$/);
    if (justNumberMatch) {
        return parseInt(justNumberMatch[1], 10);
    }
    // console.warn(`Could not parse bonus string: "${bonusStr}" as a numeric modifier. Defaulting to 0.`);
    return 0;
}

// Calculates modifier from insights/defects for a given stat (attribute or skill)
function getModifierForStatFromEffects(statName: string, isAttributeRoll: boolean): number {
    let totalEffectModifier = 0;
    if (!character || !character.insightsAndDefects) return 0;

    const primaryStatUpper = statName.toUpperCase();
    let parentAttributeUpper = "";

    if (!isAttributeRoll) {
        const skillDef = SKILLS_LIST.find(s => s.name.toUpperCase() === primaryStatUpper);
        if (skillDef) {
            parentAttributeUpper = skillDef.attribute.toUpperCase();
        }
    }

    for (const item of character.insightsAndDefects) {
        const effectUpper = item.effect.toUpperCase();
        // Regex to find a potential stat name (letters and spaces) followed by +/-, then a number
        const regex = /([A-Z\s]+?)\s*([+\-−])\s*(\d+)/g;
        let match;
        while ((match = regex.exec(effectUpper)) !== null) {
            const affectedItemNameInEffect = match[1].trim(); // e.g., "AGILITY", "CLOSE COMBAT"
            const sign = match[2];
            const value = parseInt(match[3], 10);
            const currentModValue = (sign === '-' || sign === '−' ? -value : value);

            if (affectedItemNameInEffect === primaryStatUpper) {
                totalEffectModifier += currentModValue;
            } else if (!isAttributeRoll && parentAttributeUpper && affectedItemNameInEffect === parentAttributeUpper) {
                // This part applies attribute debuffs (like "PHYSIQUE -1") to skills under that attribute.
                // Ensure we're not applying it if the skill itself was already matched directly.
                totalEffectModifier += currentModValue;
            }
        }
    }
    return totalEffectModifier;
}


// --- INITIAL CHARACTER STATE ---
let character: Character;

function getDefaultCharacter(): Character {
    const defaultAttributes: { [key: string]: number } = {};
    ATTRIBUTE_KEYS.forEach(key => defaultAttributes[key] = 2); 

    const defaultSkills: { [key: string]: number } = {};
    SKILL_KEYS.forEach(key => defaultSkills[key] = 0);

    const defaultConditions: { [key: string]: boolean } = {};
    CONDITIONS_LIST.forEach(cond => defaultConditions[cond.id] = false);
    
    const initialArchetype = ARCHETYPES_LIST[0];
    const initialTalent = initialArchetype.talentChoices.length > 0 ? ALL_TALENTS_LIST.find(t=>t.name === initialArchetype.talentChoices[0])?.id || "" : "";

    return {
        name: "",
        ageGroup: AGE_GROUPS[0].name,
        age: null,
        archetype: initialArchetype.name,
        motivation: "",
        trauma: "",
        darkSecret: "",
        memento: MEMENTOS_LIST[0].item,
        mementoUsed: false,
        attributes: defaultAttributes,
        skills: defaultSkills,
        conditions: defaultConditions,
        physicalBroken: false,
        mentalBroken: false,
        resources: 1, 
        currentCapitalValue: null,
        currentResourcesValue: null,
        actualCapital: "—", // Retained, but new table uses currentCapitalValue
        talents: initialTalent ? [initialTalent] : [],
        otherTalents: "",
        relationships: [], 
        experiencePoints: 0,
        advantages: "",
        advantageUsed: false, 
        notes: [], 
        armor: null,
        weapons: [],
        equipment: [],
        discordWebhookUrl: "",
        insightsAndDefects: [] 
    };
}

// --- DATA MIGRATION HELPERS (for load/import) ---
const migrateListIds = <T extends {id: string}>(items: any[] | undefined, idPrefix: 'Note' | 'Relationship' | 'WeaponInst' | 'EquipmentInst' | 'InsightDefectInst', defaultProps: Partial<T> = {}): T[] => {
    if (!Array.isArray(items)) return [];
    return items.map((item: any) => ({
        ...defaultProps,
        ...item,
        id: (item && typeof item.id === 'string' && isNewIdFormat(item.id)) ? item.id : getNextIdForType(idPrefix),
        instanceId: idPrefix === 'WeaponInst' || idPrefix === 'EquipmentInst' ? ((item && typeof item.instanceId === 'string' && isNewIdFormat(item.instanceId)) ? item.instanceId : getNextIdForType(idPrefix)) : undefined
    }));
};

const migrateWeaponEquipmentIds = <T extends {instanceId: string, id: string}>(items: any[] | undefined, idPrefix: 'WeaponInst' | 'EquipmentInst', definitionList: any[]): T[] => {
    if (!Array.isArray(items)) return [];
    return items.map((item: any) => {
        const definition = definitionList.find(def => def.id === item.id); 
        return {
            ...(definition || {}), 
            ...item, 
            instanceId: (item && typeof item.instanceId === 'string' && isNewIdFormat(item.instanceId)) ? item.instanceId : getNextIdForType(idPrefix),
        } as T;
    });
};


// --- INITIALIZATION ---
function init() {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
    initializeAllIdCounters(rawData ? JSON.parse(rawData) : null); // Initialize counters from whatever is in storage (or null)
    character = loadCharacterFromLocalStorage() || getDefaultCharacter(); // Then load/default the character
    
    populateDropdowns();
    renderAttributes();
    renderSkills(); 
    renderConditions();
    renderRelationships();
    renderArmor();
    renderWeapons();
    renderEquipment();
    renderInsightsAndDefects();
    renderNotes(); 
    
    setupEventListeners(); 
    updateSheetDisplay(); 
    updateCalculations(); 
    updateSuggestionDropdowns(); 
}

function populateDropdowns() {
    const ageGroupSelect = getEl<HTMLSelectElement>('ageGroup');
    AGE_GROUPS.forEach(ag => {
        const option = document.createElement('option');
        option.value = ag.name;
        option.textContent = ag.name;
        ageGroupSelect.appendChild(option);
    });

    const archetypeSelect = getEl<HTMLSelectElement>('archetype');
    ARCHETYPES_LIST.forEach(arch => {
        const option = document.createElement('option');
        option.value = arch.name;
        option.textContent = arch.name;
        option.title = arch.description; 
        archetypeSelect.appendChild(option);
    });
    
    const mementoSelect = getEl<HTMLSelectElement>('memento');
    MEMENTOS_LIST.forEach(mem => {
        const option = document.createElement('option');
        option.value = mem.item; 
        option.textContent = mem.item;
        option.title = mem.item; 
        mementoSelect.appendChild(option);
    });

    const resourceSelect = getEl<HTMLSelectElement>('resources');
    RESOURCE_LEVELS.forEach(rl => {
        const option = document.createElement('option');
        option.value = rl.value.toString();
        option.textContent = `${rl.value}`; // Only display the number in the dropdown
        option.title = `${rl.standardOfLiving}: ${rl.description}`; 
        resourceSelect.appendChild(option);
    });

    const insightDefectSelect = getEl<HTMLSelectElement>('addInsightDefectSelect');
    insightDefectSelect.innerHTML = '<option value="">-- Select an Insight or Defect --</option>';
    
    const physicalItems = ALL_CRITICAL_TABLE_ITEMS.filter(item => item.table === 'Physical');
    const mentalItems = ALL_CRITICAL_TABLE_ITEMS.filter(item => item.table === 'Mental');

    const physicalOptgroup = document.createElement('optgroup');
    physicalOptgroup.label = 'Physical Critical Items';
    physicalItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.injury;
        option.title = item.effect;
        physicalOptgroup.appendChild(option);
    });
    insightDefectSelect.appendChild(physicalOptgroup);

    const mentalOptgroup = document.createElement('optgroup');
    mentalOptgroup.label = 'Mental Critical Items';
    mentalItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.injury;
        option.title = item.effect;
        mentalOptgroup.appendChild(option);
    });
    insightDefectSelect.appendChild(mentalOptgroup);
}

// --- RENDERING FUNCTIONS ---
function renderAttributes() {
    const container = getEl('attributesContainer');
    container.innerHTML = ''; 
    ATTRIBUTES_LIST.forEach(attrDef => {
        const div = document.createElement('div');
        div.classList.add('attribute-item');
        
        const rollButton = document.createElement('button');
        rollButton.classList.add('roll-button');
        rollButton.dataset.rolltype = 'attribute';
        rollButton.dataset.name = attrDef.name;
        rollButton.textContent = 'Roll';
        div.appendChild(rollButton);

        const label = document.createElement('label');
        label.htmlFor = `attr-${attrDef.name}`;
        label.textContent = `${attrDef.name}:`;
        div.appendChild(label);
        
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `attr-${attrDef.name}`;
        input.name = attrDef.name;
        input.min = "2";
        input.max = "5"; // Will be adjusted if main attribute
        input.value = (character.attributes[attrDef.name] || 2).toString();
        input.addEventListener('change', handleAttributeChange);
        div.appendChild(input);

        container.appendChild(div);
    });
}

function renderSkills() {
    const tableBody = getEl<HTMLTableSectionElement>('skillsTableBody');
    tableBody.innerHTML = ''; 

    SKILLS_LIST.forEach(skillDef => {
        const safeSkillId = toSafeId(skillDef.name);
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(); nameCell.textContent = skillDef.name; nameCell.classList.add('skill-name-cell');
        const attrCell = row.insertCell(); attrCell.textContent = skillDef.attribute; attrCell.classList.add('attribute-cell');
        const conditionModCell = row.insertCell(); conditionModCell.id = `condition-mod-${safeSkillId}`; conditionModCell.classList.add('condition-mod-cell');
        const rankCell = row.insertCell();
        const rankInput = document.createElement('input');
        rankInput.type = 'number'; rankInput.id = `skill-table-${safeSkillId}`; rankInput.name = skillDef.name; 
        rankInput.min = "0"; rankInput.max = "5"; rankInput.value = (character.skills[skillDef.name] || 0).toString();
        rankInput.addEventListener('change', handleSkillChange);
        rankCell.appendChild(rankInput);
        const dicePoolCell = row.insertCell(); dicePoolCell.id = `dicepool-table-${safeSkillId}`; dicePoolCell.classList.add('dice-pool-cell');
        const rollCell = row.insertCell();
        const rollButton = document.createElement('button');
        rollButton.classList.add('roll-button'); rollButton.dataset.rolltype = 'skill'; rollButton.dataset.name = skillDef.name;
        rollButton.textContent = 'Roll';
        rollCell.appendChild(rollButton);
    });
}


function renderConditions() {
    const physicalContainer = getEl('physicalConditionsContainer');
    const mentalContainer = getEl('mentalConditionsContainer');
    physicalContainer.innerHTML = ''; mentalContainer.innerHTML = ''; 

    CONDITIONS_LIST.forEach(condDef => {
        const div = document.createElement('div');
        div.innerHTML = `<input type="checkbox" id="cond-${condDef.id}" name="${condDef.id}" ${character.conditions[condDef.id] ? 'checked' : ''}><label for="cond-${condDef.id}">${condDef.name}</label>`;
        if (condDef.type === 'Physical') physicalContainer.appendChild(div); else mentalContainer.appendChild(div);
        const inputEl = getEl<HTMLInputElement>(`cond-${condDef.id}`);
        if (inputEl) inputEl.addEventListener('change', handleConditionChange);
        else console.warn(`Condition input element 'cond-${condDef.id}' not found.`);
    });

    getEl<HTMLInputElement>('cond-physicalBroken').checked = character.physicalBroken;
    getEl<HTMLInputElement>('cond-mentalBroken').checked = character.mentalBroken;

}

function renderResourcesTable() {
    const select = getEl<HTMLSelectElement>('resources');
    select.value = character.resources.toString();
    updateSelectTooltip(select); // For the dropdown part

    const selectedLevel = character.resources;
    const levelData = RESOURCE_LEVELS.find(rl => rl.value === selectedLevel);
    const modifierData = RESOURCE_MODIFIERS.find(rm => rm.level === selectedLevel);

    getEl<HTMLTableCellElement>('resourceLivingStandard').textContent = levelData ? levelData.standardOfLiving : 'N/A';
    getEl<HTMLTableCellElement>('resourceBonusDisplay').textContent = modifierData ? modifierData.bonus.toString() : '0';
    getEl<HTMLTableCellElement>('resourceCapitalDisplay').textContent = modifierData ? modifierData.capital : '—';
    
    getEl<HTMLInputElement>('currentCapitalValue').value = character.currentCapitalValue !== null ? character.currentCapitalValue.toString().padStart(2,'0') : '';
    getEl<HTMLInputElement>('currentResourcesValue').value = character.currentResourcesValue !== null ? character.currentResourcesValue.toString().padStart(2,'0') : '';
}


function updateArchetypeTalentDescriptionDisplay() {
    const archetypeTalentSelect = getEl<HTMLSelectElement>('archetypeTalent');
    const descriptionDiv = getEl<HTMLDivElement>('archetypeTalentDescription');
    const selectedTalentId = archetypeTalentSelect.value;
    if (selectedTalentId) {
        const talentDef = ALL_TALENTS_LIST.find(t => t.id === selectedTalentId);
        descriptionDiv.textContent = talentDef ? talentDef.description : "Description not found.";
    } else {
        descriptionDiv.textContent = "Select an archetype talent to see its description.";
    }
}

function renderTalents() {
    const archetypeTalentSelect = getEl<HTMLSelectElement>('archetypeTalent');
    archetypeTalentSelect.innerHTML = '<option value="" title="">-- Select Archetype Talent --</option>';
    const selectedArchetypeDef = ARCHETYPES_LIST.find(a => a.name === character.archetype);

    if (selectedArchetypeDef && selectedArchetypeDef.name !== "Custom Life Path") {
        selectedArchetypeDef.talentChoices.forEach(talentName => {
            const talentDef = ALL_TALENTS_LIST.find(t => t.name === talentName && t.archetype === selectedArchetypeDef.name);
            if (talentDef) {
                const option = document.createElement('option');
                option.value = talentDef.id; option.textContent = talentDef.name; option.title = talentDef.description; 
                archetypeTalentSelect.appendChild(option);
            }
        });
    }
    
    const currentArchetypeTalentId = character.talents.find(tId => {
        const tDef = ALL_TALENTS_LIST.find(t => t.id === tId);
        return tDef && tDef.archetype === character.archetype;
    });
    archetypeTalentSelect.value = currentArchetypeTalentId || "";
    updateArchetypeTalentDescriptionDisplay();

    const additionalTalentsContainer = getEl<HTMLDivElement>('additionalTalentsListContainer');
    additionalTalentsContainer.innerHTML = ''; 
    
    const nonArchetypeTalents = character.talents.filter(tId => {
        const tDef = ALL_TALENTS_LIST.find(t => t.id === tId);
        return tDef && (!tDef.archetype || tDef.archetype !== character.archetype);
    });

    if (nonArchetypeTalents.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No additional talents added.';
        p.style.fontStyle = 'italic';
        additionalTalentsContainer.appendChild(p);
    } else {
        nonArchetypeTalents.forEach(talentId => {
            const talentDef = ALL_TALENTS_LIST.find(t => t.id === talentId);
            if (talentDef) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('listed-item');
                itemDiv.dataset.itemId = talentDef.id;

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('listed-item-info');
                infoDiv.innerHTML = `<p><strong>${talentDef.name}</strong></p><p class="item-details">${talentDef.description}</p>`;
                itemDiv.appendChild(infoDiv);
                
                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('actions');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    character.talents = character.talents.filter(id => id !== talentDef.id);
                    renderTalents(); 
                    saveCharacterToLocalStorage();
                });
                actionsDiv.appendChild(deleteButton);
                itemDiv.appendChild(actionsDiv);
                additionalTalentsContainer.appendChild(itemDiv);
            }
        });
    }
}


function renderRelationships() {
    const container = getEl<HTMLDivElement>('relationshipsListContainer');
    container.innerHTML = ''; 
    if (!character.relationships || character.relationships.length === 0) {
        const p = document.createElement('p'); p.textContent = 'No relationships added yet.'; p.style.fontStyle = 'italic';
        container.appendChild(p); return;
    }
    character.relationships.forEach(rel => {
        const itemDiv = document.createElement('div'); itemDiv.classList.add('relationship-item'); 
        
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('relationship-item-header');

        const nameP = document.createElement('p'); 
        nameP.classList.add('relationship-pc-name');
        nameP.innerHTML = `<strong>PC Name:</strong> ${rel.pcName || 'N/A'}`; 
        headerDiv.appendChild(nameP);

        const actionsDiv = document.createElement('div'); 
        actionsDiv.classList.add('relationship-item-actions');
        
        const editButton = document.createElement('button'); 
        editButton.textContent = 'Edit'; 
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => openRelationshipModal(rel.id)); 
        actionsDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.relationshipId = rel.id; // Important for the handler
        deleteButton.addEventListener('click', () => deleteRelationshipHandler(rel.id));
        actionsDiv.appendChild(deleteButton);
        
        headerDiv.appendChild(actionsDiv);
        itemDiv.appendChild(headerDiv);

        const typeP = document.createElement('p'); typeP.innerHTML = `${rel.type || 'N/A'}`; itemDiv.appendChild(typeP);
        
        container.appendChild(itemDiv);
    });
}


function renderArmor() {
    const container = getEl<HTMLDivElement>('armorListContainer');
    container.innerHTML = ''; 

    if (character.armor) {
        const armor = character.armor;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('listed-item');
        itemDiv.dataset.itemId = armor.id; 

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('listed-item-info');
        infoDiv.innerHTML = `
            <p><strong>${armor.name}</strong></p>
            <p class="item-details">Type: ${armor.type}, Protection: ${armor.protection}, Agility Penalty: ${armor.agilityPenalty}</p>
        `;
        itemDiv.appendChild(infoDiv);
        
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');
        
        // No "Use" button for armor as its effects are passive

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('delete-button'); 
        removeButton.addEventListener('click', () => {
            character.armor = null;
            renderArmor();
            updateCalculations(); 
            saveCharacterToLocalStorage();
        });
        actionsDiv.appendChild(removeButton);
        itemDiv.appendChild(actionsDiv);
        container.appendChild(itemDiv);
    } else {
        const p = document.createElement('p');
        p.textContent = "No armor equipped.";
        p.style.fontStyle = "italic";
        container.appendChild(p);
    }
}


function renderWeapons() {
    const container = getEl<HTMLDivElement>('weaponsListContainer');
    container.innerHTML = '';
    if (!character.weapons || character.weapons.length === 0) {
        const p = document.createElement('p'); p.textContent = 'No weapons added.'; p.style.fontStyle = 'italic';
        container.appendChild(p); return;
    }
    character.weapons.forEach(weapon => {
        const itemDiv = document.createElement('div'); itemDiv.classList.add('listed-item'); itemDiv.dataset.itemId = weapon.instanceId;
        const infoDiv = document.createElement('div'); infoDiv.classList.add('listed-item-info');
        infoDiv.innerHTML = `<p><strong>${weapon.name}</strong></p><p class="item-details">Dmg: ${weapon.damage}, Range: ${weapon.range}, Bonus: ${weapon.bonus}, Skill: ${weapon.skill}</p>`;
        itemDiv.appendChild(infoDiv);
        
        const actionsDiv = document.createElement('div'); actionsDiv.classList.add('actions');
        
        const useButton = document.createElement('button');
        useButton.textContent = 'Use';
        useButton.classList.add('action-button');
        useButton.addEventListener('click', () => {
            const skillDefToUse = SKILLS_LIST.find(s => {
                if (weapon.skill.includes('/')) { // Handles skills like "Close Combat/Ranged Combat" for Spear
                    const potentialSkills = weapon.skill.split('/');
                    // This simple logic picks the first one listed. Could be enhanced with a prompt if needed.
                    return potentialSkills.includes(s.name); 
                }
                return s.name === weapon.skill;
            });

            if (skillDefToUse) {
                 const weaponBonusNum = getNumericModifierFromString(weapon.bonus);
                 const rollNameForDisplay = `Attack with ${weapon.name} (${skillDefToUse.name})`;
                 openDiceRollModal('weapon', rollNameForDisplay, skillDefToUse.attribute, skillDefToUse.name, weaponBonusNum, "Weapon");
            } else {
                console.warn(`Skill definition not found for weapon: ${weapon.name}, skill: ${weapon.skill}`);
                alert(`Skill definition missing for ${weapon.name}. Cannot perform roll.`);
            }
        });
        actionsDiv.appendChild(useButton);

        const deleteButton = document.createElement('button'); deleteButton.textContent = 'Delete'; deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            character.weapons = character.weapons.filter(w => w.instanceId !== weapon.instanceId);
            renderWeapons(); saveCharacterToLocalStorage();
        });
        actionsDiv.appendChild(deleteButton); 
        itemDiv.appendChild(actionsDiv); 
        container.appendChild(itemDiv);
    });
}

function renderEquipment() {
    const container = getEl<HTMLDivElement>('equipmentListContainer');
    container.innerHTML = '';
    if (!character.equipment || character.equipment.length === 0) {
        const p = document.createElement('p'); p.textContent = 'No equipment added.'; p.style.fontStyle = 'italic';
        container.appendChild(p); return;
    }
    character.equipment.forEach(item => {
        const itemDiv = document.createElement('div'); itemDiv.classList.add('listed-item'); itemDiv.dataset.itemId = item.instanceId;
        const infoDiv = document.createElement('div'); infoDiv.classList.add('listed-item-info');
        infoDiv.innerHTML = `<p><strong>${item.name}</strong></p><p class="item-details">${item.bonus !== "—" ? `Bonus: ${item.bonus}, ` : ''}Effect: ${item.effect}</p>`;
        itemDiv.appendChild(infoDiv);
        
        const actionsDiv = document.createElement('div'); actionsDiv.classList.add('actions');

        const useButton = document.createElement('button');
        useButton.textContent = 'Use';
        useButton.classList.add('action-button');
        useButton.addEventListener('click', () => {
            const itemBonus = getNumericModifierFromString(item.bonus);
            let skillToUse: SkillDefinition | undefined = undefined;
            const effectLower = item.effect.toLowerCase();

            for (const skillDef of SKILLS_LIST) {
                const skillNameLower = skillDef.name.toLowerCase();
                if (effectLower.includes(`with ${skillNameLower}`) ||
                    effectLower.includes(`during ${skillNameLower}`) ||
                    effectLower.includes(`for ${skillNameLower}`) ||
                    effectLower.includes(`use ${skillNameLower}`) 
                ) {
                    skillToUse = skillDef;
                    break; 
                }
            }

            if (skillToUse && itemBonus !== 0) { // Only trigger roll if a skill is found and bonus is applicable
                const rollNameForDisplay = `Using ${item.name} (${skillToUse.name})`;
                openDiceRollModal('skill', rollNameForDisplay, skillToUse.attribute, skillToUse.name, itemBonus, "Equipment");
            } else if (skillToUse && itemBonus === 0 && item.bonus !== "—") { 
                // Item might have a non-numeric bonus string like "special" but we couldn't parse it, or it's explicitly ±0.
                // Still, if a skill is mentioned, we can roll for it without an item bonus.
                 const rollNameForDisplay = `Using ${item.name} (${skillToUse.name})`;
                 openDiceRollModal('skill', rollNameForDisplay, skillToUse.attribute, skillToUse.name, 0, "Equipment");
            }
            else {
                console.log(`Use Equipment: ${item.name}. Effect: ${item.effect}. Bonus: ${item.bonus}. No direct skill roll triggered or bonus is not applicable for a roll.`);
                // Optionally, show a small notification to the user if no roll is triggered.
                // alert(`${item.name} used. Effect: ${item.effect}. No specific dice roll automatically triggered.`);
            }
        });
        actionsDiv.appendChild(useButton);

        const deleteButton = document.createElement('button'); deleteButton.textContent = 'Delete'; deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            character.equipment = character.equipment.filter(e => e.instanceId !== item.instanceId);
            renderEquipment(); saveCharacterToLocalStorage();
        });
        actionsDiv.appendChild(deleteButton); 
        itemDiv.appendChild(actionsDiv); 
        container.appendChild(itemDiv);
    });
}

function renderInsightsAndDefects() {
    const container = getEl<HTMLDivElement>('insightsDefectsListContainer');
    container.innerHTML = '';
    if (!character.insightsAndDefects || character.insightsAndDefects.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No insights or defects added.';
        p.style.fontStyle = 'italic';
        container.appendChild(p);
        return;
    }
    character.insightsAndDefects.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('listed-item');
        itemDiv.dataset.itemId = item.id; 

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('listed-item-info');
        infoDiv.innerHTML = `
            <p><strong>${item.name}</strong> <em style="font-size:0.8em">(${item.type})</em></p>
            <p class="item-details">Effect: ${item.effect}</p>
        `;
        itemDiv.appendChild(infoDiv);
        
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            character.insightsAndDefects = character.insightsAndDefects.filter(idItem => idItem.id !== item.id);
            renderInsightsAndDefects();
            updateCalculations(); // Recalculate skill dice pools
            saveCharacterToLocalStorage();
        });
        actionsDiv.appendChild(deleteButton);
        itemDiv.appendChild(actionsDiv);
        container.appendChild(itemDiv);
    });
}

function renderNotes() {
    const container = getEl<HTMLDivElement>('notesListContainer');
    container.innerHTML = ''; 

    if (!character.notes || character.notes.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No notes added yet. Click "Add New Note" to start.';
        p.style.fontStyle = 'italic';
        container.appendChild(p);
        return;
    }

    character.notes.forEach(note => {
        const noteItemDiv = document.createElement('div');
        noteItemDiv.classList.add('note-item');
        noteItemDiv.dataset.noteId = note.id;

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.classList.add('note-title-input');
        titleInput.value = note.title;
        titleInput.placeholder = 'Note Title';
        titleInput.readOnly = note.isLocked;
        titleInput.addEventListener('input', (e) => handleNoteTitleChange(note.id, (e.target as HTMLInputElement).value));

        const contentTextarea = document.createElement('textarea');
        contentTextarea.classList.add('note-content-textarea');
        contentTextarea.value = note.content;
        contentTextarea.rows = 3;
        contentTextarea.placeholder = 'Note content...';
        contentTextarea.readOnly = note.isLocked;
        contentTextarea.addEventListener('input', (e) => handleNoteContentChange(note.id, (e.target as HTMLTextAreaElement).value));
        
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('note-item-header');
        headerDiv.appendChild(titleInput);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('note-item-buttons');

        const editLockButton = document.createElement('button');
        editLockButton.textContent = note.isLocked ? "Edit Note" : "Lock Note";
        editLockButton.classList.add(note.isLocked ? 'edit-button' : 'action-button'); 
        editLockButton.addEventListener('click', () => toggleNoteLockHandler(note.id));
        buttonsDiv.appendChild(editLockButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Note';
        deleteButton.classList.add('delete-button', 'note-delete-button');
        deleteButton.addEventListener('click', () => deleteNoteHandler(note.id)); 
        buttonsDiv.appendChild(deleteButton);
        
        headerDiv.appendChild(buttonsDiv);
        
        noteItemDiv.appendChild(headerDiv);
        noteItemDiv.appendChild(contentTextarea);
        container.appendChild(noteItemDiv);
    });
}


function updateSuggestionDropdowns() {
    const currentArchetypeDef = ARCHETYPES_LIST.find(a => a.name === character.archetype);
    const motivationDatalist = getEl<HTMLDataListElement>('motivationDatalist');
    const traumaDatalist = getEl<HTMLDataListElement>('traumaDatalist');
    const darkSecretDatalist = getEl<HTMLDataListElement>('darkSecretDatalist');
    if (motivationDatalist) { motivationDatalist.innerHTML = ''; if (currentArchetypeDef) currentArchetypeDef.motivations.forEach(m => { const opt = document.createElement('option'); opt.value = m; motivationDatalist.appendChild(opt); }); }
    if (traumaDatalist) { traumaDatalist.innerHTML = ''; if (currentArchetypeDef) currentArchetypeDef.traumas.forEach(t => { const opt = document.createElement('option'); opt.value = t; traumaDatalist.appendChild(opt); }); }
    if (darkSecretDatalist) { darkSecretDatalist.innerHTML = ''; if (currentArchetypeDef) currentArchetypeDef.darkSecrets.forEach(ds => { const opt = document.createElement('option'); opt.value = ds; darkSecretDatalist.appendChild(opt); }); }
}


// --- EVENT HANDLERS & DATA UPDATES ---
function handleGenericInputChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const fieldName = target.name;
    let value: string | number | boolean | null = target.value;
    const mementoLabel = getEl<HTMLLabelElement>('mementoLabel');
    const currentAdvantageLabel = getEl<HTMLLabelElement>('advantagesLabel'); 

    if (target.type === 'number' && fieldName !== 'age' && fieldName !== 'currentCapitalValue' && fieldName !== 'currentResourcesValue') { 
        const rawValue = parseInt(target.value, 10);
        if (fieldName === 'experiencePoints') {
            value = isNaN(rawValue) ? 0 : Math.max(0, rawValue); 
        } else {
            value = isNaN(rawValue) ? 0 : rawValue; 
        }
    } else if (target.type === 'checkbox') {
        value = (target as HTMLInputElement).checked;
        if (fieldName === 'mementoUsed' && mementoLabel) {
            mementoLabel.classList.toggle('text-strikethrough', value as boolean);
        } else if (fieldName === 'advantageUsed' && currentAdvantageLabel) { 
            currentAdvantageLabel.classList.toggle('text-strikethrough', value as boolean);
        }
    } else if (fieldName === 'age' || fieldName === 'currentCapitalValue' || fieldName === 'currentResourcesValue') {
        value = target.value === '' ? null : parseInt(target.value, 10);
        if (target.value !== '' && isNaN(value as number)) value = null; 
    } else if (fieldName === 'notes' || fieldName === 'characterNameInput' ) { 
        return; 
    }

    if (fieldName === 'actualCapital') { 
        character.actualCapital = target.value; 
    } else if (fieldName === 'currentCapitalValue') {
        character.currentCapitalValue = value as number | null;
    } else if (fieldName === 'currentResourcesValue') {
        character.currentResourcesValue = value as number | null;
    } else if (fieldName !== 'characterNameInput') { 
       (character as any)[fieldName] = value;
    }


    if (fieldName === 'ageGroup') {
        Object.keys(character.attributes).forEach(key => character.attributes[key] = 2);
        Object.keys(character.skills).forEach(key => character.skills[key] = 0);
        renderSkills();
    }
    if (fieldName === 'archetype') {
        character.talents = []; 
        const newArchetypeDef = ARCHETYPES_LIST.find(a => a.name === character.archetype);
        if (newArchetypeDef && newArchetypeDef.talentChoices.length > 0 && newArchetypeDef.name !== "Custom Life Path") {
            const firstTalent = ALL_TALENTS_LIST.find(t => t.name === newArchetypeDef.talentChoices[0] && t.archetype === newArchetypeDef.name);
            if (firstTalent) character.talents.push(firstTalent.id);
        }
        renderTalents(); updateSuggestionDropdowns(); 
    }
    if (fieldName === 'resources') { 
        character.resources = parseInt(target.value, 10); 
        renderResourcesTable(); 
    }
    if (fieldName === 'archetypeTalent') {
        const newTalentId = target.value;
        character.talents = character.talents.filter(tId => {
            const tDef = ALL_TALENTS_LIST.find(t => t.id === tId);
            return !tDef || !tDef.archetype || tDef.archetype !== character.archetype; 
        });
        if (newTalentId) character.talents.push(newTalentId);
        renderTalents(); 
        updateArchetypeTalentDescriptionDisplay(); 
    }
    if (target.tagName === 'SELECT' && fieldName !== 'archetypeTalent') updateSelectTooltip(target as HTMLSelectElement);
    updateCalculations(); saveCharacterToLocalStorage();
}

function handleAttributeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const attrName = target.name; let value = parseInt(target.value, 10);
    const currentArchetype = ARCHETYPES_LIST.find(a => a.name === character.archetype);
    const maxVal = (currentArchetype && attrName === currentArchetype.mainAttribute && currentArchetype.name !== "Custom Life Path") ? 5 : 4;
    const minVal = 2;
    if (isNaN(value)) value = minVal; if (value < minVal) value = minVal; if (value > maxVal) value = maxVal;
    target.value = value.toString(); character.attributes[attrName] = value;
    updateCalculations(); saveCharacterToLocalStorage();
}

function handleSkillChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const skillName = target.name; let value = parseInt(target.value, 10);
    const maxVal = 5; const minVal = 0;
    if (isNaN(value)) value = minVal; if (value < minVal) value = minVal; if (value > maxVal) value = maxVal;
    target.value = value.toString(); character.skills[skillName] = value;
    updateCalculations(); saveCharacterToLocalStorage();
}

function handleConditionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.name === 'physicalBroken' || target.name === 'mentalBroken') {
        character[target.name as 'physicalBroken' | 'mentalBroken'] = target.checked;
    } else {
        character.conditions[target.name] = target.checked;
    }
    updateCalculations(); saveCharacterToLocalStorage();
}

async function handleRollResources() {
    if (!character) return;

    const diceToRoll = character.resources;
    if (diceToRoll <= 0) {
        console.log("Resources value is 0 or less. Cannot roll for resources.");
        character.currentResourcesValue = 0;
        const currentResourcesInput = getEl<HTMLInputElement>('currentResourcesValue');
        if (currentResourcesInput) {
            currentResourcesInput.value = '00';
        }
        saveCharacterToLocalStorage();
        await sendSimpleRollToDiscord(
            "Resources Roll Attempt",
            `Attempted to roll with Resources: ${diceToRoll}. No dice rolled.`,
            [],
            0
        );
        return;
    }

    let successes = 0;
    const results: number[] = [];
    for (let i = 0; i < diceToRoll; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        results.push(roll);
        if (roll === 6) {
            successes++;
        }
    }
    
    openResourceRollResultModal(results, successes, diceToRoll);
}


function addNewNoteHandler() {
    const newNote: NoteItem = {
        id: getNextIdForType('Note'),
        title: "New Note",
        content: "",
        isLocked: false 
    };
    character.notes.push(newNote);
    renderNotes();
    const newNoteElement = document.querySelector(`.note-item[data-note-id="${newNote.id}"] .note-title-input`) as HTMLInputElement;
    if (newNoteElement) {
        newNoteElement.focus();
        newNoteElement.select();
    }
    saveCharacterToLocalStorage();
}


function handleNoteTitleChange(noteId: string, newTitle: string) {
    const note = character.notes.find(n => n.id === noteId);
    if (note && !note.isLocked) {
        note.title = newTitle;
        saveCharacterToLocalStorage();
    }
}

function handleNoteContentChange(noteId: string, newContent: string) {
    const note = character.notes.find(n => n.id === noteId);
    if (note && !note.isLocked) {
        note.content = newContent;
        saveCharacterToLocalStorage();
    }
}

function deleteNoteHandler(noteId: string) {
    if (!noteId || typeof noteId !== 'string' || noteId.trim() === "") {
        console.error("DeleteNoteHandler called with invalid noteId:", noteId);
        return;
    }

    const noteToDelete = character.notes.find(n => n.id === noteId);
    if (!noteToDelete) {
        console.warn("Note with ID:", noteId, "not found for deletion.");
        return;
    }

    openConfirmationModal(
        "Confirm Delete Note",
        `Are you sure you want to delete this note: "${noteToDelete.title}"? This action cannot be undone.`,
        () => {
            character.notes = character.notes.filter(n => n.id !== noteId);
            renderNotes();
            saveCharacterToLocalStorage();
        }
    );
}


function toggleNoteLockHandler(noteId: string) {
    const note = character.notes.find(n => n.id === noteId);
    if (note) {
        note.isLocked = !note.isLocked;
        renderNotes(); 
        saveCharacterToLocalStorage();
    }
}


// --- DYNAMIC CALCULATIONS & DISPLAY UPDATES ---
function updateCalculations() {
    SKILLS_LIST.forEach(skillDef => {
        const safeSkillId = toSafeId(skillDef.name);
        const conditionModCell = getEl<HTMLTableCellElement>(`condition-mod-${safeSkillId}`);
        const dicePoolCell = getEl<HTMLTableCellElement>(`dicepool-table-${safeSkillId}`);
        
        let totalSheetModifier = 0; 
        
        const skillAttributeType = (["Physique", "Precision"].includes(skillDef.attribute)) ? 'Physical' : 'Mental';
        CONDITIONS_LIST.forEach(condDef => { 
            if (character.conditions[condDef.id] && condDef.type === skillAttributeType) {
                totalSheetModifier -= 1; 
            }
        });

        if (character.armor && (skillDef.attribute === "Physique" || skillDef.attribute === "Precision")) {
            totalSheetModifier += character.armor.agilityPenalty; 
        }
        
        const insightDefectModForSkill = getModifierForStatFromEffects(skillDef.name, false);
        totalSheetModifier += insightDefectModForSkill;
        
        if (conditionModCell) conditionModCell.textContent = totalSheetModifier.toString();
        
        const attrRank = character.attributes[skillDef.attribute] || 0;
        const skillRank = character.skills[skillDef.name] || 0;
        const dicePool = Math.max(0, attrRank + skillRank + totalSheetModifier); 
        
        if (dicePoolCell) dicePoolCell.textContent = dicePool.toString();
    });
}


function switchToEditCharacterName() {
    const nameDisplay = getEl<HTMLSpanElement>('characterNameDisplay');
    const nameInput = getEl<HTMLInputElement>('characterNameInput');
    nameDisplay.style.display = 'none';
    nameInput.style.display = 'inline-block';
    nameInput.value = character.name || '';
    nameInput.placeholder = "Character name";
    nameInput.focus();
}

function saveAndDisplayCharacterName() {
    const nameDisplay = getEl<HTMLSpanElement>('characterNameDisplay');
    const nameInput = getEl<HTMLInputElement>('characterNameInput');
    const newName = nameInput.value.trim();
    character.name = newName;
    nameDisplay.textContent = newName || "Character name"; 
    nameDisplay.style.display = 'inline-block';
    nameInput.style.display = 'none';
    saveCharacterToLocalStorage();
}


function updateSheetDisplay() {
    const safeUpdate = (id: string, value: string | boolean | number | null, property: 'value' | 'checked' | 'textContent' = 'value', readOnly: boolean = false) => {
        const el = getEl<HTMLElement>(id);
        if (el) {
            if (property === 'checked' && typeof value === 'boolean') (el as HTMLInputElement).checked = value;
            else if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
                 el[property as 'value'] = value === null ? '' : String(value);
                 if (el instanceof HTMLInputElement && id !== 'characterNameInput' && id !== 'actualCapital' && id !== 'currentCapitalValue' && id !== 'currentResourcesValue') el.readOnly = readOnly; 
            }
            else el[property as 'textContent'] = value === null ? '' : String(value);
        } else if (id !== 'notes' && id !== 'characterNameInput' && id !== 'characterNameDisplay' && id !== 'actualCapital' && id !== 'currentCapitalValue' && id !== 'currentResourcesValue' && id !== 'resourceLivingStandard' && id !== 'resourceBonusDisplay' && id !== 'resourceCapitalDisplay' && !id.startsWith('fearTestAttr') && !id.startsWith('fearTestLogicValueDisplay') && !id.startsWith('fearTestEmpathyValueDisplay') ) { 
             console.warn(`Element with ID '${id}' not found during updateSheetDisplay.`);
        }
    };
    
    const nameDisplay = getEl<HTMLSpanElement>('characterNameDisplay');
    const nameInput = getEl<HTMLInputElement>('characterNameInput');
    nameDisplay.textContent = character.name || "Character name";
    nameInput.value = character.name || "";
    nameDisplay.style.display = 'inline-block'; 
    nameInput.style.display = 'none'; 


    safeUpdate('ageGroup', character.ageGroup); updateSelectTooltip(getEl<HTMLSelectElement>('ageGroup')); 
    safeUpdate('age', character.age);
    safeUpdate('archetype', character.archetype); updateSelectTooltip(getEl<HTMLSelectElement>('archetype'));
    safeUpdate('motivation', character.motivation); safeUpdate('trauma', character.trauma); safeUpdate('darkSecret', character.darkSecret);
    
    safeUpdate('memento', character.memento); updateSelectTooltip(getEl<HTMLSelectElement>('memento'));
    safeUpdate('mementoUsed', character.mementoUsed, 'checked');
    const mementoLabel = getEl<HTMLLabelElement>('mementoLabel');
    if (mementoLabel) mementoLabel.classList.toggle('text-strikethrough', character.mementoUsed);

    ATTRIBUTE_KEYS.forEach(key => safeUpdate(`attr-${key}`, character.attributes[key]));
    CONDITIONS_LIST.forEach(cond => safeUpdate(`cond-${cond.id}`, character.conditions[cond.id], 'checked'));
    safeUpdate('cond-physicalBroken', character.physicalBroken, 'checked');
    safeUpdate('cond-mentalBroken', character.mentalBroken, 'checked');

    renderResourcesTable(); 
    renderTalents(); 
    renderRelationships();
    renderArmor(); renderWeapons(); renderEquipment(); renderInsightsAndDefects(); renderNotes();
    safeUpdate('talentsOther', character.otherTalents);
    safeUpdate('experiencePoints', character.experiencePoints, 'value', false); 
    safeUpdate('advantages', character.advantages);
    
    safeUpdate('advantageUsed', character.advantageUsed, 'checked');
    const currentAdvantageLabel = getEl<HTMLLabelElement>('advantagesLabel');
    if (currentAdvantageLabel) currentAdvantageLabel.classList.toggle('text-strikethrough', character.advantageUsed);
    
    safeUpdate('discordWebhookUrl', character.discordWebhookUrl);
    renderAttributes(); renderSkills(); renderConditions();
}

// --- LOCAL STORAGE ---
const LOCAL_STORAGE_KEY = 'vaesenCharacterSheet';
function saveCharacterToLocalStorage() { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(character)); }

function loadCharacterFromLocalStorage(): Character | null {
    const rawDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawDataString) {
        try {
            const parsedData = JSON.parse(rawDataString);
            const defaultChar = getDefaultCharacter();

            // Initialize ID counters based on the loaded data *before* migrations that might generate new IDs
            // initializeAllIdCounters(parsedData); // This was moved to init() and importCharacter()

            const finalNotes = migrateListIds<NoteItem>(parsedData.notes, 'Note', { title: "Untitled Note", content: "", isLocked: true });
            const finalRelationships = migrateListIds<RelationshipItem>(parsedData.relationships, 'Relationship', { pcName: "", type: "" });
            const finalWeapons = migrateWeaponEquipmentIds<WeaponItem>(parsedData.weapons, 'WeaponInst', WEAPON_DEFINITIONS);
            const finalEquipment = migrateWeaponEquipmentIds<EquipmentItem>(parsedData.equipment, 'EquipmentInst', GENERAL_EQUIPMENT_DEFINITIONS);
            const finalInsightsDefects = migrateListIds<InsightDefectItem>(parsedData.insightsAndDefects, 'InsightDefectInst', { originalId: "", name: "", effect: "", type: "Defect" });


            return {
                ...defaultChar, ...parsedData,
                attributes: { ...defaultChar.attributes, ...(parsedData.attributes || {}) },
                skills: { ...defaultChar.skills, ...(parsedData.skills || {}) },
                conditions: { ...defaultChar.conditions, ...(parsedData.conditions || {}) },
                physicalBroken: parsedData.physicalBroken !== undefined ? parsedData.physicalBroken : false,
                mentalBroken: parsedData.mentalBroken !== undefined ? parsedData.mentalBroken : false,
                age: parsedData.age !== undefined ? parsedData.age : null,
                mementoUsed: parsedData.mementoUsed !== undefined ? parsedData.mementoUsed : false,
                advantageUsed: parsedData.advantageUsed !== undefined ? parsedData.advantageUsed : false,
                experiencePoints: parsedData.experiencePoints !== undefined ? parsedData.experiencePoints : 0,
                currentCapitalValue: parsedData.currentCapitalValue !== undefined ? parsedData.currentCapitalValue : null,
                currentResourcesValue: parsedData.currentResourcesValue !== undefined ? parsedData.currentResourcesValue : null,
                actualCapital: parsedData.actualCapital || defaultChar.actualCapital, 
                talents: Array.isArray(parsedData.talents) ? parsedData.talents : [],
                armor: parsedData.armor || null, 
                notes: finalNotes,
                relationships: finalRelationships,
                weapons: finalWeapons,
                equipment: finalEquipment,
                insightsAndDefects: finalInsightsDefects,
                resources: (typeof parsedData.resources === 'number' && parsedData.resources >= 1 && parsedData.resources <= 8) ? parsedData.resources : defaultChar.resources,
            };
        } catch (e) { console.error("Error parsing character from local storage:", e); localStorage.removeItem(LOCAL_STORAGE_KEY); return null; }
    } return null;
}


// --- MODAL HANDLING ---
const relationshipModal = getEl<HTMLDivElement>('addRelationshipModal');
const relationshipModalTitle = getEl<HTMLHeadingElement>('relationshipModalTitle');
const editingRelationshipIdInput = getEl<HTMLInputElement>('editingRelationshipId');
const relationshipPCNameInput = getEl<HTMLInputElement>('relationshipPCName');
const relationshipTypeSelect = getEl<HTMLSelectElement>('relationshipTypeSelect');
const customRelationshipTypeContainer = getEl<HTMLDivElement>('customRelationshipTypeContainer');
const relationshipTypeCustomInput = getEl<HTMLInputElement>('relationshipTypeCustom');


function openRelationshipModal(relationshipId: string | null = null) {
    const currentArchetypeDef = ARCHETYPES_LIST.find(a => a.name === character.archetype);
    let currentHooks = GENERIC_RELATIONSHIP_HOOKS; 
    if (currentArchetypeDef && currentArchetypeDef.name !== "Custom Life Path" && currentArchetypeDef.relationshipHooks.length > 0) {
        currentHooks = currentArchetypeDef.relationshipHooks;
    }

    relationshipTypeSelect.innerHTML = ''; 

    currentHooks.forEach(hook => {
        const option = document.createElement('option');
        option.value = hook;
        option.textContent = hook;
        relationshipTypeSelect.appendChild(option);
    });
    
    const otherOption = document.createElement('option');
    otherOption.value = CUSTOM_RELATIONSHIP_TYPE_VALUE;
    otherOption.textContent = "Other (Describe)";
    relationshipTypeSelect.appendChild(otherOption);

    if (relationshipId) {
        const relationship = character.relationships.find(r => r.id === relationshipId);
        if (relationship) {
            relationshipModalTitle.textContent = 'Edit Relationship'; 
            editingRelationshipIdInput.value = relationship.id;
            relationshipPCNameInput.value = relationship.pcName;

            const isPredefinedHook = currentHooks.includes(relationship.type);

            if (isPredefinedHook) {
                relationshipTypeSelect.value = relationship.type;
                relationshipTypeCustomInput.value = '';
                customRelationshipTypeContainer.style.display = 'none';
            } else {
                relationshipTypeSelect.value = CUSTOM_RELATIONSHIP_TYPE_VALUE;
                relationshipTypeCustomInput.value = relationship.type;
                customRelationshipTypeContainer.style.display = 'block';
            }
        } else { 
            console.error("Relationship not found for editing:", relationshipId); return; 
        }
    } else {
        relationshipModalTitle.textContent = 'Add Relationship'; 
        editingRelationshipIdInput.value = '';
        relationshipPCNameInput.value = ''; 
        relationshipTypeSelect.value = currentHooks[0] || CUSTOM_RELATIONSHIP_TYPE_VALUE;
        relationshipTypeCustomInput.value = '';
        customRelationshipTypeContainer.style.display = relationshipTypeSelect.value === CUSTOM_RELATIONSHIP_TYPE_VALUE ? 'block' : 'none';
    }
    if (relationshipModal) relationshipModal.style.display = 'block';
}

function closeRelationshipModal() { if (relationshipModal) relationshipModal.style.display = 'none'; }

function saveRelationship() {
    const id = editingRelationshipIdInput.value; 
    const pcName = relationshipPCNameInput.value.trim();
    let type = relationshipTypeSelect.value;

    if (type === CUSTOM_RELATIONSHIP_TYPE_VALUE) {
        type = relationshipTypeCustomInput.value.trim();
        if (!type) {
            alert("Please describe the custom relationship type."); // User-friendly alert
            const customInput = getEl<HTMLInputElement>('relationshipTypeCustom');
            if (customInput) {
                customInput.style.borderColor = 'red';
                customInput.focus();
            }
            return;
        }
    }
    
    if (!pcName) { 
        alert("Player Character Name is required.");  // User-friendly alert
        const pcNameInput = getEl<HTMLInputElement>('relationshipPCName');
        if (pcNameInput) {
            pcNameInput.style.borderColor = 'red';
            pcNameInput.focus();
        }
        return; 
    }

    getEl<HTMLInputElement>('relationshipTypeCustom').style.borderColor = '';
    getEl<HTMLInputElement>('relationshipPCName').style.borderColor = '';

    if (id) { 
        const index = character.relationships.findIndex(r => r.id === id);
        if (index > -1) character.relationships[index] = { ...character.relationships[index], pcName, type };
    } else { 
        character.relationships.push({ id: getNextIdForType('Relationship'), pcName, type });
    }
    renderRelationships(); saveCharacterToLocalStorage(); closeRelationshipModal();
}

function deleteRelationshipHandler(relationshipId: string) {
    if (!relationshipId || typeof relationshipId !== 'string' || relationshipId.trim() === "") {
        console.error("deleteRelationshipHandler called with invalid relationshipId:", relationshipId);
        return;
    }

    const relationshipToDelete = character.relationships.find(r => r.id === relationshipId);
    if (!relationshipToDelete) {
        console.warn("Relationship with ID:", relationshipId, "not found for deletion.");
        return;
    }

    openConfirmationModal(
        "Confirm Delete Relationship",
        `Are you sure you want to delete the relationship with ${relationshipToDelete.pcName}? This action cannot be undone.`,
        () => {
            character.relationships = character.relationships.filter(r => r.id !== relationshipId);
            renderRelationships();
            saveCharacterToLocalStorage();
        }
    );
}


const discordSettingsModal = getEl<HTMLDivElement>('discordSettingsModal');
function openDiscordSettingsModal() { if (discordSettingsModal) discordSettingsModal.style.display = 'block'; }
function closeDiscordSettingsModal() { if (discordSettingsModal) discordSettingsModal.style.display = 'none'; }

const armorSelectionModal = getEl<HTMLDivElement>('armorSelectionModal');
const weaponSelectionModal = getEl<HTMLDivElement>('weaponSelectionModal');
const equipmentSelectionModal = getEl<HTMLDivElement>('equipmentSelectionModal');
const gainXpModal = getEl<HTMLDivElement>('gainXpModal');
const diceRollModal = getEl<HTMLDivElement>('diceRollModal');
const resourceRollResultModal = getEl<HTMLDivElement>('resourceRollResultModal');
const slowActionsModal = getEl<HTMLDivElement>('slowActionsModal');
const fastActionsModal = getEl<HTMLDivElement>('fastActionsModal');
const fearTestModal = getEl<HTMLDivElement>('fearTestModal');


// --- Generic Confirmation Modal ---
const confirmationModal = getEl<HTMLDivElement>('confirmationModal');
const confirmationModalTitleEl = getEl<HTMLHeadingElement>('confirmationModalTitle');
const confirmationModalMessageEl = getEl<HTMLParagraphElement>('confirmationModalMessage');
const confirmActionBtn = getEl<HTMLButtonElement>('confirmActionBtn');
const cancelActionBtn = getEl<HTMLButtonElement>('cancelActionBtn');
const closeConfirmationModalBtn = getEl<HTMLSpanElement>('closeConfirmationModalBtn');

let currentOnConfirmCallback: (() => void) | null = null;

function openConfirmationModal(title: string, message: string, onConfirm: () => void) {
    if (confirmationModal && confirmationModalTitleEl && confirmationModalMessageEl) {
        confirmationModalTitleEl.textContent = title;
        confirmationModalMessageEl.textContent = message;
        currentOnConfirmCallback = onConfirm;
        confirmationModal.style.display = 'block';
    } else {
        console.error("Confirmation modal elements not found.");
    }
}

function closeConfirmationModal() {
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
    }
    currentOnConfirmCallback = null;
}

if (confirmActionBtn) {
    confirmActionBtn.addEventListener('click', () => {
        if (currentOnConfirmCallback) {
            currentOnConfirmCallback();
        }
        closeConfirmationModal();
    });
}
if (cancelActionBtn) cancelActionBtn.addEventListener('click', closeConfirmationModal);
if (closeConfirmationModalBtn) closeConfirmationModalBtn.addEventListener('click', closeConfirmationModal);


function openModal(modal: HTMLDivElement | null) { if (modal) modal.style.display = 'block'; }
function closeModal(modal: HTMLDivElement | null) { if (modal) modal.style.display = 'none'; }

function populateGearModalSelect(selectId: string, descriptionId: string, items: (ArmorDefinition | WeaponDefinition | GeneralEquipmentDefinition)[], includeNoneOption: boolean = false) {
    const selectEl = getEl<HTMLSelectElement>(selectId); const descEl = getEl<HTMLDivElement>(descriptionId); selectEl.innerHTML = '';
    if (includeNoneOption) { const noneOpt = document.createElement('option'); noneOpt.value = ""; noneOpt.textContent = "-- None --"; noneOpt.title = "Unequip armor"; selectEl.appendChild(noneOpt); }
    else { const placeholderOpt = document.createElement('option'); placeholderOpt.value = ""; placeholderOpt.textContent = `-- Select ${selectId.includes('Armor') ? 'Armor' : selectId.includes('Weapon') ? 'Weapon' : 'Equipment'} --`; selectEl.appendChild(placeholderOpt); }
    items.forEach(item => {
        const option = document.createElement('option'); option.value = item.id; option.textContent = item.name;
        if ('protection' in item) option.title = `Type: ${item.type}, Protection: ${item.protection}, Agility Penalty: ${item.agilityPenalty}`;
        else if ('damage' in item) option.title = `Dmg: ${item.damage}, Range: ${item.range}, Bonus: ${item.bonus}, Skill: ${item.skill}`;
        else option.title = `Bonus: ${item.bonus}, Effect: ${item.effect}`;
        selectEl.appendChild(option);
    });
    selectEl.onchange = () => {
        const selectedId = selectEl.value; const selectedItem = items.find(i => i.id === selectedId);
        if (selectedItem) {
             if ('protection' in selectedItem) descEl.textContent = `Type: ${selectedItem.type}, Protection: ${selectedItem.protection}, Agility Penalty: ${selectedItem.agilityPenalty}, Availability: ${selectedItem.availability}`;
            else if ('damage' in selectedItem) descEl.textContent = `Damage: ${selectedItem.damage}, Range: ${selectedItem.range}, Bonus: ${selectedItem.bonus}, Skill: ${selectedItem.skill}, Availability: ${selectedItem.availability}`;
            else descEl.textContent = `Bonus: ${selectedItem.bonus}, Availability: ${selectedItem.availability}. Effect: ${selectedItem.effect}`;
        } else descEl.textContent = "Description will appear here.";
        updateSelectTooltip(selectEl);
    };
    descEl.textContent = "Description will appear here."; updateSelectTooltip(selectEl);
}

function openGainXpModal() {
    const questionsContainer = getEl<HTMLDivElement>('xpQuestionsContainer');
    questionsContainer.innerHTML = ''; 
    XP_QUESTIONS.forEach((question, index) => {
        const div = document.createElement('div');
        div.classList.add('xp-question-item');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; checkbox.id = `xp-q-${index}`; checkbox.name = `xp-q-${index}`; checkbox.value = '1';
        const label = document.createElement('label');
        label.htmlFor = `xp-q-${index}`; label.textContent = question;
        div.appendChild(checkbox); div.appendChild(label); questionsContainer.appendChild(div);
    });
    openModal(gainXpModal);
}

function closeGainXpModal() { closeModal(gainXpModal); }

function confirmGainXp() {
    let xpGained = 0;
    const questionsContainer = getEl<HTMLDivElement>('xpQuestionsContainer');
    const checkboxes = questionsContainer.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(checkbox => { if (checkbox.checked) xpGained++; });
    if (xpGained > 0) {
        character.experiencePoints += xpGained;
        updateSheetDisplay(); 
        saveCharacterToLocalStorage();
        console.log(`You gained ${xpGained} XP! Your total XP is now ${character.experiencePoints}.`);
    }
    closeGainXpModal();
}

function handleSpendFiveXp() {
    if (character.experiencePoints >= 5) {
        character.experiencePoints -= 5;
        updateSheetDisplay();
        saveCharacterToLocalStorage();
        console.log("5 XP spent. Remember to: Add one point to a Skill, OR add a new Talent.");
    } else {
        console.warn(`Not enough XP. You need at least 5 XP to spend. You only have ${character.experiencePoints} XP.`);
    }
}

function handleAddRandomInjury(tableType: 'Physical' | 'Mental') {
    const injuryTable = tableType === 'Physical' ? PHYSICAL_CRITICAL_INJURIES : MENTAL_CRITICAL_INJURIES;
    
    const availableInjuries = injuryTable.filter(injuryDef => 
        !character.insightsAndDefects.find(item => item.originalId === injuryDef.id)
    );

    if (availableInjuries.length === 0) {
        console.warn(`All ${tableType.toLowerCase()} critical items from the table have already been added or there are no more unique items to add.`);
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableInjuries.length);
    const selectedInjuryDef = availableInjuries[randomIndex];

    const type: 'Insight' | 'Defect' | 'Injury' = selectedInjuryDef.status === 'Insight' ? 'Insight' : 
                                            (selectedInjuryDef.status === 'Fatal' || selectedInjuryDef.status === 'Chronic' ? 'Injury' : 'Defect');
    
    character.insightsAndDefects.push({
        id: getNextIdForType('InsightDefectInst'),
        originalId: selectedInjuryDef.id,
        name: selectedInjuryDef.injury,
        effect: selectedInjuryDef.effect,
        type: type
    });

    renderInsightsAndDefects();
    updateCalculations();
    saveCharacterToLocalStorage();
    console.log(`"${selectedInjuryDef.injury}" (${type}) added as a random ${tableType.toLowerCase()} item.`);
}

// --- DICE ROLLING LOGIC ---
interface RollDetails {
    name: string;                 // Display name of the roll
    basePool: number;             // Attribute (+ Skill if applicable)
    conditionMod: number;
    insightDefectMod: number;
    externalBonusValue: number;   // Bonus from weapon, equipment, etc.
    externalBonusLabel: string;   // "Weapon", "Equipment", or ""
    gmMod: number; // Represents "Other Dice"
    finalPool: number;
    results: number[];
    successes: number;
    isPushed: boolean;
    canPush: boolean;
    attributeForPushCheck: string; // Core attribute governing the roll (e.g., "Physique")
}
let currentRollDetails: RollDetails | null = null;


function updateDiceRollModalFinalPool() {
    if (!currentRollDetails) return 0;

    const basePool = currentRollDetails.basePool;
    const condMod = currentRollDetails.conditionMod;
    const insightDefectMod = currentRollDetails.insightDefectMod;
    const externalBonus = currentRollDetails.externalBonusValue;
    const gmMod = parseInt(getEl<HTMLInputElement>('gmModifierInput').value, 10) || 0;

    currentRollDetails.gmMod = gmMod;

    const finalPool = Math.max(0, basePool + condMod + insightDefectMod + externalBonus + gmMod);
    getEl<HTMLSpanElement>('diceRollFinalPoolDisplay').textContent = finalPool.toString();
    currentRollDetails.finalPool = finalPool;
    return finalPool;
}

function openDiceRollModal(
    rollType: 'attribute' | 'skill' | 'weapon', // 'weapon' implies a skill roll augmented by a weapon
    itemName: string, // Attribute name, Skill name, or descriptive name like "Attack with X"
    baseAttributeName?: string, 
    baseSkillName?: string, 
    appliedExternalBonusValue: number = 0,
    appliedExternalBonusLabel: string = ""
) {
    let calculatedBasePool = 0;
    let attributeForConditionAndPushCheck = ""; 
    let itemForInsightDefectCheck = itemName; 
    let displayName = itemName;

    if (rollType === 'attribute') {
        calculatedBasePool = character.attributes[itemName] || 0;
        attributeForConditionAndPushCheck = itemName;
    } else if (rollType === 'skill' && baseAttributeName) { // Covers generic skill rolls and equipment-augmented skill rolls
        calculatedBasePool = (character.attributes[baseAttributeName] || 0) + (character.skills[itemName] || 0);
        if (baseSkillName) { // If called from equipment or weapon, itemName is descriptive, baseSkillName is the actual skill
            calculatedBasePool = (character.attributes[baseAttributeName] || 0) + (character.skills[baseSkillName] || 0);
            itemForInsightDefectCheck = baseSkillName;
        } else { // direct skill roll, itemName is the skill
             itemForInsightDefectCheck = itemName;
        }
        attributeForConditionAndPushCheck = baseAttributeName;
    } else if (rollType === 'weapon' && baseSkillName && baseAttributeName) { // Specifically for weapons
        displayName = itemName; // itemName is already "Attack with X (Skill)"
        calculatedBasePool = (character.attributes[baseAttributeName] || 0) + (character.skills[baseSkillName] || 0);
        attributeForConditionAndPushCheck = baseAttributeName;
        itemForInsightDefectCheck = baseSkillName;
    }


    let conditionModifier = 0;
    const attrTypeForCondition = (["Physique", "Precision"].includes(attributeForConditionAndPushCheck)) ? "Physical" : "Mental";
    CONDITIONS_LIST.forEach(condDef => {
        if (character.conditions[condDef.id] && condDef.type === attrTypeForCondition) {
            conditionModifier -= 1;
        }
    });
    if (character.armor && (attributeForConditionAndPushCheck === "Physique" || attributeForConditionAndPushCheck === "Precision")) {
        conditionModifier += character.armor.agilityPenalty;
    }

    const insightDefectModifier = getModifierForStatFromEffects(itemForInsightDefectCheck, rollType === 'attribute');

    currentRollDetails = {
        name: displayName,
        basePool: calculatedBasePool,
        conditionMod: conditionModifier,
        insightDefectMod: insightDefectModifier,
        externalBonusValue: appliedExternalBonusValue,
        externalBonusLabel: appliedExternalBonusLabel,
        gmMod: 0,
        finalPool: 0,
        results: [],
        successes: 0,
        isPushed: false,
        canPush: false,
        attributeForPushCheck: attributeForConditionAndPushCheck,
    };

    getEl<HTMLSpanElement>('rollNameDisplay').textContent = currentRollDetails.name;
    getEl<HTMLSpanElement>('diceRollBasePoolDisplay').textContent = currentRollDetails.basePool.toString();
    getEl<HTMLSpanElement>('diceRollConditionModDisplay').textContent = currentRollDetails.conditionMod.toString();
    getEl<HTMLSpanElement>('diceRollInsightDefectModDisplay').textContent = currentRollDetails.insightDefectMod.toString();
    
    const extBonusLineEl = getEl<HTMLParagraphElement>('externalBonusLine');
    const extBonusLabelEl = getEl<HTMLSpanElement>('diceRollExternalBonusLabel');
    const extBonusValueEl = getEl<HTMLSpanElement>('diceRollExternalBonusValueDisplay');

    if (currentRollDetails.externalBonusValue !== 0 && currentRollDetails.externalBonusLabel) {
      extBonusLabelEl.textContent = currentRollDetails.externalBonusLabel;
      extBonusValueEl.textContent = currentRollDetails.externalBonusValue.toString();
      extBonusLineEl.style.display = 'block';
    } else {
      extBonusLineEl.style.display = 'none';
    }
    
    getEl<HTMLInputElement>('gmModifierInput').value = '0';
    
    currentRollDetails.finalPool = updateDiceRollModalFinalPool(); 

    getEl<HTMLSpanElement>('diceRollResultsDisplay').textContent = '';
    getEl<HTMLSpanElement>('diceRollSuccessesDisplay').textContent = '0';
    getEl<HTMLButtonElement>('pushRollBtn').style.display = 'none';
    getEl<HTMLButtonElement>('rollDiceInModalBtn').style.display = 'inline-block';
    
    openModal(diceRollModal);
}

function closeDiceRollModal() {
    closeModal(diceRollModal);
    currentRollDetails = null;
}

// Resource Roll Result Modal
let currentResourceRollConfirmCallback: (() => void) | null = null;
function openResourceRollResultModal(results: number[], successes: number, diceRolledCount: number) {
    getEl<HTMLSpanElement>('resourceRollDiceResultsDisplay').textContent = `[ ${results.join(', ')} ]`;
    getEl<HTMLSpanElement>('resourceRollSuccessesDisplay').textContent = successes.toString();
    
    currentResourceRollConfirmCallback = async () => {
        character.currentResourcesValue = successes;
        const currentResourcesInput = getEl<HTMLInputElement>('currentResourcesValue');
        if (currentResourcesInput) {
            currentResourcesInput.value = successes.toString().padStart(2, '0');
        }
        saveCharacterToLocalStorage();
        console.log(`Rolled ${diceRolledCount} dice for Resources. Results: [${results.join(', ')}]. Successes: ${successes}`);
        await sendSimpleRollToDiscord(
            "Resources Roll",
            `Rolled ${diceRolledCount} dice (Base Resources: ${character.resources})`,
            results,
            successes
        );
        closeResourceRollResultModal();
    };
    openModal(resourceRollResultModal);
}

function closeResourceRollResultModal() {
    closeModal(resourceRollResultModal);
    currentResourceRollConfirmCallback = null; 
}


async function sendRollToDiscord() {
    if (!currentRollDetails) return;

    const webhookUrl = character.discordWebhookUrl;
    const characterDisplayName = character.name || 'Character';

    let discordMessage = `**${characterDisplayName} rolled for ${currentRollDetails.name}** ${currentRollDetails.isPushed ? " (Pushed)" : ""}\n`;
    discordMessage += `Base: ${currentRollDetails.basePool}, Cond: ${currentRollDetails.conditionMod}, I/D: ${currentRollDetails.insightDefectMod}\n`;
    
    let externalBonusText = "";
    if (currentRollDetails.externalBonusValue !== 0 && currentRollDetails.externalBonusLabel) {
        externalBonusText = `${currentRollDetails.externalBonusLabel} Bonus: ${currentRollDetails.externalBonusValue}, `;
    }
    discordMessage += `${externalBonusText}Other: ${currentRollDetails.gmMod}\n`;
    
    discordMessage += `**Final Dice Pool: ${currentRollDetails.finalPool}**\n`;
    discordMessage += `Results: \`[ ${currentRollDetails.results.join(', ')} ]\`\n`;
    discordMessage += `**Successes: ${currentRollDetails.successes}**`;

    if (!webhookUrl) {
        console.log("Discord webhook URL not set. Logging locally.");
        const rollLogDisplay = getEl<HTMLDivElement>('rollLogDisplay');
        const p = document.createElement('p');
        p.textContent = `Local Log (${new Date().toLocaleTimeString()}): ${discordMessage.replace(/\*\*/g, '').replace(/`/g, '')}`; // Basic formatting removal for local log
        if (rollLogDisplay.firstChild) {
            rollLogDisplay.insertBefore(p, rollLogDisplay.firstChild);
        } else {
            rollLogDisplay.appendChild(p);
        }
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: discordMessage }),
        });
        if (!response.ok) {
            console.error('Error sending to Discord:', response.status, await response.text());
        } else {
            console.log('Roll sent to Discord.');
        }
    } catch (error) {
        console.error('Failed to send roll to Discord:', error);
    }
}

async function sendSimpleRollToDiscord(rollName: string, details: string, results: number[], successes: number, additionalInfo?: string) {
    const webhookUrl = character.discordWebhookUrl;
    const characterDisplayName = character.name || 'Character';

    let message = `**${characterDisplayName} performed a ${rollName}**\n`;
    message += `${details}\n`;
    if (results.length > 0) {
        message += `Results: \`[ ${results.join(', ')} ]\`\n`;
    }
    message += `**Successes: ${successes}**`;
    if (additionalInfo) {
        message += `\n${additionalInfo}`;
    }

    if (!webhookUrl) {
        console.log("Discord webhook URL not set. Logging locally.");
        const rollLogDisplay = getEl<HTMLDivElement>('rollLogDisplay');
        const p = document.createElement('p');
        // Simplified local log entry
        let localLogMessage = `Local Log (${new Date().toLocaleTimeString()}): ${characterDisplayName} - ${rollName}. ${details}. `;
        if (results.length > 0) {
            localLogMessage += `Results: [${results.join(', ')}]. `;
        }
        localLogMessage += `Successes: ${successes}.`;
        if (additionalInfo) {
            localLogMessage += ` ${additionalInfo}.`;
        }
        p.textContent = localLogMessage;

        if (rollLogDisplay.firstChild) {
            rollLogDisplay.insertBefore(p, rollLogDisplay.firstChild);
        } else {
            rollLogDisplay.appendChild(p);
        }
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message }),
        });
        if (!response.ok) {
            console.error('Error sending to Discord:', response.status, await response.text());
        } else {
            console.log('Roll sent to Discord.');
        }
    } catch (error) {
        console.error('Failed to send roll to Discord:', error);
    }
}


function handleRollDiceInModal() {
    if (!currentRollDetails) return;

    currentRollDetails.gmMod = parseInt(getEl<HTMLInputElement>('gmModifierInput').value, 10) || 0;
    currentRollDetails.finalPool = updateDiceRollModalFinalPool();

    if (currentRollDetails.finalPool <= 0) {
        getEl<HTMLSpanElement>('diceRollResultsDisplay').textContent = "Cannot roll 0 or fewer dice.";
        getEl<HTMLSpanElement>('diceRollSuccessesDisplay').textContent = "0";
        currentRollDetails.results = [];
        currentRollDetails.successes = 0;
        currentRollDetails.canPush = false;
        getEl<HTMLButtonElement>('pushRollBtn').style.display = 'none';
        sendRollToDiscord();
        return;
    }

    currentRollDetails.results = [];
    currentRollDetails.successes = 0;
    for (let i = 0; i < currentRollDetails.finalPool; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        currentRollDetails.results.push(roll);
        if (roll === 6) {
            currentRollDetails.successes++;
        }
    }

    getEl<HTMLSpanElement>('diceRollResultsDisplay').textContent = currentRollDetails.results.join(', ');
    getEl<HTMLSpanElement>('diceRollSuccessesDisplay').textContent = currentRollDetails.successes.toString();
    
    const attrForPush = currentRollDetails.attributeForPushCheck;
    const isPhysicalAttr = ["Physique", "Precision"].includes(attrForPush);
    const isMentalAttr = ["Logic", "Empathy"].includes(attrForPush);

    const canPushRoll = currentRollDetails.results.some(r => r !== 6) &&
                       !(isPhysicalAttr && character.physicalBroken) &&
                       !(isMentalAttr && character.mentalBroken);

    currentRollDetails.canPush = canPushRoll;
    getEl<HTMLButtonElement>('pushRollBtn').style.display = canPushRoll ? 'inline-block' : 'none';
    getEl<HTMLButtonElement>('rollDiceInModalBtn').style.display = 'none'; 

    sendRollToDiscord();
}

function handlePushRoll() {
    if (!currentRollDetails || !currentRollDetails.canPush) return;

    console.log("Pushing the roll! Character takes 1 Condition (simulated - GM should apply appropriate condition).");
    // Actual condition application should be handled by GM or player input after the roll.

    const newResults: number[] = [];
    let newSuccesses = 0;

    currentRollDetails.results.forEach(originalRoll => {
        if (originalRoll === 6) {
            newResults.push(originalRoll); 
            newSuccesses++;
        } else {
            const reroll = Math.floor(Math.random() * 6) + 1; 
            newResults.push(reroll);
            if (reroll === 6) {
                newSuccesses++;
            }
        }
    });

    currentRollDetails.results = newResults;
    currentRollDetails.successes = newSuccesses;
    currentRollDetails.isPushed = true;
    currentRollDetails.canPush = false; 

    getEl<HTMLSpanElement>('diceRollResultsDisplay').textContent = currentRollDetails.results.join(', ');
    getEl<HTMLSpanElement>('diceRollSuccessesDisplay').textContent = currentRollDetails.successes.toString();
    getEl<HTMLButtonElement>('pushRollBtn').style.display = 'none';

    sendRollToDiscord();
}

// --- Slow/Fast Actions Modals ---
function openActionsModal(modalElement: HTMLDivElement | null, tableBodyId: string, actionsList: ActionListItem[], title: string) {
    if (!modalElement) return;
    const tableBody = getEl<HTMLTableSectionElement>(tableBodyId);
    tableBody.innerHTML = ''; // Clear previous content
    
    actionsList.forEach(action => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell();
        nameCell.textContent = action.name;
        const skillCell = row.insertCell();

        const skillDef = SKILLS_LIST.find(s => s.name === action.skill);

        if (skillDef) {
            const button = document.createElement('button');
            button.textContent = action.skill;
            button.classList.add('roll-button', 'roll-action-skill-button'); // Add a specific class for styling if needed
            button.addEventListener('click', () => {
                openDiceRollModal('skill', action.skill, skillDef.attribute);
                closeModal(modalElement); // Close the current actions modal
            });
            skillCell.appendChild(button);
        } else {
            skillCell.textContent = action.skill; // If not a rollable skill, just display text
        }
    });

    const modalTitle = modalElement.querySelector('h3');
    if(modalTitle) modalTitle.textContent = title;
    openModal(modalElement);
}


function openSlowActionsModal() {
    openActionsModal(slowActionsModal, 'slowActionsTable', SLOW_ACTIONS_LIST, 'Slow Actions (p. 60)');
}
function closeSlowActionsModal() { closeModal(slowActionsModal); }

function openFastActionsModal() {
    openActionsModal(fastActionsModal, 'fastActionsTable', FAST_ACTIONS_LIST, 'Fast Actions (p. 60)');
}
function closeFastActionsModal() { closeModal(fastActionsModal); }


// --- Fear Test Modal ---
interface FearTestDetails {
    selectedAttribute: 'Logic' | 'Empathy' | '';
    attributeValue: number;
    conditionMod: number;
    braveTalentBonus: number;
    playersPresentBonus: number;
    otherDice: number;
    targetSuccesses: number | null;
    finalPool: number;
    results: number[];
    successes: number;
    roundsTerrified: number;
}
let currentFearTestDetails: FearTestDetails | null = null;

function getDefaultFearTestDetails(): FearTestDetails {
    return {
        selectedAttribute: '',
        attributeValue: 0,
        conditionMod: 0,
        braveTalentBonus: 0,
        playersPresentBonus: 0,
        otherDice: 0,
        targetSuccesses: null,
        finalPool: 0,
        results: [],
        successes: 0,
        roundsTerrified: 0,
    };
}

function updateFearTestModalDisplays() {
    if (!currentFearTestDetails || !character) return;

    // Update Logic and Empathy display values next to radio buttons
    getEl<HTMLSpanElement>('fearTestLogicValueDisplay').textContent = (character.attributes.Logic || 0).toString();
    getEl<HTMLSpanElement>('fearTestEmpathyValueDisplay').textContent = (character.attributes.Empathy || 0).toString();

    // 1. Determine selected attribute and its value for calculation
    const logicRadio = getEl<HTMLInputElement>('fearTestAttrLogic');
    const empathyRadio = getEl<HTMLInputElement>('fearTestAttrEmpathy');
    
    if (logicRadio.checked) {
        currentFearTestDetails.selectedAttribute = 'Logic';
    } else if (empathyRadio.checked) {
        currentFearTestDetails.selectedAttribute = 'Empathy';
    } else {
        currentFearTestDetails.selectedAttribute = '';
    }

    if (currentFearTestDetails.selectedAttribute) {
        currentFearTestDetails.attributeValue = character.attributes[currentFearTestDetails.selectedAttribute] || 0;
    } else {
        currentFearTestDetails.attributeValue = 0;
    }

    // 2. Condition Modifier
    let condMod = 0;
    CONDITIONS_LIST.forEach(cond => {
        if (character.conditions[cond.id] && cond.type === 'Mental') {
            condMod--;
        }
    });
     // Add modifiers from insights/defects specifically mentioning "Fear +/-X"
    character.insightsAndDefects.forEach(item => {
        const effectLower = item.effect.toLowerCase();
        const fearMatch = effectLower.match(/fear\s*([+\-−])\s*(\d+)/);
        if (fearMatch) {
            const sign = fearMatch[1];
            const value = parseInt(fearMatch[2], 10);
            condMod += (sign === '-' || sign === '−' ? -value : value);
        }
    });
    currentFearTestDetails.conditionMod = condMod;
    getEl<HTMLSpanElement>('fearTestConditionModDisplay').textContent = condMod.toString();

    // 3. Brave Talent Bonus
    currentFearTestDetails.braveTalentBonus = character.talents.some(tId => ALL_TALENTS_LIST.find(t => t.id === tId)?.name === "Brave") ? 1 : 0;
    getEl<HTMLSpanElement>('fearTestBraveTalentBonusDisplay').textContent = `+${currentFearTestDetails.braveTalentBonus}`;


    // 4. Players Present Bonus
    currentFearTestDetails.playersPresentBonus = parseInt(getEl<HTMLInputElement>('fearTestPlayersPresentInput').value, 10) || 0;

    // 5. Other Dice
    currentFearTestDetails.otherDice = parseInt(getEl<HTMLInputElement>('fearTestOtherDiceInput').value, 10) || 0;
    
    // 6. Target Successes
    const targetRadios = document.querySelectorAll<HTMLInputElement>('input[name="fearTestTargetSuccesses"]');
    let selectedTargetValue: string | null = null;
    targetRadios.forEach(radio => {
        if (radio.checked) {
            selectedTargetValue = radio.value;
        }
    });
    if (selectedTargetValue === "" || selectedTargetValue === null) {
        currentFearTestDetails.targetSuccesses = null;
    } else {
        const parsedValue = parseInt(selectedTargetValue, 10);
        currentFearTestDetails.targetSuccesses = isNaN(parsedValue) ? null : parsedValue;
    }


    // Final Pool
    currentFearTestDetails.finalPool = Math.max(0,
        currentFearTestDetails.attributeValue +
        currentFearTestDetails.conditionMod +
        currentFearTestDetails.braveTalentBonus +
        currentFearTestDetails.playersPresentBonus +
        currentFearTestDetails.otherDice
    );
    getEl<HTMLSpanElement>('fearTestFinalPoolDisplay').textContent = currentFearTestDetails.finalPool.toString();
}


function openFearTestModal() {
    currentFearTestDetails = getDefaultFearTestDetails();
    
    getEl<HTMLInputElement>('fearTestAttrLogic').checked = false;
    getEl<HTMLInputElement>('fearTestAttrEmpathy').checked = false;
    getEl<HTMLInputElement>('fearTestPlayersPresentInput').value = '0';
    getEl<HTMLInputElement>('fearTestOtherDiceInput').value = '0';
    
    const fearTargetNoneRadio = getEl<HTMLInputElement>('fearTargetNone');
    if (fearTargetNoneRadio) fearTargetNoneRadio.checked = true;


    getEl<HTMLSpanElement>('fearTestRollResultsDisplay').textContent = '';
    getEl<HTMLSpanElement>('fearTestSuccessesDisplay').textContent = '0';
    getEl<HTMLSpanElement>('fearTestRoundsTerrifiedDisplay').textContent = '0';
    getEl<HTMLParagraphElement>('fearTestRoundsTerrifiedLine').style.display = 'none';
    
    updateFearTestModalDisplays();
    openModal(fearTestModal);
}

function closeFearTestModal() {
    closeModal(fearTestModal);
    currentFearTestDetails = null;
}

async function handleRollFearTest() {
    if (!currentFearTestDetails || !character) return;
    
    updateFearTestModalDisplays(); // Ensure all latest inputs are captured, including radio button state

    if (!currentFearTestDetails.selectedAttribute) {
        alert("Please select an attribute (Logic or Empathy) for the Fear Test.");
        const logicRadio = getEl<HTMLInputElement>('fearTestAttrLogic');
        if (logicRadio) logicRadio.focus();
        return;
    }
    

    if (currentFearTestDetails.finalPool <= 0) {
        currentFearTestDetails.results = [];
        currentFearTestDetails.successes = 0;
        currentFearTestDetails.roundsTerrified = 0;
        getEl<HTMLSpanElement>('fearTestRollResultsDisplay').textContent = "Cannot roll 0 or fewer dice.";
        getEl<HTMLSpanElement>('fearTestSuccessesDisplay').textContent = '0';
        getEl<HTMLParagraphElement>('fearTestRoundsTerrifiedLine').style.display = 'none';
        await sendFearRollToDiscord();
        return;
    }

    currentFearTestDetails.results = [];
    currentFearTestDetails.successes = 0;
    for (let i = 0; i < currentFearTestDetails.finalPool; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        currentFearTestDetails.results.push(roll);
        if (roll === 6) currentFearTestDetails.successes++;
    }

    currentFearTestDetails.roundsTerrified = 0;
    if (currentFearTestDetails.targetSuccesses !== null && currentFearTestDetails.successes < currentFearTestDetails.targetSuccesses) {
        currentFearTestDetails.roundsTerrified = Math.floor(Math.random() * 6) + 1;
    }

    getEl<HTMLSpanElement>('fearTestRollResultsDisplay').textContent = currentFearTestDetails.results.join(', ');
    getEl<HTMLSpanElement>('fearTestSuccessesDisplay').textContent = currentFearTestDetails.successes.toString();
    if (currentFearTestDetails.roundsTerrified > 0) {
        getEl<HTMLSpanElement>('fearTestRoundsTerrifiedDisplay').textContent = currentFearTestDetails.roundsTerrified.toString();
        getEl<HTMLParagraphElement>('fearTestRoundsTerrifiedLine').style.display = 'block';
    } else {
        getEl<HTMLParagraphElement>('fearTestRoundsTerrifiedLine').style.display = 'none';
    }
    await sendFearRollToDiscord();
}

async function sendFearRollToDiscord() {
    if (!currentFearTestDetails) return;

    const characterDisplayName = character.name || 'Character';
    let details = `Attribute (${currentFearTestDetails.selectedAttribute}): ${currentFearTestDetails.attributeValue}, ` +
                  `Cond. Mod: ${currentFearTestDetails.conditionMod}, Brave: ${currentFearTestDetails.braveTalentBonus}, ` +
                  `Players Present: ${currentFearTestDetails.playersPresentBonus}, Other: ${currentFearTestDetails.otherDice}.`;
    if (currentFearTestDetails.targetSuccesses !== null) {
        details += ` Target: ${currentFearTestDetails.targetSuccesses}.`;
    }
    
    let additionalInfo = "";
    if (currentFearTestDetails.roundsTerrified > 0) {
        additionalInfo = `**Rounds Terrified: ${currentFearTestDetails.roundsTerrified}** (1D6)`;
    }

    await sendSimpleRollToDiscord(
        "Fear Test",
        details + `\n**Final Dice Pool: ${currentFearTestDetails.finalPool}**`,
        currentFearTestDetails.results,
        currentFearTestDetails.successes,
        additionalInfo
    );
}

// --- CLEAR CHARACTER SHEET ---
function handleClearCharacterSheet() {
    openConfirmationModal(
        "Confirm Clear Sheet",
        "Are you sure you want to clear the entire character sheet? All data will be lost. This action cannot be undone.",
        () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            initializeAllIdCounters(null); // Reset ID counters
            character = getDefaultCharacter();
            
            // Fully re-render the sheet
            populateDropdowns(); 
            renderAttributes();
            renderSkills(); 
            renderConditions();
            renderRelationships();
            renderArmor();
            renderWeapons();
            renderEquipment();
            renderInsightsAndDefects();
            renderNotes(); 
            
            updateSheetDisplay(); 
            updateCalculations(); 
            updateSuggestionDropdowns(); 
            
            saveCharacterToLocalStorage(); 
            console.log("Character sheet cleared.");
        }
    );
}


// --- EVENT LISTENERS ---
function setupEventListeners() {
    const addListener = (id: string, event: string, handler: (e: Event) => void) => {
        const el = getEl<HTMLElement>(id); if (el) el.addEventListener(event, handler);
        else console.warn(`Element with ID '${id}' not found for event listener.`);
    };
    ['ageGroup', 'age', 'archetype', 'motivation', 'trauma', 'darkSecret', 'memento', 'mementoUsed', 'resources', 'archetypeTalent', 'talentsOther', 'advantages', 'advantageUsed', 'discordWebhookUrl', 'experiencePoints', 'currentCapitalValue', 'currentResourcesValue'].forEach(id => addListener(id, id.includes('Used') ? 'change' : 'input', handleGenericInputChange));
    ['cond-physicalBroken', 'cond-mentalBroken'].forEach(id => addListener(id, 'change', handleConditionChange));

    addListener('archetype', 'change', handleGenericInputChange); 
    addListener('resources', 'change', handleGenericInputChange);
    addListener('archetypeTalent', 'change', handleGenericInputChange);
    
    addListener('exportCharacterBtn', 'click', exportCharacter);
    const importFileEl = getEl<HTMLInputElement>('importFile'); if (importFileEl) importFileEl.addEventListener('change', importCharacter);
    addListener('openDiscordSettingsBtn', 'click', openDiscordSettingsModal);
    addListener('clearCharacterSheetBtn', 'click', handleClearCharacterSheet);
    
    const characterNameDisplay = getEl<HTMLSpanElement>('characterNameDisplay');
    characterNameDisplay.addEventListener('click', switchToEditCharacterName);

    const characterNameInput = getEl<HTMLInputElement>('characterNameInput');
    characterNameInput.addEventListener('blur', saveAndDisplayCharacterName);
    characterNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveAndDisplayCharacterName();
        }
    });


    const attributesContainer = getEl('attributesContainer');
    if (attributesContainer) attributesContainer.addEventListener('click', (e) => { 
        const target = e.target as HTMLElement;
        const button = target.closest('.roll-button') as HTMLElement; 
        if (button && button.dataset.rolltype === 'attribute' && button.dataset.name) {
            const attrName = button.dataset.name;
            openDiceRollModal('attribute', attrName);
        }
    });
    const skillsTableBody = getEl('skillsTableBody');
    if (skillsTableBody) skillsTableBody.addEventListener('click', (e) => { 
        const target = e.target as HTMLElement;
        const button = target.closest('.roll-button') as HTMLElement; 
        if (button && button.dataset.rolltype === 'skill' && button.dataset.name) {
            const skillName = button.dataset.name;
            const skillDef = SKILLS_LIST.find(s => s.name === skillName);
            if (skillDef) {
                openDiceRollModal('skill', skillName, skillDef.attribute);
            }
        }
    });
    
    const openTalentModalBtn = getEl('openAddTalentModalBtn');
    const closeTalentModalBtn = getEl('closeTalentModalBtn');
    const addTalentModal = getEl<HTMLDivElement>('addTalentModal');
    const modalTalentSelect = getEl<HTMLSelectElement>('modalTalentSelect');
    const modalTalentDesc = getEl<HTMLDivElement>('modalTalentDescription');
    const confirmAddTalentBtn = getEl('confirmAddTalentBtn');

    if (openTalentModalBtn && addTalentModal && modalTalentSelect && modalTalentDesc) {
        openTalentModalBtn.addEventListener('click', () => {
            addTalentModal.style.display = 'block'; modalTalentSelect.innerHTML = '<option value="" title="">-- Select a Talent --</option>';
            const existingArchetypeTalentId = character.talents.find(tId => ALL_TALENTS_LIST.find(t => t.id === tId)?.archetype === character.archetype);
            ALL_TALENTS_LIST.filter(t => !t.archetype && !character.talents.includes(t.id) && t.id !== existingArchetypeTalentId).forEach(t => { const o=document.createElement('option');o.value=t.id;o.textContent=t.name;o.title=t.description;modalTalentSelect.appendChild(o); });
            modalTalentDesc.textContent = 'Description will appear here.'; updateSelectTooltip(modalTalentSelect); 
        });
    }
    if (closeTalentModalBtn && addTalentModal) { closeTalentModalBtn.addEventListener('click', () => closeModal(addTalentModal)); }
    if (modalTalentSelect && modalTalentDesc) modalTalentSelect.addEventListener('change', () => { const tId=modalTalentSelect.value; const tDef=ALL_TALENTS_LIST.find(t=>t.id===tId); modalTalentDesc.textContent=tDef?tDef.description:'Description...'; updateSelectTooltip(modalTalentSelect); });
    if (confirmAddTalentBtn && modalTalentSelect && addTalentModal) {
        confirmAddTalentBtn.addEventListener('click', () => { 
            const tId=modalTalentSelect.value; 
            if(tId && !character.talents.includes(tId)){
                character.talents.push(tId);
                renderTalents(); 
                saveCharacterToLocalStorage();
                console.log(`Talent "${ALL_TALENTS_LIST.find(t=>t.id === tId)?.name}" added.`);
            } 
            closeModal(addTalentModal); 
        });
    }

    addListener('openAddRelationshipModalBtn', 'click', () => openRelationshipModal());
    addListener('closeRelationshipModalBtn', 'click', closeRelationshipModal);
    addListener('saveRelationshipBtn', 'click', saveRelationship); 
    addListener('cancelRelationshipBtn', 'click', closeRelationshipModal);
    if (relationshipTypeSelect) { 
        relationshipTypeSelect.addEventListener('change', () => {
            if (relationshipTypeSelect.value === CUSTOM_RELATIONSHIP_TYPE_VALUE) {
                customRelationshipTypeContainer.style.display = 'block';
                relationshipTypeCustomInput.focus();
            } else {
                customRelationshipTypeContainer.style.display = 'none';
                relationshipTypeCustomInput.value = '';
            }
        });
    }
    const currentRelationshipModal = getEl<HTMLDivElement>('addRelationshipModal'); if (currentRelationshipModal) window.addEventListener('click', (e) => { if (e.target === currentRelationshipModal) closeRelationshipModal(); });
    addListener('closeDiscordSettingsModalBtn', 'click', closeDiscordSettingsModal);
    const currentDiscordModal = getEl<HTMLDivElement>('discordSettingsModal'); if (currentDiscordModal) window.addEventListener('click', (e) => { if (e.target === currentDiscordModal) closeDiscordSettingsModal(); });

    addListener('openArmorModalBtn', 'click', () => { populateGearModalSelect('modalArmorSelect', 'modalArmorDescription', ARMOR_DEFINITIONS, true); openModal(armorSelectionModal); });
    addListener('closeArmorModalBtn', 'click', () => closeModal(armorSelectionModal));
    addListener('confirmEquipArmorBtn', 'click', () => { 
        const id = getEl<HTMLSelectElement>('modalArmorSelect').value; 
        character.armor = id ? ARMOR_DEFINITIONS.find(a => a.id === id) || null : null; 
        renderArmor(); 
        updateCalculations(); 
        saveCharacterToLocalStorage(); 
        closeModal(armorSelectionModal); 
    });
    addListener('openWeaponModalBtn', 'click', () => { populateGearModalSelect('modalWeaponSelect', 'modalWeaponDescription', WEAPON_DEFINITIONS); openModal(weaponSelectionModal); });
    addListener('closeWeaponModalBtn', 'click', () => closeModal(weaponSelectionModal));
    addListener('confirmAddWeaponBtn', 'click', () => { 
        const id = getEl<HTMLSelectElement>('modalWeaponSelect').value; 
        const def = WEAPON_DEFINITIONS.find(w => w.id === id); 
        if (def) { 
            const alreadyHasWeapon = character.weapons.some(w => w.id === def.id);
            if (!alreadyHasWeapon) {
                character.weapons.push({ ...def, instanceId: getNextIdForType('WeaponInst') });
            }

            if (def.id === "rifle") {
                const rifleButtDef = WEAPON_DEFINITIONS.find(w => w.id === "rifle_butt");
                if (rifleButtDef && !character.weapons.some(w => w.id === rifleButtDef.id)) {
                     character.weapons.push({ ...rifleButtDef, instanceId: getNextIdForType('WeaponInst') });
                }
            } else if (def.id === "rifle_butt") {
                const rifleDef = WEAPON_DEFINITIONS.find(w => w.id === "rifle");
                if (rifleDef && !character.weapons.some(w => w.id === rifleDef.id)) {
                     character.weapons.push({ ...rifleDef, instanceId: getNextIdForType('WeaponInst') });
                }
            }
            renderWeapons(); 
            saveCharacterToLocalStorage(); 
        } 
        closeModal(weaponSelectionModal); 
    });
    addListener('openEquipmentModalBtn', 'click', () => { populateGearModalSelect('modalEquipmentSelect', 'modalEquipmentDescription', GENERAL_EQUIPMENT_DEFINITIONS); openModal(equipmentSelectionModal); });
    addListener('closeEquipmentModalBtn', 'click', () => closeModal(equipmentSelectionModal));
    addListener('confirmAddEquipmentBtn', 'click', () => { const id = getEl<HTMLSelectElement>('modalEquipmentSelect').value; const def = GENERAL_EQUIPMENT_DEFINITIONS.find(e => e.id === id); if (def) { character.equipment.push({ ...def, instanceId: getNextIdForType('EquipmentInst') }); renderEquipment(); saveCharacterToLocalStorage(); } closeModal(equipmentSelectionModal); });
    
    addListener('gainXpBtn', 'click', openGainXpModal);
    addListener('closeGainXpModalBtn', 'click', closeGainXpModal);
    addListener('confirmGainXpBtn', 'click', confirmGainXp);
    addListener('cancelGainXpBtn', 'click', closeGainXpModal);

    addListener('spendXpBtn', 'click', handleSpendFiveXp); 
    
    [armorSelectionModal, weaponSelectionModal, equipmentSelectionModal, gainXpModal, confirmationModal, diceRollModal, resourceRollResultModal, slowActionsModal, fastActionsModal, fearTestModal].forEach(m => { 
        if(m) window.addEventListener('click', (e) => { 
            if (e.target === m) {
                if (m === confirmationModal) closeConfirmationModal();
                else if (m === diceRollModal) closeDiceRollModal();
                else if (m === resourceRollResultModal) closeResourceRollResultModal();
                else if (m === slowActionsModal) closeSlowActionsModal();
                else if (m === fastActionsModal) closeFastActionsModal();
                else if (m === fearTestModal) closeFearTestModal();
                else closeModal(m);
            }
        }); 
    });


    const insightDefectSelect = getEl<HTMLSelectElement>('addInsightDefectSelect');
    const insightDefectDesc = getEl<HTMLDivElement>('selectedInsightDefectDescription');
    if (insightDefectSelect && insightDefectDesc) {
        insightDefectSelect.addEventListener('change', () => {
            const selectedId = insightDefectSelect.value;
            const itemDef = ALL_CRITICAL_TABLE_ITEMS.find(i => i.id === selectedId);
            insightDefectDesc.textContent = itemDef ? `Effect: ${itemDef.effect}` : 'Select an item to see its effect.';
            updateSelectTooltip(insightDefectSelect);
        });
    }
    addListener('confirmAddInsightDefectBtn', 'click', () => {
        const selectedId = getEl<HTMLSelectElement>('addInsightDefectSelect').value;
        const itemDef = ALL_CRITICAL_TABLE_ITEMS.find(i => i.id === selectedId);
        if (itemDef && !character.insightsAndDefects.find(item => item.originalId === selectedId)) { 
            const type = itemDef.status === 'Insight' ? 'Insight' : (itemDef.status === 'Fatal' || itemDef.status === 'Chronic' ? 'Injury' : 'Defect');
            character.insightsAndDefects.push({ id: getNextIdForType('InsightDefectInst'), originalId: itemDef.id, name: itemDef.injury, effect: itemDef.effect, type });
            renderInsightsAndDefects();
            updateCalculations();
            saveCharacterToLocalStorage();
        } else if (itemDef) {
            console.warn(`"${itemDef.injury}" has already been added.`);
        }
        getEl<HTMLSelectElement>('addInsightDefectSelect').value = ""; 
        if (insightDefectDesc) insightDefectDesc.textContent = 'Select an item to see its effect.'; 
    });

    addListener('addRandomPhysicalInjuryBtn', 'click', () => handleAddRandomInjury('Physical'));
    addListener('addRandomMentalInjuryBtn', 'click', () => handleAddRandomInjury('Mental'));

    addListener('addNewNoteBtn', 'click', addNewNoteHandler);


    const actionsMenuBtn = getEl('actionsMenuBtn');
    const actionsDropdownContent = getEl('actionsDropdownContent');

    if (actionsMenuBtn && actionsDropdownContent) {
        actionsMenuBtn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            actionsDropdownContent.classList.toggle('show');
        });
        window.addEventListener('click', (event) => {
            if (actionsDropdownContent.classList.contains('show')) {
                 if (!actionsMenuBtn.contains(event.target as Node) && !actionsDropdownContent.contains(event.target as Node)) {
                    actionsDropdownContent.classList.remove('show');
                }
            }
        });
    }
    
    addListener('confirmResourceRollBtn', 'click', () => {
        if (currentResourceRollConfirmCallback) {
            currentResourceRollConfirmCallback();
        }
    });
    addListener('closeResourceRollResultModalBtn', 'click', closeResourceRollResultModal);
    getEl<HTMLButtonElement>('rollResourcesBtn').addEventListener('click', handleRollResources);

    // Dice Roll Modal Buttons
    addListener('rollDiceInModalBtn', 'click', handleRollDiceInModal);
    addListener('pushRollBtn', 'click', handlePushRoll);
    addListener('closeDiceRollModalBtn', 'click', closeDiceRollModal);
    addListener('closeRollModalSecondaryBtn', 'click', closeDiceRollModal);
    addListener('gmModifierInput', 'input', () => updateDiceRollModalFinalPool()); 

    // Quick Actions Panel Buttons & Modals
    addListener('fearBtn', 'click', openFearTestModal);
    addListener('closeFearTestModalBtn', 'click', closeFearTestModal);
    addListener('closeFearTestModalSecondaryBtn', 'click', closeFearTestModal);
    addListener('rollFearTestBtn', 'click', handleRollFearTest);

    ['fearTestAttrLogic', 'fearTestAttrEmpathy', 'fearTestPlayersPresentInput', 'fearTestOtherDiceInput'].forEach(id => {
        const el = getEl<HTMLElement>(id);
        // Use 'change' for radio buttons, 'input' for text/number fields
        const eventType = (el && el.getAttribute('type') === 'radio') ? 'change' : 'input';
        if(el) el.addEventListener(eventType, updateFearTestModalDisplays);
    });
    document.querySelectorAll('input[name="fearTestTargetSuccesses"]').forEach(radio => {
        radio.addEventListener('change', updateFearTestModalDisplays);
    });


    addListener('slowActionsBtn', 'click', openSlowActionsModal);
    addListener('closeSlowActionsModalBtn', 'click', closeSlowActionsModal);
    addListener('closeSlowActionsModalSecondaryBtn', 'click', closeSlowActionsModal);
    
    addListener('fastActionsBtn', 'click', openFastActionsModal);
    addListener('closeFastActionsModalBtn', 'click', closeFastActionsModal);
    addListener('closeFastActionsModalSecondaryBtn', 'click', closeFastActionsModal);
    
}

// --- EXPORT/IMPORT ---
function exportCharacter() {
    const filename = `vaesen_char_${character.name.replace(/\s+/g, '_') || 'unnamed'}.json`;
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri); linkElement.setAttribute('download', filename);
    linkElement.click();
}

function importCharacter(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedRawData = e.target?.result as string;
                const importedParsedData = JSON.parse(importedRawData);

                const defaultChar = getDefaultCharacter();
                
                // Initialize ID counters based on the incoming data before any potential new ID generation
                initializeAllIdCounters(importedParsedData);

                // --- Migration logic similar to loadCharacterFromLocalStorage ---
                const finalNotes = migrateListIds<NoteItem>(importedParsedData.notes, 'Note', { title: "Untitled Note", content: "", isLocked: true });
                const finalRelationships = migrateListIds<RelationshipItem>(importedParsedData.relationships, 'Relationship', { pcName: "", type: "" });
                const finalWeapons = migrateWeaponEquipmentIds<WeaponItem>(importedParsedData.weapons, 'WeaponInst', WEAPON_DEFINITIONS);
                const finalEquipment = migrateWeaponEquipmentIds<EquipmentItem>(importedParsedData.equipment, 'EquipmentInst', GENERAL_EQUIPMENT_DEFINITIONS);
                const finalInsightsDefects = migrateListIds<InsightDefectItem>(importedParsedData.insightsAndDefects, 'InsightDefectInst', { originalId: "", name: "", effect: "", type: "Defect" });

                // Assign to the global character object, merging deeply and correctly
                character = {
                    ...defaultChar, 
                    ...importedParsedData,
                    attributes: { ...defaultChar.attributes, ...(importedParsedData.attributes || {}) },
                    skills: { ...defaultChar.skills, ...(importedParsedData.skills || {}) },
                    conditions: { ...defaultChar.conditions, ...(importedParsedData.conditions || {}) },
                    physicalBroken: importedParsedData.physicalBroken !== undefined ? importedParsedData.physicalBroken : false,
                    mentalBroken: importedParsedData.mentalBroken !== undefined ? importedParsedData.mentalBroken : false,
                    age: importedParsedData.age !== undefined ? importedParsedData.age : null,
                    mementoUsed: importedParsedData.mementoUsed !== undefined ? importedParsedData.mementoUsed : false,
                    advantageUsed: importedParsedData.advantageUsed !== undefined ? importedParsedData.advantageUsed : false,
                    experiencePoints: importedParsedData.experiencePoints !== undefined ? importedParsedData.experiencePoints : 0,
                    currentCapitalValue: importedParsedData.currentCapitalValue !== undefined ? importedParsedData.currentCapitalValue : null,
                    currentResourcesValue: importedParsedData.currentResourcesValue !== undefined ? importedParsedData.currentResourcesValue : null,
                    actualCapital: importedParsedData.actualCapital || defaultChar.actualCapital, 
                    talents: Array.isArray(importedParsedData.talents) ? importedParsedData.talents : [],
                    armor: importedParsedData.armor || null, 
                    notes: finalNotes,
                    relationships: finalRelationships,
                    weapons: finalWeapons,
                    equipment: finalEquipment,
                    insightsAndDefects: finalInsightsDefects,
                    resources: (typeof importedParsedData.resources === 'number' && importedParsedData.resources >= 1 && importedParsedData.resources <= 8) ? importedParsedData.resources : defaultChar.resources,
                };
                // End migration logic

                saveCharacterToLocalStorage(); // Save the NEW character data to localStorage
                
                // Refresh the entire UI
                updateSheetDisplay(); 
                updateCalculations(); 
                updateSuggestionDropdowns();
                console.log("Character imported successfully.");

            } catch (err) { 
                console.error("Error importing character:", err); 
                alert("Failed to import character. Ensure the file is a valid JSON export from this tool."); 
            }
        };
        reader.readAsText(file);
        (event.target as HTMLInputElement).value = ''; // Reset file input
    }
}


// --- RUN ---
document.addEventListener('DOMContentLoaded', init);
