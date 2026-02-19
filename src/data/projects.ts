import droneVideo from '../assets/drone.mov';
import cropDatabasePdf from '../assets/crop-data-sql-database.pdf';
import cropDatabaseImage from '../assets/crop-data-sql-database.png';
import wasteRoutingImage from '../assets/greedy-waste-routing.jpg';

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
    slug: 'ai-job-application-agentic-system',
    description:
      `Efficient waste management is a logistical challenge that directly impacts urban sustainability, operational costs, and public health. To address this, I developed a greedy heuristic algorithm designed to optimize truck routing for municipal waste collection across a dynamic city grid.

    The algorithm tackles a variant of the Vehicle Routing Problem (VRP), a well-studied class of combinatorial optimization problems with real-world implications for fleet management and city planning. The core challenge: given a set of collection points distributed across a municipality, assign and sequence routes for a fixed fleet of trucks in a way that minimizes total travel distance while ensuring all collection points are serviced within a defined time window.

    My approach draws on greedy nearest-neighbor heuristics, where each truck iteratively selects its next collection point based on proximity and priority weighting. Through research into classical VRP literature, I found that while exact solutions become computationally intractable at scale, well-tuned heuristics can produce near-optimal results in a fraction of the time, making them far more practical for real-world deployment. I incorporated a priority scoring system that factors in collection frequency requirements and road network constraints to further refine route quality.

    The algorithm was evaluated against randomized city grid simulations, consistently reducing theoretical total route distance compared to naive sequential scheduling. Key takeaways from the project included the importance of balancing solution quality against runtime efficiency, and the surprising degree to which small changes in priority weighting can cascade into significantly different routing outcomes.

    This project deepened my understanding of combinatorial optimization, graph traversal, and the practical trade-offs involved in applying algorithmic solutions to public infrastructure problems.`,
    technologies: ['Optimization', 'Algorithms', 'Heuristics', 'Graph Theory'],
    imageUrl: wasteRoutingImage,
  },
  {
    title: 'Agentic Application System',
    slug: 'agentic-application-system',
    description:
      `This project began out of frustration with the graduate job market. After applying to countless roles with limited success, it became clear that the modern application process had largely become a numbers game. The market is heavily oversaturated, and much of the workflow involves repetitive manual effort rather than meaningful decision-making. Hours are spent searching, filtering, rewriting applications, and submitting similar information across multiple platforms, often with little feedback or transparency.

Rather than continuing to invest time into a largely manual and inefficient process, I approached the problem from an engineering perspective: if a workflow is repetitive, rule-based, and scalable, it should be possible to automate it. What initially started as a personal experiment evolved into a collaborative project between myself and another engineer, focused on exploring agentic workflows within the context of job discovery and application automation.

The system is designed as a multi-stage pipeline that automates the discovery, analysis, and preparation of job applications. Each stage performs a specialised task and passes structured information forward, transforming unstructured internet data into actionable decisions. At a high level, the workflow progresses from web discovery, to data extraction, to intelligent evaluation, and finally to application preparation.

The first component of the system is a custom-built job discovery engine. Instead of relying solely on traditional job boards, the platform actively searches the web using a web crawler, sometimes referred to as a web spider. The crawler begins from a set of predefined seed URLs determined by configurable parameters such as desired job role, geographic location, relevant technologies, and keyword preferences. From these starting points, the crawler navigates the web by following hyperlinks between pages, gradually expanding its search space.

Conceptually, the web is treated as a graph structure in which webpages represent nodes and hyperlinks represent connections between them. The crawler performs a controlled traversal of this graph, evaluating each page for relevance before deciding whether to continue exploring that branch. This allows the system to remain focused on job-related content while avoiding unrelated areas of the web. The result is a continuously expanding collection of potentially relevant job listing pages gathered automatically rather than manually searched.

Once relevant pages are identified, the system deploys a scraping module responsible for extracting structured information from each webpage. Job listings vary widely in formatting and layout depending on the hosting platform, so the scraper converts unstructured HTML content into a consistent dataset. Information such as job title, company name, location, required skills, job description, and application links are extracted and standardised. This stage effectively transforms raw web content into machine-readable data that can be analysed programmatically.

Because listings originate from multiple sources, a normalisation stage follows. Here, the system cleans and standardises collected data to ensure consistency across entries. Duplicate postings are removed, formatting inconsistencies are corrected, and job attributes are mapped into a unified schema. The cleaned data is then stored in a structured database, enabling efficient querying and downstream processing independent of the original website layouts.

The core innovation of the project lies in its agentic evaluation layer. Rather than simply aggregating job listings, the system attempts to replicate the decision-making process a candidate would normally perform manually. An AI-driven agent analyses each role against predefined criteria such as skill alignment, relevance to career goals, inferred seniority level, and estimated suitability. Instead of forcing the user to manually filter hundreds of listings, the system automatically prioritises opportunities that best match the defined profile.

This transforms the workflow from a broad "collect everything and manually filter later" approach into a targeted pipeline where intelligent filtering occurs automatically. The agent acts as a decision-making intermediary, reducing cognitive load while increasing efficiency.

For roles that pass evaluation, the system proceeds to an application preparation stage. Here, application materials can be generated or adapted dynamically based on job requirements. Relevant experiences are emphasised, responses can be tailored to specific postings, and application-ready information is prepared automatically. The intention is not simply to mass-submit identical applications, but to produce context-aware submissions aligned with individual roles while removing repetitive manual effort.

The project is fundamentally an exploration of agentic workflow design, where independent components operate as specialised agents collaborating toward a shared objective. Each agent has a defined responsibility, access to structured context, and the ability to trigger subsequent actions within the pipeline. The crawler discovers opportunities, the scraper extracts information, the evaluation agent assesses relevance, and the application agent prepares outputs. This modular architecture allows individual components to evolve independently without requiring a redesign of the entire system.

From a systems perspective, the project integrates concepts across multiple areas of computer science, including graph traversal algorithms, information retrieval, web scraping, natural language processing, automation pipelines, and agent-based system design. The architecture prioritises modularity and extensibility so that new evaluation strategies, data sources, or automation agents can be introduced incrementally.

Ultimately, the goal of the project is not simply to automate job applications, but to rethink how individuals interact with large-scale digital processes. By reframing job searching as an engineering problem, the system demonstrates how agentic systems can augment human workflows, reduce repetitive labour, and allow users to focus their attention on meaningful opportunities rather than administrative overhead. More broadly, the project serves as an exploration into how autonomous software agents can support decision-making in domains traditionally dominated by manual effort.`,
    technologies: ['Web Scraping', 'AI Agents', 'Automation', 'Python', 'NLP'],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
  },
];
