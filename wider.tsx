import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Sparkles, Search, BookMarked, Map as MapIcon, CalendarClock, X, Check,
  Bookmark, RefreshCw, ChevronRight, ChevronLeft, Shuffle, ArrowLeft,
  Clock, Users, Compass, Star, Sun, Wind, Send, Plus, Minus
} from 'lucide-react';

/* =====================================================================
   WIDER — a life-expansion app
   "Build a wide life. Learn to love a quiet day."
   ===================================================================== */

/* ----------------------------- CATEGORIES ----------------------------- */

const CATEGORIES = [
  { id: 'ordinary', label: 'Ordinary Life', accent: '#4C6580', short: 'A normal day, well lived.' },
  { id: 'adventure', label: 'Adventure & Novelty', accent: '#A8623D', short: 'Firsts and small risks.' },
  { id: 'movement', label: 'Physical Health & Movement', accent: '#6E7F5C', short: 'Your body, in motion.' },
  { id: 'nature', label: 'Nature & Outdoors', accent: '#5C7A52', short: 'Sky, sand, water, weather.' },
  { id: 'mind', label: 'Learning & Curiosity', accent: '#6A5A8C', short: 'A mind kept hungry.' },
  { id: 'create', label: 'Creativity & Making', accent: '#B8863B', short: 'Things made with your hands.' },
  { id: 'work', label: 'Career & Growth', accent: '#3E5C6E', short: 'The professional self.' },
  { id: 'money', label: 'Financial Capability', accent: '#7A6A4E', short: 'Confidence with money.' },
  { id: 'friends', label: 'Friendship', accent: '#C97B63', short: 'The people you choose.' },
  { id: 'family', label: 'Family & Community', accent: '#8C6A4E', short: 'Where you belong.' },
  { id: 'love', label: 'Emotional Connection', accent: '#B15C5C', short: 'Closeness, not just romance.' },
  { id: 'spirit', label: 'Spirituality & Reflection', accent: '#5A6E8C', short: 'The quiet, inner life.' },
  { id: 'service', label: 'Service & Contribution', accent: '#5C8C6E', short: 'A life that gives back.' },
  { id: 'culture', label: 'Culture, Arts & History', accent: '#8C5A6E', short: 'Other minds, other eras.' },
  { id: 'travel', label: 'Travel & Exploration', accent: '#3E7A7A', short: 'Elsewhere, on purpose.' },
  { id: 'senses', label: 'Food & Sensory', accent: '#C9A227', short: 'Taste, texture, smell.' },
  { id: 'courage', label: 'Confidence & Courage', accent: '#A8623D', short: 'Doing it scared.' },
  { id: 'solo', label: 'Independence & Solitude', accent: '#5B5A52', short: 'Good company with yourself.' },
  { id: 'play', label: 'Play & Fun', accent: '#C9A227', short: 'No purpose required.' },
  { id: 'home', label: 'Home & Beauty', accent: '#8C7A5E', short: 'The life you come back to.' },
  { id: 'rest', label: 'Rest & Recovery', accent: '#4C6580', short: 'Permission to stop.' },
];
const CAT = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

/* ----------------------------- ACTIVITIES ------------------------------
   Schema per activity (defaults in D, overridden per item):
   t, d, cat, sec[], dur, cost, energy, social, setting, prep, spont,
   phys, emo, nov, courage, aloneOk, night, workday, weekend, booking,
   travel, weather, mood[], first, mode
   dur: 15min | 1hr | evening | day | weekend | weeks | major
   cost: free | low | moderate | high
   energy: verylow | low | normal | high
   social: alone | one | friends | family | strangers | group
   setting: indoor | outdoor | both
   mode: ordinary | expansion | challenge | big
------------------------------------------------------------------------ */

let _id = 1;
const D = {
  cost: 'low', energy: 'normal', social: 'alone', setting: 'both',
  prep: 'none', spont: 'med', phys: 1, emo: 1, nov: 1, courage: 0,
  aloneOk: true, night: true, workday: true, weekend: true,
  booking: false, travel: false, weather: false, first: false,
};
function A(o) { return { ...D, ...o, id: _id++ }; }

