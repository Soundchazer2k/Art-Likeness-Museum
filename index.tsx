// Fix: Corrected React import to properly include useState, useCallback, and useMemo hooks.
import React, { useState, useCallback, useMemo, useEffect } from "react";
// Fix: Use 'react-dom/client' for React 18 createRoot API
import ReactDOM from "react-dom/client";
import { GoogleGenAI, Modality } from "@google/genai";

const exhibitData = {
  // Fine Art & Movements
  "Art Nouveau": {
    title: "Art Nouveau Portrait",
    description: "Explore the organic curves and flowing lines of this iconic decorative art movement.",
    curatorNotes: "Flourishing in the late 19th and early 20th centuries, Art Nouveau is characterized by its use of long, sinuous, organic lines and was applied to art, architecture, and applied art.",
    artists: ["Aubrey Beardsley Style", "Gustav Klimt Style", "Alphonse Mucha Style", "Henri de Toulouse-Lautrec Style"],
    compositions: ["Portrait", "Square", "Poster"],
    image: "https://i.imgur.com/fA7n2Dk.jpeg"
  },
  "Art Deco": {
    title: "Art Deco Portrait",
    description: "Step into the Roaring Twenties with the sleek, geometric elegance of Art Deco.",
    curatorNotes: "A style of visual arts, architecture and design that first appeared in France just before World War I, Art Deco is characterized by machine age aesthetics, geometric patterns, and luxury materials.",
    artists: ["Tamara de Lempicka Style", "Jean Dupas Style", "Paul Colin Style", "Cassandre Style", "Erté Style"],
    compositions: ["Portrait", "Poster", "Panoramic"],
    image: "https://i.imgur.com/rWv1l7q.jpeg"
  },
  "Impressionism": {
    title: "Impressionist Portrait",
    description: "Capture the fleeting effects of light and color with the revolutionary spirit of the Impressionists.",
    curatorNotes: "A 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, and inclusion of movement as a crucial element of human perception and experience.",
    artists: ["Claude Monet Style", "Pierre-Auguste Renoir Style", "Edgar Degas Style", "Camille Pissarro Style", "Berthe Morisot Style"],
    compositions: ["Landscape", "Portrait", "Plein Air"],
    image: "https://i.imgur.com/gOq2b1z.jpeg"
  },
  "Expressionism": {
    title: "Expressionist Portrait",
    description: "Convey raw psychological truth and inner emotion with the distorted forms and intense colors of Expressionism.",
    curatorNotes: "A modernist movement originating in Germany at the beginning of the 20th century, Expressionism presents the world solely from a subjective perspective, distorting it radically for emotional effect in order to evoke moods or ideas.",
    artists: ["Edvard Munch Style", "Egon Schiele Style", "Oskar Kokoschka Style", "Ernst Ludwig Kirchner Style", "Vincent van Gogh Style"],
    compositions: ["Portrait", "Full Figure", "Psychological Scene"],
    image: "https://i.imgur.com/Tpc42S1.jpeg"
  },
  "Orphism": {
    title: "Orphism Portrait",
    description: "Experience pure color and geometric harmony in this avant-garde abstract movement.",
    curatorNotes: "An offshoot of Cubism that focused on pure abstraction and bright colors, Orphism was pioneered by Sonia and Robert Delaunay and emphasizes color relationships and simultaneous contrast.",
    artists: ["Sonia Delaunay Style", "Robert Delaunay Style", "Frantisek Kupka Style", "Paul Klee Style"],
    compositions: ["Square", "Portrait", "Landscape"],
    image: "https://i.imgur.com/vH3oJ37.jpeg"
  },
  "Byzantine Art": {
    title: "Byzantine Icon",
    description: "Be immortalized in gold and jewel tones with the imperial and religious style of the Byzantine Empire.",
    curatorNotes: "The art of the Byzantine Empire is characterized by its religious expression, imperial authority, and decorative luxury, most notably in mosaic and icon painting.",
    artists: ["Byzantine Mosaic Style", "Byzantine Icon Painting Style"],
    compositions: ["Icon", "Fresco", "Medallion"],
    image: "https://i.imgur.com/L5gAAYD.jpeg"
  },
  "Medieval Art": {
    title: "Medieval Illumination",
    description: "Enter the age of scribes and knights with the rich, decorative style of medieval manuscripts.",
    curatorNotes: "Medieval art covers a vast scope of time and place, from Romanesque frescoes to intricate Gothic illuminations, often characterized by religious themes and symbolic imagery.",
    artists: ["Gothic Illumination Style", "Romanesque Fresco Style", "Insular Art (Book of Kells) Style"],
    compositions: ["Manuscript Page", "Triptych", "Stained Glass"],
    image: "https://i.imgur.com/y124A0E.jpeg"
  },
  "Romanticism": {
    title: "Romantic Portrait",
    description: "Capture dramatic emotion and the sublime power of nature with the painterly style of Romanticism.",
    curatorNotes: "Flourishing in the late 18th and early 19th centuries, Romanticism emphasized intense emotion as an authentic source of aesthetic experience, placing new emphasis on such emotions as apprehension, horror and terror, and awe.",
    artists: ["Eugène Delacroix Style", "Caspar David Friedrich Style", "J.M.W. Turner Style", "Francisco Goya Style", "Ivan Aivazovsky Style", "John William Waterhouse Style"],
    compositions: ["Dramatic Landscape", "Allegorical Portrait", "Historical Scene"],
    image: "https://i.imgur.com/G5g4373.jpeg"
  },
  "Royal Portrait Painting": {
    title: "Royal Portrait",
    description: "Assume an air of nobility and power with a formal portrait in the grand European tradition.",
    curatorNotes: "The tradition of royal portraiture combines formal composition, status symbols, and historical techniques to convey the power and lineage of the ruling class across centuries.",
    artists: ["Hans Holbein the Younger Style", "Anthony van Dyck Style", "Diego Velázquez Style", "Élisabeth Vigée Le Brun Style", "Leonardo da Vinci Style", "Raphael Style", "Michelangelo Style"],
    compositions: ["Portrait", "Formal", "Full-Length"],
    image: "https://i.imgur.com/gKSDv9p.jpeg"
  },
  "Persian Miniature Art": {
    title: "Persian Miniature",
    description: "Adorn a page of history with the intricate detail and ornate patterns of Islamic manuscript illustration.",
    curatorNotes: "A small painting on paper, whether a book illustration or a separate work of art, Persian Miniatures are known for their intricate detail, flat perspective, and rich narrative.",
    artists: ["Classical Persian Court Style", "Safavid Dynasty Style", "Mughal Miniature Style", "Ottoman Turkish Style", "Contemporary Revival Style"],
    compositions: ["Manuscript", "Medallion", "Illustration"],
    image: "https://i.imgur.com/a9s2oV0.jpeg"
  },
  "Chinese Art": {
    title: "Chinese Ink Wash Portrait",
    description: "Capture the spirit and harmony of nature with a rich tapestry of traditional and modern Chinese painting techniques.",
    curatorNotes: "Chinese painting is one of the oldest continuous artistic traditions. It spans meticulous court paintings (Gongbi), expressive literati ink washes (Xieyi), and philosophical landscapes (Shanshui), all emphasizing calligraphic brushwork and a deep connection to nature.",
    artists: ["Song Dynasty Gongbi Style", "Yuan Dynasty Xieyi Style", "Ming Dynasty Academic Style", "Qing Dynasty Individualist Style", "Modern Lingnan School Style", "Contemporary Experimental Style", "Classical Shanshui Landscape Style"],
    compositions: ["Hanging Scroll", "Handscroll", "Tall Vertical Scroll"],
    image: "https://i.imgur.com/b9sV1r0.jpeg"
  },
   "Surrealism": {
    title: "Surrealist Portrait",
    description: "Explore the world of dreams and the subconscious with the strange and beautiful imagery of Surrealism.",
    curatorNotes: "A cultural movement which developed in Europe after World War I, Surrealism is best known for its visual artworks and writings which feature element of surprise, unexpected juxtapositions and non-sequitur.",
    artists: ["Salvador Dalí Style", "Max Ernst Style", "Remedios Varo Style", "Frida Kahlo Style", "René Magritte Style", "Leonora Carrington Style"],
    compositions: ["Landscape", "Portrait", "Panoramic"],
    image: "https://i.imgur.com/dAmYCYp.jpeg"
  },
   "Ukiyo-e": {
    title: "Ukiyo-e Portrait",
    description: "Enter the world of traditional Japanese woodblock prints with timeless elegance and artistry.",
    curatorNotes: "Originating in Edo period (17th-19th centuries), Ukiyo-e depicts scenes of the “floating world” and features delicate linework, flat color, and woodblock printing techniques.",
    artists: ["Classical Landscape Style", "Urban Life Style", "Theatrical Portrait Style", "Nature Study Style", "Wave and Water Style"],
    compositions: ["Portrait", "Landscape", "Pillar"],
    image: "https://i.imgur.com/Cs498T3.jpeg"
  },
  // Comics & Illustration
  "Golden Age Comic Covers": {
    title: "Golden Age Comic Cover",
    description: "Become a classic hero from the Golden Age of comics, with bold lines and primary colors.",
    curatorNotes: "The Golden Age of Comic Books (late 1930s to early 1950s) introduced the superhero archetype. The art is known for its simple, bold lines, primary color palettes, and heroic, often oversized proportions.",
    artists: ["Jerry Siegel & Joe Shuster Style", "Bob Kane Style", "C.C. Beck Style", "Alex Raymond Style", "Will Eisner Style"],
    compositions: ["Cover", "Trade Paperback", "Digest"],
    image: "https://i.imgur.com/xTfs2eA.jpeg"
  },
  "Silver Age Superhero Comic Covers": {
    title: "Silver Age Comic Cover",
    description: "Leap into the action-packed world of Silver Age comics with heroic flair and dynamic energy.",
    curatorNotes: "The Silver Age of Comic Books (mid-1950s to c. 1970) is known for its dynamic action, sci-fi themes, and the reintroduction of the superhero archetype with more complex characters.",
    artists: ["Jack Kirby Style", "John Romita Sr. Style", "Steve Ditko Style", "Gene Colan Style", "Jim Steranko Style", "Dick Sprang Style", "Neal Adams Style"],
    compositions: ["Portrait", "Dynamic", "Cosmic Scene"],
    image: "https://i.imgur.com/M6L9RzH.jpeg"
  },
  "Bronze Age Comic Covers": {
    title: "Bronze Age Comic Cover",
    description: "Explore the grittier, more realistic storytelling of the Bronze Age of comics.",
    curatorNotes: "The Bronze Age (c. 1970 to 1985) introduced darker, more socially relevant storylines. The art style often features more realistic anatomy, dynamic layouts, and moodier coloring.",
    artists: ["John Byrne Style", "George Pérez Style", "John Buscemas Style", "Barry Windsor-Smith Style", "John Romita Jr. Style", "Frank Miller Style"],
    compositions: ["Gritty Cover", "Splash Page", "Street-Level Action"],
    image: "https://i.imgur.com/iUnL7d2.jpeg"
  },
  "Modern Age Comic Covers": {
    title: "Modern Comic Cover",
    description: "Unleash your inner superhero with the high-energy, detailed style of modern comics.",
    curatorNotes: "From the late 1980s to today, the Modern Age of comics is characterized by dynamic, detailed artwork, complex cinematic layouts, and often darker, more psychologically-driven stories.",
    artists: ["Jim Lee Style", "Todd McFarlane Style", "Rob Liefeld Style", "Marc Silvestri Style", "Olivier Coipel Style", "Alex Ross Style", "Bryan Hitch Style", "Declan Shalvey Style", "Jorge Jiménez Style", "Peach Momoko Style", "Russell Dauterman Style", "Mike Mignola Style"],
    compositions: ["Dynamic Cover", "Variant Cover", "Widescreen Panel"],
    image: "https://i.imgur.com/c4GKL0k.jpeg"
  },
  "Sunday Comics/Newspaper Funnies": {
    title: "Newspaper Comic Portrait",
    description: "Become a beloved character from the Sunday Funnies with simple lines and charming humor.",
    curatorNotes: "The newspaper comic strip is a classic American art form. Styles range from the minimalist charm of 'Peanuts' to the detailed worlds of 'Calvin and Hobbes', all defined by clear lines and family-friendly humor.",
    artists: ["Charles Schulz Style", "Bill Watterson Style", "Jim Davis Style", "Berkeley Breathed Style", "Gary Larson Style"],
    compositions: ["Three-Panel Strip", "Sunday Full Page", "Character Portrait"],
    image: "https://i.imgur.com/xAK2jV2.jpeg"
  },
  "European Comics/Bande Dessinée": {
    title: "Bande Dessinée Portrait",
    description: "Journey into the world of European comics with the distinct 'ligne claire' and imaginative styles.",
    curatorNotes: "Bande Dessinée, the Franco-Belgian comic tradition, is known for its high artistic quality and diverse genres. Styles range from Hergé's clean 'ligne claire' to the fantastical realism of Moebius.",
    artists: ["Moebius (Jean Giraud) Style", "Enki Bilal Style", "Philippe Druillet Style", "Jean-Claude Mézières Style", "François Schuiten Style", "Hugo Pratt Style", "Milo Manara Style", "Guido Crepax Style", "Juanjo Guarnido Style", "Sergio Toppi Style"],
    compositions: ["Album Cover", "Page Layout", "Character Study"],
    image: "https://i.imgur.com/h5Tqj2N.jpeg"
  },
  "70s & 80s Classic Anime": {
    title: "Classic Anime Portrait",
    description: "Capture the cinematic flair and dramatic, hand-drawn look of classic 1970s and 1980s anime.",
    curatorNotes: "This era of Japanese animation is renowned for its mature storytelling and distinct visual language. Key techniques include the 'Postcard Memory'—a beautifully painted still frame to heighten drama—along with film noir-inspired lighting, stark shadows, dramatic lens flares, and moody, atmospheric color palettes. Character designs often feature tall, elegant proportions and detailed, flowing hair.",
    artists: ["Osamu Dezaki Style", "Leiji Matsumoto Style", "Shingo Araki / Michi Himeno Style"],
    compositions: ["Cinematic Cel", "Dramatic Portrait", "Postcard Memory"],
    image: "https://i.imgur.com/kYqeVvE.jpeg"
  },
  "Anime": {
    title: "Modern Anime Portrait",
    description: "Leap into the world of modern Japanese animation with its diverse and iconic visual styles.",
    curatorNotes: "Modern anime is characterized by a blend of traditional cel-shading aesthetics with advanced digital techniques. Styles range from the vibrant action of 'Shonen' to the photorealistic detail of Makoto Shinkai, often featuring clean lines, bright colors, and dynamic digital effects.",
    artists: ["Studio Ghibli Style", "Naruto/Shonen Style", "Kyoto Animation (KyoAni) Style", "Gainax Style", "Masaaki Yuasa Style", "Makoto Shinkai Style", "Satoshi Kon Style", "Production I.G Style"],
    compositions: ["Widescreen", "Traditional", "Cinematic"],
    image: "https://i.imgur.com/SFr5pOr.jpeg"
  },
  "Manga": {
    title: "Manga Portrait",
    description: "Become a character in a Japanese comic book, defined by bold lines and expressive storytelling.",
    curatorNotes: "Manga are comics or graphic novels originating from Japan. The medium includes a broad range of genres, and is characterized by its black-and-white line art and character-focused storytelling.",
    artists: ["Katsuhiro Otomo Style", "Rumiko Takahashi Style", "Kamome Shirahama Style", "Masakazu Katsura Style", "Kaoru Mori Style", "Osamu Tezuka Style", "Kentaro Miura Style", "Naoki Urasawa Style", "Takehiko Inoue Style", "CLAMP Style"],
    compositions: ["Page", "Portrait", "Cover"],
    image: "https://i.imgur.com/PsqL5Rk.jpeg"
  },
  "Children's Book Illustration": {
    title: "Storybook Portrait",
    description: "Step into the pages of a beloved story with the charming and imaginative styles of children's literature.",
    curatorNotes: "A diverse field of art, children's book illustration aims to tell stories, educate, and entertain through age-appropriate content and imaginative worlds.",
    artists: ["Walter Crane Style", "Randolph Caldecott Style", "Peggy Fortnum Style", "Dr. Seuss Style", "Beatrix Potter Style", "John Tenniel Style", "Winsor McCay Style", "Hergé Style", "Virginia Frances Sterrett Style", "John D. Batten Style"],
    compositions: ["Picture Book", "Landscape", "Portrait"],
    image: "https://i.imgur.com/lpm34sR.jpeg"
  },
  "Fantasy Illustration": {
    title: "Fantasy Illustration",
    description: "Become a hero of myth and legend with the epic painted style of classic fantasy book covers.",
    curatorNotes: "From sword and sorcery to high fantasy, this tradition of illustration is defined by its heroic subjects, painted techniques, and a romantic sense of adventure.",
    artists: ["Frank Frazetta Style", "Boris Vallejo Style", "Michael Whelan Style", "Rowena Morrill Style", "Don Maitz Style", "Keith Parkinson Style", "Larry Elmore Style", "Brom Style", "Todd Lockwood Style", "Donato Giancola Style"],
    compositions: ["Book Cover", "Magazine Cover", "Panoramic"],
    image: "https://i.imgur.com/hL03a0E.jpeg"
  },
  // Posters & Advertisements
  "Pin-up": {
    title: "Pin-up Portrait",
    description: "Capture the wholesome glamour and airbrushed perfection of mid-century American illustration.",
    curatorNotes: "Flourishing from the 1940s to 1950s, Pin-up art is known for its idealized beauty, airbrush techniques, and cheerful, wholesome appeal.",
    artists: ["Classic Calendar Style", "Advertising Illustration Style", "Wartime Morale Style", "Magazine Cover Style", "Artistic Pin-up Style"],
    compositions: ["Portrait", "Calendar", "Magazine"],
    image: "https://i.imgur.com/a4gAL6G.jpeg"
  },
  "1950s Magazine Advertisements": {
    title: "50s Ad",
    description: "Relive the post-war optimism and idealized consumer culture of the 1950s.",
    curatorNotes: "Reflecting an era of prosperity, 1950s advertising is characterized by painterly realism, aspirational themes, and a focus on idealized domesticity.",
    artists: ["Painterly Realism Style", "Graphic Cartoon Style", "Technical & Aspirational Style", "Stylized Realism Style"],
    compositions: ["Magazine", "Full Page", "Poster"],
    image: "https://i.imgur.com/GfVpWwN.jpeg"
  },
  "1980s Magazine Advertisements": {
    title: "80s Ad",
    description: "Experience the vibrant, high-energy aesthetic of 1980s commercial culture.",
    curatorNotes: "Characterized by excess, neon colors, and glamorous photography, 1980s advertising reflects the decade's focus on consumerism, technology, and high-energy lifestyles.",
    artists: ["Vibrant Group Fashion Style", "Sleek Tech Product Style", "Glamour Shot Cosmetics Style", "Minimalist Power Ad Style"],
    compositions: ["Magazine", "Widescreen", "Square"],
    image: "https://i.imgur.com/E1c6b1g.jpeg"
  },
  "Movie Poster Art": {
    title: "Movie Poster",
    description: "Become the star of your own blockbuster with the iconic illustration styles of classic Hollywood.",
    curatorNotes: "From minimalist graphic design to epic painted realism, movie poster art is a diverse field that aims to capture cinematic drama and star appeal to sell a film to the audience.",
    artists: [
      "Al Hirschfeld Style", "Saul Bass Style", "Richard Amsel Style", "Robert McGinnis Style",
      "Burt Kleeger Style", "Drew Struzan Style", "Bob Peak Style", "John Alvin Style",
      "Reynold Brown Style", "Frank McCarthy Style", "Bill Gold Style", "Tom Jung Style",
      "Philip Gips Style", "Stephen Frankfurt Style", "Hans Hillmann Style"
    ],
    compositions: ["Standard One-Sheet (2:3)", "European Format (3:4)", "Conceptual Teaser (1:1)"],
    image: "https://i.imgur.com/2oIuLfs.jpeg"
  },
  "Propaganda Art": {
    title: "Propaganda Poster",
    description: "Embody heroic ideals with the bold, persuasive visual language of political and commercial posters.",
    curatorNotes: "Characterized by heroic imagery and strong typography, propaganda art is designed to persuade its audience and promote a political or commercial point of view.",
    artists: ["Soviet Constructivist Style", "American WPA Style", "Chinese Cultural Revolution Style", "Art Deco Poster Style", "Bauhaus Graphic Design Style"],
    compositions: ["Poster", "Portrait", "Billboard"],
    image: "https://i.imgur.com/YxJvA4U.jpeg"
  },
  "Psychedelic Art": {
    title: "Psychedelic Poster",
    description: "Expand your consciousness with the vibrant, mind-bending visuals of 1960s counterculture.",
    curatorNotes: "Psychedelic art is influenced by the experience of altered consciousness. It uses distorted visuals, bright colors, and surreal subject matter to evoke and convey the artist's experiences.",
    artists: ["Victor Moscoso Style", "Stanley Mouse & Alton Kelley Style", "Bonnie MacLean Style", "Wes Wilson Style", "Peter Max Style"],
    compositions: ["Poster", "Handbill", "Album Cover"],
    image: "https://i.imgur.com/pA1z4v2.jpeg"
  },
  "Norman Rockwell": {
    title: "Rockwell Portrait",
    description: "Tell a story of everyday American life with the warm, narrative realism of a master.",
    curatorNotes: "Norman Rockwell was a prolific American painter and illustrator whose works enjoy a broad popular appeal for their reflection of American culture and storytelling through everyday life.",
    artists: ["Norman Rockwell Style"],
    compositions: ["Portrait", "Landscape", "Magazine Cover"],
    image: "https://i.imgur.com/gHhJ8v5.jpeg"
  },
   "Iconic Magazine Cover Styles": {
    title: "Magazine Cover Portrait",
    description: "Grace the cover of an iconic magazine, from high fashion to photojournalism.",
    curatorNotes: "Magazine covers are a powerful cultural medium, defined by their bold typography, striking photography, and ability to capture the zeitgeist of their era.",
    artists: ["Lice Magazine Style", "Vague Fashion Style", "Rolling Rock Music Style", "Der Mirror German Style", "National Geology Style", "Artforum Revival Style", "Harper's Bizarre Style", "Twen Retro Style", "The Facade UK Style", "Paris Catch Style"],
    compositions: ["Standard Magazine", "Tall Format", "Square"],
    image: "https://i.imgur.com/pZ8v3U4.jpeg"
  },
  // Popular Media & Subcultures
  "Record Cover Art": {
    title: "Record Cover Art",
    description: "Reimagine your portrait as an iconic album cover from the golden age of vinyl.",
    curatorNotes: "From the modernist grids of Blue Note to the surreal photography of Hipgnosis, record cover art is a diverse field that defines the visual identity of music.",
    artists: [
      "Peter Saville Style", "Hipgnosis Style", "Roger Dean Style", "Reid Miles Style",
      "Andy Warhol Style", "Peter Blake Style", "Vaughan Oliver Style", "Barney Bubbles Style",
      "Jamie Reid Style", "Mati Klarwein Style", "Raymond Pettibon Style", "Alex Steinweiss Style",
      "Anton Corbijn Style"
    ],
    compositions: ["12-inch Vinyl (1:1)", "Gatefold Sleeve (2:1)", "7-inch Single (1:1)"],
    image: "https://i.imgur.com/sJVmS5A.jpeg"
  },
  "Pop Art": {
    title: "Pop Art Portrait",
    description: "Engage with the bold colors and mass-media imagery of the Pop Art movement.",
    curatorNotes: "Emerging in the 1950s, Pop Art challenged fine art traditions by including imagery from popular and mass culture, such as advertising, comic books and mundane cultural objects.",
    artists: ["Andy Warhol Style", "Roy Lichtenstein Style", "Alex Katz Style", "Mel Ramos Style", "Patrick Caulfield Style", "Rosalyn Drexler Style", "Banksy Style", "Takashi Murakami Style", "Hariton Pushwagner Style"],
    compositions: ["Square", "Portrait", "Landscape"],
    image: "https://i.imgur.com/Vb8X3gA.jpeg"
  },
  "Cyberpunk": {
    title: "Cyberpunk Portrait",
    description: "Immerse yourself in a high-tech, low-life future of neon noir and urban decay.",
    curatorNotes: "A subgenre of science fiction in a futuristic setting that tends to focus on a 'combination of low-life and high tech', it features advanced technological and scientific achievements, such as artificial intelligence and cybernetics, juxtaposed with a degree of social breakdown or radical change.",
    artists: ["Classic Neon Noir Style", "Corporate Dystopia Style", "Street Tech Style", "Retro-Future Style", "Bio-Tech Horror Style"],
    compositions: ["Cinematic", "Portrait", "Widescreen"],
    image: "https://i.imgur.com/uR1R5G1.jpeg"
  },
  "Steampunk": {
    title: "Steampunk Portrait",
    description: "Envision an alternate history of Victorian science fiction, powered by steam and clockwork.",
    curatorNotes: "Steampunk is a retrofuturistic subgenre of science fiction that incorporates technology and aesthetic designs inspired by 19th-century industrial steam-powered machinery.",
    artists: ["Victorian Engraving Style", "Imaginative Digital Painting Style", "Gothic Ink Wash Style", "Photorealistic Collage Style"],
    compositions: ["Portrait", "Illustration", "Panoramic"],
    image: "https://i.imgur.com/Kq7y5Uv.jpeg"
  },
  "Street Art": {
    title: "Street Art Portrait",
    description: "Take your image to the streets with the vibrant, rebellious energy of urban public art.",
    curatorNotes: "A contemporary art movement that includes all art produced in public locations, Street Art often carries a social or political message and utilizes techniques like spray paint and stenciling.",
    artists: ["Stencil Graffiti Style", "Wildstyle Graffiti", "Wheatpaste Poster Art", "Mural Art Style", "Character-based Street Art"],
    compositions: ["Wall", "Square", "Portrait"],
    image: "https://i.imgur.com/b9L7W5V.jpeg"
  },
  "Gothic Horror Art": {
    title: "Gothic Horror Portrait",
    description: "Embrace the darkness with the atmospheric dread and supernatural themes of Gothic Horror.",
    curatorNotes: "A genre of art that combines horror and romance, Gothic Horror is characterized by atmospheric dread, supernatural elements, and psychological tension.",
    artists: ["Francisco Goya Style", "Caspar David Friedrich Style", "Gustave Doré Style", "Edward Gorey Style", "Bernie Wrightson Style", "H.R. Giger Style"],
    compositions: ["Portrait", "Illustration", "Panoramic"],
    image: "https://i.imgur.com/eYt9Y2R.jpeg"
  },
  "Pixel Art": {
    title: "Pixel Art Portrait",
    description: "Go retro with the charming, blocky aesthetic of classic video games.",
    curatorNotes: "Pixel art is a form of digital art, created through the use of software, where images are edited on the pixel level. The aesthetic for this kind of graphics comes from 8-bit and 16-bit computers and video game consoles.",
    artists: ["8-bit NES Style", "16-bit SNES/Genesis Style", "SNK Neo Geo Portrait Style", "LucasArts Adventure Style", "Modern HD-2D Style", "Isometric Strategy Style"],
    compositions: ["Classic", "Widescreen", "Portrait"],
    image: "https://i.imgur.com/N2V1g6F.png"
  },
  "Fashion Photography": {
    title: "Fashion Photo",
    description: "Step onto the cover of a magazine with the sophisticated aesthetics of high-fashion photography.",
    curatorNotes: "Fashion photography is a genre of photography which is devoted to displaying clothing and other fashion items. It is most often conducted for advertisements or fashion magazines such as Vogue, Vanity Fair, or Elle.",
    artists: ["Richard Avedon Style", "Irving Penn Style", "Helmut Newton Style", "Peter Lindbergh Style", "Annie Leibovitz Style", "Steven Meisel Style", "Guy Bourdin Style", "Tim Walker Style"],
    compositions: ["Magazine", "Portrait", "Editorial"],
    image: "https://i.imgur.com/s4n3b2R.jpeg"
  },
  "Collectible Card Art": {
    title: "Collectible Card",
    description: "Enter the world of high fantasy with iconic artwork from early 1990s collectible games.",
    curatorNotes: "Defining the look of fantasy gaming in the 90s, this art is known for its high fantasy themes, iconic character representation, and diverse artistic styles.",
    artists: ["Douglas Shuler Style", "Quinton Hoover Style", "Anson Maddocks Style", "Mark Poole Style", "Melissa Benson Style", "Dan Frazier Style", "Christopher Rush Style", "Drew Tucker Style", "Jeff A. Menges Style", "Richard Kane Ferguson Style"],
    compositions: ["Card", "Portrait", "Vertical"],
    image: "https://i.imgur.com/L3gS3tN.jpeg"
  },
   "Muralism": {
    title: "Mural Portrait",
    description: "Become a monumental figure in a large-scale public artwork with a powerful social message.",
    curatorNotes: "Muralism is a movement that uses the monumental scale of public walls to engage with the community, often addressing social and political themes.",
    artists: ["Diego Rivera Style", "David Alfaro Siqueiros Style", "Juan O'Gorman Style", "Thomas Hart Benton Style", "José Clemente Orozco Style", "Guido Van Helten Style", "Matthew Adnate Style", "Dmitri Vrubel Style", "Jorge González Camarena Style"],
    compositions: ["Mural", "Panoramic", "Frieze"],
    image: "https://i.imgur.com/xG3s3v2.jpeg"
  },
   "Stained Glass Art": {
    title: "Stained Glass Portrait",
    description: "Be immortalized in luminous color and bold lead lines in the tradition of stained glass.",
    curatorNotes: "An art form in which colored glass is used to create decorative windows and other objects through which light passes, defined by its luminous color and the lead lines that hold it together.",
    artists: ["Medieval Cathedral Style", "Arts and Crafts Movement Style", "Art Deco Stained Glass Style", "Contemporary Architectural Style", "Frank Lloyd Wright Prairie Style"],
    compositions: ["Cathedral", "Lancet", "Rose Window"],
    image: "https://i.imgur.com/p5d8S8A.jpeg"
  },
};

