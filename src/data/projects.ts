import droneVideo from '../assets/drone.mov';

export interface Project {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    title: 'Autonomous Drone System',
    slug: 'autonomous-drone-system',
    description:
      'This is one of those projects that I\'ve always wanted to do but felt I never had the skillset to achieve. However, after one year of learning Python, I decided with a university colleague to give it a try. We purchased a cheap drone off eBay and began programming.\n\nTo begin with, we started simple. We loaded YOLOv8 for object detection and added some simple commands for it to turn away from any detected objects. We then moved on to generating actionable hardware instructions from natural language commands.\n\nCurrently, we have a few models running on the drone, including YOLOv8 for object detection. This helps the drone begin to understand its surroundings. We also have a link to Groq, which allows the drone to take natural language input and generate commands on the fly for the drone to execute. For example: "fly around the room for 2 minutes and then come home."\n\nNext up is a return-to-charge feature. The plan is to 3D-print a station that the drone can land on and wirelessly charge from, moving the system towards fully autonomous, continuously operating behaviour.',
    technologies: ['Python', 'Control Systems', 'Machine Learning', 'Robotics'],
    videoUrl: droneVideo,
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
  {
    title: 'AI Job Application Agentic System',
    slug: 'ai-job-application-agentic-system',
    description:
      'Built an AI-driven agentic system to automate and assist the job application process, leveraging language models, workflow automation, and structured decision logic to streamline application generation and tracking.',
    technologies: ['Python', 'LLMs', 'Automation', 'Data Processing'],
    imageUrl:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    title: 'Multiple Sequence Alignment Analysis',
    slug: 'multiple-sequence-alignment-analysis',
    description:
      'Conducted a comprehensive computational analysis comparing T-Coffee and MUSCLE multiple sequence alignment algorithms, evaluating accuracy, performance, and biological relevance using real genomic datasets.',
    technologies: ['R', 'Bioinformatics', 'Statistical Analysis', 'Data Visualization'],
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    title: 'Crop Data SQL Database',
    slug: 'crop-data-sql-database',
    description:
      'Designed and implemented a relational SQL database for agricultural crop data, including schema design, data querying, and structured data management to support efficient analysis and retrieval.',
    technologies: ['SQL', 'MySQL', 'Database Design', 'Data Management'],
    imageUrl:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
  },
];