const ACTIVITIES = [

/* ---------- ORDINARY LIFE ---------- */
A({ t:'The unhurried coffee', d:'Make coffee the slow way — grind the beans by hand if you can, sit somewhere with light, and do not open your phone until the cup is empty.', cat:'ordinary', sec:['rest'], dur:'15min', cost:'free', mood:['peaceful','ordinary'], mode:'ordinary' }),
A({ t:'Walk without headphones', d:'Take a 20-minute walk near home with no music, no podcast, no calls. Notice five sounds you would normally tune out.', cat:'ordinary', sec:['rest','nature'], dur:'15min', cost:'free', social:'alone', setting:'outdoor', mood:['peaceful','ordinary'], mode:'ordinary' }),
A({ t:'Cook the meal properly', d:'Pick a dish you usually rush and give it the full version tonight — the stock instead of the cube, the fresh herb instead of dried. Eat it off a real plate at a table, not a screen.', cat:'ordinary', sec:['senses','home'], dur:'evening', cost:'low', mood:['peaceful','ordinary'], mode:'ordinary' }),
A({ t:'One drawer, done properly', d:'Choose one drawer or shelf that has been quietly bothering you. Empty it, wipe it, and put back only what belongs. Notice how good it feels to open it tomorrow.', cat:'ordinary', sec:['home'], dur:'1hr', cost:'free', mood:['productive','ordinary'], mode:'ordinary' }),
A({ t:'Write three lines before sleep', d:'Keep a notebook by the bed. Tonight, write three honest lines about the day — not a summary, just what actually stayed with you.', cat:'ordinary', sec:['spirit'], dur:'15min', cost:'free', mood:['peaceful','ordinary'], mode:'ordinary', night:true }),
A({ t:'Set the evening on purpose', d:'Before it starts, decide what tonight is for — reading, a call, silence — and let the rest of the evening arrange itself around that one thing instead of drifting.', cat:'ordinary', sec:['rest'], dur:'evening', cost:'free', mood:['peaceful','ordinary'], mode:'ordinary' }),
A({ t:'Read somewhere that isn\u2019t your bed', d:'Take a book to a balcony, a café, or a bench you\u2019ve never sat on, and read there for 40 minutes with your phone face-down.', cat:'ordinary', sec:['mind','rest'], dur:'1hr', cost:'free', setting:'outdoor', mood:['peaceful','ordinary'], mode:'ordinary' }),
A({ t:'Call someone with no agenda', d:'Phone someone you like but rarely call, and open with "no reason, just wanted to hear your voice." Let the conversation go wherever it wants for 15 minutes.', cat:'ordinary', sec:['friends','love'], dur:'15min', cost:'free', social:'one', mood:['peaceful','ordinary'], mode:'ordinary' }),
A({ t:'The five senses check', d:'Stop wherever you are. Name one thing you can see, hear, smell, feel and taste right now. Takes ninety seconds, resets the whole day.', cat:'ordinary', sec:['spirit','rest'], dur:'15min', cost:'free', mood:['peaceful','ordinary'], mode:'ordinary' }),

/* ---------- ADVENTURE & NOVELTY ---------- */
A({ t:'The neighbourhood you drive through but never enter', d:'Pick a neighbourhood you pass on your commute but have never actually walked through. Spend 90 minutes on foot there and photograph ten details you\u2019d normally miss.', cat:'adventure', sec:['travel','create'], dur:'evening', cost:'free', social:'alone', setting:'outdoor', mood:['adventurous','new'], first:true, mode:'expansion' }),
A({ t:'Order the dish you can\u2019t pronounce', d:'At your next meal out, order the item on the menu you don\u2019t recognise, without asking the waiter what it is first. Let it be a surprise.', cat:'adventure', sec:['senses'], dur:'1hr', cost:'low', social:'one', mood:['adventurous','new'], first:true, mode:'expansion' }),
A({ t:'Take the bus with no destination', d:'Board a public bus you\u2019ve never taken, ride it to the last stop, and find your own way home from there.', cat:'adventure', sec:['travel','courage'], dur:'evening', cost:'low', social:'alone', setting:'outdoor', mood:['adventurous','new'], courage:2, nov:3, first:true, mode:'expansion' }),
A({ t:'A stranger\u2019s recommendation', d:'Ask a shopkeeper, barista, or cab driver "what\u2019s something in this city most people never bother with?" — then go and do it within the week.', cat:'adventure', sec:['travel'], dur:'evening', cost:'low', social:'alone', mood:['adventurous','surprise'], nov:3, first:true, mode:'expansion' }),
A({ t:'Sunrise somewhere you\u2019ve never seen it', d:'Set an alarm before dawn and watch the sunrise from a rooftop, beach, or dune you\u2019ve never been to at that hour.', cat:'adventure', sec:['nature'], dur:'1hr', cost:'free', setting:'outdoor', mood:['adventurous','alive'], nov:2, weather:true, mode:'expansion' }),
A({ t:'The wrong-turn walk', d:'Go for a walk and deliberately take every second turn without planning the route. Use a map only to find your way back.', cat:'adventure', sec:['travel'], dur:'1hr', cost:'free', setting:'outdoor', mood:['adventurous','surprise'], nov:2, mode:'expansion' }),
A({ t:'Sit at the counter, not the table', d:'Eat alone at a restaurant\u2019s counter or bar seating, where you can watch the food being made, and talk to whoever is next to you.', cat:'adventure', sec:['solo','senses'], dur:'1hr', cost:'moderate', social:'strangers', mood:['adventurous','solo'], courage:1, first:true, mode:'expansion' }),
A({ t:'A festival or fair for a culture that isn\u2019t yours', d:'Attend a cultural, religious or community festival that isn\u2019t part of your own background, as a respectful guest. Ask someone there to explain one tradition to you.', cat:'adventure', sec:['culture'], dur:'evening', cost:'low', social:'strangers', mood:['adventurous','new'], nov:3, first:true, mode:'expansion' }),
A({ t:'Learn the taxi driver\u2019s story', d:'On your next long ride, ask the driver one real question — where they\u2019re from, what they miss — and actually listen to the whole answer.', cat:'adventure', sec:['culture','love'], dur:'15min', cost:'free', social:'strangers', mood:['new','social'], mode:'expansion' }),

/* ---------- PHYSICAL HEALTH & MOVEMENT ---------- */
A({ t:'Move until the mind goes quiet', d:'Do 25 minutes of movement — fast walking, a home workout, a dance video — with the specific aim of feeling your mind empty out, not of burning calories.', cat:'movement', sec:['rest'], dur:'1hr', cost:'free', phys:2, mood:['productive'], mode:'ordinary' }),
A({ t:'The stairs, deliberately', d:'Find the tallest staircase near you and climb it end to end, twice, at a pace that surprises you.', cat:'movement', sec:['courage'], dur:'15min', cost:'free', phys:2, mood:['productive','alive'], mode:'ordinary' }),
A({ t:'Try a sport you\u2019ve only watched', d:'Book a single trial session of a sport you\u2019ve only ever watched on a screen — padel, boxing, climbing, sailing — with zero pressure to continue.', cat:'movement', sec:['adventure','courage'], dur:'evening', cost:'moderate', social:'one', phys:2, nov:3, courage:2, booking:true, first:true, mode:'expansion' }),
A({ t:'A moving meditation', d:'Walk for 30 minutes at a pace slower than feels natural, matching your breath to your steps, saying nothing, checking nothing.', cat:'movement', sec:['spirit','rest'], dur:'1hr', cost:'free', setting:'outdoor', phys:1, mood:['peaceful'], mode:'ordinary' }),
A({ t:'Swim until you stop thinking', d:'Swim continuous laps until your inner monologue quiets — usually somewhere past the tenth lap. No phone at the poolside.', cat:'movement', sec:['rest','nature'], dur:'1hr', cost:'low', phys:2, mood:['peaceful','productive'], mode:'ordinary' }),
A({ t:'A hike with a real climb in it', d:'Choose a trail with genuine elevation, not a flat walk — Hatta, Jebel Jais, or a local equivalent — and go slow enough to actually look around.', cat:'movement', sec:['nature','courage'], dur:'day', cost:'moderate', social:'one', phys:3, travel:true, weather:true, mood:['alive','adventurous'], mode:'expansion' }),
A({ t:'Sign up for the event, not just the training', d:'Register for a 5K, an obstacle race, or a charity walk that\u2019s at least six weeks out, and build a simple plan to be ready for it.', cat:'movement', sec:['courage'], dur:'weeks', cost:'moderate', phys:2, courage:1, booking:true, nov:2, mode:'challenge' }),
A({ t:'A full day on your body\u2019s terms', d:'Spend a whole day genuinely off — no workouts, no step goals — doing only what your body seems to actually want: stretching, sleeping, walking slowly, lying in the sun.', cat:'movement', sec:['rest'], dur:'day', cost:'free', mood:['peaceful'], mode:'ordinary' }),
A({ t:'Learn to fall correctly', d:'Take one lesson in something with a real technical skill for balance and falling — martial arts, skating, or gymnastics basics — built for adults starting from zero.', cat:'movement', sec:['courage','mind'], dur:'evening', cost:'moderate', phys:2, courage:1, booking:true, nov:2, first:true, mode:'expansion' }),

/* ---------- NATURE & OUTDOORS ---------- */
A({ t:'Twenty minutes with no shade', d:'Sit outside for 20 minutes with nothing to do — no phone, no book — and just track what the light and air are doing.', cat:'nature', sec:['spirit','rest'], dur:'15min', cost:'free', setting:'outdoor', weather:true, mood:['peaceful'], mode:'ordinary' }),
A({ t:'Watch something grow', d:'Buy or start one plant you\u2019re fully responsible for. Check on it the same time each week and notice the change you\u2019d otherwise miss.', cat:'nature', sec:['home'], dur:'15min', cost:'low', mood:['peaceful','productive'], mode:'ordinary' }),
A({ t:'The desert at the hour nobody goes', d:'Drive to the edge of the desert either right after sunrise or just before sunset, when the heat and the crowds are both gone, and just sit with it for an hour.', cat:'nature', sec:['solo','adventure'], dur:'evening', cost:'low', social:'alone', setting:'outdoor', travel:true, weather:true, mood:['peaceful','alive'], nov:1, mode:'expansion' }),
A({ t:'Sleep somewhere with a real sky', d:'Spend one night camping or glamping far enough from the city to see stars properly. Leave time to just lie back and look.', cat:'nature', sec:['adventure','rest'], dur:'weekend', cost:'moderate', social:'one', setting:'outdoor', travel:true, booking:true, weather:true, nov:2, first:true, mode:'expansion' }),
A({ t:'Learn five birds or five plants', d:'Pick five birds or plants common in your area and actually learn to recognise them by sight this month — not just their names, their shapes.', cat:'nature', sec:['mind'], dur:'weeks', cost:'free', mood:['productive'], mode:'expansion' }),
A({ t:'A body of water you\u2019ve never touched', d:'Find a beach, wadi, lagoon or lake near you that you\u2019ve genuinely never been to, and get in the water — even briefly.', cat:'nature', sec:['adventure'], dur:'day', cost:'low', travel:true, weather:true, nov:2, first:true, mode:'expansion' }),
A({ t:'Watch weather happen', d:'When a storm, unusual wind, or heavy fog rolls in, stop what you\u2019re doing and go watch it properly from somewhere safe, instead of waiting it out indoors.', cat:'nature', sec:['adventure'], dur:'15min', cost:'free', setting:'outdoor', weather:true, mood:['alive','surprise'], mode:'ordinary' }),
A({ t:'A full moonrise, start to finish', d:'Check the moonrise time and be somewhere with a clear horizon to watch the entire thing come up, uninterrupted.', cat:'nature', sec:['spirit'], dur:'1hr', cost:'free', setting:'outdoor', weather:true, mood:['peaceful'], mode:'ordinary' }),
A({ t:'Grow something you can eat', d:'Plant one herb or vegetable from seed and cook a single meal with it once it\u2019s ready, however small the harvest.', cat:'nature', sec:['senses','home'], dur:'weeks', cost:'low', mood:['productive'], mode:'expansion' }),

/* ---------- LEARNING & CURIOSITY ---------- */
A({ t:'Explain it to someone who knows nothing', d:'Pick something you already understand well from your work, and explain it out loud, in plain words, to someone with zero background in it. Notice where you get stuck.', cat:'mind', sec:['work'], dur:'1hr', cost:'free', social:'one', mood:['productive'], mode:'ordinary' }),
A({ t:'One documentary, fully present', d:'Watch a documentary on a subject you know nothing about, with your phone in another room, and write down three things you learned afterward.', cat:'mind', sec:['culture'], dur:'evening', cost:'free', mood:['productive'], mode:'ordinary' }),
A({ t:'Sit in on a lecture that isn\u2019t for you', d:'Find a public lecture, talk, or open university session on a topic completely outside your field, and attend it as a guest with no obligation to understand everything.', cat:'mind', sec:['culture','courage'], dur:'evening', cost:'free', social:'strangers', nov:2, first:true, mode:'expansion' }),
A({ t:'Learn one real phrase in a new language', d:'Learn to say one full, useful sentence — not just "hello" — in a language spoken by someone you know, and actually say it to them.', cat:'mind', sec:['culture','courage'], dur:'15min', cost:'free', courage:1, mood:['new'], mode:'ordinary' }),
A({ t:'Read the footnotes for once', d:'Pick a serious book you\u2019ve been avoiding because it looks dense, and commit to just the first 30 pages, footnotes included, this week.', cat:'mind', sec:['culture'], dur:'weeks', cost:'low', mood:['productive'], mode:'expansion' }),
A({ t:'Take an online course to completion', d:'Choose a short online course in something you\u2019re genuinely curious about — not career-related — and finish it end to end, not just the first module.', cat:'mind', sec:['create'], dur:'weeks', cost:'low', mood:['productive'], mode:'expansion' }),
A({ t:'Learn how something you use daily actually works', d:'Pick one object you use every day without thinking — an engine, a payment system, a fridge — and spend an hour genuinely learning how it works.', cat:'mind', sec:['work'], dur:'1hr', cost:'free', mood:['productive'], mode:'ordinary' }),
A({ t:'A museum with an audio guide, slowly', d:'Visit a museum or gallery and use the audio guide properly, stopping at every marked piece, resisting the urge to speed through.', cat:'mind', sec:['culture'], dur:'evening', cost:'low', mood:['peaceful','productive'], booking:false, mode:'expansion' }),

/* ---------- CREATIVITY & MAKING ---------- */
A({ t:'Make something with your hands tonight', d:'Choose a small physical project — a sketch, a fixed hem, a shelf, a batch of dough — that you can start and finish in one sitting.', cat:'create', sec:['ordinary'], dur:'evening', cost:'low', phys:1, mood:['productive'], mode:'ordinary' }),
A({ t:'Write the letter you\u2019ll never send', d:'Write a full, honest letter to someone — living or not — saying what you\u2019ve never said. You never have to send it.', cat:'create', sec:['spirit','love'], dur:'1hr', cost:'free', mood:['peaceful'], emo:2, mode:'ordinary' }),
A({ t:'A one-day photo project', d:'Give yourself one theme — shadows, red things, strangers\u2019 hands — and photograph it exclusively for a full day wherever you go.', cat:'create', sec:['adventure'], dur:'day', cost:'free', mood:['new'], nov:1, mode:'expansion' }),
A({ t:'Cook one dish entirely from scratch', d:'Pick a dish that usually comes from a packet or a jar — pasta, bread, hummus — and make every component of it yourself, no shortcuts, for once.', cat:'create', sec:['senses'], dur:'evening', cost:'low', mood:['productive'], mode:'expansion' }),
A({ t:'Take one beginner class in a craft', d:'Book a single beginner session in pottery, woodworking, calligraphy, or another hands-on craft you\u2019ve never tried.', cat:'create', sec:['courage'], dur:'evening', cost:'moderate', social:'one', booking:true, nov:3, first:true, mode:'expansion' }),
A({ t:'Make a gift instead of buying one', d:'The next time you owe someone a gift, make it yourself — even imperfectly — instead of buying something.', cat:'create', sec:['love','friends'], dur:'evening', cost:'low', mood:['productive'], mode:'ordinary' }),
A({ t:'Start something with a real deadline', d:'Begin a creative project — a short story, a piece of music, a small painting series — and set yourself a finish date one month out. Tell one person the deadline.', cat:'create', sec:['courage'], dur:'weeks', cost:'low', courage:1, mode:'big' }),
A({ t:'Rearrange one room for how you actually live', d:'Redesign the layout of one room in your home based on how you actually use it, not how it was set up originally. Physically move the furniture.', cat:'create', sec:['home'], dur:'day', cost:'free', phys:2, mood:['productive'], mode:'ordinary' }),
A({ t:'Improvise something in front of someone', d:'Sing, sketch, or freestyle something unrehearsed in front of one person you trust, purely for the discomfort of doing it unpolished.', cat:'create', sec:['courage','play'], dur:'15min', cost:'free', social:'one', courage:2, emo:1, mode:'challenge' }),

/* ---------- CAREER & GROWTH ---------- */
A({ t:'Ask for the feedback you\u2019re avoiding', d:'Ask a manager, mentor, or peer the one piece of feedback you suspect they\u2019re holding back, and actually listen without defending yourself.', cat:'work', sec:['courage'], dur:'1hr', cost:'free', social:'one', courage:2, emo:1, mode:'challenge' }),
A({ t:'Write down the version of the job you actually want', d:'Write one page describing your ideal role in five years — specifics, not vague ambition — as if you were designing it, not waiting for it.', cat:'work', sec:['solo'], dur:'1hr', cost:'free', mood:['productive'], mode:'ordinary' }),
A({ t:'Reach out to someone two steps ahead', d:'Message someone whose career path interests you and ask for 20 minutes of their time to hear how they got there. Come with three real questions.', cat:'work', sec:['courage'], dur:'1hr', cost:'free', social:'one', courage:2, nov:2, first:true, mode:'expansion' }),
A({ t:'Learn one skill your role will need next year', d:'Identify one capability your field is clearly moving toward, and spend a fixed two hours this week starting to learn it.', cat:'work', sec:['mind'], dur:'evening', cost:'low', mood:['productive'], mode:'expansion' }),
A({ t:'Update the story you tell about your work', d:'Rewrite your professional bio or LinkedIn summary from scratch, describing what you actually do and value now, not the version from three years ago.', cat:'work', sec:['solo'], dur:'1hr', cost:'free', mode:'ordinary' }),
A({ t:'Mentor someone junior, properly', d:'Offer a real 45-minute conversation to someone earlier in their career than you, focused entirely on their questions, not your own agenda.', cat:'work', sec:['service'], dur:'1hr', cost:'free', social:'one', mood:['productive'], mode:'expansion' }),
A({ t:'Sit with the plan you keep deferring', d:'Block two uninterrupted hours to actually plan the professional move you keep telling yourself you\u2019ll get to \u2014 leave with three concrete next steps, not just a feeling.', cat:'work', sec:['solo'], dur:'evening', cost:'free', mode:'big' }),

/* ---------- FINANCIAL CAPABILITY ---------- */
A({ t:'Know your actual number', d:'Sit down and calculate, precisely, what you spent last month across every category. No app summary — pull the real numbers yourself.', cat:'money', sec:['solo'], dur:'1hr', cost:'free', mood:['productive'], emo:1, mode:'ordinary' }),
A({ t:'Learn one investment concept properly', d:'Pick one financial concept you\u2019ve nodded along to without understanding \u2014 compound interest, index funds, inflation hedging \u2014 and learn it well enough to explain it to someone else.', cat:'money', sec:['mind'], dur:'evening', cost:'free', mood:['productive'], mode:'expansion' }),
A({ t:'Have the money conversation you\u2019re avoiding', d:'Have one direct, honest conversation about money you\u2019ve been postponing \u2014 with a partner, a parent, or yourself \u2014 with numbers on the table, not just feelings.', cat:'money', sec:['courage','love'], dur:'1hr', cost:'free', social:'one', courage:2, emo:2, mode:'challenge' }),
A({ t:'Set up one automatic system', d:'Automate one piece of your financial life this week \u2014 a savings transfer, an investment contribution, a bill \u2014 so it no longer depends on your memory.', cat:'money', sec:['solo'], dur:'1hr', cost:'free', mood:['productive'], mode:'ordinary' }),
A({ t:'Negotiate something small on purpose', d:'Practice negotiating in a low-stakes setting this week \u2014 a market price, a service fee, a bill \u2014 purely to build the muscle for when it matters more.', cat:'money', sec:['courage'], dur:'15min', cost:'free', social:'strangers', courage:1, mode:'expansion' }),
A({ t:'Build a one-page financial plan for the next five years', d:'Write, on a single page, what you want your finances to look like in five years and the three biggest levers that would get you there.', cat:'money', sec:['work'], dur:'evening', cost:'free', mode:'big' }),

/* ---------- FRIENDSHIP ---------- */
A({ t:'The reunion you keep meaning to plan', d:'Actually pick a date and message the group chat that always says "we should all meet up" \u2014 propose a real time and place today.', cat:'friends', sec:['play'], dur:'15min', cost:'free', social:'friends', mood:['social'], mode:'ordinary' }),
A({ t:'Tell a friend what they mean to you', d:'Tell one friend, directly and specifically, what their friendship has actually given you \u2014 not a generic compliment, a real memory or trait.', cat:'friends', sec:['love'], dur:'15min', cost:'free', social:'one', emo:2, courage:1, mode:'ordinary' }),
A({ t:'Do something new together, not just dinner', d:'Instead of the usual dinner or coffee, invite a friend to do something neither of you has done \u2014 a class, a hike, a new part of the city.', cat:'friends', sec:['adventure'], dur:'evening', cost:'moderate', social:'friends', booking:false, nov:1, mode:'expansion' }),
A({ t:'Host something small and low-pressure', d:'Invite three or four people over for something simple and specific \u2014 a cooking session, a game night \u2014 rather than a big, effortful gathering.', cat:'friends', sec:['play','home'], dur:'evening', cost:'moderate', social:'friends', prep:'light', mode:'expansion' }),
A({ t:'Introduce two people who should know each other', d:'Think of two people in your life who would genuinely get along and don\u2019t know each other yet, and actually connect them.', cat:'friends', sec:['service'], dur:'15min', cost:'free', mode:'ordinary' }),
A({ t:'Make one new friend on purpose', d:'At a class, event, or workshop, introduce yourself to at least two people you don\u2019t know before you leave, and exchange contact details with at least one.', cat:'friends', sec:['courage'], dur:'evening', cost:'low', social:'strangers', courage:2, nov:2, first:true, mode:'expansion' }),
A({ t:'Repair the friendship that went quiet', d:'Reach out to a friend you drifted from without a fight or falling-out, and simply say you\u2019ve missed them. See what happens.', cat:'friends', sec:['courage','love'], dur:'15min', cost:'free', social:'one', courage:2, emo:2, mode:'challenge' }),
A({ t:'A weekend trip with friends, actually booked', d:'Plan and book a short trip with two or three friends \u2014 even one night away \u2014 rather than letting it stay a "someday" idea.', cat:'friends', sec:['travel'], dur:'weekend', cost:'moderate', social:'friends', booking:true, travel:true, nov:1, mode:'big' }),

/* ---------- FAMILY & COMMUNITY ---------- */
A({ t:'Ask an elder one real question about their life', d:'Ask a parent, grandparent, or older relative one specific question about their youth you\u2019ve never asked \u2014 and actually record or write down the answer.', cat:'family', sec:['culture','love'], dur:'1hr', cost:'free', social:'family', emo:2, first:true, mode:'expansion' }),
A({ t:'Cook the family recipe from memory, then check it', d:'Try to cook a family dish entirely from memory first, then compare it with how the original cook actually makes it, and ask them what you missed.', cat:'family', sec:['senses'], dur:'evening', cost:'low', social:'family', mood:['social'], mode:'ordinary' }),
A({ t:'Show up to the small local event', d:'Attend a genuinely local community event this month \u2014 a neighbourhood clean-up, a mosque or community centre gathering, a school fair \u2014 as a participant, not a passerby.', cat:'family', sec:['service'], dur:'evening', cost:'free', social:'group', mode:'expansion' }),
A({ t:'A meal with three generations', d:'Organise or attend a meal that includes at least three generations of the same family, and make a point of talking to the oldest and youngest present.', cat:'family', sec:['love'], dur:'evening', cost:'moderate', social:'family', mode:'expansion' }),
A({ t:'Learn your family\u2019s actual history', d:'Spend an evening asking a parent or relative to walk you through the family history \u2014 where people came from, what they did, what got left out of the usual version.', cat:'family', sec:['culture','mind'], dur:'evening', cost:'free', social:'family', emo:2, first:true, mode:'expansion' }),
A({ t:'Volunteer with your family, together', d:'Find one volunteering activity you can do alongside a family member, so the contribution and the time together happen at once.', cat:'family', sec:['service'], dur:'day', cost:'free', social:'family', mode:'expansion' }),
A({ t:'Start a small family tradition', d:'Propose one small, recurring tradition with your family \u2014 a monthly dinner, a yearly trip, a shared photo album \u2014 and actually set the first date.', cat:'family', sec:['love'], dur:'1hr', cost:'free', social:'family', mode:'big' }),

/* ---------- EMOTIONAL CONNECTION ---------- */
A({ t:'Say the thing you\u2019re assuming they know', d:'Tell someone close to you something you love about them that you\u2019ve simply assumed they already know.', cat:'love', sec:['friends','family'], dur:'15min', cost:'free', social:'one', emo:2, courage:1, mode:'ordinary' }),
A({ t:'Ask a real question and actually wait for the answer', d:'In your next close conversation, ask one question you actually want the answer to, then stay silent long enough for a real answer to come, instead of filling the pause.', cat:'love', sec:['friends'], dur:'15min', cost:'free', social:'one', mode:'ordinary' }),
A({ t:'A day of full attention', d:'Spend one full day with someone you love giving them your complete, undistracted attention \u2014 phone away, no multitasking, no half-listening.', cat:'love', sec:['family','friends'], dur:'day', cost:'free', social:'one', emo:2, mode:'expansion' }),
A({ t:'Write down what closeness means to you', d:'Write honestly about what you actually need to feel close to someone \u2014 not what you think you should need. Keep it for yourself.', cat:'love', sec:['solo','spirit'], dur:'1hr', cost:'free', mode:'ordinary' }),
A({ t:'Repair, don\u2019t just move on', d:'Go back to a small unresolved tension with someone you care about and name it directly, instead of letting it fade unspoken.', cat:'love', sec:['courage'], dur:'1hr', cost:'free', social:'one', courage:2, emo:3, mode:'challenge' }),
A({ t:'A ritual just for the two of you', d:'Create one small recurring ritual with a partner, sibling, or close friend \u2014 a weekly walk, a monthly letter \u2014 that belongs only to that relationship.', cat:'love', sec:['ordinary'], dur:'15min', cost:'free', social:'one', mode:'big' }),

/* ---------- SPIRITUALITY & REFLECTION ---------- */
A({ t:'Ten minutes of real stillness', d:'Sit somewhere quiet for ten minutes with no phone, no music, no goal \u2014 just noticing what your mind does when nothing is asked of it.', cat:'spirit', sec:['rest'], dur:'15min', cost:'free', mood:['peaceful'], mode:'ordinary' }),
A({ t:'Visit a place of worship that isn\u2019t yours', d:'Visit a mosque, church, temple, or synagogue outside your own tradition, respectfully and as a guest, and ask someone there one honest question.', cat:'spirit', sec:['culture'], dur:'evening', cost:'free', social:'strangers', nov:2, courage:1, first:true, mode:'expansion' }),
A({ t:'Write your own values, not the inherited list', d:'Write down the five values you actually try to live by \u2014 tested against your real choices, not the ones you were taught to say.', cat:'spirit', sec:['solo'], dur:'1hr', cost:'free', mode:'ordinary' }),
A({ t:'A day of intentional quiet', d:'Choose one day, or part of one, to keep deliberately quiet \u2014 minimal talking, minimal input \u2014 and notice what surfaces when the noise drops.', cat:'spirit', sec:['solo','rest'], dur:'day', cost:'free', mood:['peaceful'], nov:1, mode:'expansion' }),
A({ t:'Forgive something out loud, even alone', d:'Write or say out loud, to no one but yourself, a genuine forgiveness of something that has been sitting in you. Notice what changes after.', cat:'spirit', sec:['love'], dur:'1hr', cost:'free', emo:3, mode:'challenge' }),
A({ t:'Fast from something for a day', d:'Choose one thing \u2014 food during daylight, social media, complaining \u2014 and go a full day without it, purely to notice your relationship with it.', cat:'spirit', sec:['courage'], dur:'day', cost:'free', courage:1, mode:'expansion' }),
A({ t:'Retreat for a weekend', d:'Book a weekend at a retreat, a quiet guesthouse, or simply somewhere with no obligations, with the explicit purpose of slowing down and reflecting.', cat:'spirit', sec:['rest','solo'], dur:'weekend', cost:'high', booking:true, travel:true, mode:'big' }),

/* ---------- SERVICE & CONTRIBUTION ---------- */
A({ t:'One hour, one organisation, no strings', d:'Give one focused hour to a local charity or cause \u2014 sorting donations, a shift, a task they actually need \u2014 with no expectation of recognition.', cat:'service', sec:['ordinary'], dur:'1hr', cost:'free', social:'strangers', mode:'ordinary' }),
A({ t:'Teach someone a skill for free', d:'Offer to teach one skill you have \u2014 a language, a software tool, a craft \u2014 to someone who couldn\u2019t otherwise access it, for no charge.', cat:'service', sec:['mind'], dur:'evening', cost:'free', social:'one', mode:'expansion' }),
A({ t:'Give anonymously, once', d:'Do something generous for someone \u2014 pay for their order, leave a gift, cover a bill \u2014 in a way they can\u2019t trace back to you.', cat:'service', sec:['play'], dur:'15min', cost:'low', mood:['alive'], mode:'ordinary' }),
A({ t:'Show up for a cause you actually believe in', d:'Attend one event \u2014 a clean-up, a fundraiser, a march, a donation drive \u2014 tied to a cause you genuinely care about, not just one that\u2019s convenient.', cat:'service', sec:['courage'], dur:'day', cost:'free', social:'group', mode:'expansion' }),
A({ t:'Mentor someone outside your usual circle', d:'Offer time to someone from a very different background or generation than you \u2014 a young person, a new arrival to the country \u2014 to help with one concrete thing.', cat:'service', sec:['family'], dur:'evening', cost:'free', social:'one', nov:2, first:true, mode:'expansion' }),
A({ t:'Commit to a recurring volunteer role', d:'Find a volunteering commitment you can genuinely sustain \u2014 monthly, not one-off \u2014 and sign up for a fixed period, like three months.', cat:'service', sec:['family'], dur:'weeks', cost:'free', mode:'big' }),
A({ t:'Fix something in a shared space', d:'Repair or improve one small thing in a space you share with others \u2014 a building, a park, a stairwell \u2014 without being asked to.', cat:'service', sec:['home'], dur:'1hr', cost:'low', mode:'ordinary' }),

/* ---------- CULTURE, ARTS & HISTORY ---------- */
A({ t:'A gallery with no guide, just instinct', d:'Visit an art exhibition and choose your three favourite pieces before reading a single label. Only then find out what they\u2019re actually about.', cat:'culture', sec:['create'], dur:'evening', cost:'low', mood:['peaceful'], mode:'expansion' }),
A({ t:'Live performance, front-row energy', d:'See a piece of live theatre, music, dance, or spoken word you wouldn\u2019t normally choose, and sit close enough to feel the room react.', cat:'culture', sec:['play'], dur:'evening', cost:'moderate', booking:true, nov:1, mode:'expansion' }),
A({ t:'Walk the old part of your own city', d:'Spend a morning in the oldest, most historic district of your city \u2014 like Al Fahidi or Al Seef \u2014 as if you were a first-time visitor, reading every plaque.', cat:'culture', sec:['travel'], dur:'evening', cost:'free', setting:'outdoor', mood:['new'], mode:'expansion' }),
A({ t:'Watch a film from a country you\u2019ve never visited', d:'Watch an acclaimed film from a country you\u2019ve never been to, in its original language with subtitles, and notice what feels unfamiliar.', cat:'culture', sec:['mind'], dur:'evening', cost:'low', mode:'ordinary' }),
A({ t:'A conversation about a book with someone who read it differently', d:'Find someone who has read the same book as you and had a very different reaction, and have a real conversation about where you diverge.', cat:'culture', sec:['friends','mind'], dur:'1hr', cost:'free', social:'one', mode:'ordinary' }),
A({ t:'Trace one historical event to where it happened', d:'Pick a historical event you find genuinely interesting and visit a site, museum, or archive connected to it, even a modest one.', cat:'culture', sec:['travel'], dur:'day', cost:'moderate', mode:'expansion' }),
A({ t:'Attend a talk in a language you\u2019re learning', d:'Attend a lecture, poetry reading, or performance conducted in a language you\u2019re learning, and try to follow without full translation.', cat:'culture', sec:['mind','courage'], dur:'evening', cost:'low', courage:2, nov:2, first:true, mode:'challenge' }),
A({ t:'Commission or buy from a living artist', d:'Buy a piece of art, craft, or design work directly from a living local artist or maker, and learn the story behind it before you take it home.', cat:'culture', sec:['money'], dur:'evening', cost:'high', mode:'big' }),

/* ---------- TRAVEL & EXPLORATION ---------- */
A({ t:'A day trip with no fixed plan', d:'Drive to a nearby emirate or town for the day with only a rough direction, not a fixed itinerary, and decide each next stop when you get there.', cat:'travel', sec:['adventure'], dur:'day', cost:'moderate', social:'one', travel:true, weather:true, nov:1, mode:'expansion' }),
A({ t:'Sleep in a part of your own country you\u2019ve never stayed', d:'Book one night in a part of your own country you\u2019ve genuinely never stayed overnight in \u2014 a different emirate, a mountain town, a coastal spot.', cat:'travel', sec:['adventure'], dur:'weekend', cost:'moderate', travel:true, booking:true, nov:2, first:true, mode:'expansion' }),
A({ t:'Cross a land border you\u2019ve never crossed', d:'Take a short trip to a neighbouring country by road, purely for the experience of the crossing itself, not just the destination.', cat:'travel', sec:['adventure','courage'], dur:'weekend', cost:'moderate', travel:true, booking:true, nov:3, courage:1, first:true, mode:'big' }),
A({ t:'Travel entirely alone for the first time', d:'Plan and take a short solo trip \u2014 even two nights \u2014 where every decision, from meals to route, is entirely yours to make.', cat:'travel', sec:['solo','courage'], dur:'weekend', cost:'moderate', social:'alone', travel:true, booking:true, courage:3, nov:3, first:true, mode:'big' }),
A({ t:'Stay with locals instead of a hotel', d:'On your next trip, choose a homestay or locally-hosted stay instead of a hotel, specifically to talk to people who actually live there.', cat:'travel', sec:['culture'], dur:'weekend', cost:'moderate', travel:true, booking:true, nov:2, mode:'expansion' }),
A({ t:'A trip built entirely around one interest', d:'Plan a trip \u2014 even a short one \u2014 designed entirely around one specific interest of yours: food, architecture, diving, hiking, music.', cat:'travel', sec:['create'], dur:'weekend', cost:'high', travel:true, booking:true, mode:'big' }),
A({ t:'A major solo expedition', d:'Plan and take a significant solo journey \u2014 a multi-day trek, an overland trip through several countries, a long-distance cycle \u2014 that takes real months of preparation.', cat:'travel', sec:['courage','solo'], dur:'weeks', cost:'high', social:'alone', travel:true, booking:true, courage:3, nov:3, first:true, mode:'big' }),
A({ t:'Return to a place that mattered, years later', d:'Revisit somewhere that meant something to you years ago, and notice honestly what has changed \u2014 in the place, and in you.', cat:'travel', sec:['spirit'], dur:'weekend', cost:'moderate', travel:true, emo:2, mode:'expansion' }),

/* ---------- FOOD & SENSORY ---------- */
A({ t:'A meal eaten in total silence', d:'Eat one meal alone in complete silence \u2014 no phone, no music \u2014 paying full attention to texture, temperature and taste.', cat:'senses', sec:['solo','spirit'], dur:'1hr', cost:'low', mood:['peaceful'], mode:'ordinary' }),
A({ t:'A cuisine you\u2019ve never tried, at the source', d:'Eat at a restaurant serving a cuisine you\u2019ve genuinely never tried before, ideally run by people from that culture.', cat:'senses', sec:['culture','adventure'], dur:'evening', cost:'moderate', nov:2, first:true, mode:'expansion' }),
A({ t:'A blind tasting of something you think you know', d:'Do a blind tasting \u2014 coffee, chocolate, olive oil, tea \u2014 of several versions of something you think you already have a preference for, and see if you\u2019re right.', cat:'senses', sec:['play'], dur:'1hr', cost:'moderate', social:'one', mode:'expansion' }),
A({ t:'Eat with your hands, on purpose', d:'Eat a full meal with your hands, the traditional way, even if you\u2019d normally use cutlery, and notice how it changes your relationship with the food.', cat:'senses', sec:['culture'], dur:'evening', cost:'low', mode:'ordinary' }),
A({ t:'A spice or ingredient deep-dive', d:'Pick one spice or ingredient you use often but don\u2019t really know, and learn its origin, how it\u2019s grown, and three ways to use it you\u2019ve never tried.', cat:'senses', sec:['mind'], dur:'1hr', cost:'low', mode:'ordinary' }),
A({ t:'A market with no shopping list', d:'Walk through a spice, fish, or produce market slowly, with no list, buying only what genuinely catches your eye or nose.', cat:'senses', sec:['adventure'], dur:'1hr', cost:'low', setting:'outdoor', social:'strangers', mode:'expansion' }),
A({ t:'Learn to make one dish from a cuisine that isn\u2019t yours', d:'Take a lesson \u2014 in person or from someone who\u2019ll teach you directly \u2014 in one dish from a food culture outside your own, made properly.', cat:'senses', sec:['culture','create'], dur:'evening', cost:'moderate', social:'one', booking:true, nov:2, first:true, mode:'expansion' }),
A({ t:'A tasting menu, once', d:'Book a proper multi-course tasting menu at least once, purely for the experience of food as a deliberate, sequenced story.', cat:'senses', sec:['culture'], dur:'evening', cost:'high', booking:true, mode:'big' }),

/* ---------- CONFIDENCE & COURAGE ---------- */
A({ t:'Say no to something you\u2019d normally accept', d:'The next time you\u2019re asked for something you\u2019d normally agree to out of habit or guilt, say no clearly, without over-explaining.', cat:'courage', sec:['work'], dur:'15min', cost:'free', courage:2, emo:1, mode:'challenge' }),
A({ t:'Ask for the thing you actually want', d:'Ask directly for something you want but usually hint at instead \u2014 a raise, help, credit, a favour \u2014 in plain, unhedged language.', cat:'courage', sec:['work'], dur:'15min', cost:'free', social:'one', courage:2, mode:'challenge' }),
A({ t:'Speak up in the room you usually stay quiet in', d:'In your next meeting or group setting, say the thing you\u2019d normally keep to yourself, even if it\u2019s a small disagreement.', cat:'courage', sec:['work'], dur:'15min', cost:'free', social:'group', courage:2, mode:'challenge' }),
A({ t:'Do the thing you keep rescheduling', d:'Identify the one task or call you\u2019ve rescheduled more than twice, and do it today, however small the discomfort.', cat:'courage', sec:['ordinary'], dur:'15min', cost:'free', courage:1, mode:'ordinary' }),
A({ t:'Try something you might be bad at, in public', d:'Take a class or try an activity you\u2019re likely to be genuinely bad at initially, in front of other beginners, and stay for the whole session anyway.', cat:'courage', sec:['play'], dur:'evening', cost:'moderate', social:'strangers', courage:2, nov:2, first:true, mode:'expansion' }),
A({ t:'Have the conversation you\u2019ve been avoiding', d:'Have the direct, slightly uncomfortable conversation you\u2019ve been postponing \u2014 with a colleague, friend, or family member \u2014 this week, not "eventually."', cat:'courage', sec:['love','work'], dur:'1hr', cost:'free', social:'one', courage:3, emo:2, mode:'challenge' }),
A({ t:'A physical challenge with real stakes', d:'Attempt a physical challenge that genuinely intimidates you \u2014 a high ropes course, a dive, a climb \u2014 with proper safety guidance, purely to feel yourself do it anyway.', cat:'courage', sec:['movement'], dur:'day', cost:'moderate', booking:true, phys:3, courage:3, nov:2, first:true, mode:'challenge' }),
A({ t:'Perform, even briefly, in front of others', d:'Do one thing in front of an audience, however small \u2014 open mic, a toast, a presentation you volunteer for \u2014 that you\u2019d normally avoid.', cat:'courage', sec:['create'], dur:'evening', cost:'free', social:'group', courage:3, emo:2, first:true, mode:'challenge' }),

/* ---------- INDEPENDENCE & SOLITUDE ---------- */
A({ t:'Do the errand you\u2019d normally delegate', d:'Handle one task you usually hand off to someone else \u2014 a repair, a form, a booking \u2014 entirely on your own, start to finish.', cat:'solo', sec:['money'], dur:'1hr', cost:'low', mode:'ordinary' }),
A({ t:'A full day with no plans and no company', d:'Keep an entire day free with no plans and no company, and let yourself decide what to do only once you\u2019re already in it.', cat:'solo', sec:['rest'], dur:'day', cost:'free', mood:['peaceful'], mode:'ordinary' }),
A({ t:'Take yourself somewhere unfamiliar for breakfast', d:'Take yourself to breakfast somewhere unfamiliar, leave your phone in your bag for the first 30 minutes, and just watch the room without trying to entertain yourself.', cat:'solo', sec:['senses'], dur:'1hr', cost:'low', social:'alone', mood:['solo','peaceful'], first:true, mode:'expansion' }),
A({ t:'See a film alone, on purpose', d:'Watch a film at the cinema entirely alone, choosing whatever you actually want to see, with no one else\u2019s taste to consider.', cat:'solo', sec:['play'], dur:'evening', cost:'low', social:'alone', mode:'ordinary' }),
A({ t:'Learn to fix one thing yourself', d:'Learn to repair one thing you\u2019d normally outsource or replace \u2014 a hem, a leak, a setting \u2014 using a tutorial and your own hands.', cat:'solo', sec:['home','mind'], dur:'1hr', cost:'low', mode:'ordinary' }),
A({ t:'A solo overnight, no destination pressure', d:'Book one night away entirely alone, with no agenda beyond being somewhere different and answering only to yourself.', cat:'solo', sec:['travel'], dur:'weekend', cost:'moderate', social:'alone', travel:true, booking:true, courage:1, nov:2, first:true, mode:'expansion' }),
A({ t:'Make one significant decision without seeking input', d:'Make one real decision this week \u2014 not trivial \u2014 entirely on your own judgment, without polling friends or family first.', cat:'solo', sec:['courage'], dur:'1hr', cost:'free', courage:2, mode:'challenge' }),
A({ t:'Learn to enjoy your own company at a table for one', d:'Book a table for one at a proper restaurant \u2014 not a quick bite \u2014 and stay for the full meal, ordering a starter and dessert.', cat:'solo', sec:['senses','courage'], dur:'evening', cost:'moderate', social:'alone', booking:true, courage:1, mode:'expansion' }),

/* ---------- PLAY & FUN ---------- */
A({ t:'Play a game with no purpose at all', d:'Play a board game, card game, or sport purely for fun, with no lesson, no networking angle, no self-improvement attached.', cat:'play', sec:['friends'], dur:'evening', cost:'low', social:'friends', mood:['social'], mode:'ordinary' }),
A({ t:'Do something you loved as a child, unironically', d:'Do one thing you genuinely loved as a child \u2014 a game, a food, a place \u2014 as an adult, without irony or self-consciousness.', cat:'play', sec:['ordinary'], dur:'1hr', cost:'low', mood:['alive'], mode:'ordinary' }),
A({ t:'Karaoke, badly, on purpose', d:'Sing karaoke in front of people whose opinion you don\u2019t need to protect, and pick a song purely because you love it, not because you\u2019re good at it.', cat:'play', sec:['courage'], dur:'evening', cost:'low', social:'friends', courage:2, emo:1, mode:'expansion' }),
A({ t:'An arcade, a fairground, or a theme park, unashamed', d:'Spend a few hours somewhere designed purely for fun \u2014 an arcade, fairground, or theme park \u2014 and let yourself enjoy it without treating it as a kid\u2019s activity.', cat:'play', sec:['friends'], dur:'evening', cost:'moderate', social:'friends', mode:'expansion' }),
A({ t:'Try a game you\u2019ve always dismissed', d:'Play a game or sport you\u2019ve always assumed "isn\u2019t for you" \u2014 chess, bowling, laser tag, darts \u2014 with genuinely no expectation of being good.', cat:'play', sec:['courage'], dur:'evening', cost:'low', social:'friends', nov:2, first:true, mode:'expansion' }),
A({ t:'A prank or surprise, kindly done', d:'Plan a small, kind surprise for someone \u2014 an unexpected visit, a hidden note, a silly gift \u2014 purely for the joy of their reaction.', cat:'play', sec:['love'], dur:'1hr', cost:'low', mode:'ordinary' }),
A({ t:'A themed night with no reason', d:'Plan a themed evening \u2014 a specific cuisine, a decade, a dress code \u2014 with friends, purely because it\u2019s more fun than an ordinary hangout.', cat:'play', sec:['friends','create'], dur:'evening', cost:'moderate', social:'friends', prep:'light', mode:'expansion' }),

/* ---------- HOME & BEAUTY ---------- */
A({ t:'One beautiful, useless object', d:'Buy or make one object for your home that serves no function except that it\u2019s beautiful to look at.', cat:'home', sec:['create'], dur:'1hr', cost:'moderate', mode:'ordinary' }),
A({ t:'Change the light in one room', d:'Change the lighting in one room \u2014 warmer bulbs, a lamp instead of overheads, candles \u2014 and notice how differently the space feels this evening.', cat:'home', sec:['ordinary'], dur:'1hr', cost:'low', mode:'ordinary' }),
A({ t:'Cook one meal purely for presentation', d:'Cook a simple meal and plate it as carefully as a restaurant would \u2014 purely as an exercise in noticing how presentation changes the experience.', cat:'home', sec:['senses','create'], dur:'1hr', cost:'low', mode:'ordinary' }),
A({ t:'Give one wall a proper identity', d:'Choose one wall in your home and give it real intention \u2014 art, colour, shelving \u2014 instead of leaving it as an afterthought.', cat:'home', sec:['create'], dur:'day', cost:'moderate', mode:'expansion' }),
A({ t:'A scent that means home', d:'Choose one signature scent \u2014 a candle, an oil, incense \u2014 to associate deliberately with home, and use it consistently for a month.', cat:'home', sec:['senses'], dur:'15min', cost:'low', mode:'ordinary' }),
A({ t:'Host a proper dinner, not a casual one', d:'Host a sit-down dinner with a real table setting, at least one course you\u2019ve never made, and no phones at the table.', cat:'home', sec:['friends','senses'], dur:'evening', cost:'moderate', social:'friends', prep:'moderate', mode:'expansion' }),
A({ t:'Redesign your morning space', d:'Redesign the physical space where your morning routine happens, so the first ten minutes of your day feel deliberately good.', cat:'home', sec:['ordinary'], dur:'evening', cost:'low', mode:'ordinary' }),

/* ---------- REST & RECOVERY ---------- */
A({ t:'A nap with no guilt attached', d:'Take a nap in the middle of the day without justifying it to yourself first, and let yourself wake up slowly.', cat:'rest', sec:['ordinary'], dur:'1hr', cost:'free', mode:'ordinary' }),
A({ t:'A full digital sunset', d:'Put every screen away two hours before bed, once, and notice what you do with that reclaimed time.', cat:'rest', sec:['ordinary'], dur:'evening', cost:'free', mode:'ordinary' }),
A({ t:'A proper bath or long shower, unrushed', d:'Take a bath or long shower with no time pressure, treating it as the whole point of the evening rather than a step before something else.', cat:'rest', sec:['home'], dur:'1hr', cost:'free', mode:'ordinary' }),
A({ t:'Cancel one thing you don\u2019t actually want to do', d:'Cancel or postpone one commitment this week that you agreed to out of obligation, not desire, and use the freed time to rest.', cat:'rest', sec:['courage'], dur:'15min', cost:'free', courage:1, mode:'ordinary' }),
A({ t:'A weekend with one rule: nothing scheduled', d:'Keep an entire weekend deliberately unscheduled \u2014 no plans made in advance \u2014 and let it unfold at whatever pace it wants to.', cat:'rest', sec:['solo'], dur:'weekend', cost:'free', mode:'expansion' }),
A({ t:'Sleep in without an alarm, once', d:'Choose one morning to wake up entirely without an alarm, with nothing scheduled early, and notice how your body actually wants to rest.', cat:'rest', sec:['ordinary'], dur:'15min', cost:'free', mode:'ordinary' }),
A({ t:'A short retreat from your phone', d:'Go 24 hours with your phone locked away except for emergencies, and keep a small notebook for anything you\u2019d normally have looked up.', cat:'rest', sec:['spirit'], dur:'day', cost:'free', nov:1, mode:'expansion' }),

];

