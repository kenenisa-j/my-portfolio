import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import ProjectDetail from "../../../components/portfolio/ProjectDetail";
import { notFound } from "next/navigation";

async function getProject(slug) {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  const data = doc.data();

  // Convert Firebase Timestamp to a plain string to avoid Next.js errors
  return {
    id: doc.id,
    title: data.title || "",
    fullDetail: data.fullDetail || "",
    github: data.github || "",
    slug: data.slug || "",
    images: data.images || "",
    techStack: data.techStack || "",
    smallDescription: data.smallDescription || "",
    category: data.category || "",
    liveDemo: data.liveDemo || "",
    createdAt: data.createdAt?.toDate().toISOString() || null,
  };
}

// THIS MUST BE THE ONLY DEFAULT EXPORT
export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
