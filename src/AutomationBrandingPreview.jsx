import { useState, useEffect } from 'react';
import profilePhoto from './assets/profilePhotoRound.png';
import heroLaptop from './assets/laptop.jpg';
import powerAutomateLogo from './assets/Power-Automate-Logo.webp';
import uipathLogo from './assets/uipath-logo-transparent.png';
import n8nLogo from './assets/N8n-logo-new.svg';
import makeLogo from './assets/MakeLogo.png';
import zapierLogo from './assets/Zapier_logo.svg';

// Blog post data
const blogPosts = [
  {
    id: 'vector-vs-graph-rag',
    title: 'Vector vs Graph RAG: Which Should You Choose?',
    excerpt: 'A no-BS guide to building retrieval systems that actually work. Learn when to use vector-based vs graph-based RAG systems.',
    img: 'https://source.unsplash.com/800x600/?database,network',
    date: '2024-10-15',
    readTime: '8 min'
  },
  {
    id: 'time-saving-automations',
    title: '3 små automations der sparer 5 timer/uge',
    excerpt: 'Korte indlæg: 1 problem → 1 løsning → 1 takeaway',
    img: 'https://source.unsplash.com/800x600/?productivity,time',
    date: '2024-10-10',
    readTime: '5 min'
  },
  {
    id: 'power-automate-vs-n8n',
    title: 'Power Automate vs n8n—hvornår vælger jeg hvad?',
    excerpt: 'Korte indlæg: 1 problem → 1 løsning → 1 takeaway',
    img: 'https://source.unsplash.com/800x600/?compare,versus',
    date: '2024-10-05',
    readTime: '6 min'
  }
];

// Project data and Tech explainers (ids used for routing)
const projectItems = [
  { id: 'sharepoint-excel-sync', title: 'SharePoint ↔ Excel sync (Power Automate)', img: 'https://source.unsplash.com/800x600/?flowchart,diagram', problem: 'Manuel dataflyt gav fejl og forsinkelser', learn: 'Brug datavalidering + fejlhåndtering med retries' },
  { id: 'legacy-desktop-rpa', title: 'Legacy desktop RPA (UiPath)', img: 'https://source.unsplash.com/800x600/?robot,automation', problem: 'Intet API — kun GUI. Behov for robust klik/submit', learn: 'Stabile selectors + logning + kill-switch' },
  { id: 'webhook-to-crm', title: 'Webhook → CRM (n8n/Make)', img: 'https://source.unsplash.com/800x600/?webhook,api', problem: 'Leads gik tabt mellem formular og CRM', learn: 'Idempotency keys + dead-letter queue' },
];

const techExplainers = [
  { id: 'power-automate', name: 'Power Automate', bullets: ['God i Microsoft 365-stack', 'Hurtig at komme i gang', 'Low kode'] },
  { id: 'uipath', name: 'UiPath', bullets: ['Stærk til legacy/desktop', 'Enterprise features', 'Robuste workflows'] },
  { id: 'n8n', name: 'n8n', bullets: ['Self-host', 'Open source', 'Fleksible nodes'] },
  { id: 'make', name: 'Make.com', bullets: ['Visuelt let', 'Mange integrationer', 'God til prototyper'] },
  { id: 'zapier', name: 'Zapier', bullets: ['Hurtig prototyping', 'Stor app-økologi', 'Begrænsning v. skala'] },
  { id: 'best-practice', name: 'Best practice', bullets: ['Fejlhåndtering', 'Logging/monitorering', 'ROI-måling'] },
];

// Generated gradient cover (no external images)
function GeneratedCover({ seed = 'X', label, ratio = 'aspect-[4/3]' }) {
  const text = label || (seed && seed[0] ? seed[0] : '•');
  // deterministic hue from seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const hue = ((hash % 360) + 360) % 360;
  const hue2 = (hue + 35) % 360;
  const bg = `linear-gradient(135deg, hsl(${hue} 70% 12%), hsl(${hue2} 70% 8%))`;
  const grid = `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1px)`;

  return (
    <div className={`${ratio} relative overflow-hidden rounded-2xl`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `${bg}, ${grid}`,
          backgroundSize: `100% 100%, 24px 24px`,
          backgroundBlendMode: 'normal, overlay',
        }}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <span className="select-none text-6xl md:text-7xl font-bold text-white/15">
          {text}
        </span>
      </div>
    </div>
  );
}

