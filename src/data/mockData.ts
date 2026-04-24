// Pexels image URLs - fetched via Pexels MCP

// Profile photos (women)
const pexels_url_1 = 'https://images.pexels.com/photos/7437171/pexels-photo-7437171.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'   // Isabelle main
const pexels_url_3 = 'https://images.pexels.com/photos/2529560/pexels-photo-2529560.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'   // Clara main
const pexels_url_5 = 'https://images.pexels.com/photos/2471137/pexels-photo-2471137.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'   // Sophie main
const pexels_url_w1 = 'https://images.pexels.com/photos/7485047/pexels-photo-7485047.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' // Mia main
const pexels_url_w2 = 'https://images.pexels.com/photos/7510935/pexels-photo-7510935.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' // Nadia main
const pexels_url_w3 = 'https://images.pexels.com/photos/2520446/pexels-photo-2520446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' // extra women portrait

// Gallery extras (women only)
const pexels_url_6  = 'https://images.pexels.com/photos/6409229/pexels-photo-6409229.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'  // woman hiking
const pexels_url_8  = 'https://images.pexels.com/photos/4219910/pexels-photo-4219910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'  // woman reading cafe
const pexels_url_10 = 'https://images.pexels.com/photos/36084709/pexels-photo-36084709.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' // woman city fashion

// Venue photos
const pexels_url_11 = 'https://images.pexels.com/photos/2291594/pexels-photo-2291594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
const pexels_url_12 = 'https://images.pexels.com/photos/3393152/pexels-photo-3393152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
const pexels_url_13 = 'https://images.pexels.com/photos/36129310/pexels-photo-36129310.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
const pexels_url_14 = 'https://images.pexels.com/photos/6409229/pexels-photo-6409229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'

// Flower photo for Isabelle's message
export const pexelsFlowers = 'https://images.pexels.com/photos/4928652/pexels-photo-4928652.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'

// Alex (current user) photos — male
export const alexPhotos = [
  'https://images.pexels.com/photos/6200777/pexels-photo-6200777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  'https://images.pexels.com/photos/36044001/pexels-photo-36044001.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  'https://images.pexels.com/photos/3924688/pexels-photo-3924688.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
]

// Onboarding background
export const pexelsBg = 'https://images.pexels.com/photos/279380/pexels-photo-279380.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'

export const currentUser = {
  name: 'Alex',
  age: 28,
  city: 'London',
  credits: 42,
  plan: 'free',
}

export interface Profile {
  id: string
  name: string
  age: number
  city: string
  photos: string[]
  bio: string
  compatibility: number
  dimensions: {
    values: number
    personality: number
    lifestyle: number
    emotional: number
    attachment: number
    social: number
    intent: number
    aesthetic: number
  }
  traits: string[]
  coachNote: string
}

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Isabelle',
    age: 29,
    city: 'London',
    photos: [pexels_url_1, pexels_url_6, pexels_url_8],
    bio: 'Architect. Weekend hiker. Here because I am serious about finding something real.',
    compatibility: 94,
    dimensions: {
      values: 96, personality: 91, lifestyle: 88,
      emotional: 95, attachment: 92, social: 87, intent: 98, aesthetic: 82,
    },
    traits: ['Values-aligned', 'Adventurous', 'Emotionally available'],
    coachNote:
      'Isabelle shares your position on family and scores highly on emotional availability. Seven of your eight compatibility dimensions are in strong alignment.',
  },
  {
    id: '2',
    name: 'Clara',
    age: 31,
    city: 'London',
    photos: [pexels_url_3, pexels_url_10],
    bio: 'Works in sustainable fashion. Reads too much. Would rather be in the mountains.',
    compatibility: 89,
    dimensions: {
      values: 94, personality: 86, lifestyle: 84,
      emotional: 90, attachment: 88, social: 82, intent: 95, aesthetic: 78,
    },
    traits: ['Intentional', 'Creative', 'Outdoors person'],
    coachNote:
      'Clara leads with values in the same way you do. Her attachment style is secure, which matches well with your profile.',
  },
  {
    id: '3',
    name: 'Sophie',
    age: 27,
    city: 'London',
    photos: [pexels_url_5, pexels_url_w3],
    bio: 'Product designer. Runs half marathons reluctantly. Good at dinner recommendations.',
    compatibility: 86,
    dimensions: {
      values: 88, personality: 90, lifestyle: 82,
      emotional: 84, attachment: 86, social: 92, intent: 80, aesthetic: 90,
    },
    traits: ['Analytical', 'Active', 'Socially confident'],
    coachNote:
      'Sophie scores highly on personality alignment with you. Her social energy balances well with your profile.',
  },
  {
    id: '4',
    name: 'Mia',
    age: 30,
    city: 'London',
    photos: [pexels_url_w1, pexels_url_8],
    bio: 'Clinical researcher. Loves jazz and slow mornings. Looking for something intentional.',
    compatibility: 83,
    dimensions: {
      values: 85, personality: 88, lifestyle: 80,
      emotional: 86, attachment: 84, social: 78, intent: 90, aesthetic: 82,
    },
    traits: ['Thoughtful', 'Calm', 'Deep thinker'],
    coachNote:
      'Mia values depth over pace — she tends to form strong connections slowly. That aligns well with your stated approach.',
  },
  {
    id: '5',
    name: 'Nadia',
    age: 26,
    city: 'London',
    photos: [pexels_url_w2, pexels_url_6],
    bio: 'Journalist. Curious about most things. Not great at small talk, very good at real conversation.',
    compatibility: 81,
    dimensions: {
      values: 82, personality: 85, lifestyle: 78,
      emotional: 83, attachment: 80, social: 86, intent: 84, aesthetic: 76,
    },
    traits: ['Curious', 'Direct', 'Independent'],
    coachNote:
      'Nadia is straightforward about what she wants, which you tend to respond well to. The curiosity dimension here is particularly high.',
  },
]