const exhibitGroups = {
  "🎨 Fine Art & Movements": ["Art Nouveau", "Art Deco", "Impressionism", "Expressionism", "Orphism", "Byzantine Art", "Medieval Art", "Romanticism", "Royal Portrait Painting", "Persian Miniature Art", "Chinese Art", "Surrealism", "Ukiyo-e"],
  "📚 Comics & Illustration": ["Golden Age Comic Covers", "Silver Age Superhero Comic Covers", "Bronze Age Comic Covers", "Modern Age Comic Covers", "Sunday Comics/Newspaper Funnies", "European Comics/Bande Dessinée", "70s & 80s Classic Anime", "Anime", "Manga", "Children's Book Illustration", "Fantasy Illustration"],
  "📰 Posters & Advertisements": ["Pin-up", "1950s Magazine Advertisements", "1980s Magazine Advertisements", "Movie Poster Art", "Propaganda Art", "Psychedelic Art", "Norman Rockwell", "Iconic Magazine Cover Styles"],
  "🎭 Popular Media & Subcultures": ["Record Cover Art", "Pop Art", "Cyberpunk", "Steampunk", "Street Art", "Gothic Horror Art", "Pixel Art", "Fashion Photography", "Collectible Card Art", "Muralism", "Stained Glass Art"],
};


