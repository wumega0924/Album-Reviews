const albums = [
  {
    title: "Rumors",
    artist: "Fleetwood Mac",
    genre: "rock",
    releaseDate: 1977,
    imgUrl: "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG",
  },
  {
    title: "ANTI",
    artist: "Rihanna",
    genre: "hip-hop",
    releaseDate: 2016,
    imgUrl: "https://upload.wikimedia.org/wikipedia/en/3/32/Rihanna_-_Anti.png",
  },
  {
    title: "ROADRUNNER: NEW LIGHT, NEW MACHINE",
    artist: "BROCKHAMPTON",
    genre: "rap",
    releaseDate: 2021,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/73/Roadrunner_New_Light_New_Machine_album_cover.jpg",
  },
  {
    title: "The Best Of... Tom Jones",
    artist: "Tom Jones",
    genre: "soul",
    releaseDate: 1997,
    imgUrl:
      "https://m.media-amazon.com/images/I/71PE7DnbMXL._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Sunburn",
    artist: "Dominic Fike",
    genre: "pop",
    releaseDate: 2023,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/ac/Dominic_Fike_-_Sunburn.png",
  },
  {
    title: "...Baby One More Time",
    artist: "Britney Spears",
    genre: "pop",
    releaseDate: 1999,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/9a/..._Baby_One_More_Time_%28album%29.png",
  },
  {
    title: "Brothers",
    artist: "The Black Keys",
    genre: "rock",
    releaseDate: 2010,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/93/The_Black_Keys_-_Brothers.jpg",
  },
  {
    title: "Unreal Unearth",
    artist: "Hozier",
    genre: "indie",
    releaseDate: 2023,
    imgUrl:
      "https://media.pitchfork.com/photos/64d5006d5185b039bca7d7bf/master/pass/Hozier-%20Unreal%20Unearth.jpeg",
  },
  {
    title: "A Different Kind of Fix",
    artist: "Bombay Bicycle Club",
    genre: "indie",
    releaseDate: 2011,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Bombay_bicycyle_club_a_different_kind_of_fix.jpg",
  },
  {
    title: "Zaba",
    artist: "Glass Animals",
    genre: "indie",
    releaseDate: 2014,
    imgUrl:
      "https://m.media-amazon.com/images/I/81v7i2aTxUL._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Abbey Road ",
    artist: "The Beatles",
    genre: "rock",
    releaseDate: 1969,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
  },
  {
    title: "For All The Dogs",
    artist: "Drake",
    genre: "Hip-Hop",
    releaseDate: 2023,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/05/Drake_-_For_All_The_Dogs.png",
  },
  {
    title: "Atlanta Millionaires Club",
    artist: "Faye Webster",
    genre: "Alternative Folk",
    releaseDate: 2019,
    imgUrl:
      "https://m.media-amazon.com/images/I/91i+xejFoTL._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Larger Than Life",
    artist: "Brent Faiyaz",
    genre: "R&B",
    releaseDate: 2023,
    imgUrl:
      "https://media.pitchfork.com/photos/653fb08324d1d3cbadd38916/master/pass/Brent%20Faiyaz%20-%20Larger%20Than%20Life.png",
  },
  {
    title: "Ego Death",
    artist: "The Internet",
    genre: "R&B",
    releaseDate: 2015,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/The_Internet_-_Ego_Death.png",
  },
  {
    title: "Journals",
    artist: "Justin Beiber",
    genre: "Pop",
    releaseDate: 2013,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/cc/Justin_Bieber_Journals.png",
  },
  {
    title: "Flower Boy",
    artist: "Tyler the Creator",
    genre: "hip hop",
    releaseDate: 2017,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c3/Tyler%2C_the_Creator_-_Flower_Boy.png",
  },
  {
    title: "Luv Is Rage 2",
    artist: "Lil Uzi Vert",
    genre: "hip hop",
    releaseDate: 2017,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/65/Luv_Is_Rage_2_cover.jpg",
  },
  {
    title: "Bad Vibes Forever",
    artist: "XXXTentacion",
    genre: "hip hop",
    releaseDate: 2019,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Bad_vibes_forever_xxxtentacion.jpg",
  },
  {
    title: "Swimming",
    artist: "Mac Miller",
    genre: "hip hop",
    releaseDate: 2018,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/5e/Mac_Miller_-_Swimming.png",
  },
  {
    title: "Nectar",
    artist: "Joji",
    genre: "r&b",
    releaseDate: 2020,
    imgUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png",
  },
  {
    title: "Born This Way",
    artist: "Lady Gaga",
    genre: "pop",
    releaseDate: 2011,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c3/Born_This_Way_album_cover.png",
  },
  {
    title: "Utopia",
    artist: "Travis Scott",
    genre: "Hip-hop/Rap",
    releaseDate: 2023,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/23/Travis_Scott_-_Utopia.png",
  },
  {
    title: "Dawn FM",
    artist: "The Weeknd",
    genre: "Pop",
    releaseDate: 2022,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/b9/The_Weeknd_-_Dawn_FM.png",
  },
  {
    title: "The Beatles (White Album)",
    artist: "The Beatles",
    genre: "Rock",
    releaseDate: 1968,
    imgUrl:
      "https://media.pitchfork.com/photos/5929a5ef5e6ef95969320bfd/master/pass/9955e3fd.jpg",
  },
  {
    title: "Lemonade",
    artist: "Beyoncé",
    genre: "R & B",
    releaseDate: 2016,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png",
  },
];

module.exports = { albums };