export type MessageFrom = 'them' | 'user' | 'cupid'

export interface Message {
  from: MessageFrom
  text: string
  time: string
  photo?: string
}

export interface ChatThread {
  matchId: string
  matchName: string
  matchPhoto: string
  lastMessage: string
  lastTime: string
  unread: boolean
  coachSuggestion: string
  messages: Message[]
}

export const chatThreads: ChatThread[] = [
  {
    matchId: '1',
    matchName: 'Isabelle',
    matchPhoto: pexels_url_1,
    lastMessage: 'Saturday works perfectly.',
    lastTime: 'Today',
    unread: true,
    coachSuggestion:
      'You both mentioned weekend hikes during onboarding. That might be a natural opening.',
    messages: [
      { from: 'them', text: "Hey — good to finally match with someone who actually has a bio.", time: 'Yesterday, 7:42 PM' },
      { from: 'user', text: "Ha, I figured it was worth the effort. How has Coupld been for you so far?", time: 'Yesterday, 8:01 PM' },
      { from: 'them', text: "Honestly better than I expected. The matches are more considered. I am actually talking to people.", time: 'Yesterday, 8:15 PM' },
      { from: 'user', text: "Agreed. Do you actually hike or is that just in the profile?", time: 'Yesterday, 8:22 PM' },
      { from: 'them', text: "Every weekend if I can. You?", time: 'Yesterday, 8:30 PM' },
      { from: 'user', text: "Same. Box Hill, Leith Hill mostly. Sometimes further out.", time: 'Yesterday, 8:45 PM' },
      { from: 'them', text: "I did Box Hill last month. The views on the way down are worth it.", time: 'Yesterday, 9:02 PM' },
      { from: 'user', text: "Exactly — most people turn back at the summit. The descent is the good part.", time: 'Yesterday, 9:18 PM' },
      { from: 'them', text: "Ha. Yes. I appreciate someone who knows that.", time: 'Yesterday, 9:24 PM' },
      {
        from: 'cupid',
        text: "Good momentum. Isabelle has been highly engaged — this is one of your strongest matches. A thoughtful gesture at this stage tends to deepen connections. I can arrange a curated wildflower bouquet through our partner service. Want me to set it up?",
        time: 'Yesterday, 9:28 PM',
      },
      { from: 'user', text: "Yes, do it.", time: 'Yesterday, 9:31 PM' },
      {
        from: 'cupid',
        text: "Done. A wildflower bouquet from Bloom & Wild is arranged for delivery tomorrow morning, 9–11 AM. I have added a short handwritten note: \"Thought you might like these — A.\" No further action needed.",
        time: 'Yesterday, 9:32 PM',
      },
      { from: 'them', text: "Alex. I just opened my door and found these.", time: 'Today, 9:47 AM', photo: pexelsFlowers },
      { from: 'them', text: "This is actually the loveliest thing someone has done in a long time. Thank you.", time: 'Today, 9:48 AM' },
      { from: 'user', text: "I had a little inside help. Glad they arrived well.", time: 'Today, 10:02 AM' },
      { from: 'them', text: "Ha — I love that you used the service. Makes it even better somehow.", time: 'Today, 10:08 AM' },
      { from: 'user', text: "I figured a good recommendation is a good recommendation.", time: 'Today, 10:15 AM' },
      {
        from: 'cupid',
        text: "She is clearly delighted and the connection is strong. This is a good moment to suggest meeting in person. Based on her profile, weekend evenings work well. I have shortlisted Brat in Shoreditch — it matches both your taste profiles. Want me to check availability?",
        time: 'Today, 10:19 AM',
      },
      { from: 'user', text: "Yes — and Isabelle, would you want to get dinner this weekend?", time: 'Today, 10:22 AM' },
      { from: 'them', text: "I would really like that. Saturday?", time: 'Today, 10:26 AM' },
      { from: 'user', text: "Saturday works perfectly.", time: 'Today, 10:29 AM' },
    ],
  },
  {
    matchId: '2',
    matchName: 'Clara',
    matchPhoto: pexels_url_3,
    lastMessage: 'Let me know what you think',
    lastTime: '1d ago',
    unread: false,
    coachSuggestion:
      'Clara has not replied in 24 hours. A short follow-up tends to do better than silence.',
    messages: [
      { from: 'user', text: "Hey Clara — the sustainable fashion angle is genuinely interesting. What does that look like day to day?", time: '2 days ago' },
      { from: 'them', text: "It is more logistics than it sounds. But I love it. Let me know what you think", time: 'Yesterday' },
    ],
  },
  {
    matchId: '3',
    matchName: 'Sophie',
    matchPhoto: pexels_url_5,
    lastMessage: 'New match — say something',
    lastTime: 'Just now',
    unread: true,
    coachSuggestion:
      'Sophie is a product designer — you both work in tech-adjacent fields. That is a decent natural opening.',
    messages: [],
  },
]