// Fix: Add interface for type safety on image objects
interface ImageFile {
    base64: string;
    mimeType: string;
    preview: string;
}

const generateDetailedPrompt = (styleCategory: string, artist: string, characterDescription: string, artistName?: string, recordTitle?: string): string => {
    
    let promptSections: { [key: string]: string } = {};
    let includeTypography = false;

    // The core instruction is now built into each style to be highly specific.
    const universalNegativeConstraints = `5. NEGATIVE CONSTRAINTS:
- CRITICAL: The final result must be a seamless artistic reinterpretation, NOT a copy, trace, or photo filter.
- Absolutely NO photorealism (unless the style is explicitly photographic).
- Absolutely NO digital render gloss, 3D mannequin faces, polygon tiling, or cinematic shading.
- Avoid modern color palettes (e.g., neon saturation) unless appropriate for the style (e.g., Cyberpunk).
- The final image must be a pure piece of artwork. DO NOT add any faux frames, artist signatures, credits, captions, or watermarks.`;

    switch (styleCategory) {
        case "Record Cover Art":
            includeTypography = true;
            let recordCoverBase = {
                style: `2. ARTISTIC STYLE & CONTEXT:
- MEDIUM: The artwork must emulate a physical record cover sleeve from the specified era. The final texture should feel like an offset lithograph, photograph, or painting on cardboard, not a digital image.
- PURPOSE: This is commercial packaging for a musical album, designed to create a strong visual identity.`,
                negative: universalNegativeConstraints
            };

            const getTypographyPrompt = (baseInstruction: string) => {
                let instruction = baseInstruction;
                if (artistName || recordTitle) {
                    instruction += ' CRITICAL: You must integrate the following text into the design, perfectly matching the typographic style.';
                    if (artistName) instruction += ` Artist Name: "${artistName}".`;
                    if (recordTitle) instruction += ` Record Title: "${recordTitle}".`;
                } else {
                    instruction += ' No text should be added to the cover.';
                }
                return instruction;
            };

            switch(artist) {
                case "Peter Saville Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in the minimalist, modernist style of Peter Saville’s Factory Records sleeves (late 1970s–early 1980s).
- LIKENESS: Softened and abstracted. The subject should be integrated into a geometric layout rather than being a direct portrait.
- TONE: Detached, intellectual, clinical.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE WORK: Precise, clean geometric divisions.
- COLOR: A muted palette of beige, greys, and pastels with a single accent color.
- TEXTURE: Absolutely flat print texture. No gradients or gloss.`,
                        fashion: `4. FASHION & ATTIRE: Not applicable; the focus is on abstract design and typography.`,
                        composition: `6. COMPOSITION & BACKGROUND: Use grids, modular layouts, ruled lines, and strong empty space. The subject may be a small element within this structure or appropriated like classical imagery.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Use a clean sans-serif or transitional serif font (like Lora or DM Serif Text). Placement must be bottom-aligned, small-scale, and often asymmetric.`)
                    };
                    break;
                case "Hipgnosis Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Recreate the subject from the photo entirely from scratch in the surreal staged-photograph style of a 1970s Hipgnosis album cover.
- LIKENESS: The subject must be recognizably themselves, but seamlessly integrated into a surrealist staging.
- TONE: Enigmatic, dreamlike, uncanny, and absurd.
- POSE: The figure must appear stiff, awkward, or oblivious—standing rigidly, seated formally, or gazing at something unseen. Avoid casual poses.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a medium format film photograph (e.g., Hasselblad).
- COLOR: Use muted Kodachrome/Ektachrome tones and a natural, heavy film grain.
- EFFECTS: The final image must look like it was created with practical, in-camera effects, multiple exposures, or physical collage. NO digital gloss.`,
                        fashion: `4. FASHION & ATTIRE: Ordinary mid-century clothing (suits, plain dresses, workwear) placed in a surreal, impossible environment.`,
                        composition: `6. COMPOSITION & BACKGROUND: The setting must be a surreal, staged photographic scene. CRITICAL: Choose ONLY ONE of the following ten distinct compositions for the artwork:
1. A person with a blurred, distorted face, with the background and their features appearing to melt and smear.
2. A close-up shot of a person sitting in the passenger seat of a car, with realistic water droplets on the window. The person's eyes are replaced with polished steel balls.
3. A person is standing in a vast, barren desert. They are shaking hands with an identical, burning version of themselves. Both figures have distinguishable features.
4. A lone person in a vast, dry desert landscape, surrounded by endless rows of beds on a cracked floor. Their shadow is distorted and stretches for miles.
5. A person standing in a shallow body of water, with their legs submerged. Floating around them are fractured mirrors reflecting impossible angles of the sky.
6. A person is seen from a distance, walking toward a derelict industrial site. An inflatable pig floats silently over the smokestacks in the background.
7. A person is lying down on a pristine floor, appearing to be levitating slightly above it, but their reflection in the floor is warped and grotesque.
8. A person's body is fragmented, with different parts montaged together on a blank background, creating a surreal and disconnected portrait.
9. A single, robed person is floating in mid-air in a desolate canyon. Their gaze is fixed on a minimalist symbolic object—a monolith—that is mysteriously glowing.
10. A person is standing in a vast, empty warehouse. They are casting an impossibly long shadow, and their figure is duplicated and receding into the distance.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Typography should be minimal. If present, use a small, modernist sans-serif font (like Montserrat) placed unobtrusively in a corner or along an edge.`)
                    };
                    break;
                case "Roger Dean Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Roger Dean’s 1970s fantasy landscape style.
- LIKENESS: Symbolic and mythologized. The subject should appear as a tiny, lone traveler or figure within a vast cosmic-fantasy landscape.
- TONE: Mystical, visionary, expansive.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate gouache and watercolor on thick, rough watercolor paper.
- LINE WORK: Fluid, curvilinear contours for landscapes, with controlled fine linework for textures.
- COLOR: Luminous watercolor washes, rich jewel tones, and ethereal skies, built up in transparent layers.
- TEXTURE: The artwork must have a matte finish with a visible paper grain and effects of scraped-back paint for highlights.`,
                        fashion: `4. FASHION & ATTIRE: A small, cloaked, robed, or armored figure that serves as a scale indicator.`,
                        composition: `6. COMPOSITION & BACKGROUND: The composition must be a wide, fantastical landscape featuring floating islands, root bridges, crystalline mountains, alien vegetation, and cosmic light. The figure is dwarfed by the environment.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Use a custom, organic, hand-lettered logo (like Eczar or Cinzel Decorative) that is integrated into the artwork, as if it is growing from the landscape itself.`)
                    };
                    break;
                case "Reid Miles Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Reid Miles’ hard bop modernist Blue Note album cover style (1955–1967).
- LIKENESS: Recognizable through high-contrast, duotone photography, but graphically reduced and integrated into a modular layout.
- TONE: Cool, sophisticated, urban, rhythmic.
- POSE: Cropped portrait or a candid musician-like stance.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate an offset print with duotone or limited color photography.
- COLOR: A restricted palette of blues, black/white, with an occasional single accent color (green or orange).
- TEXTURE: Smooth flat ink with visible halftone dots.`,
                        fashion: `4. FASHION & ATTIRE: Mid-century jazz musician attire (suits, ties, shirtsleeves), possibly with an instrument.`,
                        composition: `6. COMPOSITION & BACKGROUND: A modular grid with the photograph integrated into bold blocks of color. Use cropped heads, tilted compositions, and strong negative space rhythmically.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Typography is the hero element. Use a bold sans-serif (like Oswald or Archivo Black), often rotated, stacked, or oversized, dominating a significant portion of the cover.`)
                    };
                    break;
                case "Andy Warhol Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Andy Warhol’s iconic Pop Art record cover style (1964–1971).
