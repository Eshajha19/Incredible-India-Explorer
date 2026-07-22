/* ==========================================================================
   TRADITIONAL INDIAN TOYS EXPLORER - PAGE SPECIFIC JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initToysPage();
});

/* ==========================================================================
   TOYS DATA
   ========================================================================== */

const CATEGORIES_DATA = [
    { key: 'wooden', name: 'Wooden Toys', icon: '🪵' },
    { key: 'clay', name: 'Clay Toys', icon: '🏺' },
    { key: 'cloth', name: 'Cloth Toys', icon: '🧵' },
    { key: 'metal', name: 'Metal Toys', icon: '⚙️' },
    { key: 'paper', name: 'Paper Toys', icon: '📄' },
    { key: 'natural', name: 'Natural Materials', icon: '🌿' }
];

const STATE_LABELS = {
    andhra: 'Andhra Pradesh',
    bihar: 'Bihar',
    chhattisgarh: 'Chhattisgarh',
    gujarat: 'Gujarat',
    karnataka: 'Karnataka',
    kerala: 'Kerala',
    madhya: 'Madhya Pradesh',
    maharashtra: 'Maharashtra',
    odisha: 'Odisha',
    rajasthan: 'Rajasthan',
    tamilnadu: 'Tamil Nadu',
    utter: 'Uttar Pradesh',
    westbengal: 'West Bengal'
};