// Cupid's standalone conversation history (for the coach tab)
export const cupidHistory: Message[] = [
  { from: 'cupid', text: "Welcome to Coupld, Alex. I have reviewed your profile and your onboarding answers. You are a strong candidate for a serious match — your values clarity is in the top 15% of users on this platform.", time: '3 days ago' },
  { from: 'user', text: "Good to know. Who should I focus on?", time: '3 days ago' },
  { from: 'cupid', text: "Isabelle is your strongest match at 94%. Seven of eight compatibility dimensions are in alignment — the only divergence is aesthetic, and that is low-stakes. I would start there.", time: '3 days ago' },
  { from: 'user', text: "Done. We matched and started talking.", time: '2 days ago' },
  { from: 'cupid', text: "Good. The early conversation is strong. She is responsive, warm, and asking questions — all positive signals. Keep the tone natural. Avoid over-explaining yourself.", time: '2 days ago' },
  { from: 'cupid', text: "One thing I noticed — she mentioned hiking in her very first message. You both have this in common. It came up naturally, which is the best way. That thread is worth continuing.", time: '2 days ago' },
  { from: 'user', text: "We talked about Box Hill for a while. It went well.", time: '2 days ago' },
  { from: 'cupid', text: "I know. I suggested the flower arrangement at that point — the connection had reached a natural inflection. The gesture landed exactly as intended. She responded within 20 minutes with the photo.", time: 'Yesterday' },
  { from: 'user', text: "That was a good call.", time: 'Yesterday' },
  { from: 'cupid', text: "It usually is at that stage. The next move was to convert the digital connection into something real. I identified Brat as the right venue — her food preferences, your postcode, and a Saturday availability window all aligned. The booking is confirmed.", time: 'Today' },
  { from: 'cupid', text: "You have a date on Saturday. Between now and then — no need to over-message. Keep it light. One or two exchanges at most. Let Saturday carry the weight.", time: 'Today' },
  { from: 'user', text: "Got it. Thanks.", time: 'Today' },
  { from: 'cupid', text: "One more thing. After the date, come back and tell me how it went. The feedback shapes what comes next — whether that is a second date, a different direction, or something more significant.", time: 'Today' },
]

export const venues = [
  { name: 'Brat, Shoreditch', type: 'Restaurant', photo: pexels_url_11 },
  { name: 'Sky Garden', type: 'Bar', photo: pexels_url_12 },
  { name: 'Humble Grape', type: 'Wine Bar', photo: pexels_url_13 },
  { name: 'Hampstead Heath', type: 'Outdoor', photo: pexels_url_14 },
]

export const badges = [
  { id: 'chat', icon: 'MessageCircle', label: 'First Conversation', description: 'You sent your first message.', unlocked: true },
  { id: 'match', icon: 'Star', label: 'First Match', description: 'You accessed your first match.', unlocked: true },
  { id: 'date', icon: 'CalendarCheck', label: 'First Date', description: 'You went on your first date.', unlocked: true },
  { id: 'review', icon: 'ClipboardCheck', label: 'First Review', description: 'You gave your first date feedback.', unlocked: true },
  { id: 'platinum', icon: 'Crown', label: 'Platinum Member', description: 'Upgrade to Platinum to unlock.', unlocked: false },
  { id: 'theone', icon: 'Heart', label: 'The One', description: 'Declare an exclusive relationship.', unlocked: false },
  { id: 'engaged', icon: 'Gem', label: 'Engaged', description: 'Report an engagement milestone.', unlocked: false },
  { id: 'married', icon: 'Stars', label: 'Married', description: 'Report a marriage milestone.', unlocked: false },
]

export const onboardingPhotos = [pexels_url_1, pexels_url_3, pexels_url_5]