// Router component
function Router() {
  const [currentPage, setCurrentPage] = useState('home');
  const [blogPostId, setBlogPostId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [techId, setTechId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('blog/')) {
        const id = hash.split('/')[1];
        setCurrentPage('blog-post');
        setBlogPostId(id);
        setProjectId(null);
        setTechId(null);
      } else if (hash.startsWith('project/')) {
        const id = hash.split('/')[1];
        setCurrentPage('project');
        setProjectId(id);
        setBlogPostId(null);
        setTechId(null);
      } else if (hash.startsWith('tech/')) {
        const id = hash.split('/')[1];
        setCurrentPage('tech');
        setTechId(id);
        setBlogPostId(null);
        setProjectId(null);
      } else {
        setCurrentPage('home');
        setBlogPostId(null);
        setProjectId(null);
        setTechId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'blog-post' && blogPostId) {
    return <BlogPost postId={blogPostId} />;
  }
  if (currentPage === 'project' && projectId) {
    return <ProjectDetail id={projectId} />;
  }
  if (currentPage === 'tech' && techId) {
    return <TechDetail id={techId} />;
  }

  return <HomePage />;
}

// Blog Post Component
function BlogPost({ postId }) {
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <Header />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <a href="#home" className="mt-6 inline-block text-neutral-300 hover:text-white">← Back to Home</a>
        </div>
      </div>
    );
  }

  const blogContent = postId === 'vector-vs-graph-rag' ? `Vector vs Graph RAG: Which Should You Choose?

A no-BS guide to building retrieval systems that actually work

Last month, I was building a RAG system for for my class "AI & automation, and I hit that classic fork in the road: vector-based or graph-based? Everyone online was screaming about embeddings and vector databases, but something felt off. The client's data was deeply interconnected - every concept linked to three others, and those linked to five more. A simple vector search would miss all that context.

So I went down the rabbit hole. Turns out, the vector vs graph debate isn't just academic BS - it actually matters for what you're building. Here's what I learned.

## The Big Question

So you're building a RAG system, huh? Cool. But here's the million-dollar question - should you go with vector-based or graph-based? 

Well first of all we need to understand what the difference is - what is the difference? 

Maybe we should start with what they have in common for the peeps who don't actually know. 

## What Even Is RAG?

RAG, also called Retrieval Augmented Generation, is essentially what it implies - a retrieval of an augmented something compiled to a generation that can be understood by an underlying LLM. 

Okay, let me break that down without all the jargon. Think of it like this: your LLM is smart, but it doesn't know everything (especially your specific data). So RAG is basically a fancy way of saying "let's give the LLM access to relevant information right when it needs it."

The process goes something like:
1. You ask a question
2. The system retrieves relevant information from your knowledge base
3. That info gets fed to the LLM along with your question
4. The LLM generates an answer based on both your question AND the retrieved context

Pretty straightforward, right?

## Vector-Based RAG: The Popular Kid

This is what most people think of when they hear "RAG system." Here's how it works:

You take all your documents, break them into chunks, convert them into embeddings (basically fancy numerical representations), and store them in a vector database. When someone asks a question, you convert that question into an embedding too, then do a similarity search to find the most relevant chunks.

**The good stuff:**
- Fast as hell for similarity searches
- Works great for semantic understanding
- Scales pretty well
- Tons of tools and libraries already exist (Pinecone, Weaviate, Chroma, etc.)

**The not-so-good stuff:**
- Context can get lost when you're chunking documents
- Relationships between pieces of information? Not really captured
- If your data has complex interconnections, you might be screwed

**Real-world use case:** I used vector RAG for a FAQ bot. Simple questions, independent answers, no complex relationships. Worked like a charm. Got it up in a weekend.

## Graph-Based RAG: The Smart Alternative

Now this is where things get interesting. Instead of just throwing everything into vectors, graph-based RAG actually understands the relationships between different pieces of information.

Think of it like this - instead of just knowing "Document A mentions machine learning" and "Document B mentions neural networks," a graph knows that "Document A's discussion of machine learning is specifically related to the supervised learning section in Document B, which references the neural network architecture in Document C."

**Why it's dope:**
- Preserves relationships and context
- Better for complex, interconnected knowledge
- Can traverse connections to find more nuanced answers
- Great for when you need to reason across multiple related concepts

**The downsides:**
- More complex to set up
- Can be slower for simple queries
- Requires more thoughtful data modeling upfront
- Not as many plug-and-play tools

**Real-world use case:** That client I mentioned? Their technical documentation had everything linked - API endpoints referenced auth methods, which referenced security policies, which referenced compliance requirements. Graph RAG let us traverse those connections and give complete, contextualized answers. Worth the extra setup time.

## So... Which One Should You Use?

Here's the real talk - it depends on your use case.

**Go vector-based if:**
- You're just getting started
- Your data is mostly independent documents
- Speed is critical
- You want something up and running quickly
- Your queries are straightforward find similar content style

**Go graph-based if:**
- Your data has complex relationships
- Context and connections matter a lot
- You're building something for the long haul
- You need to answer questions that require reasoning across multiple related concepts
- You're willing to invest time in proper data modeling

**Or hey, why not both?** Some of the best systems actually combine both approaches - using vectors for initial fast retrieval and graphs for understanding relationships and context. It's called hybrid RAG and it's honestly where the field is heading.

Here's how that works:
1. Use vector search to quickly find the top 50 relevant chunks
2. Use graph traversal to explore relationships within those chunks
3. Re-rank based on both semantic similarity AND relational relevance
4. Feed the enriched context to your LLM

## A Quick Decision Framework

Still not sure? Ask yourself these questions:

1. Can you explain your data structure in a simple list? Go Vector
2. Do you find yourself saying it depends a lot? Go Graph
3. Is this a proof of concept or MVP? Go Vector for now
4. Will users ask multi-hop questions? Go Graph or Hybrid
5. Do you have less than a week to ship? Go Vector

## Next Steps

Whichever path you choose, remember that RAG is all about giving your LLM the right information at the right time. Start simple, test with real queries, and iterate based on what actually works for your use case.

And honestly? Don't overthink it. Build something, see how it performs, and adjust. That's how we all figure this stuff out anyway.

Want to dive deeper? I'm planning follow-up posts on building a hybrid RAG system from scratch, optimizing chunk sizes and retrieval strategies, and handling multi-lingual RAG systems.

Drop a comment below with what you'd like to see next, or if you've got your own RAG war stories to share. I'm always down to hear what's working or not working for other folks building these systems.` : 'Blog content coming soon...';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      
      <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <a href="#blog" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          Back to Blog
        </a>

        <header className="mb-12">
          <div className="mb-4 flex items-center gap-4 text-sm text-neutral-400">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>•</span>
            <span>{post.readTime} læsning</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">{post.title}</h1>
          <p className="text-xl text-neutral-300">{post.excerpt}</p>
        </header>

        <GeneratedCover seed={post.title} label="📝" ratio="aspect-[2/1]" />

        <div className="prose prose-invert prose-neutral max-w-none">
          {blogContent.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-semibold mt-10 mb-4">{line.slice(3)}</h2>;
            } else if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="font-semibold mt-6 mb-3">{line.slice(2, -2)}</p>;
            } else if (line.startsWith('- ')) {
              return <li key={i} className="ml-6 mb-2 text-neutral-300 list-disc">{line.slice(2)}</li>;
            } else if (line.trim() === '') {
              return <div key={i} className="h-4" />;
            } else if (line.match(/^\d+\./)) {
              return <li key={i} className="ml-6 mb-2 text-neutral-300 list-decimal">{line.slice(line.indexOf('.') + 1).trim()}</li>;
            } else {
              return <p key={i} className="mb-4 leading-relaxed text-neutral-300">{line}</p>;
            }
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
              KG
            </div>
            <div>
              <h3 className="font-semibold">Klaus Gregersen</h3>
              <p className="text-sm text-neutral-400">Automation Developer & Datamatiker-studerende</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <a href="#blog" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            Back to Blog
          </a>
        </div>
      </article>
    </div>
  );
}