const TOYS_DATA = [
    {
        id: 'channapatna',
        name: 'Channapatna Toys',
        state: 'karnataka',
        category: 'wooden',
        icon: '🪆',
        cardDesc: 'Colorful wooden toys from Karnataka, known as "Land of Toys". Crafted using traditional lacquerware techniques.',
        materials: 'Wood (Ivory wood), Natural Lacquer',
        craftsmanship: 'Turned on lathe, hand-painted with natural dyes',
        history: 'Originated in the 18th century under Tipu Sultan\'s patronage. The craft was introduced by Persian artisans and has been passed down through generations of artisans in Channapatna town.',
        overview: 'Channapatna toys are famous for their vibrant colors and smooth finish. Made from ivory wood and colored with natural dyes, these toys are safe, eco-friendly, and represent the rich toy-making heritage of Karnataka.',
        tabs: {
            techniques: { text: 'Artisans use traditional wooden lathes to shape the toys, then apply natural lacquer colors made from vegetable dyes. The finish is achieved by polishing with dried grass leaves.', list: ['Wood Lathe Turning', 'Natural Lacquer Application', 'Hand-Painting', 'Grass Leaf Polishing'] },
            cultural: { text: 'These toys are an integral part of Karnataka\'s cultural heritage, often used in festivals and as decorative items. They represent the intersection of Persian and Indian toy-making traditions.', list: ['Festival Decorations', 'Gift Items', 'Cultural Symbols', 'Heritage Craft'] },
            materials: { text: 'Only sustainable ivory wood (Wrightia tinctoria) is used, along with natural dyes extracted from roots, leaves, and flowers, making the toys completely non-toxic.', list: ['Ivory Wood', 'Natural Lacquer', 'Vegetable Dyes', 'Sustainable Materials'] },
            artisans: { text: 'The craft is practiced by the "Channapatna artisans" community, with skills passed down through generations. Many families have been in this trade for over 200 years.', list: ['Hereditary Artisans', 'Family Traditions', 'Skill Transmission', 'Community Craft'] },
            modern: { text: 'Today, Channapatna toys have gained GI tag recognition and are exported globally. Contemporary designs blend traditional techniques with modern aesthetics.', list: ['GI Tag Recognition', 'Global Exports', 'Modern Designs', 'Eco-Friendly Trend'] }
        }
    },
    {
        id: 'nat-dolls',
        name: 'Natuva Bommalu',
        state: 'andhra',
        category: 'clay',
        icon: '🎎',
        cardDesc: 'Traditional clay dolls from Andhra Pradesh, depicting rural life and mythological characters.',
        materials: 'Clay, Natural Pigments',
        craftsmanship: 'Hand-molded clay, sun-dried, painted with natural colors',
        history: 'Natuva Bommalu (dancing dolls) have been made in Kondapalli village for over 400 years. The craft originated during the Vijayanagara Empire and continues to thrive as a cottage industry.',
        overview: 'These lightweight clay dolls are known for their expressive features and vibrant colors. They depict various themes from rural life, mythology, and everyday activities, capturing the essence of Andhra\'s cultural narrative.',
        tabs: {
            techniques: { text: 'Artisans mold clay by hand, create hollow structures for lightness, sun-dry them, and paint with natural pigments. The distinctive feature is the movable parts in some dolls.', list: ['Hand Molding', 'Hollow Structure', 'Sun Drying', 'Natural Pigment Painting'] },
            cultural: { text: 'These dolls are used in festivals, especially during Sankranti and Dasara. They serve as educational tools for children, teaching them about mythology and rural life.', list: ['Festival Decorations', 'Mythological Education', 'Rural Life Depiction', 'Cultural Storytelling'] },
            materials: { text: 'Local clay from the Kondapalli region is used, along with natural pigments made from minerals and plant extracts. The clay is specially treated for durability.', list: ['Local Kondapalli Clay', 'Natural Pigments', 'Mineral Colors', 'Treated Clay'] },
            artisans: { text: 'The Arya Kshatriya community has been practicing this craft for generations. The skill is traditionally passed from father to son in family workshops.', list: ['Arya Kshatriya Community', 'Family Workshops', 'Hereditary Skills', 'Cottage Industry'] },
            modern: { text: 'Modern innovations include contemporary themes and improved durability treatments. The craft has received government support and international recognition for its cultural value.', list: ['Contemporary Themes', 'Durability Improvements', 'Government Support', 'International Recognition'] }
        }
    },
    {
        id: 'thanjavur',
        name: 'Thanjavur Dancing Dolls',
        state: 'tamilnadu',
        category: 'clay',
        icon: '💃',
        cardDesc: 'Iconic bobblehead dolls from Tamil Nadu that dance when tapped, featuring traditional attire.',
        materials: 'Clay, Terracotta, Natural Colors',
        craftsmanship: 'Hand-sculpted clay, balanced for oscillation, hand-painted',
        history: 'Originating in the 19th century during the Maratha rule of Thanjavur, these dolls were created as temple offerings and festival decorations. The unique oscillating mechanism was an innovative local invention.',
        overview: 'Thanjavur dancing dolls are famous for their unique bobblehead mechanism that makes them "dance" with a gentle tap. Adorned in traditional Tamil attire, they represent the rich cultural heritage of the Thanjavur region.',
        tabs: {
            techniques: { text: 'The secret lies in the precise weight distribution - a heavy bottom and light top create the oscillating motion. Each doll is hand-sculpted and painted with intricate details.', list: ['Weight Distribution', 'Oscillation Mechanism', 'Hand Sculpting', 'Intricate Painting'] },
            cultural: { text: 'These dolls are essential during Navratri festivals, displayed in golu (doll displays). They represent various deities and characters from Tamil mythology and folklore.', list: ['Navratri Golu Display', 'Temple Offerings', 'Mythological Characters', 'Festival Traditions'] },
            materials: { text: 'Local terracotta clay is used, treated for strength. Natural colors derived from earth pigments ensure the dolls remain vibrant and eco-friendly.', list: ['Terracotta Clay', 'Earth Pigments', 'Natural Colors', 'Treated Clay'] },
            artisans: { text: 'The craft is concentrated in Thanjavur district, with several families maintaining the tradition. The oscillating technique is a closely guarded secret passed down generations.', list: ['Thanjavur Artisans', 'Family Traditions', 'Secret Techniques', 'Hereditary Craft'] },
            modern: { text: 'Contemporary versions include modern themes and improved durability. The dolls have become popular collectibles and souvenirs, representing Tamil culture globally.', list: ['Modern Themes', 'Collectible Status', 'Global Souvenirs', 'Cultural Ambassadors'] }
        }
    },
    {
        id: 'kondapalli',
        name: 'Kondapalli Toys',
        state: 'andhra',
        category: 'wooden',
        icon: '🦁',
        cardDesc: 'Exquisite wooden toys from Andhra Pradesh, featuring mythological figures and animals.',
        materials: 'Tella Poniki Wood, Natural Colors',
        craftsmanship: 'Hand-carved, painted with natural dyes, assembled without nails',
        history: 'The 400-year-old craft originated in Kondapalli village near Vijayawada. It was patronized by local rulers and flourished as a cottage industry, with techniques passed down through generations.',
        overview: 'Kondapalli toys are renowned for their intricate carving and vibrant colors. Made from soft Tella Poniki wood, these toys depict mythological figures, animals, and rural scenes with remarkable detail and artistry.',
        tabs: {
            techniques: { text: 'Artisans carve the soft wood with simple tools, assemble pieces without nails using traditional joinery, and paint with natural dyes. The wood\'s softness allows for intricate detailing.', list: ['Wood Carving', 'Nail-less Assembly', 'Natural Dye Painting', 'Intricate Detailing'] },
            cultural: { text: 'These toys depict scenes from Indian epics, rural life, and animals. They are used in festivals, as educational tools, and as decorative pieces in homes.', list: ['Mythological Scenes', 'Rural Life Depiction', 'Festival Use', 'Educational Tools'] },
            materials: { text: 'Tella Poniki (white sandalwood) is the preferred wood for its softness and workability. Natural dyes from roots, leaves, and minerals provide vibrant, lasting colors.', list: ['Tella Poniki Wood', 'Natural Dyes', 'Root Dyes', 'Mineral Colors'] },
            artisans: { text: 'The craft is practiced by the "Nakkashi" community, with skills traditionally passed from father to son. Many families have been in this trade for over 300 years.', list: ['Nakkashi Community', 'Hereditary Skills', 'Family Workshops', '300+ Year Tradition'] },
            modern: { text: 'The craft has received GI tag recognition and government support. Modern adaptations include contemporary designs while preserving traditional techniques.', list: ['GI Tag Recognition', 'Government Support', 'Contemporary Designs', 'Preservation Efforts'] }
        }
    },
    {
        id: 'varanasi',
        name: 'Varanasi Wooden Toys',
        state: 'uttar',
        category: 'wooden',
        icon: '🎭',
        cardDesc: 'Traditional wooden toys from Varanasi, featuring religious motifs and miniature replicas.',
        materials: 'Rosewood, Sheesham, Natural Lacquer',
        craftsmanship: 'Hand-carved, polished, painted with natural colors',
        history: 'Varanasi\'s toy-making tradition dates back over 200 years, evolving from temple carving traditions. Artisans initially created religious artifacts and later diversified into toys for children.',
        overview: 'Varanasi wooden toys are known for their religious themes and miniature replicas of temples and deities. Crafted from quality hardwoods, these toys reflect the spiritual and cultural essence of the ancient city.',
        tabs: {
            techniques: { text: 'Artisans use traditional carving tools passed down generations. The toys are hand-polished to a smooth finish and painted with natural colors. Miniature temple replicas require exceptional precision.', list: ['Traditional Carving', 'Hand Polishing', 'Natural Color Painting', 'Miniature Precision'] },
            cultural: { text: 'These toys often depict Hindu deities, temple scenes, and religious symbols. They serve as educational tools for children to learn about religion and culture.', list: ['Religious Depictions', 'Temple Replicas', 'Cultural Education', 'Spiritual Symbols'] },
            materials: { text: 'Rosewood and Sheesham are preferred for their durability and beautiful grain. Natural lacquer and vegetable dyes ensure the toys are safe and long-lasting.', list: ['Rosewood', 'Sheesham', 'Natural Lacquer', 'Vegetable Dyes'] },
            artisans: { text: 'The craft is practiced by Muslim artisan communities in Varanasi, with workshops concentrated in specific localities. Skills are passed down through family lineages.', list: ['Muslim Artisan Communities', 'Family Lineages', 'Traditional Workshops', 'Hereditary Skills'] },
            modern: { text: 'Modern adaptations include contemporary themes and improved marketing. The toys are popular among tourists and collectors as representations of Varanasi\'s cultural heritage.', list: ['Contemporary Themes', 'Tourist Appeal', 'Collector Items', 'Cultural Heritage'] }
        }
    },
    {
        id: 'sawantwadi',
        name: 'Sawantwadi Toys',
        state: 'maharashtra',
        category: 'wooden',
        icon: '🐘',
        cardDesc: 'Elegant wooden toys from Maharashtra, known for their lacquer work and intricate designs.',
        materials: 'Local Wood, Lacquer',
        craftsmanship: 'Hand-turned, lacquer-coated, hand-painted',
        history: 'The craft originated in the 18th century under the patronage of the Sawantwadi royal family. The royal court encouraged artisans to develop this unique style of toy-making, which continues to this day.',
        overview: 'Sawantwadi toys are distinguished by their glossy lacquer finish and intricate designs. Made from local wood and coated with natural lacquer, these toys represent the rich craft heritage of the Konkan region.',
        tabs: {
            techniques: { text: 'Artisans use traditional lacquer techniques where colored lacquer sticks are applied to rotating wood pieces, creating beautiful patterns. The finish is exceptionally smooth and durable.', list: ['Lacquer Application', 'Rotating Wood Technique', 'Pattern Creation', 'Smooth Finish'] },
            cultural: { text: 'These toys depict animals, birds, and everyday objects from Konkan life. They are used in festivals and as decorative items in Maharashtrian homes.', list: ['Animal Depictions', 'Konkan Life', 'Festival Use', 'Home Decoration'] },
            materials: { text: 'Local woods like mango and jackfruit are used. Natural lacquer is extracted from the lac insect, providing a glossy, non-toxic finish.', list: ['Local Woods', 'Natural Lacquer', 'Non-toxic Finish', 'Sustainable Materials'] },
            artisans: { text: 'The craft is practiced by the Chitari community, whose name derives from "chitra" (painting). Skills have been passed down for over 250 years in Sawantwadi.', list: ['Chitari Community', '250+ Year Tradition', 'Royal Patronage', 'Hereditary Skills'] },
            modern: { modern: 'The craft has received government recognition and support. Modern innovations include contemporary designs while preserving traditional lacquer techniques.', list: ['Government Recognition', 'Contemporary Designs', 'Technique Preservation', 'Market Expansion'] }
        }
    },
    {
        id: 'bihar-clay',
        name: 'Bihar Clay Toys',
        state: 'bihar',
        category: 'clay',
        icon: '🏺',
        cardDesc: 'Traditional clay toys from Bihar, featuring rural themes and religious figures.',
        materials: 'Clay, Natural Pigments',
        craftsmanship: 'Hand-molded, sun-dried, painted with natural colors',
        history: 'Bihar\'s clay toy tradition dates back to ancient times, with archaeological evidence of clay figurines from the Mauryan period. The craft has evolved over centuries while maintaining traditional techniques.',
        overview: 'Bihar clay toys depict rural life, religious figures, and animals with simple yet expressive forms. These toys are deeply connected to the agricultural and cultural traditions of the region.',
        tabs: {
            techniques: { text: 'Artisans mold clay by hand, often creating hollow structures for lightness. After sun-drying, the toys are painted with natural pigments made from earth and plant materials.', list: ['Hand Molding', 'Hollow Structures', 'Sun Drying', 'Natural Pigments'] },
            cultural: { text: 'These toys are used in festivals, especially Chhath Puja. They depict themes from rural Bihar, including farming scenes, animals, and deities important to local culture.', list: ['Chhath Puja Use', 'Rural Themes', 'Farming Scenes', 'Local Deities'] },
            materials: { text: 'Local clay from riverbeds is used, treated for durability. Natural pigments from ochre, charcoal, and plant extracts provide earthy, authentic colors.', list: ['Riverbed Clay', 'Ochre Pigments', 'Charcoal Colors', 'Plant Extracts'] },
            artisans: { text: 'The craft is practiced by rural artisan communities across Bihar, particularly in districts like Bhagalpur and Patna. It remains largely a cottage industry.', list: ['Rural Artisans', 'Bhagalpur District', 'Patna District', 'Cottage Industry'] },
            modern: { text: 'Efforts are underway to revive and market these toys nationally. Contemporary adaptations include improved durability and modern themes while preserving traditional aesthetics.', list: ['Revival Efforts', 'National Marketing', 'Durability Improvements', 'Traditional Aesthetics'] }
        }
    },
    {
        id: 'rajasthan-puppets',
        name: 'Rajasthan String Puppets',
        state: 'rajasthan',
        category: 'cloth',
        icon: '🎪',
        cardDesc: 'Colorful string puppets from Rajasthan, used in traditional puppetry performances.',
        materials: 'Cloth, Wood, String, Zari',
        craftsmanship: 'Hand-sewn costumes, wooden structures, string mechanisms',
        history: 'Rajasthani string puppetry (Kathputli) dates back over a thousand years. It was patronized by royal courts and used to tell stories from epics and local folklore, evolving into a distinct art form.',
        overview: 'Rajasthan string puppets are elaborate cloth figures with wooden structures and intricate costumes. They are used in traditional Kathputli performances that combine storytelling, music, and puppetry.',
        tabs: {
            techniques: { text: 'Artisans create wooden structures, hand-sew elaborate costumes with mirror work and embroidery, and attach strings for manipulation. Each puppet can have multiple strings for complex movements.', list: ['Wooden Structure', 'Hand-sewn Costumes', 'String Mechanism', 'Complex Movements'] },
            cultural: { text: 'Kathputli performances tell stories from epics like Ramayana and Mahabharata, along with local folk tales. The art form is an important part of Rajasthani cultural identity.', list: ['Epic Storytelling', 'Folk Tales', 'Cultural Identity', 'Performance Art'] },
            materials: { text: 'Colorful fabrics with mirror work (shisha), carved wood for structure, and durable strings for manipulation. Zari and embroidery add richness to the costumes.', list: ['Mirror Work Fabric', 'Carved Wood', 'Durable Strings', 'Zari Embroidery'] },
            artisans: { text: 'The Kathputli community of Rajasthan has preserved this art for generations. Many families are traditional puppeteers who perform and create puppets.', list: ['Kathputli Community', 'Traditional Puppeteers', 'Family Traditions', 'Performance Families'] },
            modern: { text: 'Contemporary adaptations include modern stories and improved puppet mechanisms. The art form has gained international recognition and is featured in cultural festivals worldwide.', list: ['Modern Stories', 'Improved Mechanisms', 'International Recognition', 'Cultural Festivals'] }
        }
    },
    {
        id: 'odisha-pattachitra',
        name: 'Odisha Pattachitra Toys',
        state: 'odisha',
        category: 'natural',
        icon: '🎨',
        cardDesc: 'Palm leaf and cloth toys featuring traditional Pattachitra paintings from Odisha.',
        materials: 'Palm Leaf, Cloth, Natural Colors',
        craftsmanship: 'Pattachitra painting, palm leaf engraving, traditional binding',
        history: 'Pattachitra art dates back to the 5th century BC, originating in the Jagannath temple tradition. The craft evolved from religious paintings to include decorative items and toys featuring the same distinctive style.',
        overview: 'Odisha Pattachitra toys feature the distinctive painting style of Pattachitra art on palm leaves and cloth. These toys depict mythological scenes and deities with intricate details and vibrant natural colors.',
        tabs: {
            techniques: { text: 'Artisans use traditional Pattachitra painting techniques with natural colors on cloth or engraved palm leaves. The style features bold lines, intricate details, and mythological themes.', list: ['Pattachitra Painting', 'Palm Leaf Engraving', 'Natural Colors', 'Mythological Themes'] },
            cultural: { text: 'These toys depict scenes from Jagannath culture and Odia mythology. They are used in festivals and as educational tools to teach children about religious stories.', list: ['Jagannath Culture', 'Odia Mythology', 'Festival Use', 'Religious Education'] },
            materials: { text: 'Palm leaves (tala patra) and treated cloth are the bases. Natural colors from minerals, stones, and plants are used, following traditional recipes passed down generations.', list: ['Palm Leaves', 'Treated Cloth', 'Mineral Colors', 'Plant Colors'] },
            artisans: { text: 'The Chitrakara community has practiced Pattachitra for generations in villages like Raghurajpur. The craft is traditionally a family occupation with strict artistic conventions.', list: ['Chitrakara Community', 'Raghurajpur Village', 'Family Occupation', 'Artistic Conventions'] },
            modern: { text: 'The craft has received GI tag recognition. Modern adaptations include contemporary themes and products while preserving the traditional Pattachitra style and techniques.', list: ['GI Tag Recognition', 'Contemporary Themes', 'Style Preservation', 'Product Diversification'] }
        }
    },
    {
        id: 'kerala-nalukettu',
        name: 'Kerala Nalukettu Models',
        state: 'kerala',
        category: 'wooden',
        icon: '🏠',
        cardDesc: 'Miniature models of traditional Kerala architecture, featuring intricate wooden details.',
        materials: 'Teak Wood, Rosewood, Natural Finish',
        craftsmanship: 'Hand-carved, traditional joinery, detailed architecture',
        history: 'The craft of creating miniature architectural models evolved from Kerala\'s rich tradition of temple and palace architecture. Artisans adapted their skills to create detailed replicas for educational and decorative purposes.',
        overview: 'Kerala Nalukettu models are miniature replicas of traditional Kerala homes and temples. These intricate wooden models showcase the architectural heritage and craftsmanship of the region.',
        tabs: {
            techniques: { text: 'Artisans use traditional woodworking techniques including intricate carving and traditional joinery without nails. The models faithfully reproduce architectural details like sloping roofs and wooden pillars.', list: ['Traditional Woodworking', 'Intricate Carving', 'Nail-less Joinery', 'Architectural Detail'] },
            cultural: { text: 'These models represent Kerala\'s architectural heritage, including Nalukettu homes and temple structures. They serve as educational tools and decorative pieces showcasing traditional architecture.', list: ['Architectural Heritage', 'Nalukettu Homes', 'Temple Structures', 'Educational Tools'] },
            materials: { text: 'Quality woods like teak and rosewood are used for their durability and beautiful grain. Natural finishes highlight the wood\'s natural beauty without artificial colors.', list: ['Teak Wood', 'Rosewood', 'Natural Finish', 'Quality Materials'] },
            artisans: { text: 'The craft is practiced by traditional carpenter communities (Achari) who have adapted their architectural skills to miniature work. Skills are passed down through family lineages.', list: ['Achari Community', 'Architectural Skills', 'Family Lineages', 'Traditional Carpenters'] },
            modern: { text: 'Contemporary models include modern buildings and improved detailing. The craft is popular among collectors and as educational tools in architecture schools.', list: ['Modern Buildings', 'Improved Detailing', 'Collector Items', 'Architecture Education'] }
        }
    },
    {
        id: 'chhattisgarh-dhokra',
        name: 'Chhattisgarh Dhokra Toys',
        state: 'chhattisgarh',
        category: 'metal',
        icon: '🗿',
        cardDesc: 'Brass toys using the ancient Dhokra lost-wax casting technique from Chhattisgarh.',
        materials: 'Brass, Wax, Clay',
        craftsmanship: 'Lost-wax casting, hand-finished, traditional patterns',
        history: 'Dhokra craft dates back over 4,000 years to the Indus Valley Civilization. The tribal communities of Chhattisgarh have preserved this ancient technique, using it to create both religious artifacts and toys.',
        overview: 'Chhattisgarh Dhokra toys are created using the ancient lost-wax casting technique, resulting in unique brass figurines with distinctive grainy textures. These toys depict tribal life, animals, and deities.',
        tabs: {
            techniques: { text: 'The lost-wax process involves creating a wax model, coating it with clay, melting out the wax, and pouring molten brass. Each piece is unique due to the mold-breaking process.', list: ['Lost-Wax Casting', 'Clay Coating', 'Brass Pouring', 'Hand Finishing'] },
            cultural: { text: 'Dhokra toys depict tribal deities, animals, and everyday tribal life. They are used in rituals and as decorative items, representing the rich tribal culture of Chhattisgarh.', list: ['Tribal Deities', 'Animal Depictions', 'Tribal Life', 'Ritual Use'] },
            materials: { text: 'Brass is the primary metal, often recycled from scrap. Natural wax and local clay are used for the molds. The brass content gives the toys their characteristic golden hue.', list: ['Brass', 'Natural Wax', 'Local Clay', 'Recycled Metal'] },
            artisans: { text: 'The craft is practiced by tribal communities like the Ghadwas. The technique has been passed down orally for generations, with each family having their unique style and patterns.', list: ['Ghadwas Community', 'Tribal Artisans', 'Oral Tradition', 'Family Styles'] },
            modern: { text: 'Dhokra has gained international recognition for its primitive beauty. Contemporary adaptations include modern themes while preserving the ancient lost-wax technique.', list: ['International Recognition', 'Contemporary Themes', 'Technique Preservation', 'Primitive Beauty'] }
        }
    },
    {
        id: 'gujarat-paper',
        name: 'Gujarat Paper Toys',
        state: 'gujarat',
        category: 'paper',
        icon: '📦',
        cardDesc: 'Colorful paper toys and masks from Gujarat, used in festivals and performances.',
        materials: 'Paper, Cardboard, Natural Colors',
        craftsmanship: 'Hand-cut, hand-painted, assembled with traditional techniques',
        history: 'Paper toy making in Gujarat has roots in folk traditions and festival celebrations. The craft evolved from creating paper masks and props for traditional performances and religious processions.',
        overview: 'Gujarat paper toys include colorful masks, decorative items, and figurines used in festivals like Navratri. These lightweight toys showcase the vibrant folk art traditions of the region.',
        tabs: {
            techniques: { text: 'Artisans hand-cut paper and cardboard, then hand-paint with natural colors. The toys are assembled using traditional folding and pasting techniques. Masks are designed for wearability.', list: ['Hand Cutting', 'Natural Color Painting', 'Traditional Folding', 'Wearable Masks'] },
            cultural: { text: 'These toys and masks are essential during Navratri and other festivals. They depict characters from Hindu mythology and Gujarati folklore, used in performances and processions.', list: ['Navratri Use', 'Mythological Characters', 'Folk Performances', 'Festival Processions'] },
            materials: { text: 'Handmade paper and cardboard are used as bases. Natural colors from minerals and plants provide vibrant, eco-friendly finishes. Some toys incorporate recycled paper.', list: ['Handmade Paper', 'Cardboard', 'Natural Colors', 'Recycled Materials'] },
            artisans: { text: 'The craft is practiced by folk artists across Gujarat, particularly in regions known for their folk traditions. Skills are often community-based rather than family-specific.', list: ['Folk Artists', 'Community Skills', 'Regional Traditions', 'Folk Art Communities'] },
            modern: { text: 'Contemporary versions include improved durability and modern themes. The craft is promoted as an eco-friendly alternative to plastic toys, aligning with sustainability trends.', list: ['Improved Durability', 'Modern Themes', 'Eco-Friendly Focus', 'Sustainability Trend'] }
        }
    },
    {
        id: 'madhya-bamboo',
        name: 'Madhya Pradesh Bamboo Toys',
        state: 'madhya',
        category: 'natural',
        icon: '🎋',
        cardDesc: 'Bamboo toys and figurines from Madhya Pradesh, showcasing tribal craftsmanship.',
        materials: 'Bamboo, Natural Colors, Rattan',
        craftsmanship: 'Bamboo weaving, carving, natural dye application',
        history: 'Bamboo craft in Madhya Pradesh has been practiced by tribal communities for centuries. The abundant bamboo forests of the region provide raw material for various crafts, including toys and decorative items.',
        overview: 'Madhya Pradesh bamboo toys are created using traditional weaving and carving techniques. These lightweight, durable toys depict animals, birds, and tribal life, showcasing the region\'s rich bamboo craft heritage.',
        tabs: {
            techniques: { text: 'Artisans split bamboo into strips, weave them into shapes, and use carving for details. Natural dyes are applied for color. The techniques vary by tribal community and region.', list: ['Bamboo Splitting', 'Weaving', 'Carving', 'Natural Dyeing'] },
            cultural: { text: 'These toys depict tribal life, animals, and birds from the region\'s forests. They are used in tribal festivals and as toys for children, representing the close relationship between tribes and nature.', list: ['Tribal Life Depiction', 'Forest Animals', 'Tribal Festivals', 'Nature Connection'] },
            materials: { text: 'Local bamboo species are used, selected for their flexibility and durability. Natural dyes from forest plants and minerals provide colors. Rattan is sometimes used for binding.', list: ['Local Bamboo', 'Forest Plant Dyes', 'Mineral Colors', 'Rattan Binding'] },
            artisans: { text: 'Various tribal communities including the Gonds and Baigas practice bamboo craft. The skills are passed down through generations, with each community having distinct styles and techniques.', list: ['Gond Community', 'Baiga Community', 'Tribal Skills', 'Distinct Styles'] },
            modern: { text: 'Contemporary adaptations include modern designs and improved finishing. The craft is promoted as eco-friendly and sustainable, appealing to environmentally conscious consumers.', list: ['Modern Designs', 'Improved Finishing', 'Eco-Friendly Appeal', 'Sustainable Craft'] }
        }
    },
    {
        id: 'bengal-clay',
        name: 'West Bengal Clay Dolls',
        state: 'westbengal',
        category: 'clay',
        icon: '👸',
        cardDesc: 'Traditional clay dolls from West Bengal, featuring Durga themes and rural life.',
        materials: 'Clay, Natural Pigments, Straw',
        craftsmanship: 'Hand-molded, sun-dried, painted with natural colors',
        history: 'Clay doll making in West Bengal has ancient roots, with archaeological evidence dating back to the Pala period. The craft is closely associated with Durga Puja and other religious festivals.',
        overview: 'West Bengal clay dolls are famous for their depiction of Durga and other deities, along with scenes from rural Bengali life. These dolls are essential during Durga Puja and represent the region\'s rich clay craft tradition.',
        tabs: {
            techniques: { text: 'Artisans mold clay by hand, often using straw for structural support. After sun-drying, the dolls are painted with natural pigments. Intricate details are added using fine brushes.', list: ['Hand Molding', 'Straw Support', 'Sun Drying', 'Fine Detailing'] },
            cultural: { text: 'These dolls are central to Durga Puja celebrations, depicting the goddess and her family. They also show rural Bengali life, including farming scenes and traditional occupations.', list: ['Durga Puja Central', 'Goddess Depiction', 'Rural Bengali Life', 'Farming Scenes'] },
            materials: { text: 'Local clay from riverbeds is used, treated for strength. Natural pigments from ochre, vermilion, and plant sources provide traditional colors. Straw adds structural support.', list: ['Riverbed Clay', 'Ochre Pigments', 'Vermilion Colors', 'Straw Support'] },
            artisans: { text: 'The craft is concentrated in districts like Krishnanagar and Murshidabad, where families have practiced doll-making for generations. The skill is traditionally passed from father to son.', list: ['Krishnanagar Artisans', 'Murshidabad District', 'Family Traditions', 'Hereditary Skills'] },
            modern: { text: 'Contemporary versions include improved durability and modern themes. The craft has gained recognition as a cultural treasure, with efforts to preserve and promote it nationally.', list: ['Improved Durability', 'Modern Themes', 'Cultural Recognition', 'Preservation Efforts'] }
        }
    }
];

