import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { dataset, projectId } from "./env";
import StudioLogo from "./components/StudioLogo";
import StudioNavbar from "./components/StudioNavbar";
import { resolveDocumentActions } from "./actions";

export default defineConfig({
  basePath: "/studio",
  name: "Grains_of_Time_Studio",
  title: "Grains of Time | Website Manager",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
  ],
  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
  document: {
    actions: resolveDocumentActions,
  },
});