const ACTIVITY_COUNT = ACTIVITIES.length;

/* ----------------------------- STORAGE ----------------------------- */

const STORAGE_KEY = 'wider:progress:v1';
const emptyProgress = () => ({
  done: [], firsts: [], saved: [], rejected: [],
  weights: {}, recentShown: [],
  weeklyFirst: null, monthlyExpansion: null,
});

function isoWeekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((date - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${date.getUTCFullYear()}-W${week}`;
}
function monthKey(d = new Date()) { return `${d.getFullYear()}-${d.getMonth() + 1}`; }

/* ----------------------------- RECOMMENDATION ENGINE ----------------------------- */

const TIME_DURATIONS = {
  '15min': ['15min'],
  '30-60': ['15min', '1hr'],
  '2-3hr': ['1hr', 'evening'],
  'half': ['evening', 'day'],
  'full': ['day'],
  'weekend': ['weekend'],
  'nolimit': null,
};
const ENERGY_ORDER = ['verylow', 'low', 'normal', 'high'];
const COST_ORDER = ['free', 'low', 'moderate', 'high'];

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function matchesHard(a, ctx) {
  if (ctx.durations && !ctx.durations.includes(a.dur)) return false;
  if (ctx.costMax) { if (COST_ORDER.indexOf(a.cost) > COST_ORDER.indexOf(ctx.costMax)) return false; }
  if (ctx.energyMax && ctx.mode !== 'challenge') {
    if (ENERGY_ORDER.indexOf(a.energy) > ENERGY_ORDER.indexOf(ctx.energyMax)) return false;
  }
  if (ctx.aloneOnly && !a.aloneOk) return false;
  if (ctx.social && ctx.social === 'social' && a.social === 'alone' && !a.sec?.includes('friends')) return false;
  return true;
}

function scoreActivity(a, ctx) {
  let score = 1;
  const w = ctx.weights[a.cat] || 0;
  score += w * 0.55;
  (a.sec || []).forEach(s => { score += (ctx.weights[s] || 0) * 0.18; });
  if (ctx.mood && a.mood?.includes(ctx.mood)) score += 1.6;
  if (ctx.mode && a.mode === ctx.mode) score += 1.1;
  if (!ctx.doneSet.has(a.id)) score += 0.5;
  if (ctx.recentSet.has(a.id)) score -= 3.5;
  if (ctx.rejectedSet.has(a.id)) score -= 1.8;
  score += Math.random() * 0.7 - 0.35;
  return score;
}

function buildContext(progress, filters) {
  return {
    durations: filters.timeKey ? TIME_DURATIONS[filters.timeKey] : null,
    energyMax: filters.energyKey && filters.energyKey !== 'challenge' ? filters.energyKey : null,
    mode: filters.energyKey === 'challenge' ? 'challenge' : filters.modeKey || null,
    costMax: filters.costMax || null,
    mood: filters.moodKey || null,
    social: filters.socialKey || null,
    aloneOnly: filters.socialKey === 'solo',
    weights: progress.weights || {},
    doneSet: new Set(progress.done.map(x => x.id)),
    recentSet: new Set((progress.recentShown || []).slice(-18)),
    rejectedSet: new Set((progress.rejected || []).slice(-15).map(x => x.id)),
  };
}

function categoryDoneCounts(progress) {
  const counts = Object.fromEntries(CATEGORIES.map(c => [c.id, 0]));
  progress.done.forEach(d => {
    const a = ACTIVITIES.find(x => x.id === d.id);
    if (a) counts[a.cat] = (counts[a.cat] || 0) + 1;
  });
  return counts;
}

function recommend(progress, filters, n = 6) {
  const ctx = buildContext(progress, filters);
  let pool = ACTIVITIES.filter(a => matchesHard(a, ctx));
  if (pool.length < n) pool = ACTIVITIES.filter(a => matchesHard({ ...a }, { ...ctx, energyMax: null }));
  const scored = pool.map(a => ({ a, s: scoreActivity(a, ctx) })).sort((x, y) => y.s - x.s);

  const exploreCount = Math.max(1, Math.round(n * 0.25));
  const counts = categoryDoneCounts(progress);
  const leastDoneCats = [...CATEGORIES].sort((c1, c2) => (counts[c1.id] || 0) - (counts[c2.id] || 0)).map(c => c.id);

  const picked = [];
  const pickedIds = new Set();
  for (const cat of leastDoneCats) {
    if (picked.length >= exploreCount) break;
    const cand = scored.find(s => s.a.cat === cat && !pickedIds.has(s.a.id) && matchesHard(s.a, ctx));
    if (cand) { picked.push(cand.a); pickedIds.add(cand.a.id); }
  }
  for (const s of scored) {
    if (picked.length >= n) break;
    if (!pickedIds.has(s.a.id)) { picked.push(s.a); pickedIds.add(s.a.id); }
  }
  return picked.slice(0, n);
}

function whyItFits(a, filters, progress) {
  const bits = [];
  const w = (progress.weights || {})[a.cat] || 0;
  if (filters.moodKey && a.mood?.includes(filters.moodKey)) bits.push(`it matches the mood you\u2019re after`);
  if (w > 1.2) bits.push(`you keep gravitating toward ${CAT[a.cat].label.toLowerCase()}`);
  if (w < -0.4 || w === 0) bits.push(`it\u2019s a category you\u2019ve barely touched lately`);
  if (a.first) bits.push(`it could be a genuine first`);
  if (bits.length === 0) bits.push(`it fits the time and energy you have right now`);
  return bits.slice(0, 2).join(', ') + '.';
}

/* ----------------------------- NL PARSER ----------------------------- */

function parseNaturalLanguage(text) {
  const q = text.toLowerCase();
  const f = {};
  if (/tonight|this evening/.test(q)) { f.timeKey = '2-3hr'; f.moodKey = f.moodKey; }
  if (/\bhour\b|\ban hour\b/.test(q) && !/three|two|3|2/.test(q)) f.timeKey = '30-60';
  if (/three hours|3 hours|\bfew hours\b/.test(q)) f.timeKey = '2-3hr';
  if (/whole weekend|entire weekend|free.*weekend/.test(q)) f.timeKey = 'weekend';
  if (/full day|whole day|all day/.test(q)) f.timeKey = 'full';
  if (/half.?day/.test(q)) f.timeKey = 'half';
  if (/15 minutes|quick|few minutes/.test(q)) f.timeKey = '15min';
  if (/bored/.test(q)) { f.moodKey = 'surprise'; }
  if (/out of the house|get out|stir.?crazy/.test(q)) { f.moodKey = 'outofhouse'; }
  if (/low.?energy|tired|exhausted|drained/.test(q)) f.energyKey = 'low';
  if (/don.?t want to waste|make (it|the day|my saturday) count/.test(q)) f.moodKey = f.moodKey || 'alive';
  if (/never done|never tried|something new/.test(q)) { f.moodKey = 'new'; }
  if (/slightly scary|a bit scary|scared|push.*comfort/.test(q)) { f.moodKey = 'pushcomfort'; f.energyKey = 'challenge'; }
  if (/peaceful|calm|quiet evening|ordinary/.test(q)) { f.moodKey = 'peaceful'; }
  if (/memorable|unforgettable/.test(q)) { f.moodKey = 'alive'; }
  if (/don.?t want to spend|free\b|no money|zero cost/.test(q)) f.costMax = 'free';
  if (/meet people|meet someone|new friends/.test(q)) { f.moodKey = 'social'; f.socialKey = 'social'; }
  if (/\balone\b|by myself|solo/.test(q)) { f.socialKey = 'solo'; f.moodKey = f.moodKey || 'solo'; }
  if (/big experience|plan for next month|one big thing/.test(q)) { f.modeKey = 'big'; f.timeKey = f.timeKey || 'nolimit'; }
  if (/productive/.test(q)) f.moodKey = 'productive';
  if (/adventurous|adventure/.test(q)) f.moodKey = 'adventurous';
  if (!f.timeKey) f.timeKey = 'nolimit';
  return f;
}

/* ----------------------------- SMALL UI PIECES ----------------------------- */

const DUR_LABEL = { '15min': '15 min', '1hr': '~1 hour', 'evening': 'An evening', 'day': 'A day', 'weekend': 'A weekend', 'weeks': 'Weeks of lead time', 'major': 'Months to plan' };
const COST_LABEL = { free: 'Free', low: 'Low cost', moderate: 'Moderate cost', high: 'Higher cost' };
const MODE_LABEL = { ordinary: 'Ordinary', expansion: 'Expansion', challenge: 'Challenge', big: 'Big Life' };

function Chip({ children, tone }) {
  return <span className={`chip ${tone ? 'chip-' + tone : ''}`}>{children}</span>;
}

function ModeStamp({ mode }) {
  return <span className={`stamp stamp-${mode}`}>{MODE_LABEL[mode]}</span>;
}

function ActivityCard({ a, reason, onDo, onSkip, onSave, onAnother, onOpen, saved }) {
  const c = CAT[a.cat];
  return (
    <div className="card" style={{ '--accent': c.accent }}>
      <div className="card-top">
        <ModeStamp mode={a.mode} />
        <span className="card-cat">{c.label}</span>
      </div>
      <h3 className="card-title" onClick={() => onOpen && onOpen(a)}>{a.t}</h3>
      <p className="card-desc">{a.d}</p>
      {reason && <p className="card-reason">Why now: {reason}</p>}
      <div className="card-meta">
        <Chip>{DUR_LABEL[a.dur]}</Chip>
        <Chip>{COST_LABEL[a.cost]}</Chip>
        <Chip>{a.social === 'alone' ? 'Alone' : a.social === 'one' ? '+1 person' : a.social}</Chip>
        {a.nov >= 2 && <Chip tone="gold">Novel</Chip>}
        {a.courage >= 2 && <Chip tone="clay">Takes courage</Chip>}
      </div>
      {(onDo || onSkip || onSave || onAnother) && (
        <div className="card-actions">
          {onDo && <button className="btn btn-primary" onClick={() => onDo(a)}><Check size={15} /> Do this</button>}
          {onSave && <button className="btn btn-ghost" onClick={() => onSave(a)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button>}
          {onSkip && <button className="btn btn-ghost" onClick={() => onSkip(a)}><X size={15} /> Not now</button>}
          {onAnother && <button className="btn btn-ghost" onClick={() => onAnother(a)}><RefreshCw size={15} /> Another</button>}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- MAIN APP ----------------------------- */

export default function App() {
  const [progress, setProgress] = useState(emptyProgress());
  const [loaded, setLoaded] = useState(false);
  const [screen, setScreen] = useState('home');
  const [prevScreen, setPrevScreen] = useState('home');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recs, setRecs] = useState([]);
  const [nlText, setNlText] = useState('');
  const [detailId, setDetailId] = useState(null);
  const [myLifeTab, setMyLifeTab] = useState('done');
  const [exploreQuery, setExploreQuery] = useState('');
  const [exploreCat, setExploreCat] = useState(null);
  const [rouletteActivity, setRouletteActivity] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (mounted && res?.value) {
          const parsed = JSON.parse(res.value);
          setProgress({ ...emptyProgress(), ...parsed });
        }
      } catch (e) { /* fresh start */ }
      if (mounted) setLoaded(true);
    })();
    return () => { mounted = false; };
  }, []);

  const persist = useCallback(async (next) => {
    setProgress(next);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(next), false); } catch (e) { /* best effort */ }
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  function markDone(a) {
    const next = { ...progress };
    if (!next.done.find(x => x.id === a.id)) {
      next.done = [...next.done, { id: a.id, at: Date.now() }];
      next.weights = { ...next.weights, [a.cat]: clamp((next.weights[a.cat] || 0) + 1, -3, 5) };
      (a.sec || []).forEach(s => { next.weights[s] = clamp((next.weights[s] || 0) + 0.4, -3, 5); });
      if (a.first && !next.firsts.find(x => x.id === a.id)) next.firsts = [...next.firsts, { id: a.id, at: Date.now() }];
    }
    next.saved = next.saved.filter(x => x.id !== a.id);
    next.recentShown = [...(next.recentShown || []), a.id].slice(-25);
    persist(next);
    showToast('Added to your life.');
  }

  function markRejected(a) {
    const next = { ...progress };
    next.rejected = [...(next.rejected || []), { id: a.id, at: Date.now() }].slice(-40);
    next.weights = { ...next.weights, [a.cat]: clamp((next.weights[a.cat] || 0) - 0.5, -3, 5) };
    next.recentShown = [...(next.recentShown || []), a.id].slice(-25);
    persist(next);
    setRecs(rs => rs.filter(r => r.id !== a.id));
  }

  function toggleSave(a) {
    const next = { ...progress };
    if (next.saved.find(x => x.id === a.id)) next.saved = next.saved.filter(x => x.id !== a.id);
    else next.saved = [...next.saved, { id: a.id, at: Date.now() }];
    persist(next);
  }

  function replaceWithAnother(a) {
    const filters = quizAnswers.timeKey ? quizAnswers : { timeKey: 'nolimit' };
    const fresh = recommend(progress, filters, 8);
    const shownIds = new Set(recs.map(r => r.id));
    const replacement = fresh.find(f => !shownIds.has(f.id) && f.id !== a.id);
    if (replacement) setRecs(rs => rs.map(r => r.id === a.id ? replacement : r));
    const next = { ...progress, recentShown: [...(progress.recentShown || []), a.id].slice(-25) };
    persist(next);
  }

  function goto(s) { setPrevScreen(screen); setScreen(s); }

  function openDetail(a) { setDetailId(a.id); goto('detail'); }

  function startQuiz() { setQuizStep(0); setQuizAnswers({}); goto('quiz'); }

  function answerQuiz(key, value) {
    const next = { ...quizAnswers, [key]: value };
    setQuizAnswers(next);
    if (quizStep < 2) setQuizStep(quizStep + 1);
    else {
      const filters = {
        timeKey: next.timeKey,
        energyKey: next.energyKey,
        moodKey: next.feelingKey,
      };
      setRecs(recommend(progress, filters, 6));
      goto('recs');
    }
  }

  function submitNL() {
    if (!nlText.trim()) return;
    const filters = parseNaturalLanguage(nlText);
    setQuizAnswers(filters);
    setRecs(recommend(progress, filters, 6));
    setNlText('');
    goto('recs');
  }

  function spinRoulette() {
    const picks = recommend(progress, { timeKey: 'nolimit' }, 3);
    setRouletteActivity(picks[0] || ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)]);
  }

  const doneSet = useMemo(() => new Set(progress.done.map(x => x.id)), [progress.done]);
  const savedSet = useMemo(() => new Set(progress.saved.map(x => x.id)), [progress.saved]);

  if (!loaded) {
    return (
      <div className="wider-root loading-root">
        <style>{CSS}</style>
        <div className="loading-mark">Wider</div>
      </div>
    );
  }

  return (
    <div className="wider-root">
      <style>{CSS}</style>
      {toast && <div className="toast">{toast}</div>}

      <div className="app-shell">
        <header className="topbar">
          {screen !== 'home' ? (
            <button className="icon-btn" onClick={() => goto(screen === 'detail' ? prevScreen : 'home')}><ArrowLeft size={18} /></button>
          ) : <span className="topbar-spacer" />}
          <span className="topbar-title">Wider</span>
          <span className="topbar-spacer" />
        </header>

        <main className="screen">
          {screen === 'home' && (
            <HomeScreen
              nlText={nlText} setNlText={setNlText} submitNL={submitNL}
              startQuiz={startQuiz} progress={progress}
              onRoulette={() => { spinRoulette(); goto('roulette'); }}
            />
          )}

          {screen === 'quiz' && (
            <QuizScreen step={quizStep} onAnswer={answerQuiz} onBack={() => quizStep > 0 ? setQuizStep(quizStep - 1) : goto('home')} />
          )}

          {screen === 'recs' && (
            <RecsScreen
              recs={recs} progress={progress} filters={quizAnswers}
              onDo={markDone} onSkip={markRejected} onSave={toggleSave} onAnother={replaceWithAnother}
              onOpen={openDetail} savedSet={savedSet}
              onMore={() => setRecs(recommend(progress, quizAnswers, 6))}
            />
          )}

          {screen === 'roulette' && (
            <RouletteScreen activity={rouletteActivity} onSpin={spinRoulette}
              onDo={(a) => { markDone(a); goto('home'); }} onSave={toggleSave} onOpen={openDetail} savedSet={savedSet} />
          )}

          {screen === 'explore' && (
            <ExploreScreen
              query={exploreQuery} setQuery={setExploreQuery}
              activeCat={exploreCat} setActiveCat={setExploreCat}
              onOpen={openDetail}
            />
          )}

          {screen === 'detail' && detailId && (
            <DetailScreen
              activity={ACTIVITIES.find(a => a.id === detailId)}
              onDo={markDone} onSave={toggleSave} onOpen={openDetail}
              saved={savedSet.has(detailId)} done={doneSet.has(detailId)}
            />
          )}

          {screen === 'mylife' && (
            <MyLifeScreen progress={progress} tab={myLifeTab} setTab={setMyLifeTab} onOpen={openDetail} onUnsave={toggleSave} />
          )}

          {screen === 'map' && <LifeMapScreen progress={progress} onExploreCat={(c) => { setExploreCat(c); goto('explore'); }} />}

          {screen === 'plan' && (
            <PlanScreen progress={progress} persist={persist} onOpen={openDetail} onDo={markDone} onSave={toggleSave} savedSet={savedSet} />
          )}
        </main>

        <nav className="bottomnav">
          <NavBtn icon={<Sparkles size={19} />} label="Home" active={screen === 'home'} onClick={() => goto('home')} />
          <NavBtn icon={<Search size={19} />} label="Explore" active={screen === 'explore'} onClick={() => goto('explore')} />
          <NavBtn icon={<BookMarked size={19} />} label="My Life" active={screen === 'mylife'} onClick={() => goto('mylife')} />
          <NavBtn icon={<MapIcon size={19} />} label="Life Map" active={screen === 'map'} onClick={() => goto('map')} />
          <NavBtn icon={<CalendarClock size={19} />} label="Plan" active={screen === 'plan'} onClick={() => goto('plan')} />
        </nav>
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button className={`navbtn ${active ? 'navbtn-active' : ''}`} onClick={onClick}>
      {icon}<span>{label}</span>
    </button>
  );
}

/* ----------------------------- SCREENS ----------------------------- */

function HomeScreen({ nlText, setNlText, submitNL, startQuiz, progress, onRoulette }) {
  const doneCount = progress.done.length;
  return (
    <div className="home">
      <div className="hero">
        <p className="eyebrow">Build a wide life. Learn to love a quiet day.</p>
        <h1 className="hero-title">There is more life<br />available to you.</h1>
        <p className="hero-sub">{ACTIVITY_COUNT} specific ways to spend an hour, an evening, or a season \u2014 chosen for where you are right now, not a generic list.</p>
      </div>

      <button className="cta" onClick={startQuiz}>
        <span>Give me something to do</span>
        <ChevronRight size={18} />
      </button>

      <div className="nl-box">
        <input
          className="nl-input"
          placeholder="Or just tell me\u2026 \u201cI have three hours tomorrow\u201d"
          value={nlText}
          onChange={e => setNlText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submitNL(); }}
        />
        <button className="nl-send" onClick={submitNL}><Send size={16} /></button>
      </div>

      <div className="home-row">
        <button className="tile" onClick={onRoulette}>
          <Shuffle size={18} />
          <span>Life Roulette</span>
          <small>One tap, one surprise</small>
        </button>
        <button className="tile" onClick={startQuiz}>
          <Sun size={18} />
          <span>Ordinary good day</span>
          <small>Nothing has to happen</small>
        </button>
      </div>

      {doneCount > 0 && (
        <p className="home-footnote">{doneCount} experience{doneCount === 1 ? '' : 's'} lived so far. {progress.firsts.length} of them were firsts.</p>
      )}
    </div>
  );
}

const QUIZ_QUESTIONS = [
  { key: 'timeKey', title: 'How much time do you have?', options: [
    ['15min', '15 minutes'], ['30-60', '30\u201360 minutes'], ['2-3hr', '2\u20133 hours'],
    ['half', 'Half a day'], ['full', 'A full day'], ['weekend', 'A weekend'], ['nolimit', 'No limit'],
  ]},
  { key: 'energyKey', title: 'What energy do you have?', options: [
    ['verylow', 'Very low'], ['low', 'Low'], ['normal', 'Normal'], ['high', 'High'], ['challenge', 'I want a challenge'],
  ]},
  { key: 'feelingKey', title: 'What do you feel like?', options: [
    ['surprise', 'Surprise me'], ['outofhouse', 'Get me out of the house'], ['peaceful', 'Something peaceful'],
    ['adventurous', 'Something adventurous'], ['social', 'Something social'], ['solo', 'Something alone'],
    ['productive', 'Something productive'], ['new', 'Something completely new'], ['alive', 'Make me feel alive'],
    ['ordinary', 'Ordinary good day'], ['pushcomfort', 'Push my comfort zone'],
  ]},
];

function QuizScreen({ step, onAnswer, onBack }) {
  const q = QUIZ_QUESTIONS[step];
  return (
    <div className="quiz">
      <button className="quiz-back" onClick={onBack}><ChevronLeft size={16} /> Back</button>
      <p className="quiz-progress">{step + 1} of {QUIZ_QUESTIONS.length}</p>
      <h2 className="quiz-title">{q.title}</h2>
      <div className="quiz-options">
        {q.options.map(([val, label]) => (
          <button key={val} className="quiz-opt" onClick={() => onAnswer(q.key, val)}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function RecsScreen({ recs, progress, filters, onDo, onSkip, onSave, onAnother, onOpen, savedSet, onMore }) {
  return (
    <div className="recs">
      <h2 className="section-title">A few things that fit right now</h2>
      {recs.length === 0 && <p className="empty">Nothing matched exactly \u2014 try a longer time window.</p>}
      {recs.map(a => (
        <ActivityCard key={a.id} a={a} reason={whyItFits(a, filters, progress)}
          onDo={onDo} onSkip={onSkip} onSave={onSave} onAnother={onAnother}
          onOpen={onOpen} saved={savedSet.has(a.id)} />
      ))}
      <button className="btn btn-outline btn-block" onClick={onMore}><RefreshCw size={15} /> Give me a different set</button>
    </div>
  );
}

function RouletteScreen({ activity, onSpin, onDo, onSave, onOpen, savedSet }) {
  if (!activity) return null;
  return (
    <div className="roulette">
      <h2 className="section-title">Life Roulette</h2>
      <ActivityCard a={activity} onDo={onDo} onSave={onSave} onOpen={onOpen} saved={savedSet.has(activity.id)} />
      <button className="btn btn-outline btn-block" onClick={onSpin}><Shuffle size={15} /> Spin again</button>
    </div>
  );
}

function ExploreScreen({ query, setQuery, activeCat, setActiveCat, onOpen }) {
  const [durF, setDurF] = useState(null);
  const [modeF, setModeF] = useState(null);
  const [costF, setCostF] = useState(null);

  const results = useMemo(() => {
    return ACTIVITIES.filter(a => {
      if (activeCat && a.cat !== activeCat) return false;
      if (durF && a.dur !== durF) return false;
      if (modeF && a.mode !== modeF) return false;
      if (costF && a.cost !== costF) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!a.t.toLowerCase().includes(q) && !a.d.toLowerCase().includes(q) && !CAT[a.cat].label.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [query, activeCat, durF, modeF, costF]);

  return (
    <div className="explore">
      <h2 className="section-title">Explore Life</h2>
      <input className="search-input" placeholder="Search all activities\u2026" value={query} onChange={e => setQuery(e.target.value)} />

      <div className="filter-scroll">
        <button className={`filter-chip ${!activeCat ? 'filter-chip-on' : ''}`} onClick={() => setActiveCat(null)}>All categories</button>
        {CATEGORIES.map(c => (
          <button key={c.id} className={`filter-chip ${activeCat === c.id ? 'filter-chip-on' : ''}`} onClick={() => setActiveCat(c.id)}>{c.label}</button>
        ))}
      </div>
      <div className="filter-scroll">
        {Object.entries(DUR_LABEL).map(([k, v]) => (
          <button key={k} className={`filter-chip ${durF === k ? 'filter-chip-on' : ''}`} onClick={() => setDurF(durF === k ? null : k)}>{v}</button>
        ))}
      </div>
      <div className="filter-scroll">
        {Object.entries(MODE_LABEL).map(([k, v]) => (
          <button key={k} className={`filter-chip ${modeF === k ? 'filter-chip-on' : ''}`} onClick={() => setModeF(modeF === k ? null : k)}>{v}</button>
        ))}
        {Object.entries(COST_LABEL).map(([k, v]) => (
          <button key={k} className={`filter-chip ${costF === k ? 'filter-chip-on' : ''}`} onClick={() => setCostF(costF === k ? null : k)}>{v}</button>
        ))}
      </div>

      <p className="result-count">{results.length} activities</p>
      <div className="explore-list">
        {results.map(a => (
          <button key={a.id} className="explore-row" onClick={() => onOpen(a)} style={{ '--accent': CAT[a.cat].accent }}>
            <span className="explore-row-dot" />
            <span className="explore-row-text">
              <strong>{a.t}</strong>
              <small>{CAT[a.cat].label} \u00b7 {DUR_LABEL[a.dur]}</small>
            </span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailScreen({ activity: a, onDo, onSave, onOpen, saved, done }) {
  if (!a) return null;
  const similar = ACTIVITIES.filter(x => x.id !== a.id && (x.cat === a.cat || (x.sec || []).some(s => s === a.cat || (a.sec || []).includes(s)))).slice(0, 4);
  const c = CAT[a.cat];
  return (
    <div className="detail" style={{ '--accent': c.accent }}>
      <div className="detail-head">
        <ModeStamp mode={a.mode} />
        <span className="card-cat">{c.label}</span>
      </div>
      <h2 className="detail-title">{a.t}</h2>
      <p className="detail-desc">{a.d}</p>
      <div className="detail-grid">
        <div><small>Time</small><strong>{DUR_LABEL[a.dur]}</strong></div>
        <div><small>Cost</small><strong>{COST_LABEL[a.cost]}</strong></div>
        <div><small>Energy</small><strong>{a.energy}</strong></div>
        <div><small>Social</small><strong>{a.social}</strong></div>
        <div><small>Setting</small><strong>{a.setting}</strong></div>
        <div><small>Novelty</small><strong>{'\u2605'.repeat(a.nov + 1)}</strong></div>
        <div><small>Courage</small><strong>{a.courage === 0 ? 'Low' : '\u2605'.repeat(a.courage)}</strong></div>
        <div><small>Booking</small><strong>{a.booking ? 'Needed' : 'None'}</strong></div>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary" onClick={() => onDo(a)}><Check size={15} /> {done ? 'Done again' : 'Do this'}</button>
        <button className="btn btn-ghost" onClick={() => onSave(a)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button>
      </div>

      {similar.length > 0 && (
        <div className="similar">
          <h3 className="similar-title">Related experiences</h3>
          {similar.map(s => (
            <button key={s.id} className="explore-row" onClick={() => onOpen(s)} style={{ '--accent': CAT[s.cat].accent }}>
              <span className="explore-row-dot" />
              <span className="explore-row-text"><strong>{s.t}</strong><small>{CAT[s.cat].label}</small></span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MyLifeScreen({ progress, tab, setTab, onOpen, onUnsave }) {
  const lists = {
    done: progress.done.slice().reverse().map(x => ACTIVITIES.find(a => a.id === x.id)).filter(Boolean),
    firsts: progress.firsts.slice().reverse().map(x => ACTIVITIES.find(a => a.id === x.id)).filter(Boolean),
    saved: progress.saved.slice().reverse().map(x => ACTIVITIES.find(a => a.id === x.id)).filter(Boolean),
    big: progress.saved.map(x => ACTIVITIES.find(a => a.id === x.id)).filter(a => a && a.mode === 'big')
      .concat(progress.done.map(x => ACTIVITIES.find(a => a.id === x.id)).filter(a => a && a.mode === 'big')),
  };
  const list = lists[tab] || [];
  return (
    <div className="mylife">
      <h2 className="section-title">My Life</h2>
      <div className="tabs">
        <button className={`tab ${tab === 'done' ? 'tab-on' : ''}`} onClick={() => setTab('done')}>Done ({lists.done.length})</button>
        <button className={`tab ${tab === 'firsts' ? 'tab-on' : ''}`} onClick={() => setTab('firsts')}>Firsts ({lists.firsts.length})</button>
        <button className={`tab ${tab === 'saved' ? 'tab-on' : ''}`} onClick={() => setTab('saved')}>Saved ({lists.saved.length})</button>
        <button className={`tab ${tab === 'big' ? 'tab-on' : ''}`} onClick={() => setTab('big')}>Big Experiences</button>
      </div>
      {list.length === 0 && <p className="empty">Nothing here yet \u2014 it will fill in as you live.</p>}
      <div className="explore-list">
        {list.map(a => (
          <button key={a.id} className="explore-row" onClick={() => onOpen(a)} style={{ '--accent': CAT[a.cat].accent }}>
            <span className="explore-row-dot" />
            <span className="explore-row-text"><strong>{a.t}</strong><small>{CAT[a.cat].label}</small></span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

function LifeMapScreen({ progress, onExploreCat }) {
  const counts = useMemo(() => categoryDoneCounts(progress), [progress]);
  const max = Math.max(1, ...Object.values(counts));
  const sorted = [...CATEGORIES].sort((a, b) => counts[b.id] - counts[a.id]);
  const strong = sorted.slice(0, 2).filter(c => counts[c.id] > 0);
  const quiet = sorted.slice().reverse().slice(0, 3);

  const total = progress.done.length;
  const thisMonth = progress.done.filter(d => {
    const dt = new Date(d.at); const now = new Date();
    return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
  }).length;
  const solo = progress.done.filter(d => ACTIVITIES.find(a => a.id === d.id)?.social === 'alone').length;
  const social = total - solo;
  const courageCount = progress.done.filter(d => (ACTIVITIES.find(a => a.id === d.id)?.courage || 0) >= 2).length;
  const catsExplored = new Set(progress.done.map(d => ACTIVITIES.find(a => a.id === d.id)?.cat)).size;

  return (
    <div className="lifemap">
      <h2 className="section-title">Your life is getting wider</h2>
      <div className="stats-grid">
        <Stat label="New experiences" value={thisMonth} sub="this month" />
        <Stat label="Firsts" value={progress.firsts.length} sub="all time" />
        <Stat label="Comfort-zone moments" value={courageCount} sub="all time" />
        <Stat label="Categories touched" value={`${catsExplored}/${CATEGORIES.length}`} sub="" />
        <Stat label="Solo experiences" value={solo} sub="" />
        <Stat label="Shared experiences" value={social} sub="" />
      </div>

      <p className="map-note">
        {total === 0 && 'Nothing recorded yet \u2014 the map fills in as you live, not as you plan.'}
        {total > 0 && strong.length > 0 && `You\u2019ve been leaning into ${strong.map(c => c.label.toLowerCase()).join(' and ')} lately.`}
        {total > 0 && ` There\u2019s room in ${quiet.map(c => c.label.toLowerCase()).join(', ')} whenever you feel like it \u2014 no rush.`}
      </p>

      <div className="map-bars">
        {CATEGORIES.map(c => (
          <button key={c.id} className="map-bar-row" onClick={() => onExploreCat(c.id)}>
            <span className="map-bar-label">{c.label}</span>
            <span className="map-bar-track"><span className="map-bar-fill" style={{ width: `${(counts[c.id] / max) * 100}%`, background: c.accent }} /></span>
            <span className="map-bar-count">{counts[c.id]}</span>
          </button>
        ))}
      </div>
      <p className="map-disclaimer">This isn\u2019t a scorecard. A quiet week doesn\u2019t mean you\u2019re behind.</p>
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function PlanScreen({ progress, persist, onOpen, onDo, onSave, savedSet }) {
  const [open, setOpen] = useState('tomorrow');

  const tomorrow = useMemo(() => {
    const base = { timeKey: 'nolimit' };
    const easy = recommend(progress, { ...base, modeKey: 'ordinary' }, 3)[0];
    const expansion = recommend(progress, { ...base, modeKey: 'expansion' }, 3)[0];
    const social = ACTIVITIES.filter(a => ['friends', 'strangers', 'group', 'family'].includes(a.social)).sort(() => Math.random() - 0.5)[0];
    const unusual = ACTIVITIES.filter(a => a.nov >= 2).sort(() => Math.random() - 0.5)[0];
    const challenge = recommend(progress, { ...base, modeKey: 'challenge' }, 3)[0];
    return [
      { label: 'Easy', a: easy }, { label: 'Expansion', a: expansion }, { label: 'Social', a: social },
      { label: 'Unusual', a: unusual }, { label: 'Challenge', a: challenge },
    ].filter(x => x.a);
  }, [progress, open]);

  const weekend = useMemo(() => {
    const picks = recommend(progress, { timeKey: 'nolimit' }, 10)
      .filter(a => ['evening', 'day', 'weekend'].includes(a.dur));
    const chosen = [];
    const usedCats = new Set();
    for (const a of picks) {
      if (chosen.length >= 3) break;
      if (usedCats.has(a.cat)) continue;
      chosen.push(a); usedCats.add(a.cat);
    }
    return chosen;
  }, [progress, open]);

  const weekFirst = useMemo(() => {
    const wk = isoWeekKey();
    if (progress.weeklyFirst?.week === wk) {
      return ACTIVITIES.find(a => a.id === progress.weeklyFirst.id);
    }
    const doneIds = new Set(progress.done.map(d => d.id));
    const candidates = ACTIVITIES.filter(a => a.first && !doneIds.has(a.id));
    const pick = candidates.sort(() => Math.random() - 0.5)[0];
    if (pick) persist({ ...progress, weeklyFirst: { week: wk, id: pick.id } });
    return pick;
  }, [open]);

  const monthPick = useMemo(() => {
    const mk = monthKey();
    if (progress.monthlyExpansion?.month === mk) {
      return ACTIVITIES.find(a => a.id === progress.monthlyExpansion.id);
    }
    const doneIds = new Set(progress.done.map(d => d.id));
    const candidates = ACTIVITIES.filter(a => (a.mode === 'expansion' || a.mode === 'big') && !doneIds.has(a.id) && ['day', 'weekend', 'weeks'].includes(a.dur));
    const pick = candidates.sort(() => Math.random() - 0.5)[0];
    if (pick) persist({ ...progress, monthlyExpansion: { month: mk, id: pick.id } });
    return pick;
  }, [open]);

  const someday = useMemo(() => ACTIVITIES.filter(a => a.mode === 'big'), []);

  const sections = [
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'weekend', label: 'Weekend Generator' },
    { id: 'first', label: 'One First This Week' },
    { id: 'month', label: 'Monthly Expansion' },
    { id: 'someday', label: 'Someday List' },
  ];

  return (
    <div className="plan">
      <h2 className="section-title">Plan Ahead</h2>
      <div className="filter-scroll">
        {sections.map(s => (
          <button key={s.id} className={`filter-chip ${open === s.id ? 'filter-chip-on' : ''}`} onClick={() => setOpen(s.id)}>{s.label}</button>
        ))}
      </div>

      {open === 'tomorrow' && (
        <div className="plan-section">
          <p className="plan-lead">Five ways to shape tomorrow \u2014 pick one, or none.</p>
          {tomorrow.map(({ label, a }) => (
            <div key={label} className="plan-item">
              <span className="plan-item-label">{label}</span>
              <ActivityCard a={a} onDo={onDo} onSave={onSave} onOpen={onOpen} saved={savedSet.has(a.id)} />
            </div>
          ))}
        </div>
      )}

      {open === 'weekend' && (
        <div className="plan-section">
          <p className="plan-lead">A mini weekend \u2014 enough to feel full, not so much it feels like work.</p>
          {weekend.map(a => <ActivityCard key={a.id} a={a} onDo={onDo} onSave={onSave} onOpen={onOpen} saved={savedSet.has(a.id)} />)}
        </div>
      )}

      {open === 'first' && weekFirst && (
        <div className="plan-section">
          <p className="plan-lead">Something you\u2019ve probably never done, chosen for this week.</p>
          <ActivityCard a={weekFirst} onDo={onDo} onSave={onSave} onOpen={onOpen} saved={savedSet.has(weekFirst.id)} />
        </div>
      )}

      {open === 'month' && monthPick && (
        <div className="plan-section">
          <p className="plan-lead">One thing worth planning for this month.</p>
          <ActivityCard a={monthPick} onDo={onDo} onSave={onSave} onOpen={onOpen} saved={savedSet.has(monthPick.id)} />
        </div>
      )}

      {open === 'someday' && (
        <div className="plan-section">
          <p className="plan-lead">Larger experiences worth having, someday.</p>
          {someday.map(a => <ActivityCard key={a.id} a={a} onSave={onSave} onOpen={onOpen} saved={savedSet.has(a.id)} />)}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- STYLES ----------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

.wider-root {
  --bg: #EDE8DE; --surface: #F8F5EE; --surface-2: #FBF9F5; --ink: #262620;
  --ink-soft: #6B6656; --hair: #DDD5C2; --sage: #6E7F5C; --clay: #A8623D;
  --gold: #B8863B; --blue: #4C6580;
  font-family: 'Inter', -apple-system, sans-serif;
  color: var(--ink);
  background: var(--bg);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.wider-root * { box-sizing: border-box; }
.loading-root { display:flex; align-items:center; justify-content:center; height:100vh; }
.loading-mark { font-family:'Fraunces',serif; font-size:28px; letter-spacing:0.02em; color:var(--ink-soft); }

.app-shell { max-width: 520px; margin: 0 auto; min-height: 100vh; display:flex; flex-direction:column; background: var(--bg); position:relative; }

.topbar { display:flex; align-items:center; justify-content:space-between; padding: 16px 18px 10px; }
.topbar-title { font-family:'Fraunces',serif; font-weight:600; font-size:17px; letter-spacing:0.03em; }
.topbar-spacer { width: 30px; }
.icon-btn { background:none; border:none; color:var(--ink); cursor:pointer; padding:4px; display:flex; }

.screen { flex:1; padding: 6px 18px 100px; overflow-y:auto; animation: fadeIn 0.35s ease; }
@keyframes fadeIn { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }

.bottomnav { position:sticky; bottom:0; display:flex; background: var(--surface-2); border-top:1px solid var(--hair); padding: 8px 6px calc(8px + env(safe-area-inset-bottom)); max-width:520px; margin:0 auto; width:100%; }
.navbtn { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; background:none; border:none; color:var(--ink-soft); font-size:10.5px; font-family:'Inter'; padding:4px 2px; cursor:pointer; }
.navbtn-active { color: var(--ink); }
.navbtn-active svg { color: var(--sage); }

/* HOME */
.home { padding-top: 8px; }
.eyebrow { font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:0.06em; text-transform:uppercase; color: var(--sage); margin: 0 0 10px; }
.hero-title { font-family:'Fraunces',serif; font-weight:500; font-size:32px; line-height:1.15; margin:0 0 14px; }
.hero-sub { color: var(--ink-soft); font-size:14px; line-height:1.5; margin:0 0 26px; }
.cta { width:100%; background: var(--ink); color: var(--surface-2); border:none; border-radius: 14px; padding: 17px 20px; font-family:'Fraunces',serif; font-size:16px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; transition: transform 0.15s ease; }
.cta:active { transform: scale(0.98); }
.nl-box { display:flex; gap:8px; margin-top:14px; }
.nl-input { flex:1; background: var(--surface); border:1px solid var(--hair); border-radius:12px; padding:13px 14px; font-size:13.5px; color:var(--ink); font-family:'Inter'; }
.nl-input::placeholder { color: var(--ink-soft); }
.nl-send { background: var(--surface); border:1px solid var(--hair); border-radius:12px; width:44px; display:flex; align-items:center; justify-content:center; color:var(--ink); cursor:pointer; }
.home-row { display:flex; gap:10px; margin-top: 22px; }
.tile { flex:1; background: var(--surface); border:1px solid var(--hair); border-radius:14px; padding:16px 14px; display:flex; flex-direction:column; align-items:flex-start; gap:6px; cursor:pointer; color:var(--ink); }
.tile span { font-family:'Fraunces',serif; font-size:14px; }
.tile small { color:var(--ink-soft); font-size:11.5px; }
.home-footnote { margin-top:26px; font-size:12.5px; color: var(--ink-soft); text-align:center; }

/* QUIZ */
.quiz { padding-top: 10px; }
.quiz-back { background:none; border:none; color:var(--ink-soft); font-size:13px; display:flex; align-items:center; gap:2px; cursor:pointer; padding:0 0 20px; }
.quiz-progress { font-family:'IBM Plex Mono'; font-size:11px; color:var(--ink-soft); margin:0 0 6px; }
.quiz-title { font-family:'Fraunces',serif; font-size:24px; font-weight:500; margin: 0 0 22px; }
.quiz-options { display:flex; flex-direction:column; gap:9px; }
.quiz-opt { text-align:left; background: var(--surface); border:1px solid var(--hair); border-radius:12px; padding:15px 16px; font-size:14.5px; color:var(--ink); cursor:pointer; font-family:'Inter'; }
.quiz-opt:active { background: var(--surface-2); }

/* SECTION TITLE */
.section-title { font-family:'Fraunces',serif; font-weight:500; font-size:21px; margin: 10px 0 16px; }
.empty { color:var(--ink-soft); font-size:13.5px; }

/* CARD */
.card { background: var(--surface); border:1px solid var(--hair); border-left: 3px solid var(--accent, var(--sage)); border-radius:14px; padding:16px; margin-bottom:14px; position:relative; }
.card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.card-cat { font-family:'IBM Plex Mono'; font-size:10.5px; text-transform:uppercase; letter-spacing:0.04em; color:var(--ink-soft); }
.stamp { font-family:'IBM Plex Mono'; font-size:9.5px; text-transform:uppercase; letter-spacing:0.05em; padding:3px 8px; border-radius:20px; border:1px solid var(--hair); transform: rotate(-2deg); display:inline-block; color: var(--ink-soft); }
.stamp-ordinary { color: var(--blue); border-color: var(--blue); }
.stamp-expansion { color: var(--sage); border-color: var(--sage); }
.stamp-challenge { color: var(--clay); border-color: var(--clay); }
.stamp-big { color: var(--gold); border-color: var(--gold); }
.card-title { font-family:'Fraunces',serif; font-size:17px; font-weight:500; margin: 0 0 6px; cursor:pointer; line-height:1.3; }
.card-desc { font-size:13.5px; color: var(--ink); line-height:1.55; margin:0 0 8px; opacity:0.88; }
.card-reason { font-size:12px; color: var(--ink-soft); font-style: italic; margin: 0 0 10px; }
.card-meta { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px; }
.chip { font-size:11px; background: var(--surface-2); border:1px solid var(--hair); border-radius: 20px; padding:4px 10px; color:var(--ink-soft); }
.chip-gold { color:var(--gold); border-color:var(--gold); }
.chip-clay { color:var(--clay); border-color:var(--clay); }
.card-actions { display:flex; flex-wrap:wrap; gap:8px; }
.btn { display:flex; align-items:center; gap:6px; border-radius:10px; padding:9px 13px; font-size:12.5px; font-family:'Inter'; font-weight:500; cursor:pointer; border:1px solid transparent; }
.btn-primary { background: var(--ink); color: var(--surface-2); }
.btn-ghost { background: var(--surface-2); color: var(--ink); border-color: var(--hair); }
.btn-outline { background:none; color: var(--ink); border-color: var(--hair); justify-content:center; }
.btn-block { width:100%; margin-top: 4px; padding: 12px; }

/* EXPLORE */
.search-input { width:100%; background: var(--surface); border:1px solid var(--hair); border-radius:12px; padding:12px 14px; font-size:13.5px; margin-bottom:12px; }
.filter-scroll { display:flex; gap:7px; overflow-x:auto; padding-bottom:8px; margin-bottom:4px; scrollbar-width:none; }
.filter-scroll::-webkit-scrollbar { display:none; }
.filter-chip { flex-shrink:0; background: var(--surface); border:1px solid var(--hair); border-radius:20px; padding:7px 13px; font-size:12px; color:var(--ink-soft); cursor:pointer; white-space:nowrap; }
.filter-chip-on { background: var(--ink); color: var(--surface-2); border-color: var(--ink); }
.result-count { font-size:11.5px; color: var(--ink-soft); margin: 8px 0; }
.explore-list { display:flex; flex-direction:column; gap:8px; margin-top: 6px; }
.explore-row { display:flex; align-items:center; gap:11px; background: var(--surface); border:1px solid var(--hair); border-radius:12px; padding:12px 13px; cursor:pointer; text-align:left; color: var(--ink); width:100%; }
.explore-row-dot { width:8px; height:8px; border-radius:50%; background: var(--accent, var(--sage)); flex-shrink:0; }
.explore-row-text { flex:1; display:flex; flex-direction:column; gap:2px; }
.explore-row-text strong { font-family:'Fraunces',serif; font-weight:500; font-size:13.5px; }
.explore-row-text small { color: var(--ink-soft); font-size:11px; }

/* DETAIL */
.detail-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.detail-title { font-family:'Fraunces',serif; font-size:25px; font-weight:500; line-height:1.25; margin:0 0 12px; }
.detail-desc { font-size:14.5px; line-height:1.6; color: var(--ink); margin: 0 0 20px; }
.detail-grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px 16px; background: var(--surface); border:1px solid var(--hair); border-radius:14px; padding:16px; margin-bottom:18px; }
.detail-grid div { display:flex; flex-direction:column; gap:2px; }
.detail-grid small { color: var(--ink-soft); font-size:10.5px; text-transform:uppercase; letter-spacing:0.04em; }
.detail-grid strong { font-size:13.5px; font-family:'Fraunces',serif; font-weight:500; text-transform:capitalize; }
.similar { margin-top:26px; }
.similar-title { font-family:'Fraunces',serif; font-size:15px; font-weight:500; margin: 0 0 10px; }

/* MY LIFE */
.tabs { display:flex; gap:6px; overflow-x:auto; margin-bottom:16px; }
.tab { flex-shrink:0; background:none; border:1px solid var(--hair); border-radius:20px; padding:7px 12px; font-size:11.5px; color: var(--ink-soft); cursor:pointer; }
.tab-on { background: var(--ink); color: var(--surface-2); border-color: var(--ink); }

/* LIFE MAP */
.stats-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:10px; margin-bottom: 20px; }
.stat { background: var(--surface); border:1px solid var(--hair); border-radius:12px; padding:14px; }
.stat-value { font-family:'Fraunces',serif; font-size:24px; font-weight:500; }
.stat-label { font-size:11.5px; color: var(--ink-soft); margin-top:2px; }
.stat-sub { font-size:10px; color: var(--ink-soft); opacity:0.7; }
.map-note { font-size:13.5px; line-height:1.6; color: var(--ink-soft); margin-bottom:22px; }
.map-bars { display:flex; flex-direction:column; gap:11px; }
.map-bar-row { display:flex; align-items:center; gap:10px; background:none; border:none; cursor:pointer; padding:0; width:100%; }
.map-bar-label { width:118px; font-size:11.5px; color: var(--ink); text-align:left; flex-shrink:0; }
.map-bar-track { flex:1; height:6px; background: var(--surface); border-radius:4px; overflow:hidden; }
.map-bar-fill { display:block; height:100%; border-radius:4px; transition: width 0.4s ease; }
.map-bar-count { width:18px; text-align:right; font-family:'IBM Plex Mono'; font-size:11px; color: var(--ink-soft); }
.map-disclaimer { margin-top:24px; font-size:12px; color: var(--ink-soft); font-style:italic; text-align:center; }

/* PLAN */
.plan-lead { font-size:13px; color: var(--ink-soft); margin: 0 0 16px; }
.plan-item-label { font-family:'IBM Plex Mono'; font-size:10.5px; text-transform:uppercase; letter-spacing:0.05em; color: var(--sage); display:block; margin-bottom:6px; }

/* TOAST */
.toast { position:fixed; top:16px; left:50%; transform:translateX(-50%); background: var(--ink); color: var(--surface-2); font-size:12.5px; padding:9px 16px; border-radius:20px; z-index:50; box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

@media (min-width: 640px) {
  .app-shell { border-left:1px solid var(--hair); border-right:1px solid var(--hair); }
}
`;