- LIKENESS: Recognizable but reduced to flat, simplified shapes with sharp contrasts.
- TONE: Deadpan, ironic, commercially cool.
- POSE: Static, frontal, tightly cropped head-and-shoulders portrait, like a mugshot.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a silkscreen print.
- COLOR: A strict palette of 3–4 ultra-saturated, "day-glo" colors (hot pink, acid yellow, cyan, deep black) applied in flat blocks.
- TEXTURE: Perfectly flat ink coverage with sharp photographic edges where colors meet.
- DETAIL: Reduced to iconic essentials (eyes, nose, mouth) as flat contrasting shapes.`,
                        fashion: `4. FASHION & ATTIRE: Generic mid-60s/early-70s clothing (plain T-shirt, collared shirt), rendered flatly.`,
                        composition: `6. COMPOSITION & BACKGROUND: A centered, tightly cropped portrait against a pure, flat, solid color field for maximum pop.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Use a plain, industrial sans-serif font (like Montserrat), placed small and secondary in a corner or at the bottom.`)
                    };
                    break;
                case "Peter Blake Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Create a staged photograph of a physical collage in Peter Blake’s 1960s *Pop-Collage tableau* style (*Sgt. Pepper era*).
- LIKENESS: The central subject must be a direct reinterpretation of the provided photograph, processed to look like a physical, matte-finish photographic cut-out from the 1960s. CRITICAL: DO NOT illustrate, paint, or cartoonify the person. The subject must look like a real photograph that has been physically cut out and placed into the collage, matching the texture and lighting of the scene.
- TONE: Festive, ironic, playful, celebratory.
- SCALE: The central subject should be only slightly larger than the surrounding figures in the first row, as if they have taken one step forward.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: The final image must look like a real photograph of a physical, layered collage made of cardboard cut-outs and real objects.
- PHOTOGRAPHIC STYLE: Mimic the soft, slightly muted look of 1960s Hasselblad/Ektachrome photography with a slight halftone grain.
- TEXTURE: Everything in the scene must have a matte, physical, cardboard cut-out feel. Avoid all digital gloss or smoothness.`,
                        fashion: `4. FASHION & ATTIRE: The central subject's photographic cut-out should show them wearing a candy-colored military band uniform, consistent with the 1960s pop-art aesthetic.`,
                        composition: `6. COMPOSITION & BACKGROUND: The composition must be a crowded, festive, layered collage.
- BACKGROUND: A flat poster-colored field (blue, red, or yellow).
- SURROUNDING FIGURES: A crowd of dozens of other people, who must look like *photographic cut-outs* from various 1960s magazines and newspapers (varying in resolution, tone, and contrast).
- PROPS: The scene must include *real physical objects*, not illustrations. Include several of the following: a real drum kit with an emblem, real flowers framing the bottom edge, real kitsch objects like trophies or toy monkeys.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: If text is included, it must appear to be hand-painted onto the physical drumhead emblem in a playful, bold style.`)
                    };
                    break;
                case "Vaughan Oliver Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Vaughan Oliver’s ethereal, tactile 4AD style (late ’80s–early ’90s).
- LIKENESS: Fragmented, veiled, or abstracted. The subject's identity must be suggested through draped fabric, obscured silhouettes, ghostly overlays, or cropped forms, NEVER as a direct portrait.
- TONE: Mysterious, sensual, dreamlike, unsettling.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate an analog collage blending photography, fabric, and textures.
- COLOR: A mottled, desaturated palette of bruised blues, rusty ochres, and smoky greys, appearing as organic stains.
- TEXTURE: The image must be tactile, with deep photographic grain, stains, scratches, and blurred elements.`,
                        fashion: `4. FASHION & ATTIRE: Obscured by texture or fabric; should appear as abstract folds or muted silhouettes.`,
                        composition: `6. COMPOSITION & BACKGROUND: Place the obscured figure in an abstract void or a surreal collage of layered fabrics and disjointed objects. The space must be ambiguous and dreamlike.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Typography must be small, distressed, and subtle (e.g., a faint Garamond), appearing rubbed or ghosted into the surface at the periphery.`)
                    };
                    break;
                case "Barney Bubbles Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Barney Bubbles’ playful, postmodern graphic style (1970s–early 1980s).
- LIKENESS: Recognizable but reduced to a flattened graphic motif—a silhouette, vectorized reduction, or schematic diagram. The subject may be cropped, repeated, or mirrored.
- TONE: Witty, ironic, experimental, subversive.`,
                        execution: `3. TECHNICAL EXECUTION:
- COLOR: Use flat, unshaded spot colors (bright red, yellow, blue, black) in bold contrast.
- TEXTURE: Clean, with occasional halftone dot screens.
- LINE: Strong outlines, schematic clarity, vector-like precision.`,
                        fashion: `4. FASHION & ATTIRE: Schematized and flattened into graphic blocks.`,
                        composition: `6. COMPOSITION & BACKGROUND: A dynamic, asymmetric composition with bold geometric grids, radiating lines, or concentric circles. The background is a graphic field, not a realistic space.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Typography is a structural part of the composition. Use bold, oversized sans-serifs (like Impact or Futura) that slice through the portrait or act as geometric anchors.`)
                    };
                    break;
                case "Jamie Reid Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Jamie Reid’s punk ransom-note agitprop style (1976–1979).