const TAB_ORDER = [
    { key: 'techniques', label: 'Techniques', icon: '🔧' },
    { key: 'cultural', label: 'Cultural Significance', icon: '🎭' },
    { key: 'materials', label: 'Materials', icon: '🌿' },
    { key: 'artisans', label: 'Artisan Communities', icon: '👨‍🎨' },
    { key: 'modern', label: 'Modern Adaptations', icon: '✨' }
];

const CAROUSEL_VISIBLE_COUNT = 5;

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

function initToysPage() {
    const categoryGrid = document.getElementById('toys-category-grid');
    const cardsRow = document.getElementById('toys-cards-row');
    const detailPanel = document.getElementById('toys-detail-panel');
    const modalBackdrop = document.getElementById('toys-modal-backdrop');
    const searchInput = document.getElementById('toys-search-input');
    const stateSelect = document.getElementById('toys-state-select');
    const categorySelect = document.getElementById('toys-category-select');
    const sortSelect = document.getElementById('toys-sort-select');
    const resetBtn = document.getElementById('toys-reset-btn');
    const rowArrow = document.getElementById('toys-row-arrow');

    let toysDetailFocusTrap = null;

    if (!categoryGrid || !cardsRow || !detailPanel) return;

    let currentList = [...TOYS_DATA];
    let windowStart = 0;
    let activeTab = 'techniques';

    /* ---------- Render Categories ---------- */
    function renderCategories() {
        categoryGrid.innerHTML = CATEGORIES_DATA.map(c => `
            <div class="toys-category-card" data-category="${c.key}">
                <span class="category-icon">${c.icon}</span>
                <span class="category-name">${c.name}</span>
            </div>
        `).join('');

        categoryGrid.querySelectorAll('.toys-category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                categorySelect.value = category;
                applyFilters();
                document.getElementById('toys-cards-row').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function updateActiveCategoryCard() {
        const current = categorySelect.value;
        categoryGrid.querySelectorAll('.toys-category-card').forEach(card => {
            card.classList.toggle('active', card.dataset.category === current);
        });
    }

    /* ---------- Render: Fixed 5-Card Carousel Window ---------- */
    function renderWindow(animateLast) {
        if (!currentList.length) {
            cardsRow.innerHTML = `<p style="color:var(--text-muted); font-family:var(--font-body); padding:20px; grid-column: 1 / -1;">No toys match your filters. Try resetting them.</p>`;
            rowArrow?.classList.add('disabled');
            return;
        }

        const total = currentList.length;
        const count = Math.min(CAROUSEL_VISIBLE_COUNT, total);
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(currentList[(windowStart + i) % total]);
        }

        cardsRow.innerHTML = items.map((t, idx) => {
            const enter = animateLast && idx === count - 1 ? ' card-enter' : '';
            return `
            <div class="toy-card${enter}" data-id="${t.id}">
                <div class="toy-card-img-wrap">
                    <span class="toy-placeholder-icon">${t.icon}</span>
                    <button class="toy-card-fav" data-fav="${t.id}" aria-label="Save ${t.name}">♡</button>
                </div>
                <div class="toy-card-body">
                    <div class="toy-card-title-row">
                        <h3>${t.name}</h3>
                        <span class="toy-card-state-badge">${STATE_LABELS[t.state]}</span>
                    </div>
                    <p class="toy-card-desc">${t.cardDesc}</p>
                    <div class="toy-card-meta">
                        <div class="toy-card-meta-row"><span class="meta-icon">🪵</span><span>${t.materials}</span></div>
                        <div class="toy-card-meta-row"><span class="meta-icon">🎨</span><span>${t.craftsmanship}</span></div>
                    </div>
                    <button class="toy-card-view-btn" data-view="${t.id}">View More ›</button>
                </div>
            </div>
        `;
        }).join('');

        if (total <= CAROUSEL_VISIBLE_COUNT) {
            rowArrow?.classList.add('disabled');
        } else {
            rowArrow?.classList.remove('disabled');
        }

        cardsRow.querySelectorAll('.toy-card').forEach(card => {
            card.addEventListener('click', () => {
                openToyDetail(card.dataset.id);
            });
        });

        cardsRow.querySelectorAll('[data-fav]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('active');
                btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
            });
        });
    }

    /* ---------- Detail Popup ---------- */
    function openToyDetail(toyId) {
        const t = TOYS_DATA.find(toy => toy.id === toyId);
        if (!t) return;

        activeTab = 'techniques';

        const tabButtons = TAB_ORDER.map(tab => `
            <button class="toys-tab-btn ${tab.key === activeTab ? 'active' : ''}" data-tab="${tab.key}">
                <span>${tab.icon}</span> ${tab.label}
            </button>
        `).join('');

        const tabPanels = TAB_ORDER.map(tab => {
            const data = t.tabs[tab.key];
            return `
                <div class="toys-tab-panel ${tab.key === activeTab ? 'active' : ''}" data-panel="${tab.key}">
                    <p class="toys-tab-text">${data.text}</p>
                    <ul class="toys-tab-checklist">
                        ${data.list.map(item => `<li><span class="check-icon">✓</span>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }).join('');

        detailPanel.innerHTML = `
            <div class="toys-detail-img-col">
                <span class="toy-detail-placeholder">${t.icon}</span>
            </div>
            <div class="toys-detail-content-col">
                <button class="toys-detail-close" id="toys-detail-close" aria-label="Close">✕</button>
                <div class="toys-detail-title-row">
                    <h2>${t.name}</h2>
                </div>
                <p class="toys-detail-desc">${t.overview}</p>
                <div class="toys-detail-stats">
                    <div class="toys-detail-stat">
                        <span class="stat-icon">📍</span>
                        <div>
                            <div class="toys-detail-stat-label">State</div>
                            <div class="toys-detail-stat-value">${STATE_LABELS[t.state]}</div>
                        </div>
                    </div>
                    <div class="toys-detail-stat">
                        <span class="stat-icon">📦</span>
                        <div>
                            <div class="toys-detail-stat-label">Category</div>
                            <div class="toys-detail-stat-value">${CATEGORIES_DATA.find(c => c.key === t.category)?.name || t.category}</div>
                        </div>
                    </div>
                    <div class="toys-detail-stat">
                        <span class="stat-icon">🪵</span>
                        <div>
                            <div class="toys-detail-stat-label">Materials</div>
                            <div class="toys-detail-stat-value">${t.materials}</div>
                        </div>
                    </div>
                    <div class="toys-detail-stat">
                        <span class="stat-icon">🎨</span>
                        <div>
                            <div class="toys-detail-stat-label">Craftsmanship</div>
                            <div class="toys-detail-stat-value">${t.craftsmanship}</div>
                        </div>
                    </div>
                </div>
                <div class="toys-detail-tabs">${tabButtons}</div>
                ${tabPanels}
            </div>
        `;

        detailPanel.querySelectorAll('.toys-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                detailPanel.querySelectorAll('.toys-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === activeTab));
                detailPanel.querySelectorAll('.toys-tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === activeTab));
            });
        });

        document.getElementById('toys-detail-close')?.addEventListener('click', closeToyDetail);

        modalBackdrop.classList.add('open');
        detailPanel.classList.add('open');
        document.body.style.overflow = 'hidden';
        toysDetailFocusTrap = window.setupFocusTrap(detailPanel);
    }

    function closeToyDetail() {
        modalBackdrop.classList.remove('open');
        detailPanel.classList.remove('open');
        document.body.style.overflow = '';
        if (toysDetailFocusTrap) {
            toysDetailFocusTrap.deactivate();
            toysDetailFocusTrap = null;
        }
    }

    modalBackdrop?.addEventListener('click', closeToyDetail);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeToyDetail();
        }
    });

    /* ---------- Filtering ---------- */
    function applyFilters() {
        const query = (searchInput?.value || '').trim().toLowerCase();
        const state = stateSelect?.value || 'all';
        const category = categorySelect?.value || 'all';
        let list = TOYS_DATA.filter(t => {
            const matchesState = state === 'all' || t.state === state;
            const matchesCategory = category === 'all' || t.category === category;
            const matchesQuery = !query ||
                t.name.toLowerCase().includes(query) ||
                STATE_LABELS[t.state].toLowerCase().includes(query) ||
                CATEGORIES_DATA.find(c => c.key === t.category)?.name.toLowerCase().includes(query) ||
                t.materials.toLowerCase().includes(query) ||
                t.craftsmanship.toLowerCase().includes(query) ||
                t.history.toLowerCase().includes(query) ||
                Object.values(t.tabs).some(tab => tab.text.toLowerCase().includes(query) || tab.list.join(' ').toLowerCase().includes(query));
            return matchesState && matchesCategory && matchesQuery;
        });

        currentList = sortList(list, sortSelect?.value || 'popular');
        windowStart = 0;
        renderWindow(false);
        updateActiveCategoryCard();
    }

    function sortList(list, mode) {
        const copy = [...list];
        if (mode === 'az') {
            copy.sort((a, b) => a.name.localeCompare(b.name));
        } else if (mode === 'state') {
            copy.sort((a, b) => STATE_LABELS[a.state].localeCompare(STATE_LABELS[b.state]));
        }
        return copy;
    }

    /* ---------- Events ---------- */
    searchInput?.addEventListener('input', applyFilters);
    stateSelect?.addEventListener('change', applyFilters);
    categorySelect?.addEventListener('change', applyFilters);
    sortSelect?.addEventListener('change', applyFilters);

    resetBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (stateSelect) stateSelect.value = 'all';
        if (categorySelect) categorySelect.value = 'all';
        if (sortSelect) sortSelect.value = 'popular';
        applyFilters();
    });

    rowArrow?.addEventListener('click', () => {
        if (currentList.length <= CAROUSEL_VISIBLE_COUNT) return;
        windowStart = (windowStart + 1) % currentList.length;
        renderWindow(true);
    });

    /* ---------- Init ---------- */
    renderCategories();
    applyFilters();
}
