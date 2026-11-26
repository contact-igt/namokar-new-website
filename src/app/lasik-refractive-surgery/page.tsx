import { permanentRedirect } from "next/navigation";
import { LINKS } from "@/config/site";

export default function Page() {
  permanentRedirect(LINKS.refractive);
}