- LIKENESS: A crude, high-contrast, photocopied halftone headshot.
- CRITICAL: The portrait must be vandalized. Deface it with safety pins through features, ransom-text strips across the face, X-ed out eyes, graffiti, or tape. The figure must not remain clean or intact.
- TONE: Anarchic, provocative, anti-establishment.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a collage of photocopies, Letraset type, and screenprint.
- COLOR: A clashing palette of Union Jack red/blue, neon pink, safety-yellow, and stark black/white.
- TEXTURE: Heavy photocopy grain, visible tape marks, ink splatters, and rough, torn edges.`,
                        fashion: `4. FASHION & ATTIRE: Add punk elements like leather jacket cut-outs or tartan scraps.`,
                        composition: `6. COMPOSITION & BACKGROUND: A chaotic cut-and-paste layout on a background of a torn Union Jack or a flat neon field.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Use aggressive ransom-note typography cut from different fonts and sizes. If text is provided, it must sprawl across or cover the face, placed crookedly. Slogans like "NO FUTURE" or "ANARCHY" can also be used.`)
                    };
                    break;
                case "Mati Klarwein Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Mati Klarwein’s psychedelic-surrealist oil painting style (late 1960s–1970s).
- LIKENESS: Faithful but mythologized, integrated into a symbolic cosmology.
- TONE: Visionary, sensual, ecstatic, cosmic.
- POSE: Theatrically posed, intertwined with symbolic or spiritual motifs.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a highly detailed oil on canvas painting.
- COLOR: Saturated jewel tones with luminous gradients.
- TEXTURE: Rich, layered, tactile oil paint brushwork.
- DETAIL: Extremely high, with micro-scenes and dense symbolic layering.`,
                        fashion: `4. FASHION & ATTIRE: Ornamental fabrics, beads, jewelry, or stylized mythological garments.`,
                        composition: `6. COMPOSITION & BACKGROUND: A collage-like, multi-plane composition with surreal transitions (e.g., an ocean merging into a sky, a face blending into a landscape). Juxtapose symbols of fertility, death, and spirituality.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Typography is minimal. If included, use a small classical serif font (like Cormorant Garamond) tucked into a corner.`)
                    };
                    break;
                case "Raymond Pettibon Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Raymond Pettibon’s raw, DIY punk brush-and-ink style (1980s).
- LIKENESS: Recognizable but hostilely distorted and defaced.
- CRITICAL: The face must not be intact. Eyes, mouth, or forehead must be obscured, warped, or overwritten with text or ink splatters.
- EXPRESSION: Hostile, sneering, unnerving. No smiles.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate India ink with a brush on paper, with heavy xerox grain.
- LINE WORK: Thick, scratchy, uneven brushstrokes and jagged cross-hatching.
- COLOR: Primarily black-and-white, with optional flat, misregistered blotches of red, yellow, or blue.
- TEXTURE: Messy ink bleed, scratch lines, and splatters.`,
                        fashion: `4. FASHION & ATTIRE: Basic or punk-coded clothing, drawn crudely.`,
                        composition: `6. COMPOSITION & BACKGROUND: A stark white or flat single-color field, layered with scrawled doodles.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: All lettering MUST look hand-scrawled, uneven, and scratchy. Text is intrusive and can be placed across the forehead, neck, or diagonally through the face. Combine user text with punk slogans like "NO FUTURE" or "HUMAN WASTE".`)
                    };
                    break;
                case "Alex Steinweiss Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo in Alex Steinweiss’ playful poster-modernist style (1940s–1950s).
- LIKENESS: Simplified, stylized, cartoon-like abstraction.
- TONE: Optimistic, theatrical, charming.
- POSE: The figure should be reduced to a caricature-like silhouette or a decorative motif.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a hand-painted illustration for letterpress or silkscreen.
- LINE WORK: Bold, simplified outlines and geometric shapes.
- COLOR: A flat, limited palette (red, blue, yellow, black, cream).
- TEXTURE: A matte, poster-like finish with minimal shading.`,
                        fashion: `4. FASHION & ATTIRE: Theatrical attire like tuxedos or gowns, rendered as simple silhouettes.`,
                        composition: `6. COMPOSITION & BACKGROUND: A stage-like setup with curtains, spotlights, or abstract geometric fields. Feature a central musical object (e.g., a trumpet, musical notes).`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Typography is part of the image. Use a large, central, theatrical combination of hand-drawn scripts (like Lobster Two) and bold slab serifs (like Bitter).`)
                    };
                    break;
                case "Anton Corbijn Style":
                    promptSections = { ...recordCoverBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Recreate the subject from the photo entirely from scratch in Anton Corbijn’s austere, high-grain monochrome photography style (1984–1993).
- LIKENESS: Realistic, candid, captured with stark clarity.
- TONE: Stoic, cinematic, devotional, moody.
- POSE: Subject standing still in an empty landscape or against a stark wall; rarely smiling.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate black-and-white or desaturated film photography.
- TEXTURE: Heavy film grain and a matte finish.
- DETAIL: High contrast, emphasizing silhouettes and shadows.`,
                        fashion: `4. FASHION & ATTIRE: Simple, timeless clothing in muted tones (dark coats, hats, leather jackets).`,
                        composition: `6. COMPOSITION & BACKGROUND: A centered or off-center portrait in an empty landscape (desert, barren plains) or against an industrial ruin, often with a wide horizon and cloudy sky.`,
                        typography: getTypographyPrompt(`7. TYPOGRAPHY & TEXT INTEGRATION: Use a small, unobtrusive, utilitarian sans-serif font (like Barlow Condensed) tucked into a corner or bottom-aligned.`)
                    };
                    break;
            }
            break;
        case "Movie Poster Art":
            includeTypography = true;
            let posterBase = {
                style: `2. ARTISTIC STYLE & CONTEXT:
- MEDIUM: The artwork must emulate a vintage movie one-sheet poster. The specific medium (lithograph, painting, etc.) depends on the artist's style.
- PURPOSE: This is a commercial film poster designed to sell a film to an audience.
- INFLUENCES: Varies by artist, from modernism to classical illustration.`,
                fashion: `4. FASHION & ATTIRE:
- Attire must be consistent with the film genre and the artist's era (e.g., pulp glamour, sci-fi hero, gritty 70s realism). Avoid anachronistic clothing.`,
                negative: universalNegativeConstraints,
                typography: `7. TYPOGRAPHY (INTEGRATED INTO ARTWORK):
- Include a movie title, a smaller tagline, and a compressed "billing block" at the bottom.
- The typography's style, font, and placement must be authentic to the artist's work and era.
- All text must appear as if it were part of the original physical artwork (e.g., hand-lettered, part of the lithographic print).`
            };

            switch(artist) {
                case "Al Hirschfeld Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the signature caricature illustration style of Al Hirschfeld (1930s-1990s).
- LIKENESS: Preserve likeness through witty, affectionate, and linear exaggeration.
- TONE: Whimsical, humorous, and energetic, evoking Broadway's golden age.
- POSE: Theatrical gestures, often as part of an ensemble.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE WORK: Use elegant, flowing black pen and ink lines with minimal crosshatching.
- COLORING: Primarily monochrome with sparse, selective color accents on a clean paper texture.
- ANATOMY: Exaggerated for caricature but maintaining recognizable features.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Cluster figures into a single, playful theatrical composition with balanced negative space.
- CRITICAL: The title must be placed at the TOP of the poster, like a marquee.`
                    };
                    break;
                case "Saul Bass Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the conceptual graphic style of Saul Bass (1950s-1980s).
- LIKENESS: Preserve likeness symbolically. Reduce the subject to simplified, abstract forms or cut-paper silhouettes. Likeness is minimal and suggestive.
- TONE: Bold, iconic, and unsettling.
- POSE: Static, stick-like, or cut-paper silhouette poses.`,
                        execution: `3. TECHNICAL EXECUTION:
- RENDERING: Use thick, jagged, cut-out shapes. Avoid smooth lines.
- COLORING: Employ a high-contrast, limited palette of flat color fills (e.g., orange, red, black, white).
- TEXTURE: The artwork must have a paper-cut, collage, or distressed ink-edge texture. It must feel analog.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- A single, central symbolic motif representing the subject must be the focus.
- Utilize strong negative space as a key design element. The background should be a flat, solid color.`
                    };
                    break;
                case "Richard Amsel Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the painterly montage style of Richard Amsel (1970s-1980s).
- LIKENESS: Preserve likeness with romantic realism.
- TONE: Heroic, glamorous, and cinematic.
- POSE: Central star portrait, with clustered figures in supporting poses.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a gouache and acrylic painting with a soft pencil underdrawing.
- COLORING: Use jewel tones and glowing highlights to create a luminous brushed glow.
- RENDERING: Soft, painterly contours.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- A central heroic figure is surrounded by a montage of smaller, clustered vignettes.
- The background is a fantasy or exotic backdrop.`
                    };
                    break;
                case "Robert McGinnis Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the pulp glamour style of Robert McGinnis (1960s-1980s).
- LIKENESS: Preserve likeness with elegant stylization.
- TONE: Sexy, adventurous, and mysterious.
- POSE: Reclining femme fatales, suave men, action poses.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a gouache or oil painting on board.
- LINE WORK: Clean outlines with elongated, stylized anatomy.
- COLORING: Use a flat, bold, and sultry color palette with smooth blends.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Focus on a central glamour figure with iconic props (guns, martinis).
- The background should be clean and supportive, not distracting.`
                    };
                    break;
                case "Burt Kleeger Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the conceptual style of Burt Kleeger (1970s-1980s).
- LIKENESS: Preserve likeness ONLY through silhouettes, props, or profiles. DO NOT create a direct portrait.
- TONE: Concept-driven, provocative, and nostalgic.
- POSE: Distant figures, silhouettes, or implied presence through objects.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate an offset lithograph with a photo-based layout.
- RENDERING: Stark, photographic silhouettes.
- COLORING: Monochrome or duotone palette (e.g., red/black/white) with analog halftone grain.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- A single, striking central image must dominate the composition, with significant breathing room.
- The background should be a grounded, authentic location (e.g., a cityscape).`
                    };
                    break;
                case "Drew Struzan Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the painted montage style of Drew Struzan (1970s-2000s).
- LIKENESS: Preserve likeness faithfully but in an idealized way.
- TONE: Epic, nostalgic, and adventurous.
- POSE: Central heroic figure, with other characters as 'floating heads'.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a mixed-media piece using a pencil base with acrylic and airbrush.
- TEXTURE: The artwork must feature warm glows, saturated highlights, and detailed facial rendering.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- A montage of floating heads or vignettes surrounding a central heroic figure.
- Weave in iconic props. The background must be galactic, mystical, or historical.`
                    };
                    break;
                case "Bob Peak Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the painterly abstraction style of Bob Peak (1960s-1980s).
- LIKENESS: Preserve likeness loosely, prioritizing glamour and motion over photorealism.
- TONE: Energetic, theatrical, and painterly.
- POSE: Figures in motion, dynamic and elongated.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate gouache or acrylic with expressive brushwork and layered washes.
- COLORING: Use an explosive, highly saturated color palette.
- ANATOMY: Figures should be elongated and dynamic.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- The figure(s) must appear to dissolve into painterly color fields.
- The background should be abstract and merge with the subject.`
                    };
                    break;
                case "John Alvin Style":
                     promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the luminous style of John Alvin (1970s-1990s).
- LIKENESS: Preserve likeness softly, infused with a dreamlike, mystical glow.
- TONE: Aspirational, magical, and mystical.
- POSE: A single, iconic silhouette or magical pose.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate airbrush, acrylic, and pastel.
- RENDERING: Soft edges, blended contours, and a misty, ethereal texture.
- COLORING: A palette of radiant beams, cosmic blues, and golden halos.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Feature a single, central iconic figure against a dreamlike background with light beams or cosmic effects.`
                    };
                    break;
                case "Reynold Brown Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the dynamic realist style of Reynold Brown (1950s-1960s).
