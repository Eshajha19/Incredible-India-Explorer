/**
 * folk-tales.js
 * Indian Folk Tales Explorer - Data & Application Logic
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const folkTalesData = [
  {
    id: "birbal-khichdi",
    title: "Birbal's Khichdi",
    state: "Uttar Pradesh",
    stateCode: "up",
    region: "North",
    category: "Royal Trickster",
    moral: "Warmth of hope and empathy can overcome cold injustice.",
    summary: "Birbal uses a slow-cooking pot placed high above a small flame to teach Emperor Akbar a gentle lesson about human resilience and warmth.",
    fullStory: "On a freezing winter evening in Agra, Emperor Akbar mused that no man could stand in the icy waters of the Yamuna River all night for money. A poor brahmin took up the challenge and survived the night, guided only by the distant light of a palace lamp. However, Akbar denied him his reward, claiming the light gave him warmth. Hearing of this injustice, Birbal stayed away from court the next day. When Akbar visited Birbal's home, he found Birbal cooking khichdi in a pot hanging six feet above a small fire. Akbar laughed, saying the heat could never reach the pot. Birbal replied, 'If a small lamp miles away can warm a man in the river, surely this fire can cook my khichdi.' Realizing his error, Akbar rewarded the poor man handsomely.",
    image: "assets/ancient_india_illustration.png",
    tags: ["birbal", "akbar", "khichdi", "wit", "royal", "uttar pradesh", "agra"]
  },
  {
    id: "tenali-brinjal",
    title: "Tenali Raman & the Golden Brinjal",
    state: "Andhra Pradesh",
    stateCode: "ap",
    region: "South",
    category: "Royal Trickster",
    moral: "Wit can save loved ones while upholding court dignity.",
    summary: "Tenali Raman clever tricks King Krishnadevaraya's royal garden guards to bring rare brinjals for his wife, then outsmarts court gossip.",
    fullStory: "King Krishnadevaraya grew rare, delicious brinjals in a high-security royal garden. Tenali Raman's wife longed to taste them, so Tenali plucked a few under the cover of night. Knowing his young son might accidentally mention the brinjal curry to royal spies, Tenali poured water over his sleeping son at midnight, woke him, and pretended there was a rainstorm. The next morning, when rumours reached the court, the son told the King, 'Father brought brinjals on the night of the great rainstorm!' Since the weather had been clear and dry all night, the court dismissed the story as a child's dream, saving Tenali from punishment.",
    image: "assets/culture_default.png",
    tags: ["tenali raman", "brinjal", "vijayanagara", "andhra pradesh", "wit", "court"]
  },
  {
    id: "gopal-bhar-sweet",
    title: "Gopal Bhar and the Flying Rasgulla",
    state: "West Bengal",
    stateCode: "wb",
    region: "East",
    category: "Royal Trickster",
    moral: "Quick intelligence triumphs over arrogance.",
    summary: "Gopal Bhar uses humor and quick thinking to defeat a boastful foreign scholar who challenged Raja Krishnachandra's court.",
    fullStory: "A prideful scholar visited Raja Krishnachandra of Nadia, challenging the court to explain how a sweet could fly across the room without being touched. While scholars searched ancient scriptures, Gopal Bhar requested a bowl of hot rasgullas. He ate one, tossed another into his mouth from a distance, and proclaimed, 'Behold, the sweet flew into my mouth through pure willpower and hunger!' The court burst into laughter, and the humbled visitor conceded defeat, admiring Bengal's legendary court jester.",
    image: "assets/rasgulla.png",
    tags: ["gopal bhar", "rasgulla", "bengal", "nadia", "trickster", "sweet"]
  },
  {
    id: "merchant-demon-wb",
    title: "The Brahmin and the Ghost of the Palm Tree",
    state: "West Bengal",
    stateCode: "wb",
    region: "East",
    category: "Myth & Legend",
    moral: "Presence of mind is stronger than physical fear.",
    summary: "A poor weaver tricks a terrifying Mechho Bhoot (fish-loving demon) into becoming his hard-working domestic servant.",
    fullStory: "In a village near the Sunderbans, a poor weaver encountered a Mechho Bhoot residing in a tall palm tree. The ghost threatened to eat him unless he provided fresh fish every day. Remembering that ghosts fear brass mirrors, the weaver produced a mirror from his bag and held it up to the ghost. Seeing its own scary reflection, the ghost believed another powerful demon lived inside the glass. Terrified of being trapped, the ghost promised to chop wood, farm fields, and bring fish for the weaver every day in exchange for its freedom.",
    image: "assets/travel_forests.png",
    tags: ["bhooter galpo", "ghost", "bengal", "demon", "banyan", "sunderbans"]
  },
  {
    id: "blue-jackal-mp",
    title: "The Blue Jackal",
    state: "Madhya Pradesh",
    stateCode: "mp",
    region: "Central",
    category: "Animal Fable",
    moral: "False pretences cannot hide one's true nature forever.",
    summary: "A jackal accidentally falls into a vat of blue dye and proclaims himself king of the jungle until instinct betrays him.",
    fullStory: "Chandaraka the jackal wandered into a weaver's town while fleeing stray dogs and fell into a tub of blue dye. Emerging bright blue, he returned to the forest of Narmada Valley. The animals, awed by his celestial color, proclaimed him king. For weeks, Chandaraka enjoyed royal luxury while exiling other jackals. One full moon night, a pack of jackals howled in the distance. Unable to resist his natural instinct, Chandaraka threw back his head and howled back. Realizing he was just a jackal, the forest animals chased him away.",
    image: "assets/travel_forests.png",
    tags: ["panchatantra", "blue jackal", "madhya pradesh", "fable", "animals", "narmada"]
  },
  {
    id: "manasa-legend-wb",
    title: "The Legend of Goddess Manasa & Chand Sadagar",
    state: "West Bengal",
    stateCode: "wb",
    region: "East",
    category: "Myth & Legend",
    moral: "Devotion and devotion to righteousness overcome tragedy.",
    summary: "Behula travels across rivers on a iron raft to bring her husband Lakhindar back to life through sheer devotion.",
    fullStory: "Chand Sadagar, a wealthy sea merchant, refused to worship the snake deity Manasa Devi. Enraged, Manasa vowed that Chand's youngest son Lakhindar would die of snakebite on his wedding night. Despite building an airtight iron chamber, a tiny serpent killed Lakhindar. Devoted bride Behula refused to accept death. She built a banana-stem raft and navigated the divine rivers to the heavenly realm of the gods. Through her mesmerising dance and steadfast devotion, she pleased Shiva and Manasa, winning back Lakhindar's life and restoring her family's fortune.",
    image: "assets/heroriver.png",
    tags: ["manasa", "behula", "lakhindar", "bengal", "river", "legend", "mythology"]
  },
  {
    id: "tejimola-assam",
    title: "The Tale of Tejimola",
    state: "Assam",
    stateCode: "as",
    region: "Northeast",
    category: "Tribal Lore",
    moral: "Innocence and truth endure beyond cruelty.",
    summary: "A gentle girl named Tejimola endures stepmother cruelty, transforming into a lotus and bird before regaining human form.",
    fullStory: "Tejimola was a beloved girl in an Assamese village whose jealous stepmother tormented her while her father was away on river trade. The stepmother buried Tejimola, but from her resting spot grew a vibrant orange plant. When the stepmother destroyed it, a sweet lotus bloomed in the village pond. A passing merchant heard the lotus singing about its gentle past. When Tejimola's father returned and touched the lotus blossom, Tejimola was restored to her human self, and justice prevailed across the valley.",
    image: "assets/bihu.png",
    tags: ["tejimola", "assam", "folktale", "northeast", "lotus", "oral tradition"]
  },
  {
    id: "banjara-dog-gj",
    title: "The Faithful Dog of Banjara",
    state: "Gujarat",
    stateCode: "gj",
    region: "West",
    category: "Moral & Wit",
    moral: "Hasty decisions based on mistrust lead to eternal regret.",
    summary: "The heartbreaking story of Loha Garh lake where a merchant misjudged the loyalty of his brave canine companion.",
    fullStory: "A nomad named Lihori Banjara pledged his loyal dog to a wealthy merchant of Banaskantha as collateral for a loan. One night, thieves broke into the merchant's mansion and hid stolen treasure in a nearby pond. The dog barked and led the merchant straight to the hidden goods. Deeply grateful, the merchant wrote a note clearing the debt, tied it around the dog's neck, and sent him home. Seeing the dog return early, Banjara assumed the dog had deserted his duty and struck him dead in anger. Discovering the note moments later, Banjara wept bitterly and constructed the famous Banjara Lake in Gujarat to honor the dog's memory.",
    image: "assets/West_India.png",
    tags: ["banjara", "dog", "gujarat", "loyalty", "banaskantha", "lake"]
  },
  {
    id: "jackal-crocodile-kl",
    title: "The Clever Jackal of Kuttanad",
    state: "Kerala",
    stateCode: "kl",
    region: "South",
    category: "Animal Fable",
    moral: "Intelligence beats physical strength every time.",
    summary: "A smart jackal outwits an ambushing crocodile along the backwaters of Kerala.",
    fullStory: "A jackal living near the Vembanad Lake loved eating ripe sugarcane. A crocodile living in the backwaters offered to carry him across the river to a sugarcane field, intending to devour him halfway back. On the return trip, the crocodile submerged, saying, 'I must eat your heart today!' The jackal calmly smiled and said, 'Oh friend! Why didn't you tell me earlier? I leave my heart hanging on the jambul tree by the shore to keep it safe while swimming.' The credulous crocodile swam back to shore, where the jackal leapt to safety and scurried away laughing.",
    image: "assets/travel_beaches.png",
    tags: ["kerala", "jackal", "crocodile", "backwaters", "kuttanad", "animal fable"]
  },
  {
    id: "weaver-kanchipuram-tn",
    title: "The Master Weaver's Silk Thread",
    state: "Tamil Nadu",
    stateCode: "tn",
    region: "South",
    category: "Moral & Wit",
    moral: "True art lies in dedication and harmony, not greedy competition.",
    summary: "A humble weaver in Kanchipuram creates a saree woven with golden sunlight and rainwater.",
    fullStory: "In ancient Kanchipuram, two weavers competed for royal patron appointment. The first weaver used expensive ruby-dusted threads but demanded high wages. The second weaver, Varadhan, observed nature closely: he gathered fine silk, dyed it with indigo and turmeric, and wove subtle peacock motifs reflecting the morning light. When the King inspected both sarees, Varadhan's creation radiated warmth and comfort without single loose thread. Asked his secret, Varadhan said, 'I weave not just silk, but love for my craft.' The King appointed him royal master weaver.",
    image: "assets/KanchipuramSilk.png",
    tags: ["kanchipuram", "silk", "tamil nadu", "craft", "weaver", "south india"]
  },
  {
    id: "ghost-banyan-br",
    title: "Gonu Jha and the Ghost in the Tree",
    state: "Bihar",
    stateCode: "br",
    region: "East",
    category: "Royal Trickster",
    moral: "Fear exists only in the mind; courage dismantles it.",
    summary: "Mithila's famous wit Gonu Jha tricks a night ghost into carrying his heavy luggage home.",
    fullStory: "While returning late at night through a dark forest in Darbhanga, Gonu Jha encountered a ghost lurking in a banyan tree. The ghost roared, 'I shall possess you!' Gonu Jha didn't panic. He bowed low and said, 'O mighty Spirit, I have been searching for an esteemed servant like you. Carry my heavy bag of grains to my home, and I shall pay you in holy incense!' Surprised by the respect and offer, the ghost carried the heavy load all the way to Gonu Jha's doorstep. When they arrived, Gonu sprinkled sacred tulsi water, sending the ghost scurrying back into the woods.",
    image: "assets/travel_hidden.png",
    tags: ["gonu jha", "bihar", "mithila", "wit", "ghost", "banyan"]
  },
  {
    id: "lion-rabbit-rj",
    title: "The Lion and the Well of Thar",
    state: "Rajasthan",
    stateCode: "rj",
    region: "West",
    category: "Animal Fable",
    moral: "Wisdom can conquer brute force.",
    summary: "A tiny hare saves the desert animals of Thar from a cruel lion using a deep reflection.",
    fullStory: "Bhasuraka, a terrifying lion in the scrublands of Rajasthan, demanded one animal every day for his meal. When it was the small hare's turn, he arrived intentionally late. The furious lion roared, demanding an explanation. The hare trembled and said, 'My lord, another giant lion stopped me on the road, claiming he was the true king of Thar!' Intrigued and enraged, Bhasuraka demanded to see his rival. The hare led him to a deep stepwell. Looking down, the lion saw his own reflection and heard his roar echo back. Thinking it was the rival, he leaped into the well and drowned.",
    image: "assets/travel_deserts.png",
    tags: ["rajasthan", "thar", "panchatantra", "lion", "rabbit", "stepwell"]
  },
  {
    id: "crow-black-ml",
    title: "Why the Crow is Black (Khasi Folk Tale)",
    state: "Meghalaya",
    stateCode: "ml",
    region: "Northeast",
    category: "Tribal Lore",
    moral: "Patience and humility preserve natural beauty.",
    summary: "A traditional Khasi story explaining how the peacock got its iridescent feathers and the crow its black coat.",
    fullStory: "In ancient times, all birds had plain white feathers. The crow and the peacock decided to paint each other's plumage using forest dyes. The crow took great care, painting the peacock with vibrant green, blue, and gold hues. However, when it was the peacock's turn, the crow grew impatient and restless, eager to fly away and brag. In his haste, the crow knocked over the dye bowl, drenching himself entirely in black charcoal ink. Since that day, the peacock struts in glory while the crow sports a glossy black coat.",
    image: "assets/Khasitr.png",
    tags: ["khasi", "meghalaya", "crow", "peacock", "tribal lore", "northeast"]
  },
  {
    id: "singing-mango-od",
    title: "The Singing Mango Tree of Simlipal",
    state: "Odisha",
    stateCode: "od",
    region: "East",
    category: "Tribal Lore",
    moral: "Nature rewards those who listen with respect.",
    summary: "An Adivasi youth learns the secret songs of the forest from a magical mango tree in Mayurbhanj.",
    fullStory: "Deep in the Simlipal forests of Odisha, a young Santhal hunter named Kanhu found a ancient mango tree whose leaves chimed like bells in the breeze. Unlike other hunters who broke branches, Kanhu sat quietly under its shade and sang melodious folk tunes. Touched by his purity, the tree dropped golden mangoes containing seeds that cured village ailments. Kanhu shared the seeds with all tribes, teaching them to protect the forest that sustained their lives.",
    image: "assets/Santhaltr.png",
    tags: ["odisha", "santhal", "simlipal", "mango tree", "nature", "tribal"]
  },
  {
    id: "clever-daughter-pb",
    title: "The Daughter-in-Law's Riddle",
    state: "Punjab",
    stateCode: "pb",
    region: "North",
    category: "Moral & Wit",
    moral: "Generosity coupled with intelligence builds prosperity.",
    summary: "A farm maiden solves a village elder's riddle to save her family from debt during harvest season.",
    fullStory: "In a village near Amritsar, a wealthy landlord pledged to double the grain share of any farmer who could bring him 'a bundle of wind tied in silk and water carried in a sieve'. While many failed, young Harpreet took a silk kite (which catches the wind) and brought a frozen block of ice (water held in a wicker basket). Delighted by her brilliant interpretation, the landlord kept his promise and honored her wisdom across the district.",
    image: "assets/North_India.png",
    tags: ["punjab", "riddle", "harvest", "amritsar", "wit", "farmer"]
  },
  {
    id: "baiga-fire-mp",
    title: "The Baiga Tale of the First Flame",
    state: "Madhya Pradesh",
    stateCode: "mp",
    region: "Central",
    category: "Tribal Lore",
    moral: "Fire must be cherished with reverence and responsibility.",
    summary: "The Baiga tribe's creation myth of how bamboo rubbings brought warmth to cold mountain nights.",
    fullStory: "In the dense Maikal Hills of Central India, the Baiga people lived in bitter cold darkness. The forest spirit Bhagwan saw their suffering and instructed two bamboo stalks to sway in the gale. As the dry stalks rubbed against each other, a bright spark leapt onto dry leaves, igniting the first fire. The Baiga elders promised never to waste wood or destroy living trees, establishing a sacred bond between tribal life and the forest flame.",
    image: "assets/Central_India.png",
    tags: ["baiga", "madhya pradesh", "maikal", "tribal lore", "fire", "myth"]
  },
  {
    id: "golden-pumpkin-hp",
    title: "The Magical Golden Pumpkin of Kullu",
    state: "Himachal Pradesh",
    stateCode: "hp",
    region: "North",
    category: "Moral & Wit",
    moral: "Greed turns sweetness into bitter ash; kindness brings true reward.",
    summary: "Two brothers in Kullu Valley receive different pumpkins from an mountain hermit based on their intentions.",
    fullStory: "In a high valley in Himachal, a poor brother shared his last piece of corn bread with a shivering sadhu. In return, the sadhu gifted him a pumpkin seed. When grown, the pumpkin opened to reveal shiny gold coins. Seeing this, his greedy brother rushed to find the sadhu, threw a piece of bread at him, and demanded a seed. He planted it eagerly, but when he cut his pumpkin open, hundreds of buzzing mountain hornets flew out, teaching him a lesson in genuine kindness.",
    image: "assets/Manalileh.png",
    tags: ["himachal", "kullu", "pumpkin", "sadhu", "moral", "mountains"]
  },
  {
    id: "honest-woodcutter-ka",
    title: "The Woodcutter of Malnad",
    state: "Karnataka",
    stateCode: "ka",
    region: "South",
    category: "Moral & Wit",
    moral: "Honesty is the truest gold.",
    summary: "A humble woodcutter near the Sharavathi River earns the favor of the River Goddess through truthfulness.",
    fullStory: "While chopping wood near a misty waterfall in Malnad, a poor woodcutter dropped his iron axe into the deep river. Devastated, he wept. The Goddess of the River emerged holding a golden axe. 'Is this yours?' she asked. He replied, 'No, my axe is simple iron.' She then brought a silver axe, but he refused again. Touched by his honesty, she rewarded him with all three axes. When his greedy neighbour tried the same trick and lied, the Goddess disappeared into the depths, taking even his original axe away.",
    image: "assets/travel_waterfalls.png",
    tags: ["karnataka", "malnad", "sharavathi", "honesty", "woodcutter", "river"]
  },
  {
    id: "mangarh-legend-rj",
    title: "The Legend of Mangarh Hill",
    state: "Rajasthan",
    stateCode: "rj",
    region: "West",
    category: "Tribal Lore",
    moral: "Unity and sacrifice for freedom endure through eternity.",
    summary: "The heroic Bhil tribal legend of Govind Guru and the sacred hills of Banswara.",
    fullStory: "Among the Bhil tribe of southern Rajasthan, elders tell the legendary tale of Govind Guru, who united the hill communities against oppressive taxes and social evils. Gathering on Mangarh Hill, thousands of Bhil men and women stood arm-in-arm, singing songs of self-respect and freedom. Their bravery turned the hill into a sacred memorial of sacrifice, commemorated every year with traditional drum dances and floral offerings.",
    image: "assets/Bhiltr.png",
    tags: ["bhil", "rajasthan", "banswara", "mangarh", "tribal lore", "heroic"]
  },
  {
    id: "stolen-horse-br",
    title: "Gonu Jha & the Thief's Confession",
    state: "Bihar",
    stateCode: "br",
    region: "East",
    category: "Royal Trickster",
    moral: "Guilt reveals what evidence conceals.",
    summary: "Gonu Jha uses psychological trickery to catch a horse thief in broad daylight.",
    fullStory: "A valuable horse was stolen from a village chief in Bihar. Three suspects were detained, but all denied the crime. Gonu Jha took all three into a dark hut containing a donkey whose tail was smeared with fragrant black paste. He told them, 'Touch the donkey's tail. The magical donkey will bray when the true thief touches it.' Two innocent men confidently touched the tail. The guilty thief, terrified of the braying donkey, only pretended to touch it. When they emerged into sunlight, Gonu inspected their hands—the thief's hands were completely clean!",
    image: "assets/East_India.png",
    tags: ["gonu jha", "bihar", "wit", "trickster", "thief", "horse"]
  },
  {
    id: "four-blind-men-up",
    title: "The Blind Men and the Elephant",
    state: "Uttar Pradesh",
    stateCode: "up",
    region: "North",
    category: "Moral & Wit",
    moral: "Truth has many sides; tolerance bridges partial understandings.",
    summary: "Four scholars touch different parts of an elephant in Varanasi and argue fiercely until a sage explains perspective.",
    fullStory: "In ancient Varanasi, four blind scholars encountered a tame royal elephant. The first touched the leg and claimed an elephant was like a sturdy tree trunk. The second touched the trunk and insisted it was like a thick python. The third touched the ear and swore it was a giant fan. The fourth touched the side and called it a solid wall. As they argued loudly, a passing sage smiled and said, 'Each of you is right in part, but wrong in whole. Truth is vast—listen to one another to see the full picture.'",
    image: "assets/Taj_Mahal.png",
    tags: ["varanasi", "elephant", "uttar pradesh", "parable", "philosophy", "wisdom"]
  },
  {
    id: "wise-tiger-mn",
    title: "The Wise Tiger of Jiribam",
    state: "Manipur",
    stateCode: "mn",
    region: "Northeast",
    category: "Animal Fable",
    moral: "Promises made must be honored, but fairness guides justice.",
    summary: "A Manipuri fable about a tiger who acts as a fair judge between a man and a greedy python.",
    fullStory: "A traveller freed a python trapped beneath a fallen tree in the hills of Manipur. Once free, the ungrateful python prepared to swallow the traveller. The man pleaded for arbitration. They asked a banyan tree and a cow, both of whom complained that humans were ungrateful. Finally, they met a tiger. The tiger scratched his head and said, 'I cannot judge unless I see exactly how the python was trapped.' The python slithered back under the heavy log to demonstrate. The tiger then looked at the traveller and whispered, 'Walk away quickly!'",
    image: "assets/Northeast_India.png",
    tags: ["manipur", "jiribam", "tiger", "python", "fable", "northeast"]
  },
  {
    id: "grateful-cobra-mh",
    title: "The Cobra of Nag Panchami",
    state: "Maharashtra",
    stateCode: "mh",
    region: "West",
    category: "Myth & Legend",
    moral: "Respect for nature's creatures brings protection and peace.",
    summary: "A farmer's daughter in Shirala earns the protection of a cobra through gentleness and milk offerings.",
    fullStory: "In the town of Shirala, Maharashtra, a farmer accidentally disturbed a cobra's nest while ploughing his fields. Angry, the cobra slithered to the farmer's house. However, the farmer's young daughter greeted the snake with a small bowl of fresh milk and flowers, bowing respectfully. The cobra drank the milk peacefully, spared the family, and promised to protect the crops from rodents every harvest season. This tradition gave rise to the celebrated Nag Panchami festival in Maharashtra.",
    image: "assets/Warlitr.png",
    tags: ["maharashtra", "shirala", "nag panchami", "cobra", "festival", "legend"]
  },
  {
    id: "enchanted-lake-sk",
    title: "The Legend of Tsomgo Lake",
    state: "Sikkim",
    stateCode: "sk",
    region: "Northeast",
    category: "Myth & Legend",
    moral: "Listen to environmental signs and respect sacred waters.",
    summary: "A high-altitude glacial lake in Sikkim whose color changes were foretold by Buddhist monks.",
    fullStory: "Perched at 12,000 feet in Sikkim, Tsomgo Lake was originally the site of a peaceful village. Monks living nearby had a vision that the valley would soon be submerged by pristine mountain waters. They warned the villagers to relocate to higher ground. Those who listened moved up the pine slopes. That night, snowmelt flooded the valley, creating the holy lake. Sikkimese legends hold that the changing shades of the lake predict the weather and fortune of the coming year.",
    image: "assets/travel_mountains.png",
    tags: ["sikkim", "tsomgo", "lake", "mountains", "buddhist", "legend"]
  },
  {
    id: "chinar-secret-jk",
    title: "The Secret of the Kashmir Chinar",
    state: "Jammu and Kashmir",
    stateCode: "jk",
    region: "North",
    category: "Myth & Legend",
    moral: "Love for one's homeland burns as bright as autumn leaves.",
    summary: "A Kashmiri folk legend explaining the radiant crimson leaves of the majestic Chinar tree.",
    fullStory: "Long ago in the Kashmir Valley, a gentle princess named Zoon was deeply attached to the valley's green gardens. When invaders threatened the peaceful valley, the princess prayed to the snow-capped mountains for the protection of her people. It is said that the spirit of the valley absorbed the warmth of her pure heart, infusing the leaves of the Chinar trees. Every autumn, the leaves turn into brilliant shade of fiery crimson, reminding Kashmiris of the eternal warmth guarding their homeland.",
    image: "assets/Manalileh.png",
    tags: ["kashmir", "chinar", "jammu and kashmir", "autumn", "legend", "valley"]
  },
  {
    id: "golden-deer-pb",
    title: "The Legend of the Golden Deer of Shekhupura",
    state: "Punjab",
    stateCode: "pb",
    region: "North",
    category: "Moral & Wit",
    moral: "Compassion toward wildlife brings true royalty.",
    summary: "A Punjabi prince chooses mercy over hunting, discovering a hidden oasis.",
    fullStory: "Prince Jahangir was hunting in the dense riverine forests of Punjab when he cornered a swift, golden-furred deer. As he drew his bow, he looked into the deer's gentle eyes and lowered his weapon. Instead of fleeing, the deer led the Prince through dense foliage to a hidden crystal spring during severe drought. Grateful for the discovery that saved his soldiers and horses, the Prince built a royal tower at the site and declared the surrounding forest a sanctuary where no animal could ever be harmed.",
    image: "assets/Golden_Temple.png",
    tags: ["punjab", "deer", "sanctuary", "compassion", "prince", "north india"]
  },
  {
    id: "barber-sambalpur-od",
    title: "The Clever Barber of Sambalpur",
    state: "Odisha",
    stateCode: "od",
    region: "East",
    category: "Moral & Wit",
    moral: "Resourcefulness can turn misfortune into victory.",
    summary: "A barber uses a simple mirror to scare away bandits in the forests of Odisha.",
    fullStory: "While travelling with his savings from Sambalpur to Cuttack, a barber was surrounded by three armed forest bandits. Knowing he couldn't fight them physically, he pulled out his large shaving mirror and exclaimed, 'I am a demon hunter! I have trapped five dangerous spirits in this glass, and I need one more!' He showed the mirror to the chief bandit. Seeing his own fierce face in the glass, the terrified bandit believed his soul was captured. All three bandits dropped their weapons and fled into the jungle.",
    image: "assets/East_India.png",
    tags: ["odisha", "sambalpur", "barber", "mirror", "wit", "bandits"]
  },
  {
    id: "hornbill-prince-nl",
    title: "The Hornbill Prince",
    state: "Nagaland",
    stateCode: "nl",
    region: "Northeast",
    category: "Tribal Lore",
    moral: "Promises made to nature must be honored through song and dance.",
    summary: "The Naga legend of the great Hornbill whose feathers signify courage and unity.",
    fullStory: "Among the Ao Naga tribes, a brave young warrior named Meren rescued a wounded Hornbill from a hunter's snare. The Hornbill, a bird of divine omens, gifted Meren two glowing feathers and said, 'Whenever your people dance together in peace under the winter sky, wear these feathers, and no enemy shall divide your hills.' To this day, during the grand Hornbill Festival, Naga tribes don colorful feather headgear, celebrating unity, courage, and ancient heritage.",
    image: "assets/Nagatr.png",
    tags: ["nagaland", "hornbill", "naga", "ao", "tribal lore", "festival"]
  },
  {
    id: "monkey-crocodile-tg",
    title: "The Monkey & Crocodile of Godavari",
    state: "Telangana",
    stateCode: "tg",
    region: "South",
    category: "Animal Fable",
    moral: "Betrayal forfeits true friendship.",
    summary: "A classic Panchatantra retold along the banks of the mighty Godavari River in Telangana.",
    fullStory: "Rakta the monkey lived on a lush rose-apple tree beside the Godavari River in Telangana. He shared sweet berries with Karala the crocodile every day. However, Karala's wife demanded to eat the monkey's sweet heart. Karala reluctantly invited Rakta home for dinner on his back. Halfway across the river, Karala confessed the truth. Thinking fast, Rakta said, 'My heart is stored safely in a hollow of my rose-apple tree! Take me back to fetch it.' Back at the shore, Rakta jumped up into the tree, declaring that true friendship cannot survive deceit.",
    image: "assets/travel_islands.png",
    tags: ["telangana", "godavari", "monkey", "crocodile", "panchatantra", "fable"]
  },
  {
    id: "weaver-spirit-hr",
    title: "The Weaver and the Wish-Spirit",
    state: "Haryana",
    stateCode: "hr",
    region: "North",
    category: "Moral & Wit",
    moral: "Think carefully before wishing for superficial changes.",
    summary: "A humble loom worker in Panipat gets two wishes from a forest spirit with unexpected results.",
    fullStory: "In the ancient weaving town of Panipat, a poor weaver spared an old oak tree. The tree spirit offered him two wishes. The weaver ran home to ask his wife. She advised, 'Wish for two extra arms and two extra heads so you can weave three times as much cloth every day!' He made the wish. When he walked into the street with three heads and four arms, the villagers thought he was a monster and chased him out of town. He used his second wish to return to his normal self, realizing contentment is better than foolish greed.",
    image: "assets/North_India.png",
    tags: ["haryana", "panipat", "weaver", "spirit", "wishes", "moral"]
  },
  {
    id: "seven-sisters-ml",
    title: "The Legend of the Seven Sisters",
    state: "Meghalaya",
    stateCode: "ml",
    region: "Northeast",
    category: "Myth & Legend",
    moral: "Sisterhood and nature's grace cascade together in harmony.",
    summary: "The breathtaking legend behind the Nohsngithiang Falls in Sohra (Cherrapunji).",
    fullStory: "High above the cloud-draped cliffs of Sohra in Meghalaya, seven mountain princesses loved dancing amidst the gentle rain and rainbows. When a drought hit the plains below, the seven sisters held hands and leaped gracefully from the cliffside, transforming into seven majestic waterfalls flowing side by side down the green gorge. Their eternal cascades brought endless water to the valley, giving Meghalaya its name: 'The Abode of Clouds'.",
    image: "assets/travel_waterfalls.png",
    tags: ["meghalaya", "seven sisters", "waterfall", "sohra", "cherrapunji", "legend"]
  },
  {
    id: "potter-malwa-mp",
    title: "The Clever Potter of Malwa",
    state: "Madhya Pradesh",
    stateCode: "mp",
    region: "Central",
    category: "Moral & Wit",
    moral: "Artistry and quick wit can turn earthen clay into gold.",
    summary: "A potter in Ujjain outwits a stingy landlord using a porous water pitcher.",
    fullStory: "A wealthy landlord in Ujjain refused to pay a poor potter for fifty large water storage pots. The potter created a special pot painted with invisible salt glazes. When the landlord filled it with sweet syrup, the salt dissolved, turning the syrup salty and unusable. Furious, the landlord brought the pot back. The potter smiled and said, 'The pot demands honesty—only sweet souls keep syrup sweet inside it!' Ashamed of his greed, the landlord paid all his outstanding debts, and the syrup tasted delicious once again.",
    image: "assets/Central_India.png",
    tags: ["madhya pradesh", "ujjain", "malwa", "potter", "wit", "moral"]
  }
];

/**
 * Filter tales based on search query, state, region, and category filters.
 */
