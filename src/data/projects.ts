import droneVideo from '../assets/drone.mov';
import cropDatabasePdf from '../assets/crop-data-sql-database.pdf';
import cropDatabaseImage from '../assets/crop-data-sql-database.png';
import wasteRoutingImage from '../assets/greedy-waste-routing.jpg';
import jobApplicationImage from '../assets/toppile.jpg.webp';

export interface Project {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
}

export const projects: Project[] = [
  // Template for adding a new project:
  // {
  //   title: 'Project Title',
  //   slug: 'project-slug',
  //   description: 'Main project description...',
  //   technologies: ['Tech 1', 'Tech 2'],
  //   imageUrl: 'https://... or imported asset',
  //   videoUrl: optional,
  //   pdfUrl: optional,
  // },
  {
    title: 'Agentic Application System',
    slug: 'agentic-application-system',
    description:
      `**A Note Before You Read**
 I do not advocate for using AI agents to blindly apply for jobs. The application process is broken in ways that this system exposes. When a single role receives hundreds of near-identical applications, the response is to filter harder, not hire better. Automating applications at scale only perpetuates the cycle. This project is a proof of concept, to explore what autonomous agentic workflows are genuinely capable of. Real-world use should sit alongside, not replace, genuine human engagement with the process.


**The Problem**
This project started out of frustration. Applying for jobs in 2025 is repetitive and tedious. However, if something is repetitive, 9/10 times it can be automated.


 The platform is a near fully autonomous multi-agent pipeline that finds jobs, scores them against your profile, tweaks your CV and sends off an application. I built it alongside a fellow engineer.




**System Overview**


Job Discovery -> Document Generation -> Scoring -> Application


The system is coordinated by an orchestration engine managing four specialised agents: a Scout, a Matcher, a document generation agent, and a Form Filler, all built on FastAPI, Next.js 14, LiteLLM, Playwright, aiosqlite, and Docker.




 \`\`\`python
 class AutoApplyEngine:
   async def process_run(self, run):
     jobs = await self.scout.find_jobs(run.prefs)
     for job in jobs:
       score, rationale = await self.matcher.score(job, run.profile)
       if score < run.prefs.min_match_score:
         continue


       docs = await self.generator.build_documents(job, run.profile)
       if not run.prefs.dry_run:
         await self.form_filler.submit(job, docs)


     await self.state.mark_complete(run.id)
 \`\`\`


 **Finding the Jobs**
 The Scout agent crawls Indeed, LinkedIn, Adzuna, and Glassdoor simultaneously. Rather than scraping each platform naively, we modelled the web as a graph, pages are nodes, hyperlinks are edges, and built a crawler that evaluates each branch for relevance before deciding whether to follow it.


 \`\`\`python
 class GraphCrawler:
   async def crawl(self, start_urls, query_profile):
     queue = deque(start_urls)
     while queue:
       url = queue.popleft()
       page = await self.fetch(url)
       score = self.ranker.relevance(page, query_profile)
       if score < 0.5:
         continue


       yield self.extract_listing(page)
       queue.extend(self.links(page))
 \`\`\`


 Search queries are generated from the users CV using an LLM. This ensures the system understands rather than just matches keywords. hash-based deduplication cleans the data before it ever hits the database.


 \`\`\`python
 def dedupe(listings):
   seen = set()
   unique = []
   for item in listings:
     key = sha256(f"{item.company}|{item.role}|{item.location}").hexdigest()
     if key in seen:
       continue
     seen.add(key)
     unique.append(item)
   return unique
 \`\`\`


 In practice this produces 50 to 100 structured, deduplicated listings in under 30 seconds.


 **Deciding What Is Worth Applying To**
 Not every job found is worth applying to, and reading dozens of descriptions manually is one of the biggest time sinks in the process. The Matcher agent solves this by scoring each job against your CV across four weighted criteria: technical skills, experience fit, location, and salary. It returns a score between 0.0 and 1.0 with explainable reasoning, and anything below your configured threshold is skipped automatically.


 \`\`\`python
 async def score_job(job, cv_text):
   weights = {
     "technical_skills": 0.40,
     "experience_fit": 0.30,
     "location": 0.15,
     "salary": 0.15,
   }
   return await llm.match(job.description, cv_text, weights=weights)
 \`\`\`


 **Generating the Applications**
 For jobs that clear the threshold, the system detects the role type, selects the appropriate base CV and LaTeX template, and uses an LLM to generate tailored content. The LLM works with the user's own written CV so as to not generate fake information.


 \`\`\`python
 async def build_documents(job, profile):
   role_type = detect_role_type(job.description)
   base_cv = load_base_cv(role_type)
   template = load_template(role_type)


   payload = await llm.generate(role_type, job, base_cv, profile)
   validated = ApplicationPayload.model_validate(payload)


   cv_pdf = latex.render(validated.cv, template)
   cover_pdf = latex.render(validated.cover_letter, template)
   return cv_pdf, cover_pdf
 \`\`\`


 **Running Autonomously**
 The entire pipeline runs continuously via a background worker that polls for pending jobs every 30 seconds. You set your preferences and the system handles everything else.


 \`\`\`python
 async def worker_loop(engine, state):
   while True:
     run = await state.next_pending()
     if run:
       await engine.process_run(run)
     await asyncio.sleep(30)
 \`\`\`




 **What I Took Away**
 This is the most technically demanding thing I have built, even if alongside another engineer. Working closely with a fellow engineer pushed me to think more carefully about system design, code organisation, and how to divide ownership of a complex codebase cleanly. It has been fantastic learning agentic workflows, something that I'm sure will continue to be of use to me in the next few years.


 Source code and live demo available upon request.`,
    technologies: ['Web Scraping', 'AI Agents', 'Automation', 'Python', 'NLP'],
    imageUrl: jobApplicationImage,
  },
  {
    title: 'Crop Data SQL Database',
    slug: 'crop-data-sql-database',
    description:
      `I first encountered SQL when working on a bioinformatics project during my undergraduate years. I had no idea what it meant or what it did. I don't think I even knew what a database was. For that matter, I didn't know much about them at all. This is where this project comes into play.

I entered this project with a clear goal: to form a fundamental understanding of relational databases from the ground up. That includes sourcing the data, deciding the best database type to use, finding the relationships and cardinalities between the data structures, and implementing the database using SQL.

Besides the obvious, this project demonstrated that there is more than one way to skin a cat when it comes to database design. I now understand where and when to use relational and non-relational databases, along with the pros and cons of both concepts.

This project also highlighted the importance of data modeling and schema design. I learned how to identify entities, define relationships, and normalize data to reduce redundancy. The process of designing the database schema was iterative, requiring me to balance theoretical best practices with practical considerations based on the specific use case.

Check out the full report below for a detailed walkthrough of the project, including the data sourcing process, design decisions, and implementation details.`,
    technologies: ['SQL', 'Database Design', 'API Design', 'Data Modeling'],
    pdfUrl: cropDatabasePdf,
    imageUrl: cropDatabaseImage,
  },
  {
    title: 'Autonomous Drone System',
    slug: 'autonomous-drone-system',
    description:
      'This is one of those projects that I\'ve always wanted to do but felt I never had the skillset to achieve. However, after one year of learning Python, I decided with a university colleague to give it a try. We purchased a cheap drone off eBay and began programming.\n\nTo begin with, we started simple. We loaded YOLOv8 for object detection and added some simple commands for it to turn away from any detected objects. We then moved on to generating actionable hardware instructions from natural language commands.\n\nCurrently, we have a few models running on the drone, including YOLOv8 for object detection. This helps the drone begin to understand its surroundings. We also have a link to Groq, which allows the drone to take natural language input and generate commands on the fly for the drone to execute. For example: "fly around the room for 2 minutes and then come home."\n\nThis project has advanced my confidence in developing real-time algorithms and software-hardware interaction. Working alongside another engineer has also been a positive change, whereby I\'ve been able to develop my appreciation for sharing work load and working to each other\'s unique abilities. We collaborate mainly through Git, working on separate branches and merging successful features.\n\nNext up is a return-to-charge feature. The plan is to 3D-print a station that the drone can land on and wirelessly charge from, moving the system towards fully autonomous, continuously operating behaviour.',
    technologies: ['Python', 'Control Systems', 'Machine Learning', 'Robotics'],
    videoUrl: droneVideo,
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
  {
    title: 'Greedy Waste Routing Optimizer',
    slug: 'greedy-waste-routing-optimizer',
    description:
      `Efficient waste management is a logistical challenge that directly impacts urban sustainability, operational costs, and public health. To address this, I developed a greedy heuristic algorithm designed to optimize truck routing for municipal waste collection across a dynamic city grid.

    The algorithm tackles a variant of the Vehicle Routing Problem (VRP), a well-studied class of combinatorial optimization problems with real-world implications for fleet management and city planning. The core challenge: given a set of collection points distributed across a municipality, assign and sequence routes for a fixed fleet of trucks in a way that minimizes total travel distance while ensuring all collection points are serviced within a defined time window.

    My approach draws on greedy nearest-neighbor heuristics, where each truck iteratively selects its next collection point based on proximity and priority weighting. Through research into classical VRP literature, I found that while exact solutions become computationally intractable at scale, well-tuned heuristics can produce near-optimal results in a fraction of the time, making them far more practical for real-world deployment. I incorporated a priority scoring system that factors in collection frequency requirements and road network constraints to further refine route quality.

    The algorithm was evaluated against randomized city grid simulations, consistently reducing theoretical total route distance compared to naive sequential scheduling. Key takeaways from the project included the importance of balancing solution quality against runtime efficiency, and the surprising degree to which small changes in priority weighting can cascade into significantly different routing outcomes.

    This project deepened my understanding of combinatorial optimization, graph traversal, and the practical trade-offs involved in applying algorithmic solutions to public infrastructure problems.`,
    technologies: ['Optimization', 'Algorithms', 'Heuristics', 'Graph Theory'],
    imageUrl: wasteRoutingImage,
  },
];
