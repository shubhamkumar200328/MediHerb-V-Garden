const plants = [
  {
    id: 1,
    name: "Tulsi",
    image: "/images/tulsi.png",
    description: "Sacred basil used for immunity and respiratory health.",
    medicinalUse: "Immunity",
    region: "India",
    botanicalDetails:
      "Tulsi (Ocimum sanctum) is an aromatic shrub native to the Indian subcontinent.",
    cultivationTips:
      "Tulsi grows best in well-drained soil with plenty of sunlight. It should be watered regularly but not overwatered.",
  },
  {
    id: 2,
    name: "Neem",
    image: "/images/neem.png",
    description: "Known for its antibacterial and antifungal properties.",
    medicinalUse: "Skin Care",
    region: "India",
    botanicalDetails:
      "Neem (Azadirachta indica) is a tree that can grow up to 15–20 meters tall, native to the Indian subcontinent.",
    cultivationTips:
      "Neem thrives in tropical and subtropical climates with moderate to high rainfall. It prefers dry, well-drained soil.",
  },
  {
    id: 3,
    name: "Aloe Vera",
    image: "/images/aloe-vera.png",
    description: "Aloe Vera is commonly used for skin hydration and healing.",
    medicinalUse: "Skin Care",
    region: "Tropical",
    botanicalDetails:
      "Aloe Vera (Aloe barbadensis miller) is a succulent plant species that has been used for centuries for its healing properties.",
    cultivationTips:
      "Aloe Vera thrives in dry, sandy, well-drained soil. It requires full sun but can also tolerate partial shade.",
  },
  {
    id: 4,
    name: "Ashwagandha",
    image: "/images/ashwagandha.png",
    description: "Used to reduce stress and improve vitality.",
    medicinalUse: "Immunity",
    region: "India",
    botanicalDetails:
      "Ashwagandha (Withania somnifera) is a small shrub native to India and North Africa, known for its adaptogenic properties.",
    cultivationTips:
      "Ashwagandha prefers dry, loamy soil and needs full sun. It is drought-tolerant and should not be overwatered.",
  },
  {
    id: 5,
    name: "Mint",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flipkart.com%2Fr-star-garden-tulsi-plant%2Fp%2Fitm954db032262e6%3Fpid%3DPSGGPFSGXVSRCXTX%26cmpid%3Dproduct.share.pp%26_refId%3DPP.c5dc2c9e-fd48-48f7-96ed-0ce9744f0ade.PSGGPFSGXVSRCXTX&psig=AOvVaw3wlgS9hi9gv6qps14nV4yz&ust=1737748451699000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwiMk9PKz4yLAxXbrmMGHTzgLGoQjRx6BAgAEBc",
    description: "Known for soothing digestive issues and improving appetite.",
    medicinalUse: "Immunity",
    region: "Tropical",
    botanicalDetails:
      "Mint (Mentha) is a genus of plants in the Lamiaceae family. It includes varieties like peppermint and spearmint.",
    cultivationTips:
      "Mint grows best in moist, partially shaded environments and should be planted in containers to control its rapid spread.",
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
  },
]

export default plants