export function filterTales(tales, { search = "", state = "all", region = "all", category = "all" } = {}) {
  if (!Array.isArray(tales)) return [];

  const query = search.trim().toLowerCase();

  return tales.filter(tale => {
    // Search match (title, state, region, category, moral, summary, tags)
    const matchesSearch = !query || [
      tale.title,
      tale.state,
      tale.region,
      tale.category,
      tale.moral,
      tale.summary,
      ...(tale.tags || [])
    ].some(field => field && field.toLowerCase().includes(query));

    // State filter match
    const matchesState = state === "all" || tale.stateCode === state || tale.state.toLowerCase() === state.toLowerCase();

    // Region filter match
    const matchesRegion = region === "all" || tale.region.toLowerCase() === region.toLowerCase();

    // Category filter match
    const matchesCategory = category === "all" || tale.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesState && matchesRegion && matchesCategory;
  });
}

/**
 * Group an array of tales by state name.
 */
export function groupTalesByState(tales) {
  if (!Array.isArray(tales)) return {};

  return tales.reduce((acc, tale) => {
    const state = tale.state || "Unknown State";
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(tale);
    return acc;
  }, {});
}

/**
 * Group an array of tales by geographic region.
 */
export function groupTalesByRegion(tales) {
  if (!Array.isArray(tales)) return {};

  return tales.reduce((acc, tale) => {
    const region = tale.region || "Other";
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(tale);
    return acc;
  }, {});
}

