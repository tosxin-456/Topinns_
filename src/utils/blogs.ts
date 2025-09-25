// blogData.ts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  content: string;
  category: string;
  readTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Fragments of Code, Fragments of Self",
    excerpt:
      "Sometimes I look at old projects and see not just logic, but echoes of who I was at that time—what I feared, what I hoped for, what I believed software could be. Code becomes a diary, even when I never meant it to...",
    author: "Topinns",
    date: "September 20, 2025",
    category: "Reflection",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    content: `
      Opening an old repository feels like flipping through a forgotten journal. 
      Functions are written with a kind of urgency that belonged to a younger me, 
      one who believed elegance was the same thing as worth.  

      I can see in the indentation where I rushed, in the variable names where I dreamed. 
      A half-finished feature is not just technical debt, but a fossil of my distraction, 
      or perhaps my heartbreak that week.  

      Every developer, whether they admit it or not, leaves parts of themselves in the code. 
      Not just algorithms, but anxieties. Not just syntax, but longing.  

      And so, even when a project dies, fragments of me remain there—shadows I did not 
      intend to preserve. Maybe that’s what makes revisiting old code both painful and 
      strangely tender. I’m not just debugging programs; I’m debugging myself.`
  },
  {
    id: 2,
    title: "The Silence Between Deploys",
    excerpt:
      "There’s a stillness that lingers right after pushing new changes into the world. It feels like holding your breath, waiting to see if the universe accepts or rejects your offering. Failure humbles, success whispers relief...",
    author: "Topinns",
    date: "September 15, 2025",
    category: "Philosophy",
    readTime: "11 min",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    content: `
      The moment after deployment is a peculiar kind of quiet.  
      You’ve typed \`git push\`, the logs have streamed by, and now you wait.  

      It’s not really about the code anymore—it’s about exposure. 
      Will the users see the update and feel nothing, or will they stumble 
      into a bug you missed?  

      In that pause, time stretches. My heartbeat sounds louder than the fan 
      of my machine. I am reminded that software is not a private act. 
      It is a conversation, whether I like it or not.  

      If things break, the silence ends with alerts, Slack messages, maybe even blame.  
      If things hold, the silence deepens into something else: a relief so gentle 
      it barely announces itself.  

      This is the rhythm of creation in code: the chaos of making, 
      the silence of waiting, the whisper of consequence.`
  },
  {
    id: 3,
    title: "When Systems Outlive Their Creators",
    excerpt:
      "I’ve walked through codebases older than my career, written by hands that may never return. There’s a haunting beauty in systems that persist long after the minds that birthed them have moved on. Maintenance is memory work...",
    author: "Topinns",
    date: "September 10, 2025",
    category: "Technology",
    readTime: "14 min",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    content: `
      Some systems feel like ruins—still standing, still functional, 
      but clearly belonging to another era.  
      Their patterns are archaic, their dependencies forgotten, 
      their documentation missing.  

      And yet, they work.  
      They carry the weight of countless transactions, decisions, lives.  

      When I step into these codebases, I feel like an archaeologist. 
      Every function call is an inscription. Every hack is a rumor.  
      I’ll never know the full story of the people who built them, 
      but I can sense their presence.  

      Maintenance is not just about keeping systems alive. 
      It’s about remembering that behind every enduring architecture 
      was once a mind trying to solve a problem.  

      To maintain is to honor. To rewrite is to mourn.`
  },
  {
    id: 4,
    title: "The Weight of Abandoned Repositories",
    excerpt:
      "Every forgotten GitHub repo feels like a tiny gravestone. They hold experiments that never bloomed, ideas that lost their urgency, versions of ourselves we quietly buried. Sometimes I scroll through them like a mourner...",
    author: "Topinns",
    date: "September 7, 2025",
    category: "Craft",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    content: `
      I have dozens of repositories that will never see another commit.  
      Some were prototypes, some were wild ideas, some were fragile bursts of hope.  

      They sit in my GitHub like little tombstones, each one a project 
      that carried me for a season and then let me go.  

      Sometimes I wonder: are these failures? Or are they simply traces 
      of growth—projects that taught me something before they became unnecessary?  

      Abandoned code is heavy because it mirrors the parts of ourselves 
      we’ve also abandoned. The dreams we had, the energy we’ve lost, 
      the illusions we’ve shed.  

      But maybe that’s what craft really is: not every seed growing into a tree, 
      but every attempt leaving behind something that shaped us, even in silence.`
  },
  {
    id: 5,
    title: "Some Nights, the Code Doesn’t Save Me",
    excerpt:
      "This is one of those vanity-card entries. No clever abstractions, no grand conclusions. Just the quiet admission that some nights, even in front of glowing screens, the loneliness is louder than the syntax...",
    author: "Topinns",
    date: "September 3, 2025",
    category: "Vanity",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    content: `
      Most nights, I lose myself in code. The logic consumes me, 
      the puzzle distracts me, and the loneliness fades.  

      But not always.  

      Some nights the keystrokes sound hollow. The monitor feels cold. 
      The compiler cannot fix what is broken inside me.  

      I remind myself that being human is not a bug.  
      That emptiness, too, is part of the design.  

      And on those nights, I close the laptop not as a developer, 
      but as a person—one who needs silence, rest, 
      maybe even someone else’s presence more than another line of code.`
  },
  {
    id: 6,
    title: "Patterns in the Chaos of Frameworks",
    excerpt:
      "New tools rise every month, promising salvation, efficiency, elegance. Most will fade, but hidden beneath the churn are patterns—enduring truths about how humans attempt to tame complexity. The noise conceals a quiet order...",
    author: "Topinns",
    date: "August 29, 2025",
    category: "Technology",
    readTime: "13 min",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    content: `
      The tech landscape is a storm of frameworks.  
      React gives way to Svelte, which gives way to the next thing.  
      Each promises to be the future, each gathers disciples, 
      and each eventually fades into the archive.  

      At first it feels exhausting—how can we ever keep up?  
      But beneath the churn, there are patterns.  
      Frameworks rise and fall, but the problems remain the same: 
      state, rendering, data flow, human comprehension.  

      What changes is the syntax, the packaging, the story we tell ourselves 
      about control.  

      The truth is, frameworks are less about technology 
      and more about our relationship with complexity.  
      They are mirrors of our desires: for order, for clarity, 
      for the illusion that we can outpace chaos.  

      The frameworks will keep coming. The patterns will remain.`
  }
];