// Project Detail Page (lorem ipsum)
function ProjectDetail({ id }) {
  // Try to find a matching item; fall back to generic if not found
  const item = projectItems.find(p => p.id === id) || {
    title: `Project ${id}`,
    img: 'https://source.unsplash.com/1200x600/?project',
    problem: '—',
    learn: '—',
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <a href="#projects" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          Back to Projects
        </a>

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">{item.title}</h1>
          <p className="text-neutral-300">Problem: {item.problem}</p>
          <p className="text-neutral-300">Læring: {item.learn}</p>
        </header>

        <GeneratedCover seed={item.title} label="⚙️" ratio="aspect-[2/1]" />

        <div className="prose prose-invert prose-neutral max-w-none">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
            dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
          </p>
          <p>
            Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
            enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae,
            consequat in, pretium a, enim.
          </p>
        </div>

        <div className="mt-8">
          <a href="#projects" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            Back to Projects
          </a>
        </div>
      </article>
    </div>
  );
}

// Tech Explainer Detail Page (lorem ipsum)
function TechDetail({ id }) {
  const t = techExplainers.find(x => x.id === id) || { name: `Tech Explainer ${id}` };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <a href="#tech" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          Back to Tech
        </a>

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">{t.name}</h1>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.
            Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.
          </p>
          <p>
            Maecenas faucibus mollis interdum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
            Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue.
          </p>
        </div>

        <div className="mt-8">
          <a href="#tech" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            Back to Tech
          </a>
        </div>
      </article>
    </div>
  );
}

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#home" className="text-lg font-semibold tracking-tight">Klaus Gregersen • Automation</a>
        
        <div className="hidden gap-6 md:flex">
          <a href="#projects" className="text-sm text-neutral-300 hover:text-white transition-colors">Projects</a>
          <a href="#tech" className="text-sm text-neutral-300 hover:text-white transition-colors">Tech Explainers</a>
          <a href="#blog" className="text-sm text-neutral-300 hover:text-white transition-colors">Blog</a>
          <a href="#about" className="text-sm text-neutral-300 hover:text-white transition-colors">About</a>
          <a href="#contact" className="text-sm text-neutral-300 hover:text-white transition-colors">Contact</a>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5A2.25 2.25 0 0117.25 19.5H6.75A2.25 2.25 0 014.5 17.25V6.75zM6 8.25l6 4.5 6-4.5" />
          </svg>
          Connect
        </a>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-neutral-950">
          <div className="flex flex-col gap-1 px-4 py-3">
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Projects</a>
            <a href="#tech" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Tech Explainers</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Blog</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />

      <section id="home" className="relative isolate bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-20 relative">
          <div className="absolute inset-0 -z-10 h-full w-full rounded-2xl overflow-hidden">
            <img
              src={heroLaptop}
              alt="Laptop workspace hero"
              className="w-full h-full object-cover opacity-99"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/60 to-neutral-950/80" />
          </div>

          <div className="relative max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
              Automation • RPA
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Automatisering gjort simpelt—
              <span className="text-white/80"> i øjenhøjde</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300">
              Jeg dokumenterer min rejse mod at blive automation-ekspert: små projekter, korte tech-forklaringer
              (Power Automate, UiPath, n8n, Make, Zapier) og konkrete tips du kan bruge med det samme.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors">Se projekter</a>
              <a href="#tech" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">Tech explainers</a>
              <a href="#contact" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">Følg mig på LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Projects & Case Studies</h2>
            <p className="mt-2 text-sm text-neutral-300">Små showcases: problem → løsning → læring</p>
          </div>
          <a href="#blog" className="text-sm text-neutral-300 hover:text-white transition-colors">Se flere i bloggen →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SharePoint ↔ Excel sync (Power Automate)",
              img: "https://source.unsplash.com/800x600/?flowchart,diagram",
              problem: "Manuel dataflyt gav fejl og forsinkelser",
              learn: "Brug datavalidering + fejlhåndtering med retries",
            },
            {
              title: "Legacy desktop RPA (UiPath)",
              img: "https://source.unsplash.com/800x600/?robot,automation",
              problem: "Intet API—kun GUI. Behov for robust klik/submit",
              learn: "Stabil selectors + logning + kill-switch",
            },
            {
              title: "Webhook → CRM (n8n/Make)",
              img: "https://source.unsplash.com/800x600/?webhook,api",
              problem: "Leads gik tabt mellem formular og CRM",
              learn: "Idempotency keys + dead-letter queue",
            },
          ].map((p, i) => (
            <article key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
              <GeneratedCover seed={p.title} label="⚙️" />
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <div className="text-sm text-neutral-300">
                  <p>
                    <span className="font-medium text-white">Problem:</span> {p.problem}
                  </p>
                  <p>
                    <span className="font-medium text-white">Læring:</span> {p.learn}
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-300 group-hover:text-white transition-colors">
                    Læs mere
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
              <a href={`#project/${i}`} className="absolute inset-0" aria-label={`Open ${p.title}`}></a>
            </article>
          ))}
        </div>
      </section>

      <section id="tech" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Tech Explainers
        </h2>
        <p className="mt-2 text-sm text-neutral-300">
          Korte, konkrete forklaringer med hvornår/hvorfor
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Power Automate",
              bullets: ["God i Microsoft 365-stack", "Hurtig at komme i gang", "Low kode"],
              img: powerAutomateLogo,
            },
            {
              name: "UiPath",
              bullets: ["Stærk til legacy/desktop", "Enterprise features", "Robuste workflows"],
              img: uipathLogo,
            },
            {
              name: "n8n",
              bullets: ["Self-host", "Open source", "Fleksibel nodes"],
              img: n8nLogo,
            },
            {
              name: "Make.com",
              bullets: ["Visuelt let", "Mange integrationer", "God til prototyper"],
              img: makeLogo,
            },
            {
              name: "Zapier",
              bullets: ["Hurtig prototyping", "Stor app-økologi", "Begrænsning v. skala"],
              img: zapierLogo,
            },
            {
              name: "Best practice",
              bullets: ["Fejlhåndtering", "Logging/monitorering", "ROI-måling"],
              img: heroLaptop,
            },
          ].map((t, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors"
            >
              <div className="relative h-40 w-full overflow-hidden bg-white/5">
                <img
                  src={t.img}
                  alt={`${t.name} logo`}
                  className="absolute inset-0 h-full w-full object-contain p-6 filter grayscale opacity-80 saturate-50 contrast-90"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-neutral-300">
                  {t.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <div className="pt-3">
                  <button className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10 transition-colors">
                    Læs kort intro
                  </button>
                </div>
              </div>
              <a href={`#tech/${i}`} className="absolute inset-0" aria-label={`Open ${t.name}`}></a>
            </div>
          ))}
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Blog (læringslog)</h2>
          <p className="mt-2 text-sm text-neutral-300">Korte indlæg: 1 problem → 1 løsning → 1 takeaway</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
              <GeneratedCover seed={post.title} label="📝" />
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('da-DK', { month: 'short', day: 'numeric' })}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-white transition-colors">{post.title}</h3>
                <p className="text-sm text-neutral-300">{post.excerpt}</p>
                <div className="pt-2">
                  <a href={`#blog/${post.id}`} className="inline-flex items-center gap-2 text-sm text-neutral-300 group-hover:text-white transition-colors">
                    Læs indlæg →
                  </a>
                </div>
              </div>
              <a href={`#blog/${post.id}`} className="absolute inset-0" aria-label={`Open ${post.title}`}></a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Om mig</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              Datamatiker-studerende, junior konsulent og automations udvikler, der bygger automationer i praksis og deler processen åbent.
              Jeg fokuserer på simple, stabile løsninger og klare læringspointer—så andre kan genbruge mine erfaringer.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-4 text-sm text-neutral-300">
              <li>Fokus: Power Automate, UiPath, n8n, Make, Zapier</li>
              <li>Emner: AI-beslutnings-flow, SoMe-output-flows, standard RPA automatiseringer</li>
              <li>Community-CTA: del dine flows—jeg fremhæver de bedste i bloggen</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center">
           <div className="w-64 h-64 rounded-full p-[3px] bg-gradient-to-br from-neutral-700 to-neutral-900"> <img src={profilePhoto} alt="Klaus Gregersen" className="w-full h-full rounded-full object-cover" width="256" height="256" loading="lazy" decoding="async" /> </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-950 opacity-50" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Skal vi connecte?</h2>
            <p className="mt-3 max-w-2xl text-sm text-neutral-300">
              Jeg poster nye projekter og små how-tos. Har du et fedt trick eller et flow, der bare virker? Del det—måske fremhæver jeg det i et indlæg.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
                Følg mig på LinkedIn
              </a>
              <a href="#contact" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                Del et flow/tip
              </a>
              <a href="#blog" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                Læs bloggen
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-neutral-400">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p>
              © {new Date().getFullYear()} Klaus Gregersen • Personal Automation Hub
            </p>
            <div className="flex gap-5">
              <a href="#tech" className="hover:text-white transition-colors">Tech</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Router;
