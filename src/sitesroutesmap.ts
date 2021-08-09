import { editPlayerPageRoute } from "./pages/editplayerpage";
import { newPlayerPageRoute } from "./pages/newplayerpage";
import { squadsPageRoute } from "./pages/squadspage";

export const SiteRoutes = {
    ...squadsPageRoute,
    ...editPlayerPageRoute,
    ...newPlayerPageRoute
}