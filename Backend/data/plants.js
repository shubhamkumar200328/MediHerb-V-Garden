const plants = [
  {
    id: 1,
    name: "Tulsi",
    image:
      "https://cdn.pixabay.com/photo/2020/06/18/14/33/clove-basil-5313784_960_720.jpg",
    description: "Sacred basil used for immunity and respiratory health.",
    medicinalUse: "Immunity",
    region: "India",
    botanicalDetails:
      "Tulsi (Ocimum sanctum) is an aromatic shrub native to the Indian subcontinent.",
    cultivationTips:
      "Tulsi grows best in well-drained soil with plenty of sunlight. It should be watered regularly but not overwatered.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Eudicots, Asterids",
    Order: "Lamiales",
    Family: "Lamiaceae",
    Genus: "Ocimum",
    Species: "O. sanctum",
    BinomialName: "Ocimum sanctum",
    About:
      "Ocimum sanctum, commonly known as tulsi or holy basil, is an aromatic perennial plant native to the Indian subcontinent.",
    DetailDescription:
      "Tulsi is a small, bushy shrub with green or purple leaves, serrated margins, and hairy stems. It produces small purple or white flowers and has a strong aroma. The plant has significant medicinal properties, including anti-inflammatory, antimicrobial, and adaptogenic effects.",
    Reference: "https://en.wikipedia.org/wiki/Ocimum_tenuiflorum",

    learningModules: [
      {
        title: "History of Tulsi",
        content:
          "Tulsi has been revered in Indian culture for thousands of years. It is considered a sacred plant in Hinduism and is used in various religious ceremonies.",
        resources: [
          {
            type: "Article",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4296439/",
          },
          {
            type: "Video",
            url: "https://www.youtube.com/watch?v=example1",
          },
        ],
      },
      {
        title: "Medicinal Uses of Tulsi",
        content:
          "Tulsi is widely used in Ayurveda to treat respiratory disorders, boost immunity, and reduce stress.",
        resources: [
          {
            type: "Research Paper",
            url: "https://pubmed.ncbi.nlm.nih.gov/123456/",
          },
          {
            type: "Video",
            url: "https://www.youtube.com/watch?v=example2",
          },
        ],
      },
      {
        title: "Scientific Research on Tulsi",
        content:
          "Studies indicate that Tulsi possesses antibacterial, antiviral, and adaptogenic properties.",
        resources: [
          {
            type: "Journal",
            url: "https://www.sciencedirect.com/science/article/pii/S1234567890",
          },
        ],
      },
      {
        title: "Cultivation Techniques",
        content:
          "Tulsi grows best in warm climates with well-drained soil and requires regular watering.",
        resources: [
          {
            type: "E-Book",
            url: "https://www.agricultureguide.com/tulsi-cultivation",
          },
        ],
      },
      {
        title: "Processing and Usage",
        content:
          "Tulsi can be used in teas, oils, and herbal remedies. Learn about different methods of processing.",
        resources: [
          {
            type: "Tutorial",
            url: "https://www.youtube.com/watch?v=example3",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Neem",
    image:
      "https://inaturalist-open-data.s3.amazonaws.com/photos/466639451/large.jpeg",
    description: "Known for its antibacterial and antifungal properties.",
    medicinalUse: "Skin Care",
    region: "India",
    botanicalDetails:
      "Neem (Azadirachta indica) is a tree that can grow up to 15–20 meters tall, native to the Indian subcontinent.",
    cultivationTips:
      "Neem thrives in tropical and subtropical climates with moderate to high rainfall. It prefers dry, well-drained soil.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Eudicots, Rosids",
    Order: "Sapindales",
    Family: "Meliaceae",
    Genus: "Azadirachta",
    Species: "A. indica",
    BinomialName: "Azadirachta indica",
    About:
      "Azadirachta indica, commonly known as neem, is a fast-growing evergreen tree native to the Indian subcontinent. It has been used for centuries in Ayurvedic medicine.",
    DetailDescription:
      "Neem trees can grow up to 15-20 meters tall, with pinnate leaves and fragrant white flowers. The fruits are smooth, olive-shaped drupes with medicinal properties. Neem is widely known for its antibacterial, antifungal, and insecticidal properties.",
    Reference: "https://en.wikipedia.org/wiki/Neem",
  },
  {
    id: 3,
    name: "Aloe Vera",
    image:
      "https://cdn.pixabay.com/photo/2020/01/01/10/11/aloe-vera-4733276_960_720.jpg",
    description: "Aloe Vera is commonly used for skin hydration and healing.",
    medicinalUse: "Skin Care",
    region: "Tropical",
    botanicalDetails:
      "Aloe Vera (Aloe barbadensis miller) is a succulent plant species that has been used for centuries for its healing properties.",
    cultivationTips:
      "Aloe Vera thrives in dry, sandy, well-drained soil. It requires full sun but can also tolerate partial shade.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Monocots",
    Order: "Asparagales",
    Family: "Asphodelaceae",
    Genus: "Aloe",
    Species: "A. vera",
    BinomialName: "Aloe vera",
    About:
      "Aloe vera is a succulent plant species widely cultivated for its medicinal and cosmetic uses. It is native to the Arabian Peninsula but has naturalized in many regions.",
    DetailDescription:
      "Aloe vera has thick, fleshy leaves containing a gel-like substance known for its soothing and healing properties. It is commonly used for skincare, burns, and digestive health.",
    Reference: "https://en.wikipedia.org/wiki/Aloe_vera",
  },
  {
    id: 4,
    name: "Ashwagandha",
    image:
      "https://media.istockphoto.com/id/1684694377/photo/commonly-known-as-ashwagandha-is-an-important-medicinal-plant-that-has-been-used-in-ayurved.jpg?s=1024x1024&w=is&k=20&c=IEjtoUzYIQuRkyokC6_x_qMcWqzNnJJagCGJzNzyp68=",
    description: "Used to reduce stress and improve vitality.",
    medicinalUse: "Immunity",
    region: "India",
    botanicalDetails:
      "Ashwagandha (Withania somnifera) is a small shrub native to India and North Africa, known for its adaptogenic properties.",
    cultivationTips:
      "Ashwagandha prefers dry, loamy soil and needs full sun. It is drought-tolerant and should not be overwatered.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Eudicots, Asterids",
    Order: "Solanales",
    Family: "Solanaceae",
    Genus: "Withania",
    Species: "W. somnifera",
    BinomialName: "Withania somnifera",
    About:
      "Ashwagandha, also known as Indian ginseng, is a medicinal herb used in Ayurvedic medicine for its adaptogenic properties.",
    DetailDescription:
      "Ashwagandha is a small shrub with yellow flowers and red fruit. It is known for reducing stress, improving energy levels, and supporting immune function.",
    Reference: "https://en.wikipedia.org/wiki/Withania_somnifera",
  },
  {
    id: 5,
    name: "Mint",
    image: "https://cdn.pixabay.com/photo/2011/05/25/12/45/mint-7517_1280.jpg",
    description: "Known for soothing digestive issues and improving appetite.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Mint (Mentha) is a genus of plants in the Lamiaceae family. It includes varieties like peppermint and spearmint.",
    cultivationTips:
      "Mint grows best in moist, partially shaded environments and should be planted in containers to control its rapid spread.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Eudicots, Asterids",
    Order: "Lamiales",
    Family: "Lamiaceae",
    Genus: "Mentha",
    Species: "Varies",
    BinomialName: "Mentha spp.",
    About:
      "Mint is a widely used aromatic herb known for its fresh, cool flavor and medicinal properties.",
    DetailDescription:
      "Mint plants have square stems, serrated leaves, and produce small white or purple flowers. They are used in culinary applications and for digestive health.",
    Reference: "https://en.wikipedia.org/wiki/Mentha",
  },
  {
    id: 6,
    name: "Turmeric",
    image: "/images/turmeric.png",
    description: "Famous for its anti-inflammatory and antioxidant properties.",
    medicinalUse: "Immunity",
    region: "India",
    botanicalDetails:
      "Turmeric (Curcuma longa) is a flowering plant from the ginger family. It is native to Southeast Asia.",
    cultivationTips:
      "Turmeric thrives in warm, humid climates with well-drained, fertile soil. It requires regular watering, but the soil should not remain waterlogged.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Monocots",
    Order: "Zingiberales",
    Family: "Zingiberaceae",
    Genus: "Curcuma",
    Species: "C. longa",
    BinomialName: "Curcuma longa",
    About:
      "Turmeric is a flowering plant whose rhizomes are widely used as a spice and for medicinal purposes.",
    DetailDescription:
      "Turmeric plants have large, broad leaves and produce bright yellow-orange rhizomes known for their anti-inflammatory and antioxidant properties.",
    Reference: "https://en.wikipedia.org/wiki/Turmeric",
  },
  {
    id: 7,
    name: "Lavender",
    image: "/images/lavender.png",
    description: "Used for its calming effects and to treat skin irritations.",
    medicinalUse: "Skin Care",
    region: "Tropical",
    botanicalDetails:
      "Lavender (Lavandula) is a genus of flowering plants in the mint family, known for its fragrant flowers.",
    cultivationTips:
      "Lavender needs full sun and well-drained, slightly alkaline soil. It should be watered moderately and can tolerate drought.",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Eudicots, Asterids",
    Order: "Lamiales",
    Family: "Lamiaceae",
    Genus: "Lavandula",
    Species: "Varies",
    BinomialName: "Lavandula spp.",
    About:
      "Lavender is a fragrant flowering plant widely used for aromatherapy, skincare, and medicinal purposes.",
    DetailDescription:
      "Lavender has narrow, grey-green leaves and spikes of purple flowers. It is used for relaxation, stress relief, and antiseptic properties.",
    Reference: "https://en.wikipedia.org/wiki/Lavender",
  },
  {
    id: 8,
    name: "Ginger",
    image: "/images/ginger.png",
    description: "Used to treat nausea, improve digestion, and boost immunity.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Ginger (Zingiber officinale) is a flowering plant whose rhizome is widely used as a spice and medicine.",
    cultivationTips:
      "Ginger grows well in tropical climates, requiring warm temperatures, partial shade, and rich, well-drained soil.",
  },
  {
    id: 9,
    name: "Echinacea",
    image: "/images/echinacea.png",
    description:
      "Commonly used to boost the immune system and fight infections.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Echinacea (Echinacea purpurea) is a flowering plant in the daisy family, native to North America.",
    cultivationTips:
      "Echinacea thrives in full sun and well-drained, loamy soil. It is drought-tolerant once established.",
  },
  {
    id: 10,
    name: "Chamomile",
    image: "/images/chamomile.png",
    description: "Often used to calm nerves and aid sleep.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Chamomile (Matricaria chamomilla) is an herb known for its calming and anti-inflammatory properties.",
    cultivationTips:
      "Chamomile grows best in full sun and well-drained soil. It should be watered regularly, but not excessively.",
  },
  {
    id: 11,
    name: "Cinnamon",
    image: "/images/cinnamon.png",
    description:
      "Known for its ability to improve digestion and regulate blood sugar.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Cinnamon (Cinnamomum verum) is a spice obtained from the inner bark of trees from the genus Cinnamomum.",
    cultivationTips:
      "Cinnamon requires warm, humid tropical climates and well-drained soil. It should be grown in partial shade.",
  },
  {
    id: 12,
    name: "Lemon Balm",
    image: "/images/lemon-balm.png",
    description: "Used to reduce anxiety and promote better sleep.",
    medicinalUse: "Skin Care",
    region: "Tropical",
    botanicalDetails:
      "Lemon balm (Melissa officinalis) is a perennial herb in the mint family, with a lemon-like fragrance.",
    cultivationTips:
      "Lemon balm prefers moist, well-drained soil and full sun or partial shade. It should be watered regularly.",
  },
  {
    id: 13,
    name: "Peppermint",
    image: "/images/peppermint.png",
    description:
      "Used to treat digestive problems, headaches, and muscle pain.",
    medicinalUse: "Skin Care",
    region: "Tropical",
    botanicalDetails:
      "Peppermint (Mentha × piperita) is a hybrid mint plant, commonly used in herbal medicine.",
    cultivationTips:
      "Peppermint thrives in moist, rich soil and partial shade. It is highly invasive, so it's best grown in containers.",
  },
  {
    id: 14,
    name: "Sandalwood",
    image: "/images/sandalwood.png",
    description:
      "Used in skincare products for its anti-inflammatory properties.",
    medicinalUse: "Skin Care",
    region: "India",
    botanicalDetails:
      "Sandalwood (Santalum album) is a small tree native to India, known for its fragrant heartwood.",
    cultivationTips:
      "Sandalwood grows best in well-drained, sandy soil in a warm, dry climate. It requires a host tree to grow.",
  },
  {
    id: 15,
    name: "Holy Basil",
    image: "/images/holy-basil.png",
    description:
      "A powerful herb known for its healing properties and ability to reduce stress.",
    medicinalUse: "Immunity",
    region: "India",
    botanicalDetails:
      "Holy Basil (Ocimum sanctum) is a revered plant in Hindu culture, often called 'Tulsi' in India.",
    cultivationTips:
      "Holy Basil grows well in warm, dry environments with well-drained soil. It needs full sun for optimal growth.",
  },
  {
    id: 16,
    name: "Moringa",
    image: "/images/moringa.png",
    description: "Rich in nutrients, used to boost energy and immunity.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Moringa (Moringa oleifera) is a fast-growing tree native to the Himalayas, known for its nutrient-rich leaves.",
    cultivationTips:
      "Moringa grows best in well-drained, sandy soil with full sun exposure. It is drought-tolerant once established.",
  },
  {
    id: 17,
    name: "Rosemary",
    image: "/images/rosemary.png",
    description: "Used to stimulate hair growth and improve memory.",
    medicinalUse: "Skin Care",
    region: "Tropical",
    botanicalDetails:
      "Rosemary (Rosmarinus officinalis) is a fragrant evergreen herb used in cooking and medicine.",
    cultivationTips:
      "Rosemary thrives in well-drained soil and full sun. It is drought-tolerant but needs regular pruning.",
  },
  {
    id: 18,
    name: "Cumin",
    image: "/images/cumin.png",
    description: "Boosts digestion and helps with metabolic functions.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Cumin (Cuminum cyminum) is a spice plant native to the eastern Mediterranean and widely used in cooking.",
    cultivationTips:
      "Cumin needs full sun and well-drained, fertile soil. It prefers warm weather and should be watered moderately.",
  },
  {
    id: 19,
    name: "Thyme",
    image: "/images/thyme.png",
    description: "Known for its antiseptic and antioxidant properties.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Thyme (Thymus vulgaris) is a small, fragrant herb used in cooking and herbal medicine.",
    cultivationTips:
      "Thyme grows best in well-drained soil with full sun. It is drought-tolerant and requires minimal watering.",
  },
  {
    id: 20,
    name: "Cardamom",
    image: "/images/cardamom.png",
    description:
      "Used to treat digestive issues and improve respiratory health.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Cardamom (Elettaria cardamomum) is a spice plant native to the Indian subcontinent, known for its aromatic seeds.",
    cultivationTips:
      "Cardamom grows best in humid, tropical climates with rich, well-drained soil and partial shade.",
    name: "Cardamom",
    Kingdom: "Plantae",
    Clade: "Angiosperms, Monocots",
    Order: "Zingiberales",
    Family: "Zingiberaceae",
    Genus: "Elettaria",
    Species: "E. cardamomum",
    BinomialName: "Elettaria cardamomum",
    About:
      "Elettaria cardamomum, commonly known as green cardamom, is a perennial herb native to southern India. It is cultivated for its aromatic seeds, which are used as a spice and in traditional medicine.",
    DetailDescription:
      "Cardamom is a perennial herbaceous plant that can grow up to 4 meters tall. It has long, lance-shaped leaves and produces small, white to pale violet flowers followed by green pods containing aromatic seeds. Cardamom is used in culinary dishes and herbal remedies for digestion and respiratory health.",
    Reference: "https://en.wikipedia.org/wiki/Cardamom",
  },
]

export default plants
