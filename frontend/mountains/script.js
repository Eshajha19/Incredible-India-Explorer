/* ============================================================
   Mountains of India — Landing Page Script
   Specific real images, every card has Explore button, animations.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const mountains = [
    {
      id: "kangchenjunga",
      name: "Kangchenjunga",
      height: 8586,
      heightDisplay: "8,586 m",
      range: "Himalayas",
      subrange: "Kangchenjunga Himal",
      state: "Sikkim",
      region: "north",
      difficulty: "Extreme",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Kangchenjunga_PangPema.JPG/960px-Kangchenjunga_PangPema.JPG",
      firstAscent: "1955",
      description: "The third highest mountain in the world and the highest in India. Its name means 'Five Treasures of the Great Snow' for its five peaks.",
      fact: "Kangchenjunga is worshipped as a guardian deity by the Sikkimese people, and climbers traditionally stop a few metres short of the summit out of respect.",
      link: "../kanchenjunga/kanchenjunga.html",
      linkLabel: "Explore Peak",
      tags: ["8000er", "highest-in-india"]
    },
    {
      id: "nanda-devi",
      name: "Nanda Devi",
      height: 7816,
      heightDisplay: "7,816 m",
      range: "Himalayas",
      subrange: "Garhwal Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Nanda_devi.jpg",
      firstAscent: "1936",
      description: "India's second highest peak and a UNESCO World Heritage Site. The Nanda Devi National Park surrounding it is one of the most biologically rich Himalayan zones.",
      fact: "Nanda Devi was considered unclimbable for decades due to its remote inner sanctuary surrounded by a 7,000 m ring of peaks.",
      link: "../nanda-devi/nanda-devi.html",
      linkLabel: "Explore Peak",
      tags: ["world-heritage"]
    },
    {
      id: "kamet",
      name: "Kamet",
      height: 7756,
      heightDisplay: "7,756 m",
      range: "Himalayas",
      subrange: "Garhwal Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kamet_Closeup.jpg/960px-Kamet_Closeup.jpg",
      firstAscent: "1931",
      description: "The second highest mountain in the Garhwal region, located near the Indo-Tibetan border. It was the first peak over 7,620 m to be climbed.",
      fact: "Kamet was the first peak above 25,000 ft to be successfully climbed, in 1931 by a British expedition.",
      link: "https://en.wikipedia.org/wiki/Kamet",
      linkLabel: "Explore More",
      tags: []
    },
    {
      id: "saser-kangri",
      name: "Saser Kangri I",
      height: 7672,
      heightDisplay: "7,672 m",
      range: "Karakoram",
      subrange: "Saser Muztagh",
      state: "Ladakh",
      region: "north",
      difficulty: "Extreme",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/SaserKangri1.jpg/960px-SaserKangri1.jpg",
      firstAscent: "1973",
      description: "The highest peak in the Saser Muztagh subrange of the eastern Karakoram, and the highest peak in Indian-administered Ladakh.",
      fact: "Saser Kangri I was first climbed by a team from the Indian Army in 1973.",
      link: "https://en.wikipedia.org/wiki/Saser_Kangri",
      linkLabel: "Explore More",
      tags: []
    },
    {
      id: "mamostong-kangri",
      name: "Mamostong Kangri",
      height: 7516,
      heightDisplay: "7,516 m",
      range: "Karakoram",
      subrange: "Siachen Muztagh",
      state: "Ladakh",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Siachin20.JPG/960px-Siachin20.JPG",
      firstAscent: "1981",
      description: "A remote and challenging peak in the eastern Karakoram range of Ladakh, standing in the Siachen Muztagh subrange.",
      fact: "Mamostong Kangri was first climbed by an Indo-Japanese expedition in 1981 through an extremely technical route.",
      link: "../mamostong-kangri/mamostong-kangri.html",
      linkLabel: "Explore Peak",
      tags: ["restricted-access"]
    },
    {
      id: "sia-kangri",
      name: "Sia Kangri",
      height: 7442,
      heightDisplay: "7,442 m",
      range: "Karakoram",
      subrange: "Siachen Muztagh",
      state: "Ladakh",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Siachin20.JPG/960px-Siachin20.JPG",
      firstAscent: "1934",
      description: "Located near the head of the Siachen Glacier, Sia Kangri is one of the most remote peaks in the eastern Karakoram.",
      fact: "Sia Kangri sits near the India-Pakistan-China tri-junction area, making it one of the most geopolitically sensitive peaks.",
      link: "https://en.wikipedia.org/wiki/Sia_Kangri",
      linkLabel: "Explore More",
      tags: ["restricted-access"]
    },
    {
      id: "saltoro-kangri",
      name: "Saltoro Kangri",
      height: 7742,
      heightDisplay: "7,742 m",
      range: "Karakoram",
      subrange: "Saltoro Range",
      state: "Ladakh",
      region: "north",
      difficulty: "Extreme",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/SaserKangri1.jpg/960px-SaserKangri1.jpg",
      firstAscent: "1962",
      description: "The highest peak of the Saltoro Ridge in the Siachen Muztagh, one of the most remote and strategically sensitive mountains on Earth.",
      fact: "Saltoro Kangri rises above the Siachen Glacier, the world's longest non-polar glacier at 76 km.",
      link: "../saltoro-kangri/saltoro-kangri.html",
      linkLabel: "Explore Peak",
      tags: ["restricted-access"]
    },
    {
      id: "rimo-i",
      name: "Rimo I",
      height: 7385,
      heightDisplay: "7,385 m",
      range: "Karakoram",
      subrange: "Rimo Muztagh",
      state: "Ladakh",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/ISS014-E-6863_-_View_of_India.jpg/960px-ISS014-E-6863_-_View_of_India.jpg",
      firstAscent: "1988",
      description: "The 71st highest peak in the world, located in the Rimo Muztagh subrange. Its name means 'striped mountain' in the local language.",
      fact: "Rimo I is located just 20 km northeast of the Siachen Glacier snout and access requires special government clearances.",
      link: "../rimo-i/rimo-i.html",
      linkLabel: "Explore Peak",
      tags: ["restricted-access"]
    },
    {
      id: "trisul-i",
      name: "Trisul I",
      height: 7120,
      heightDisplay: "7,120 m",
      range: "Himalayas",
      subrange: "Kumaon Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Time_lapse_shot_of_Trishul_peak.jpg/960px-Time_lapse_shot_of_Trishul_peak.jpg",
      firstAscent: "1907",
      description: "The highest of the three Trisul peaks, named after Lord Shiva's trident. The first 7,000 m peak ever to be climbed, in 1907.",
      fact: "Trisul was the first mountain over 7,000 metres to be climbed, by T.G. Longstaff's expedition in 1907.",
      link: "../trisul-i/trisul-i.html",
      linkLabel: "Explore Peak",
      tags: ["first-7000er"]
    },
    {
      id: "kun",
      name: "Kun",
      height: 7087,
      heightDisplay: "7,087 m",
      range: "Himalayas",
      subrange: "Zanskar Range",
      state: "Himachal Pradesh",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kamet_Closeup.jpg/960px-Kamet_Closeup.jpg",
      firstAscent: "1910",
      description: "The highest peak in the Zanskar Range, located in the Lahaul and Spiti district of Himachal Pradesh.",
      fact: "Kun stands alongside its neighbour Papsura (6,451 m), forming a dramatic double-peak visible from the Manali-Leh highway.",
      link: "https://en.wikipedia.org/wiki/Kun_(peak)",
      linkLabel: "Explore More",
      tags: []
    },
    {
      id: "satopanth",
      name: "Satopanth",
      height: 7075,
      heightDisplay: "7,075 m",
      range: "Himalayas",
      subrange: "Gangotri Group",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mt_Satopanth_WTK20150921-IMG_2832.jpg/960px-Mt_Satopanth_WTK20150921-IMG_2832.jpg",
      firstAscent: "1947",
      description: "A significant peak in the Gangotri Group of the Garhwal Himalayas, standing at the head of the Gangotri Glacier system.",
      fact: "Satopanth means 'Truth Path' in Sanskrit and the lake at its base is considered sacred by locals.",
      link: "../satopanth/satopanth.html",
      linkLabel: "Explore Peak",
      tags: []
    },
    {
      id: "dunagiri",
      name: "Dunagiri",
      height: 7066,
      heightDisplay: "7,066 m",
      range: "Himalayas",
      subrange: "Garhwal Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dunagiri_from_Kuari_Pass.jpg/960px-Dunagiri_from_Kuari_Pass.jpg",
      firstAscent: "1958",
      description: "A sacred peak in the Garhwal Himalayas guarding the approach to the Nanda Devi Inner Sanctuary. Revered locally as the abode of Goddess Duna.",
      fact: "Dunagiri's name derives from 'Drona' (a sage from the Mahabharata) and 'giri' (mountain), and locals revere it as the home of Goddess Duna.",
      link: "../dunagiri/dunagiri.html",
      linkLabel: "Explore Peak",
      tags: ["garhwal-himalayas"]
    },
    {
      id: "kedarnath",
      name: "Kedarnath Peak",
      height: 6940,
      heightDisplay: "6,940 m",
      range: "Himalayas",
      subrange: "Garhwal Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mt._Kedarnath.jpg/960px-Mt._Kedarnath.jpg",
      firstAscent: "1932",
      description: "A sacred 6,940 m peak in the Garhwal Himalayas, towering over the famous Kedarnath Temple — one of the twelve Jyotirlingas and a key destination in the Char Dham Yatra.",
      fact: "Kedarnath is part of the Panch Kedar — five sacred Shiva temples across Garhwal — and the peak is fed by the Chorabari Glacier, source of the Mandakini River.",
      link: "../kedarnath/kedarnath.html",
      linkLabel: "Explore Peak",
      tags: ["garhwal-himalayas", "sacred-peak"]
    },
    {
      id: "shivaling",
      name: "Shivling",
      height: 6543,
      heightDisplay: "6,543 m",
      range: "Himalayas",
      subrange: "Gangotri Group",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shivling_from_Nandanvan%2C_Mountain_peaks_of_Himalayas_Uttarakhand_India.jpg/960px-Shivling_from_Nandanvan%2C_Mountain_peaks_of_Himalayas_Uttarakhand_India.jpg",
      firstAscent: "1974",
      description: "Often called the 'Matterhorn of India' for its striking pyramid shape, Shivling rises dramatically above the Tapovan meadow near Gaumukh.",
      fact: "Valeri Babanov won the Piolet d'Or in 2002 for his solo first ascent of Shivling's north face.",
      link: "../shivling/shivling.html",
      linkLabel: "Explore Peak",
      tags: []
    },
    {
      id: "panchachuli-i",
      name: "Panchachuli I",
      height: 6355,
      heightDisplay: "6,355 m",
      range: "Himalayas",
      subrange: "Kumaon Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Panchchuli_mountain_%2800307%29.JPG/960px-Panchchuli_mountain_%2800307%29.JPG",
      firstAscent: "1972",
      description: "The highest of the five Panchachuli peaks in the Kumaon Himalayas, visible from the town of Munsiyari.",
      fact: "The Panchachuli peaks are said to be the place where the Pandavas cooked their last meal before ascending to heaven.",
      link: "../panchachuli-i/panchachuli-i.html",
      linkLabel: "Explore Peak",
      tags: ["mythological"]
    },
    {
      id: "bandarpoonch",
      name: "Bandarpoonch",
      height: 6316,
      heightDisplay: "6,316 m",
      range: "Himalayas",
      subrange: "Saraswati Range",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bandarpunch.jpg/960px-Bandarpunch.jpg",
      firstAscent: "1950",
      description: "Its name means 'Monkey's Tail' in Hindi, referencing its long, curving ridge. It stands in the same range as Swargarohini.",
      fact: "Bandarpoonch was one of the first major Himalayan peaks to be climbed by an Indian expedition post-independence.",
      link: "../bandarpoonch/bandarpoonch.html",
      linkLabel: "Explore Peak",
      tags: []
    },
    {
      id: "swargarohini",
      name: "Swargarohini",
      height: 6252,
      heightDisplay: "6,252 m",
      range: "Himalayas",
      subrange: "Saraswati Range",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Swargrohini_Oodari.jpg/960px-Swargrohini_Oodari.jpg",
      firstAscent: "1974",
      description: "Legend holds this is the mythical 'Stairway to Heaven' from the Mahabharata. Only Yudhishthira is said to have reached the summit.",
      fact: "Its northern face drops almost vertically for 2,000 metres into the Tons River valley.",
      link: "../swargarohini/swargarohini.html",
      linkLabel: "Explore Peak",
      tags: ["mythological"]
    },
    {
      id: "indrasan",
      name: "Indrasan",
      height: 6221,
      heightDisplay: "6,221 m",
      range: "Himalayas",
      subrange: "Pir Panjal Range",
      state: "Himachal Pradesh",
      region: "north",
      difficulty: "Hard",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Time_lapse_shot_of_Trishul_peak.jpg/960px-Time_lapse_shot_of_Trishul_peak.jpg",
      firstAscent: "1968",
      description: "Named after Lord Indra, the king of gods in Hindu mythology. Located in the Pir Panjal Range of Himachal Pradesh.",
      fact: "Indrasan is considered one of the most technically difficult peaks in the Pir Panjal range.",
      link: "../indrasan/indrasan.html",
      linkLabel: "Explore Peak",
      tags: ["mythological"]
    },
    {
      id: "hanuman-tibba",
      name: "Hanuman Tibba",
      height: 5982,
      heightDisplay: "5,982 m",
      range: "Himalayas",
      subrange: "Dhauladhar Range",
      state: "Himachal Pradesh",
      region: "north",
      difficulty: "Moderate",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Time_lapse_shot_of_Trishul_peak.jpg/960px-Time_lapse_shot_of_Trishul_peak.jpg",
      firstAscent: "1939",
      description: "The highest peak of the Dhauladhar range, named after Lord Hanuman. Towering over Manali and the Solang Valley, it is one of the most iconic mountains in Himachal Pradesh.",
      fact: "Hanuman Tibba is believed to be the resting place of Lord Hanuman during his mythical flight to Lanka to fetch the Sanjeevani herb.",
      link: "../hanuman-tibba/hanuman-tibba.html",
      linkLabel: "Explore Peak",
      tags: ["mythological"]
    },
    {
      id: "stok-kangri",
      name: "Stok Kangri",
      height: 6153,
      heightDisplay: "6,153 m",
      range: "Himalayas",
      subrange: "Stok Range",
      state: "Ladakh",
      region: "north",
      difficulty: "Moderate",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Stok_Kangri_.jpg/960px-Stok_Kangri_.jpg",
      firstAscent: "1911",
      description: "A popular peak for trekkers and aspiring mountaineers, offering panoramic views of the Karakoram from its summit near Leh.",
      fact: "Stok Kangri is one of the most accessible 6,000 m peaks in India, with base camp just two days' trek from Stok village.",
      link: "https://en.wikipedia.org/wiki/Stok_Kangri",
      linkLabel: "Explore More",
      tags: ["beginner-friendly"]
    },
    {
      id: "friendship-peak",
      name: "Friendship Peak",
      height: 5289,
      heightDisplay: "5,289 m",
      range: "Himalayas",
      subrange: "Pir Panjal Range",
      state: "Himachal Pradesh",
      region: "north",
      difficulty: "Moderate",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kamet_Closeup.jpg/960px-Kamet_Closeup.jpg",
      firstAscent: "1965",
      description: "A popular trekking and mountaineering peak near Manali, known for its accessible summit with stunning views of the Pir Panjal and Dhauladhar ranges.",
      fact: "Friendship Peak was named to symbolise India's friendship with other nations, and it is a favourite training peak for beginners.",
      link: "https://en.wikipedia.org/wiki/Friendship_Peak",
      linkLabel: "Explore More",
      tags: ["beginner-friendly"]
    },
    {
      id: "chandrashila",
      name: "Chandrashila",
      height: 4000,
      heightDisplay: "4,000 m",
      range: "Himalayas",
      subrange: "Garhwal Himalayas",
      state: "Uttarakhand",
      region: "north",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/AjitHota-ChandrasilaPeak.jpg/960px-AjitHota-ChandrasilaPeak.jpg",
      firstAscent: "N/A",
      description: "A legendary summit with a temple dedicated to Goddess Chandi and Lord Shiva, offering 360-degree views of the Garhwal Himalayas.",
      fact: "Mythology holds that Lord Rama meditated on Chandrashila after defeating Ravana.",
      link: "https://en.wikipedia.org/wiki/Chandrashila",
      linkLabel: "Explore More",
      tags: ["mythological", "beginner-friendly"]
    },
    {
      id: "anamudi",
      name: "Anamudi",
      height: 2695,
      heightDisplay: "2,695 m",
      range: "Western Ghats",
      subrange: "Anamalai Hills",
      state: "Kerala",
      region: "south",
      difficulty: "Moderate",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/AnaimudiPeak_DSC_4834.jpg/960px-AnaimudiPeak_DSC_4834.jpg",
      firstAscent: "N/A",
      description: "The highest peak in South India and the Western Ghats, rising above the tea plantations and shola forests of the Anamalai Hills.",
      fact: "Anamudi means 'Elephant's Forehead', referencing its shape. The Eravikulam National Park at its base protects the endangered Nilgiri Tahr.",
      link: "https://en.wikipedia.org/wiki/Anamudi",
      linkLabel: "Explore More",
      tags: ["highest-south-india"]
    },
    {
      id: "doddabetta",
      name: "Doddabetta",
      height: 2637,
      heightDisplay: "2,637 m",
      range: "Western Ghats",
      subrange: "Nilgiri Hills",
      state: "Tamil Nadu",
      region: "south",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Arts_College_Hill_Ooty_Nilgiris_Mar21_A7C_00188.jpg/960px-Arts_College_Hill_Ooty_Nilgiris_Mar21_A7C_00188.jpg",
      firstAscent: "N/A",
      description: "The highest peak in the Nilgiri Hills, with a telescope house at the summit offering panoramic views of the surrounding ranges.",
      fact: "Doddabetta means 'Big Peak' in Kannada and sits at the junction of the Eastern and Western Ghats.",
      link: "https://en.wikipedia.org/wiki/Doddabetta",
      linkLabel: "Explore More",
      tags: []
    },
    {
      id: "mullayanagiri",
      name: "Mullayanagiri",
      height: 1930,
      heightDisplay: "1,930 m",
      range: "Western Ghats",
      subrange: "Baba Budan Giri",
      state: "Karnataka",
      region: "south",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mullayanagiri_peak,_Chikamagalur,_Karnataka,_India.jpg/960px-Mullayanagiri_peak,_Chikamagalur,_Karnataka,_India.jpg",
      firstAscent: "N/A",
      description: "The highest peak in Karnataka, nestled in the Baba Budan Giri range of the Western Ghats.",
      fact: "The peak is named after a local saint and is a popular trekking destination with rolling grasslands.",
      link: "https://en.wikipedia.org/wiki/Mullayanagiri",
      linkLabel: "Explore More",
      tags: []
    },
    {
      id: "kalsubai",
      name: "Kalsubai",
      height: 1646,
      heightDisplay: "1,646 m",
      range: "Western Ghats",
      subrange: "Sahyadri",
      state: "Maharashtra",
      region: "west",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kalasubai.jpg/960px-Kalasubai.jpg",
      firstAscent: "N/A",
      description: "Maharashtra's highest peak, often called the 'Everest of Maharashtra'. A popular monsoon trek through the Sahyadri range.",
      fact: "Kalsubai is a short but steep trek and has a small temple at its summit dedicated to a local goddess.",
      link: "https://en.wikipedia.org/wiki/Kalsubai",
      linkLabel: "Explore More",
      tags: ["highest-maharashtra"]
    },
    {
      id: "guru-shikhar",
      name: "Guru Shikhar",
      height: 1722,
      heightDisplay: "1,722 m",
      range: "Aravalli Range",
      subrange: "Mount Abu",
      state: "Rajasthan",
      region: "west",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Arbuda_Mountains.JPG/960px-Arbuda_Mountains.JPG",
      firstAscent: "N/A",
      description: "The highest point of the Aravalli Range, located near the hill station of Mount Abu in Rajasthan.",
      fact: "A temple dedicated to Guru Dattatreya stands at the summit, and a viewpoint offers views of the surrounding desert landscape.",
      link: "https://en.wikipedia.org/wiki/Guru_Shikhar",
      linkLabel: "Explore More",
      tags: ["highest-rajasthan"]
    },
    {
      id: "jindhagada",
      name: "Jindhagada Peak",
      height: 1690,
      heightDisplay: "1,690 m",
      range: "Eastern Ghats",
      subrange: "Araku Valley",
      state: "Andhra Pradesh",
      region: "south",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Araku_Valley.jpg/960px-Araku_Valley.jpg",
      firstAscent: "N/A",
      description: "The highest peak of the Eastern Ghats, located near Araku Valley in Andhra Pradesh, surrounded by dense forests.",
      fact: "Jindhagada Peak is in the Araku Valley region, famous for its tribal culture, coffee plantations, and scenic train rides.",
      link: "https://en.wikipedia.org/wiki/Jindhagada",
      linkLabel: "Explore More",
      tags: ["highest-eastern-ghats"]
    },
    {
      id: "mahendragiri",
      name: "Mahendragiri",
      height: 1501,
      heightDisplay: "1,501 m",
      range: "Eastern Ghats",
      subrange: "Eastern Ghats",
      state: "Odisha",
      region: "east",
      difficulty: "Moderate",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mahendragiri_Hills.jpg/960px-Mahendragiri_Hills.jpg",
      firstAscent: "N/A",
      description: "An important peak of the Eastern Ghats in Odisha, known for its rich biodiversity and mythological significance.",
      fact: "Mahendragiri is believed to be the place where the Pandavas rested during their exile, as mentioned in the Mahabharata.",
      link: "https://en.wikipedia.org/wiki/Mahendragiri_(Odisha)",
      linkLabel: "Explore More",
      tags: ["mythological"]
    },
    {
      id: "dhupgarh",
      name: "Dhupgarh",
      height: 1350,
      heightDisplay: "1,350 m",
      range: "Satpura Range",
      subrange: "Mahadeo Hills",
      state: "Madhya Pradesh",
      region: "central",
      difficulty: "Easy",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dhupgarh%2C_the_highest_mountain_peak_of_Madhya_Pradesh_gives_a_spectacular_view_of_the_sunset.jpg/960px-Dhupgarh%2C_the_highest_mountain_peak_of_Madhya_Pradesh_gives_a_spectacular_view_of_the_sunset.jpg",
      firstAscent: "N/A",
      description: "The highest point in Madhya Pradesh, situated atop the Mahadeo Hills in the Satpura Range near Pachmarhi.",
      fact: "Dhupgarh is famous for its stunning sunrise and sunset views, making it a popular spot for tourists visiting Pachmarhi.",
      link: "https://en.wikipedia.org/wiki/Dhupgarh",
      linkLabel: "Explore More",
      tags: ["highest-madhya-pradesh"]
    }
  ];

  let activeRange = "all";
  let searchQuery = "";
  let sortBy = "height-desc";

  const cardsGrid = document.getElementById("mountains-cards-grid");
  const rangeFilter = document.getElementById("mountains-range-filter");
  const searchInput = document.getElementById("mountains-search-input");
  const sortSelect = document.getElementById("mountains-sort-select");
  const resultStatus = document.getElementById("mountains-result-status");
  const emptyState = document.getElementById("mountains-empty");

  const ranges = [...new Set(mountains.map(m => m.range))].sort();

  rangeFilter.innerHTML = `
    <button class="mtn-filter-btn active" data-range="all" aria-pressed="true">All Ranges</button>
    ${ranges.map(r => `<button class="mtn-filter-btn" data-range="${r}" aria-pressed="false">${r}</button>`).join("")}
  `;

  function getFiltered() {
    let list = [...mountains];
    if (activeRange !== "all") list = list.filter(m => m.range === activeRange);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) ||
        m.range.toLowerCase().includes(q) ||
        m.subrange.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "height-asc":  list.sort((a, b) => a.height - b.height); break;
      case "height-desc": list.sort((a, b) => b.height - a.height); break;
      case "name-asc":    list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc":   list.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return list;
  }

  function render() {
    const filtered = getFiltered();
    if (filtered.length === 0) {
      cardsGrid.innerHTML = "";
      emptyState.classList.add("visible");
    } else {
      emptyState.classList.remove("visible");
      cardsGrid.innerHTML = filtered.map((m, i) => `
        <article class="mtn-card" data-id="${m.id}" data-range="${m.range}" style="animation-delay:${Math.min(i * 0.06, 0.6)}s">
          <div class="mtn-card-media">
            <img alt="${m.name} mountain peak" loading="lazy" src="${m.image}"
              onerror="this.onerror=null;this.classList.add('mtn-img-error');this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23111827%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2245%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236b7280%22 font-size=%2218%22 font-family=%22sans-serif%22>🏔️</text><text x=%2250%25%22 y=%2260%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2213%22 font-family=%22sans-serif%22>${m.name}</text></svg>'" />
            <span class="mtn-range-badge">${m.range}</span>
            <span class="mtn-height-badge">${m.heightDisplay}</span>
          </div>
          <div class="mtn-card-body">
            <h3 class="mtn-card-title">${m.name}</h3>
            <p class="mtn-card-state"><i class="fa-solid fa-location-dot"></i> ${m.state}</p>
            <div class="mtn-card-meta">
              <div class="mtn-meta-box">
                <span class="mtn-meta-label">Subrange</span>
                <span class="mtn-meta-value">${m.subrange}</span>
              </div>
              <div class="mtn-meta-box">
                <span class="mtn-meta-label">Difficulty</span>
                <span class="mtn-meta-value mtn-diff-${m.difficulty.toLowerCase()}">${m.difficulty}</span>
              </div>
              <div class="mtn-meta-box">
                <span class="mtn-meta-label">First Ascent</span>
                <span class="mtn-meta-value">${m.firstAscent}</span>
              </div>
              <div class="mtn-meta-box">
                <span class="mtn-meta-label">Region</span>
                <span class="mtn-meta-value">${m.region.charAt(0).toUpperCase() + m.region.slice(1)} India</span>
              </div>
            </div>
            <p class="mtn-card-desc">${m.description}</p>
            <div class="mtn-card-fact">
              <i class="fa-solid fa-lightbulb"></i>
              <span>${m.fact}</span>
            </div>
            <div class="mtn-card-footer">
              <a href="${m.link}" class="mtn-card-explore-btn" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-mountain-sun"></i> ${m.linkLabel}
              </a>
              ${m.tags.length > 0 ? `<div class="mtn-card-tags">${m.tags.map(t => `<span class="mtn-tag">${t.replace(/-/g, " ")}</span>`).join("")}</div>` : ""}
            </div>
          </div>
        </article>
      `).join("");
    }

    const total = mountains.length;
    const shown = filtered.length;
    if (activeRange === "all" && !searchQuery) {
      resultStatus.textContent = `Showing all ${shown} peaks`;
    } else {
      const rangeLabel = activeRange === "all" ? "all ranges" : activeRange;
      resultStatus.textContent = `Showing ${shown} of ${total} peaks (${rangeLabel}${searchQuery ? `, matching "${searchQuery}"` : ""})`;
    }
  }

  rangeFilter.addEventListener("click", (e) => {
    const btn = e.target.closest(".mtn-filter-btn");
    if (!btn) return;
    activeRange = btn.dataset.range;
    rangeFilter.querySelectorAll(".mtn-filter-btn").forEach(b => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", String(isActive));
    });
    render();
  });

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    render();
  });

  sortSelect.addEventListener("change", () => {
    sortBy = sortSelect.value;
    render();
  });

  render();

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll(".scroll-reveal");
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("revealed");
        revealObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── Counter Animation ── */
  document.querySelectorAll(".mtn-hero-stat-value[data-count]").forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + "+";
    }, 40);
  });

  /* ── Hero Background Fallback ── */
  const heroBg = document.querySelector(".mtn-hero-bg");
  if (heroBg) {
    const bgImg = new Image();
    bgImg.onload = () => { heroBg.style.backgroundImage = `linear-gradient(180deg, rgba(7,16,22,0.15), rgba(7,16,22,0.92)), url("${bgImg.src}")`; };
    bgImg.src = "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&h=1080&fit=crop&q=80";
    bgImg.onerror = () => {
      heroBg.style.background = "linear-gradient(135deg, #0a1218 0%, #1a2332 50%, #0d1b2a 100%)";
    };
  }

  /* ── Scroll To Top ── */
  const scrollBtn = document.getElementById("btn-scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