- LIKENESS: Preserve likeness through dramatic realism and cinematic staging.
- TONE: Thrilling, spectacular, with pulp energy.
- POSE: Heroic close-ups and dramatic action poses.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a 1950s-60s oil on canvas painting.
- RENDERING: Painterly but precise brushwork with realistic anatomy.
- COLORING: Rich saturation and bold contrasts.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Focus on central, dramatic figures, often with monsters or explosions.
- Set against expansive skies or cityscapes with cinematic spotlighting.`
                    };
                    break;
                case "Frank McCarthy Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the cinematic action style of Frank McCarthy (1960s-1970s).
- LIKENESS: Preserve likeness with high-energy realism.
- TONE: Sweeping, epic, and intense.
- POSE: Groups in motion, with dynamic diagonals and dramatic foreshortening.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a 1960s-70s oil on board painting.
- TEXTURE: Painterly, brush-driven dynamism.
- COLORING: Fiery warm tones and earthy palettes.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Create a montage of action scenes centered on heroes in motion.
- The background must be explosive or crowded, capturing a moment of peak drama.`
                    };
                    break;
                case "Bill Gold Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the conceptual and typographic style of Bill Gold (1940s-2000s).
- LIKENESS: Preserve likeness via symbolic imagery and layout, NOT full illustration.
- TONE: Concept-driven, cinematic, and balanced.
- POSE: Minimal—objects, landscapes, or silhouettes representing the character.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: The design must be based on clean layouts, often using photography, with a matte, analog finish.
- COLORING: Subdued palettes with dramatic tonal shifts.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- A single strong symbol or minimalist image must dominate the composition.`
                    };
                    break;
                case "Tom Jung Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the iconic fantasy realism style of Tom Jung (1970s, Star Wars era).
- LIKENESS: Preserve likeness with an idealized heroic pose.
- TONE: Heroic, mythic, and adventurous.
- POSE: A central heroic figure with a weapon drawn, in a dramatic stance.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a painterly, realistic style with a sleek sci-fi polish.
- RENDERING: Realistic anatomy with fantasy exaggeration.
- COLORING: Moody, dramatic tones with glowing lights (like lightsabers).`,
                        composition: `6. COMPOSITION & BACKGROUND:
- A central hero stands against a galactic or space background.
- Supporting figures or symbols are layered behind them.`
                    };
                    break;
                case "Philip Gips Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch in the conceptual minimalist style of Philip Gips (1960s-1980s).
- LIKENESS: Preserve likeness symbolically. Reduce characters to silhouettes, shadows, or suggestive forms, NOT direct portraits.
- TONE: Unsettling, cerebral, and mysterious.
- POSE: Implied through symbolic imagery, not direct poses.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate offset lithography with soft film grain, optical glows, and subtle halation.
- RENDERING: Crisp silhouettes and simple contours.
- COLORING: A monochrome or duotone palette (e.g., green/black/white).`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Vast negative space (black voids, fog) must dominate.
- A singular, central symbolic image is positioned against this emptiness.`
                    };
                    break;
                case "Stephen Frankfurt Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Recreate the scene entirely from scratch in the restrained photographic style of Stephen Frankfurt (1960s-1970s).
- LIKENESS: Preserve likeness with authentic, subdued, and atmospheric photography.
- TONE: Elegant, symbolic, and restrained.
- POSE: Figures placed in contemplative or distant framing, often dwarfed by the environment.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate black-and-white or muted color photography with natural film grain and a matte finish.
- RENDERING: Crisp photographic framing with minimal retouching.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Use strong shadow, negative space, and natural light.
- Feature symbolic props or settings that dwarf the subject.`
                    };
                    break;
                case "Hans Hillmann Style":
                    promptSections = { ...posterBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Recreate the scene entirely from scratch in the Frankfurt School modernist style of Hans Hillmann (1960s-1970s).
- LIKENESS: Preserve likeness symbolically. Reduce figures to minimal poses, stark photography, or simple graphic abstractions.
- TONE: Intellectual, restrained, and cerebral.
- POSE: Figures isolated in empty rooms, standing in harsh light, or as silhouettes.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate grainy B&W photography or flat monochrome shapes on matte paper with analog haltones.
- COLORING: Black-and-white or a muted palette, with an occasional stark accent color (e.g., red, ochre).`,
                        composition: `6. COMPOSITION & BACKGROUND:
- Emptiness must dominate the layout. Figures are small in the frame, dwarfed by vast walls or stark shadows.
- Create a strong sense of geometric balance.`
                    };
                    break;
            }
            break;
        case "Art Nouveau":
            includeTypography = artist === "Alphonse Mucha Style" || artist === "Henri de Toulouse-Lautrec Style";
            let artNouveauBase = {
                style: `2. ARTISTIC STYLE & CONTEXT:
- MOVEMENT: Art Nouveau (late 19th - early 20th century).
- PURPOSE: Varies from fine art painting to decorative poster design.
- INFLUENCES: Organic forms, Japanese woodblock prints, Symbolism.`,
                fashion: `4. FASHION & ATTIRE:
- Flowing, elegant Belle Époque gowns and attire with organic, natural motifs.`,
                negative: universalNegativeConstraints
            };
            switch(artist) {
                case "Alphonse Mucha Style":
                    promptSections = { ...artNouveauBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the photograph of ${characterDescription}. Redraw the subject entirely from scratch in the signature style of Alphonse Mucha (c. 1890-1910).
- LIKENESS: Highly idealized and elegant, with a serene, ethereal quality.
- TONE: Graceful, decorative, and sensual.
- POSE: A graceful, posed woman, often in a 3/4 view, surrounded by flowing hair and fabric.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate a lithographic poster with a visible paper texture.
- LINE WORK: Use long, sinuous, and flowing "whiplash" contour lines.
- COLORING: A soft, delicate pastel color palette (e.g., sage green, dusty rose, cream, muted gold).`,
                        composition: `6. COMPOSITION & BACKGROUND:
- The composition must be framed by elaborate floral motifs, decorative borders, and elegant arched or circular 'halos'.`,
                        typography: `7. TYPOGRAPHY (INTEGRATED INTO ARTWORK):
- If text is included, it must be a custom, hand-drawn, decorative typeface that is fully integrated into the ornamental composition.`
                    };
                    break;
                case "Gustav Klimt Style":
                     promptSections = { ...artNouveauBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the photograph of ${characterDescription}. Redraw the subject entirely from scratch in the 'Golden Phase' style of Gustav Klimt (c. 1900-1909).
- LIKENESS: Faces and hands are rendered with soft realism, while the rest of the body is abstracted.
- TONE: Opulent, erotic, and mystical.
- POSE: Often frontal, static, and monumental, like a Byzantine icon.`,
                        execution: `3. TECHNICAL EXECUTION:
- MEDIUM: Emulate an oil painting with applied gold leaf on canvas.
- TEXTURE: Contrast the smooth, painted skin with the rich, tactile, mosaic-like texture of the clothing and background.
- COLORING: Use shimmering gold leaf over rich jewel tones and earth tones. Incorporate symbolic motifs like spirals, eyes, and stylized florals.`,
                        composition: `6. COMPOSITION & BACKGROUND:
- The figure is embedded within a flat, decorative, patterned background of golden tessellations and mosaic-like fields.`
                    };
                    break;
                // Simplified other styles for brevity
                default:
                     promptSections = { core: `Redraw ${characterDescription} from scratch in the style of ${artist}.`};
                     break;
            }
            break;
        case "Expressionism":
            includeTypography = false;
            let expressionismBase = {
                negative: universalNegativeConstraints,
                typography: `7. TYPOGRAPHY & TEXT INTEGRATION: Not relevant — this style is pure painting.`
            };

            switch(artist) {
                case "Edvard Munch Style":
                    promptSections = { ...expressionismBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo entirely from scratch in Edvard Munch’s late 19th–early 20th century Expressionist style.
- LIKENESS: Recognizable but warped by emotional exaggeration; features may be subtly distorted or elongated to convey psychological tension, while maintaining core facial structure.
- TONE: Anxiety, melancholy, existential dread.
- POSE: Static, frontal, or slightly angled; the figure should be isolated against a voidlike background.`,
                        style: `2. ARTISTIC STYLE & CONTEXT:
- INFLUENCES: Symbolism, early Expressionism.
- MEDIUM: Emulate an oil painting with visible, swirling brushstrokes.
- PURPOSE: To convey inner psychology rather than a physical likeness.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE: Use flowing, undulating contours that destabilize forms.
- COLOR: Employ an unnatural, acidic palette (sickly greens, blood reds, eerie blues). Flesh tones must appear sickly or unnaturally vibrant.
- TEXTURE: The finish must be painterly and almost rough, with layered, visible brushwork.
- DETAIL: Simplify facial features, often with hollow or wide, staring eyes.`,
                        fashion: `4. FASHION & ATTIRE: Simple, dark late-19th/early-20th century clothing (suits, dresses). The clothing must be simplified and secondary to the psychological expression.`,
                        composition: `6. COMPOSITION & BACKGROUND: Place the figure in a voidlike space or a distorted landscape. The background must swirl and distort to mirror the subject's internal emotional state.`
                    };
                    break;
                case "Egon Schiele Style":
                    promptSections = { ...expressionismBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo entirely from scratch in Egon Schiele’s radical, angular Expressionist style (1907–1918).
- LIKENESS: Recognizable but gaunt, hollowed, and psychologically raw. Features should retain humanity but appear wounded or fragile.
- TONE: Confessional, vulnerable, confrontational.
- POSE: Asymmetrical, slightly twisted, with exaggerated gestures (especially hands) conveying tension and unease.`,
                        style: `2. ARTISTIC STYLE & CONTEXT:
- INFLUENCES: Klimt, Viennese Secession.
- MEDIUM: Emulate gouache and watercolor on paper.
- PURPOSE: To make internal struggle and raw human vulnerability visible.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE: Use jagged, vibrating, sharp contours.
- COLOR: A muted earth-tone palette with bruised reds, greens, or oranges applied sparingly to lips, eyes, and joints.
- TEXTURE: The artwork must have the texture of thin washes on paper, with raw exposed underlayers and unfinished edges.
- DETAIL: CRITICAL: Hands must be exaggeratedly angular and bony with long fingers. Anatomy should have a slight asymmetry.`,
                        fashion: `4. FASHION & ATTIRE: Sparse, simple clothing (e.g., an open shirt), rendered loosely with washed-in color, never competing with the flesh.`,
                        composition: `6. COMPOSITION & BACKGROUND: The figure must be isolated in a stark, unfinished space. The background should be minimal, suggesting raw paper or thin color washes.`
                    };
                    break;
                case "Oskar Kokoschka Style":
                     promptSections = { ...expressionismBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo entirely from scratch in Oskar Kokoschka’s psychologically charged Expressionist style (Vienna, 1907–1915).
- LIKENESS: Recognizable features, but distorted through emotional interpretation and visible anxiety.
- TONE: Restless, unstable, urgent.
- POSE: The subject should be caught in a fleeting moment of inner revelation or distress.`,
                        style: `2. ARTISTIC STYLE & CONTEXT:
- INFLUENCES: Viennese Secession, Freudian psychoanalysis.
- MEDIUM: Emulate an oil painting, aggressively applied with a palette knife and brush.
- PURPOSE: To reveal psychological truth over physical likeness.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE: Contours must break and reform, drawn with neurotic, trembling energy.
- COLOR: Use a muddy, unstable palette of earth tones (umber, ochre) mixed with unexpected greens, purples, and reds in the flesh.
- TEXTURE: The paint must have a visceral texture, alternating between thick impasto and scraped-back passages.
- BRUSHWORK: Every stroke must tremble with nervous energy.`,
                        fashion: `4. FASHION & ATTIRE: Early 1900s bourgeois clothing, painted so loosely it appears to dissolve into the surrounding atmosphere.`,
                        composition: `6. COMPOSITION & BACKGROUND: The background must be sparse and abstracted, but feel unstable and vibrating, echoing the sitter’s psyche. The figure dominates, but the atmosphere shares the same agitation.`
                    };
                    break;
                case "Ernst Ludwig Kirchner Style":
                    promptSections = { ...expressionismBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo entirely from scratch in Ernst Ludwig Kirchner’s angular, urban Expressionist style (Die Brücke era, 1905–1920).
- LIKENESS: Recognizable likeness is critical, but features must be distorted and elongated through sharp, angular exaggeration.
- TONE: Anxious, alienated, electric with tension.
- POSE: Stiff, frontal or slightly angled, as if caught in the unease of a modern city.`,
                        style: `2. ARTISTIC STYLE & CONTEXT:
- INFLUENCES: Primitivism, African masks, woodcuts.
- MEDIUM: Emulate an oil painting with jagged, woodcut-like outlines.
- CONTEXT: The fractured psychology of modern urban life.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE: Use jagged, angular, sharply carved contours, as if painted with a knife.
- COLOR: Use a palette of bold primaries, acidic greens, unnatural pinks, and harsh blacks. Flesh tones can be non-naturalistic (green, blue, raw red).
- TEXTURE: The artwork should consist of flat, unblended planes of color with aggressive, visible strokes.`,
                        fashion: `4. FASHION & ATTIRE: Modern 1910s–1920s urban fashion (dark suits, hats, angular dresses), rendered in flat planes and sharp contrasts.`,
                        composition: `6. COMPOSITION & BACKGROUND: The background must be a tilted, unstable urban setting with angular streets and looming facades. The composition should feel off-kilter with strong diagonals.`
                    };
                    break;
                case "Vincent van Gogh Style":
                     promptSections = { ...expressionismBase,
                        core: `1. CORE INSTRUCTION & LIKENESS MANDATE: Redraw the subject from the photo entirely from scratch in Vincent van Gogh’s late Post-Impressionist portrait style (Arles–Auvers period, 1888–1890).
- LIKENESS: Recognizable, but heightened with rhythmic, sculptural brushwork.
- TONE: Raw, restless, turbulent, and compassionate. The subject's expression must convey unease or tension, never serenity.
- POSE: Frontal or three-quarter view, with a direct, weary, or contemplative gaze.`,
                        style: `2. ARTISTIC STYLE & CONTEXT:
- INFLUENCES: Impressionism, Japanese prints, Symbolism.
- MEDIUM: Emulate an oil painting with extremely heavy, thick impasto.
- PURPOSE: To reveal psychological intensity through color and motion.`,
                        execution: `3. TECHNICAL EXECUTION:
- LINE & STROKE: Use short, directional, rhythmic strokes that are never blended and always visible, like carved marks in paint. Strokes must overlap in chaotic arcs.
- COLOR: A vivid, symbolic palette (fiery oranges, golden yellows, cobalt blues, emerald greens). Introduce unnatural tones into skin: emerald shadows, vermilion highlights.
- TEXTURE: CRITICAL: The paint must appear thick, sculpted, and raised, with a three-dimensional impasto texture.`,
                        fashion: `4. FASHION & ATTIRE: Simple, working-class clothing (e.g., a plain jacket or smock), painted in bold strokes that merge into the background rhythm.`,
                        composition: `6. COMPOSITION & BACKGROUND: The background must be alive with movement, featuring swirling skies, vibrating halos, or patterned interiors. The subject and background must merge rhythmically, with brushstrokes echoing across both.`
                    };
                    break;
            }
            break;
        case "70s & 80s Classic Anime":
            includeTypography = false;
            promptSections = {
                core: `1. CORE INSTRUCTION & LIKENESS MANDATE:
Analyze the provided photograph of ${characterDescription}. Redraw the subject entirely from scratch as a character in a 1970s-1980s classic anime, emulating the specific aesthetic of ${artist}.
- LIKENESS: Stylized but recognizable, with large expressive eyes, detailed hair, and elegant proportions.
- TONE: Dramatic, cinematic, and often melancholic or serious.
- POSE: A dramatic portrait or a cinematic keyframe pose.`,
                style: `2. ARTISTIC STYLE & CONTEXT:
- MEDIUM: Emulate a hand-painted animation cel on a watercolor background.
- PURPOSE: A production still from a classic anime film or OVA.
- INFLUENCES: Film noir, 1970s cinema, and dramatic manga.`,
                execution: `3. TECHNICAL EXECUTION:
- LINE WORK: Clean, confident ink lines of varying weight.
- COLORING: Flat cel-shading with areas of solid color. Use stark, high-contrast lighting and heavy, blocky shadows.
- TEXTURE: The image must have a subtle film grain and the characteristic look of a painted cel, including potential lens flares or a "Postcard Memory" effect (a beautifully painted still frame).`,
                fashion: `4. FASHION & ATTIRE:
- Clothing should be appropriate for the genre (sci-fi, fantasy, drama) of the 70s/80s, with a slightly retro feel.`,
                negative: universalNegativeConstraints,
                composition: `6. COMPOSITION & BACKGROUND:
- The composition should be cinematic, using dramatic angles and framing.
- The background should be a moody, atmospheric painting, often with a lower level of detail than the character cel.`
            };
            break;
        default:
            // A fallback for styles not yet fully implemented with the new framework
            return `Analyze the provided photograph to understand the facial features, expression, and likeness of ${characterDescription}. Then, create an entirely new piece of artwork in the distinct style of ${artist}. The subject of your new artwork will be a character whose face is a stylized reinterpretation of the person in the photograph. CRITICAL: Do NOT copy, trace, or paste the face from the photo. You must redraw their entire face, hair, and expression from scratch using ${artist}'s specific techniques. The final result must be a cohesive piece that looks as if ${artist} themselves painted this person as the original subject, capturing their unique approach to line work, color palette, brushwork, and lighting. Do not add any text, signatures, or frames.`;
    }

    const sections = ['core', 'style', 'execution', 'fashion', 'negative', 'composition'];
    if (includeTypography) {
        sections.push('typography');
    }
    
    return sections.map(key => promptSections[key]).filter(Boolean).join('\n\n');
};

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4 h-full">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-museum-gold dark:border-dm-accent"></div>
      <p className="caption text-museum-text dark:text-dm-text-secondary">The Curator is preparing your masterpiece...</p>
    </div>
);