/**
 * Group an array of tales by category.
 */
export function groupTalesByCategory(tales) {
  if (!Array.isArray(tales)) return {};

  return tales.reduce((acc, tale) => {
    const category = tale.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tale);
    return acc;
  }, {});
}

/**
 * Extract unique state names & codes from the dataset.
 */
export function getUniqueStates(tales = folkTalesData) {
  const map = new Map();
  tales.forEach(t => {
    if (t.state && t.stateCode) {
      map.set(t.stateCode, t.state);
    }
  });
  return Array.from(map.entries())
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Extract unique categories from the dataset.
 */
export function getUniqueCategories(tales = folkTalesData) {
  const set = new Set(tales.map(t => t.category).filter(Boolean));
  return Array.from(set).sort();
}

/**
 * Extract unique regions from the dataset.
 */
export function getUniqueRegions(tales = folkTalesData) {
  const set = new Set(tales.map(t => t.region).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM INTERACTION CODE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Attach data and helpers to window object for global script access
  window.folkTalesData = folkTalesData;
  window.filterTales = filterTales;
  window.groupTalesByState = groupTalesByState;
  window.groupTalesByRegion = groupTalesByRegion;
  window.groupTalesByCategory = groupTalesByCategory;
  window.getUniqueStates = getUniqueStates;
  window.getUniqueCategories = getUniqueCategories;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("story-search");
    const stateFilter = document.getElementById("state-filter");
    const regionFilter = document.getElementById("region-filter");
    const categoryFilter = document.getElementById("category-filter");
    const groupBySelect = document.getElementById("group-by");
    const gridContainer = document.getElementById("tales-grid");
    const resultStatus = document.getElementById("result-status");
    const emptyState = document.getElementById("empty-state");
    const clearFiltersBtn = document.getElementById("clear-filters");
    const emptyResetBtn = document.getElementById("empty-reset");

    // Modal elements
    const storyModal = document.getElementById("story-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalState = document.getElementById("modal-state");
    const modalRegion = document.getElementById("modal-region");
    const modalCategory = document.getElementById("modal-category");
    const modalMoral = document.getElementById("modal-moral");
    const modalStoryText = document.getElementById("modal-story-text");
    const modalImage = document.getElementById("modal-image");
    const modalAudioBtn = document.getElementById("modal-audio-btn");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");

    let currentFilteredTales = [...folkTalesData];
    let currentStoryIndex = -1;
    let isSpeaking = false;

    // Populate State dropdown options dynamically
    if (stateFilter) {
      const states = getUniqueStates();
      states.forEach(({ code, name }) => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = name;
        stateFilter.appendChild(opt);
      });
    }

    // Populate Category dropdown options dynamically
    if (categoryFilter) {
      const categories = getUniqueCategories();
      categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.toLowerCase();
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
      });
    }

    function renderCards() {
      if (!gridContainer) return;

      const searchVal = searchInput ? searchInput.value : "";
      const stateVal = stateFilter ? stateFilter.value : "all";
      const regionVal = regionFilter ? regionFilter.value : "all";
      const categoryVal = categoryFilter ? categoryFilter.value : "all";
      const groupByVal = groupBySelect ? groupBySelect.value : "none";

      currentFilteredTales = filterTales(folkTalesData, {
        search: searchVal,
        state: stateVal,
        region: regionVal,
        category: categoryVal
      });

      // Update counter status
      if (resultStatus) {
        resultStatus.textContent = `Showing ${currentFilteredTales.length} of ${folkTalesData.length} folk tales`;
      }

      // Handle empty state
      if (currentFilteredTales.length === 0) {
        gridContainer.innerHTML = "";
        if (emptyState) emptyState.hidden = false;
        return;
      } else {
        if (emptyState) emptyState.hidden = true;
      }

      // Render grouped vs ungrouped cards
      gridContainer.innerHTML = "";

      if (groupByVal === "state") {
        const grouped = groupTalesByState(currentFilteredTales);
        renderGroupedView(grouped, "State");
      } else if (groupByVal === "region") {
        const grouped = groupTalesByRegion(currentFilteredTales);
        renderGroupedView(grouped, "Region");
      } else if (groupByVal === "category") {
        const grouped = groupTalesByCategory(currentFilteredTales);
        renderGroupedView(grouped, "Category");
      } else {
        const cardsWrapper = document.createElement("div");
        cardsWrapper.className = "story-cards-grid";
        currentFilteredTales.forEach((tale, idx) => {
          cardsWrapper.appendChild(createStoryCard(tale, idx));
        });
        gridContainer.appendChild(cardsWrapper);
      }
    }

    function renderGroupedView(groupedObj, groupType) {
      Object.keys(groupedObj).sort().forEach(groupKey => {
        const talesGroup = groupedObj[groupKey];
        if (talesGroup.length === 0) return;

        const groupSection = document.createElement("div");
        groupSection.className = "group-section";

        const groupHeader = document.createElement("h3");
        groupHeader.className = "group-title";
        groupHeader.innerHTML = `<span>${groupKey}</span> <small>(${talesGroup.length} ${talesGroup.length === 1 ? "tale" : "tales"})</small>`;
        groupSection.appendChild(groupHeader);

        const groupGrid = document.createElement("div");
        groupGrid.className = "story-cards-grid";
        talesGroup.forEach(tale => {
          const globalIdx = currentFilteredTales.findIndex(t => t.id === tale.id);
          groupGrid.appendChild(createStoryCard(tale, globalIdx));
        });

        groupSection.appendChild(groupGrid);
        gridContainer.appendChild(groupSection);
      });
    }

    function createStoryCard(tale, globalIdx) {
      const card = document.createElement("article");
      card.className = "story-card";
      card.setAttribute("data-id", tale.id);
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${tale.image}" alt="${tale.title} Illustration" loading="lazy" onerror="this.src='assets/culture_default.png'">
          <span class="card-badge state-badge">${tale.state}</span>
          <span class="card-badge category-badge">${tale.category}</span>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="meta-region">📍 ${tale.region} India</span>
          </div>
          <h3 class="card-title">${tale.title}</h3>
          <p class="card-summary">${tale.summary}</p>
          <div class="card-moral">
            <strong>✨ Moral:</strong> ${tale.moral}
          </div>
          <button type="button" class="btn-read-story" data-index="${globalIdx}">
            Read Folk Tale →
          </button>
        </div>
      `;

      // Event listener for opening modal
      const readBtn = card.querySelector(".btn-read-story");
      readBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openStoryModal(globalIdx);
      });

      card.addEventListener("click", () => {
        openStoryModal(globalIdx);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openStoryModal(globalIdx);
        }
      });

      return card;
    }

    function openStoryModal(index) {
      if (index < 0 || index >= currentFilteredTales.length) return;
      currentStoryIndex = index;
      const tale = currentFilteredTales[index];

      if (modalTitle) modalTitle.textContent = tale.title;
      if (modalState) modalState.textContent = tale.state;
      if (modalRegion) modalRegion.textContent = `${tale.region} India`;
      if (modalCategory) modalCategory.textContent = tale.category;
      if (modalMoral) modalMoral.textContent = tale.moral;
      if (modalStoryText) modalStoryText.textContent = tale.fullStory;
      if (modalImage) {
        modalImage.src = tale.image;
        modalImage.alt = tale.title;
      }

      // Stop speech if running
      stopSpeech();

      if (storyModal) {
        storyModal.hidden = false;
        storyModal.classList.add("active");
        document.body.classList.add("modal-open");
        modalCloseBtn?.focus();
      }
    }

    function closeStoryModal() {
      if (storyModal) {
        storyModal.hidden = true;
        storyModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
      stopSpeech();
    }

    function stopSpeech() {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      isSpeaking = false;
      if (modalAudioBtn) {
        modalAudioBtn.innerHTML = "🔊 Listen Story";
      }
    }

    function toggleSpeech() {
      if (!("speechSynthesis" in window)) {
        alert("Text-to-speech narration is not supported in your browser.");
        return;
      }

      if (isSpeaking) {
        stopSpeech();
      } else {
        const tale = currentFilteredTales[currentStoryIndex];
        if (!tale) return;

        const textToRead = `${tale.title}. A folk tale from ${tale.state}. ${tale.fullStory}. Moral of the story: ${tale.moral}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          isSpeaking = false;
          if (modalAudioBtn) modalAudioBtn.innerHTML = "🔊 Listen Story";
        };

        utterance.onerror = () => {
          isSpeaking = false;
          if (modalAudioBtn) modalAudioBtn.innerHTML = "🔊 Listen Story";
        };

        window.speechSynthesis.speak(utterance);
        isSpeaking = true;
        if (modalAudioBtn) modalAudioBtn.innerHTML = "⏹️ Stop Narration";
      }
    }

    function resetFilters() {
      if (searchInput) searchInput.value = "";
      if (stateFilter) stateFilter.value = "all";
      if (regionFilter) regionFilter.value = "all";
      if (categoryFilter) categoryFilter.value = "all";
      if (groupBySelect) groupBySelect.value = "none";
      renderCards();
    }

    // Attach listeners
    searchInput?.addEventListener("input", renderCards);
    stateFilter?.addEventListener("change", renderCards);
    regionFilter?.addEventListener("change", renderCards);
    categoryFilter?.addEventListener("change", renderCards);
    groupBySelect?.addEventListener("change", renderCards);
    clearFiltersBtn?.addEventListener("click", resetFilters);
    emptyResetBtn?.addEventListener("click", resetFilters);

    modalCloseBtn?.addEventListener("click", closeStoryModal);
    modalAudioBtn?.addEventListener("click", toggleSpeech);

    modalPrevBtn?.addEventListener("click", () => {
      if (currentStoryIndex > 0) {
        openStoryModal(currentStoryIndex - 1);
      }
    });

    modalNextBtn?.addEventListener("click", () => {
      if (currentStoryIndex < currentFilteredTales.length - 1) {
        openStoryModal(currentStoryIndex + 1);
      }
    });

    storyModal?.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close-modal") || e.target === storyModal) {
        closeStoryModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (storyModal && !storyModal.hidden) {
        if (e.key === "Escape") closeStoryModal();
        if (e.key === "ArrowLeft" && currentStoryIndex > 0) openStoryModal(currentStoryIndex - 1);
        if (e.key === "ArrowRight" && currentStoryIndex < currentFilteredTales.length - 1) openStoryModal(currentStoryIndex + 1);
      }
    });

    // Initial render
    renderCards();
  });
}