type Page = 'home' | 'exhibits' | 'studio';
type ExhibitKey = keyof typeof exhibitData;

const ThemeToggle = ({ theme, setTheme }: { theme: string, setTheme: (theme: string) => void }) => {
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full text-museum-text/70 dark:text-dm-text-secondary hover:text-museum-text dark:hover:text-dm-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-museum-bg dark:focus:ring-offset-dm-bg focus:ring-museum-gold dark:focus:ring-dm-accent transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
};


const Header = ({ setPage, theme, setTheme }: { setPage: (page: Page) => void, theme: string, setTheme: (theme: string) => void }) => (
    <header className="flex justify-between items-center mb-10">
        <button onClick={() => setPage('home')} className="text-2xl md:text-3xl font-bold focus:outline-none hover:text-museum-gold dark:hover:text-dm-accent transition-colors">Nano Banana Museum</button>
        <div className="flex items-center space-x-2 md:space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
              <button onClick={() => setPage('home')} className="hover:text-museum-gold dark:hover:text-dm-accent transition-colors">Home</button>
              <button onClick={() => setPage('exhibits')} className="hover:text-museum-gold dark:hover:text-dm-accent transition-colors">Exhibits</button>
          </nav>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
    </header>
);

const HomePage = ({ setPage, selectExhibit }: { setPage: (page: Page) => void, selectExhibit: (key: ExhibitKey) => void }) => {
    const featuredExhibits = useMemo(() => {
        const allKeys = Object.keys(exhibitData) as ExhibitKey[];
        const shuffled = allKeys.sort(() => 0.5 - Math.random());
        return Array.from(new Set(shuffled)).slice(0, 5);
    }, []);

    const handleExhibitClick = (key: ExhibitKey) => {
        selectExhibit(key);
        setPage('studio');
    };

    return (
        <div>
            <section className="text-center mb-16">
                 <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to the Museum</h2>
                 <p className="text-lg mb-8 max-w-2xl mx-auto text-museum-text/80 dark:text-dm-text-secondary">Transform your portrait into a masterpiece. Explore our collection of art styles, from ancient traditions to modern subcultures, and commission your own unique artwork.</p>
                 <button onClick={() => setPage('exhibits')} className="bg-museum-brown text-white dark:bg-dm-accent dark:text-dm-bg py-3 px-8 font-semibold tracking-widest hover:bg-museum-brown-darker dark:hover:bg-opacity-90 transition-colors">
                     VISIT THE EXHIBITS
                 </button>
            </section>
            
            <section>
                <h3 className="text-3xl font-bold mb-6">Featured Exhibits</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {featuredExhibits.map((key) => {
                        const exhibit = exhibitData[key];
                        return (
                           <button key={key} onClick={() => handleExhibitClick(key)} className="focus:outline-none group text-center">
                                <div className="p-1.5 rounded-sm shadow-md bg-museum-gold dark:bg-dm-frame group-hover:bg-museum-brown dark:group-hover:bg-dm-accent group-hover:shadow-lg dark:group-hover:shadow-dm-accent/20 transition-all duration-300">
                                    <img src={exhibit.image} alt={exhibit.title} className="w-full h-48 object-cover" />
                                </div>
                                <p className="mt-2 font-semibold text-sm">{key}</p>
                            </button>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

const ExhibitsPage = ({ setPage, selectExhibit }: { setPage: (page: Page) => void, selectExhibit: (key: ExhibitKey) => void }) => {
    const handleExhibitClick = (key: ExhibitKey) => {
        selectExhibit(key);
        setPage('studio');
    };

    return (
        <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-10 text-center">Exhibits Directory</h2>
            {Object.entries(exhibitGroups).map(([groupTitle, exhibitKeys]) => (
                <section key={groupTitle} className="mb-12">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-museum-gold dark:border-dm-divider pb-2">{groupTitle}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {(exhibitKeys as ExhibitKey[]).map(key => {
                             const exhibit = exhibitData[key];
                             return (
                                 <button key={key} onClick={() => handleExhibitClick(key)} className="text-left focus:outline-none group">
                                     <div className="p-1.5 rounded-sm shadow-md bg-museum-gold dark:bg-dm-frame group-hover:bg-museum-brown dark:group-hover:bg-dm-accent group-hover:shadow-lg dark:group-hover:shadow-dm-accent/20 transition-all duration-300">
                                         <img src={exhibit.image} alt={exhibit.title} className="w-full h-48 object-cover" />
                                     </div>
                                     <p className="mt-2 font-semibold text-sm">{key}</p>
                                 </button>
                             );
                        })}
                    </div>
                </section>
            ))}
        </div>
    );
};


const StudioPage = ({ exhibitKey }: { exhibitKey: ExhibitKey }) => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [selectedExhibit, setSelectedExhibit] = useState<ExhibitKey>(exhibitKey);
    const [selectedStyle, setSelectedStyle] = useState(exhibitData[exhibitKey].artists[0]);
    const [selectedComposition, setSelectedComposition] = useState(exhibitData[exhibitKey].compositions[0]);
    const [artistName, setArtistName] = useState('');
    const [recordTitle, setRecordTitle] = useState('');
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const activeExhibit = useMemo(() => exhibitData[selectedExhibit], [selectedExhibit]);

    useEffect(() => {
        setSelectedExhibit(exhibitKey);
        const newExhibit = exhibitData[exhibitKey];
        setSelectedStyle(newExhibit.artists[0]);
        setSelectedComposition(newExhibit.compositions[0]);
        setArtistName('');
        setRecordTitle('');
    }, [exhibitKey]);

    const handleFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setError(null);
        setResultImage(null); // Clear previous result on new upload
        setArtistName('');
        setRecordTitle('');
        const filePromises = Array.from(files).map((file: File) => {
            return new Promise<ImageFile>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result && typeof e.target.result === 'string') {
                        resolve({
                            base64: e.target.result.split(',')[1],
                            mimeType: file.type,
                            preview: URL.createObjectURL(file)
                        });
                    } else {
                        reject(new Error('Failed to read file as a data URL string.'));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
        Promise.all(filePromises).then(setImages).catch(err => {
            console.error(err);
            setError('There was an error reading the files.');
        });
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        (event.currentTarget as HTMLDivElement).classList.remove('border-museum-brown', 'dark:border-dm-accent');
        handleFileChange(event.dataTransfer.files);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        (event.currentTarget as HTMLDivElement).classList.add('border-museum-brown', 'dark:border-dm-accent');
    }, []);
    
    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        (event.currentTarget as HTMLDivElement).classList.remove('border-museum-brown', 'dark:border-dm-accent');
    }, []);

    const handleTransform = async () => {
        if (images.length === 0 || !selectedExhibit || !selectedStyle) {
            setError('Please upload a portrait and select a style.');
            return;
        }

        setLoading(true);
        setError(null);
        setResultImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const characterDescription = images.length > 1 ? 'the people in the photos' : 'the person in the photo';
            const prompt = generateDetailedPrompt(selectedExhibit, selectedStyle, characterDescription, artistName, recordTitle);
            
            const imageParts = images.map(img => ({ inlineData: { data: img.base64, mimeType: img.mimeType } }));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [...imageParts, { text: prompt }] },
                config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
            });
            
            const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
            if (imagePart) {
                const { data, mimeType } = imagePart.inlineData;
                setResultImage(`data:${mimeType};base64,${data}`);
            } else {
                 throw new Error("The API did not return an image. It may have been blocked due to safety policies or prompt restrictions.");
            }

        } catch (e) {
            console.error(e);
            setError(`An error occurred: ${(e as Error).message}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                <div className="p-2 bg-museum-gold dark:bg-dm-frame rounded-sm shadow-lg">
                    <div className="p-1 bg-museum-bg dark:bg-dm-panel">
                        <img src={activeExhibit.image} alt={activeExhibit.title} className="w-full h-auto object-cover" />
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">{activeExhibit.title}</h2>
                    <p className="text-lg mb-6 max-w-lg text-museum-text/80 dark:text-dm-text-secondary">{activeExhibit.description}</p>
                    <div className="flex space-x-8 text-sm caption mb-8">
                        <div>
                            <p className="font-semibold tracking-widest">OPEN HOURS</p>
                            <p>Thurs - Mon • 10-5pm</p>
                        </div>
                        <div>
                            <p className="font-semibold tracking-widest">TODAY'S BALANCE</p>
                            <p>5 of 5</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 border-t-2 border-museum-gold dark:border-dm-divider pt-12">
                <div className="lg:col-span-2">
                    <h3 className="text-3xl font-bold mb-4">Curator's Panel</h3>
                    <h4 className="font-semibold tracking-widest mb-2 caption">NOTES</h4>
                    <p className="mb-4 text-museum-text/80 dark:text-dm-text-secondary caption">{activeExhibit.curatorNotes}</p>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                        className="flex flex-col items-center justify-center p-4 bg-museum-bg dark:bg-dm-panel border-2 border-dashed border-museum-gold dark:border-dm-frame transition-colors min-h-[250px] rounded-sm"
                        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                         <input type="file" id="file-upload" multiple accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files)} />
                         {images.length > 0 ? (
                             <div className="grid grid-cols-3 gap-2 p-2">
                                 {images.map((img, index) => (
                                     <img key={index} src={img.preview} alt={`preview ${index}`} className="w-full h-auto object-cover rounded-sm shadow-sm" />
                                 ))}
                             </div>
                         ) : (
                             <div className="text-center text-museum-gold dark:text-dm-text-secondary cursor-pointer">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                 <p className="caption">Drag an image here</p>
                                 <p className="caption text-xs">or click to upload</p>
                             </div>
                         )}
                    </div>
                    <div>
                        <div className="space-y-4">
                           <div>
                               <label htmlFor="style-select" className="block text-sm font-semibold caption mb-1">Style</label>
                               <select id="style-select" value={selectedStyle} onChange={e => setSelectedStyle(e.target.value)} className="w-full p-2 border border-museum-gold dark:border-dm-frame bg-white dark:bg-dm-panel rounded-sm focus:ring-1 focus:ring-museum-brown dark:focus:ring-dm-accent focus:outline-none">
                                   {activeExhibit.artists.map(artist => <option key={artist} value={artist}>{artist}</option>)}
                               </select>
                           </div>
                           <div>
                               <label htmlFor="composition-select" className="block text-sm font-semibold caption mb-1">Composition</label>
                               <select id="composition-select" value={selectedComposition} onChange={e => setSelectedComposition(e.target.value)} className="w-full p-2 border border-museum-gold dark:border-dm-frame bg-white dark:bg-dm-panel rounded-sm focus:ring-1 focus:ring-museum-brown dark:focus:ring-dm-accent focus:outline-none">
                                   {activeExhibit.compositions.map(comp => <option key={comp} value={comp}>{comp}</option>)}
                               </select>
                           </div>
                            {selectedExhibit === 'Record Cover Art' && (
                                <>
                                    <div>
                                        <label htmlFor="artist-name" className="block text-sm font-semibold caption mb-1">Group/Artist Name (Optional)</label>
                                        <input
                                            id="artist-name"
                                            type="text"
                                            value={artistName}
                                            onChange={e => setArtistName(e.target.value)}
                                            className="w-full p-2 border border-museum-gold dark:border-dm-frame bg-white dark:bg-dm-panel rounded-sm focus:ring-1 focus:ring-museum-brown dark:focus:ring-dm-accent focus:outline-none"
                                            placeholder="e.g., The Void"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="record-title" className="block text-sm font-semibold caption mb-1">Record Title (Optional)</label>
                                        <input
                                            id="record-title"
                                            type="text"
                                            value={recordTitle}
                                            onChange={e => setRecordTitle(e.target.value)}
                                            className="w-full p-2 border border-museum-gold dark:border-dm-frame bg-white dark:bg-dm-panel rounded-sm focus:ring-1 focus:ring-museum-brown dark:focus:ring-dm-accent focus:outline-none"
                                            placeholder="e.g., Echoes of Silence"
                                        />
                                    </div>
                                </>
                            )}
                           <div className="text-sm caption pt-2">
                               <p><span className="font-semibold">Run Budget:</span> 5 remaining</p>
                               <p><span className="font-semibold">Safe Mode:</span> Active</p>
                           </div>
                           <button 
                               onClick={handleTransform}
                               disabled={loading || images.length === 0}
                               className="w-full bg-museum-brown text-white dark:bg-dm-accent dark:text-dm-bg py-3 px-8 font-semibold tracking-widest hover:bg-museum-brown-darker dark:hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                           >
                               {loading ? 'CREATING...' : 'COMMISSION ARTWORK'}
                           </button>
                        </div>
                    </div>
                </div>
            </section>
            
            {(resultImage || loading || error) && (
              <section className="mt-16 border-t-2 border-museum-gold dark:border-dm-divider pt-12">
                  <h3 className="text-3xl font-bold mb-6 text-center">Your Commissioned Artwork</h3>
                  <div className="flex justify-center items-center bg-gray-100 dark:bg-dm-bg p-6 rounded-lg shadow-inner min-h-[400px]">
                      {loading && <LoadingSpinner />}
                      {error && <p className="text-red-600 dark:text-red-400 text-center caption max-w-md">{error}</p>}
                      {!loading && !error && resultImage && (
                          <div className="text-center">
                              <div className="p-2 bg-museum-gold dark:bg-dm-frame shadow-2xl inline-block">
                                  <img src={resultImage} alt="Generated Artwork" className="max-w-full max-h-[60vh]" />
                              </div>
                              <a 
                                href={resultImage} 
                                download="nano-banana-museum-artwork.png"
                                className="inline-block mt-6 py-2 px-8 bg-museum-brown text-white dark:bg-dm-accent dark:text-dm-bg font-semibold rounded-sm shadow-md hover:bg-museum-brown-darker dark:hover:bg-opacity-90 transition-colors"
                              >
                                Download Artwork
                              </a>
                          </div>
                      )}
                  </div>
              </section>
            )}
        </div>
    );
};

const App = () => {
    const [page, setPage] = useState<Page>('home');
    const [activeExhibitKey, setActiveExhibitKey] = useState<ExhibitKey>('Art Nouveau');
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const selectExhibit = (key: ExhibitKey) => {
        setActiveExhibitKey(key);
        setPage('studio');
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setPage={setPage} selectExhibit={selectExhibit} />;
            case 'exhibits':
                return <ExhibitsPage setPage={setPage} selectExhibit={selectExhibit} />;
            case 'studio':
                return <StudioPage exhibitKey={activeExhibitKey} />;
            default:
                return <HomePage setPage={setPage} selectExhibit={selectExhibit} />;
        }
    };

    return (
        <div className="min-h-screen bg-museum-bg text-museum-text dark:bg-dm-bg dark:text-dm-text-primary p-4 sm:p-6 lg:p-12 transition-colors duration-300">
            <Header setPage={setPage} theme={theme} setTheme={setTheme} />
            <main>
                {renderPage()}
            </main>
        </div>
    );
};


// Fix: Use createRoot API for React 18, which fixes error on `ReactDOM.render`.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);